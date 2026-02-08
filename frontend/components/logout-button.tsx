"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/auth/login");
  };

  return (
    <Button
      variant="light"
      size="sm"
      onPress={logout}
      className={cn("w-full justify-start text-danger hover:bg-danger-50", className)}
      startContent={<LogOut className="h-4 w-4" />}
    >
      Logout
    </Button>
  );
}
