import { ChevronDown, Search, CircleUserIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ProfileDropdownProps } from "../types/header";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getUserDataById } from "../service/auth";

function ProfileDropdown({
  user,
  dropdownOpen,
  setDropdownOpen,
  dropdownRef,
  handleLogout,
}: ProfileDropdownProps) {
  const [userData, setUserData] = useState(null);
  const searchInput = useRef<HTMLInputElement | null>(null);

  const userId = sessionStorage.getItem("staffUserID");

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData && userId) {
      userMutation.mutate(userId);
    }
  }, [userId]);

  const userMutation = useMutation({
    mutationFn: getUserDataById,
    onSuccess: (data) => {
      setUserData({ ...data.data });
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Login failed");
    },
    onSettled: () => {},
  });

  console.log(userData, " <>?");

  return (
    <div
      className="
    +idden md:flex relative items-center space-x-3"
    >
      <div className="relative w-[180px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ba6b7] w-4 h-4" />
        <input
          ref={searchInput}
          type="text"
          placeholder="Search..."
          className="pl-10 pr-3 py-2 rounded-xl w-full outline-[#465dff] bg-[#F0F3F8] text-[#333] placeholder:text-[#9ba6b7]"
        />
      </div>
      {/* Profile button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center cursor-pointer focus:outline-none z-50"
      >
        {user?.avatar ? (
          <img
            src={user?.avatar}
            alt="User Profile"
            className="w-8 h-8 rounded-full border border-gray-200 shadow-sm"
          />
        ) : (
          <CircleUserIcon size={24} className="text-white" />
        )}

        <div className="flex flex-col items-start ml-2 text-left">
          <span className="text-sm font-medium capitalize text-white">
            {user?.name || "User"}
          </span>
        </div>
      </button>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-12 bg-white rounded-md shadow-lg py-2 w-56 z-50 border border-gray-200"
        >
          <div className="px-4 py-2 text-gray-700 text-sm">
            Login Time - {userData?.login_time}
          </div>
          <div className="px-4 py-2 text-gray-700 text-sm">
            Last Activity - {userData?.last_activity_time}
          </div>
          <div
            onClick={() => {
              const userData = JSON.parse(
                sessionStorage.getItem("authUser") as string
              );
              console.log(userData, " <>?");

              navigate("/editManageUsers", {
                state: {
                  clientId: userData.id,
                },
              });
              setDropdownOpen(false);
            }}
            className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
          >
            My Profile
          </div>
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
