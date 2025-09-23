"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { generateRoadmap } from "@/services/app";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, Target, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEmployee } from "@/contexts/EmployeeContext";
import { useOrganization } from "@/contexts/OrganizationContext";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const getEmployeeRoles = (skillsMap: Map<string, any>) => {
  if (typeof window === "undefined") return { roles: [], ontologies: [] };
  
  // Get roles from the current organization's skills map
  const roles: string[] = [];
  const ontologies: any[] = [];
  
  skillsMap.forEach((ontology, roleTitle) => {
    roles.push(roleTitle);
    ontologies.push({
      roleTitle,
      ontology
    });
  });
  
  return { roles, ontologies };
};

const getEmployeeOntology = (employeeId: string) => {
  if (typeof window === "undefined") return null;
  const ontology = localStorage.getItem(`ontology_${employeeId}`);
  if (ontology) {
    return JSON.parse(ontology);
  }
  return null;
};

interface RoadmapStep {
  action: string;
  priority: number;
  time: string;
  prerequisites: string[];
  resources: string[];
  learned_skills: string[];
}

interface RoadmapData {
  steps: RoadmapStep[];
  totalDuration: string;
  currentLevel: string;
  targetLevel: string;
  progress: number;
}

interface SkillsComparison {
  matchedSkills: string[];
  missingSkills: string[];
  partialMatchSkills: string[];
  fuzzyMatches: Array<{
    targetSkill: string;
    employeeSkill: string;
    similarity: number;
  }>;
}

// Fuzzy matching functions
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
};

const calculateSimilarity = (str1: string, str2: string): number => {
  const maxLength = Math.max(str1.length, str2.length);
  if (maxLength === 0) return 1;

  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLength;
};

const findFuzzyMatches = (
  targetSkills: string[],
  employeeSkills: string[],
  threshold: number = 0.6
): Array<{
  targetSkill: string;
  employeeSkill: string;
  similarity: number;
}> => {
  const matches: Array<{
    targetSkill: string;
    employeeSkill: string;
    similarity: number;
  }> = [];
  const usedEmployeeSkills = new Set<string>();

  targetSkills.forEach((targetSkill) => {
    let bestMatch: { employeeSkill: string; similarity: number } | null = null;

    employeeSkills.forEach((employeeSkill) => {
      if (usedEmployeeSkills.has(employeeSkill)) return;

      const similarity = calculateSimilarity(targetSkill, employeeSkill);
      if (
        similarity >= threshold &&
        (!bestMatch || similarity > bestMatch.similarity)
      ) {
        bestMatch = { employeeSkill, similarity };
      }
    });

    if (bestMatch !== null) {
      const match = bestMatch as { employeeSkill: string; similarity: number };
      matches.push({
        targetSkill,
        employeeSkill: match.employeeSkill,
        similarity: match.similarity,
      });
      usedEmployeeSkills.add(match.employeeSkill);
    }
  });

  return matches.sort((a, b) => b.similarity - a.similarity);
};

// Helper function to extract all skills from ontology
const extractSkillsFromOntology = (ontology: any): string[] => {
  const skills: string[] = [];

  if (!ontology || !Array.isArray(ontology)) return skills;

  ontology.forEach((item: any) => {
    if (item.role_or_skill_name) {
      skills.push(item.role_or_skill_name);
    }
    if (item.relationships && Array.isArray(item.relationships)) {
      item.relationships.forEach((rel: any) => {
        if (rel.related_skills && Array.isArray(rel.related_skills)) {
          skills.push(...rel.related_skills);
        }
      });
    }
  });

  return [...new Set(skills)]; // Remove duplicates
};

// Helper function to extract skills from hierarchy
const extractSkillsFromHierarchy = (hierarchy: any[]): string[] => {
  const skills: string[] = [];

  if (!hierarchy || !Array.isArray(hierarchy)) return skills;

  hierarchy.forEach((domain: any) => {
    if (domain.categories && Array.isArray(domain.categories)) {
      domain.categories.forEach((category: any) => {
        if (category.subcategories && Array.isArray(category.subcategories)) {
          category.subcategories.forEach((skillGroup: any) => {
            if (skillGroup.skills && Array.isArray(skillGroup.skills)) {
              skillGroup.skills.forEach((skill: any) => {
                if (skill.name) {
                  skills.push(skill.name);
                }
                if (skill.subskills && Array.isArray(skill.subskills)) {
                  skill.subskills.forEach((subskill: any) => {
                    if (subskill.name) {
                      skills.push(subskill.name);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });

  return [...new Set(skills)]; // Remove duplicates
};

// Function to compare skills between employee and target role
const compareSkills = (
  employeeOntology: any,
  targetOntology: any
): SkillsComparison => {
  console.log('compare skills')
  const employeeSkills = [
    ...extractSkillsFromOntology(employeeOntology),
    ...extractSkillsFromHierarchy(employeeOntology?.hierarchy || []),
  ];

  const targetSkills = [
    ...extractSkillsFromOntology(targetOntology),
    ...extractSkillsFromHierarchy(targetOntology?.hierarchy || []),
  ];

  // Normalize skill names for comparison (lowercase, trim, remove special chars)
  const normalizeSkill = (skill: string) =>
    skill
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, "");

  const normalizedEmployeeSkills = employeeSkills.map(normalizeSkill);
  const normalizedTargetSkills = targetSkills.map(normalizeSkill);

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  const partialMatchSkills: string[] = [];
  const fuzzyMatches: Array<{
    targetSkill: string;
    employeeSkill: string;
    similarity: number;
  }> = [];

  // Find exact matches first
  const exactMatches = new Set<string>();
  normalizedTargetSkills.forEach((targetSkill, index) => {
    const originalTargetSkill = targetSkills[index];
    if (normalizedEmployeeSkills.includes(targetSkill)) {
      matchedSkills.push(originalTargetSkill);
      exactMatches.add(targetSkill);
    }
  });

  // Find fuzzy matches for remaining skills
  const remainingTargetSkills = normalizedTargetSkills.filter(
    (skill) => !exactMatches.has(skill)
  );
  const remainingEmployeeSkills = normalizedEmployeeSkills.filter(
    (skill) =>
      !matchedSkills.some((matched) => normalizeSkill(matched) === skill)
  );

  const fuzzyMatchesResult = findFuzzyMatches(
    remainingTargetSkills,
    remainingEmployeeSkills,
    0.6 // 60% similarity threshold
  );

  // Process fuzzy matches - treat all as successful matches
  const fuzzyMatchedTargetSkills = new Set<string>();
  fuzzyMatchesResult.forEach((match) => {
    const originalTargetSkill =
      targetSkills[normalizedTargetSkills.indexOf(match.targetSkill)];
    const originalEmployeeSkill =
      employeeSkills[normalizedEmployeeSkills.indexOf(match.employeeSkill)];

    fuzzyMatches.push({
      targetSkill: originalTargetSkill,
      employeeSkill: originalEmployeeSkill,
      similarity: match.similarity,
    });

    fuzzyMatchedTargetSkills.add(match.targetSkill);
    // Add all fuzzy matches to matched skills (successful)
    matchedSkills.push(originalTargetSkill);
  });

  // Find remaining skills and check for simple partial matches
  normalizedTargetSkills.forEach((targetSkill, index) => {
    const originalTargetSkill = targetSkills[index];
    if (
      !exactMatches.has(targetSkill) &&
      !fuzzyMatchedTargetSkills.has(targetSkill)
    ) {
      // Check for simple partial matches (contains/is contained)
      const hasSimplePartialMatch = normalizedEmployeeSkills.some(
        (empSkill) =>
          empSkill.includes(targetSkill) || targetSkill.includes(empSkill)
      );

      if (hasSimplePartialMatch) {
        partialMatchSkills.push(originalTargetSkill);
        // Add partial matches to matched skills (successful)
        matchedSkills.push(originalTargetSkill);
      } else {
        missingSkills.push(originalTargetSkill);
      }
    }
  });

  return {
    matchedSkills: [...new Set(matchedSkills)],
    missingSkills: [...new Set(missingSkills)],
    partialMatchSkills: [...new Set(partialMatchSkills)],
    fuzzyMatches: fuzzyMatches,
  };
};

const RoadmapPage = () => {
  const { selectedEmployee: employee } = useEmployee();
  const { skillsMap } = useOrganization();
  const [roles, setRoles] = useState<string[]>([]);
  const [ontologies, setOntologies] = useState<any[]>([]);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skillsComparison, setSkillsComparison] =
    useState<SkillsComparison | null>(null);

  useEffect(() => {
    const { roles: employeeRoles, ontologies: employeeOntologies } =
      getEmployeeRoles(skillsMap);
    setRoles(employeeRoles);
    setOntologies(employeeOntologies);
  }, [skillsMap]);

  const handleRoleChange = (role: string) => {
    setCurrentRole(role);
    setError(null);
    setRoadmap(null);

    // Calculate skills comparison immediately on role selection
    try {
      console.log('try')
      const employeeOntology = getEmployeeOntology(employee.id);
      const targetOntology = ontologies.find(
        (ontology) => ontology.roleTitle === role
      )?.ontology;

      if (employeeOntology && targetOntology) {
        const comparison = compareSkills(employeeOntology, targetOntology);
        setSkillsComparison(comparison);
      } else {
        setSkillsComparison(null);
      }
    } catch (err) {
      console.error("Error calculating skills comparison:", err);
      setSkillsComparison(null);
    }
  };

  const handleGenerateRoadmap = async () => {
    if (!currentRole) return;

    setLoading(true);
    setError(null);

    try {
      const employeeOntology = getEmployeeOntology(employee.id);
      const targetOntology = ontologies.find(
        (ontology) => ontology.roleTitle === currentRole
      )?.ontology;

      if (!employeeOntology || !targetOntology) {
        throw new Error(
          "Required data not found. Please ensure employee skills and role ontologies are available."
        );
      }

      const roadmapData = await generateRoadmap({
        skills: employeeOntology,
        target: targetOntology,
      });

      // Transform the API response into our RoadmapData structure
      const apiResponse = roadmapData as any;

      // Handle the actual API response structure
      let steps: RoadmapStep[] = [];
      if (apiResponse.steps && Array.isArray(apiResponse.steps)) {
        steps = apiResponse.steps;
      } else if (
        apiResponse.data?.steps &&
        Array.isArray(apiResponse.data.steps)
      ) {
        steps = apiResponse.data.steps;
      } else {
        // Create mock steps if no steps are provided
        steps = [
          {
            action:
              "Establish foundational understanding of core manufacturing and quality assurance concepts",
            priority: 1,
            time: "2-3 weeks",
            prerequisites: [],
            resources: [
              "Intro to Manufacturing (Coursera)",
              "Quality Management Basics (edX)",
            ],
            learned_skills: [
              "Basic manufacturing processes",
              "Quality control fundamentals",
            ],
          },
          {
            action:
              "Develop expertise in statistical process control and root cause analysis",
            priority: 2,
            time: "4-6 weeks",
            prerequisites: ["Basic manufacturing knowledge"],
            resources: [
              "SPC for Manufacturing (Udemy)",
              "Root Cause Analysis Masterclass",
            ],
            learned_skills: [
              "Data analysis and interpretation",
              "Problem-solving methodologies",
            ],
          },
        ];
      }

      // Calculate total duration from steps if not provided
      const calculateTotalDuration = (steps: RoadmapStep[]) => {
        if (steps.length === 0) return "6-12 months";

        // Extract time ranges and estimate total
        const timeRanges = steps.map((step) => {
          const timeStr = step.time.toLowerCase();
          if (timeStr.includes("week")) {
            const weeks = parseInt(timeStr.match(/(\d+)/)?.[1] || "1");
            return weeks;
          } else if (timeStr.includes("month")) {
            const months = parseInt(timeStr.match(/(\d+)/)?.[1] || "1");
            return months * 4; // Convert months to weeks
          }
          return 1;
        });

        const totalWeeks = timeRanges.reduce((sum, weeks) => sum + weeks, 0);
        const totalMonths = Math.ceil(totalWeeks / 4);

        if (totalMonths <= 3) return `${totalMonths} months`;
        if (totalMonths <= 12)
          return `${Math.ceil(totalMonths / 2)}-${totalMonths} months`;
        return `${Math.ceil(totalMonths / 12)}-${Math.ceil(
          totalMonths / 6
        )} years`;
      };

      const transformedRoadmap: RoadmapData = {
        steps,
        totalDuration:
          apiResponse.data?.totalDuration ||
          apiResponse.totalDuration ||
          calculateTotalDuration(steps),
        currentLevel: employee.employmentDetails.designation,
        targetLevel:
          apiResponse.data?.targetLevel ||
          apiResponse.targetLevel ||
          currentRole,
        progress: apiResponse.data?.progress || apiResponse.progress || 0,
      };

      setRoadmap(transformedRoadmap);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate roadmap"
      );
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority <= 2) {
      return "bg-red-100 text-red-800 border-red-200";
    } else if (priority <= 4) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else {
      return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const getPriorityLabel = (priority: number) => {
    if (priority <= 2) {
      return "High Priority";
    } else if (priority <= 4) {
      return "Medium Priority";
    } else {
      return "Low Priority";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Career Roadmap</h1>
          <p className="text-gray-600 mt-2">
            Generate a personalized roadmap to reach your target role
          </p>
        </div>
      </div>

      {/* Skills Summary */}
      {currentRole && skillsComparison && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Skills Analysis Summary
            </CardTitle>
            <CardDescription>
              Overview of your current skills compared to the target role
              requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Successful Matches (Exact + Fuzzy + Partial) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">
                    Successful Matches
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {skillsComparison.matchedSkills.length}
                  </Badge>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {skillsComparison.matchedSkills.length > 0 ? (
                    <>
                      {/* Show exact matches first */}
                      {skillsComparison.matchedSkills
                        .filter(
                          (skill) =>
                            !skillsComparison.fuzzyMatches.some(
                              (fm) => fm.targetSkill === skill
                            ) &&
                            !skillsComparison.partialMatchSkills.includes(skill)
                        )
                        .slice(0, 5)
                        .map((skill, index) => (
                          <div
                            key={`exact-${index}`}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700">{skill}</span>
                            <span className="text-xs text-green-600">
                              (exact)
                            </span>
                          </div>
                        ))}

                      {/* Show fuzzy matches */}
                      {skillsComparison.fuzzyMatches
                        .slice(0, 3)
                        .map((match, index) => (
                          <div
                            key={`fuzzy-${index}`}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-gray-700">
                              {match.targetSkill}
                            </span>
                            <span className="text-xs text-purple-600">
                              ({Math.round(match.similarity * 100)}%)
                            </span>
                          </div>
                        ))}

                      {/* Show partial matches */}
                      {skillsComparison.partialMatchSkills
                        .slice(0, 2)
                        .map((skill, index) => (
                          <div
                            key={`partial-${index}`}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-700">{skill}</span>
                            <span className="text-xs text-yellow-600">
                              (partial)
                            </span>
                          </div>
                        ))}
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No successful matches found
                    </p>
                  )}
                  {skillsComparison.matchedSkills.length > 10 && (
                    <p className="text-xs text-gray-500">
                      +{skillsComparison.matchedSkills.length - 10} more skills
                    </p>
                  )}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-red-800">Missing Skills</h3>
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-800"
                  >
                    {skillsComparison.missingSkills.length}
                  </Badge>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {skillsComparison.missingSkills.length > 0 ? (
                    skillsComparison.missingSkills
                      .slice(0, 10)
                      .map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-gray-700">{skill}</span>
                        </div>
                      ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No missing skills found
                    </p>
                  )}
                  {skillsComparison.missingSkills.length > 10 && (
                    <p className="text-xs text-gray-500">
                      +{skillsComparison.missingSkills.length - 10} more skills
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {skillsComparison.matchedSkills.length}
                  </p>
                  <p className="text-sm text-gray-600">Successful Matches</p>
                  <p className="text-xs text-gray-500">
                    (
                    {skillsComparison.matchedSkills.length -
                      skillsComparison.fuzzyMatches.length -
                      skillsComparison.partialMatchSkills.length}{" "}
                    exact, {skillsComparison.fuzzyMatches.length} fuzzy,{" "}
                    {skillsComparison.partialMatchSkills.length} partial)
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {skillsComparison.missingSkills.length}
                  </p>
                  <p className="text-sm text-gray-600">Missing Skills</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(
                      (skillsComparison.matchedSkills.length /
                        (skillsComparison.matchedSkills.length +
                          skillsComparison.missingSkills.length)) *
                        100
                    )}
                    %
                  </p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Role Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Select Target Role
          </CardTitle>
          <CardDescription>
            Choose the role you want to work towards to generate your
            personalized roadmap
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Available Roles
                </label>
                <Select
                  value={currentRole || ""}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role to generate roadmap" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleGenerateRoadmap}
                disabled={!currentRole || loading}
                className="min-w-[140px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Roadmap"
                )}
              </Button>
            </div>

            {currentRole && !loading && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Selected Role:
                  </span>
                  <span className="text-sm text-blue-700 font-semibold">
                    {currentRole}
                  </span>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  Click &quot;Generate Roadmap&quot; to create your personalized
                  career roadmap
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Roadmap Display */}
      {roadmap && (
        <div className="space-y-6">
          {/* Roadmap Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Roadmap Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Current Level</p>
                  <p className="text-lg font-semibold">
                    {roadmap.currentLevel}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Target Level</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {roadmap.targetLevel}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Estimated Duration</p>
                  <p className="text-lg font-semibold">
                    {roadmap.totalDuration}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Overall Progress</span>
                  <span>{roadmap.progress}%</span>
                </div>
                <Progress value={roadmap.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Roadmap Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Roadmap Steps</CardTitle>
              <CardDescription>
                Follow these steps to reach your target role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roadmap.steps.map((step, index) => (
                  <div
                    key={step.priority + index}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm">
                            {step.priority}
                          </div>
                          <h3 className="text-lg font-semibold">
                            Step {step.priority}
                          </h3>
                          <Badge className={getPriorityColor(step.priority)}>
                            {getPriorityLabel(step.priority)}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4 text-base leading-relaxed">
                          {step.action}
                        </p>

                        {/* Prerequisites */}
                        {step.prerequisites &&
                          step.prerequisites.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                Prerequisites:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {step.prerequisites.map(
                                  (prereq, prereqIndex) => (
                                    <Badge
                                      key={prereqIndex}
                                      variant="secondary"
                                    >
                                      {prereq}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {/* Resources */}
                        {step.resources && step.resources.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Recommended Resources:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                              {step.resources.map((resource, resourceIndex) => (
                                <li key={resourceIndex}>{resource}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Skills to Learn */}
                        {step.learned_skills &&
                          step.learned_skills.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                Skills you&apos;ll develop:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {step.learned_skills.map(
                                  (skill, skillIndex) => (
                                    <Badge
                                      key={skillIndex}
                                      variant="outline"
                                      className="bg-green-50 text-green-700 border-green-200"
                                    >
                                      {skill}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {/* Time Estimate */}
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">
                            Estimated time: {step.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!roadmap && !loading && !error && (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Roadmap Generated
            </h3>
            <p className="text-gray-600">
              Select a target role above to generate your personalized career
              roadmap
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RoadmapPage;
