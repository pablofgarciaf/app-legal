"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter(); const [password, setPassword] = useState(""); const [error, setError] = useState<string | null>(null); const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); setLoading(true); setError(null); const response = await fetch("/api/auth/change-password", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) }); const data = await response.json(); if (!response.ok) { setError(data.error ?? "No se pudo cambiar la contraseña."); setLoading(false); return; } router.replace("/app"); }
  return <main className="min-h-screen flex items-center justify-center bg-[#f6f3ee] px-6"><form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"><h1 className="text-3xl font-semibold">Cambia tu contraseña</h1><p className="mt-3 text-sm opacity-70">La contraseña temporal dejó de ser válida. Define una nueva para continuar.</p><label className="mt-8 block text-sm">Nueva contraseña<input required minLength={12} type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3" /></label>{error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}<button disabled={loading} className="mt-6 w-full rounded-xl bg-[#b27a38] px-4 py-3 font-semibold text-white disabled:opacity-60">{loading ? "Guardando…" : "Guardar contraseña"}</button></form></main>;
}
