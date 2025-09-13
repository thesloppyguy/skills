"use client";

import { dummyEmployees } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Edit,
} from "lucide-react";

export default function UndertakingsPage() {
  const employee = dummyEmployees[0]; // Using first employee as example
  const { employmentDetails } = employee;

  // Mock undertakings data
  const undertakings = [
    {
      id: "1",
      title: "Code of Conduct Agreement",
      description:
        "Agreement to follow company code of conduct and ethical guidelines",
      status: "Signed",
      signedDate: "2024-01-15",
      expiryDate: "2025-01-15",
    },
    {
      id: "2",
      title: "Confidentiality Agreement",
      description: "Non-disclosure agreement for sensitive company information",
      status: "Signed",
      signedDate: "2024-01-10",
      expiryDate: "2026-01-10",
    },
    {
      id: "3",
      title: "Data Protection Undertaking",
      description: "Commitment to protect and handle personal data responsibly",
      status: "Pending",
      signedDate: null,
      expiryDate: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "signed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "signed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "expired":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Undertakings</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {employmentDetails.department}
          </Badge>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Undertaking
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {undertakings.map((undertaking) => (
          <Card key={undertaking.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {undertaking.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {undertaking.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(undertaking.status)}>
                    {undertaking.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(undertaking.status)}
                  <span className="text-sm font-medium text-gray-500">
                    Status
                  </span>
                  <span className="text-sm">{undertaking.status}</span>
                </div>

                {undertaking.signedDate && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Signed Date
                    </label>
                    <p className="text-sm">{undertaking.signedDate}</p>
                  </div>
                )}

                {undertaking.expiryDate && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Expiry Date
                    </label>
                    <p className="text-sm">{undertaking.expiryDate}</p>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Action Required
                  </span>
                  {undertaking.status === "Pending" ? (
                    <Button size="sm" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Sign Now
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      View
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Undertaking Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Undertaking Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">
                {undertakings.filter((u) => u.status === "Signed").length}
              </p>
              <p className="text-sm text-gray-600">Signed</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">
                {undertakings.filter((u) => u.status === "Pending").length}
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">
                {undertakings.length}
              </p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
