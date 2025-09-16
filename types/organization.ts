export interface JobRole {
  title: string;
  id?: string;
}

export interface JobFamily {
  name: string;
  definition: string;
  id?: string;
  sub_job_families: JobFamily[];
  job_roles: JobRole[];
}

export interface OrganizationStructure {
  industry: string;
  sub_entity: string;
  job_families: JobFamily[];
}

export interface FlowNode {
  id: string;
  type: "industry" | "sub_entity" | "job_family" | "job_role";
  data: {
    label: string;
    definition?: string;
    parentId?: string;
    level: number;
    hierarchyPath?: string[];
  };
  position: { x: number; y: number };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export interface SkillsOntology {
  id: string;
  roleId: string;
  roleTitle: string;
  parentDetails: {
    industry: string;
    subEntity: string;
    jobFamily?: string;
    subJobFamily?: string;
  };
  hierarchyPath: string[];
  skills: {
    technical: string[];
    soft: string[];
    domain: string[];
  };
  competencies: {
    required: string[];
    preferred: string[];
  };
  generatedAt: string;
}

export interface ProcessingStatus {
  isProcessing: boolean;
  currentRoleId?: string;
  processedRoles: string[];
  totalRoles: number;
  errors: string[];
}
