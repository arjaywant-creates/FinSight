import { connection } from "next/server";
import { Suspense } from "react";

async function DynamicWrapper({ children }: { children: React.ReactNode }) {
  await connection();
  return <>{children}</>;
}

export default function AiChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full py-20 text-default-500">
          Summoning the oracle...
        </div>
      }
    >
      <DynamicWrapper>{children}</DynamicWrapper>
    </Suspense>
  );
}
