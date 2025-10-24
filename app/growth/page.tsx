"use client";

import React from 'react';
import { useGrowth } from '@/contexts/GrowthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Target, TrendingUp, Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const GrowthDashboard = () => {
    const { currentGrowthData } = useGrowth();

    const kpiData = currentGrowthData.kpi;
    const feedbackData = currentGrowthData.feedback;
    const flightRiskData = currentGrowthData.flight_risk;

    // Calculate current goals progress
    const currentGoals = kpiData?.currentGoals || [];
    const totalProgress = currentGoals.length > 0
        ? currentGoals.reduce((sum: number, goal: { progress: number }) => sum + goal.progress, 0) / currentGoals.length
        : 0;

    // Get latest performance rating
    const latestRating = kpiData?.historicalPerformance?.[kpiData.historicalPerformance.length - 1]?.rating || 0;

    // Get team size and competencies
    const teamSize = kpiData?.teamSize || 0;
    const competencies = kpiData?.roleCompetencies || [];

    // Get risk level and score
    const riskLevel = flightRiskData?.risk_level || 'Unknown';
    const riskScore = flightRiskData?.flight_risk_score || 0;

    const getRiskBadgeVariant = (level: string) => {
        switch (level.toLowerCase()) {
            case 'low': return 'default';
            case 'moderate': return 'secondary';
            case 'high': return 'destructive';
            default: return 'outline';
        }
    };

    return (
        <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Performance Rating</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{latestRating}</div>
                        <p className="text-xs text-muted-foreground">
                            Latest rating
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Goals Progress</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{Math.round(totalProgress)}%</div>
                        <Progress value={totalProgress} className="mt-2" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Team Size</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{teamSize}</div>
                        <p className="text-xs text-muted-foreground">
                            Team members
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Flight Risk</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Badge variant={getRiskBadgeVariant(riskLevel)}>
                                {riskLevel}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                                {Math.round(riskScore * 100)}%
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Current Goals */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Current Goals Progress
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {currentGoals.map((goal: { name: string; progress: number; weight: number }, index: number) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{goal.name}</span>
                                    <span className="text-sm text-muted-foreground">
                                        {goal.progress}% (Weight: {goal.weight}%)
                                    </span>
                                </div>
                                <Progress value={goal.progress} className="h-2" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Role Competencies */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Role Competencies
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {competencies.map((competency: { name: string; level: string }, index: number) => (
                            <Badge
                                key={index}
                                variant={competency.level === 'Expert' ? 'default' : competency.level === 'Intermediate' ? 'secondary' : 'outline'}
                            >
                                {competency.name} - {competency.level}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Feedback Summary */}
            {feedbackData?.auto_summary && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Recent Feedback Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Alert>
                                <AlertDescription>
                                    <strong>Highlights:</strong> {feedbackData.auto_summary.highlights}
                                </AlertDescription>
                            </Alert>

                            {feedbackData.auto_summary.action_items && feedbackData.auto_summary.action_items.length > 0 && (
                                <div>
                                    <h4 className="font-medium mb-2">Action Items:</h4>
                                    <ul className="space-y-1">
                                        {feedbackData.auto_summary.action_items.map((item: { action: string; priority: string }, index: number) => (
                                            <li key={index} className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                                <span>{item.action}</span>
                                                <Badge variant="outline" className="ml-auto">
                                                    {item.priority}
                                                </Badge>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default GrowthDashboard;
