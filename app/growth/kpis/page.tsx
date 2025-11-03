"use client";

import React from 'react';
import { useGrowth } from '@/contexts/GrowthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Target, TrendingUp, BarChart3, AlertTriangle, CheckCircle, Calculator } from 'lucide-react';

const KPIsPage = () => {
    const { currentGrowthData } = useGrowth();
    const kpiData = currentGrowthData.kpi;

    if (!kpiData) {
        return (
            <Card>
                <CardContent className="p-6">
                    <p className="text-muted-foreground">No KPI data available for this employee.</p>
                </CardContent>
            </Card>
        );
    }

    // Color helper functions for storytelling
    const getRatingColor = (rating: number) => {
        if (rating >= 4) return 'text-green-600';
        if (rating >= 3) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getRatingBadgeColor = (rating: number) => {
        if (rating >= 4) return 'bg-green-100 text-green-800 border-green-300';
        if (rating >= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        return 'bg-red-100 text-red-800 border-red-300';
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

    // Get latest rating for overview
    const latestRating = kpiData?.historicalPerformance?.[kpiData.historicalPerformance.length - 1]?.rating || 0;
    const currentGoals = kpiData?.currentGoals || [];
    const totalProgress = currentGoals.length > 0
        ? currentGoals.reduce((sum: number, goal: { progress: number }) => sum + goal.progress, 0) / currentGoals.length
        : 0;

    return (
        <div className="space-y-6">
            {/* KPI Overview - Health Snapshot */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className={`border-l-4 ${latestRating >= 4 ? 'border-l-green-500' : latestRating >= 3 ? 'border-l-yellow-500' : 'border-l-red-500'}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Latest Performance Rating</CardTitle>
                        <TrendingUp className={`h-4 w-4 ${getRatingColor(latestRating)}`} />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-3xl font-bold ${getRatingColor(latestRating)}`}>{latestRating}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Out of 5.0 scale
                        </p>
                        <Badge className={`mt-2 ${getRatingBadgeColor(latestRating)}`}>
                            {latestRating >= 4 ? 'Exceeding' : latestRating >= 3 ? 'Meeting' : 'Below'} Expectations
                        </Badge>
                    </CardContent>
                </Card>

                <Card className={`border-l-4 ${totalProgress >= 80 ? 'border-l-green-500' : totalProgress >= 60 ? 'border-l-yellow-500' : 'border-l-red-500'}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Goals Average</CardTitle>
                        <Target className={`h-4 w-4 ${getProgressColor(totalProgress)}`} />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-3xl font-bold ${getProgressColor(totalProgress)}`}>{Math.round(totalProgress)}%</div>
                        <Progress value={totalProgress} className={`mt-2`} />
                        <p className="text-xs text-muted-foreground mt-1">
                            Average completion across all current goals
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Current Goals - Active Performance Tracking */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Current Goals
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        Active goals being tracked this period. Progress shows completion percentage, weight indicates goal importance in overall performance evaluation.
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {kpiData.currentGoals?.map((goal: any, index: number) => (
                            <div key={index} className="space-y-2 border rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-base">{goal.name}</span>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm font-semibold ${getProgressColor(goal.progress)}`}>
                                            {goal.progress}%
                                        </span>
                                        <Badge variant="outline" className="text-xs">
                                            Weight: {goal.weight}%
                                        </Badge>
                                    </div>
                                </div>
                                <Progress 
                                    value={goal.progress} 
                                    className={`h-3`} 
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Goal importance: {goal.weight}% of overall performance evaluation
                                </p>
                            </div>
                        ))}
                        {(!kpiData.currentGoals || kpiData.currentGoals.length === 0) && (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                No current goals defined for this period
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Company Objectives - Strategic Context */}
            {kpiData.companyObjectives && kpiData.companyObjectives.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Company Objectives
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            High-level organizational goals that guide team and individual performance metrics.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {kpiData.companyObjectives.map((objective: any, index: number) => (
                                <div key={index} className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                                    <h3 className="font-semibold text-lg mb-2">{objective.name}</h3>
                                    <p className="text-sm text-muted-foreground">{objective.description}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Historical Performance - Trend Analysis */}
            {kpiData.historicalPerformance && kpiData.historicalPerformance.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Historical Performance
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Performance history over time. Review past years to understand trends and track improvement patterns.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {kpiData.historicalPerformance.map((yearData: any, index: number) => {
                                const rating = yearData.rating || 0;
                                return (
                                    <AccordionItem key={index} value={`year-${index}`}>
                                        <AccordionTrigger className="text-left">
                                            <div className="flex items-center gap-4 w-full">
                                                <span className="font-semibold">{yearData.year}</span>
                                                <Badge className={getRatingBadgeColor(rating)}>
                                                    Rating: {rating}
                                                </Badge>
                                                <span className="ml-auto text-sm text-muted-foreground">
                                                    {yearData.goals?.length || 0} goals tracked
                                                </span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-4 pt-4">
                                                {yearData.goals?.map((goal: any, goalIndex: number) => (
                                                    <div key={goalIndex} className="space-y-2 border rounded-lg p-3">
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium">{goal.name}</span>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-sm font-semibold ${getProgressColor(goal.progress)}`}>
                                                                    {goal.progress}%
                                                                </span>
                                                                <span className="text-sm text-muted-foreground">
                                                                    (Weight: {goal.weightage}%)
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <Progress 
                                                            value={goal.progress} 
                                                            className={`h-2`} 
                                                        />
                                                    </div>
                                                ))}
                                                {(!yearData.goals || yearData.goals.length === 0) && (
                                                    <p className="text-sm text-muted-foreground text-center py-2">
                                                        No goals tracked for this year
                                                    </p>
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    </CardContent>
                </Card>
            )}

            {/* Industry Benchmarks - Comparative Analysis */}
            {kpiData.industryBenchmarks && kpiData.industryBenchmarks.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Industry Benchmarks
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Comparative metrics against industry standards. These benchmarks help contextualize performance relative to market norms.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {kpiData.industryBenchmarks.map((benchmark: any, index: number) => (
                                <div key={index} className="flex justify-between items-center p-4 border rounded-lg bg-gray-50">
                                    <div className="flex-1">
                                        <span className="font-medium">{benchmark.metric}</span>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Measurement unit: {benchmark.unit}
                                        </p>
                                    </div>
                                    <Badge variant="outline" className="text-lg font-bold px-4 py-2">
                                        {benchmark.value} {benchmark.unit}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Role Competencies - Skills Assessment */}
            {kpiData.roleCompetencies && kpiData.roleCompetencies.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Role Competencies
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Key skills and expertise required for this role. Expert indicates mastery, Intermediate shows solid understanding, Beginner means developing skills.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {kpiData.roleCompetencies.map((competency: any, index: number) => (
                                <Badge
                                    key={index}
                                    variant={competency.level === 'Expert' ? 'default' : competency.level === 'Intermediate' ? 'secondary' : 'outline'}
                                    className={`${
                                        competency.level === 'Expert' ? 'bg-green-100 text-green-800 border-green-300' : 
                                        competency.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 
                                        'bg-gray-100 text-gray-800 border-gray-300'
                                    } text-sm px-3 py-1`}
                                >
                                    {competency.name} - {competency.level}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* KPI Suggestions - Future Planning */}
            {kpiData.suggestions && kpiData.suggestions.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calculator className="h-5 w-5" />
                            KPI Suggestions
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            AI-generated recommendations for new KPIs to track. Each suggestion includes definition, calculation method, and data requirements.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="0" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                                {kpiData.suggestions.map((_: any, index: number) => (
                                    <TabsTrigger key={index} value={index.toString()}>
                                        KPI {index + 1}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {kpiData.suggestions.map((suggestion: any, index: number) => (
                                <TabsContent key={index} value={index.toString()} className="space-y-4 mt-4">
                                    <div className="space-y-4">
                                        <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                                            <h3 className="text-lg font-semibold mb-3">{suggestion.kpi_name}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-1">KPI Type</p>
                                                    <Badge variant="outline">{suggestion.kpi_type}</Badge>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Category classification of this metric
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-1">Measurement Unit</p>
                                                    <span className="font-medium">{suggestion.unit}</span>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        How this metric is measured
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-1">Target Value</p>
                                                    <span className="font-medium">{suggestion.target_value}</span>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Recommended goal for this KPI
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-1">Target Type</p>
                                                    <Badge variant="secondary">{suggestion.target_type}</Badge>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Whether to maximize, minimize, or maintain
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <h4 className="font-semibold mb-2">Definition</h4>
                                            <p className="text-muted-foreground">{suggestion.definition}</p>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                What this KPI measures and why it matters
                                            </p>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <h4 className="font-semibold mb-2">Calculation Method</h4>
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium mb-1">Formula:</p>
                                                <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                                                    {suggestion.calculation?.expression}
                                                </p>
                                                <div>
                                                    <p className="text-sm font-medium mb-1">Data Fields Required:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {suggestion.calculation?.data_fields?.map((field: string, fieldIndex: number) => (
                                                            <Badge key={fieldIndex} variant="outline" className="text-xs">
                                                                {field}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    <strong>Aggregation Window:</strong> {suggestion.calculation?.aggregation_window}
                                                    <span className="ml-2 text-xs">(Time period for data collection)</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <h4 className="font-semibold mb-2">Data Requirements</h4>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Information needed to calculate this KPI:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1">
                                                {suggestion.data_requirements?.map((req: string, reqIndex: number) => (
                                                    <li key={reqIndex} className="text-sm text-muted-foreground">{req}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        {suggestion.dependents && suggestion.dependents.length > 0 && (
                                            <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                                                <h4 className="font-semibold mb-2">Dependencies</h4>
                                                <p className="text-xs text-muted-foreground mb-2">
                                                    Other KPIs or metrics that rely on this one:
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                    {suggestion.dependents.map((dep: string, depIndex: number) => (
                                                        <Badge key={depIndex} variant="secondary" className="text-xs bg-green-100">
                                                            {dep}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {suggestion.conflicts && suggestion.conflicts.length > 0 && (
                                            <div className="border rounded-lg p-4 bg-red-50 border-red-200">
                                                <h4 className="font-semibold mb-2 text-red-600">Conflicts</h4>
                                                <p className="text-xs text-muted-foreground mb-2">
                                                    Potential issues or overlaps with existing KPIs:
                                                </p>
                                                <div className="space-y-2">
                                                    {suggestion.conflicts.map((conflict: any, conflictIndex: number) => (
                                                        <Alert key={conflictIndex} variant="destructive">
                                                            <AlertTriangle className="h-4 w-4" />
                                                            <AlertDescription>
                                                                <strong>{conflict.kpi_id}:</strong> {conflict.reason}
                                                            </AlertDescription>
                                                        </Alert>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </CardContent>
                </Card>
            )}

            {/* Global Notes - Additional Context */}
            {kpiData.global_notes && (
                <Card>
                    <CardHeader>
                        <CardTitle>Global Notes</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Important context and considerations for KPI evaluation and interpretation.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Alert>
                            <AlertDescription>{kpiData.global_notes}</AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default KPIsPage;
