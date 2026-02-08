"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-blue-500",
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
    color: "text-emerald-500",
  },
  {
    title: "Magic",
    href: "/dashboard/ai-advice",
    icon: Sparkles,
    color: "text-violet-500",
  },
  // {
  //   title: "Chat",
  //   href: "/dashboard/ai-chat",
  //   icon: MessageSquare,
  //   color: "text-fuchsia-500",
  // },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-divider bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-between h-16 px-4 sm:justify-around">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[64px] rounded-lg py-1 transition-all duration-200",
                isActive
                  ? "text-violet-500 font-medium"
                  : "text-default-500 hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "p-1.5 rounded-xl transition-colors",
                  isActive ? "bg-violet-500/10" : "bg-transparent"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive ? item.color : "text-current"
                  )}
                />
              </div>
              <span className="text-[10px] leading-none">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
