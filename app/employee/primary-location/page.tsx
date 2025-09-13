"use client";

import { dummyEmployees } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Globe, Plus, Edit, Navigation } from "lucide-react";

export default function PrimaryLocationPage() {
  const employee = dummyEmployees[0]; // Using first employee as example
  const { contactDetails, employmentDetails } = employee;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Primary Location</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {employmentDetails.department}
          </Badge>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Location
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Primary Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Residential Address</h3>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Street Address
                </label>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <span>{contactDetails.address.street}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    City
                  </label>
                  <p className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-400" />
                    {contactDetails.address.city}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    State
                  </label>
                  <p>{contactDetails.address.state}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Country
                  </label>
                  <p className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    {contactDetails.address.country}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Postal Code
                  </label>
                  <p>{contactDetails.address.pincode}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Work Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
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
                  Company
                </label>
                <p className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  {employmentDetails.company}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Department
                </label>
                <p>{employmentDetails.department}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              Location Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">1</p>
                <p className="text-sm text-gray-600">Primary Address</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Building className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">1</p>
                <p className="text-sm text-gray-600">Work Location</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">1</p>
                <p className="text-sm text-gray-600">Country</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
