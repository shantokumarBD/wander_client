import type { NavLink } from "@/types";

export const mainLinks: NavLink[] = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Admin", href: "/admin" },
];

export const authLinks: NavLink[] = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export const profileLink: NavLink = { label: "Profile", href: "/profile" };
