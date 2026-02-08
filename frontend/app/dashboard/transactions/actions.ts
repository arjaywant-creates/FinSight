"use server";

import { addTransaction, deleteTransaction } from "@/lib/supabase/transactions";
import { revalidatePath } from "next/cache";

export async function createTransactionAction(formData: FormData) {
  const date = formData.get("date") as string;
  const category = formData.get("category") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const description = (formData.get("description") as string) || null;

  if (!date || !category || isNaN(amount)) {
    return { error: "Please fill in all required fields." };
  }

  try {
    await addTransaction({ date, category, amount, description });
    revalidatePath("/dashboard/transactions");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function deleteTransactionAction(id: string) {
  try {
    await deleteTransaction(id);
    revalidatePath("/dashboard/transactions");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
}
