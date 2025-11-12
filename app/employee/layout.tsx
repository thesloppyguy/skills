"use client";

import SideBar from "@/components/base/sideBar";
import Header from "@/components/base/header";
import LayoutSections from "@/components/employee/sections";
import Profile from "@/components/employee/profile";
import SectionsDropdown from "@/components/employee/sections-dropdown";
import { useIsTablet } from "@/hooks/use-mobile";
import { EmployeeProvider } from "@/contexts/EmployeeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isTablet = useIsTablet();
  return (
    <>
      {/* Top Header */}
      <Header />

      <div className="flex h-full max-h-[calc(100vh-125px)]">
        {/* Left Sidebar */}
        <SideBar />

        {/* Main Content */}
        <main className="flex-1 gap-6 overflow-y-auto">
          <div className="flex flex-col lg:flex-row gap-6 p-4">
            {/* Left Column - Profile Sections */}
            {isTablet ? <SectionsDropdown /> : <LayoutSections />}

            {/* Right Column - Profile Details */}
            <div className="flex-1">
              <Profile />
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
