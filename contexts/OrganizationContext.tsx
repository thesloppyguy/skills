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

interface OrganizationContextType {
  organizationData: OrganizationStructure | null;
  setOrganizationData: (data: OrganizationStructure | null) => void;
  saveToLocalStorage: (data: OrganizationStructure) => void;
  loadFromLocalStorage: () => OrganizationStructure | null;
  clearLocalStorage: () => void;
  hasStoredData: boolean;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  skillsMap: Map<string, SkillsOntology>;
  setSkillsMap: (map: Map<string, SkillsOntology>) => void;
  addSkillsOntology: (roleId: string, skills: SkillsOntology) => void;
  processingStatus: ProcessingStatus;
  setProcessingStatus: (
    status: ProcessingStatus | ((prev: ProcessingStatus) => ProcessingStatus)
  ) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined
);

const STORAGE_KEY = "organization_structure";

export const OrganizationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [organizationData, setOrganizationData] =
    useState<OrganizationStructure | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [skillsMap, setSkillsMap] = useState<Map<string, SkillsOntology>>(
    new Map()
  );
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
    const stored = loadFromLocalStorage();
    if (stored) {
      setOrganizationData(stored);
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

  const clearLocalStorage = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setOrganizationData(null);
      setIsDirty(false);
      setSkillsMap(new Map());
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

  const addSkillsOntology = (roleId: string, skills: SkillsOntology) => {
    setSkillsMap((prev) => new Map(prev).set(roleId, skills));
  };

  const hasStoredData = organizationData !== null;

  const contextValue: OrganizationContextType = {
    organizationData,
    setOrganizationData,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage,
    hasStoredData,
    isDirty,
    setIsDirty,
    skillsMap,
    setSkillsMap,
    addSkillsOntology,
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
