import { createClient } from "./server";
import type { AiSession, AiMessage } from "@/lib/types";

export async function saveAiSession(
  sessionType: "advice" | "chat",
  title: string,
  messages: AiMessage[]
) {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getClaims();
  const claims = authData?.claims;

  if (!claims) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("ai_sessions")
    .insert({
      user_id: claims.sub as string,
      session_type: sessionType,
      title,
      messages,
    })
    .select()
    .single();

  if (error) throw error;
  return data as AiSession;
}

export async function getAiSessions(
  sessionType?: "advice" | "chat"
): Promise<AiSession[]> {
  const supabase = await createClient();
  let query = supabase
    .from("ai_sessions")
    .select("*")
    .order("created_at", { ascending: false });

  if (sessionType) {
    query = query.eq("session_type", sessionType);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getAiSession(id: string): Promise<AiSession | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ai_sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as AiSession;
}

export async function deleteAiSession(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("ai_sessions").delete().eq("id", id);
  if (error) throw error;
}
