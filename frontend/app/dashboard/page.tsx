import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTransactionStats } from "@/lib/supabase/transactions";
import { DashboardContent } from "./dashboard-content";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    redirect("/auth/login");
  }

  let stats = {
    totalSpent: 0,
    totalIncome: 0,
    netSavings: 0,
    transactionCount: 0,
    categoryBreakdown: {} as Record<string, number>,
    monthlySpending: {} as Record<string, number>,
    recentTransactions: [] as Array<{
      id: string;
      date: string;
      category: string;
      amount: number;
      description: string | null;
    }>,
  };

  try {
    stats = await getTransactionStats();
  } catch {
    // Table might not exist yet
  }

  return <DashboardContent userEmail={(claims.email as string) || ""} stats={stats} />;
}
