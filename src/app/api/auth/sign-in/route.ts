import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: Request) {
  const { email, password } = await request.json().catch(() => ({}));
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return NextResponse.json({ error: "Autenticación no configurada." }, { status: 503 });
  const response = NextResponse.json({ ok: true });
  const supabase = createServerClient(url, anonKey, { cookies: { getAll: () => [], setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options)); } } });
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return NextResponse.json({ error: "Credenciales inválidas." }, { status: 401 });
  return response;
}
