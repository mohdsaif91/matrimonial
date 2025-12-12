import { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronRight } from "lucide-react";

import { AuthContext } from "../context/AuthContext";
import ProfileComponent from "../component/ProfileComponent";
import { headerLinks } from "../data/header";
import { HeaderProps } from "../types/header";
import ousplLogo from "../assets/one_unit_sol.png";
import { getUserDataById, markAttendenceCheckOut } from "../service/auth";
import { getAuthUserPermission } from "../util/ClientUtils";

function Header({ className }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [linkMenuOpen, setLinkMenuOpen] = useState("");
  const [innerLinkMenuOpen, setinnerLinkMenuOpen] = useState("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const menuRef = useRef<HTMLUListElement | null>(null);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  // const authUser = queryClient.getQueryData(["authUser"]);
  const authUser = JSON.parse(sessionStorage.getItem("authUser") as string);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setLinkMenuOpen("");
        setinnerLinkMenuOpen("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const attendenceMutation = useMutation({
    mutationFn: markAttendenceCheckOut,
    onSuccess: (data) => {
      logout();
      navigate("/");
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Login failed");
    },
  });

  const handleLogout = () => {
    attendenceMutation.mutate();
  };

  return (
    <header
      className={`bg-gradient-to-r from-[#190A05] to-[#870000] shadow-md px-2 py-5 flex items-center justify-between flex-wrap relative ${className}`}
    >
      <div className="flex items-center flex-row">
        <div className="flex items-center p-1">
          <Link to="/dashboard" className="text-xl font-bold text-white">
            <img src={ousplLogo} alt="OUSPL Logo" className="h-10 logo_menu" />
          </Link>
        </div>
        <nav className="mt-10 md:mt-0 ml-8">
          <ul
            ref={menuRef}
            className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0 text-white text-lg md:text-base p-4 md:p-0 gap-3 z-[99]"
          >
            {headerLinks.map(
              (headerItem) =>
                headerItem?.show &&
                getAuthUserPermission().includes(headerItem.slug as string) && (
                  <li
                    key={headerItem && headerItem.id}
                    className="relative group lg:mr-1 md:mr-0"
                  >
                    {headerItem &&
                    headerItem.children &&
                    headerItem &&
                    headerItem.show &&
                    getAuthUserPermission().includes(
                      headerItem.slug as string
                    ) &&
                    headerItem.children.length > 0 ? (
                      <>
                        <button
                          className="cursor-pointer py-2 md:py-0 md:text-[14.4px] lg:text-[15px] group flex items-center gap-1"
                          onClick={() =>
                            setLinkMenuOpen(headerItem && headerItem.text)
                          }
                        >
                          {headerItem && headerItem.text}
                          <ChevronDown size={18} />
                        </button>
                        <ul
                          className={`absolute left-0 top-full mt-2 bg-white text-black shadow-lg rounded w-max z-[99] ${
                            linkMenuOpen === headerItem.text
                              ? "block"
                              : "hidden"
                          }`}
                        >
                          {headerItem &&
                            getAuthUserPermission().includes(
                              headerItem.slug as string
                            ) &&
                            headerItem.children
                              .filter((f) => f.show)
                              .map((child) => {
                                return child.children &&
                                  !child.link &&
                                  getAuthUserPermission().includes(
                                    child?.slug as string
                                  ) ? (
                                  <li key={child.id} className="relative">
                                    <button
                                      className="cursor-pointer px-4 py-2 flex items-center hover:bg-gray-100 text-sm w-full justify-between"
                                      onClick={() =>
                                        setinnerLinkMenuOpen(child.text)
                                      }
                                    >
                                      <div>{child.text}</div>
                                      <div>
                                        <ChevronRight
                                          className="ml-1"
                                          size={18}
                                        />
                                      </div>
                                    </button>
                                    <ul
                                      className={`absolute left-full top-0 bg-white text-black shadow-lg rounded w-max z-[99] ${
                                        innerLinkMenuOpen === child.text
                                          ? "block"
                                          : "hidden"
                                      }`}
                                    >
                                      {child.children.map((innerChildItem) => {
                                        if (
                                          innerChildItem.show &&
                                          getAuthUserPermission().includes(
                                            child.slug as string
                                          )
                                        ) {
                                          return (
                                            <li key={innerChildItem.id}>
                                              <Link
                                                to={innerChildItem.link || "#"}
                                                className="px-4 py-2 flex items-center hover:bg-gray-100 text-sm"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setLinkMenuOpen("");
                                                  setinnerLinkMenuOpen("");
                                                  setMenuOpen(false);
                                                }}
                                              >
                                                {innerChildItem.text}
                                              </Link>
                                            </li>
                                          );
                                        } else {
                                        }
                                      })}
                                    </ul>
                                  </li>
                                ) : (
                                  getAuthUserPermission().includes(
                                    child?.slug as string
                                  ) && (
                                    <li key={child.id}>
                                      <Link
                                        to={child.link || "#"}
                                        className="px-4 py-2 flex items-center hover:bg-gray-100 text-sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setLinkMenuOpen("");
                                          setMenuOpen(false);
                                        }}
                                      >
                                        {child.text}
                                      </Link>
                                    </li>
                                  )
                                );
                              })}
                        </ul>
                      </>
                    ) : (
                      getAuthUserPermission().includes(
                        headerItem.slug as string
                      ) && (
                        <Link
                          to={(headerItem && headerItem.link) || "#"}
                          className="block py-2 md:py-0 text-[14.4px]"
                          onClick={() => setMenuOpen(false)}
                        >
                          {headerItem && headerItem.text}
                        </Link>
                      )
                    )}
                  </li>
                )
            )}
          </ul>
        </nav>
        <div className="ml-4"></div>
      </div>
      <div className="md:hidden flex items-center space-x-3">
        <button
          className="text-white z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile profile photo */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="focus:outline-none z-50"
        >
          <img
            src={user?.avatar}
            alt="User Profile"
            className="w-10 h-10 rounded-full border border-white"
          />
        </button>
      </div>
      <div>
        <ProfileComponent
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          user={authUser}
          handleLogout={handleLogout}
          dropdownRef={dropdownRef}
        />
      </div>
    </header>
  );
}

export default Header;
