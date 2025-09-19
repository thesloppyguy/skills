"use client";

import { dummyEmployees } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  Plus,
  Edit,
} from "lucide-react";

export default function QualificationsPage() {
  const employee = dummyEmployees[0]; // Using first employee as example
  const { qualifications, employmentDetails } = employee;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Qualifications</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {employmentDetails.department}
          </Badge>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Qualification
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {qualifications.map((qualification, index) => (
          <Card key={qualification.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {qualification.course}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {qualification.university}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Year
                  </label>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {qualification.to_year}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Grade
                  </label>
                  <p className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    {qualification.grade}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Type
                  </label>
                  <p>{qualification.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Location
                  </label>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {qualification.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {qualifications.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No Qualifications Added
            </h3>
            <p className="text-gray-500 mb-4">
              Add your educational qualifications to showcase your academic
              background.
            </p>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add First Qualification
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
