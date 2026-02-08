"use client";

import Link from "next/link";
import {
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/react";
import { LayoutDashboard } from "lucide-react";
import { LogoutButton } from "./logout-button";

interface AuthButtonClientProps {
  user: { email: string } | null;
}

export function AuthButtonClient({ user }: AuthButtonClientProps) {
  if (!user) {
    return (
      <div className="flex gap-2">
        <Button as={Link} href="/auth/login" variant="light" size="sm">
          Login
        </Button>
        <Button as={Link} href="/auth/sign-up" color="primary" size="sm">
          Get Started
        </Button>
      </div>
    );
  }

  const userInitial = user.email?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex items-center gap-4">
      <Button
        as={Link}
        href="/dashboard"
        variant="light"
        className="hidden sm:flex"
      >
        Dashboard
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            size="sm"
            name={userInitial}
            classNames={{
              base: "bg-primary/10 text-primary cursor-pointer",
            }}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User menu">
          <DropdownSection showDivider>
            <DropdownItem key="profile" isReadOnly className="opacity-100">
              <p className="font-medium">Account</p>
              <p className="text-default-500 text-xs">{user.email}</p>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider>
            <DropdownItem
              key="dashboard"
              as={Link}
              href="/dashboard"
              startContent={<LayoutDashboard className="h-4 w-4" />}
            >
              Dashboard
            </DropdownItem>
          </DropdownSection>
          <DropdownSection>
            <DropdownItem key="logout" className="p-0">
              <LogoutButton />
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
