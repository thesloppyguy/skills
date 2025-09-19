"use client";

import SideBar from "@/components/base/sideBar";
import Header from "@/components/base/header";
import { OrganizationProvider } from "@/contexts/OrganizationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OrganizationProvider>
      {/* Top Header */}
      <Header />

      <div className="flex h-full max-h-[calc(100vh-125px)]">
        {/* Left Sidebar */}
        <SideBar />

        {/* Main Content */}
        <main className="flex-1 p-6 gap-6 overflow-y-auto">{children}</main>
      </div>
    </OrganizationProvider>
  );
}
