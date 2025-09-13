// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Types for API responses
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
    level?: 'entry' | 'mid' | 'senior' | 'executive';
  };
}

// API Service Functions
export const apiService = {
  /**
   * Generate organization roles based on organization data
   */
  async generateOrganizationRoles(
    query: GenerateRolesRequest,
    apiKey: string
  ): Promise<GenerateRolesResponse> {
    const response = await fetch(`${API_BASE_URL}/organization/roles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },

  /**
   * Get organization roles (if you have a GET endpoint)
   */
  async getOrganizationRoles(apiKey: string): Promise<GenerateRolesResponse> {
    const response = await fetch(`${API_BASE_URL}/organization/roles`, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },
};

// Error handling utility
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
