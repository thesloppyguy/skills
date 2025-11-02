"use client";

import React from 'react';
import { useGrowth } from '@/contexts/GrowthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, Clock, Users, AlertTriangle, CheckCircle, DollarSign, TrendingUp } from 'lucide-react';

const FeedbackPage = () => {
    const { currentGrowthData } = useGrowth();
    const feedbackData = currentGrowthData.feedback;

    if (!feedbackData) {
        return (
            <Card>
                <CardContent className="p-6">
                    <p className="text-muted-foreground">No feedback data available for this employee.</p>
                </CardContent>
            </Card>
        );
    }

    const getPriorityBadgeVariant = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'high': return 'destructive';
            case 'medium': return 'secondary';
            case 'low': return 'outline';
            default: return 'outline';
        }
    };

    const getPriorityBorderColor = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'high': return 'border-red-500';
            case 'medium': return 'border-yellow-500';
            case 'low': return 'border-green-500';
            default: return 'border-gray-500';
        }
    };

    const getRiskLevelBadgeVariant = (level: string) => {
        switch (level.toLowerCase()) {
            case 'high': return 'destructive';
            case 'medium': return 'secondary';
            case 'low': return 'default';
            default: return 'outline';
        }
    };

    const getRiskLevelBorderColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'high': return 'border-red-500';
            case 'medium': return 'border-yellow-500';
            case 'low': return 'border-green-500';
            default: return 'border-gray-500';
        }
    };

    const getSentimentColor = (score: number) => {
        if (score >= 0.7) return 'text-green-600';
        if (score >= 0.4) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getSentimentBarColor = (score: number) => {
        if (score >= 0.7) return 'bg-green-500';
        if (score >= 0.4) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.7) return 'text-green-600 bg-green-50 border-green-300';
        if (confidence >= 0.5) return 'text-yellow-600 bg-yellow-50 border-yellow-300';
        return 'text-red-600 bg-red-50 border-red-300';
    };

    const getConfidenceBadgeColor = (confidence: number) => {
        if (confidence >= 0.7) return 'text-green-800 bg-green-100 border-green-300';
        if (confidence >= 0.5) return 'text-yellow-800 bg-yellow-100 border-yellow-300';
        return 'text-red-800 bg-red-100 border-red-300';
    };

    // Get sentiment score for overview
    const sentimentScore = feedbackData?.auto_summary?.sentiment_score || 0;

    return (
        <div className="space-y-6">
            {/* Feedback Overview - Sentiment Health */}
            {sentimentScore > 0 && (
                <Card className={`border-l-4 ${sentimentScore >= 0.7 ? 'border-l-green-500' : sentimentScore >= 0.4 ? 'border-l-yellow-500' : 'border-l-red-500'}`}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Overall Feedback Sentiment
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            AI-analyzed sentiment from feedback sessions. Higher scores indicate positive engagement, lower scores suggest concerns.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <Progress value={sentimentScore * 100} className={`h-4 ${getSentimentBarColor(sentimentScore)}`} />
                                </div>
                                <span className={`text-2xl font-semibold ${getSentimentColor(sentimentScore)}`}>
                                    {Math.round(sentimentScore * 100)}%
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {sentimentScore >= 0.7 ? '✓ Positive sentiment - employee is engaged' : 
                                 sentimentScore >= 0.4 ? '→ Neutral sentiment - monitor closely' : 
                                 '⚠ Negative sentiment - action recommended'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Auto Summary - Key Insights */}
            {feedbackData.auto_summary && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Auto-Generated Summary
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            AI-generated insights from feedback discussions. Highlights key themes, sentiment, and actionable items identified from conversations.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Alert className={sentimentScore >= 0.7 ? 'border-green-200 bg-green-50' : sentimentScore >= 0.4 ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50'}>
                                <AlertDescription>
                                    <strong>Highlights:</strong> {feedbackData.auto_summary.highlights}
                                </AlertDescription>
                            </Alert>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Sentiment Score</h4>
                                    <div className="flex items-center gap-2">
                                        <Progress value={sentimentScore * 100} className={`flex-1 ${getSentimentBarColor(sentimentScore)}`} />
                                        <span className={`text-sm font-semibold ${getSentimentColor(sentimentScore)}`}>
                                            {Math.round(sentimentScore * 100)}%
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Overall positive/negative tone (0-100%)
                                    </p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Themes</h4>
                                    <p className="text-xs text-muted-foreground mb-2">
                                        Common topics and patterns identified:
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {feedbackData.auto_summary.themes?.map((theme: string, index: number) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {theme}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {feedbackData.auto_summary.positive_notes && feedbackData.auto_summary.positive_notes.length > 0 && (
                                <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                                    <h4 className="font-semibold mb-2 text-green-700">Positive Notes</h4>
                                    <p className="text-xs text-muted-foreground mb-2">
                                        Strengths and positive feedback identified:
                                    </p>
                                    <ul className="space-y-1">
                                        {feedbackData.auto_summary.positive_notes.map((note: string, index: number) => (
                                            <li key={index} className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                                {note}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {feedbackData.auto_summary.key_concerns && feedbackData.auto_summary.key_concerns.length > 0 && (
                                <div className="border rounded-lg p-4 bg-red-50 border-red-200">
                                    <h4 className="font-semibold mb-2 text-red-700">Key Concerns</h4>
                                    <p className="text-xs text-muted-foreground mb-2">
                                        Areas that need attention or improvement:
                                    </p>
                                    <ul className="space-y-1">
                                        {feedbackData.auto_summary.key_concerns.map((concern: string, index: number) => (
                                            <li key={index} className="flex items-center gap-2 text-sm">
                                                <AlertTriangle className="h-4 w-4 text-red-600" />
                                                {concern}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {feedbackData.auto_summary.action_items && feedbackData.auto_summary.action_items.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-3">Action Items</h4>
                                    <p className="text-xs text-muted-foreground mb-3">
                                        Prioritized tasks identified from feedback discussions. Due dates indicate urgency.
                                    </p>
                                    <div className="space-y-3">
                                        {feedbackData.auto_summary.action_items.map((item: any, index: number) => (
                                            <div key={index} className={`border rounded-lg p-3 border-l-4 ${getPriorityBorderColor(item.priority)}`}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium">{item.action}</span>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant={getPriorityBadgeVariant(item.priority)}>
                                                            {item.priority}
                                                        </Badge>
                                                        {item.due_date && (
                                                            <span className="text-xs text-muted-foreground">
                                                                Due: {item.due_date}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {item.owner && (
                                                    <p className="text-sm text-muted-foreground">
                                                        Owner: {item.owner}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Risk Flags - Early Warning Signals */}
            {feedbackData.risk_flags && feedbackData.risk_flags.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            Risk Flags
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Early warning indicators identified from feedback analysis. High priority items require immediate attention to prevent escalation.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {feedbackData.risk_flags.map((risk: any, index: number) => (
                                <Alert key={index} variant="destructive" className={`border-l-4 ${getRiskLevelBorderColor(risk.level)}`}>
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle className="flex items-center gap-2">
                                        {risk.type}
                                        <Badge variant={getRiskLevelBadgeVariant(risk.level)}>
                                            {risk.level} Risk
                                        </Badge>
                                    </AlertTitle>
                                    <AlertDescription>
                                        <p className="mb-2">{risk.description}</p>
                                        <p className="text-sm">
                                            <strong>Recommended Action:</strong> {risk.recommended_action}
                                        </p>
                                    </AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Meeting Agenda - Structured Discussion Guide */}
            {feedbackData.agenda && feedbackData.agenda.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Meeting Agenda
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Structured discussion points for feedback sessions. Priority indicates importance, duration helps plan meeting time.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {feedbackData.agenda.map((item: any, index: number) => (
                                <div key={index} className={`border rounded-lg p-4 border-l-4 ${getPriorityBorderColor(item.priority)}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-muted-foreground">
                                                {item.order}.
                                            </span>
                                            <h3 className="font-semibold">{item.topic}</h3>
                                            <Badge variant={getPriorityBadgeVariant(item.priority)}>
                                                {item.priority}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            {item.duration_minutes} min
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Discussion Prompts - Conversation Starters */}
            {feedbackData.discussion_prompts && feedbackData.discussion_prompts.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Discussion Prompts
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Suggested conversation starters for different participants. Use these to guide productive feedback discussions.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {feedbackData.discussion_prompts.map((prompt: any, index: number) => (
                                <Alert key={index} className="bg-blue-50 border-blue-200">
                                    <MessageSquare className="h-4 w-4" />
                                    <AlertTitle>For {prompt.for}</AlertTitle>
                                    <AlertDescription>{prompt.text}</AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* AI Feedback Suggestions - Automated Insights */}
            {feedbackData.ai_feedback_suggestions && feedbackData.ai_feedback_suggestions.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            AI Feedback Suggestions
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            AI-generated feedback recommendations based on performance data and patterns. Use these as guidance for delivering constructive feedback.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {feedbackData.ai_feedback_suggestions.map((suggestion: any, index: number) => (
                                <div key={index} className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                                    <p className="text-sm">{suggestion.text}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Follow-up Recommendations - Next Steps */}
            {feedbackData.follow_up_recommendations && feedbackData.follow_up_recommendations.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Follow-up Recommendations
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Suggested actions to take after feedback sessions. These recommendations address identified areas and help improve engagement.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {feedbackData.follow_up_recommendations.map((recommendation: any, index: number) => (
                                <div key={index} className="border rounded-lg p-4 border-l-4 border-blue-500">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{recommendation.type}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">{recommendation.desc}</p>
                                        </div>
                                        <Badge className={getConfidenceBadgeColor(recommendation.confidence)}>
                                            {Math.round(recommendation.confidence * 100)}% confidence
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <span className="font-medium">Impact:</span>
                                                <span className="ml-1 text-muted-foreground">{recommendation.estimated_impact}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <span className="font-medium">Cost:</span>
                                                <span className="ml-1 text-muted-foreground">${recommendation.cost}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <span className="font-medium">Time:</span>
                                                <span className="ml-1 text-muted-foreground">{recommendation.time_to_implement}</span>
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

export default FeedbackPage;
