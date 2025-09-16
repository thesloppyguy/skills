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

export interface SkillLevel {
  "1": string;
  "2": string;
  "3": string;
  "4": string;
}

export interface SubSkill {
  name: string;
  skill_type: "Technical" | "Behavioral" | "Managerial" | "Functional";
  weight: number;
  levels: SkillLevel;
}

export interface Skill {
  name: string;
  skill_type: "Technical" | "Behavioral" | "Managerial" | "Functional";
  subskills: SubSkill[];
  weight: number;
  levels: SkillLevel;
}

export interface SkillGroup {
  name: string;
  skills: Skill[];
}

export interface Category {
  name: string;
  subcategories: SkillGroup[];
}

export interface Domain {
  name: string;
  categories: Category[];
}

export interface Relationship {
  type:
    | "Prerequisite"
    | "Complementary"
    | "Alternative"
    | "Progressive"
    | "Core"
    | "Advanced";
  related_skills: string[];
}

export interface OntologyRelationship {
  role_or_skill_name: string;
  relationships: Relationship[];
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
  hierarchy: Domain[];
  ontology: OntologyRelationship[];
  generatedAt: string;
}

export interface ProcessingStatus {
  isProcessing: boolean;
  currentRoleId?: string;
  currentRoleTitle?: string;
  processedRoles: string[];
  totalRoles: number;
  errors: string[];
}
