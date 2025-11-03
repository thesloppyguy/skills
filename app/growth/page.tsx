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

    // Color helper functions for storytelling
    const getRatingColor = (rating: number) => {
        if (rating >= 4) return 'text-green-600';
        if (rating >= 3) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 80) return 'text-green-600';
        if (progress >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getProgressBarColor = (progress: number) => {
        if (progress >= 80) return 'bg-green-500';
        if (progress >= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getRiskColor = (level: string, score: number) => {
        if (level.toLowerCase() === 'low' || score < 0.3) return 'text-green-600';
        if (level.toLowerCase() === 'moderate' || score < 0.6) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getRiskBorderColor = (level: string, score: number) => {
        if (level.toLowerCase() === 'low' || score < 0.3) return 'border-green-500 border-l-4';
        if (level.toLowerCase() === 'moderate' || score < 0.6) return 'border-yellow-500 border-l-4';
        return 'border-red-500 border-l-4';
    };

    return (
        <div className="space-y-6">
            {/* Overview Cards - Performance Health Snapshot */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className={`border-l-4 ${latestRating >= 4 ? 'border-l-green-500' : latestRating >= 3 ? 'border-l-yellow-500' : 'border-l-red-500'}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Performance Rating</CardTitle>
                        <TrendingUp className={`h-4 w-4 ${getRatingColor(latestRating)}`} />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${getRatingColor(latestRating)}`}>{latestRating}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Latest performance rating (out of 5)
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {latestRating >= 4 ? '✓ Exceeding expectations' : latestRating >= 3 ? '→ Meeting expectations' : '⚠ Needs improvement'}
                        </p>
                    </CardContent>
                </Card>

                <Card className={`border-l-4 ${totalProgress >= 80 ? 'border-l-green-500' : totalProgress >= 60 ? 'border-l-yellow-500' : 'border-l-red-500'}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Goals Progress</CardTitle>
                        <Target className={`h-4 w-4 ${getProgressColor(totalProgress)}`} />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold`}>{Math.round(totalProgress)}%</div>
                        <Progress value={totalProgress} className={`mt-2`} />
                        <p className="text-xs text-muted-foreground mt-1">
                            Average completion across all current goals
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Team Size</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{teamSize}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Total team members
                        </p>
                    </CardContent>
                </Card>

                <Card className={`border-l-4 ${getRiskBorderColor(riskLevel, riskScore)}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Flight Risk</CardTitle>
                        <AlertTriangle className={`h-4 w-4 ${getRiskColor(riskLevel, riskScore)}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Badge variant={getRiskBadgeVariant(riskLevel)}>
                                {riskLevel}
                            </Badge>
                            <span className={`text-sm font-semibold ${getRiskColor(riskLevel, riskScore)}`}>
                                {Math.round(riskScore * 100)}%
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Risk of employee departure (0-100%)
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {riskLevel === 'Low' ? '✓ Low risk - stable' : riskLevel === 'Moderate' ? '→ Monitor closely' : '⚠ High risk - action needed'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Current Goals - Detailed Progress */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Current Goals Progress
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        Detailed breakdown of goal completion status. Weight indicates importance of each goal.
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {currentGoals.map((goal: { name: string; progress: number; weight: number }, index: number) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{goal.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-semibold ${getProgressColor(goal.progress)}`}>
                                            {goal.progress}%
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            (Weight: {goal.weight}%)
                                        </span>
                                    </div>
                                </div>
                                <Progress 
                                    value={goal.progress} 
                                    className={`h-2`} 
                                />
                            </div>
                        ))}
                        {currentGoals.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                No current goals defined
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Feedback Summary - Insights */}
            {feedbackData?.auto_summary && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Recent Feedback Summary
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            AI-generated insights from recent feedback sessions and conversations.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Alert className={feedbackData.auto_summary.sentiment_score >= 0.7 ? 'border-green-200 bg-green-50' : feedbackData.auto_summary.sentiment_score >= 0.4 ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50'}>
                                <AlertDescription>
                                    <strong>Highlights:</strong> {feedbackData.auto_summary.highlights}
                                </AlertDescription>
                            </Alert>

                            {feedbackData.auto_summary.action_items && feedbackData.auto_summary.action_items.length > 0 && (
                                <div>
                                    <h4 className="font-medium mb-2">Action Items:</h4>
                                    <p className="text-xs text-muted-foreground mb-3">
                                        Prioritized tasks identified from feedback discussions.
                                    </p>
                                    <ul className="space-y-1">
                                        {feedbackData.auto_summary.action_items.map((item: { action: string; priority: string }, index: number) => (
                                            <li key={index} className="flex items-center gap-2 text-sm">
                                                <CheckCircle className={`h-4 w-4 ${item.priority.toLowerCase() === 'high' ? 'text-red-600' : item.priority.toLowerCase() === 'medium' ? 'text-yellow-600' : 'text-green-600'}`} />
                                                <span>{item.action}</span>
                                                <Badge 
                                                    variant={item.priority.toLowerCase() === 'high' ? 'destructive' : item.priority.toLowerCase() === 'medium' ? 'secondary' : 'outline'} 
                                                    className="ml-auto"
                                                >
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

            {/* Role Competencies - Skills Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Current Role Competencies
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        Key skills and expertise areas for this role. Expert level indicates mastery, Intermediate shows solid understanding.
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {competencies.map((competency: { name: string; level: string }, index: number) => (
                            <Badge
                                key={index}
                                variant={competency.level === 'Expert' ? 'default' : competency.level === 'Intermediate' ? 'secondary' : 'outline'}
                                className={`${
                                    competency.level === 'Expert' ? 'bg-green-100 text-green-800 border-green-300' : 
                                    competency.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 
                                    'bg-gray-100 text-gray-800 border-gray-300'
                                }`}
                            >
                                {competency.name} - {competency.level}
                            </Badge>
                        ))}
                        {competencies.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                No competencies defined for this role
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default GrowthDashboard;
