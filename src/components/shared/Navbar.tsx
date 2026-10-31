"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Settings, User, UserRound } from "lucide-react";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";
import { authLinks, mainLinks, profileLink } from "@/lib/nav-links";
import MobileMenu from "./MobileMenu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully!");
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to sign out.");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white">
      <nav className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: main navigation (desktop) */}
        <NavigationMenu className="hidden flex-none lg:flex">
          <NavigationMenuList className="justify-start gap-8">
            {mainLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  render={<Link href={link.href} />}
                  className={cn(
                    "relative rounded-none p-0 text-[15px] font-medium text-neutral-800 transition-colors hover:bg-transparent hover:text-cyan-600 focus:bg-transparent",
                    link.active &&
                      "text-cyan-600 after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-cyan-600"
                  )}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Center: brand */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-cyan-600 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          WanderLast
        </Link>

        {/* Right: user session & auth (desktop) */}
        <div className="hidden items-center gap-6 lg:flex">
          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full p-0.5 outline-none ring-offset-2 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-cyan-500"
                    aria-label="User account menu"
                  >
                    <Avatar className="size-9 border border-border">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user.image ?? ""}
                        alt={user.name ?? "User"}
                      />
                      <AvatarFallback className="bg-cyan-100 font-semibold text-cyan-700">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />
              <PopoverContent
                align="end"
                sideOffset={8}
                className="w-64 rounded-xl border border-neutral-200/80 bg-white p-3 shadow-lg"
              >
                {/* User info header */}
                <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
                  <Avatar className="size-10 border border-neutral-200">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user.image ?? ""}
                      alt={user.name ?? "User"}
                    />
                    <AvatarFallback className="bg-cyan-100 font-semibold text-cyan-700">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-neutral-900">
                      {user.name || "User"}
                    </p>
                    <p className="truncate text-xs text-neutral-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Popover actions / links */}
                <div className="flex flex-col gap-1 pt-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-cyan-600"
                  >
                    <User className="size-4 text-neutral-500" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/bookings"
                    className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-cyan-600"
                  >
                    <Settings className="size-4 text-neutral-500" />
                    <span>My Bookings</span>
                  </Link>

                  <div className="my-1 h-px bg-neutral-100" />

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="size-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <ul className="flex items-center gap-6">
              {authLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[15px] font-medium text-neutral-800 transition-colors hover:text-cyan-600",
                      link.active && "text-cyan-600"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mobile menu (responsive) */}
        <MobileMenu
          mainLinks={mainLinks}
          authLinks={authLinks}
          profileLink={profileLink}
          user={user}
          onSignOut={handleSignOut}
        />
      </nav>
    </header>
  );
};

export default Navbar;
