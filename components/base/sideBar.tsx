import React, { useEffect, useState } from "react";
import { SideBarItem, sideBarItems } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

const getCurrentItem = (currentItem: string | undefined) => {
  switch (currentItem) {
    case "":
      return "My Home";
    case "organization":
      return "My Org";
    case "employee":
      return "My Profile";
    case "growth":
      return "My Growth";
    default:
      return "My Home";
  }
};
const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentItem = pathname.split("/").pop();
  const [Item, setItem] = useState<string>(getCurrentItem(currentItem));

  useEffect(() => {
    if (!currentItem) {
      setItem("My Home");
      router.push("/");
    }
  }, [currentItem, router]);

  return (
    <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-3">
      <nav className="w-full">
        <ul className="space-y-6">
          {sideBarItems.map((item: SideBarItem) => (
            <li key={item.label} className="flex flex-col items-center">
              <button
                className={`p-2 rounded-lg transition-colors ${Item === item.href
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
                onClick={() => {
                  router.push(item.href);
                  setItem(item.href);
                }}
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
