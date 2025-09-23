import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HeaderProps, MenuItem } from "../types/header";
import { Search, X, Menu } from "lucide-react";
import ProfileComponent from "../component/ProfileComponent";
import { useDrawer } from "../context/DrawerContext";
import { headerLinks } from "../data/header";
import ousplLogo from "../assets/one_unit_sol.png";

function Header({ className }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchInput = useRef<HTMLInputElement | null>(null);

  const { user, logout } = useContext(AuthContext);
  // const { toggleDrawer, isOpen } = useDrawer();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Toggle menu"]')
      ) {
        setMenuOpen(false);
      }
    }

    // document.addEventListener("mousedown", handleClickOutside);
    // return () => {
    //   document.removeEventListener("mousedown", handleClickOutside);
    // };
  }, []);

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
        <nav className="mt-10 md:mt-0">
          <ul className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0 text-white text-lg md:text-base p-4 md:p-0 gap-3">
            {headerLinks.map((headerItem: MenuItem) => (
              <li key={headerItem.id} className="relative group">
                {headerItem.children && headerItem.children.length > 0 ? (
                  <>
                    {/* Parent link with dropdown toggle */}
                    <button className="cursor-pointer py-2 md:py-0 text-[14.4px] flex items-center gap-1">
                      {headerItem.text}
                    </button>

                    {/* Dropdown */}
                    <ul className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white text-black shadow-lg rounded w-48 z-50">
                      {headerItem.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            to={child.link}
                            className="block px-4 py-2 hover:bg-gray-100 text-sm"
                            onClick={() => setMenuOpen(false)}
                          >
                            {child.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    to={headerItem.link}
                    className="block py-2 md:py-0 text-[14.4px]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {headerItem.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="relative w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ba6b7] w-4 h-4" />
          <input
            ref={searchInput}
            type="text"
            placeholder="Search..."
            className="pl-10 pr-3 py-2 rounded-xl w-full outline-[#465dff] bg-[#F0F3F8] text-[#333] placeholder:text-[#9ba6b7]"
          />
        </div>
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
      <ProfileComponent
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        user={user}
        handleLogout={handleLogout}
        dropdownRef={dropdownRef}
      />
      <div className="hidden md:flex relative items-center space-x-3">
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-12 bg-white rounded shadow-lg py-2 w-56 z-50"
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
              to=""
              className="block px-4 py-2 text-blue-600 hover:underline text-sm"
            >
              My Profile
            </Link>

            <button
              onMouseDown={handleLogout}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded flex w-full justify-center"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
