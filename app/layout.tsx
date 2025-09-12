import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home as HomeIcon,
  Users,
  Briefcase,
  Globe,
  TrendingUp,
  User,
  Settings2,
  Phone as PhoneIcon,
  Info,
  Users as UsersIcon,
  Hand,
  Mail,
  Calendar,
  Bell,
  Menu,
} from "lucide-react";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gray-50">
          {/* Top Header */}
          <header className="bg-white border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Menu className="w-6 h-6 text-gray-600" />
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">Z</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-blue-600">
                        ZINGHR™
                      </h1>
                      <p className="text-xs text-gray-500">
                        LET&apos;S TALK OUTCOMES
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-4">
                    <Settings2 className="w-7 h-7 text-gray-600" />
                    <PhoneIcon className="w-7 h-7 text-gray-600" />
                    <Info className="w-7 h-7 text-gray-600" />
                    <UsersIcon className="w-7 h-7 text-gray-600" />
                    <Hand className="w-7 h-7 text-gray-600" />
                    <Mail className="w-7 h-7 text-gray-600" />
                    <div className="relative">
                      <Calendar className="w-7 h-7 text-gray-600" />
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
                      >
                        2
                      </Badge>
                    </div>
                    <div className="relative">
                      <Bell className="w-7 h-7 text-gray-600" />
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
                      >
                        2
                      </Badge>
                    </div>
                  </div>
                  <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between bg-blue-900 px-6 py-4 rounded-lg">
                <h2 className="text-lg font-semibold text-white">My Profile</h2>
                <div className="flex items-center space-x-4">
                  <Button
                    size="sm"
                    className="bg-white text-blue-900 hover:bg-gray-100"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    CHATBOT CONFIG
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-blue-800"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                    </svg>
                    DASHBOARDS
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-blue-800"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                    PERSONALIZE
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <div className="flex flex-col lg:flex-row">
            {/* Left Sidebar */}
            <aside className="w-20 bg-white border-r border-gray-200 min-h-screen flex flex-col items-center py-6">
              <nav className="w-full">
                <ul className="space-y-6">
                  {[
                    {
                      label: "My Home",
                      icon: <HomeIcon className="w-6 h-6" />,
                      href: "#",
                      active: false,
                    },
                    {
                      label: "My Social",
                      icon: <Users className="w-6 h-6" />,
                      href: "#",
                      active: false,
                    },
                    {
                      label: "My Work",
                      icon: <Briefcase className="w-6 h-6" />,
                      href: "#",
                      active: false,
                    },
                    {
                      label: "My Zone",
                      icon: <Globe className="w-6 h-6" />,
                      href: "#",
                      active: false,
                    },
                    {
                      label: "My Growth",
                      icon: <TrendingUp className="w-6 h-6" />,
                      href: "#",
                      active: false,
                    },
                    {
                      label: "My Profile",
                      icon: <User className="w-6 h-6" />,
                      href: "#",
                      active: true,
                    },
                  ].map((item) => (
                    <li key={item.label} className="flex flex-col items-center">
                      <button
                        className={`p-3 rounded-lg transition-colors ${
                          item.active
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        title={item.label}
                      >
                        {item.icon}
                      </button>
                      <span className="text-xs mt-1 text-center text-gray-600">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 gap-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
