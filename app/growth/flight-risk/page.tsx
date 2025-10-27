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

    const getPriorityBadgeVariant = (priority: string) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'destructive';
            case 'medium': return 'secondary';
            case 'low': return 'outline';
            default: return 'outline';
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
            case 'high': return 'text-red-600';
            case 'moderate': return 'text-yellow-600';
            case 'low': return 'text-green-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="space-y-6">
            {/* Risk Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Flight Risk Overview
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2" style={{ color: riskData.risk_level === 'Low' ? '#10b981' : riskData.risk_level === 'Moderate' ? '#f59e0b' : '#ef4444' }}>
                                {Math.round(riskData.flight_risk_score * 100)}%
                            </div>
                            <Badge variant={getRiskBadgeVariant(riskData.risk_level)} className="text-lg px-4 py-2">
                                {riskData.risk_level} Risk
                            </Badge>
                        </div>

                        <div className="flex-1">
                            <h3 className="font-semibold mb-2">Risk Score Breakdown</h3>
                            <Progress value={riskData.flight_risk_score * 100} className="h-4 mb-2" />
                            <p className="text-sm text-muted-foreground">
                                Based on multiple factors including tenure, compensation, and career growth
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="text-2xl font-bold mb-1">{Math.round(riskData.confidence * 100)}%</div>
                            <p className="text-sm text-muted-foreground">Confidence Score</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Top Contributing Factors */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Top Contributing Factors
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {riskData.top_contributors?.map((factor: any, index: number) => (
                            <div key={index} className="border rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{factor.factor}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{factor.detail}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">
                                            {Math.round(factor.weight * 100)}% weight
                                        </Badge>
                                        {getTrendIcon(factor.trend)}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">Impact:</span>
                                        <span className={`text-sm font-medium ${getImpactColor(factor.impact)}`}>
                                            {factor.impact}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">Trend:</span>
                                        <span className="text-sm font-medium capitalize">{factor.trend}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recommended Interventions */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Recommended Interventions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {riskData.recommended_interventions?.map((intervention: any, index: number) => (
                            <div key={index} className="border rounded-lg p-4">
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
                                        <span>Impact: {intervention.estimated_impact}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span>Time: {intervention.time_to_implement}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                        <span>Cost: ${intervention.cost}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Target className="h-4 w-4 text-muted-foreground" />
                                        <span>Success: {Math.round(intervention.success_probability * 100)}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Risk Analysis Summary */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Risk Analysis Summary
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Current Risk Level: {riskData.risk_level}</AlertTitle>
                            <AlertDescription>
                                This employee has a {Math.round(riskData.flight_risk_score * 100)}% flight risk score,
                                which is considered {riskData.risk_level?.toLowerCase() || 'unknown'}.
                                {riskData.risk_level === 'Low' && ' Continue monitoring and maintain current engagement strategies.'}
                                {riskData.risk_level === 'Moderate' && ' Consider implementing recommended interventions to reduce risk factors.'}
                                {riskData.risk_level === 'High' && ' Immediate action recommended. Prioritize high-impact interventions.'}
                            </AlertDescription>
                        </Alert>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Key Strengths</h4>
                                <ul className="space-y-1 text-sm">
                                    {riskData.top_contributors?.filter((factor: any) => factor.impact === 'Low' || factor.trend === 'Positive').map((factor: any, index: number) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-green-600" />
                                            {factor.factor}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Areas of Concern</h4>
                                <ul className="space-y-1 text-sm">
                                    {riskData.top_contributors?.filter((factor: any) => factor.impact === 'High' || factor.trend === 'Negative').map((factor: any, index: number) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <AlertTriangle className="h-4 w-4 text-red-600" />
                                            {factor.factor}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FlightRiskPage;
