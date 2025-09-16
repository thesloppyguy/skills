import React from "react";
import { SideBarItem, sideBarItems } from "@/constants";

const SideBar = ({ currentItem }: { currentItem: string }) => {
  return (
    <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-3">
      <nav className="w-full">
        <ul className="space-y-6">
          {sideBarItems.map((item: SideBarItem) => (
            <li key={item.label} className="flex flex-col items-center">
              <button
                className={`p-2 rounded-lg transition-colors ${
                  currentItem === item.label
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
  );
};

export default SideBar;
