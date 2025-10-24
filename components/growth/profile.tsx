"use client";

import React from 'react';
import { useGrowth } from '@/contexts/GrowthContext';
import { useEmployee } from '@/contexts/EmployeeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const Profile = () => {
    const { currentGrowthData } = useGrowth();
    const { selectedEmployee } = useEmployee();

    // Calculate performance trend
    const getPerformanceTrend = () => {
        const historicalPerformance = currentGrowthData.kpi?.historicalPerformance;
        if (!historicalPerformance || historicalPerformance.length < 2) return 'stable';

        const latest = historicalPerformance[historicalPerformance.length - 1];
        const previous = historicalPerformance[historicalPerformance.length - 2];

        if (latest.rating > previous.rating) return 'up';
        if (latest.rating < previous.rating) return 'down';
        return 'stable';
    };

    const trend = getPerformanceTrend();
    const latestRating = currentGrowthData.kpi?.historicalPerformance?.[currentGrowthData.kpi.historicalPerformance.length - 1]?.rating || 0;
    const riskLevel = currentGrowthData.flight_risk?.risk_level || 'Unknown';

    const getRiskBadgeVariant = (level: string) => {
        switch (level.toLowerCase()) {
            case 'low': return 'default';
            case 'moderate': return 'secondary';
            case 'high': return 'destructive';
            default: return 'outline';
        }
    };

    const getTrendIcon = () => {
        switch (trend) {
            case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
            case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
            default: return <Minus className="w-4 h-4 text-gray-600" />;
        }
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <CardTitle className="text-xl">
                                {selectedEmployee.personalDetails.firstName} {selectedEmployee.personalDetails.lastName}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">{selectedEmployee.domain}</p>
                            <p className="text-xs text-muted-foreground">Employee ID: {selectedEmployee.id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">{latestRating}</span>
                                {getTrendIcon()}
                            </div>
                            <p className="text-xs text-muted-foreground">Performance Rating</p>
                        </div>
                        <Badge variant={getRiskBadgeVariant(riskLevel)}>
                            {riskLevel} Risk
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground">
                    <p>Employee switching is handled by the header selector above.</p>
                    <p>Current employee: <strong>{selectedEmployee.personalDetails.firstName} {selectedEmployee.personalDetails.lastName}</strong></p>
                </div>
            </CardContent>
        </Card>
    );
};

export default Profile;
