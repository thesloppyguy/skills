"use client";
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  generateOrganizationRoles,
  generateSkillsOntology,
} from "@/services/app";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { Sparkles, Workflow, RotateCcw, Save, CheckCircle } from "lucide-react";
import OrganizationFlowEditor from "@/components/organization/OrganizationFlowEditor";
import {
  OrganizationStructure,
  JobFamily,
  JobRole,
  ProcessingStatus,
} from "@/types/organization";
import { useOrganization } from "@/contexts/OrganizationContext";

// UUID generation utility
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const CreateOrganizationPage = () => {
  const [editQuery, setEditQuery] = useState<string>("");
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [showFlowEditor, setShowFlowEditor] = useState<boolean>(false);

  const {
    organizationData,
    setOrganizationData,
    saveToLocalStorage,
    hasStoredData,
    clearLocalStorage,
    addSkillsOntology,
    processingStatus,
    setProcessingStatus,
  } = useOrganization();

  // Check for existing data on mount and redirect to edit mode
  useEffect(() => {
    if (hasStoredData && organizationData) {
      setShowFlowEditor(true);
    }
  }, [hasStoredData, organizationData]);

  const editLoadingStates = [
    { text: "Analyzing organization requirements..." },
    { text: "Generating industry structure..." },
    { text: "Creating job families and roles..." },
    { text: "Building organizational hierarchy..." },
    { text: "Finalizing structure..." },
  ];

  const handleEdit = () => {
    if (!editQuery.trim()) return;

    setEditLoading(true);
    generateOrganizationRoles({
      query: {
        prompt: editQuery,
        memory: organizationData,
      },
    })
      .then((res) => {
        setEditLoading(false);
        const updatedData = res as OrganizationStructure;
        setOrganizationData(updatedData);
        saveToLocalStorage(updatedData);
        setEditQuery("");
        console.log("Organization updated:", res);
      })
      .catch((err) => {
        setEditLoading(false);
        console.log(err);
      });
  };

  const handleSaveOrganization = (data: OrganizationStructure) => {
    setOrganizationData(data);
    saveToLocalStorage(data);
    console.log("Organization saved:", data);
  };

  const handleStartFresh = () => {
    clearLocalStorage();
    setShowFlowEditor(false);
    setEditQuery("");
  };

  // Function to collect all job roles from the organization structure
  const collectAllJobRoles = (orgData: OrganizationStructure) => {
    const roles: Array<{
      id: string;
      title: string;
      parentDetails: {
        industry: string;
        subEntity: string;
        jobFamily?: string;
        subJobFamily?: string;
      };
      hierarchyPath: string[];
    }> = [];

    const processJobFamily = (
      jobFamily: JobFamily,
      parentPath: string[] = []
    ) => {
      // Add job family ID if not exists
      if (!jobFamily.id) {
        jobFamily.id = generateUUID();
      }

      // Build current hierarchy path: [industry, subEntity, ...parentPath, jobFamily.name]
      const currentHierarchyPath = [
        orgData.industry,
        orgData.sub_entity,
        ...parentPath,
        jobFamily.name,
      ];

      // Process job roles in this family
      jobFamily.job_roles.forEach((role: JobRole) => {
        if (!role.id) {
          role.id = generateUUID();
        }

        // Build complete hierarchy path for the role
        const roleHierarchyPath = [...currentHierarchyPath, role.title];

        roles.push({
          id: role.id,
          title: role.title,
          parentDetails: {
            industry: orgData.industry,
            subEntity: orgData.sub_entity,
            jobFamily: jobFamily.name,
            subJobFamily:
              parentPath.length > 0
                ? parentPath[parentPath.length - 1]
                : undefined,
          },
          hierarchyPath: roleHierarchyPath,
        });
      });

      // Process sub job families
      jobFamily.sub_job_families.forEach((subFamily: JobFamily) => {
        processJobFamily(subFamily, [...parentPath, jobFamily.name]);
      });
    };

    orgData.job_families.forEach((jobFamily) => {
      processJobFamily(jobFamily);
    });

    return roles;
  };

  // Function to process all roles and generate skills ontology
  const handleProceed = async () => {
    if (!organizationData) return;

    const roles = collectAllJobRoles(organizationData);

    setProcessingStatus({
      isProcessing: true,
      processedRoles: [],
      totalRoles: roles.length,
      errors: [],
    });

    // Process each role sequentially
    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];

      try {
        setProcessingStatus((prev: ProcessingStatus) => ({
          ...prev,
          currentRoleId: role.id,
        }));

        const response = (await generateSkillsOntology({
          roleTitle: role.title,
          parentDetails: role.parentDetails,
          hierarchyPath: role.hierarchyPath,
        })) as {
          skills?: { technical: string[]; soft: string[]; domain: string[] };
          competencies?: { required: string[]; preferred: string[] };
        };

        // Add the skills ontology to the map
        addSkillsOntology(role.id, {
          id: generateUUID(),
          roleId: role.id,
          roleTitle: role.title,
          parentDetails: role.parentDetails,
          hierarchyPath: role.hierarchyPath,
          skills: response.skills || { technical: [], soft: [], domain: [] },
          competencies: response.competencies || {
            required: [],
            preferred: [],
          },
          generatedAt: new Date().toISOString(),
        });

        setProcessingStatus((prev: ProcessingStatus) => ({
          ...prev,
          processedRoles: [...prev.processedRoles, role.id],
        }));

        // Add a small delay to show the processing effect
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error processing role ${role.title}:`, error);
        setProcessingStatus((prev: ProcessingStatus) => ({
          ...prev,
          errors: [...prev.errors, `Failed to process ${role.title}: ${error}`],
        }));
      }
    }

    setProcessingStatus((prev: ProcessingStatus) => ({
      ...prev,
      isProcessing: false,
      currentRoleId: undefined,
    }));

    // Save the updated organization data with IDs
    saveToLocalStorage(organizationData);
  };

  return (
    <div className="flex flex-col p-4 gap-4">
      <MultiStepLoader
        loadingStates={editLoadingStates}
        loading={editLoading}
        duration={2000}
        loop={false}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Workflow className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Organization Structure
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Edit and customize your organization structure
            </p>
          </div>
        </div>
      </div>

      {/* AI Edit Generator */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle className="text-xl">AI Structure Editor</CardTitle>
                <CardDescription>
                  Describe changes you want to make to the organization
                  structure
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleProceed}
                disabled={!organizationData || processingStatus.isProcessing}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {processingStatus.isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Proceed
                  </>
                )}
              </Button>
              <Button
                onClick={handleStartFresh}
                variant="outline"
                className="bg-red-50 hover:bg-red-100 border-red-200 text-red-700"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Start Fresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              value={editQuery}
              onChange={(e) => setEditQuery(e.target.value)}
              placeholder="Describe the changes you want to make to the organization structure. For example: 'Add a new job family for Marketing', 'Remove the Research department', 'Add more roles to Engineering'..."
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleEdit}
              disabled={editLoading || !editQuery.trim()}
              className="w-full sm:w-auto min-w-[200px]"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Processing Status */}
      {processingStatus.isProcessing && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <div>
                <h3 className="font-semibold text-blue-900">
                  Processing Skills Ontology
                </h3>
                <p className="text-sm text-blue-700">
                  {processingStatus.processedRoles.length} of{" "}
                  {processingStatus.totalRoles} roles processed
                </p>
                {processingStatus.currentRoleId && (
                  <p className="text-xs text-blue-600 mt-1">
                    Currently processing: {processingStatus.currentRoleId}
                  </p>
                )}
              </div>
            </div>
            {processingStatus.errors.length > 0 && (
              <div className="mt-3 p-2 bg-red-100 border border-red-200 rounded">
                <p className="text-sm text-red-700 font-medium">Errors:</p>
                {processingStatus.errors.map((error, index) => (
                  <p key={index} className="text-xs text-red-600">
                    {error}
                  </p>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Completion Status */}
      {!processingStatus.isProcessing &&
        processingStatus.processedRoles.length > 0 && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900">
                    Skills Ontology Generated Successfully
                  </h3>
                  <p className="text-sm text-green-700">
                    {processingStatus.processedRoles.length} roles processed and
                    saved
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      {showFlowEditor && (
        <div className="space-y-6">
          <OrganizationFlowEditor
            initialData={organizationData || undefined}
            onSave={handleSaveOrganization}
            processingStatus={processingStatus}
          />
        </div>
      )}
    </div>
  );
};

export default CreateOrganizationPage;
