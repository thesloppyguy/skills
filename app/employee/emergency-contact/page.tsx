"use client";

import { dummyEmployees } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, User, Heart, Plus, Edit, AlertTriangle } from "lucide-react";
import { useEmployee } from "@/contexts/EmployeeContext";

export default function EmergencyContactPage() {
  const { selectedEmployee: employee } = useEmployee();
  const { contactDetails, employmentDetails } = employee;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Emergency Contact</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {employmentDetails.department}
          </Badge>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Contact
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Primary Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Main Emergency Contact</h3>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {contactDetails.emergencyContact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h4 className="text-lg font-semibold">
                    {contactDetails.emergencyContact.name}
                  </h4>
                  <p className="text-gray-600">
                    {contactDetails.emergencyContact.relationship}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Phone Number
                  </label>
                  <p className="flex items-center gap-2 text-lg">
                    <Phone className="w-5 h-5 text-red-500" />
                    {contactDetails.emergencyContact.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Relationship
                  </label>
                  <p className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-gray-400" />
                    {contactDetails.emergencyContact.relationship}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-800">
                    Emergency Priority
                  </span>
                </div>
                <p className="text-sm text-red-700">
                  This contact will be notified in case of emergency
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    Contact Status
                  </span>
                </div>
                <p className="text-sm text-blue-700">Verified and Active</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">
                    Relationship
                  </span>
                </div>
                <p className="text-sm text-green-700">
                  {contactDetails.emergencyContact.relationship}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Emergency Contacts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Additional Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No Additional Contacts
              </h3>
              <p className="text-gray-500 mb-4">
                Add additional emergency contacts for better coverage.
              </p>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Additional Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
