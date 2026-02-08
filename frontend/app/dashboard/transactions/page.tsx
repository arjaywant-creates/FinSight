import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTransactions } from "@/lib/supabase/transactions";
import { TransactionsContent } from "./transactions-content";

export default async function TransactionsPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) redirect("/auth/login");

  let transactions: Awaited<ReturnType<typeof getTransactions>> = [];
  try {
    transactions = await getTransactions();
  } catch {
    // Table might not exist yet
  }

  return <TransactionsContent transactions={transactions} />;
}
