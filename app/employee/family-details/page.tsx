"use client";

import { dummyEmployees } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  Phone,
  Briefcase,
  Plus,
  Edit,
  Heart,
} from "lucide-react";

export default function FamilyDetailsPage() {
  const employee = dummyEmployees[0]; // Using first employee as example
  const { familyMembers, employmentDetails } = employee;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Family Details</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {employmentDetails.department}
          </Badge>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Family Member
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {familyMembers.map((member, index) => (
          <Card key={member.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {member.relationship}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Date of Birth
                  </label>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {member.dateOfBirth}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Occupation
                  </label>
                  <p className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    {member.occupation}
                  </p>
                </div>
                {member.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone
                    </label>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {member.phone}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Relationship
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {member.relationship}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {familyMembers.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No Family Members Added
            </h3>
            <p className="text-gray-500 mb-4">
              Add family member details to complete your profile.
            </p>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add First Family Member
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Family Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Family Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <Users className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-pink-600">
                {familyMembers.length}
              </p>
              <p className="text-sm text-gray-600">Total Family Members</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Heart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">
                {
                  familyMembers.filter((m) => m.relationship === "Spouse")
                    .length
                }
              </p>
              <p className="text-sm text-gray-600">Spouse</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">
                {
                  familyMembers.filter(
                    (m) =>
                      m.relationship === "Son" || m.relationship === "Daughter"
                  ).length
                }
              </p>
              <p className="text-sm text-gray-600">Children</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
