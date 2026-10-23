import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // Vista pública de demostración: no expone expedientes reales ni permite mutaciones.
  if (request.nextUrl.pathname === "/app/demo" || request.nextUrl.pathname.startsWith("/app/demo/")) return NextResponse.next();
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return NextResponse.redirect(new URL("/ingresar", request.url));
  const supabase = createServerClient(url, anonKey, { cookies: { getAll: () => request.cookies.getAll(), setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value, options }) => { request.cookies.set(name, value); response = NextResponse.next({ request }); response.cookies.set(name, value, options); }); } } });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/ingresar", request.url));
  const { data: profile } = await supabase.from("users").select("role,is_active,must_change_password").eq("id", user.id).maybeSingle();
  if (!profile?.is_active || !["ADMIN", "ABOGADO", "CLIENTE", "B2B"].includes(profile.role)) return NextResponse.redirect(new URL("/ingresar?error=unauthorized", request.url));
  if (profile.must_change_password && !request.nextUrl.pathname.startsWith("/app/cambiar-contrasena")) return NextResponse.redirect(new URL("/app/cambiar-contrasena", request.url));
  return response;
}

export const config = { matcher: ["/app/:path*"] };

