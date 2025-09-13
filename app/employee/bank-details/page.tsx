"use client";

import { dummyEmployees } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Building, MapPin, Plus, Edit, Shield } from "lucide-react";

export default function BankDetailsPage() {
  const employee = dummyEmployees[0]; // Using first employee as example
  const { bankDetails, employmentDetails } = employee;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bank Details</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {employmentDetails.department}
          </Badge>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Bank Account
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Bank Account */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Primary Bank Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Main Account</h3>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Account Number
                </label>
                <p className="font-mono text-lg">{bankDetails.accountNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Bank Name
                </label>
                <p className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  {bankDetails.bankName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  IFSC Code
                </label>
                <p className="font-mono">{bankDetails.ifscCode}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Branch
                </label>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {bankDetails.branch}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Account Type
                </label>
                <Badge variant="outline">{bankDetails.accountType}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Account Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">
                    Account Status
                  </span>
                </div>
                <p className="text-sm text-green-700">Active and Verified</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    Verification Status
                  </span>
                </div>
                <p className="text-sm text-blue-700">
                  Bank details verified on {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Building className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">
                    Bank Verification
                  </span>
                </div>
                <p className="text-sm text-yellow-700">
                  IFSC code validated and active
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Account Details</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Account Holder Name
                    </label>
                    <p className="font-medium">Rajesh Kumar Singh</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Account Opening Date
                    </label>
                    <p>January 15, 2020</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Last Updated
                    </label>
                    <p>March 10, 2024</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Banking Services</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Online Banking
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Mobile Banking
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SMS Alerts</span>
                    <Badge className="bg-green-100 text-green-800">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cheque Book</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      Available
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
