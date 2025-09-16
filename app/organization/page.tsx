"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Building2, Settings, Plus } from "lucide-react";

const OrganizationPage = () => {
  const router = useRouter();

  const handleCreateOrganization = () => {
    router.push("/organization/create");
  };

  const handleManageOrganization = () => {
    router.push("/organization/manage");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Organization Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Create new organizations or manage existing ones
        </p>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {/* Create Organization Card */}
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={handleCreateOrganization}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Create Organization</CardTitle>
                  <CardDescription>
                    Set up a new organization with roles and structure
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Generate organization roles, define departments, and establish
                the organizational structure for your new company or division.
              </p>
              <Button className="w-full" onClick={handleCreateOrganization}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Organization
              </Button>
            </CardContent>
          </Card>

          {/* Manage Organization Card */}
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={handleManageOrganization}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Manage Organization</CardTitle>
                  <CardDescription>
                    View and manage existing organizations
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Access your existing organizations, modify roles, update
                structures, and manage organizational settings. Compare with
                your Roles with existing industries and standards.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleManageOrganization}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Manage Organizations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;
