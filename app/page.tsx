"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  User,
  MapPin,
  IdCard,
  GraduationCap,
  Users2,
  ClipboardList,
  FileText,
  File,
  Calendar,
  TrendingUp,
  ChevronDown,
  Phone,
  Briefcase,
  UserCheck,
} from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("contact-details");
  const [expandedSections, setExpandedSections] = useState({
    aboutMe: true,
    address: false,
    identity: false,
    skills: false,
    family: false,
    employment: false,
    undertakings: false,
    documents: false,
  });

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey as keyof typeof prev],
    }));
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Input
            type="text"
            placeholder="What are you looking for?"
            className="w-full pl-10"
          />
        </div>
        <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
          ASTRA AI
        </Button>
      </div>
      <div className="flex flex-col xl:flex-row gap-6 mt-4">
        {/* Left Column - Profile Sections */}
        <div className="w-full xl:w-80">
          {/* About Me Section */}
          <Card className="mb-4">
            <CardHeader>
              <button
                onClick={() => toggleSection("aboutMe")}
                className="flex items-center justify-between w-full"
              >
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span>About Me</span>
                </CardTitle>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    expandedSections.aboutMe ? "rotate-180" : ""
                  }`}
                />
              </button>
            </CardHeader>
            {expandedSections.aboutMe && (
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Personal Details",
                    "ProfilePicture",
                    "Contact Details",
                    "Employment Details",
                    "Bank Details",
                    "Statutory Details",
                    "Attribute Level Details",
                    "Contract Details",
                  ].map((item) => (
                    <li key={item}>
                      <Button
                        onClick={() =>
                          setActiveSection(item.toLowerCase().replace(" ", "-"))
                        }
                        variant="ghost"
                        className={`w-full justify-start h-auto px-3 py-2 ${
                          activeSection === item.toLowerCase().replace(" ", "-")
                            ? "bg-blue-100 text-blue-900 font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {item}
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>

          {/* Other Profile Sections */}
          <div className="space-y-2">
            {/* Address/Coordinates Section */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <button
                  onClick={() => toggleSection("address")}
                  className="flex items-center justify-between w-full"
                >
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-900" />
                    </div>
                    <span>Address/Coordinates</span>
                  </CardTitle>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedSections.address ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </CardHeader>
              {expandedSections.address && (
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Current Address",
                      "Permanent Address",
                      "Emergency Contact Address",
                      "Office Address",
                      "GPS Coordinates",
                      "Address Verification",
                    ].map((item) => (
                      <li key={item}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-auto px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          {item}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>

            {/* Identity Proofs Section */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <button
                  onClick={() => toggleSection("identity")}
                  className="flex items-center justify-between w-full"
                >
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <IdCard className="w-5 h-5 text-blue-900" />
                    </div>
                    <span>Identity Proofs</span>
                  </CardTitle>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedSections.identity ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </CardHeader>
              {expandedSections.identity && (
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Aadhaar Card",
                      "PAN Card",
                      "Passport",
                      "Driving License",
                      "Voter ID",
                      "Other Government ID",
                    ].map((item) => (
                      <li key={item}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-auto px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          {item}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>

            {/* Skills & Qualification Section */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <button
                  onClick={() => toggleSection("skills")}
                  className="flex items-center justify-between w-full"
                >
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-pink-600" />
                    </div>
                    <span>Skills & Qualification</span>
                  </CardTitle>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedSections.skills ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </CardHeader>
              {expandedSections.skills && (
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Educational Qualifications",
                      "Professional Certifications",
                      "Technical Skills",
                      "Language Proficiency",
                      "Soft Skills",
                      "Training Programs",
                    ].map((item) => (
                      <li key={item}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-auto px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          {item}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>

            {/* Family Section */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <button
                  onClick={() => toggleSection("family")}
                  className="flex items-center justify-between w-full"
                >
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Users2 className="w-5 h-5 text-orange-600" />
                    </div>
                    <span>Family</span>
                  </CardTitle>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedSections.family ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </CardHeader>
              {expandedSections.family && (
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Spouse Details",
                      "Children Information",
                      "Parents Information",
                      "Siblings Details",
                      "Emergency Contacts",
                      "Dependents",
                    ].map((item) => (
                      <li key={item}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-auto px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          {item}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>

            {/* Employment History Section */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <button
                  onClick={() => toggleSection("employment")}
                  className="flex items-center justify-between w-full"
                >
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <ClipboardList className="w-5 h-5 text-blue-900" />
                    </div>
                    <span>Employment History</span>
                  </CardTitle>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedSections.employment ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </CardHeader>
              {expandedSections.employment && (
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Previous Companies",
                      "Job Roles & Responsibilities",
                      "Employment Duration",
                      "Salary History",
                      "Performance Reviews",
                      "Exit Interviews",
                    ].map((item) => (
                      <li key={item}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-auto px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          {item}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>

            {/* Undertakings Section */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <button
                  onClick={() => toggleSection("undertakings")}
                  className="flex items-center justify-between w-full"
                >
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-800" />
                    </div>
                    <span>Undertakings</span>
                  </CardTitle>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedSections.undertakings ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </CardHeader>
              {expandedSections.undertakings && (
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Code of Conduct",
                      "Confidentiality Agreement",
                      "Non-Compete Clause",
                      "Data Protection Undertaking",
                      "Ethics Declaration",
                      "Compliance Statements",
                    ].map((item) => (
                      <li key={item}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-auto px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          {item}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>

            {/* Documents Section */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <button
                  onClick={() => toggleSection("documents")}
                  className="flex items-center justify-between w-full"
                >
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <File className="w-5 h-5 text-purple-600" />
                    </div>
                    <span>Documents</span>
                  </CardTitle>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedSections.documents ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </CardHeader>
              {expandedSections.documents && (
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Resume/CV",
                      "Cover Letter",
                      "Reference Letters",
                      "Medical Certificates",
                      "Background Check Reports",
                      "Other Supporting Documents",
                    ].map((item) => (
                      <li key={item}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-auto px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          {item}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          </div>
        </div>

        {/* Right Column - Profile Details */}
        <div className="flex-1">
          {/* Profile Section using BentoGrid */}
          <div className="mb-6">
            <BentoGrid className="max-w-6xl mx-auto grid-cols-1 md:grid-cols-2">
              {/* Left Column - Employee Summary Card */}
              <BentoGridItem
                className="bg-gradient-to-r from-blue-900 to-blue-800 text-white border-0 md:row-span-3"
                header={
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <User className="w-12 h-12 text-blue-900" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Mr. Himanshu Dubey</h2>
                      <p className="text-blue-200 text-sm">
                        Employee Code - Admin
                      </p>
                    </div>
                  </div>
                }
                icon={
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Email:</span>
                      <span className="font-medium">
                        himanshu.dubey@zinghr.com
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Contact No:</span>
                      <span className="font-medium">9036356943</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Date Of Birth:</span>
                      <span className="font-medium">-</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Company:</span>
                      <span className="font-medium">ORGDEMO Company</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Department:</span>
                      <span className="font-medium">AGRI MARKETPLACE</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Designation:</span>
                      <span className="font-medium">Tech support</span>
                    </div>
                  </div>
                }
              />

              {/* Right Column - Information Cards Grid */}
              <div className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-4">
                  <BentoGridItem
                    title="Joining Date"
                    description="15 May 2025"
                    icon={
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-orange-600" />
                      </div>
                    }
                    className="bg-white border-gray-200 shadow-sm"
                  />

                  <BentoGridItem
                    title="Total Service"
                    description="4 months"
                    icon={
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-blue-900" />
                      </div>
                    }
                    className="bg-white border-gray-200 shadow-sm"
                  />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-2 gap-4">
                  <BentoGridItem
                    title="Blood Group"
                    description="-"
                    icon={
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-red-600" />
                      </div>
                    }
                    className="bg-white border-gray-200 shadow-sm"
                  />

                  <BentoGridItem
                    title="My Manager"
                    description="Mr. Sachin Baghele"
                    icon={
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                    }
                    className="bg-white border-gray-200 shadow-sm"
                  />
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-2 gap-4">
                  <BentoGridItem
                    title="My Role"
                    description="SENIOR VICE PRESIDENT"
                    icon={
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-orange-600" />
                      </div>
                    }
                    className="bg-white border-gray-200 shadow-sm"
                  />

                  <BentoGridItem
                    title="Emergency Contact"
                    description="5566998877"
                    icon={
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-orange-600" />
                      </div>
                    }
                    className="bg-white border-gray-200 shadow-sm"
                  />
                </div>

                {/* Row 4 - Full Width */}
                <BentoGridItem
                  title="Employment Type"
                  description="Full Time"
                  icon={
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                  }
                  className="bg-white border-gray-200 shadow-sm"
                />
              </div>
            </BentoGrid>
          </div>

          {/* Employment Information Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">
                    Joining Date
                  </span>
                </div>
                <p className="text-lg font-semibold">15 May 2025</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">
                    Total Service
                  </span>
                </div>
                <p className="text-lg font-semibold">4 months</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">
                    Blood Group
                  </span>
                </div>
                <p className="text-lg font-semibold">-</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">
                    My Manager
                  </span>
                </div>
                <p className="text-lg font-semibold">Mr. Sachin Baghele</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">
                    My Role
                  </span>
                </div>
                <p className="text-lg font-semibold">SENIOR VICE PRESIDENT</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">
                    Emergency Contact
                  </span>
                </div>
                <p className="text-lg font-semibold">5566998877</p>
              </CardContent>
            </Card>
          </div>

          {/* Employment Type Card */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-600">
                  Employment Type
                </span>
              </div>
              <p className="text-lg font-semibold">Full Time</p>
            </CardContent>
          </Card>

          {/* Personal Details Section */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-3">
                  <User className="w-6 h-6" />
                  <span>Personal Details</span>
                </CardTitle>
                <Button size="sm">Edit Details</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">
                      Actual Date of Birth:
                    </span>
                    <p className="font-medium">01 Apr 1980</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">First Name:</span>
                    <p className="font-medium">Himanshu</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Is Disable:</span>
                    <p className="font-medium">No</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Middle Name:</span>
                    <p className="font-medium">D</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Record Date of Birth:
                    </span>
                    <p className="font-medium">01 Apr 1980</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      State of Birth:
                    </span>
                    <p className="font-medium">-</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Category:</span>
                    <p className="font-medium">General</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Gender:</span>
                    <p className="font-medium">Male</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Last Name:</span>
                    <p className="font-medium">Dubey</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Nationality:</span>
                    <p className="font-medium">Indian</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Religion:</span>
                    <p className="font-medium">Others</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Country of Birth:
                    </span>
                    <p className="font-medium">-</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Identification Marks:
                    </span>
                    <p className="font-medium">NIL</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Marital Status:
                    </span>
                    <p className="font-medium">Single</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Place of Birth:
                    </span>
                    <p className="font-medium">-</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Salutation:</span>
                    <p className="font-medium">Mr.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Details Section */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-3">
                  <Phone className="w-6 h-6" />
                  <span>Contact Details</span>
                </CardTitle>
                <Button size="sm">Edit Details</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">
                      Alternate Email:
                    </span>
                    <p className="font-medium">-</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Mobile No:</span>
                    <p className="font-medium">9036356943</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Personal Email:
                    </span>
                    <p className="font-medium">aashishtiwari@zinghr.com</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Alternate Mobile No:
                    </span>
                    <p className="font-medium">9894241937</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">
                      Office Extension:
                    </span>
                    <p className="font-medium">213</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Residential Landline No:
                    </span>
                    <p className="font-medium">-</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Home Country PhoneNumber 1:
                    </span>
                    <p className="font-medium">-</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Official Email:
                    </span>
                    <p className="font-medium">himanshu.dubey@zinghr.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collapsed Sections */}
          <div className="space-y-4">
            {[
              {
                name: "Employment Details",
                icon: <Briefcase className="w-5 h-5" />,
              },
              {
                name: "Statutory Details",
                icon: <ClipboardList className="w-5 h-5" />,
              },
              {
                name: "Attribute Level Details",
                icon: <UserCheck className="w-5 h-5" />,
              },
            ].map((section) => (
              <Card key={section.name}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {section.icon}
                      <span className="font-medium">{section.name}</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contract Details */}
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5" />
                <span className="font-medium">Contract Details</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
