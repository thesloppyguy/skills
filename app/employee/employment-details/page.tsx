"use client";

import { dummyEmployees } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  Briefcase,
  Clock,
  Plus,
  Edit,
} from "lucide-react";

export default function EmploymentDetailsPage() {
  const employee = dummyEmployees[0]; // Using first employee as example
  const { employmentDetails, employmentHistory } = employee;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Employment Details</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {employmentDetails.department}
          </Badge>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Employment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Employment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Current Employment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {employmentDetails.designation}
              </h3>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Company
                </label>
                <p>{employmentDetails.company}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Department
                </label>
                <p>{employmentDetails.department}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Employee ID
                </label>
                <p className="font-mono">{employmentDetails.employeeId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Reporting Manager
                </label>
                <p>{employmentDetails.reportingManager}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Joining Date
                </label>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {employmentDetails.joiningDate}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Employment Type
                </label>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {employmentDetails.employmentType}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Work Location
                </label>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {employmentDetails.workLocation}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Total Experience
                </label>
                <p>{employmentDetails.totalExperience}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">
                  {employmentDetails.teamSize}
                </p>
                <p className="text-sm text-gray-600">Team Size</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">
                  {employmentDetails.directReportees}
                </p>
                <p className="text-sm text-gray-600">Direct Reportees</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Employment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employmentHistory.map((history, index) => (
              <div
                key={history.employeeId}
                className="border-l-4 border-blue-200 pl-4 py-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">
                      {history.designation}
                    </h4>
                    <p className="text-gray-600">{history.company}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {history.from_date} - {history.to_date}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
