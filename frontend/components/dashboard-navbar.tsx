"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/react";
import { Settings, Home, Menu } from "lucide-react";
import { useSidebar } from "@/components/sidebar-context";
import { LogoutButton } from "./logout-button";

export function DashboardNavbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { toggle } = useSidebar();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getClaims().then(({ data }) => {
      const email = data?.claims?.email as string | undefined;
      setUserEmail(email || null);
    });
  }, []);

  const userInitial = userEmail?.charAt(0).toUpperCase() || "U";

  return (
    <Navbar
      maxWidth="full"
      height="3.5rem"
      isBordered
      classNames={{
        wrapper: "px-4",
      }}
    >
      <NavbarContent justify="start">
        <NavbarItem className="hidden md:flex">
          <Button isIconOnly variant="light" size="sm" onPress={toggle}>
            <Menu className="h-4 w-4" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href="/"
            variant="light"
            size="sm"
            startContent={<Home className="h-4 w-4" />}
            className="text-default-500"
          >
            <span className="hidden sm:inline">Home</span>
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                size="sm"
                name={userInitial}
                classNames={{
                  base: "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white cursor-pointer",
                }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu">
              <DropdownSection showDivider>
                <DropdownItem key="profile" isReadOnly className="opacity-100">
                  <p className="font-medium">Account</p>
                  <p className="text-default-500 text-xs">
                    {userEmail || "Loading..."}
                  </p>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection showDivider>
                <DropdownItem
                  key="settings"
                  as={Link}
                  href="/dashboard/settings"
                  startContent={<Settings className="h-4 w-4 text-default-500" />}
                >
                  Settings
                </DropdownItem>
              </DropdownSection>
              <DropdownSection>
                <DropdownItem key="logout" className="p-0">
                  <LogoutButton />
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
