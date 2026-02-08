"use client";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="light" size="sm">
          {theme === "light" ? (
            <Sun key="light" size={ICON_SIZE} className="text-default-500" />
          ) : theme === "dark" ? (
            <Moon key="dark" size={ICON_SIZE} className="text-default-500" />
          ) : (
            <Laptop key="system" size={ICON_SIZE} className="text-default-500" />
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Theme selector"
        selectionMode="single"
        selectedKeys={new Set([theme || "system"])}
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0] as string;
          setTheme(selected);
        }}
      >
        <DropdownItem key="light" startContent={<Sun size={ICON_SIZE} className="text-default-500" />}>
          Light
        </DropdownItem>
        <DropdownItem key="dark" startContent={<Moon size={ICON_SIZE} className="text-default-500" />}>
          Dark
        </DropdownItem>
        <DropdownItem key="system" startContent={<Laptop size={ICON_SIZE} className="text-default-500" />}>
          System
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export { ThemeSwitcher };
