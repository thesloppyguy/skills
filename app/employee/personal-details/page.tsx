"use client";

import { dummyEmployees } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  Heart,
  Globe,
} from "lucide-react";
import { useEmployee } from "@/contexts/EmployeeContext";

export default function PersonalDetailsPage() {
  const { selectedEmployee: employee } = useEmployee();
  const { personalDetails, contactDetails, employmentDetails } = employee;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Personal Details</h1>
        <Badge variant="outline" className="text-sm">
          {employmentDetails.department}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {personalDetails.firstName[0]}
                {personalDetails.lastName[0]}
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {personalDetails.firstName} {personalDetails.middleName}{" "}
                  {personalDetails.lastName}
                </h3>
                <p className="text-gray-600">{employmentDetails.designation}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Date of Birth
                </label>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {personalDetails.dateOfBirth}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Gender
                </label>
                <p>{personalDetails.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Marital Status
                </label>
                <p>{personalDetails.maritalStatus}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Blood Group
                </label>
                <p className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  {personalDetails.bloodGroup}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Nationality
                </label>
                <p className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  {personalDetails.nationality}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Religion
                </label>
                <p>{personalDetails.religion}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                {contactDetails.email}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                {contactDetails.phone}
              </p>
            </div>
            {contactDetails.alternatePhone && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Alternate Phone
                </label>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {contactDetails.alternatePhone}
                </p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-500">
                Address
              </label>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                <span>
                  {contactDetails.address.street}
                  <br />
                  {contactDetails.address.city}, {contactDetails.address.state}
                  <br />
                  {contactDetails.address.country} -{" "}
                  {contactDetails.address.pincode}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Family Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Family Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Father Name
              </label>
              <p>{personalDetails.fatherName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Mother Name
              </label>
              <p>{personalDetails.motherName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Emergency Contact
              </label>
              <p>
                {contactDetails.emergencyContact.name} (
                {contactDetails.emergencyContact.relationship})<br />
                <span className="text-sm text-gray-600">
                  {contactDetails.emergencyContact.phone}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Employment Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Employment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Employee ID
              </label>
              <p className="font-mono">{employmentDetails.employeeId}</p>
            </div>
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
                Designation
              </label>
              <p>{employmentDetails.designation}</p>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
