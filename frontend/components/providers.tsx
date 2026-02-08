"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { MagicCursor } from "./magic-cursor";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HeroUIProvider>
        {children}
        <MagicCursor />
      </HeroUIProvider>
    </ThemeProvider>
  );
}
