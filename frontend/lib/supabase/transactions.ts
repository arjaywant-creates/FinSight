import { createClient } from "./server";
import type { Transaction } from "@/lib/types";

export async function getTransactions(): Promise<Transaction[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function addTransaction(
  transaction: Omit<Transaction, "id" | "user_id" | "created_at">
) {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getClaims();
  const claims = authData?.claims;

  if (!claims) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      ...transaction,
      user_id: claims.sub as string,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Transaction;
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw error;
}

export async function getTransactionStats() {
  const transactions = await getTransactions();

  const totalSpent = transactions
    .filter((t) => t.category !== "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalIncome = transactions
    .filter((t) => t.category === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const categoryBreakdown = transactions
    .filter((t) => t.category !== "Income")
    .reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
        return acc;
      },
      {} as Record<string, number>
    );

  const monthlySpending = transactions
    .filter((t) => t.category !== "Income")
    .reduce(
      (acc, t) => {
        const month = t.date.slice(0, 7);
        acc[month] = (acc[month] || 0) + Number(t.amount);
        return acc;
      },
      {} as Record<string, number>
    );

  return {
    totalSpent,
    totalIncome,
    netSavings: totalIncome - totalSpent,
    transactionCount: transactions.length,
    categoryBreakdown,
    monthlySpending,
    recentTransactions: transactions.slice(0, 5),
  };
}
