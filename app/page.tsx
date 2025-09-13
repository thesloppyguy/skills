"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const navigationCards = [
    {
      title: "Onboarding",
      description:
        "Complete your onboarding process and get started with the platform",
      href: "/onboarding",
      icon: "🚀",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    },
    {
      title: "Employee",
      description: "Access your employee dashboard and manage your profile",
      href: "/employee",
      icon: "👤",
      color: "bg-green-50 border-green-200 hover:bg-green-100",
    },
    {
      title: "Organization",
      description: "Manage organization settings and team members",
      href: "/organization",
      icon: "🏢",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to ZINGHR™
          </h1>
          <p className="text-lg text-gray-600">
            Choose your role to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {navigationCards.map((card) => (
            <Card
              key={card.title}
              className={`${card.color} transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-105 border-2`}
              onClick={() => router.push(card.href)}
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{card.icon}</div>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  variant="outline"
                  className="w-full bg-white hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(card.href);
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
