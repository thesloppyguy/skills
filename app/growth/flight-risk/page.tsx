"use client";

import React from 'react';
import { useGrowth } from '@/contexts/GrowthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, TrendingUp, TrendingDown, Minus, DollarSign, Clock, Target, Users } from 'lucide-react';

const FlightRiskPage = () => {
    const { currentGrowthData } = useGrowth();
    const riskData = currentGrowthData.flight_risk;

    if (!riskData) {
        return (
            <Card>
                <CardContent className="p-6">
                    <p className="text-muted-foreground">No flight risk data available for this employee.</p>
                </CardContent>
            </Card>
        );
    }

    const getRiskBadgeVariant = (level: string) => {
        switch (level?.toLowerCase()) {
            case 'low': return 'default';
            case 'moderate': return 'secondary';
            case 'high': return 'destructive';
            default: return 'outline';
        }
    };

    const getRiskColor = (level: string, score: number) => {
        if (level?.toLowerCase() === 'low' || score < 0.3) return 'text-green-600';
        if (level?.toLowerCase() === 'moderate' || score < 0.6) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getRiskBorderColor = (level: string, score: number) => {
        if (level?.toLowerCase() === 'low' || score < 0.3) return 'border-green-500 border-l-4';
        if (level?.toLowerCase() === 'moderate' || score < 0.6) return 'border-yellow-500 border-l-4';
        return 'border-red-500 border-l-4';
    };

    const getRiskBgColor = (level: string, score: number) => {
        if (level?.toLowerCase() === 'low' || score < 0.3) return 'bg-green-50 border-green-200';
        if (level?.toLowerCase() === 'moderate' || score < 0.6) return 'bg-yellow-50 border-yellow-200';
        return 'bg-red-50 border-red-200';
    };

    const getPriorityBadgeVariant = (priority: string) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'destructive';
            case 'medium': return 'secondary';
            case 'low': return 'outline';
            default: return 'outline';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'text-red-600 border-red-500 bg-red-50';
            case 'medium': return 'text-yellow-600 border-yellow-500 bg-yellow-50';
            case 'low': return 'text-green-600 border-green-500 bg-green-50';
            default: return 'text-gray-600 border-gray-500 bg-gray-50';
        }
    };

    const getPriorityBorderColor = (priority: string) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'border-red-500';
            case 'medium': return 'border-yellow-500';
            case 'low': return 'border-green-500';
            default: return 'border-gray-500';
        }
    };

    const getTrendIcon = (trend: string) => {
        switch (trend?.toLowerCase()) {
            case 'positive': return <TrendingUp className="h-4 w-4 text-green-600" />;
            case 'negative': return <TrendingDown className="h-4 w-4 text-red-600" />;
            case 'stable': return <Minus className="h-4 w-4 text-gray-600" />;
            default: return <Minus className="h-4 w-4 text-gray-600" />;
        }
    };

    const getImpactColor = (impact: string) => {
        switch (impact?.toLowerCase()) {
            case 'high': return 'text-red-600 font-semibold';
            case 'moderate': return 'text-yellow-600 font-semibold';
            case 'low': return 'text-green-600 font-semibold';
            default: return 'text-gray-600';
        }
    };

    const getImpactBgColor = (impact: string) => {
        switch (impact?.toLowerCase()) {
            case 'high': return 'bg-red-50 border-red-200';
            case 'moderate': return 'bg-yellow-50 border-yellow-200';
            case 'low': return 'bg-green-50 border-green-200';
            default: return 'bg-gray-50 border-gray-200';
        }
    };

    const getSuccessProbabilityColor = (probability: number) => {
        if (probability >= 0.7) return 'text-green-600 bg-green-50 border-green-300';
        if (probability >= 0.5) return 'text-yellow-600 bg-yellow-50 border-yellow-300';
        return 'text-red-600 bg-red-50 border-red-300';
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.8) return 'text-green-600';
        if (confidence >= 0.6) return 'text-yellow-600';
        return 'text-red-600';
    };

    const riskLevel = riskData.risk_level || 'Unknown';
    const riskScore = riskData.flight_risk_score || 0;
    const confidence = riskData.confidence || 0;

    return (
        <div className="space-y-6">
            {/* Risk Overview - Current Status */}
            <Card className={getRiskBorderColor(riskLevel, riskScore)}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className={`h-5 w-5 ${getRiskColor(riskLevel, riskScore)}`} />
                        Flight Risk Overview
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        Current risk assessment of employee departure. Score is based on multiple factors including tenure, compensation, career growth, and engagement.
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className={`text-4xl font-bold mb-2 ${getRiskColor(riskLevel, riskScore)}`}>
                                {Math.round(riskScore * 100)}%
                            </div>
                            <Badge variant={getRiskBadgeVariant(riskLevel)} className="text-lg px-4 py-2">
                                {riskLevel} Risk
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-2">
                                Flight risk score (0-100%)
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {riskLevel === 'Low' ? '✓ Low risk - employee is stable' :
                                    riskLevel === 'Moderate' ? '→ Monitor closely - some risk factors present' :
                                        '⚠ High risk - immediate attention needed'}
                            </p>
                        </div>

                        <div className="flex-1">
                            <h3 className="font-semibold mb-2">Risk Score Breakdown</h3>
                            <Progress
                                value={riskScore * 100}
                                className={`h-4 mb-2`}
                            />
                            <p className="text-sm text-muted-foreground">
                                Based on multiple factors including tenure, compensation, and career growth
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Higher scores indicate increased likelihood of departure
                            </p>
                        </div>

                        <div className="text-center">
                            <div className={`text-2xl font-bold mb-1 ${getConfidenceColor(confidence)}`}>
                                {Math.round(confidence * 100)}%
                            </div>
                            <p className="text-sm text-muted-foreground">Confidence Score</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Reliability of this risk assessment based on data quality
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Risk Analysis Summary - Interpretation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Risk Analysis Summary
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        Comprehensive analysis of flight risk factors. Review strengths and concerns to understand the risk profile.
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Alert className={getRiskBgColor(riskLevel, riskScore)}>
                            <AlertTriangle className={`h-4 w-4 ${getRiskColor(riskLevel, riskScore)}`} />
                            <AlertTitle>Current Risk Level: {riskLevel}</AlertTitle>
                            <AlertDescription>
                                This employee has a {Math.round(riskScore * 100)}% flight risk score,
                                which is considered {riskLevel?.toLowerCase() || 'unknown'}.
                                {riskLevel === 'Low' && ' Continue monitoring and maintain current engagement strategies.'}
                                {riskLevel === 'Moderate' && ' Consider implementing recommended interventions to reduce risk factors.'}
                                {riskLevel === 'High' && ' Immediate action recommended. Prioritize high-impact interventions.'}
                            </AlertDescription>
                        </Alert>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                                <h4 className="font-semibold mb-2 text-green-700">Key Strengths</h4>
                                <p className="text-xs text-muted-foreground mb-2">
                                    Positive factors that reduce flight risk:
                                </p>
                                <ul className="space-y-1 text-sm">
                                    {riskData.top_contributors?.filter((factor: any) => factor.impact === 'Low' || factor.trend === 'Positive').map((factor: any, index: number) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-green-600" />
                                            {factor.factor}
                                        </li>
                                    ))}
                                    {(!riskData.top_contributors || riskData.top_contributors.filter((factor: any) => factor.impact === 'Low' || factor.trend === 'Positive').length === 0) && (
                                        <li className="text-sm text-muted-foreground">No significant strengths identified</li>
                                    )}
                                </ul>
                            </div>

                            <div className="border rounded-lg p-4 bg-red-50 border-red-200">
                                <h4 className="font-semibold mb-2 text-red-700">Areas of Concern</h4>
                                <p className="text-xs text-muted-foreground mb-2">
                                    Risk factors that increase flight risk:
                                </p>
                                <ul className="space-y-1 text-sm">
                                    {riskData.top_contributors?.filter((factor: any) => factor.impact === 'High' || factor.trend === 'Negative').map((factor: any, index: number) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <AlertTriangle className="h-4 w-4 text-red-600" />
                                            {factor.factor}
                                        </li>
                                    ))}
                                    {(!riskData.top_contributors || riskData.top_contributors.filter((factor: any) => factor.impact === 'High' || factor.trend === 'Negative').length === 0) && (
                                        <li className="text-sm text-muted-foreground">No significant concerns identified</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Top Contributing Factors - Detailed Analysis */}
            {riskData.top_contributors && riskData.top_contributors.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Top Contributing Factors
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Key factors influencing flight risk. Impact indicates severity, trend shows direction of change, weight shows relative importance.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {riskData.top_contributors.map((factor: any, index: number) => (
                                <div
                                    key={index}
                                    className={`border rounded-lg p-4 border-l-4 ${getImpactBgColor(factor.impact)} ${getImpactColor(factor.impact).includes('red') ? 'border-l-red-500' : getImpactColor(factor.impact).includes('yellow') ? 'border-l-yellow-500' : 'border-l-green-500'}`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{factor.factor}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">{factor.detail}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-xs">
                                                {Math.round(factor.weight * 100)}% weight
                                            </Badge>
                                            {getTrendIcon(factor.trend)}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">Impact:</span>
                                            <span className={getImpactColor(factor.impact)}>
                                                {factor.impact}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">Trend:</span>
                                            <span className="text-sm font-medium capitalize">{factor.trend}</span>
                                            {getTrendIcon(factor.trend)}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">Weight:</span>
                                            <span className="text-sm font-medium">{Math.round(factor.weight * 100)}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Recommended Interventions - Action Plan */}
            {riskData.recommended_interventions && riskData.recommended_interventions.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Recommended Interventions
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Actionable steps to reduce flight risk. Priority indicates urgency, success probability shows likelihood of effectiveness.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {riskData.recommended_interventions.map((intervention: any, index: number) => (
                                <div
                                    key={index}
                                    className={`border rounded-lg p-4 border-l-4 ${getPriorityBorderColor(intervention.priority)}`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-semibold">{intervention.action}</h3>
                                                <Badge variant={getPriorityBadgeVariant(intervention.priority)}>
                                                    {intervention.priority} Priority
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{intervention.description}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <span className="font-medium">Impact:</span>
                                                <span className="ml-1 text-muted-foreground">{intervention.estimated_impact}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <span className="font-medium">Time:</span>
                                                <span className="ml-1 text-muted-foreground">{intervention.time_to_implement}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <span className="font-medium">Cost:</span>
                                                <span className="ml-1 text-muted-foreground">{intervention.cost}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Target className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <span className="font-medium">Success:</span>
                                                <Badge className={`ml-1 ${getSuccessProbabilityColor(intervention.success_probability)}`}>
                                                    {Math.round(intervention.success_probability * 100)}%
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default FlightRiskPage;
