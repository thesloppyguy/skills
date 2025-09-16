"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  Building2,
  Users,
  Settings,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Workflow,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import OrganizationFlowEditor from "@/components/organization/OrganizationFlowEditor";
import {
  generateSkillsOntology,
  getOrganizations,
  deleteOrganization,
} from "@/services/app";
import {
  OrganizationStructure,
  JobFamily,
  JobRole,
  ProcessingStatus,
  SkillsOntology,
} from "@/types/organization";
import { useOrganization } from "@/contexts/OrganizationContext";

interface Organization {
  id: string;
  name: string;
  industry: string;
  size: string;
  departments: string[];
  description?: string;
  createdAt: string;
  roleCount: number;
}

// UUID generation utility
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const ManageOrganizationPage = () => {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [organizationData, setOrganizationData] =
    useState<OrganizationStructure | null>(null);
  const [skillsMap, setSkillsMap] = useState<Map<string, SkillsOntology>>(
    new Map()
  );
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    processedRoles: [],
    totalRoles: 0,
    errors: [],
  });

  const { addSkillsOntology } = useOrganization();

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const data = await getOrganizations();
      setOrganizations(data || []);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrganization = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      try {
        await deleteOrganization(id);
        setOrganizations(organizations.filter((org) => org.id !== id));
      } catch (error) {
        console.error("Error deleting organization:", error);
      }
    }
  };

  const handleEditOrganization = (id: string) => {
    router.push(`/organization/manage/${id}`);
  };

  const handleCreateNew = () => {
    router.push("/organization/create");
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

  // Function to check if all nodes have mapped data
  const checkMappedDataAvailability = (orgData: OrganizationStructure) => {
    if (!orgData) return false;

    const roles = collectAllJobRoles(orgData);
    return roles.every((role) => skillsMap.has(role.id));
  };

  // Function to process all roles and generate skills ontology
  const handleGenerateSkillsOntology = async () => {
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
        const skillsOntology: SkillsOntology = {
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
        };

        setSkillsMap((prev) => new Map(prev).set(role.id, skillsOntology));
        addSkillsOntology(role.id, skillsOntology);

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
  };

  const handleViewWorkflow = (org: Organization) => {
    setSelectedOrganization(org);
    // For now, we'll create a mock organization structure
    // In a real app, you'd fetch this from the API
    const mockOrgData: OrganizationStructure = {
      industry: org.industry,
      sub_entity: org.name,
      job_families: [
        {
          id: generateUUID(),
          name: "Engineering",
          definition: "Software development and technical roles",
          sub_job_families: [],
          job_roles: [
            { id: generateUUID(), title: "Software Engineer" },
            { id: generateUUID(), title: "Senior Software Engineer" },
            { id: generateUUID(), title: "Tech Lead" },
          ],
        },
        {
          id: generateUUID(),
          name: "Product",
          definition: "Product management and strategy roles",
          sub_job_families: [],
          job_roles: [
            { id: generateUUID(), title: "Product Manager" },
            { id: generateUUID(), title: "Senior Product Manager" },
          ],
        },
      ],
    };
    setOrganizationData(mockOrgData);
    setShowWorkflow(true);
  };

  const handleSaveOrganization = (data: OrganizationStructure) => {
    setOrganizationData(data);
    console.log("Organization saved:", data);
  };

  const editLoadingStates = [
    { text: "Analyzing organization requirements..." },
    { text: "Generating industry structure..." },
    { text: "Creating job families and roles..." },
    { text: "Building organizational hierarchy..." },
    { text: "Finalizing structure..." },
  ];

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading organizations...</p>
          </div>
        </div>
      </div>
    );
  }

  // If showing workflow, render the workflow interface
  if (showWorkflow && organizationData) {
    const hasMappedData = checkMappedDataAvailability(organizationData);

    return (
      <div className="flex flex-col p-4 gap-4">
        <MultiStepLoader
          loadingStates={editLoadingStates}
          loading={processingStatus.isProcessing}
          duration={2000}
          loop={false}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowWorkflow(false)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Organizations
            </Button>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Workflow className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedOrganization?.name} - Organization Structure
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {hasMappedData
                  ? "Workflow with mapped data"
                  : "Workflow needs skills ontology mapping"}
              </p>
            </div>
          </div>
        </div>

        {/* Skills Ontology Status */}
        {!hasMappedData && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-orange-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-900">
                    Skills Ontology Not Available
                  </h3>
                  <p className="text-sm text-orange-700">
                    This organization&apos;s workflow nodes don&apos;t have
                    mapped skills data. Generate skills ontology to enable full
                    workflow functionality.
                  </p>
                </div>
                <Button
                  onClick={handleGenerateSkillsOntology}
                  disabled={processingStatus.isProcessing}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {processingStatus.isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Skills Ontology
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

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
                      {processingStatus.processedRoles.length} roles processed
                      and saved
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        {/* Workflow Editor */}
        <div className="space-y-6">
          <OrganizationFlowEditor
            initialData={organizationData}
            onSave={handleSaveOrganization}
            processingStatus={processingStatus}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Manage Organizations
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              View and manage your organizations
            </p>
          </div>
          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </div>
      </div>

      {organizations.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No organizations found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get started by creating your first organization
            </p>
            <Button onClick={handleCreateNew}>
              <Plus className="h-4 w-4 mr-2" />
              Create Organization
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <Card key={org.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{org.name}</CardTitle>
                      <CardDescription>{org.industry}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{org.size}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {org.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {org.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{org.roleCount} roles</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Settings className="h-4 w-4" />
                      <span>{org.departments.length} departments</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {org.departments.slice(0, 3).map((dept) => (
                      <Badge key={dept} variant="outline" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                    {org.departments.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{org.departments.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewWorkflow(org)}
                      className="flex-1"
                    >
                      <Workflow className="h-4 w-4 mr-1" />
                      View Workflow
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditOrganization(org.id)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteOrganization(org.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrganizationPage;
