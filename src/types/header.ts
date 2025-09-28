import { JSX } from "react";

export interface MenuItem {
  id: number | string;
  text: string;
  link?: string;
  children?: MenuItem[];
}

export interface HeaderLink extends MenuItem {
  id: number;
  text: string;
  link?: string;
  element: JSX.Element;
  children: HeaderLink[];
}

export type RouteItem = {
  path: string;
  element: JSX.Element;
};

export interface HeaderProps {
  className?: string;
}

interface User {
  avatar: string;
  name: string;
}

export interface ProfileDropdownProps {
  user: User;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  handleLogout: () => void;
}
