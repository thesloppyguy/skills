"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Pencil,
  Trash2,
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
  RoleSpecificSkills,
  Task,
} from "@/types/organization";
import { generateSkillsOntology, getRoleSpecificInformation } from "@/services/app";
import { v4 as uuidv4 } from "uuid";
import OntologyVisualization from "./Ontology";
import { useOrganization } from "@/contexts/OrganizationContext";
import RoleDialog from "./RoleDialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNodesState } from "@xyflow/react";


interface RoleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  roleTitle: string;
  definition: string;
  existingOntology?: SkillsOntology;
  existingRoleSpecificInfo?: Task[];
  isGenerateOntologyLoading: boolean;
  isGenerateRoleSpecificInfoLoading: boolean;
  generatedOntology: () => Promise<void>;
  generatedRoleSpecificInfo: () => Promise<void>;
  handleDeleteNode: (roleTitle: string) => void;
}

const RoleDrawer: React.FC<RoleDrawerProps> = ({
  isOpen,
  onClose,
  type,
  roleTitle,
  definition,
  existingOntology,
  existingRoleSpecificInfo,
  generatedOntology,
  isGenerateOntologyLoading,
  isGenerateRoleSpecificInfoLoading,
  generatedRoleSpecificInfo,
  handleDeleteNode,
}) => {
  const [tab, setTab] = useState("ontology");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
    <SheetContent
      side="right"
      className="w-[400px] sm:w-[540px] bg-white border-l border-gray-200"
    >
      <SheetHeader className="border-b border-gray-100">
        <SheetTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Pencil className="h-5 w-5 text-blue-600" />
          Edit Node
        </SheetTitle>
      </SheetHeader>
      <div className="p-6">
        <div className="flex gap-2">
          <Input
            value={roleTitle}
            disabled
            placeholder="Enter name"
            className="w-full"
          />
          <Button
            onClick={() => {
              if (roleTitle) {
                handleDeleteNode(roleTitle);
              }
            }}
            size="icon"
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2 pt-2">
          <Textarea
            value={definition}
            disabled
            placeholder="Enter definition"
            rows={3}
            className="w-full"
          />
        </div>

        {/* Skills Ontology Section for Job Roles */}
        {type === "job_role" && (
          <div className="pt-6 border-t border-gray-100">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Skills Ontology
                </h3>
              </div>

              {existingOntology ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-900">
                          Skills Ontology Available
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setTab("ontology");
                        setIsDialogOpen(true);
                      }}
                      variant="outline"
                      className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      View Ontology
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-orange-900">
                        No Skills Ontology Found
                      </p>
                      <p className="text-xs text-orange-700">
                        Generate a skills ontology to see detailed skills
                        and competencies.
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={generatedOntology}
                    disabled={isGenerateOntologyLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                  
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Generate Ontology
                      </>
                  
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Role Specific Information Section for Job Roles */}
        {type === "job_role" && (
          <div className="pt-6 border-t border-gray-100">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Role Specific Information
                </h3>
              </div>
              {existingRoleSpecificInfo ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-900">
                          Role Specific Information Available
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setTab("definitions");
                        setIsDialogOpen(true);
                      }}
                      variant="outline"
                      className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      View Role Specific Info
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-orange-900">
                        No Role Specific Information Found
                      </p>
                      <p className="text-xs text-orange-700">
                        Role specific information is not available for this role.
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={generatedRoleSpecificInfo}
                    disabled={isGenerateRoleSpecificInfoLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                      <>
                        <Target className="h-4 w-4 mr-2" />
                        Generate Role Specific Information
                      </>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4 justify-end">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
        </div>
      </div>
    </SheetContent>
    <RoleDialog 
    tab={tab} 
    isOpen={isDialogOpen} 
    onClose={() => setIsDialogOpen(false)} 
    roleTitle={roleTitle} 
    ontology={existingOntology} 
    roleSpecificInfo={existingRoleSpecificInfo} />
  </Sheet>
  );
};

export default RoleDrawer;