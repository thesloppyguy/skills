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

    const getRiskLevelBadgeVariant = (level: string) => {
        switch (level.toLowerCase()) {
            case 'high': return 'destructive';
            case 'medium': return 'secondary';
            case 'low': return 'default';
            default: return 'outline';
        }
    };

    return (
        <div className="space-y-6">
            {/* Meeting Agenda */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Meeting Agenda
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {feedbackData.agenda?.map((item: any, index: number) => (
                            <div key={index} className="border rounded-lg p-4">
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

            {/* Discussion Prompts */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Discussion Prompts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {feedbackData.discussion_prompts?.map((prompt: any, index: number) => (
                            <Alert key={index}>
                                <MessageSquare className="h-4 w-4" />
                                <AlertTitle>For {prompt.for}</AlertTitle>
                                <AlertDescription>{prompt.text}</AlertDescription>
                            </Alert>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* AI Feedback Suggestions */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        AI Feedback Suggestions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {feedbackData.ai_feedback_suggestions?.map((suggestion: any, index: number) => (
                            <div key={index} className="border rounded-lg p-4 bg-blue-50">
                                <p className="text-sm">{suggestion.text}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Auto Summary */}
            {feedbackData.auto_summary && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Auto-Generated Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Alert>
                                <AlertDescription>
                                    <strong>Highlights:</strong> {feedbackData.auto_summary.highlights}
                                </AlertDescription>
                            </Alert>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold mb-2">Sentiment Score</h4>
                                    <div className="flex items-center gap-2">
                                        <Progress value={feedbackData.auto_summary.sentiment_score * 100} className="flex-1" />
                                        <span className="text-sm font-medium">
                                            {Math.round(feedbackData.auto_summary.sentiment_score * 100)}%
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Themes</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {feedbackData.auto_summary.themes?.map((theme: string, index: number) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {theme}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {feedbackData.auto_summary.action_items && feedbackData.auto_summary.action_items.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-3">Action Items</h4>
                                    <div className="space-y-3">
                                        {feedbackData.auto_summary.action_items.map((item: any, index: number) => (
                                            <div key={index} className="border rounded-lg p-3">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium">{item.action}</span>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant={getPriorityBadgeVariant(item.priority)}>
                                                            {item.priority}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">
                                                            Due: {item.due_date}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Owner: {item.owner}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {feedbackData.auto_summary.positive_notes && feedbackData.auto_summary.positive_notes.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-2 text-green-600">Positive Notes</h4>
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
                                <div>
                                    <h4 className="font-semibold mb-2 text-red-600">Key Concerns</h4>
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
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Follow-up Recommendations */}
            {feedbackData.follow_up_recommendations && feedbackData.follow_up_recommendations.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Follow-up Recommendations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {feedbackData.follow_up_recommendations.map((recommendation: any, index: number) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold">{recommendation.type}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">{recommendation.desc}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">
                                                {Math.round(recommendation.confidence * 100)}% confidence
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                            <span>Impact: {recommendation.estimated_impact}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <span>Cost: ${recommendation.cost}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span>Time: {recommendation.time_to_implement}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Risk Flags */}
            {feedbackData.risk_flags && feedbackData.risk_flags.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Risk Flags
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {feedbackData.risk_flags.map((risk: any, index: number) => (
                                <Alert key={index} variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle className="flex items-center gap-2">
                                        {risk.type}
                                        <Badge variant={getRiskLevelBadgeVariant(risk.level)}>
                                            {risk.level}
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
        </div>
    );
};

export default FeedbackPage;
