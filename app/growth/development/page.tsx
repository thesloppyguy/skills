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

    const getUrgencyColor = (urgency: string) => {
        switch (urgency.toLowerCase()) {
            case 'high': return 'text-red-600 border-red-500 bg-red-50';
            case 'medium': return 'text-yellow-600 border-yellow-500 bg-yellow-50';
            case 'low': return 'text-green-600 border-green-500 bg-green-50';
            default: return 'text-gray-600 border-gray-500 bg-gray-50';
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

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.8) return 'text-green-600';
        if (confidence >= 0.6) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getConfidenceBarColor = (confidence: number) => {
        if (confidence >= 0.8) return 'bg-green-500';
        if (confidence >= 0.6) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getSuccessProbabilityColor = (probability: number) => {
        if (probability >= 0.7) return 'text-green-600 bg-green-50 border-green-300';
        if (probability >= 0.5) return 'text-yellow-600 bg-yellow-50 border-yellow-300';
        return 'text-red-600 bg-red-50 border-red-300';
    };

    const getSuccessProbabilityBorderColor = (probability: number) => {
        if (probability >= 0.7) return 'border-green-300';
        if (probability >= 0.5) return 'border-yellow-300';
        return 'border-red-300';
    };

    const getSuccessProbabilityTextColor = (probability: number) => {
        if (probability >= 0.7) return 'text-green-600';
        if (probability >= 0.5) return 'text-yellow-600';
        return 'text-red-600';
    };

    // Get confidence score for overview
    const confidenceScore = developmentData.confidence || 0;

    return (
        <div className="space-y-6">
            {/* Development Plan Overview */}
            {confidenceScore > 0 && (
                <Card className={`border-l-4 ${confidenceScore >= 0.8 ? 'border-l-green-500' : confidenceScore >= 0.6 ? 'border-l-yellow-500' : 'border-l-red-500'}`}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Development Plan Confidence
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Overall confidence in the development plan recommendations based on data quality and alignment with goals.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <Progress value={confidenceScore * 100} className={`h-4`} />
                                </div>
                                <span className={`text-2xl font-semibold ${getConfidenceColor(confidenceScore)}`}>
                                    {Math.round(confidenceScore * 100)}%
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {confidenceScore >= 0.8 ? '✓ High confidence - recommendations are well-supported' : 
                                 confidenceScore >= 0.6 ? '→ Moderate confidence - recommendations are reasonable' : 
                                 '⚠ Low confidence - recommendations may need review'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Development Plan - Core Recommendations */}
            {developmentData.development_plan && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Development Plan
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Personalized development activities designed to enhance skills and career growth. Urgency indicates how quickly action should be taken.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {developmentData.development_plan.plan?.map((item: any, index: number) => (
                                <div key={index} className={`border rounded-lg p-4 ${getUrgencyColor(item.urgency)} border-l-4`}>
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
                                        <div className="mb-4 bg-white rounded p-3 border">
                                            <h4 className="font-medium mb-2">Prerequisites</h4>
                                            <p className="text-xs text-muted-foreground mb-2">
                                                Required knowledge or skills before starting this activity:
                                            </p>
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
                                        <div className="mb-4 bg-white rounded p-3 border">
                                            <h4 className="font-medium mb-2">Learning Objectives</h4>
                                            <p className="text-xs text-muted-foreground mb-2">
                                                What you will achieve by completing this activity:
                                            </p>
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
                                        <div className="mb-4 bg-white rounded p-3 border">
                                            <h4 className="font-medium mb-2">Skill Alignment</h4>
                                            <p className="text-xs text-muted-foreground mb-2">
                                                How this activity aligns with role requirements:
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm">{item.alignment.skill}</span>
                                                <Badge variant="outline">{item.alignment.level}</Badge>
                                            </div>
                                        </div>
                                    )}

                                    {/* Success Metrics */}
                                    {item.success_metrics && item.success_metrics.length > 0 && (
                                        <div className="mb-4 bg-white rounded p-3 border">
                                            <h4 className="font-medium mb-2">Success Metrics</h4>
                                            <p className="text-xs text-muted-foreground mb-2">
                                                Measurable outcomes to track completion and effectiveness:
                                            </p>
                                            <div className="space-y-2">
                                                {item.success_metrics.map((metric: any, metricIndex: number) => (
                                                    <div key={metricIndex} className="border rounded p-3 bg-gray-50">
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

            {/* Recommended Coaching Scripts - Conversation Guidance */}
            {/* {developmentData.recommended_coaching_scripts && developmentData.recommended_coaching_scripts.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Recommended Coaching Scripts
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Suggested conversation prompts for managers to discuss development with the employee. Context-specific guidance for effective coaching.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {developmentData.recommended_coaching_scripts.map((script: any, index: number) => (
                                <AccordionItem key={index} value={`script-${index}`}>
                                    <AccordionTrigger className="text-left">
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium">{script.context}</span>
                                            <Badge variant="outline" className="text-xs">
                                                Coaching Guide
                                            </Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="pt-4">
                                            <p className="text-xs text-muted-foreground mb-2">
                                                Suggested conversation starter:
                                            </p>
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <p className="text-sm italic">&quot;{script.script}&quot;</p>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            )} */}

            {/* Evaluation Plan - Progress Tracking */}
            {developmentData.evaluation_plan && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Evaluation Plan
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Scheduled checkpoints to assess development progress. Regular evaluations ensure goals are met and adjustments can be made.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {developmentData.evaluation_plan.checkpoints?.map((checkpoint: any, index: number) => (
                                <div key={index} className="border rounded-lg p-4 border-l-4 border-blue-500">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold">{checkpoint.type}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Scheduled in {checkpoint.in_weeks} weeks from plan start
                                            </p>
                                        </div>
                                        <Badge variant="outline">
                                            Evaluator: {checkpoint.evaluator}
                                        </Badge>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">Evaluation Criteria</h4>
                                        <p className="text-xs text-muted-foreground mb-2">
                                            What will be assessed during this checkpoint:
                                        </p>
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

            {/* Alternative Paths - Additional Options */}
            {developmentData.alternative_paths && developmentData.alternative_paths.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Alternative Development Paths
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Alternative development options with different approaches, timeframes, or focus areas. Success probability indicates likelihood of achieving goals.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {developmentData.alternative_paths.map((path: any, index: number) => (
                                <div key={index} className={`border rounded-lg p-4 border-l-4 ${getSuccessProbabilityBorderColor(path.success_probability)}`}>
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{path.name}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
                                        </div>
                                        <Badge className={getSuccessProbabilityColor(path.success_probability)}>
                                            {Math.round(path.success_probability * 100)}% success
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <span className="font-medium">Time:</span>
                                                <span className="ml-1 text-muted-foreground">{path.estimated_time}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <span className="font-medium">Cost:</span>
                                                <span className="ml-1 text-muted-foreground">${path.cost}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <span className="font-medium">Success Rate:</span>
                                                <span className={`ml-1 font-semibold ${getSuccessProbabilityTextColor(path.success_probability)}`}>
                                                    {Math.round(path.success_probability * 100)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Plan Rationale - Why These Recommendations */}
            {developmentData.explainability && developmentData.explainability.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Plan Rationale
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Explanation of why these development activities were recommended, based on performance data, role requirements, and career goals.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {developmentData.explainability.map((explanation: string, index: number) => (
                                <Alert key={index} className="bg-blue-50 border-blue-200">
                                    <AlertDescription>{explanation}</AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Warnings - Important Considerations */}
            {developmentData.warnings && developmentData.warnings.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            Warnings & Considerations
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Important factors to consider before implementing the development plan. These may impact success or require adjustments.
                        </p>
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
