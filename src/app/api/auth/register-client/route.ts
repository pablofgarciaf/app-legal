import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const cedula = String(body.cedula ?? "").replace(/[^0-9]/g, "");
  if (fullName.length < 3 || !email.includes("@") || phone.length < 7 || cedula.length !== 10) return NextResponse.json({ error: "Completa nombre, correo, teléfono y una cédula válida." }, { status: 400 });
  const admin = createSupabaseAdminClient();
  if (!admin) return NextResponse.json({ error: "El registro aún no está conectado a Supabase." }, { status: 503 });
  const { data: created, error } = await admin.auth.admin.createUser({ email, email_confirm: false, user_metadata: { full_name: fullName, phone, cedula, role: "CLIENTE" } });
  if (error || !created.user) return NextResponse.json({ error: "No se pudo iniciar el registro. Verifica que el correo no esté registrado." }, { status: 400 });
  const { error: profileError } = await admin.from("users").insert({ id: created.user.id, email, full_name: fullName, phone, cedula, role: "CLIENTE", is_active: true, must_change_password: true });
  if (profileError) { await admin.auth.admin.deleteUser(created.user.id); return NextResponse.json({ error: "No se pudo crear el perfil." }, { status: 500 }); }
  return NextResponse.json({ ok: true, message: "Revisa tu correo para confirmar tu cuenta." }, { status: 201 });
}
