"use client";

import { useState } from "react";
import { dummyEmployees } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  MapPin,
  Briefcase,
  Star,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";

export default function Home() {
  const [selectedEmployee, setSelectedEmployee] = useState(dummyEmployees[0]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Employee Dashboard</h1>
        <div className="flex items-center gap-4">
          <Select
            value={selectedEmployee.id}
            onValueChange={(value) => {
              const employee = dummyEmployees.find((emp) => emp.id === value);
              if (employee) setSelectedEmployee(employee);
            }}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select an employee" />
            </SelectTrigger>
            <SelectContent>
              {dummyEmployees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.personalDetails.firstName}{" "}
                  {employee.personalDetails.lastName} - {employee.domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Employee Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {selectedEmployee.personalDetails.firstName[0]}
                {selectedEmployee.personalDetails.lastName[0]}
              </div>
              <div>
                <CardTitle className="text-2xl">
                  {selectedEmployee.personalDetails.firstName}{" "}
                  {selectedEmployee.personalDetails.middleName}{" "}
                  {selectedEmployee.personalDetails.lastName}
                </CardTitle>
                <p className="text-gray-600 text-lg">
                  {selectedEmployee.employmentDetails.designation}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{selectedEmployee.domain}</Badge>
                  <Badge variant="secondary">
                    {selectedEmployee.employmentDetails.department}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Employee ID
                </label>
                <p className="font-mono">
                  {selectedEmployee.employmentDetails.employeeId}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Company
                </label>
                <p>{selectedEmployee.employmentDetails.company}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {selectedEmployee.contactDetails.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Phone
                </label>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {selectedEmployee.contactDetails.phone}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Joining Date
                </label>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {selectedEmployee.employmentDetails.joiningDate}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Experience
                </label>
                <p>{selectedEmployee.employmentDetails.totalExperience}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">
                {selectedEmployee.performanceRatings[0]?.rating || "N/A"}
              </p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Briefcase className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">
                {selectedEmployee.employmentDetails.teamSize || 0}
              </p>
              <p className="text-sm text-gray-600">Team Size</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <User className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">
                {selectedEmployee.employmentDetails.directReportees || 0}
              </p>
              <p className="text-sm text-gray-600">Direct Reportees</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills and Qualifications Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Top Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedEmployee.skills.slice(0, 5).map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between"
                >
                  <span className="font-medium">{skill.name}</span>
                  <Badge variant="outline">{skill.level}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Qualifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedEmployee.qualifications.map((qualification) => (
                <div
                  key={qualification.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <span className="font-medium">{qualification.course}</span>
                    <p className="text-sm text-gray-600">
                      {qualification.university}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Employees Grid */}
      <Card>
        <CardHeader>
          <CardTitle>All Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {dummyEmployees.map((employee) => (
              <div
                key={employee.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedEmployee.id === employee.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedEmployee(employee)}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                    {employee.personalDetails.firstName[0]}
                    {employee.personalDetails.lastName[0]}
                  </div>
                  <h4 className="font-medium text-sm">
                    {employee.personalDetails.firstName}{" "}
                    {employee.personalDetails.lastName}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {employee.employmentDetails.designation}
                  </p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {employee.domain}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
