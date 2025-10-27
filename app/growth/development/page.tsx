"use client";

import React from 'react';
import { useGrowth } from '@/contexts/GrowthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Users, Clock, DollarSign, AlertTriangle, CheckCircle, Target, TrendingUp } from 'lucide-react';

const DevelopmentPage = () => {
    const { currentGrowthData } = useGrowth();
    const developmentData = currentGrowthData.recommendations;

    if (!developmentData) {
        return (
            <Card>
                <CardContent className="p-6">
                    <p className="text-muted-foreground">No development data available for this employee.</p>
                </CardContent>
            </Card>
        );
    }

    const getUrgencyBadgeVariant = (urgency: string) => {
        switch (urgency.toLowerCase()) {
            case 'high': return 'destructive';
            case 'medium': return 'secondary';
            case 'low': return 'outline';
            default: return 'outline';
        }
    };

    const getPriorityBadgeVariant = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'high': return 'destructive';
            case 'medium': return 'secondary';
            case 'low': return 'outline';
            default: return 'outline';
        }
    };

    return (
        <div className="space-y-6">
            {/* Development Plan */}
            {developmentData.development_plan && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Development Plan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {developmentData.development_plan.plan?.map((item: any, index: number) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                                <Badge variant={getUrgencyBadgeVariant(item.urgency)}>
                                                    {item.urgency} Priority
                                                </Badge>
                                                <Badge variant="outline">{item.type}</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Provider: {item.provider}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {item.estimated_time_hours} hours
                                                </div>
                                                {item.cost && (
                                                    <div className="flex items-center gap-1">
                                                        <DollarSign className="h-4 w-4" />
                                                        ${item.cost}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Prerequisites */}
                                    {item.prerequisites && item.prerequisites.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="font-medium mb-2">Prerequisites</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {item.prerequisites.map((prereq: string, prereqIndex: number) => (
                                                    <Badge key={prereqIndex} variant="outline" className="text-xs">
                                                        {prereq}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Learning Objectives */}
                                    {item.learning_objectives && item.learning_objectives.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="font-medium mb-2">Learning Objectives</h4>
                                            <ul className="space-y-1">
                                                {item.learning_objectives.map((objective: string, objIndex: number) => (
                                                    <li key={objIndex} className="flex items-start gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                        {objective}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Alignment */}
                                    {item.alignment && (
                                        <div className="mb-4">
                                            <h4 className="font-medium mb-2">Skill Alignment</h4>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm">{item.alignment.skill}</span>
                                                <Badge variant="outline">{item.alignment.level}</Badge>
                                            </div>
                                        </div>
                                    )}

                                    {/* Success Metrics */}
                                    {item.success_metrics && item.success_metrics.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="font-medium mb-2">Success Metrics</h4>
                                            <div className="space-y-2">
                                                {item.success_metrics.map((metric: any, metricIndex: number) => (
                                                    <div key={metricIndex} className="border rounded p-3">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="font-medium text-sm">{metric.metric}</span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{metric.expected_change}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Recommended Coaching Scripts */}
            {developmentData.recommended_coaching_scripts && developmentData.recommended_coaching_scripts.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Recommended Coaching Scripts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {developmentData.recommended_coaching_scripts.map((script: any, index: number) => (
                                <AccordionItem key={index} value={`script-${index}`}>
                                    <AccordionTrigger className="text-left">
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium">{script.context}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="pt-4">
                                            <div className="bg-blue-50 border rounded-lg p-4">
                                                <p className="text-sm italic">&quot;{script.script}&quot;</p>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            )}

            {/* Evaluation Plan */}
            {developmentData.evaluation_plan && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Evaluation Plan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {developmentData.evaluation_plan.checkpoints?.map((checkpoint: any, index: number) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold">{checkpoint.type}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                In {checkpoint.in_weeks} weeks
                                            </p>
                                        </div>
                                        <Badge variant="outline">
                                            Evaluator: {checkpoint.evaluator}
                                        </Badge>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">Criteria</h4>
                                        <ul className="space-y-1">
                                            {checkpoint.criteria?.map((criterion: string, critIndex: number) => (
                                                <li key={critIndex} className="flex items-start gap-2 text-sm">
                                                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                    {criterion}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Explainability */}
            {developmentData.explainability && developmentData.explainability.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Plan Rationale
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {developmentData.explainability.map((explanation: string, index: number) => (
                                <Alert key={index}>
                                    <AlertDescription>{explanation}</AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Confidence Score */}
            {developmentData.confidence && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Plan Confidence
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <Progress value={developmentData.confidence * 100} className="h-3" />
                            </div>
                            <span className="text-lg font-semibold">
                                {Math.round(developmentData.confidence * 100)}%
                            </span>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Alternative Paths */}
            {developmentData.alternative_paths && developmentData.alternative_paths.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Alternative Development Paths
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {developmentData.alternative_paths.map((path: any, index: number) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold">{path.name}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">
                                                {Math.round(path.success_probability * 100)}% success
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span>{path.estimated_time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <span>${path.cost}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                            <span>{Math.round(path.success_probability * 100)}% success</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Warnings */}
            {developmentData.warnings && developmentData.warnings.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Warnings & Considerations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {developmentData.warnings.map((warning: string, index: number) => (
                                <Alert key={index} variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertDescription>{warning}</AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default DevelopmentPage;
