import { createClient } from "@/lib/supabase/server";
import { getTransactions } from "@/lib/supabase/transactions";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { NextResponse } from "next/server";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});

const adviceSchema = z.object({
  overallScore: z
    .number()
    .min(0)
    .max(100)
    .describe("Financial health score from 0-100"),
  summary: z.string().describe("A 2-3 sentence summary of the user's financial health"),
  topSpendingCategories: z
    .array(
      z.object({
        category: z.string(),
        amount: z.number(),
        percentage: z.number(),
        advice: z.string().describe("Specific advice for this category"),
      })
    )
    .describe("Top 5 spending categories with advice"),
  savingsTips: z
    .array(
      z.object({
        tip: z.string(),
        potentialSavings: z.string(),
        priority: z.enum(["high", "medium", "low"]),
      })
    )
    .describe("3-5 actionable savings tips"),
  monthlyTrend: z
    .string()
    .describe("Analysis of monthly spending trends"),
  warningFlags: z
    .array(z.string())
    .describe("Any concerning spending patterns"),
  positiveHabits: z
    .array(z.string())
    .describe("Positive financial habits observed"),
});

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getClaims();

    if (!authData?.claims) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const transactions = await getTransactions();

    if (transactions.length === 0) {
      return NextResponse.json(
        { error: "No transactions found. Add some transactions first." },
        { status: 400 }
      );
    }

    const transactionSummary = transactions.map((t) => ({
      date: t.date,
      category: t.category,
      amount: Number(t.amount),
      description: t.description,
    }));

    const { object } = await generateObject({
      model: openrouter("google/gemini-2.5-flash"),
      schema: adviceSchema,
      prompt: `You are a professional financial advisor AI. Analyze the following user transactions and provide detailed financial advice.

Transactions data:
${JSON.stringify(transactionSummary, null, 2)}

Total transactions: ${transactions.length}
Date range: ${transactions[transactions.length - 1]?.date} to ${transactions[0]?.date}

Provide a comprehensive financial health analysis with actionable advice. Be specific with numbers and percentages. Be encouraging but honest about areas for improvement.`,
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error("AI advice error:", error);
    return NextResponse.json(
      { error: "Failed to generate advice. Please try again." },
      { status: 500 }
    );
  }
}
