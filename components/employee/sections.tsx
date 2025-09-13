"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { sections, SectionType, SubSectionType } from "@/constants";
import { useRouter } from "next/navigation";

const Sections = () => {
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
  return (
    <div className="max-w-[300px]">
      {sections.map((section) => (
        <Card key={section.name} className="mb-4 min-w-[300px]">
          <CardHeader>
            <button
              onClick={() => {
                setActiveSection(section);
                if (section.children) {
                  setSubSections(section.children[0]);
                } else {
                  setSubSections(undefined);
                }
              }}
              className="flex items-center justify-between w-full"
            >
              <CardTitle className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 ${section.iconColor} rounded-full flex items-center justify-center`}
                >
                  {section.icon}
                </div>
                <span>{section.name}</span>
              </CardTitle>
            </button>
          </CardHeader>
          {section.children && activeSection?.name === section.name && (
            <CardContent>
              <ul className="space-y-2">
                {section.children?.map((item) => (
                  <li key={item.name}>
                    <Button
                      onClick={() => setSubSections(item)}
                      variant="ghost"
                      className={`w-full justify-start h-auto px-3 py-2 ${
                        subSections?.name === item.name
                          ? `bg-${section.iconColor}-100 text-${section.iconColor}-900 font-medium`
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default Sections;
