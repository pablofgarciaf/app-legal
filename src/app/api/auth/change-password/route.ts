import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado." }, { status: 401 });
  const body = await request.json().catch(() => null) as { password?: string } | null;
  if (!body?.password || body.password.length < 12) return NextResponse.json({ error: "La contraseña debe tener al menos 12 caracteres." }, { status: 400 });
  const { error } = await supabase.auth.updateUser({ password: body.password, data: { must_change_password: false } });
  if (error) return NextResponse.json({ error: "No se pudo actualizar la contraseña." }, { status: 400 });
  const admin = createSupabaseAdminClient();
  const { error: profileError } = await admin.from("users").update({ must_change_password: false, updated_at: new Date().toISOString() }).eq("id", user.id);
  if (profileError) return NextResponse.json({ error: "Contraseña actualizada, pero el perfil requiere revisión administrativa." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
