"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Menu, User, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserType = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type MobileMenuProps = {
  mainLinks: NavLink[];
  authLinks: NavLink[];
  profileLink: NavLink;
  user?: UserType | null;
  onSignOut?: () => void;
};

const MobileMenu = ({
  mainLinks,
  authLinks,
  profileLink,
  user,
  onSignOut,
}: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-10 text-neutral-800 hover:bg-neutral-100 lg:hidden"
            aria-label="Open menu"
          />
        }
      >
        <Menu className="size-6" strokeWidth={1.8} />
      </SheetTrigger>

      <SheetContent side="right" className="gap-0 p-0 sm:max-w-xs">
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle className="text-lg font-bold tracking-tight text-cyan-600">
            WanderLast
          </SheetTitle>
        </SheetHeader>

        {/* User profile card in mobile view */}
        {user ? (
          <div className="flex items-center gap-3 border-b border-border bg-neutral-50 px-4 py-3.5">
            <Avatar className="size-10 border border-border">
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
        ) : null}

        <nav className="flex flex-col gap-1 overflow-y-auto px-3 py-4">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className={cn(
                "block rounded-md px-3 py-2.5 text-[15px] font-medium text-neutral-800 transition-colors hover:bg-neutral-100 hover:text-cyan-600",
                link.active && "bg-cyan-50 text-cyan-600"
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="my-2 h-px bg-border" aria-hidden="true" />

          {user ? (
            <>
              <Link
                href={profileLink.href}
                onClick={close}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2.5 text-[15px] font-medium text-neutral-800 transition-colors hover:bg-neutral-100 hover:text-cyan-600",
                  profileLink.active && "bg-cyan-50 text-cyan-600"
                )}
              >
                <UserRound className="size-[18px]" strokeWidth={1.8} />
                {profileLink.label}
              </Link>

              <button
                type="button"
                onClick={() => {
                  close();
                  onSignOut?.();
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-[15px] font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="size-[18px]" />
                Sign Out
              </button>
            </>
          ) : (
            authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className={cn(
                  "block rounded-md px-3 py-2.5 text-[15px] font-medium text-neutral-800 transition-colors hover:bg-neutral-100 hover:text-cyan-600",
                  link.active && "bg-cyan-50 text-cyan-600"
                )}
              >
                {link.label}
              </Link>
            ))
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
