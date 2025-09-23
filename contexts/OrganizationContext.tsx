"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  OrganizationStructure,
  SkillsOntology,
  ProcessingStatus,
} from "@/types/organization";
import { OrganizationOption } from "@/components/organization/OrganizationSwitcher";
import { orgs } from "@/constants/orgs";
import { solar_skill_map, manufacturing_skill_map, retail_skill_map } from "@/constants/skill_map";

interface OrganizationContextType {
  // Current organization data
  organizationData: OrganizationStructure | null;
  setOrganizationData: (data: OrganizationStructure | null) => void;
  
  // Current organization info
  currentOrgId: string;
  setCurrentOrgId: (id: string) => void;
  currentOrgType: 'preset' | 'custom';
  setCurrentOrgType: (type: 'preset' | 'custom') => void;
  
  // Organization switching
  switchToOrganization: (org: OrganizationOption) => void;
  createNewOrganization: () => void;
  
  // Preset organizations
  presetOrganizations: OrganizationOption[];
  
  // Storage operations
  saveToLocalStorage: (data: OrganizationStructure) => void;
  loadFromLocalStorage: () => OrganizationStructure | null;
  clearLocalStorage: () => void;
  hasStoredData: boolean;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  
  // Skills management
  skillsMap: Map<string, SkillsOntology>;
  setSkillsMap: (map: Map<string, SkillsOntology>) => void;
  addSkillsOntology: (roleTitle: string, skills: SkillsOntology) => void;
  saveSkillsOntologyToStorage: (skillsMap: Map<string, SkillsOntology>) => void;
  loadSkillsOntologyFromStorage: () => Map<string, SkillsOntology> | null;
  
  // Processing status
  processingStatus: ProcessingStatus;
  setProcessingStatus: (
    status: ProcessingStatus | ((prev: ProcessingStatus) => ProcessingStatus)
  ) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined
);

const STORAGE_KEY = "organization_structure";
const SKILLS_ONTOLOGY_KEY = "skills_ontology_data";
const CURRENT_ORG_KEY = "current_organization_id";
const CURRENT_ORG_TYPE_KEY = "current_organization_type";

// Define the preset organizations with their data and skill maps
const PRESET_ORGANIZATIONS: OrganizationOption[] = [
  {
    id: 'green-energy',
    name: 'Green Energy',
    description: 'Solar Power Division',
    type: 'preset',
    organizationData: orgs.green_energy,
    skillMap: solar_skill_map,
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Core Manufacturing Operations',
    type: 'preset',
    organizationData: orgs.manufacturing,
    skillMap: manufacturing_skill_map,
  },
  {
    id: 'retail',
    name: 'Retail',
    description: 'Corporate Headquarters & Store Operations',
    type: 'preset',
    organizationData: orgs.retail,
    skillMap: retail_skill_map,
  },
];

export const OrganizationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize with the first preset organization as default
  const defaultOrg = PRESET_ORGANIZATIONS[0];
  
  const [organizationData, setOrganizationData] =
    useState<OrganizationStructure | null>(defaultOrg.organizationData);
  const [isDirty, setIsDirty] = useState(false);
  const [skillsMap, setSkillsMap] = useState<Map<string, SkillsOntology>>(() => {
    // Initialize skills map with the default organization's skill map
    const initialSkillsMap = new Map<string, SkillsOntology>();
    Object.entries(defaultOrg.skillMap).forEach(([roleTitle, skills]) => {
      initialSkillsMap.set(roleTitle, skills as SkillsOntology);
    });
    return initialSkillsMap;
  });
  const [currentOrgId, setCurrentOrgId] = useState<string>(defaultOrg.id);
  const [currentOrgType, setCurrentOrgType] = useState<'preset' | 'custom'>(defaultOrg.type);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    processedRoles: [],
    totalRoles: 0,
    errors: [],
  });

  const handleSetProcessingStatus = (
    status: ProcessingStatus | ((prev: ProcessingStatus) => ProcessingStatus)
  ) => {
    if (typeof status === "function") {
      setProcessingStatus(status);
    } else {
      setProcessingStatus(status);
    }
  };

  // Load data from localStorage on mount
  useEffect(() => {
    // Load current organization info
    const storedOrgId = localStorage.getItem(CURRENT_ORG_KEY);
    const storedOrgType = localStorage.getItem(CURRENT_ORG_TYPE_KEY);
    
    if (storedOrgId && storedOrgType) {
      setCurrentOrgId(storedOrgId);
      setCurrentOrgType(storedOrgType as 'preset' | 'custom');
      
      // If it's a preset organization, load its data
      if (storedOrgType === 'preset') {
        const presetOrg = PRESET_ORGANIZATIONS.find(org => org.id === storedOrgId);
        if (presetOrg) {
          setOrganizationData(presetOrg.organizationData);
          // Convert skill map to Map format
          const skillsMap = new Map<string, SkillsOntology>();
          Object.entries(presetOrg.skillMap).forEach(([roleTitle, skills]) => {
            skillsMap.set(roleTitle, skills as SkillsOntology);
          });
          setSkillsMap(skillsMap);
        }
      } else if (storedOrgType === 'custom') {
        // Load organization data and skills for custom organizations
        const stored = loadFromLocalStorage();
        if (stored) {
          setOrganizationData(stored);
        }

        // Load skills ontology data
        const storedSkills = loadSkillsOntologyFromStorage();
        if (storedSkills) {
          setSkillsMap(storedSkills);
        }
      }
    } else {
      // No stored data, use default (first preset organization)
      // This is already set in the initial state, but we'll ensure localStorage is updated
      localStorage.setItem(CURRENT_ORG_KEY, defaultOrg.id);
      localStorage.setItem(CURRENT_ORG_TYPE_KEY, defaultOrg.type);
    }
  }, []);

  const saveToLocalStorage = (data: OrganizationStructure) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setOrganizationData(data);
      setIsDirty(false);
    } catch (error) {
      console.error("Failed to save organization data to localStorage:", error);
    }
  };

  const loadFromLocalStorage = (): OrganizationStructure | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as OrganizationStructure;
      }
    } catch (error) {
      console.error(
        "Failed to load organization data from localStorage:",
        error
      );
    }
    return null;
  };

  const switchToOrganization = (org: OrganizationOption) => {
    try {
      // Save current organization info
      localStorage.setItem(CURRENT_ORG_KEY, org.id);
      localStorage.setItem(CURRENT_ORG_TYPE_KEY, org.type);
      
      setCurrentOrgId(org.id);
      setCurrentOrgType(org.type);
      
      // Load organization data and skills map
      setOrganizationData(org.organizationData);
      
      // Convert skill map to Map format
      const skillsMap = new Map<string, SkillsOntology>();
      Object.entries(org.skillMap).forEach(([roleTitle, skills]) => {
        skillsMap.set(roleTitle, skills as SkillsOntology);
      });
      setSkillsMap(skillsMap);
      
      // Clear processing status
      setProcessingStatus({
        isProcessing: false,
        processedRoles: [],
        totalRoles: 0,
        errors: [],
      });
      
      setIsDirty(false);
    } catch (error) {
      console.error("Failed to switch organization:", error);
    }
  };

  const createNewOrganization = () => {
    try {
      // Clear current data
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SKILLS_ONTOLOGY_KEY);
      localStorage.setItem(CURRENT_ORG_KEY, 'custom');
      localStorage.setItem(CURRENT_ORG_TYPE_KEY, 'custom');
      
      setCurrentOrgId('custom');
      setCurrentOrgType('custom');
      setOrganizationData(null);
      setSkillsMap(new Map());
      setIsDirty(false);
      setProcessingStatus({
        isProcessing: false,
        processedRoles: [],
        totalRoles: 0,
        errors: [],
      });
    } catch (error) {
      console.error("Failed to create new organization:", error);
    }
  };

  const clearLocalStorage = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SKILLS_ONTOLOGY_KEY);
      localStorage.removeItem(CURRENT_ORG_KEY);
      localStorage.removeItem(CURRENT_ORG_TYPE_KEY);
      setOrganizationData(null);
      setIsDirty(false);
      setSkillsMap(new Map());
      setCurrentOrgId('green-energy');
      setCurrentOrgType('preset');
      setProcessingStatus({
        isProcessing: false,
        processedRoles: [],
        totalRoles: 0,
        errors: [],
      });
    } catch (error) {
      console.error(
        "Failed to clear organization data from localStorage:",
        error
      );
    }
  };

  const saveSkillsOntologyToStorage = (
    skillsMap: Map<string, SkillsOntology>
  ) => {
    try {
      const skillsArray = Array.from(skillsMap.entries());
      localStorage.setItem(SKILLS_ONTOLOGY_KEY, JSON.stringify(skillsArray));
    } catch (error) {
      console.error("Failed to save skills ontology to localStorage:", error);
    }
  };

  const loadSkillsOntologyFromStorage = (): Map<
    string,
    SkillsOntology
  > | null => {
    try {
      const stored = localStorage.getItem(SKILLS_ONTOLOGY_KEY);
      if (stored) {
        const skillsArray = JSON.parse(stored) as [string, SkillsOntology][];
        return new Map(skillsArray);
      }
    } catch (error) {
      console.error("Failed to load skills ontology from localStorage:", error);
    }
    return null;
  };

  const addSkillsOntology = (roleTitle: string, skills: SkillsOntology) => {
    setSkillsMap((prev) => {
      const newMap = new Map(prev).set(roleTitle, skills);
      saveSkillsOntologyToStorage(newMap);
      return newMap;
    });
  };

  const hasStoredData = organizationData !== null;

  const contextValue: OrganizationContextType = {
    organizationData,
    setOrganizationData,
    currentOrgId,
    setCurrentOrgId,
    currentOrgType,
    setCurrentOrgType,
    switchToOrganization,
    createNewOrganization,
    presetOrganizations: PRESET_ORGANIZATIONS,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage,
    hasStoredData,
    isDirty,
    setIsDirty,
    skillsMap,
    setSkillsMap,
    addSkillsOntology,
    saveSkillsOntologyToStorage,
    loadSkillsOntologyFromStorage,
    processingStatus,
    setProcessingStatus: handleSetProcessingStatus,
  };

  return (
    <OrganizationContext.Provider value={contextValue}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error(
      "useOrganization must be used within an OrganizationProvider"
    );
  }
  return context;
};
