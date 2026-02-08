"use client";

import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { Wand2 } from "lucide-react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";

export function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <HeroNavbar
      maxWidth="xl"
      isBordered
      classNames={{
        base: "bg-background/80 backdrop-blur-lg",
        wrapper: "max-w-7xl",
      }}
    >
      <NavbarBrand>
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-md shadow-violet-500/20">
            <Wand2 className="h-4 w-4" />
          </div>
          <span className="font-serif font-bold text-xl tracking-tight">
            FinSight
          </span>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>{children}</NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
}
