"use client";

import SideBar from "@/components/base/sideBar";
import Header from "@/components/base/header";
import LayoutSections from "@/components/growth/sections";
import Profile from "@/components/growth/profile";
import { useIsTablet } from "@/hooks/use-mobile";
import { GrowthProvider } from "@/contexts/GrowthContext";
import { EmployeeProvider } from "@/contexts/EmployeeContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isTablet = useIsTablet();
    return (
        <EmployeeProvider>
            <GrowthProvider>
                {/* Top Header */}
                <Header />

                <div className="flex h-full max-h-[calc(100vh-125px)]">
                    {/* Left Sidebar */}
                    <SideBar />

                    {/* Main Content */}
                    <main className="flex-1 gap-6 overflow-y-auto">
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Left Column - Growth Sections */}
                            {!isTablet && <LayoutSections />}

                            {/* Right Column - Growth Details */}
                            <div className="flex-1 mt-4">
                                <Profile />
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </GrowthProvider>
        </EmployeeProvider>
    );
}
