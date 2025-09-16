"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Brain,
  Code,
  Users,
  Target,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Loader2,
  Building2,
} from "lucide-react";
import {
  SkillsOntology,
  Domain,
  Skill,
  SkillGroup,
  Category,
  OntologyRelationship,
  Relationship,
} from "@/types/organization";
import { generateSkillsOntology } from "@/services/app";
import { v4 as uuidv4 } from "uuid";

interface SkillsOntologyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  roleId?: string;
  roleTitle?: string;
  parentDetails?: {
    industry: string;
    subEntity: string;
    jobFamily?: string;
    subJobFamily?: string;
  };
  hierarchyPath?: string[];
  existingOntology?: SkillsOntology;
  onOntologyGenerated?: (roleId: string, ontology: SkillsOntology) => void;
}

const SkillsOntologyDrawer: React.FC<SkillsOntologyDrawerProps> = ({
  isOpen,
  onClose,
  roleId,
  roleTitle,
  parentDetails,
  hierarchyPath,
  existingOntology,
  onOntologyGenerated,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const handleGenerateOntology = async () => {
    if (!roleId || !roleTitle || !parentDetails || !hierarchyPath) return;

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const response = await generateSkillsOntology({
        roleTitle,
        parentDetails,
        hierarchyPath,
      });

      const newOntology: SkillsOntology = {
        id: uuidv4(),
        roleId,
        roleTitle,
        parentDetails,
        hierarchyPath,
        hierarchy: response.hierarchy || [],
        ontology: response.ontology || [],
        generatedAt: new Date().toISOString(),
      };

      onOntologyGenerated?.(roleId, newOntology);
    } catch (error) {
      console.error("Error generating skills ontology:", error);
      setGenerationError(
        error instanceof Error
          ? error.message
          : "Failed to generate skills ontology"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const renderSkillLevels = (levels: {
    "1": string;
    "2": string;
    "3": string;
    "4": string;
  }) => {
    return (
      <div className="mt-2 space-y-1">
        {Object.entries(levels).map(([level, description]) => (
          <div key={level} className="flex items-start gap-2">
            <Badge
              variant="outline"
              className="text-xs w-6 h-6 flex items-center justify-center p-0"
            >
              {level}
            </Badge>
            <span className="text-xs text-gray-600">{description}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderSkill = (skill: Skill, skillType: string) => {
    const skillTypeColors = {
      Technical: "bg-blue-100 text-blue-800",
      Behavioral: "bg-green-100 text-green-800",
      Managerial: "bg-purple-100 text-purple-800",
      Functional: "bg-orange-100 text-orange-800",
    };

    return (
      <Card key={skill.name} className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <h5 className="font-medium text-gray-900">{skill.name}</h5>
              <Badge className={skillTypeColors[skill.skill_type]}>
                {skill.skill_type}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Weight: {skill.weight}
              </Badge>
            </div>
          </div>

          {renderSkillLevels(skill.levels)}

          {skill.subskills && skill.subskills.length > 0 && (
            <div className="mt-3">
              <h6 className="text-sm font-medium text-gray-700 mb-2">
                Sub-skills:
              </h6>
              <div className="space-y-2">
                {skill.subskills.map((subskill, index) => (
                  <div key={index} className="pl-4 border-l-2 border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-800">
                        {subskill.name}
                      </span>
                      <Badge
                        className={`${
                          skillTypeColors[subskill.skill_type]
                        } text-xs`}
                      >
                        {subskill.skill_type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {subskill.weight}
                      </Badge>
                    </div>
                    {renderSkillLevels(subskill.levels)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderSkillGroup = (skillGroup: SkillGroup) => {
    const skillsByType = skillGroup.skills.reduce((acc, skill) => {
      if (!acc[skill.skill_type]) {
        acc[skill.skill_type] = [];
      }
      acc[skill.skill_type].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);

    return (
      <div key={skillGroup.name} className="space-y-4">
        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
          <Code className="h-4 w-4 text-blue-600" />
          {skillGroup.name}
          <Badge variant="secondary" className="bg-blue-600 text-white">
            {skillGroup.skills.length}
          </Badge>
        </h4>

        {Object.entries(skillsByType).map(([skillType, skills]) => (
          <div key={skillType} className="space-y-3">
            <h5 className="text-sm font-medium text-gray-700 capitalize">
              {skillType} Skills
            </h5>
            <div className="grid gap-3">
              {skills.map((skill) => renderSkill(skill, skillType))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCategory = (category: Category) => {
    return (
      <div key={category.name} className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Users className="h-5 w-5 text-green-600" />
          {category.name}
        </h3>
        <div className="space-y-6">
          {category.subcategories.map((skillGroup) =>
            renderSkillGroup(skillGroup)
          )}
        </div>
      </div>
    );
  };

  const renderDomain = (domain: Domain) => {
    return (
      <div key={domain.name} className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-purple-600" />
          {domain.name}
        </h2>
        <div className="space-y-6">
          {domain.categories.map((category) => renderCategory(category))}
        </div>
      </div>
    );
  };

  const renderOntologyRelationships = (ontology: OntologyRelationship[]) => {
    if (!ontology || ontology.length === 0) return null;

    const relationshipColors = {
      Prerequisite: "bg-red-100 text-red-800",
      Complementary: "bg-blue-100 text-blue-800",
      Alternative: "bg-yellow-100 text-yellow-800",
      Progressive: "bg-green-100 text-green-800",
      Core: "bg-purple-100 text-purple-800",
      Advanced: "bg-orange-100 text-orange-800",
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Target className="h-6 w-6 text-purple-600" />
          Skill Relationships
        </h2>
        <div className="space-y-4">
          {ontology.map((item, index) => (
            <Card key={index} className="border border-gray-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {item.role_or_skill_name}
                </h3>
                <div className="space-y-3">
                  {item.relationships.map((relationship, relIndex) => (
                    <div key={relIndex} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={relationshipColors[relationship.type]}
                        >
                          {relationship.type}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {relationship.related_skills.length} related skills
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {relationship.related_skills.map(
                          (skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[500px] sm:w-[600px] bg-white border-l border-gray-200 overflow-y-auto"
      >
        <SheetHeader className="pb-6 border-b border-gray-100">
          <SheetTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Brain className="h-5 w-5 text-blue-600" />
            Skills Ontology
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-600 mt-2">
            {roleTitle
              ? `Skills and competencies for ${roleTitle}`
              : "View and manage skills ontology for this role"}
          </SheetDescription>
        </SheetHeader>

        <div className="p-6 space-y-6">
          {existingOntology ? (
            <div className="space-y-6">
              {/* Generation Info */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Skills Ontology Available
                      </p>
                      <p className="text-xs text-green-700">
                        Generated on{" "}
                        {new Date(
                          existingOntology.generatedAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Hierarchy */}
              <div className="space-y-6">
                {existingOntology.hierarchy.map((domain) =>
                  renderDomain(domain)
                )}
              </div>

              <Separator />

              {/* Ontology Relationships */}
              {renderOntologyRelationships(existingOntology.ontology)}

              {/* Regenerate Button */}
              <div className="pt-4 border-t border-gray-100">
                <Button
                  onClick={handleGenerateOntology}
                  disabled={isGenerating}
                  variant="outline"
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate Ontology
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* No Ontology State */}
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-orange-900">
                        No Skills Ontology Found
                      </p>
                      <p className="text-xs text-orange-700">
                        Generate a skills ontology to see detailed skills and
                        competencies for this role.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Generate Button */}
              <div className="space-y-4">
                <Button
                  onClick={handleGenerateOntology}
                  disabled={isGenerating || !roleId || !roleTitle}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Skills Ontology...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Generate Skills Ontology
                    </>
                  )}
                </Button>

                {generationError && (
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <p className="text-sm text-red-700">
                          {generationError}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SkillsOntologyDrawer;
