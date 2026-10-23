"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const response = await fetch("/api/auth/sign-in", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password }) });
    if (!response.ok) {
      setError("No pudimos validar tus credenciales. Revisa los datos e inténtalo otra vez.");
      setLoading(false);
      return;
    }
    router.replace("/app");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#f6f3ee] text-[#17211f]">
      <section className="w-full max-w-md rounded-3xl border border-[#d8d0c4] bg-white shadow-[0_20px_60px_rgba(27,58,53,.12)] p-8 shadow-xl">
        <Link href="/" className="text-sm opacity-70 hover:opacity-100">← Volver a VIS LEGAL</Link>
        <h1 className="mt-8 text-3xl font-semibold">Ingresar a tu espacio</h1>
        <p className="mt-3 text-sm opacity-70">Accede con la cuenta registrada en la plataforma.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm">Correo electrónico<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-[#d8d0c4] bg-white px-4 py-3" /></label>
          <label className="block text-sm">Contraseña<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#d8d0c4] bg-white px-4 py-3" /></label>
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
          <button disabled={loading} type="submit" className="w-full rounded-xl bg-[#b27a38] hover:bg-[#986329] px-4 py-3 font-semibold text-white disabled:opacity-60">{loading ? "Validando…" : "Ingresar"}</button>
        </form>
        <p className="mt-6 text-center text-sm opacity-70">¿Aún no tienes cuenta? <Link href="/afiliarse" className="font-semibold text-[#1b3a35]">Afíliate aquí</Link></p>
      </section>
    </main>
  );
}

