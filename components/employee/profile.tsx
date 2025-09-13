import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { User } from "lucide-react";
import { Calendar } from "lucide-react";
import { TrendingUp } from "lucide-react";

const Profile = () => {
  return (
    <div className="flex-1">
      {/* Profile Section using BentoGrid */}
      <div className="mb-6">
        <BentoGrid className="grid-cols-1 md:grid-cols-2">
          {/* Left Column - Employee Summary Card */}
          <BentoGridItem
            className="bg-gradient-to-r from-blue-900 to-blue-800 text-white border-0 md:row-span-3"
            header={
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <User className="w-12 h-12 text-blue-900" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Mr. Himanshu Dubey</h2>
                  <p className="text-blue-200 text-sm">Employee Code - Admin</p>
                </div>
              </div>
            }
            icon={
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Email:</span>
                  <span className="font-medium">himanshu.dubey@zinghr.com</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Contact No:</span>
                  <span className="font-medium">9036356943</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Date Of Birth:</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Company:</span>
                  <span className="font-medium">ORGDEMO Company</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Department:</span>
                  <span className="font-medium">AGRI MARKETPLACE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Designation:</span>
                  <span className="font-medium">Tech support</span>
                </div>
              </div>
            }
          />

          {/* Right Column - Information Cards Grid */}
          <BentoGridItem
            className="bg-transparent border-0 shadow-none md:row-span-3 p-0"
            header={
              <div className="space-y-4 w-full h-full">
                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-1">
                  <BentoGridItem
                    title="Joining Date"
                    description="15 May 2025"
                    icon={
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-3 h-3 text-orange-600" />
                      </div>
                    }
                    className="bg-white border-gray-200 shadow-sm"
                  />

                  <BentoGridItem
                    title="Total Service"
                    description="4 months"
                    icon={
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-3 h-3 text-blue-900" />
                      </div>
                    }
                    className="bg-white border-gray-200 shadow-sm"
                  />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-2 gap-1">
                  <BentoGridItem
                    title="Blood Group"
                    description="-"
                    icon={
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <User className="w-3 h-3 text-red-600" />
                      </div>
                    }
                    className="bg-white border-gray-200 shadow-sm"
                  />

                  <BentoGridItem
                    title="My Manager"
                    description="Mr. Sachin Baghele"
                    icon={
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <User className="w-3 h-3 text-green-600" />
                      </div>
                    }
                    className="bg-white border-gray-200 shadow-sm"
                  />
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-2 gap-1">
                  <BentoGridItem
                    title="My Role"
                    description="SENIOR VICE PRESIDENT"
                    icon={
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <User className="w-3 h-3 text-orange-600" />
                      </div>
                    }
                    className="bg-white border-gray-200 shadow-sm"
                  />

                  <BentoGridItem
                    title="Emergency Contact"
                    description="5566998877"
                    icon={
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <User className="w-3 h-3 text-orange-600" />
                      </div>
                    }
                    className="bg-white border-gray-200 shadow-sm"
                  />
                </div>
              </div>
            }
          />
        </BentoGrid>
      </div>
    </div>
  );
};

export default Profile;
