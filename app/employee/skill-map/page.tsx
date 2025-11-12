/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { dummyEmployees } from "@/constants";
import { user_skill_map } from "@/constants/user_skill_map";
import { Domain, OntologyRelationship } from "@/types/organization";
import { useEffect } from "react";
import { Brain } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { renderSkillLevels } from "@/components/organization/Ontology";
import { useEmployee } from "@/contexts/EmployeeContext";
import { useOrganization } from "@/contexts/OrganizationContext";
import { Card } from "@/components/ui/card";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const getEmployeeOntology = (employeeId: string) => {
  // Look up the employee's ontology from user_skill_map
  const ontologyKey = `ontology_${employeeId}`;
  const employeeOntology = user_skill_map[ontologyKey as keyof typeof user_skill_map];
  
  if (employeeOntology) {
    return {
      hierarchy: employeeOntology.hierarchy as Domain[],
      ontology: employeeOntology.ontology as OntologyRelationship[]
    };
  }
  return null;
};

const getOrganizationOntology = (designation: string, skillsMap: Map<string, any>) => {
  // Get the ontology for the specific role from the current organization's skills map
  const skills = skillsMap.get(designation);
  if (skills) {
    return {
      roleTitle: designation,
      ontology: skills.ontology,
      hierarchy: skills.hierarchy
    };
  }
  return {
      roleTitle: designation,
      ontology: [],
      hierarchy: [],
    };
};

const flattenDomain = (domains: Domain[]): string[] => {
  const skillNames: string[] = [];

  const extractSkills = (domain: Domain) => {
    // Add domain name
    skillNames.push(domain.name);

    // Extract from categories
    domain.categories.forEach((category) => {
      // Add category name
      skillNames.push(category.name);

      // Extract from subcategories (SkillGroups)
      category.subcategories.forEach((skillGroup) => {
        // Add skill group name
        skillNames.push(skillGroup.name);

        // Extract from skills
        skillGroup.skills.forEach((skill) => {
          // Add skill name
          skillNames.push(skill.name);

          // Extract from subskills
          skill.subskills.forEach((subskill) => {
            skillNames.push(subskill.name);
          });
        });
      });
    });
  };

  // Process all domains
  domains.forEach(extractSkills);

  return skillNames;
};

// Custom render functions with skill status
const renderSkillWithStatus = (skill: any, isPresent: boolean) => {
  return (
    <div className="flex items-center justify-between w-full pr-4">
      <span
        className={`text-sm font-medium ${
          isPresent ? "text-green-700" : "text-yellow-600"
        }`}
      >
        {skill.name}
      </span>
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            isPresent ? "bg-green-500" : "bg-yellow-500"
          }`}
        />
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
  );
};

const renderSkillGroupWithStatus = (
  skillGroup: any,
  isSkillPresent: (skillName: string) => boolean
) => {
  return (
    <div className="space-y-3">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="skill-0"
      >
        {skillGroup.skills.map((skill: any, index: number) => (
          <AccordionItem key={index} value={`skill-${index}`}>
            <AccordionTrigger className="py-2 text-sm">
              {renderSkillWithStatus(skill, isSkillPresent(skill.name))}
            </AccordionTrigger>
            <AccordionContent className="pl-6">
              <div className="space-y-2">
                <div className="text-xs text-gray-600 mb-2">
                  <strong>Weight:</strong> {skill.weight}
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-700">
                    Sub-skills:
                  </div>
                  {skill.subskills.map((subskill: any, subIndex: number) => (
                    <div
                      key={subIndex}
                      className="flex items-center justify-between text-xs"
                    >
                      <span
                        className={
                          isSkillPresent(subskill.name)
                            ? "text-green-700"
                            : "text-yellow-600"
                        }
                      >
                        {subskill.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isSkillPresent(subskill.name)
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        />
                        <Badge variant="outline" className="text-xs">
                          {subskill.skill_type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3">{renderSkillLevels(skill.levels)}</div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

const renderCategoryWithStatus = (
  category: any,
  isSkillPresent: (skillName: string) => boolean
) => {
  return (
    <div className="space-y-4">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="skillgroup-0"
      >
        {category.subcategories.map((skillGroup: any, index: number) => (
          <AccordionItem key={index} value={`skillgroup-${index}`}>
            <AccordionTrigger className="py-2 text-sm">
              <span className="text-sm font-medium">{skillGroup.name}</span>
            </AccordionTrigger>
            <AccordionContent className="pl-6">
              {renderSkillGroupWithStatus(skillGroup, isSkillPresent)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

const renderDomainWithStatus = (
  domain: any,
  isSkillPresent: (skillName: string) => boolean
) => {
  return (
    <div className="space-y-6">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="category-0"
      >
        {domain.categories.map((category: any, index: number) => (
          <AccordionItem key={index} value={`category-${index}`}>
            <AccordionTrigger className="py-2 text-sm">
              <span className="text-sm font-medium">{category.name}</span>
            </AccordionTrigger>
            <AccordionContent className="pl-6">
              {renderCategoryWithStatus(category, isSkillPresent)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

const SkillMapPage = () => {
  const { selectedEmployee: employee } = useEmployee();
  const { skillsMap } = useOrganization();
  const [currentOntology, setCurrentOntology] = useState<{
    hierarchy?: Domain[];
    ontology?: OntologyRelationship[];
  }>({});
  const [, setOrganizationOntology] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [employeeSkillNames, setEmployeeSkillNames] = useState<string[]>([]);

  // Function to check if a skill is present in employee's skills
  const isSkillPresent = (skillName: string): boolean => {
    return employeeSkillNames.some(
      (empSkill) =>
        empSkill.toLowerCase().includes(skillName.toLowerCase()) ||
        skillName.toLowerCase().includes(empSkill.toLowerCase())
    );
  };

  // Function to find missing skills
  const findMissingSkills = (
    orgSkills: string[],
    empSkills: string[]
  ): string[] => {
    return orgSkills.filter(
      (orgSkill) =>
        !empSkills.some(
          (empSkill) =>
            empSkill.toLowerCase().includes(orgSkill.toLowerCase()) ||
            orgSkill.toLowerCase().includes(empSkill.toLowerCase())
        )
    );
  };

  useEffect(() => {
    // Extract employee skill names
    const empSkills = employee.skills.map((skill) => skill.name);
    setEmployeeSkillNames(empSkills);
  }, [employee]);

  useEffect(() => {
    // get organization ontology based on employee domain and role
    const OrganizationOntology = getOrganizationOntology(
      employee.employmentDetails.designation,
      skillsMap
    );
    if (!OrganizationOntology) {
      setOrganizationOntology([]);
      return;
    }
    const flattenedOntology = flattenDomain(OrganizationOntology.hierarchy);
    setOrganizationOntology(flattenedOntology);

    // Find missing skills
    const missing = findMissingSkills(flattenedOntology, employeeSkillNames);
    setMissingSkills(missing);
  }, [employee, employeeSkillNames, skillsMap]);
  useEffect(() => {
    setCurrentOntology({});
    const ontology = getEmployeeOntology(employee.id);
    if (ontology) {
      setCurrentOntology(ontology);
    } else {
      // Set empty ontology if no data found for this employee
      const emptyOntology = { hierarchy: [], ontology: [] };
      setCurrentOntology(emptyOntology);
    }
  }, [employee]);
  if (!currentOntology.hierarchy || !currentOntology.ontology) {
    // Check if we have empty arrays (no data found) vs undefined (still loading)
    if (currentOntology.hierarchy && currentOntology.ontology && 
        currentOntology.hierarchy.length === 0 && currentOntology.ontology.length === 0) {
      return (
        <Card className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No Skills Data Available
              </h3>
              <p className="text-gray-500">
                No skills ontology data found for employee {employee.id}.
              </p>
            </div>
          </div>
        </Card>
      );
    }

    const loadingStates = [
      { text: "Loading employee data..." },
      { text: "Loading skills ontology..." },
      { text: "Analyzing skill hierarchy..." },
      { text: "Preparing visualization..." },
    ];

    return (
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={true}
        loop={false}
        duration={2000}
      />
    );
  }

  return (
    <Card className="p-6 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-600" />
          <div>
            <div className="text-xl font-bold">
              Skills Ontology Visualization
            </div>
            <div>
              Interactive visualization of skills hierarchy and relationships.
            </div>
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
          {currentOntology.hierarchy.map((domain, index) => (
            <AccordionItem key={index} value={`domain-${index}`}>
              <AccordionTrigger className="py-2 text-sm">
                <span className="text-sm font-medium">{domain.name}</span>
              </AccordionTrigger>
              <AccordionContent className="pl-6">
                {renderDomainWithStatus(domain, isSkillPresent)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Missing Skills Section */}
      {missingSkills.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-red-800">
              Missing Skills ({missingSkills.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {missingSkills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-white rounded border"
              >
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default SkillMapPage;
