import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedUrgencies = new Set(["Baja", "Media", "Alta"]);

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Solicitud JSON inválida." }, { status: 400 }); }
  const input = body as Record<string, unknown>;
  const fullName = text(input.name, 255);
  const phone = text(input.phone, 50);
  const email = text(input.email, 255).toLowerCase();
  const legalArea = text(input.area, 100);
  const urgency = text(input.urgency, 20);
  const caseDescription = text(input.description, 4000);
  if (!fullName || !phone || !email || !legalArea || !caseDescription || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Completa los campos requeridos con datos válidos." }, { status: 422 });
  }
  if (!allowedUrgencies.has(urgency)) return NextResponse.json({ error: "Nivel de urgencia inválido." }, { status: 422 });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return NextResponse.json({ error: "La captura no está disponible: falta configuración segura del servidor." }, { status: 503 });
  const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await supabase.from("crm_leads").insert({
    full_name: fullName, phone, email, legal_area: legalArea, source: "WEB", status: "NUEVO",
    case_description: `[Urgencia: ${urgency}] ${caseDescription}`,
  }).select("id, created_at").single();
  if (error || !data) {
    console.error("crm_leads insert failed", { code: error?.code, message: error?.message });
    return NextResponse.json({ error: "No se pudo registrar la solicitud. Intenta nuevamente." }, { status: 502 });
  }
  return NextResponse.json({ leadId: data.id, createdAt: data.created_at }, { status: 201 });
}
