export interface Transaction {
  id: string;
  user_id: string;
  date: string;
  category: string;
  amount: number;
  description: string | null;
  created_at: string;
}

export interface AiSession {
  id: string;
  user_id: string;
  session_type: "advice" | "chat";
  title: string;
  messages: AiMessage[];
  created_at: string;
}

export interface AiMessage {
  role: "user" | "assistant";
  content: string;
}

export const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Education",
  "Travel",
  "Groceries",
  "Rent & Housing",
  "Insurance",
  "Subscriptions",
  "Personal Care",
  "Gifts & Donations",
  "Income",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "#ea580c",
  Transportation: "#2563eb",
  Shopping: "#db2777",
  Entertainment: "#7c3aed",
  "Bills & Utilities": "#dc2626",
  Healthcare: "#059669",
  Education: "#0891b2",
  Travel: "#d97706",
  Groceries: "#16a34a",
  "Rent & Housing": "#4f46e5",
  Insurance: "#0d9488",
  Subscriptions: "#9333ea",
  "Personal Care": "#ec4899",
  "Gifts & Donations": "#ea580c",
  Income: "#047857",
  Other: "#475569",
};
