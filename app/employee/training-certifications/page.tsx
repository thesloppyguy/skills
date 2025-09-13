"use client";

import { dummyEmployees } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  Calendar,
  Building,
  Plus,
  Edit,
  CheckCircle,
} from "lucide-react";

export default function TrainingCertificationsPage() {
  const employee = dummyEmployees[0]; // Using first employee as example
  const { trainingCertifications, employmentDetails } = employee;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Training & Certifications</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {employmentDetails.department}
          </Badge>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Certification
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {trainingCertifications.map((cert, index) => (
          <Card key={cert.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                    <p className="text-sm text-gray-600">{cert.provider}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(cert.status)}>
                    {cert.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Completion Date
                  </label>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {cert.completionDate}
                  </p>
                </div>
                {cert.expiryDate && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Expiry Date
                    </label>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {cert.expiryDate}
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Provider
                  </label>
                  <p className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-400" />
                    {cert.provider}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Progress
                  </span>
                  <span className="text-sm font-medium">{cert.progress}%</span>
                </div>
                <Progress value={cert.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Modules:</span>
                  <p className="font-medium">{cert.modules}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <p className="font-medium">{cert.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {trainingCertifications.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No Certifications Added
            </h3>
            <p className="text-gray-500 mb-4">
              Add your training and certifications to showcase your professional
              development.
            </p>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add First Certification
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Certification Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Certification Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">
                {
                  trainingCertifications.filter((c) => c.status === "Completed")
                    .length
                }
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">
                {
                  trainingCertifications.filter(
                    (c) => c.status === "In Progress"
                  ).length
                }
              </p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Calendar className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">
                {
                  trainingCertifications.filter((c) => c.status === "Pending")
                    .length
                }
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">
                {trainingCertifications.reduce(
                  (sum, cert) => sum + cert.modules,
                  0
                )}
              </p>
              <p className="text-sm text-gray-600">Total Modules</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
