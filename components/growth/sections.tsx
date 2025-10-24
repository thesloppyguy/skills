"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Target,
    MessageSquare,
    BookOpen,
    AlertTriangle,
    BarChart3,
    TrendingUp
} from 'lucide-react';

const sections = [
    {
        name: "Overview",
        icon: <BarChart3 className="w-5 h-5 text-white" />,
        iconColor: "bg-blue-600",
        path: "/growth"
    },
    {
        name: "KPIs & Goals",
        icon: <Target className="w-5 h-5 text-white" />,
        iconColor: "bg-green-600",
        path: "/growth/kpis"
    },
    {
        name: "Performance Feedback",
        icon: <MessageSquare className="w-5 h-5 text-white" />,
        iconColor: "bg-purple-600",
        path: "/growth/feedback"
    },
    {
        name: "Development Plan",
        icon: <BookOpen className="w-5 h-5 text-white" />,
        iconColor: "bg-orange-600",
        path: "/growth/development"
    },
    {
        name: "Flight Risk Analysis",
        icon: <AlertTriangle className="w-5 h-5 text-white" />,
        iconColor: "bg-red-600",
        path: "/growth/flight-risk"
    }
];

const Sections = () => {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-white border-r border-gray-200 p-4">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <h2 className="text-lg font-semibold">Growth Dashboard</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                    Track performance, development, and career growth
                </p>
            </div>

            <nav className="space-y-2">
                {sections.map((section) => {
                    const isActive = pathname === section.path;
                    return (
                        <Link
                            key={section.name}
                            href={section.path}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <div className={`p-2 rounded-lg ${section.iconColor}`}>
                                {section.icon}
                            </div>
                            <span className="font-medium">{section.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sections;
