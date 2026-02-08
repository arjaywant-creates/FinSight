"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface SidebarContextValue {
  isExpanded: boolean;
  toggle: () => void;
  setExpanded: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setExpanded] = useState(true);
  const toggle = useCallback(() => setExpanded((prev) => !prev), []);

  return (
    <SidebarContext.Provider value={{ isExpanded, toggle, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
