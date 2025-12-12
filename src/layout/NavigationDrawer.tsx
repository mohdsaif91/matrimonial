import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { headerLinks } from "../data/header";
import {
  Home,
  Users,
  ClipboardList,
  ListChecks,
  BarChart3,
  Activity,
  Settings,
  UserCog,
  FileText,
  MenuIcon,
  X,
} from "lucide-react"; // lucide-react icons
import ousplLogo from "../assets/one_unit_sol.png";

const iconMap: Record<string, React.ReactNode> = {
  Menu: <MenuIcon className="w-6 h-6" />,
  Dashboard: <Home className="w-6 h-6" />,
  "Manage client": <Users className="w-6 h-6" />,
  "Manage Shortlist": <ClipboardList className="w-6 h-6" />,
  "Manage Leads": <ListChecks className="w-6 h-6" />,
  "Manage Task": <ClipboardList className="w-6 h-6" />,
  "Manage report": <BarChart3 className="w-6 h-6" />,
  "Activity Log": <Activity className="w-6 h-6" />,
  "Manage Users": <UserCog className="w-6 h-6" />,
  Settings: <Settings className="w-6 h-6" />,
  "Admin Settings": <FileText className="w-6 h-6" />,
  Close: <X className="w-6 h-6" />,
};

function NavigationDrawer({ openFlag }: { openFlag: boolean }) {
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    if (openFlag !== isOpen) {
      setIsOpen(openFlag);
    }
  }, [openFlag]);

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 z-99 h-screen overflow-hidden bg-[#232E51]
         text-white flex flex-col transition-all duration-300 100-vh ${
           isOpen ? "w-64" : "w-16"
         }`}
    >
      <nav className="flex-1 overflow-hidden">
        <div className="flex items-center p-5">
          <Link to="/dashboard" className="text-xl font-bold text-white">
            <img src={ousplLogo} alt="OUSPL Logo" className="h-10 logo_menu" />
          </Link>
        </div>
        <ul className="space-y-1">
          {headerLinks.map((item) => (
            <li key={item.id}>
              <div>
                <button
                  className={`flex items-center w-full px-3 py-2 hover:bg-[#465dff] rounded-md cursor-pointer ${
                    !isOpen ? "justify-center" : "flex-start"
                  }`}
                  onClick={() => {
                    item.Children.length > 0
                      ? setOpenDropdown(
                          openDropdown === item.id ? null : item.id
                        )
                      : null;
                  }}
                >
                  <span>
                    {iconMap[item.text] || <Home className="w-5 h-5" />}
                  </span>
                  {isOpen && <span className="ml-3 text-sm">{item.text}</span>}
                  {item.Children.length > 0 && isOpen && (
                    <svg
                      className={`ml-auto w-4 h-4 transform transition-transform ${
                        openDropdown === item.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>

                {/* Children */}
                {item.Children.length > 0 && openDropdown === item.id && (
                  <ul className="ml-8 mt-1 space-y-1">
                    {item.Children.map((child) => (
                      <li key={child.id}>
                        <Link
                          to={child.link}
                          className="block px-3 py-1 text-sm hover:bg-[#465dff] rounded-md"
                        >
                          {isOpen ? child.text : "•"}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default NavigationDrawer;
