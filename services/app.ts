/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from "./base";
import { getAccessToken } from "./fetch";
import { Domain } from "@/types/organization";
export interface OrganizationRole {
  id: string;
  name: string;
  description: string;
  department: string;
  level: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
}

export interface Organization {
  id: string;
  name: string;
  industry: string;
  size: string;
  departments: string[];
  description?: string;
  createdAt: string;
  roleCount: number;
}

export interface GenerateRolesResponse {
  success: boolean;
  data: OrganizationRole[];
  message?: string;
}

export interface GenerateRolesRequest {
  organizationData: {
    name: string;
    industry: string;
    size: string;
    departments: string[];
    description?: string;
  };
  requirements?: {
    includeSkills?: boolean;
    includeResponsibilities?: boolean;
    level?: "entry" | "mid" | "senior" | "executive";
  };
}

export interface CreateOrganizationRequest {
  name: string;
  industry: string;
  size: string;
  departments: string[];
  description?: string;
}

export interface UpdateOrganizationRequest {
  name?: string;
  industry?: string;
  size?: string;
  departments?: string[];
  description?: string;
}

export const generateOrganizationRoles = async (query: any) => {
  return post(`organization/roles`, {
    body: query,
    headers: {
      "X-API-Key": getAccessToken(),
    },
  });
};

export const generateSkillsOntology = async (data: {
  roleTitle: string;
  parentDetails: {
    industry: string;
    subEntity: string;
    jobFamily?: string;
    subJobFamily?: string;
  };
  hierarchyPath: string[];
}) => {
  return post(`skills/ontology`, {
    body: { user_data: data },
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": getAccessToken(),
    },
  });
};

export const getEmployeeSkillsOntology = async (data: any) => {
  return post(`skills/ontology`, {
    body: { user_data: data },
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": getAccessToken(),
    },
  });
};

export const generateRoadmap = async ({
  skills,
  target,
}: {
  skills: Domain[];
  target: Domain[] | string;
}) => {
  return post(`skills/roadmap`, {
    body: { user_data: skills, goal: target },
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": getAccessToken(),
    },
  });
};

export const compareWithIndustry = async ({
  skills,
  role_data,
}: {
  skills: Domain[];
  role_data: {
    roleTitle: string;
    parentDetails: {
      industry: string;
      subEntity: string;
      jobFamily?: string;
      subJobFamily?: string;
    };
  };
}) => {
  return post(`skills/compare`, {
    body: { user_data: skills, role_data: role_data },
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": getAccessToken(),
    },
  });
};
