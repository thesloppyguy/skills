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

    return (
        <div className="space-y-6">
            {/* Company Objectives */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Company Objectives
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {kpiData.companyObjectives?.map((objective: any, index: number) => (
                            <div key={index} className="border rounded-lg p-4">
                                <h3 className="font-semibold text-lg mb-2">{objective.name}</h3>
                                <p className="text-muted-foreground">{objective.description}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Historical Performance */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Historical Performance
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {kpiData.historicalPerformance?.map((yearData: any, index: number) => (
                            <AccordionItem key={index} value={`year-${index}`}>
                                <AccordionTrigger className="text-left">
                                    <div className="flex items-center gap-4">
                                        <span className="font-semibold">{yearData.year}</span>
                                        <Badge variant="outline">Rating: {yearData.rating}</Badge>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-4 pt-4">
                                        {yearData.goals?.map((goal: any, goalIndex: number) => (
                                            <div key={goalIndex} className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">{goal.name}</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {goal.progress}% (Weight: {goal.weightage}%)
                                                    </span>
                                                </div>
                                                <Progress value={goal.progress} className="h-2" />
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

            {/* Current Goals */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Current Goals
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {kpiData.currentGoals?.map((goal: any, index: number) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{goal.name}</span>
                                    <span className="text-sm text-muted-foreground">
                                        {goal.progress}% (Weight: {goal.weight}%)
                                    </span>
                                </div>
                                <Progress value={goal.progress} className="h-3" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Industry Benchmarks */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Industry Benchmarks
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {kpiData.industryBenchmarks?.map((benchmark: any, index: number) => (
                            <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                                <div>
                                    <span className="font-medium">{benchmark.metric}</span>
                                    <p className="text-sm text-muted-foreground">{benchmark.unit}</p>
                                </div>
                                <Badge variant="outline" className="text-lg font-bold">
                                    {benchmark.value}
                                </Badge>
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
                        {kpiData.roleCompetencies?.map((competency: any, index: number) => (
                            <Badge
                                key={index}
                                variant={competency.level === 'Expert' ? 'default' : competency.level === 'Intermediate' ? 'secondary' : 'outline'}
                                className="text-sm"
                            >
                                {competency.name} - {competency.level}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* KPI Suggestions - Only for EMP003 */}
            {kpiData.suggestions && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calculator className="h-5 w-5" />
                            KPI Suggestions
                        </CardTitle>
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
                                <TabsContent key={index} value={index.toString()} className="space-y-4">
                                    <div className="space-y-4">
                                        <div className="border rounded-lg p-4">
                                            <h3 className="text-lg font-semibold mb-2">{suggestion.kpi_name}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-1">Type</p>
                                                    <Badge variant="outline">{suggestion.kpi_type}</Badge>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-1">Unit</p>
                                                    <span className="font-medium">{suggestion.unit}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-1">Target Value</p>
                                                    <span className="font-medium">{suggestion.target_value}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-1">Target Type</p>
                                                    <Badge variant="secondary">{suggestion.target_type}</Badge>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <h4 className="font-semibold mb-2">Definition</h4>
                                            <p className="text-muted-foreground">{suggestion.definition}</p>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <h4 className="font-semibold mb-2">Calculation</h4>
                                            <div className="space-y-2">
                                                <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                                                    {suggestion.calculation?.expression}
                                                </p>
                                                <div>
                                                    <p className="text-sm font-medium mb-1">Data Fields:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {suggestion.calculation?.data_fields?.map((field: string, fieldIndex: number) => (
                                                            <Badge key={fieldIndex} variant="outline" className="text-xs">
                                                                {field}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Aggregation Window: {suggestion.calculation?.aggregation_window}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <h4 className="font-semibold mb-2">Data Requirements</h4>
                                            <ul className="list-disc list-inside space-y-1">
                                                {suggestion.data_requirements?.map((req: string, reqIndex: number) => (
                                                    <li key={reqIndex} className="text-sm text-muted-foreground">{req}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        {suggestion.dependents && suggestion.dependents.length > 0 && (
                                            <div className="border rounded-lg p-4">
                                                <h4 className="font-semibold mb-2">Dependencies</h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {suggestion.dependents.map((dep: string, depIndex: number) => (
                                                        <Badge key={depIndex} variant="secondary" className="text-xs">
                                                            {dep}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {suggestion.conflicts && suggestion.conflicts.length > 0 && (
                                            <div className="border rounded-lg p-4">
                                                <h4 className="font-semibold mb-2 text-red-600">Conflicts</h4>
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

            {/* Global Notes for EMP003 */}
            {kpiData.global_notes && (
                <Card>
                    <CardHeader>
                        <CardTitle>Global Notes</CardTitle>
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
