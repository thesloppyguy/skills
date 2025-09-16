/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get, del, put } from "./base";
import { getAccessToken } from "./fetch";

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

export const getOrganizations = async (): Promise<Organization[]> => {
  return get<Organization[]>(`organizations`, {
    headers: {
      "X-API-Key": getAccessToken(),
    },
  });
};

export const deleteOrganization = async (id: string): Promise<void> => {
  return del(`organizations/${id}`, {
    headers: {
      "X-API-Key": getAccessToken(),
    },
  });
};

export const createOrganization = async (
  data: CreateOrganizationRequest
): Promise<Organization> => {
  return post<Organization>(`organizations`, {
    body: data,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": getAccessToken(),
    },
  });
};

export const updateOrganization = async (
  id: string,
  data: UpdateOrganizationRequest
): Promise<Organization> => {
  return put<Organization>(`organizations/${id}`, {
    body: data,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": getAccessToken(),
    },
  });
};
