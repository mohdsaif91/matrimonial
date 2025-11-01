import { JSX } from "react";

export interface MenuItem {
  id: number | string;
  text: string;
  link?: string;
  show: boolean;
  children?: MenuItem[];
}

export interface HeaderLink extends MenuItem {
  id: number;
  text: string;
  show: boolean;
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

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  gender: string; // could also be narrowed to "male" | "female" if known
  status: string; // or "active" | "inactive"
  role_id: number | null;
  email_verified_at: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  avatar?: string;
}

export interface ProfileDropdownProps {
  user: User;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  handleLogout: () => void;
}
