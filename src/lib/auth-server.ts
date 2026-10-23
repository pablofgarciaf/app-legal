import { createSupabaseServerClient, isAdminRole } from "@/lib/supabase-server";

export async function getAuthenticatedProfile() {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { supabase, user: null, profile: null };
  const { data: profile } = await supabase.from("users").select("id,email,full_name,role,is_active,must_change_password").eq("id", user.id).maybeSingle();
  if (!profile || !profile.is_active || !isAdminRole(profile.role)) return { supabase, user, profile: null };
  return { supabase, user, profile };
}

