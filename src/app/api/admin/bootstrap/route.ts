import { NextResponse } from "next/server";
import { createSupabaseAdminClient, isAdminRole, type AdminRole } from "@/lib/supabase-server";

export const runtime = "nodejs";

type BootstrapUser = { email: string; fullName: string; role: AdminRole; temporaryPassword: string; organizationId?: string };

export async function POST(request: Request) {
  const expected = process.env.ADMIN_BOOTSTRAP_SECRET;
  const supplied = request.headers.get("x-admin-bootstrap-secret");
  if (!expected || !supplied || supplied !== expected) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  let body: { users?: BootstrapUser[] };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "JSON inválido." }, { status: 400 }); }
  if (!Array.isArray(body.users) || body.users.length < 1 || body.users.length > 25) return NextResponse.json({ error: "Se requiere entre 1 y 25 usuarios." }, { status: 400 });
  if (body.users.some((item) => !item.email || !item.fullName || !isAdminRole(item.role) || item.temporaryPassword.length < 12)) return NextResponse.json({ error: "Datos inválidos; la contraseña temporal debe tener 12 caracteres o más." }, { status: 400 });

  const admin = createSupabaseAdminClient();
  const result: Array<{ email: string; id: string }> = [];
  for (const item of body.users) {
    const { data: created, error: createError } = await admin.auth.admin.createUser({ email: item.email.trim().toLowerCase(), password: item.temporaryPassword, email_confirm: true, user_metadata: { must_change_password: true } });
    if (createError || !created.user) return NextResponse.json({ error: createError?.message ?? "No se pudo crear el usuario." }, { status: 400 });
    const { error: profileError } = await admin.from("users").upsert({ id: created.user.id, email: item.email.trim().toLowerCase(), full_name: item.fullName.trim(), role: item.role, organization_id: item.organizationId ?? null, is_active: true, must_change_password: true }, { onConflict: "id" });
    if (profileError) return NextResponse.json({ error: "Usuario creado pero no se pudo crear su perfil." }, { status: 500 });
    result.push({ email: item.email.trim().toLowerCase(), id: created.user.id });
  }
  return NextResponse.json({ created: result });
}
