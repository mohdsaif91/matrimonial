import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { ProfileDropdownProps } from "../types/header";

function ProfileDropdown({
  user,
  dropdownOpen,
  setDropdownOpen,
  dropdownRef,
  handleLogout,
}: ProfileDropdownProps) {
  return (
    <div className="hidden md:flex relative items-center space-x-3">
      {/* Profile button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center focus:outline-none z-50"
      >
        {/* Avatar */}
        <img
          src={user?.avatar}
          alt="User Profile"
          className="w-8 h-8 rounded-full border border-gray-200 shadow-sm"
        />

        {/* Name + Role */}
        <div className="flex flex-col items-start ml-2 text-left">
          <span className="text-sm font-medium text-gray-900">
            {user?.name || "User"}
          </span>
          <span className="text-xs text-green-600 font-medium">Premium</span>
        </div>
      </button>
      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-12 bg-white rounded-md shadow-lg py-2 w-56 z-50 border border-gray-200"
        >
          <div className="px-4 py-2 font-medium text-gray-800 text-base border-b">
            Welcome {user?.name || "User"}
          </div>

          <div className="px-4 py-2 text-gray-700 text-sm">
            Login Time - 12:08 PM
          </div>
          <div className="px-4 py-2 text-gray-700 text-sm">
            Last Activity - 01:24 PM
          </div>

          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
          >
            My Account
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
          >
            Settings
          </Link>
          <Link
            to="/support"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
          >
            Support
          </Link>
          <Link
            to="/lock"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
          >
            Lock Screen
          </Link>

          <button
            onMouseDown={handleLogout}
            className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex justify-center text-sm"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
