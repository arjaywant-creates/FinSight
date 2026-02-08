import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AuthButtonClient } from "./auth-button-client";

export async function AuthButton() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (!user) {
    return <AuthButtonClient user={null} />;
  }

  return (
    <AuthButtonClient
      user={{ email: user.email as string }}
    />
  );
}
