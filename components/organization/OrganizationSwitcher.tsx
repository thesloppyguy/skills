"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  ChevronDown, 
  Plus, 
  Eye,
  Edit3,
  Check
} from "lucide-react";
import { OrganizationStructure } from "@/types/organization";
import { useOrganization } from "@/contexts/OrganizationContext";

export interface OrganizationOption {
  id: string;
  name: string;
  description: string;
  type: 'preset' | 'custom';
  organizationData: any;
  skillMap: any;
  roleSpecificSkillsMap: any;
}

interface OrganizationSwitcherProps {
  currentOrgId: string;
  onOrganizationChange: (org: OrganizationOption) => void;
  onCreateNew: () => void;
  disabled?: boolean;
  header?: boolean;
}

const OrganizationSwitcher: React.FC<OrganizationSwitcherProps> = ({
  currentOrgId,
  onOrganizationChange,
  onCreateNew,
  disabled = false,
  header = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { presetOrganizations, customOrganization } = useOrganization();

  const currentOrg = currentOrgId === 'custom' 
    ? {
        id: 'custom',
        name: customOrganization ? 'Custom Organization' : 'Create New Organization',
        description: customOrganization ? 'Your custom organization structure' : 'Create and edit your own organization',
        type: 'custom' as const,
        organizationData: customOrganization,
        skillMap: {}
      }
    : presetOrganizations.find(org => org.id === currentOrgId) || presetOrganizations[0];

  const handleOrgSelect = (org: OrganizationOption) => {
    onOrganizationChange(org);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="min-w-[200px] justify-between"
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-start">
                <span className="font-medium">{currentOrg.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {currentOrg.description}
                </span>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-80" align="start">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Select Organization
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Choose from presets or create a new one
            </p>
          </div>
          
          <DropdownMenuSeparator />
          
          {/* Preset Organizations */}
          <div className="px-2 py-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              Preset Organizations
            </p>
            {presetOrganizations.map((org) => (
              <DropdownMenuItem
                key={org.id}
                onClick={() => handleOrgSelect(org)}
                className="flex items-center justify-between p-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{org.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {org.description}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    View Only
                  </Badge>
                  {currentOrgId === org.id && (
                    <Check className="h-4 w-4 text-green-600" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </div>
          
          <DropdownMenuSeparator />
          
          {/* Custom Organization Option */}
          {customOrganization && (
            <DropdownMenuItem
              onClick={() => handleOrgSelect({
                id: 'custom',
                name: 'Custom Organization',
                description: 'Your custom organization structure',
                type: 'custom',
                organizationData: customOrganization,
                skillMap: {},
                roleSpecificSkillsMap: []
              })}
              className="flex items-center justify-between p-3 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Edit3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Custom Organization</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Your custom organization structure
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Editable
                </Badge>
                {currentOrgId === 'custom' && (
                  <Check className="h-4 w-4 text-green-600" />
                )}
              </div>
            </DropdownMenuItem>
          )}
          
          {/* Create New Option */}
          {!header && <DropdownMenuItem
            onClick={() => {
              onCreateNew();
              setIsOpen(false);
            }}
            className="flex items-center justify-between p-3 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-sm">Create New Organization</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Start fresh with a custom organization
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                New
              </Badge>
            </div>
          </DropdownMenuItem>
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default OrganizationSwitcher;
