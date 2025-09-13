"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { sections, SectionType, SubSectionType } from "@/constants";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const SectionsDropdown = () => {
  const [activeSection, setActiveSection] = useState<SectionType | undefined>();
  const [subSections, setSubSections] = useState<SubSectionType | undefined>();
  const router = useRouter();

  useEffect(() => {
    if (activeSection && subSections) {
      router.push(subSections.path);
    } else {
      router.push(activeSection?.path || "");
    }
  }, [activeSection, router, subSections]);

  const handleSectionClick = (section: SectionType) => {
    setActiveSection(section);
    if (section.children) {
      setSubSections(section.children[0]);
    } else {
      setSubSections(undefined);
    }
  };

  const handleSubSectionClick = (subSection: SubSectionType) => {
    setSubSections(subSection);
  };

  return (
    <div className="w-full">
      {/* Horizontal scrollable sections */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {sections.map((section) => (
          <div key={section.name} className="flex-shrink-0">
            {section.children ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={
                      activeSection?.name === section.name
                        ? "default"
                        : "outline"
                    }
                    className={`flex items-center space-x-2 whitespace-nowrap ${
                      activeSection?.name === section.name
                        ? `${section.iconColor} text-white hover:${section.iconColor}`
                        : ""
                    }`}
                  >
                    <div
                      className={`w-5 h-5 ${
                        activeSection?.name === section.name
                          ? "bg-white/20"
                          : section.iconColor
                      } rounded-full flex items-center justify-center`}
                    >
                      {section.icon}
                    </div>
                    <span>{section.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {section.children.map((item) => (
                    <DropdownMenuItem
                      key={item.name}
                      onClick={() => handleSubSectionClick(item)}
                      className={`cursor-pointer ${
                        subSections?.name === item.name
                          ? `bg-${section.iconColor
                              .replace("bg-", "")
                              .replace("-900", "-100")} text-${section.iconColor
                              .replace("bg-", "")
                              .replace("-900", "-900")} font-medium`
                          : ""
                      }`}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant={
                  activeSection?.name === section.name ? "default" : "outline"
                }
                onClick={() => handleSectionClick(section)}
                className={`flex items-center space-x-2 whitespace-nowrap ${
                  activeSection?.name === section.name
                    ? `${section.iconColor} text-white hover:${section.iconColor}`
                    : ""
                }`}
              >
                <div
                  className={`w-5 h-5 ${
                    activeSection?.name === section.name
                      ? "bg-white/20"
                      : section.iconColor
                  } rounded-full flex items-center justify-center`}
                >
                  {section.icon}
                </div>
                <span>{section.name}</span>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionsDropdown;
