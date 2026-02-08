"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Sparkles,
  MessageSquare,
  Wand2,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
} from "lucide-react";
import { Button, Tooltip, Divider, Avatar } from "@heroui/react";
import { useSidebar } from "@/components/sidebar-context";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FloatingSparkles } from "@/components/magic-sparkles";
import { useRouter } from "next/navigation";

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
    title: "Magic Insights",
    href: "/dashboard/ai-advice",
    icon: Sparkles,
    color: "text-violet-500",
  },
  // {
  //   title: "Magic Chat",
  //   href: "/dashboard/ai-chat",
  //   icon: MessageSquare,
  //   color: "text-fuchsia-500",
  // },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isExpanded, toggle } = useSidebar();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getClaims().then(({ data }) => {
      const email = data?.claims?.email as string | undefined;
      setUserEmail(email || null);
    });
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/auth/login");
  };

  const userInitial = userEmail?.charAt(0).toUpperCase() || "U";

  return (
    <motion.aside
      animate={{ width: isExpanded ? 240 : 64 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="hidden md:flex flex-col h-screen sticky top-0 border-r border-divider bg-content1/50 backdrop-blur-lg overflow-hidden relative"
    >
      {isExpanded && <FloatingSparkles count={4} />}

      {/* Header */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-divider shrink-0 relative z-10">
        <Link href="/dashboard" className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/20 animate-magic-pulse">
            <Wand2 className="h-4 w-4" />
          </div>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-serif font-bold text-lg tracking-tight whitespace-nowrap"
            >
              FinSight
            </motion.span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto relative z-10">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          const button = (
            <Button
              key={item.title}
              as={Link}
              href={item.href}
              variant={isActive ? "flat" : "light"}
              className={cn(
                "w-full justify-start transition-all duration-200 min-h-10",
                isExpanded ? "px-3" : "px-0 justify-center min-w-10",
                isActive
                  ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 font-medium magic-glow-sm"
                  : "text-default-600 hover:text-foreground"
              )}
              startContent={
                isExpanded ? (
                  <item.icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isActive ? "text-violet-500" : item.color
                    )}
                  />
                ) : undefined
              }
              isIconOnly={!isExpanded}
            >
              {isExpanded ? (
                item.title
              ) : (
                <item.icon
                  className={cn(
                    "h-4 w-4",
                    isActive ? "text-violet-500" : item.color
                  )}
                />
              )}
            </Button>
          );

          if (!isExpanded) {
            return (
              <Tooltip key={item.title} content={item.title} placement="right">
                {button}
              </Tooltip>
            );
          }

          return button;
        })}
      </nav>

      {/* Bottom section */}
      <div className="shrink-0 relative z-10">
        <Divider />

        {/* Home & Theme */}
        <div className={cn(
          "px-2 py-2 space-y-1",
          !isExpanded && "flex flex-col items-center space-y-1"
        )}>
          {isExpanded ? (
            <Button
              as={Link}
              href="/"
              variant="light"
              size="sm"
              className="w-full justify-start text-default-500 hover:text-foreground"
              startContent={<Home className="h-4 w-4" />}
            >
              Home
            </Button>
          ) : (
            <Tooltip content="Home" placement="right">
              <Button
                as={Link}
                href="/"
                variant="light"
                size="sm"
                isIconOnly
                className="text-default-500 hover:text-foreground"
              >
                <Home className="h-4 w-4" />
              </Button>
            </Tooltip>
          )}

          {isExpanded ? (
            <div className="flex items-center justify-between px-3 py-1">
              <span className="text-sm text-default-500">Theme</span>
              <ThemeSwitcher />
            </div>
          ) : (
            <Tooltip content="Theme" placement="right">
              <div>
                <ThemeSwitcher />
              </div>
            </Tooltip>
          )}
        </div>

        <Divider />

        {/* User card */}
        <div className={cn(
          "p-2",
          !isExpanded && "flex flex-col items-center"
        )}>
          {isExpanded ? (
            <div className="flex items-center gap-3 px-2 py-2">
              <Avatar
                size="sm"
                name={userInitial}
                classNames={{
                  base: "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shrink-0",
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {userEmail?.split("@")[0] || "User"}
                </p>
                <p className="text-xs text-default-400 truncate">
                  {userEmail || "Loading..."}
                </p>
              </div>
              <Tooltip content="Logout" placement="top">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={handleLogout}
                  className="text-default-400 hover:text-danger shrink-0"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </Tooltip>
            </div>
          ) : (
            <Tooltip content={userEmail || "User"} placement="right">
              <Avatar
                as="button"
                size="sm"
                name={userInitial}
                classNames={{
                  base: "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white",
                }}
              />
            </Tooltip>
          )}
        </div>

        <Divider />

        {/* Collapse toggle */}
        <div className={cn(
          "p-2",
          !isExpanded && "flex justify-center"
        )}>
          <Button
            variant="light"
            size="sm"
            onPress={toggle}
            className="w-full text-default-500 hover:text-foreground"
            isIconOnly={!isExpanded}
          >
            {isExpanded ? (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>Collapse</span>
              </>
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </motion.aside>
  );
}
