/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  NodeTypes,
  EdgeTypes,
  MiniMap,
  Panel,
  Handle,
  Position,
  useReactFlow,
  ConnectionMode,
  ConnectionLineType,
  ReactFlowProvider,
  SelectionMode,
  useOnSelectionChange,
  OnSelectionChangeParams,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Plus,
  Trash2,
  Building2,
  Users,
  Briefcase,
  User,
  RotateCcw,
  Pencil,
  AlignCenter,
  RefreshCw,
  Brain,
  CheckCircle,
  AlertCircle,
  Target,
  Loader2,
} from "lucide-react";
import {
  OrganizationStructure,
  JobFamily,
  SkillsOntology,
  Domain,
  OntologyRelationship,
  RoleSpecificSkillsResponse,
} from "@/types/organization";
import { useOrganization } from "@/contexts/OrganizationContext";
import SkillsOntologyDrawer from "./RoleDrawer";
import OntologyVisualization from "./Ontology";
import { generateSkillsOntology, getRoleSpecificInformation } from "@/services/app";
import { v4 as uuidv4 } from "uuid";
import RoleDrawer from "./RoleDrawer";

// Custom Node Components
const IndustryNode = ({
  data,
  selected,
}: {
  data: {
    label: string;
    level: number;
    hierarchyPath?: string[];
    onEdit?: () => void;
    onDelete?: () => void;
  };
  selected: boolean;
}) => (
  <div
    className={`w-64 max-h-20 px-4 py-2 shadow-md rounded-md bg-blue-100 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 ${
      selected ? "border-blue-500" : "border-blue-200"
    }`}
  >
    <Handle
      type="source"
      position={Position.Right}
      className="w-3 h-3 bg-blue-500 border-2 border-white"
    />
    <div className="flex items-center justify-between gap-2 h-full">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Building2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
        <div className="font-bold text-blue-800 truncate">{data.label}</div>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            data.onEdit?.();
          }}
          className="p-1 hover:bg-blue-200 rounded transition-colors"
        >
          <Pencil className="h-3 w-3 text-blue-600" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete?.();
          }}
          className="p-1 hover:bg-red-200 rounded transition-colors"
        >
          <Trash2 className="h-3 w-3 text-red-600" />
        </button>
      </div>
    </div>
  </div>
);

const SubEntityNode = ({
  data,
  selected,
}: {
  data: {
    label: string;
    level: number;
    hierarchyPath?: string[];
    onEdit?: () => void;
    onDelete?: () => void;
  };
  selected: boolean;
}) => (
  <div
    className={`w-64 max-h-20 px-4 py-2 shadow-md rounded-md bg-green-100 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 ${
      selected ? "border-green-500" : "border-green-200"
    }`}
  >
    <Handle
      type="target"
      position={Position.Left}
      className="w-3 h-3 bg-green-500 border-2 border-white"
    />
    <Handle
      type="source"
      position={Position.Right}
      className="w-3 h-3 bg-green-500 border-2 border-white"
    />
    <div className="flex items-center justify-between gap-2 h-full">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Building2 className="h-4 w-4 text-green-600 flex-shrink-0" />
        <div className="font-semibold text-green-800 truncate">
          {data.label}
        </div>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            data.onEdit?.();
          }}
          className="p-1 hover:bg-green-200 rounded transition-colors"
        >
          <Pencil className="h-3 w-3 text-green-600" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete?.();
          }}
          className="p-1 hover:bg-red-200 rounded transition-colors"
        >
          <Trash2 className="h-3 w-3 text-red-600" />
        </button>
      </div>
    </div>
  </div>
);

const JobFamilyNode = ({
  data,
  selected,
}: {
  data: {
    label: string;
    definition?: string;
    level: number;
    hierarchyPath?: string[];
    onEdit?: () => void;
    onDelete?: () => void;
  };
  selected: boolean;
}) => (
  <div
    className={`w-64 max-h-24 px-4 py-2 shadow-md rounded-md bg-purple-100 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 ${
      selected ? "border-purple-500" : "border-purple-200"
    }`}
  >
    <Handle
      type="target"
      position={Position.Left}
      className="w-3 h-3 bg-purple-500 border-2 border-white"
    />
    <Handle
      type="source"
      position={Position.Right}
      className="w-3 h-3 bg-purple-500 border-2 border-white"
    />
    <div className="flex items-center justify-between gap-2 h-full">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Users className="h-4 w-4 text-purple-600 flex-shrink-0" />
        <div className="font-medium text-purple-800 truncate">{data.label}</div>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            data.onEdit?.();
          }}
          className="p-1 hover:bg-purple-200 rounded transition-colors"
        >
          <Pencil className="h-3 w-3 text-purple-600" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete?.();
          }}
          className="p-1 hover:bg-red-200 rounded transition-colors"
        >
          <Trash2 className="h-3 w-3 text-red-600" />
        </button>
      </div>
    </div>
    {data.definition && (
      <div className="text-xs text-purple-600 mt-1 truncate">
        {data.definition}
      </div>
    )}
  </div>
);

const NestedJobFamilyNode = ({
  data,
  selected,
}: {
  data: {
    label: string;
    definition?: string;
    level: number;
    hierarchyPath?: string[];
    onEdit?: () => void;
    onDelete?: () => void;
  };
  selected: boolean;
}) => (
  <div
    className={`w-64 max-h-24 px-4 py-2 shadow-md rounded-md bg-orange-100 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 ${
      selected ? "border-orange-500" : "border-orange-200"
    }`}
  >
    <Handle
      type="target"
      position={Position.Left}
      className="w-3 h-3 bg-orange-500 border-2 border-white"
    />
    <Handle
      type="source"
      position={Position.Right}
      className="w-3 h-3 bg-orange-500 border-2 border-white"
    />
    <div className="flex items-center justify-between gap-2 h-full">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Briefcase className="h-4 w-4 text-orange-600 flex-shrink-0" />
        <div className="font-medium text-orange-800 truncate">{data.label}</div>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            data.onEdit?.();
          }}
          className="p-1 hover:bg-orange-200 rounded transition-colors"
        >
          <Pencil className="h-3 w-3 text-orange-600" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete?.();
          }}
          className="p-1 hover:bg-red-200 rounded transition-colors"
        >
          <Trash2 className="h-3 w-3 text-red-600" />
        </button>
      </div>
    </div>
    {data.definition && (
      <div className="text-xs text-orange-600 mt-1 truncate">
        {data.definition}
      </div>
    )}
  </div>
);

const JobRoleNode = ({
  data,
  selected,
  processingStatus,
  onViewSkillsOntology,
  hasSkillsOntology,
  onViewRoleSpecificInfo,
  hasRoleSpecificInfo,
}: {
  data: {
    label: string;
    level: number;
    hierarchyPath?: string[];
    onEdit?: () => void;
    onDelete?: () => void;
    id?: string;
  };
  selected: boolean;
  processingStatus?: {
    isProcessing: boolean;
    currentRoleId?: string;
    processedRoles: string[];
    totalRoles: number;
    errors: string[];
  };
  onViewSkillsOntology?: () => void;
  hasSkillsOntology?: boolean;
  onViewRoleSpecificInfo?: () => void;
  hasRoleSpecificInfo?: boolean;
}) => {
  const isCurrentlyProcessing = processingStatus?.currentRoleId === data.id;
  const isProcessed = processingStatus?.processedRoles.includes(data.id || "");
  const hasError = processingStatus?.errors.some((error) =>
    error.includes(data.label)
  );

  let nodeClasses =
    "w-48 max-h-16 px-3 py-1 shadow-sm rounded-md border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 ";

  if (isCurrentlyProcessing) {
    nodeClasses += "bg-yellow-100 border-yellow-500 animate-pulse";
  } else if (isProcessed) {
    nodeClasses += "bg-green-100 border-green-500";
  } else if (hasError) {
    nodeClasses += "bg-red-100 border-red-500";
  } else if (selected) {
    nodeClasses += "bg-gray-100 border-gray-500";
  } else {
    nodeClasses += "bg-gray-100 border-gray-200";
  }

  return (
    <div className={nodeClasses}>
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-gray-500 border border-white"
      />
      <div className="flex items-center justify-between gap-2 h-full">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <User className="h-3 w-3 text-gray-600 flex-shrink-0" />
          <div className="text-sm text-gray-800 truncate">{data.label}</div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {onViewSkillsOntology && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewSkillsOntology();
              }}
              className={`p-1 rounded transition-colors ${
                hasSkillsOntology
                  ? "hover:bg-green-200 text-green-600"
                  : "hover:bg-blue-200 text-blue-600"
              }`}
              title={
                hasSkillsOntology
                  ? "View Skills Ontology"
                  : "Generate Skills Ontology"
              }
            >
              <Brain className="h-2 w-2" />
            </button>
          )}
          {onViewRoleSpecificInfo && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewRoleSpecificInfo();
              }}
              className={`p-1 rounded transition-colors ${
                hasRoleSpecificInfo
                  ? "hover:bg-purple-200 text-purple-600"
                  : "hover:bg-orange-200 text-orange-600"
              }`}
              title={
                hasRoleSpecificInfo
                  ? "View Role Specific Info"
                  : "Generate Role Specific Info"
              }
            >
              <Target className="h-2 w-2" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              data.onEdit?.();
            }}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <Pencil className="h-2 w-2 text-gray-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              data.onDelete?.();
            }}
            className="p-1 hover:bg-red-200 rounded transition-colors"
          >
            <Trash2 className="h-2 w-2 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom Edge Components - Using default edge for now
const HierarchicalEdge = () => null;

// Create node types with processing status and skills ontology
const createNodeTypes = (
  processingStatus?: {
    isProcessing: boolean;
    currentRoleId?: string;
    processedRoles: string[];
    totalRoles: number;
    errors: string[];
  },
  onViewSkillsOntology?: (nodeId: string) => void,
  skillsMap?: Map<string, SkillsOntology>,
  onViewRoleSpecificInfo?: (nodeId: string) => void,
  roleSpecificSkillsMap?: Map<string, any>
): NodeTypes => ({
  industry: IndustryNode,
  sub_entity: SubEntityNode,
  job_family: JobFamilyNode,
  nested_job_family: NestedJobFamilyNode,
  job_role: (props: {
    data: {
      id?: string;
      label: string;
      level: number;
      hierarchyPath?: string[];
      onEdit?: () => void;
      onDelete?: () => void;
    };
    selected: boolean;
  }) => (
    <JobRoleNode
      {...props}
      processingStatus={processingStatus}
      onViewSkillsOntology={
        props.data.id ? () => onViewSkillsOntology?.(props.data.id!) : undefined
      }
      hasSkillsOntology={props.data.id ? skillsMap?.has(props.data.id) : false}
      onViewRoleSpecificInfo={
        props.data.id ? () => onViewRoleSpecificInfo?.(props.data.id!) : undefined
      }
      hasRoleSpecificInfo={props.data.id ? roleSpecificSkillsMap?.has(props.data.label) : false}
    />
  ),
});

const edgeTypes: EdgeTypes = {
  hierarchical: HierarchicalEdge,
};

interface OrganizationFlowEditorProps {
  initialData?: OrganizationStructure;
  onSave?: (data: OrganizationStructure) => void;
  processingStatus?: {
    isProcessing: boolean;
    currentRoleId?: string;
    processedRoles: string[];
    totalRoles: number;
    errors: string[];
  };
}

// Inner component that uses React Flow hooks
const FlowEditorContent: React.FC<OrganizationFlowEditorProps> = ({
  initialData,
  processingStatus,
}) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [editData, setEditData] = useState({ name: "", definition: "" });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingNode, setEditingNode] = useState<Node | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    node?: Node;
    screenX?: number;
    screenY?: number;
  } | null>(null);
  const [isSkillsDrawerOpen, setIsSkillsDrawerOpen] = useState(false);
  const [isVisualizationOpen, setIsVisualizationOpen] = useState(false);
  const [selectedRoleForSkills, setSelectedRoleForSkills] =
    useState<Node | null>(null);
  const [isGeneratingOntology, setIsGeneratingOntology] = useState(false);
  const [ontologyGenerationError, setOntologyGenerationError] = useState<
    string | null
  >(null);
  const { fitView, screenToFlowPosition } = useReactFlow();
  const { setIsDirty, skillsMap, addSkillsOntology, roleSpecificSkillsMap, addRoleSpecificSkills } = useOrganization();
  const [isRoleSpecificInfoOpen, setIsRoleSpecificInfoOpen] = useState(false);
  const [isGeneratingRoleInfo, setIsGeneratingRoleInfo] = useState(false);

  const handleEditNode = useCallback((node: Node) => {
    setEditingNode(node);
    setEditData({
      name: node.data.label as string,
      definition: (node.data.definition as string) || "",
    });
    setIsDrawerOpen(true);
  }, []);

  const handleSkillsOntologyGenerated = useCallback(
    (roleTitle: string, ontology: SkillsOntology) => {
      addSkillsOntology(roleTitle, ontology);
    },
    [addSkillsOntology]
  );

  const handleGenerateOntologyFromEdit = useCallback(async () => {
    if (!editingNode || editingNode.type !== "job_role") return;

    // Check if skills ontology already exists in cache
    if (skillsMap.has(editingNode.id)) {
      console.log(
        "Skills ontology already exists for this role, using cached data"
      );
      return;
    }

    setIsGeneratingOntology(true);
    setOntologyGenerationError(null);

    try {
      const hierarchyPath = editingNode.data.hierarchyPath as string[];
      const response = (await generateSkillsOntology({
        roleTitle: editingNode.data.label as string,
        parentDetails: {
          industry: hierarchyPath[0] || "",
          subEntity: hierarchyPath[1] || "",
          jobFamily: hierarchyPath[2] || "",
          subJobFamily: hierarchyPath[3] || undefined,
        },
        hierarchyPath,
      })) as {
        hierarchy?: Domain[];
        ontology?: OntologyRelationship[];
      };

      const newOntology: SkillsOntology = {
        id: uuidv4(),
        roleId: editingNode.id,
        roleTitle: editingNode.data.label as string,
        parentDetails: {
          industry: hierarchyPath[0] || "",
          subEntity: hierarchyPath[1] || "",
          jobFamily: hierarchyPath[2] || "",
          subJobFamily: hierarchyPath[3] || undefined,
        },
        hierarchyPath,
        hierarchy: response.hierarchy || [],
        ontology: response.ontology || [],
        generatedAt: new Date().toISOString(),
      };

      addSkillsOntology(newOntology.roleTitle, newOntology);
    } catch (error) {
      console.error("Error generating skills ontology:", error);
      setOntologyGenerationError(
        error instanceof Error
          ? error.message
          : "Failed to generate skills ontology"
      );
    } finally {
      setIsGeneratingOntology(false);
    }
  }, [editingNode, addSkillsOntology, skillsMap]);

  const handleGenerateRoleSpecificInfo = useCallback(async () => {
    if (!editingNode || editingNode.type !== "job_role") return;

    setIsGeneratingRoleInfo(true);
    try {
      const hierarchyPath = editingNode.data.hierarchyPath as string[];
      const response: RoleSpecificSkillsResponse = await getRoleSpecificInformation({
        roleTitle: editingNode.data.label as string,
        parentDetails: {
          industry: hierarchyPath[0] || "",
          subEntity: hierarchyPath[1] || "",
          jobFamily: hierarchyPath[2] || "",
          subJobFamily: hierarchyPath[3] || "",
        },
        hierarchyPath: hierarchyPath,
      });

      if (response) {
        addRoleSpecificSkills(editingNode.data.label as string, response.tasks);
      }
    } catch (error) {
      console.error("Error generating role specific information:", error);
    } finally {
      setIsGeneratingRoleInfo(false);
    }
  }, [editingNode, addRoleSpecificSkills]);

  // Convert organization data to flow nodes and edges
  const convertToFlowData = useCallback((data: OrganizationStructure) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let nodeId = 0;

    const HORIZONTAL_SPACING = 350; // Space between levels
    const VERTICAL_SPACING = 120; // Space between nodes at same level

    // Industry node - positioned at the top center
    nodes.push({
      id: "industry",
      type: "industry",
      data: { label: data.industry, level: 0, hierarchyPath: [] },
      position: { x: -100, y: 50 },
    });

    // Sub entity node - positioned below industry
    nodes.push({
      id: "sub_entity",
      type: "sub_entity",
      data: {
        label: data.sub_entity,
        level: 1,
        hierarchyPath: [data.industry],
      },
      position: { x: 200, y: 50 + VERTICAL_SPACING },
    });
    edges.push({
      id: "industry-sub_entity",
      source: "industry",
      target: "sub_entity",
      type: "smoothstep",
    });

    // Calculate total height needed for all job families
    const calculateTotalHeight = (families: JobFamily[]): number => {
      return families.reduce((total, family) => {
        const familyHeight = VERTICAL_SPACING;
        const subFamiliesHeight =
          family.sub_job_families && family.sub_job_families.length > 0
            ? calculateTotalHeight(family.sub_job_families)
            : 0;
        const rolesHeight =
          family.job_roles && family.job_roles.length > 0
            ? family.job_roles.length * VERTICAL_SPACING
            : 0;
        return total + Math.max(familyHeight, subFamiliesHeight, rolesHeight);
      }, 0);
    };

    const totalHeight = calculateTotalHeight(data.job_families);
    const startY = 50 + 2 * VERTICAL_SPACING; // Start below sub_entity

    // Track used Y positions to avoid overlaps
    const usedYPositions = new Set<number>();

    // Recursive function to process job families with improved layout
    const processJobFamily = (
      jobFamily: JobFamily,
      parentId: string,
      level: number,
      xOffset: number,
      yOffset: number,
      hierarchyPath: string[],
      siblingIndex: number = 0,
      totalSiblings: number = 1
    ) => {
      const familyId = `job_family_${nodeId++}`;
      const currentHierarchyPath = [...hierarchyPath, jobFamily.name];

      // Calculate Y position to avoid overlaps
      let finalY = yOffset;
      if (totalSiblings > 1) {
        const spacing = Math.max(VERTICAL_SPACING, totalHeight / totalSiblings);
        finalY = yOffset + siblingIndex * spacing;
      }

      // Ensure no overlap with existing nodes
      while (usedYPositions.has(Math.round(finalY / 10) * 10)) {
        finalY += VERTICAL_SPACING;
      }
      usedYPositions.add(Math.round(finalY / 10) * 10);

      nodes.push({
        id: familyId,
        type: level === 2 ? "job_family" : "nested_job_family",
        data: {
          label: jobFamily.name,
          definition: jobFamily.definition,
          level: level,
          hierarchyPath: currentHierarchyPath,
        },
        position: { x: xOffset, y: finalY },
      });

      // Connect to parent
      edges.push({
        id: `${parentId}-${familyId}`,
        source: parentId,
        target: familyId,
        type: "smoothstep",
      });

      const currentXOffset = xOffset + HORIZONTAL_SPACING;

      // Process nested job families - arrange them vertically
      if (jobFamily.sub_job_families && jobFamily.sub_job_families.length > 0) {
        const subSpacing = Math.max(VERTICAL_SPACING, 200);
        const subStartY = finalY;

        jobFamily.sub_job_families.forEach(
          (subFamily: JobFamily, subIndex: number) => {
            const subY = subStartY + subIndex * subSpacing;

            processJobFamily(
              subFamily,
              familyId,
              level + 1,
              currentXOffset,
              subY,
              currentHierarchyPath,
              subIndex,
              jobFamily.sub_job_families.length
            );
          }
        );
      }

      // Process job roles - arrange them vertically to the right
      if (jobFamily.job_roles && jobFamily.job_roles.length > 0) {
        const roleSpacing = Math.max(VERTICAL_SPACING, 100);
        const roleStartY = finalY;

        jobFamily.job_roles.forEach(
          (role: { title: string; definition: string }, roleIndex: number) => {
            const roleId = `role_${nodeId++}`;
            const roleY = roleStartY + roleIndex * roleSpacing;

            // Ensure no overlap with existing nodes
            let finalRoleY = roleY;
            while (usedYPositions.has(Math.round(finalRoleY / 10) * 10)) {
              finalRoleY += VERTICAL_SPACING;
            }
            usedYPositions.add(Math.round(finalRoleY / 10) * 10);

            nodes.push({
              id: roleId,
              type: "job_role",
              data: {
                label: role.title,
                level: level + 1,
                hierarchyPath: currentHierarchyPath,
                definition: role.definition,
              },
              position: {
                x: currentXOffset,
                y: finalRoleY,
              },
            });
            edges.push({
              id: `${familyId}-${roleId}`,
              source: familyId,
              target: roleId,
              type: "smoothstep",
            });
          }
        );
      }
    };

    // Process top-level job families with proper spacing
    data.job_families.forEach((jobFamily, familyIndex) => {
      const yPosition =
        startY +
        familyIndex *
          Math.max(VERTICAL_SPACING, totalHeight / data.job_families.length);

      processJobFamily(
        jobFamily,
        "sub_entity",
        2,
        200 + HORIZONTAL_SPACING, // Start at first level to the right
        yPosition,
        [data.industry, data.sub_entity],
        familyIndex,
        data.job_families.length
      );
    });

    return { nodes, edges };
  }, []);

  const initialFlowData = useMemo(() => {
    if (initialData) {
      return convertToFlowData(initialData);
    }
    return { nodes: [], edges: [] };
  }, [initialData, convertToFlowData]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialFlowData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialFlowData.edges);

  const handleViewSkillsOntology = useCallback(
    (nodeId: string) => {
      const node = nodes.find((n) => n.id === nodeId);
      if (node) {
        setSelectedRoleForSkills(node);
        setIsVisualizationOpen(true);
      }
    },
    [nodes]
  );

  // Update flow data when initialData changes
  useEffect(() => {
    if (initialData) {
      const newFlowData = convertToFlowData(initialData);
      setNodes(newFlowData.nodes);
      setEdges(newFlowData.edges);
    }
  }, [initialData, convertToFlowData, setNodes, setEdges]);

  // Handle selection changes
  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes }: OnSelectionChangeParams) => {
      if (selectedNodes.length === 1) {
        setSelectedNode(selectedNodes[0]);
      } else if (selectedNodes.length === 0) {
        setSelectedNode(null);
      }
    },
    []
  );

  useOnSelectionChange({
    onChange: onSelectionChange,
  });

  const handleDeleteNode = useCallback(
    (node: Node) => {
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== node.id && edge.target !== node.id)
      );
      if (selectedNode?.id === node.id) {
        setSelectedNode(null);
      }
      if (editingNode?.id === node.id) {
        setEditingNode(null);
        setIsDrawerOpen(false);
      }
      setIsDirty(true);
    },
    [selectedNode, editingNode, setNodes, setEdges, setIsDirty]
  );

  // Helper function to validate connections
  const isValidConnection = useCallback(
    (params: Connection | Edge) => {
      // Handle both Connection and Edge types
      const source = "source" in params ? params.source : "";
      const target = "target" in params ? params.target : "";

      if (!source || !target) return false;

      // Prevent self-connections
      if (source === target) return false;

      // Get source and target nodes
      const sourceNode = nodes.find((n) => n.id === source);
      const targetNode = nodes.find((n) => n.id === target);

      if (!sourceNode || !targetNode) return false;

      // Allow all valid connections for now - we can add more specific validation later
      // The main goal is to prevent self-connections and invalid node references
      return true;
    },
    [nodes]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      // Validate connection before adding
      if (!isValidConnection(params)) return;

      // Add the edge with proper validation
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges, isValidConnection]
  );

  // Context menu handlers
  const handleNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        node,
      });
    },
    []
  );

  const handlePaneContextMenu = useCallback(
    (event: MouseEvent | React.MouseEvent) => {
      event.preventDefault();
      const clientX =
        "clientX" in event ? event.clientX : (event as MouseEvent).clientX;
      const clientY =
        "clientY" in event ? event.clientY : (event as MouseEvent).clientY;
      setContextMenu({
        x: clientX,
        y: clientY,
        screenX: clientX,
        screenY: clientY,
      });
    },
    []
  );

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Center origin node and reposition children
  const centerOriginNode = useCallback(() => {
    const industryNode = nodes.find((n) => n.type === "industry");
    if (!industryNode) return;

    // Calculate the center of the viewport
    const viewportCenter = { x: 300, y: 150 };

    // Calculate offset needed to move industry node to center
    const offsetX = viewportCenter.x - industryNode.position.x;
    const offsetY = viewportCenter.y - industryNode.position.y;

    // Apply offset to all nodes
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        position: {
          x: node.position.x + offsetX,
          y: node.position.y + offsetY,
        },
      }))
    );
  }, [nodes, setNodes]);

  // Recalculate nodes and edges layout
  const recalculateLayout = useCallback(() => {
    // Get current organization data from nodes
    const industryNode = nodes.find((n) => n.type === "industry");
    const subEntityNode = nodes.find((n) => n.type === "sub_entity");

    if (!industryNode || !subEntityNode) return;

    // Build organization structure from current nodes
    const buildJobFamilyFromNodes = (parentId: string): JobFamily[] => {
      const childFamilies = nodes.filter(
        (n) =>
          (n.type === "job_family" || n.type === "nested_job_family") &&
          edges.some((e) => e.source === parentId && e.target === n.id)
      );

      return childFamilies.map((familyNode) => {
        const roleNodes = nodes.filter(
          (n) =>
            n.type === "job_role" &&
            edges.some((e) => e.source === familyNode.id && e.target === n.id)
        );

        const subJobFamilies = buildJobFamilyFromNodes(familyNode.id);

        return {
          name: familyNode.data.label as string,
          definition: (familyNode.data.definition as string) || "",
          sub_job_families: subJobFamilies,
          job_roles: roleNodes.map((roleNode) => ({
            title: roleNode.data.label as string,
            definition: (roleNode.data.definition as string) || "",
          })),
        };
      });
    };

    const organizationData: OrganizationStructure = {
      industry: industryNode.data.label as string,
      sub_entity: subEntityNode.data.label as string,
      job_families: buildJobFamilyFromNodes(subEntityNode.id),
    };

    // Recalculate layout with fresh positioning
    const flowData = convertToFlowData(organizationData);
    setNodes(flowData.nodes);
    setEdges(flowData.edges);

    // Check for overlaps after layout recalculation and adjust if needed
    setTimeout(() => {
      const allNodes = flowData.nodes;
      const allEdges = flowData.edges;

      // Group nodes by parent to check for overlaps
      const parentGroups = new Map<string, Node[]>();
      allNodes.forEach((node) => {
        const parentEdge = allEdges.find((edge) => edge.target === node.id);
        if (parentEdge) {
          const parentId = parentEdge.source;
          if (!parentGroups.has(parentId)) {
            parentGroups.set(parentId, []);
          }
          parentGroups.get(parentId)!.push(node);
        }
      });

      // Check each parent group for overlaps and adjust
      parentGroups.forEach((children, parentId) => {
        const parentNode = allNodes.find((n) => n.id === parentId);
        if (!parentNode) return;

        // Sort children by Y position
        const sortedChildren = children.sort(
          (a, b) => a.position.y - b.position.y
        );

        // Check for overlaps and calculate required offset
        let maxOffset = 0;
        for (let i = 0; i < sortedChildren.length - 1; i++) {
          const currentChild = sortedChildren[i];
          const nextChild = sortedChildren[i + 1];

          const currentBottom = currentChild.position.y + 80;
          const nextTop = nextChild.position.y;

          // If there's an overlap, calculate offset needed
          if (currentBottom > nextTop) {
            const overlap = currentBottom - nextTop;
            const requiredOffset = overlap + 20; // Add some padding
            maxOffset = Math.max(maxOffset, requiredOffset);
          }
        }

        // Apply offset if needed
        if (maxOffset > 0) {
          const offsetX = maxOffset;
          const descendants = [parentId, ...children.map((c) => c.id)];

          setNodes((prevNodes) =>
            prevNodes.map((node) =>
              descendants.includes(node.id)
                ? {
                    ...node,
                    position: {
                      ...node.position,
                      x: node.position.x + offsetX,
                    },
                  }
                : node
            )
          );
        }
      });
    }, 0);

    setIsDirty(true);
  }, [nodes, edges, convertToFlowData, setNodes, setEdges, setIsDirty]);

  // Mark as dirty when nodes or edges change
  React.useEffect(() => {
    setIsDirty(true);
  }, [nodes, edges, setIsDirty]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setEditData({
      name: node.data.label as string,
      definition: (node.data.definition as string) || "",
    });
    // Open edit drawer when node is selected
    setEditingNode(node);
    setIsDrawerOpen(true);
  }, []);

  // Helper function to detect edge overlaps
  const detectEdgeOverlaps = useCallback(
    (newNode: Node, parentNode: Node) => {
      // Get all edges connected to the parent node
      const parentEdges = edges.filter((edge) => edge.source === parentNode.id);

      // Calculate the Y range of the new node
      const newNodeYRange = {
        top: newNode.position.y,
        bottom: newNode.position.y + 80, // Approximate node height
      };

      // Check for overlaps with existing edges
      const overlappingEdges = parentEdges.filter((edge) => {
        const targetNode = nodes.find((n) => n.id === edge.target);
        if (!targetNode) return false;

        const targetNodeYRange = {
          top: targetNode.position.y,
          bottom: targetNode.position.y + 80,
        };

        // Check if Y ranges overlap
        const yOverlap = !(
          newNodeYRange.bottom < targetNodeYRange.top ||
          newNodeYRange.top > targetNodeYRange.bottom
        );

        return yOverlap;
      });

      return overlappingEdges;
    },
    [edges, nodes]
  );

  // Helper function to calculate offset needed to resolve overlaps
  const calculateOffsetForOverlaps = useCallback(
    (overlappingEdges: Edge[], parentNode: Node) => {
      const NODE_WIDTH = 256;
      const MIN_EDGE_SPACING = 50;

      if (overlappingEdges.length === 0) return 0;

      // Find the rightmost position of overlapping target nodes
      const overlappingTargets = overlappingEdges
        .map((edge) => nodes.find((n) => n.id === edge.target))
        .filter(Boolean) as Node[];

      const rightmostX = Math.max(
        ...overlappingTargets.map((node) => node.position.x)
      );

      // Calculate offset needed
      const requiredOffset =
        rightmostX + NODE_WIDTH + MIN_EDGE_SPACING - parentNode.position.x;

      return Math.max(0, requiredOffset);
    },
    [nodes]
  );

  // Helper function to propagate offset to parent and all children
  const propagateOffset = useCallback(
    (parentNode: Node, offsetX: number) => {
      if (offsetX === 0) return;

      // Get all descendants of the parent node
      const getDescendants = (nodeId: string): string[] => {
        const directChildren = edges
          .filter((edge) => edge.source === nodeId)
          .map((edge) => edge.target);

        const allDescendants = [...directChildren];
        directChildren.forEach((childId) => {
          allDescendants.push(...getDescendants(childId));
        });

        return allDescendants;
      };

      const descendants = getDescendants(parentNode.id);
      const allNodeIds = [parentNode.id, ...descendants];

      // Apply offset to all nodes
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          allNodeIds.includes(node.id)
            ? {
                ...node,
                position: { ...node.position, x: node.position.x + offsetX },
              }
            : node
        )
      );
    },
    [edges, setNodes]
  );

  const handleAddNode = useCallback(
    (
      type: string,
      parentNode?: Node,
      clickCoordinates?: { x: number; y: number }
    ) => {
      const NODE_WIDTH = 256;
      const NODE_HEIGHT = 80;
      const HORIZONTAL_SPACING = 350;
      const VERTICAL_SPACING = 120;
      const MIN_BRANCH_SPACING = 100;

      // Find optimal position to avoid overlaps
      const findOptimalPositionForNewNode = (
        parentNode: Node | null,
        level: number
      ): { x: number; y: number } => {
        if (parentNode) {
          const siblingNodes = nodes.filter(
            (n) => n.data.level === level && n.id !== parentNode.id
          );

          const preferredX = parentNode.position.x + HORIZONTAL_SPACING;
          const preferredY = parentNode.position.y;

          // Check for overlaps with existing nodes
          const hasOverlap = (x: number, y: number) => {
            return siblingNodes.some((sibling) => {
              const distanceX = Math.abs(x - sibling.position.x);
              const distanceY = Math.abs(y - sibling.position.y);
              return (
                distanceX < NODE_WIDTH + MIN_BRANCH_SPACING &&
                distanceY < NODE_HEIGHT + VERTICAL_SPACING
              );
            });
          };

          // Try preferred position first
          if (!hasOverlap(preferredX, preferredY)) {
            return { x: preferredX, y: preferredY };
          }

          // Find next available position by scanning vertically
          let bestY = preferredY;
          let attempts = 0;
          const maxAttempts = 20;

          while (hasOverlap(preferredX, bestY) && attempts < maxAttempts) {
            bestY += VERTICAL_SPACING;
            attempts++;
          }

          // If still overlapping, try different X positions
          if (hasOverlap(preferredX, bestY)) {
            const sortedSiblings = siblingNodes.sort(
              (a, b) => a.position.x - b.position.x
            );
            let bestX = preferredX;

            for (const sibling of sortedSiblings) {
              const rightX =
                sibling.position.x + NODE_WIDTH + MIN_BRANCH_SPACING;
              if (!hasOverlap(rightX, bestY)) {
                bestX = rightX;
                break;
              }
            }

            return { x: bestX, y: bestY };
          }

          return { x: preferredX, y: bestY };
        } else {
          // For pane context menu, use click coordinates or fallback to center
          let targetX = 600; // Default center-right
          let targetY = 200; // Default center

          if (clickCoordinates) {
            // Convert screen coordinates to flow coordinates
            const flowPosition = screenToFlowPosition({
              x: clickCoordinates.x,
              y: clickCoordinates.y,
            });
            targetX = flowPosition.x;
            targetY = flowPosition.y;
          }

          // Check for overlaps with existing nodes
          const hasOverlap = (x: number, y: number) => {
            return nodes.some((node) => {
              const distanceX = Math.abs(x - node.position.x);
              const distanceY = Math.abs(y - node.position.y);
              return (
                distanceX < NODE_WIDTH + MIN_BRANCH_SPACING &&
                distanceY < NODE_HEIGHT + VERTICAL_SPACING
              );
            });
          };

          // Try click position first
          if (!hasOverlap(targetX, targetY)) {
            return { x: targetX, y: targetY };
          }

          // Find next available position by scanning
          let bestY = targetY;
          const bestX = targetX;
          let attempts = 0;
          const maxAttempts = 20;

          while (hasOverlap(bestX, bestY) && attempts < maxAttempts) {
            bestY += VERTICAL_SPACING;
            attempts++;
          }

          return { x: bestX, y: bestY };
        }
      };

      const optimalPosition = findOptimalPositionForNewNode(
        parentNode || selectedNode,
        parentNode ? (parentNode.data.level as number) + 1 : 2
      );

      const newNodeId = `${type}_${Date.now()}`;
      const newNode: Node = {
        id: newNodeId,
        type: type as
          | "industry"
          | "sub_entity"
          | "job_family"
          | "nested_job_family"
          | "job_role",
        data: {
          label: `New ${type.replace("_", " ")}`,
          level: parentNode ? (parentNode.data.level as number) + 1 : 2,
          hierarchyPath: parentNode
            ? [
                ...((parentNode.data.hierarchyPath as string[]) || []),
                `New ${type.replace("_", " ")}`,
              ]
            : ["New " + type.replace("_", " ")],
        },
        position: optimalPosition,
      };

      setNodes((nds) => [...nds, newNode]);

      // Only add edge if there's a parent node
      if (parentNode || selectedNode) {
        const parentId = parentNode?.id || selectedNode?.id;
        const actualParentNode = parentNode || selectedNode!;

        setEdges((eds) => [
          ...eds,
          {
            id: `${parentId}-${newNodeId}`,
            source: parentId!,
            target: newNodeId,
            type: "smoothstep",
          },
        ]);

        // Check for edge overlaps and adjust layout if needed
        setTimeout(() => {
          const overlappingEdges = detectEdgeOverlaps(
            newNode,
            actualParentNode
          );
          if (overlappingEdges.length > 0) {
            const offsetX = calculateOffsetForOverlaps(
              overlappingEdges,
              actualParentNode
            );
            if (offsetX > 0) {
              propagateOffset(actualParentNode, offsetX);
            }
          }
        }, 0); // Use setTimeout to ensure the new node is in the state
      }
    },
    [
      selectedNode,
      setNodes,
      setEdges,
      nodes,
      screenToFlowPosition,
      detectEdgeOverlaps,
      calculateOffsetForOverlaps,
      propagateOffset,
    ]
  );

  // Close context menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu) {
        closeContextMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [contextMenu, closeContextMenu]);

  return (
    <div className="h-[600px] w-full border border-gray-200 rounded-lg relative bg-white shadow-sm">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodeContextMenu={handleNodeContextMenu}
        onPaneContextMenu={handlePaneContextMenu}
        nodeTypes={createNodeTypes(
          processingStatus,
          handleViewSkillsOntology,
          )}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="bottom-left"
        connectionMode={ConnectionMode.Loose}
        selectionMode={SelectionMode.Partial}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "#6366f1", strokeWidth: 2 },
          markerEnd: {
            type: "arrowclosed",
            color: "#6366f1",
            width: 20,
            height: 20,
          },
        }}
        connectionLineStyle={{ stroke: "#6366f1", strokeWidth: 2 }}
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[150px]"
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
          }}
          onMouseLeave={closeContextMenu}
        >
          {contextMenu.node ? (
            // Node context menu
            <>
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  if (contextMenu.node) {
                    handleEditNode(contextMenu.node);
                  }
                  closeContextMenu();
                }}
              >
                <Pencil className="h-4 w-4" />
                Edit Node
              </button>
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  if (contextMenu.node) {
                    handleDeleteNode(contextMenu.node);
                  }
                  closeContextMenu();
                }}
              >
                <Trash2 className="h-4 w-4" />
                Delete Node
              </button>
              <div className="border-t my-1"></div>
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  if (contextMenu.node) {
                    setSelectedNode(contextMenu.node);
                    handleAddNode("job_family", contextMenu.node);
                  }
                  closeContextMenu();
                }}
              >
                <Plus className="h-4 w-4" />
                Add Job Family
              </button>
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  if (contextMenu.node) {
                    setSelectedNode(contextMenu.node);
                    handleAddNode("job_role", contextMenu.node);
                  }
                  closeContextMenu();
                }}
              >
                <Plus className="h-4 w-4" />
                Add Job Role
              </button>
            </>
          ) : (
            // Pane context menu
            <>
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  if (
                    contextMenu.screenX !== undefined &&
                    contextMenu.screenY !== undefined
                  ) {
                    handleAddNode("job_family", undefined, {
                      x: contextMenu.screenX,
                      y: contextMenu.screenY,
                    });
                  } else {
                    handleAddNode("job_family");
                  }
                  closeContextMenu();
                }}
              >
                <Plus className="h-4 w-4" />
                Add Job Family
              </button>
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  if (
                    contextMenu.screenX !== undefined &&
                    contextMenu.screenY !== undefined
                  ) {
                    handleAddNode("job_role", undefined, {
                      x: contextMenu.screenX,
                      y: contextMenu.screenY,
                    });
                  } else {
                    handleAddNode("job_role");
                  }
                  closeContextMenu();
                }}
              >
                <Plus className="h-4 w-4" />
                Add Job Role
              </button>
              <div className="border-t my-1"></div>
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  centerOriginNode();
                  closeContextMenu();
                }}
              >
                <AlignCenter className="h-4 w-4" />
                Center Origin
              </button>
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  recalculateLayout();
                  closeContextMenu();
                }}
              >
                <RefreshCw className="h-4 w-4" />
                Recalculate Layout
              </button>
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  fitView({ padding: 0.1, duration: 800 });
                  closeContextMenu();
                }}
              >
                <RotateCcw className="h-4 w-4" />
                Fit View
              </button>
            </>
          )}
        </div>
      )}

      {/* Skills Ontology Drawer */}
      <RoleDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          }}
        type={editingNode?.type as string}
        definition={editData?.definition as string}
        handleDeleteNode={() => (editingNode) ? handleDeleteNode(editingNode) : undefined}
        roleTitle={editData?.name as string}
        existingOntology={skillsMap.get(editData?.name as string)}
        existingRoleSpecificInfo={roleSpecificSkillsMap.get(editData?.name as string)}
        generatedOntology={handleGenerateOntologyFromEdit}
        generatedRoleSpecificInfo={handleGenerateRoleSpecificInfo}
        isGenerateOntologyLoading={isGeneratingOntology}
        isGenerateRoleSpecificInfoLoading={isGeneratingRoleInfo}
      />
    </div>
  );
};

// Main component that provides React Flow context
const OrganizationFlowEditor: React.FC<OrganizationFlowEditorProps> = ({
  initialData,
  onSave,
  processingStatus,
}) => {
  console.log("initialData", initialData);
  return (
    <ReactFlowProvider>
      <FlowEditorContent
        initialData={initialData}
        onSave={onSave}
        processingStatus={processingStatus}
      />
    </ReactFlowProvider>
  );
};

export default OrganizationFlowEditor;
