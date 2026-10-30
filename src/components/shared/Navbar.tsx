import Link from "next/link";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { authLinks, mainLinks, profileLink } from "@/lib/nav-links";
import MobileMenu from "./MobileMenu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
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

        {/* Right: profile + auth (desktop) */}
        <ul className="hidden items-center gap-7 lg:flex">
          <li>
            <Link
              href={profileLink.href}
              className={cn(
                "flex items-center gap-1.5 text-[15px] font-medium text-neutral-800 transition-colors hover:text-cyan-600",
                profileLink.active && "text-cyan-600"
              )}
            >
              <UserRound className="size-[18px]" strokeWidth={1.8} />
              {profileLink.label}
            </Link>
          </li>
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

        {/* Mobile: interactive part only */}
        <MobileMenu
          mainLinks={mainLinks}
          authLinks={authLinks}
          profileLink={profileLink}
        />
      </nav>
    </header>
  );
};

export default Navbar;
