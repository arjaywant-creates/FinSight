"use client";

import { FloatingSparkles } from "@/components/magic-sparkles";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-svh w-full overflow-hidden">
      {/* Magic background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="magic-orb magic-orb-1" />
        <div className="magic-orb magic-orb-2" />
        <div className="magic-orb magic-orb-3" />
      </div>

      <FloatingSparkles count={8} seed={42} />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
