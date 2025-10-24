"use client";

import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { kpi, feedback, recommendations, flight_risk } from '@/constants/tara';
import { useEmployee } from './EmployeeContext';

export interface GrowthData {
    kpi: any;
    feedback: any;
    recommendations: any;
    flight_risk: any;
}

interface GrowthContextType {
    currentGrowthData: GrowthData;
}

const GrowthContext = createContext<GrowthContextType | undefined>(undefined);

export const GrowthProvider = ({ children }: { children: ReactNode }) => {
    const { selectedEmployee } = useEmployee();
    const [currentGrowthData, setCurrentGrowthData] = useState<GrowthData>({
        kpi: {},
        feedback: {},
        recommendations: {},
        flight_risk: {}
    });

    // Map employee ID to growth data
    const getEmployeeGrowthId = (employeeId: string) => {
        // Map the employee IDs from EmployeeContext to the growth data IDs
        switch (employeeId) {
            case 'emp-001':
                return 'EMP1002';
            case 'emp-002':
                return 'EMP002';
            case 'emp-003':
                return 'EMP003';
            default:
                return 'EMP1002'; // Default fallback
        }
    };

    useEffect(() => {
        const growthId = getEmployeeGrowthId(selectedEmployee.id);

        // Debug logging
        console.log('Selected Employee ID:', selectedEmployee.id);
        console.log('Mapped Growth ID:', growthId);
        console.log('Available KPI keys:', Object.keys(kpi));

        const newGrowthData: GrowthData = {
            kpi: kpi[growthId as keyof typeof kpi] || {},
            feedback: feedback[growthId as keyof typeof feedback] || {},
            recommendations: recommendations[growthId as keyof typeof recommendations] || {},
            flight_risk: flight_risk[growthId as keyof typeof flight_risk] || {}
        };

        setCurrentGrowthData(newGrowthData);
    }, [selectedEmployee.id]);

    return (
        <GrowthContext.Provider
            value={{
                currentGrowthData
            }}
        >
            {children}
        </GrowthContext.Provider>
    );
};

export const useGrowth = () => {
    const context = useContext(GrowthContext);
    if (context === undefined) {
        throw new Error('useGrowth must be used within a GrowthProvider');
    }
    return context;
};
