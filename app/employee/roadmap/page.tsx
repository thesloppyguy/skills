"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { generateRoadmap } from "@/services/app";
import { dummyEmployees } from "@/constants";
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

const getEmployeeRoles = () => {
  if (typeof window === "undefined") return { roles: [], ontologies: [] };
  const employeeRoles = localStorage.getItem(`skills_ontology_data`);
  if (employeeRoles) {
    const employeeRolesJson = JSON.parse(employeeRoles);
    return {
      roles: employeeRolesJson.map((role: any) => role[0]) as string[],
      ontologies: employeeRolesJson.map((role: any) => role[1]) as any[],
    };
  }
  return { roles: [], ontologies: [] };
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

const RoadmapPage = () => {
  const employee = dummyEmployees[0];
  const [roles, setRoles] = useState<string[]>([]);
  const [ontologies, setOntologies] = useState<any[]>([]);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { roles: employeeRoles, ontologies: employeeOntologies } =
      getEmployeeRoles();
    setRoles(employeeRoles);
    setOntologies(employeeOntologies);
  }, []);

  const handleRoleChange = async (role: string) => {
    setCurrentRole(role);
    setLoading(true);
    setError(null);

    try {
      const employeeOntology = getEmployeeOntology(employee.id);
      const targetOntology = ontologies.find(
        (ontology) => ontology.roleTitle === role
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
        currentLevel:
          apiResponse.data?.currentLevel ||
          apiResponse.currentLevel ||
          "Current Level",
        targetLevel:
          apiResponse.data?.targetLevel || apiResponse.targetLevel || role,
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
            {loading && (
              <Button disabled>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </Button>
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
