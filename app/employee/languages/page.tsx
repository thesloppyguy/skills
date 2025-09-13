"use client";

import { dummyEmployees } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Star, Plus, Edit, CheckCircle } from "lucide-react";

export default function LanguagesPage() {
  const employee = dummyEmployees[0]; // Using first employee as example
  const { languages, employmentDetails } = employee;

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency.toLowerCase()) {
      case "native":
        return "bg-green-100 text-green-800 border-green-200";
      case "fluent":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "conversational":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "basic":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getProficiencyLevel = (proficiency: string) => {
    switch (proficiency.toLowerCase()) {
      case "native":
        return 100;
      case "fluent":
        return 90;
      case "conversational":
        return 70;
      case "basic":
        return 40;
      default:
        return 0;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Languages</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {employmentDetails.department}
          </Badge>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Language
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {languages.map((language, index) => (
          <Card key={language.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{language.name}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {language.isNative
                        ? "Native Language"
                        : "Foreign Language"}
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
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Proficiency
                  </span>
                  <Badge className={getProficiencyColor(language.proficiency)}>
                    {language.proficiency}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Level</span>
                    <span className="text-sm font-medium">
                      {getProficiencyLevel(language.proficiency)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${getProficiencyLevel(language.proficiency)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Type
                  </span>
                  <div className="flex items-center gap-1">
                    {language.isNative && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    <span className="text-sm">
                      {language.isNative ? "Native" : "Learned"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {languages.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No Languages Added
            </h3>
            <p className="text-gray-500 mb-4">
              Add your language skills to showcase your communication abilities.
            </p>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add First Language
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Language Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Language Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">
                {languages.filter((l) => l.isNative).length}
              </p>
              <p className="text-sm text-gray-600">Native Languages</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">
                {languages.filter((l) => l.proficiency === "Fluent").length}
              </p>
              <p className="text-sm text-gray-600">Fluent</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">
                {
                  languages.filter((l) => l.proficiency === "Conversational")
                    .length
                }
              </p>
              <p className="text-sm text-gray-600">Conversational</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">
                {languages.length}
              </p>
              <p className="text-sm text-gray-600">Total Languages</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
