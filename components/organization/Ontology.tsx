"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  SkillsOntology,
  Domain,
  Skill,
  SkillGroup,
  Category,
} from "@/types/organization";

interface OntologyProps {
  ontology: SkillsOntology;
}

// Text-based drawer content functions
export const renderSkillLevels = (levels: {
  beginner: string[];
  intermediate: string[];
  advanced: string[];
  expert: string[];
}) => {
  const levelEntries = [
    { key: 'beginner', label: 'Beginner', color: 'bg-green-100 text-green-800' },
    { key: 'intermediate', label: 'Intermediate', color: 'bg-blue-100 text-blue-800' },
    { key: 'advanced', label: 'Advanced', color: 'bg-orange-100 text-orange-800' },
    { key: 'expert', label: 'Expert', color: 'bg-red-100 text-red-800' },
  ];

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="level-beginner"
    >
      {levelEntries.map(({ key, label, color }) => (
        <AccordionItem key={key} value={`level-${key}`}>
          <AccordionTrigger className="py-2 text-sm">
            <div className="flex items-center gap-2">
              <Badge className={`text-xs ${color}`}>
                {label}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-6">
            <div className="space-y-1">
              {levels[key as keyof typeof levels]?.map((task, index) => (
                <div key={index} className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                  • {task}
                </div>
              )) || (
                  <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
                    No tasks defined for this level
                  </div>
                )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const renderSkill = (skill: Skill) => {
  const skillTypeColors = {
    Technical: "bg-blue-100 text-blue-800",
    Behavioral: "bg-green-100 text-green-800",
    Managerial: "bg-purple-100 text-purple-800",
    Functional: "bg-orange-100 text-orange-800",
  };

  return (
    <div className="p-3 bg-white border border-gray-200 rounded-lg space-y-3">
      <div className="space-y-2">{renderSkillLevels(skill.levels)}</div>

      {skill.subskills && skill.subskills.length > 0 && (
        <div className="space-y-2">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="subskill-0"
          >
            {skill.subskills.map((subskill, index) => (
              <AccordionItem key={index} value={`subskill-${index}`}>
                <AccordionTrigger className="py-2 text-sm">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span className="text-sm font-medium">{subskill.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={skillTypeColors[subskill.skill_type]}>
                        {subskill.skill_type}
                      </Badge>
                      <Badge variant="outline">W: {subskill.weight}</Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-6">
                  <div className="mt-2">
                    {renderSkillLevels(subskill.levels)}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
};

export const renderSkillGroup = (skillGroup: SkillGroup) => {
  return (
    <div className="space-y-3">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="skill-0"
      >
        {skillGroup.skills.map((skill, index) => (
          <AccordionItem key={index} value={`skill-${index}`}>
            <AccordionTrigger className="py-2 text-sm">
              <div className="flex items-center justify-between w-full pr-4">
                <span className="text-sm font-medium">{skill.name}</span>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`text-xs ${skill.skill_type === "Technical"
                      ? "bg-blue-100 text-blue-800"
                      : skill.skill_type === "Behavioral"
                        ? "bg-green-100 text-green-800"
                        : skill.skill_type === "Managerial"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                  >
                    {skill.skill_type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    W: {skill.weight}
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-6">{renderSkill(skill)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export const renderCategory = (category: Category) => {
  return (
    <div className="space-y-4">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="skillgroup-0"
      >
        {category.subcategories.map((skillGroup, index) => (
          <AccordionItem key={index} value={`skillgroup-${index}`}>
            <AccordionTrigger className="py-2 text-sm">
              <span className="text-sm font-medium">{skillGroup.name}</span>
            </AccordionTrigger>
            <AccordionContent className="pl-6">{renderSkillGroup(skillGroup)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export const renderDomain = (domain: Domain) => {
  return (
    <div className="space-y-6">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="category-0"
      >
        {domain.categories.map((category, index) => (
          <AccordionItem key={index} value={`category-${index}`}>
            <AccordionTrigger className="py-2 text-sm">
              <span className="text-sm font-medium">{category.name}</span>
            </AccordionTrigger>
            <AccordionContent className="pl-6">{renderCategory(category)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

const Ontology: React.FC<OntologyProps> = ({
  ontology,
}) => {
  console.log(ontology);
  return (
    <div className="space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto">
      {/* Skills Hierarchy */}
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="domain-0"
      >
        {ontology.hierarchy.map((domain, index) => (
          <AccordionItem key={index} value={`domain-${index}`}>
            <AccordionTrigger className="py-2 text-sm">
              <span className="text-sm font-medium">{domain.name}</span>
            </AccordionTrigger>
            <AccordionContent className="pl-6">{renderDomain(domain)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Ontology;
