"use client";
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  generateOrganizationRoles,
  generateSkillsOntology,
  getRoleSpecificInformation,
} from "@/services/app";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import {
  Sparkles,
  Workflow,
  FileArchive,
  Save,
  CheckCircle,
  Eye,
} from "lucide-react";
import OrganizationFlowEditor from "@/components/organization/OrganizationFlowEditor";
import OrganizationSwitcher from "@/components/organization/OrganizationSwitcher";
import {
  OrganizationStructure,
  JobFamily,
  JobRole,
  ProcessingStatus,
  Domain,
  OntologyRelationship,
  RoleSpecificSkills,
  RoleSpecificSkillsResponse,
} from "@/types/organization";
import { useOrganization } from "@/contexts/OrganizationContext";
import { OrganizationOption } from "@/components/organization/OrganizationSwitcher";
import { v4 as uuidv4 } from "uuid";

const CreateOrganizationPage = () => {
  const [editQuery, setEditQuery] = useState<string>("");
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [showFlowEditor, setShowFlowEditor] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const {
    organizationData,
    setOrganizationData,
    saveToLocalStorage,
    customOrganization,
    setCustomOrganization,
    hasStoredData,
    clearLocalStorage,
    addSkillsOntology,
    addRoleSpecificSkills,
    processingStatus,
    setProcessingStatus,
    loadSkillsOntologyFromStorage,
    loadRoleSpecificSkillsFromStorage,
    skillsMap,
    roleSpecificSkillsMap,
    currentOrgId,
    currentOrgType,
    switchToOrganization,
    createNewOrganization,
  } = useOrganization();

  // Check for existing data on mount and redirect to edit mode
  useEffect(() => {
    if (hasStoredData && organizationData) {
      setShowFlowEditor(true);
    }

    // Load cached skills ontology and role-specific skills for custom organizations
    if (currentOrgType === 'custom') {
      const cachedSkills = loadSkillsOntologyFromStorage();
      if (cachedSkills) {
        console.log(
          `Loaded ${cachedSkills.size} cached skills ontologies from localStorage`
        );
      }
      
      const cachedRoleSpecificSkills = loadRoleSpecificSkillsFromStorage();
      if (cachedRoleSpecificSkills) {
        console.log(
          `Loaded ${cachedRoleSpecificSkills.size} cached role-specific skills from localStorage`
        );
      }
    }
  }, [hasStoredData, organizationData, loadSkillsOntologyFromStorage, currentOrgType]);

  // Keyboard shortcut for Ctrl/Cmd+K
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsDialogOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
        memory: currentOrgType === 'preset' ? organizationData : customOrganization,
      },
    })
      .then((res) => {
        setEditLoading(false);
        const updatedData = res as OrganizationStructure;
        setOrganizationData(updatedData);
        saveToLocalStorage(updatedData);
        setCustomOrganization(updatedData);
        setEditQuery("");
        setIsDialogOpen(false);
        console.log("Organization updated:", res);
      })
      .catch((err) => {
        setEditLoading(false);
        console.log(err);
      });
  };

  const handleDialogSubmit = () => {
    handleEdit();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      handleDialogSubmit();
    }
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

  const handleOrganizationChange = (org: OrganizationOption) => {
    switchToOrganization(org);
    setShowFlowEditor(true);
  };

  const handleCreateNew = () => {
    createNewOrganization();
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
        jobFamily.id = uuidv4();
      }

      // Build current hierarchy path: [industry, subEntity, ...parentPath, jobFamily.name]
      const currentHierarchyPath = [
        orgData.industry,
        orgData.sub_entity,
        ...parentPath,
        jobFamily.name,
      ];

      // Process job roles in this family
      if (jobFamily.job_roles) {
        jobFamily.job_roles.forEach((role: JobRole) => {
          if (!role.id) {
            role.id = uuidv4();
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
      }

      // Process sub job families
      if (jobFamily.sub_job_families) {
        jobFamily.sub_job_families.forEach((subFamily: JobFamily) => {
          processJobFamily(subFamily, [...parentPath, jobFamily.name]);
        });
      }
    };

    orgData.job_families.forEach((jobFamily) => {
      processJobFamily(jobFamily);
    });

    return roles;
  };

  // Function to process all roles and generate both role-specific skills and skills ontology
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
          currentRoleTitle: role.title,
        }));

        // Call both APIs in parallel for better performance
        const [roleSpecificSkillsResponse, skillsOntologyResponse] = await Promise.all([
          getRoleSpecificInformation({
            roleTitle: role.title,
            parentDetails: role.parentDetails,
            hierarchyPath: role.hierarchyPath,
          }) as unknown as Promise<RoleSpecificSkillsResponse>,
          generateSkillsOntology({
            roleTitle: role.title,
            parentDetails: role.parentDetails,
            hierarchyPath: role.hierarchyPath,
          }) as Promise<{
            hierarchy?: Domain[];
            ontology?: OntologyRelationship[];
          }>
        ]);
        

        addRoleSpecificSkills(role.title, roleSpecificSkillsResponse);

        // Add the skills ontology to the map
        const skillsOntologyData = {
          id: uuidv4(),
          roleId: role.id,
          roleTitle: role.title,
          parentDetails: role.parentDetails,
          hierarchyPath: role.hierarchyPath,
          hierarchy: skillsOntologyResponse.hierarchy || [],
          ontology: skillsOntologyResponse.ontology || [],
          generatedAt: new Date().toISOString(),
        };
        addSkillsOntology(role.title, skillsOntologyData);
        console.log(`Stored skills ontology for ${role.title}:`, skillsOntologyData);

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
        <div className="flex gap-2">
        {/* Organization Switcher */}
        <OrganizationSwitcher
          currentOrgId={currentOrgId}
          onOrganizationChange={handleOrganizationChange}
          onCreateNew={handleCreateNew}
          disabled={processingStatus.isProcessing}
          header={false}
        />
          {/* AI Edit Generator Dialog */}
          {currentOrgType === 'custom' && <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className=" bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                AI Generate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  AI Structure Editor
                </DialogTitle>
                <DialogDescription>
                  Describe changes you want to make to the organization
                  structure. Press Ctrl/Cmd+Enter to submit.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  value={editQuery}
                  onChange={(e) => setEditQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe the changes you want to make to the organization structure. For example: 'Add a new job family for Marketing', 'Remove the Research department', 'Add more roles to Engineering'..."
                  className="min-h-[120px] resize-none"
                />
              </div>
              <DialogFooter>
                <Button
                  onClick={handleDialogSubmit}
                  disabled={editLoading || !editQuery.trim()}
                  className="w-full sm:w-auto min-w-[200px]"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>}

          {currentOrgType === 'custom' && <Button
            variant="outline"
            onClick={handleProceed}
            disabled={!organizationData || processingStatus.isProcessing}
            className=" bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
          >
            {processingStatus.isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Generate Skills Data
              </>
            )}
          </Button>}
          {/* Debug Cache Information */}
          {showFlowEditor && currentOrgType === 'custom' && (
                  <Button
                    onClick={() => {
                      clearLocalStorage();
                      window.location.reload();
                    }}
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                Clear All Cache
              </Button>
          )}
        </div>
      </div>

      {/* Processing Status */}
      {processingStatus.isProcessing && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <div>
                <h3 className="font-semibold text-blue-900">
                  Processing Skills Data
                </h3>
                <p className="text-sm text-blue-700">
                  {processingStatus.processedRoles.length} of{" "}
                  {processingStatus.totalRoles} roles processed
                </p>
                {processingStatus.currentRoleId && (
                  <p className="text-xs text-blue-600 mt-1">
                    Currently processing: {processingStatus.currentRoleTitle}
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
                    Skills Data Generated Successfully
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
            initialData={(currentOrgType === 'preset' ? organizationData : customOrganization) || undefined}
            onSave={handleSaveOrganization}
            processingStatus={processingStatus}
          />
        </div>
      )}
    </div>
  );
};

export default CreateOrganizationPage;
