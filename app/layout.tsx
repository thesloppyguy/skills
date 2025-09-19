import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EmployeeProvider } from "@/contexts/EmployeeContext";
import { OrganizationProvider } from "@/contexts/OrganizationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZINGHR™ - My Profile",
  description: "Human Resources Management System - Employee Profile Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <OrganizationProvider>
          <EmployeeProvider>
            <div className="w-screen h-screen bg-gray-50">{children}</div>
          </EmployeeProvider>
        </OrganizationProvider>
      </body>
    </html>
  );
}
