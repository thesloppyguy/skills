"use client";

import { dummyEmployees } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Upload, Camera, Edit, Trash2 } from "lucide-react";
import { useEmployee } from "@/contexts/EmployeeContext";

export default function ProfilePicturePage() {
  const { selectedEmployee: employee } = useEmployee();
  const { personalDetails, employmentDetails } = employee;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile Picture</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {employmentDetails.department}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Current Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-4xl">
                  {personalDetails.firstName[0]}
                  {personalDetails.lastName[0]}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {personalDetails.firstName} {personalDetails.lastName}
                </h3>
                <p className="text-gray-600">{employmentDetails.designation}</p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload New Picture */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload New Picture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Upload Profile Picture
              </h3>
              <p className="text-gray-500 mb-4">
                Drag and drop an image here, or click to select
              </p>
              <Button className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Choose File
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Requirements:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Image format: JPG, PNG, or GIF</li>
                <li>• Maximum file size: 5MB</li>
                <li>• Recommended size: 400x400 pixels</li>
                <li>• Square aspect ratio preferred</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Picture History */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Picture History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No Previous Pictures
              </h3>
              <p className="text-gray-500">
                Your previous profile pictures will appear here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
