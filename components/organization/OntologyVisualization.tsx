"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Brain } from "lucide-react";

import {
  SkillsOntology,
  Domain,
  Skill,
  SkillGroup,
  Category,
} from "@/types/organization";

interface OntologyVisualizationProps {
  isOpen: boolean;
  onClose: () => void;
  ontology: SkillsOntology;
}

// Text-based drawer content functions
export const renderSkillLevels = (levels: {
  "1": string;
  "2": string;
  "3": string;
  "4": string;
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="level-1"
    >
      {Object.entries(levels).map(([level, description]) => (
        <AccordionItem key={level} value={`level-${level}`}>
          <AccordionTrigger className="py-2 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Level {level}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <span className="text-xs text-gray-600">
              {description as string}
            </span>
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
                <AccordionContent>
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
                    className={`text-xs ${
                      skill.skill_type === "Technical"
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
            <AccordionContent>{renderSkill(skill)}</AccordionContent>
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
            <AccordionContent>{renderSkillGroup(skillGroup)}</AccordionContent>
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
            <AccordionContent>{renderCategory(category)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

const OntologyVisualization: React.FC<OntologyVisualizationProps> = ({
  isOpen,
  onClose,
  ontology,
}) => {
  console.log(ontology);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] h-[90vh] p-0">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <div>
                <DialogTitle className="text-xl font-bold">
                  Skills Ontology Visualization
                </DialogTitle>
                <DialogDescription>
                  Interactive visualization of skills hierarchy and
                  relationships.
                </DialogDescription>
              </div>
            </div>
          </div>

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
                  <AccordionContent>{renderDomain(domain)}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OntologyVisualization;
