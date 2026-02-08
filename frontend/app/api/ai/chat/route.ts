import { createClient } from "@/lib/supabase/server";
import { getTransactions, getTransactionStats } from "@/lib/supabase/transactions";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, tool, stepCountIs } from "ai";
import { z } from "zod";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getClaims();

  if (!authData?.claims) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = await req.json();

  let transactionContext = "";
  try {
    const stats = await getTransactionStats();
    const transactions = await getTransactions();
    transactionContext = `
User's Financial Data:
- Total Income: $${stats.totalIncome.toFixed(2)}
- Total Spent: $${stats.totalSpent.toFixed(2)}
- Net Savings: $${stats.netSavings.toFixed(2)}
- Total Transactions: ${stats.transactionCount}
- Category Breakdown: ${JSON.stringify(stats.categoryBreakdown)}
- Monthly Spending: ${JSON.stringify(stats.monthlySpending)}
- Recent Transactions: ${JSON.stringify(transactions.slice(0, 10).map((t) => ({ date: t.date, category: t.category, amount: Number(t.amount), description: t.description })))}
`;
  } catch {
    transactionContext = "No transaction data available yet.";
  }

  const result = streamText({
    model: openrouter("google/gemini-2.5-flash"),
    system: `You are FinSight's Magic Oracle, a mystical and knowledgeable financial wizard. You help users understand their spending, provide budgeting advice, and answer financial questions with a touch of magic and wonder.

${transactionContext}

Guidelines:
- Be conversational, helpful, and encouraging with a magical flair
- Reference the user's actual data when relevant
- Provide specific, actionable advice
- Use numbers and percentages when discussing finances
- Occasionally use magical metaphors (spells, potions, crystal ball, enchantments) to make advice more engaging
- If the user asks about something unrelated to finances, gently redirect
- Keep responses concise but informative
- Use markdown formatting for clarity`,
    messages,
    tools: {
      getSpendingByCategory: tool({
        description: "Get all spending categories with amounts",
        inputSchema: z.object({}),
        execute: async () => {
          const stats = await getTransactionStats();
          return stats.categoryBreakdown;
        },
      }),
      getRecentTransactions: tool({
        description: "Get the 5 most recent transactions",
        inputSchema: z.object({}),
        execute: async () => {
          const transactions = await getTransactions();
          return transactions.slice(0, 5).map((t) => ({
            date: t.date,
            category: t.category,
            amount: Number(t.amount),
            description: t.description,
          }));
        },
      }),
      getMonthlyTrend: tool({
        description: "Get monthly spending trend data",
        inputSchema: z.object({}),
        execute: async () => {
          const stats = await getTransactionStats();
          return stats.monthlySpending;
        },
      }),
    },
    stopWhen: stepCountIs(3),
  });

  return result.toUIMessageStreamResponse();
}
