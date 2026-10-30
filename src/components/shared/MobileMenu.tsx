"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, UserRound } from "lucide-react";
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

type MobileMenuProps = {
  mainLinks: NavLink[];
  authLinks: NavLink[];
  profileLink: NavLink;
};

const MobileMenu = ({ mainLinks, authLinks, profileLink }: MobileMenuProps) => {
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

      <SheetContent side="right" className="gap-0 p-0">
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle className="text-lg font-bold tracking-tight text-cyan-600">
            WanderLast
          </SheetTitle>
        </SheetHeader>

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

          {authLinks.map((link) => (
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
        </nav>
       </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
