"use client";

import { dummyEmployees } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Target, TrendingUp, Calendar, Plus, Edit } from "lucide-react";
import { useEmployee } from "@/contexts/EmployeeContext";

export default function PerformanceRatingsPage() {
  const { selectedEmployee: employee } = useEmployee();
  const { performanceRatings, employmentDetails } = employee;

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.5) return "text-yellow-600";
    if (rating >= 3.0) return "text-orange-600";
    return "text-red-600";
  };

  const getRatingBadgeColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-100 text-green-800 border-green-200";
    if (rating >= 4.0) return "bg-blue-100 text-blue-800 border-blue-200";
    if (rating >= 3.5) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (rating >= 3.0) return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "on track":
        return "bg-green-100 text-green-800 border-green-200";
      case "behind":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "at risk":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Performance Ratings</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {employmentDetails.department}
          </Badge>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Rating
          </Button>
        </div>
      </div>

      {performanceRatings.map((rating, index) => (
        <Card key={rating.year} className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Performance Rating - {rating.year}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getRatingBadgeColor(rating.rating)}>
                  {rating.rating}/5.0
                </Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Overall Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= rating.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-500">
                      Overall Rating
                    </span>
                    <span
                      className={`text-lg font-bold ${getRatingColor(
                        rating.rating
                      )}`}
                    >
                      {rating.rating}/5.0
                    </span>
                  </div>
                  <Progress value={(rating.rating / 5) * 100} className="h-2" />
                </div>
              </div>

              {/* Goals and KRAs */}
              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Goals & Key Result Areas
                </h4>
                <div className="space-y-4">
                  {rating.goals.map((goal, goalIndex) => (
                    <div key={goalIndex} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h5 className="font-medium text-lg">{goal.name}</h5>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {goal.weightage}% Weightage
                            </Badge>
                            <Badge className={getStatusColor(goal.status)}>
                              {goal.status}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">
                            Progress
                          </span>
                          <span className="text-sm font-medium">
                            {goal.progress}% of {goal.target} {goal.unit}
                          </span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Target:</span>
                            <p className="font-medium">
                              {goal.target} {goal.unit}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Progress:</span>
                            <p className="font-medium">{goal.progress}%</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Status:</span>
                            <p className="font-medium">{goal.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {performanceRatings.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No Performance Ratings
            </h3>
            <p className="text-gray-500 mb-4">
              Performance ratings will appear here once they are added.
            </p>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add First Rating
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
