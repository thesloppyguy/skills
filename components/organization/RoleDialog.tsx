"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Building2 } from "lucide-react";
import { SkillsOntology, Task } from "@/types/organization";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Ontology from "./Ontology";

interface RoleDialogProps {
  tab: string;
  isOpen: boolean;
  onClose: () => void;
  roleTitle: string;
  ontology?: SkillsOntology;
  roleSpecificInfo?: Task[];
}

const RoleDialog: React.FC<RoleDialogProps> = ({
  tab,
  isOpen,
  onClose,
  roleTitle,
  ontology,
  roleSpecificInfo,
}) => {
  const renderTask = (task: Task, index: number) => {
    return (
      <Card key={index} className="border border-gray-200">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-900 text-lg">
                {task.name}
              </h3>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Definition:</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {task.definition}
              </p>
            </div>

            {task.related_occupations && task.related_occupations.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Related Occupations ({task.related_occupations.length}):
                </h4>
                <div className="flex flex-wrap gap-1">
                  {task.related_occupations.map((occupation, occIndex) => (
                    <Badge
                      key={occIndex}
                      variant="outline"
                      className="text-xs bg-gray-50"
                    >
                      {occupation}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <Target className="h-6 w-6 text-blue-600" />
            Role Specific Information
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Detailed tasks and information for {roleTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Tabs>
            <TabsList className="flex w-full" defaultValue={tab}>
              <TabsTrigger value="definitions">Definitions</TabsTrigger>
              <TabsTrigger value="ontology">Ontology</TabsTrigger>
            </TabsList>
            <TabsContent value="ontology">
            {ontology && (
          <Ontology ontology={ontology} />
            )}
            </TabsContent>
            <TabsContent value="definitions">
            {roleSpecificInfo && roleSpecificInfo.length > 0 && (
            <div className="space-y-4">
              <div className="space-y-4">
                {roleSpecificInfo.map((task, index) =>
                  renderTask(task, index)
                )}
              </div>
            </div>
          )}
          {roleSpecificInfo && roleSpecificInfo.length === 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-orange-900">
                      No Tasks Available
                    </p>
                    <p className="text-xs text-orange-700">
                      No specific tasks were found for this role.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleDialog;
