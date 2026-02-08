import { Hero } from "@/components/hero";
import { Wand2 } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { AuthButton } from "@/components/auth-button";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

async function HomeContent() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims ? { email: data.claims.email as string } : null;

  return (
    <>
      <Navbar>
        <Suspense
          fallback={
            <div className="h-8 w-20 animate-pulse bg-default-200 rounded-lg" />
          }
        >
          <AuthButton />
        </Suspense>
      </Navbar>
      <main className="flex flex-col items-center">
        <Hero user={user} />

        <footer className="w-full py-12 border-t border-divider mt-auto">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-serif font-bold magic-gradient-text">
              <Wand2 className="h-5 w-5 text-violet-500" />
              <span>FinSight</span>
            </div>
            <p className="text-sm text-default-500">
              &copy; 2026 FinSight. All rights reserved.
            </p>
            {/* <div className="flex gap-4 text-sm text-default-500">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Terms
              </Link>
            </div> */}
          </div>
        </footer>
      </main>
    </>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse text-default-400">Loading...</div>
          </div>
        }
      >
        <HomeContent />
      </Suspense>
    </div>
  );
}
