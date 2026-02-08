import { SidebarProvider } from "@/components/sidebar-context";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Suspense } from "react";
import { connection } from "next/server";

async function DashboardShell({ children }: { children: React.ReactNode }) {
  await connection();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col w-full">
          <main className="flex-1 overflow-auto pb-20 md:pb-0">
            {children}
          </main>
          <MobileNav />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-pulse text-default-500">Loading...</div>
        </div>
      }
    >
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  );
}
