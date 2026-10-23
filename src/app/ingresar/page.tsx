"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Eye,
  EyeOff,
  Scale,
  ShieldCheck,
  UserRound,
} from "lucide-react";

type DemoRole = "CLIENTE" | "ABOGADO" | "ADMIN" | "B2B";

const demoRoles: Array<{
  role: DemoRole;
  label: string;
  email: string;
  password: string;
  description: string;
  Icon: typeof UserRound;
}> = [
  { role: "CLIENTE", label: "Cliente", email: "cliente@vislegal.example", password: "DemoCliente2026!", description: "Casos, documentos y citas", Icon: UserRound },
  { role: "ABOGADO", label: "Abogado", email: "abogado@vislegal.example", password: "DemoAbogado2026!", description: "Expedientes, agenda y buzón", Icon: BriefcaseBusiness },
  { role: "ADMIN", label: "Administración", email: "admin@vislegal.example", password: "DemoAdmin2026!", description: "CRM, usuarios y métricas", Icon: ShieldCheck },
  { role: "B2B", label: "Empresa", email: "empresa@vislegal.example", password: "DemoEmpresa2026!", description: "Cuenta corporativa", Icon: Building2 },
];

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<DemoRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function selectDemo(role: (typeof demoRoles)[number]) {
    setSelectedRole(role.role);
    setEmail(role.email);
    setPassword(role.password);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error ?? "No se pudo iniciar sesión. Verifica tus datos.");
      }

      router.push(data?.redirectTo ?? "/app");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] px-4 py-6 text-[#132e2b] sm:px-6 sm:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col justify-center">
        <header className="mb-6 flex items-center justify-between px-1 sm:mb-8">
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight text-[#132e2b]">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#173d38] text-[#e9b866] shadow-sm">
              <Scale size={20} strokeWidth={2.2} />
            </span>
            <span>VIS <span className="text-[#b47a2c]">LEGAL</span></span>
          </Link>
          <Link href="/" className="rounded-full px-3 py-2 text-sm text-[#56706b] transition hover:bg-white">
            Volver al inicio
          </Link>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1fr_1.08fr] lg:items-stretch">
          <div className="hidden rounded-[2rem] bg-[#173d38] p-10 text-[#f8f5ef] shadow-[0_22px_70px_rgba(23,61,56,.16)] lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[.22em] text-[#e9b866]">Portal VIS Legal</p>
              <h1 className="max-w-md font-serif text-5xl leading-[1.04]">Tu equipo legal, en un solo espacio.</h1>
              <p className="mt-6 max-w-md text-base leading-7 text-[#d4e2dd]">Consulta avances, documentos, citas y comunicaciones con claridad y seguridad.</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-sm text-[#dce9e4]">
              <ShieldCheck className="mb-4 text-[#e9b866]" size={22} />
              Acceso protegido y personalizado según tu relación con VIS Legal.
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#e3ddd3] bg-white p-5 shadow-[0_20px_60px_rgba(38,39,34,.10)] sm:p-8">
            <div className="mb-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-[#b47a2c]">Acceso seguro</p>
              <h2 className="text-3xl font-semibold tracking-[-.04em] text-[#132e2b] sm:text-4xl">Ingresa a tu espacio</h2>
              <p className="mt-2 text-sm leading-6 text-[#687671]">Selecciona un perfil de demostración o usa tu cuenta registrada.</p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {demoRoles.map((role) => {
                const Icon = role.Icon;
                const active = selectedRole === role.role;
                return (
                  <button key={role.role} type="button" onClick={() => selectDemo(role)} className={`rounded-2xl border p-3 text-left transition ${active ? "border-[#b47a2c] bg-[#fff7e9] shadow-sm" : "border-[#e8e4dc] bg-[#fbfaf8] hover:border-[#c9b99e]"}`}>
                    <Icon size={18} className={active ? "text-[#b47a2c]" : "text-[#56706b]"} />
                    <span className="mt-2 block text-xs font-semibold text-[#203b37]">{role.label}</span>
                    <span className="mt-1 block text-[10px] leading-4 text-[#83908b]">{role.description}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm font-medium text-[#243d39]">
                Correo electrónico
                <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@correo.com" autoComplete="email" className="mt-2 h-14 w-full rounded-2xl border border-[#ddd7ce] bg-[#fdfcfb] px-4 text-base outline-none transition placeholder:text-[#a6afa9] focus:border-[#b47a2c] focus:ring-4 focus:ring-[#b47a2c]/10" />
              </label>
              <label className="block text-sm font-medium text-[#243d39]">
                Contraseña
                <span className="relative mt-2 block">
                  <input required type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Tu contraseña" autoComplete="current-password" className="h-14 w-full rounded-2xl border border-[#ddd7ce] bg-[#fdfcfb] px-4 pr-12 text-base outline-none transition placeholder:text-[#a6afa9] focus:border-[#b47a2c] focus:ring-4 focus:ring-[#b47a2c]/10" />
                  <button type="button" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71807a]">
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </span>
              </label>

              {error && <p role="alert" className="rounded-2xl border border-[#e7b9b0] bg-[#fff5f2] px-4 py-3 text-sm leading-5 text-[#9b3f32]">{error}</p>}

              <button disabled={loading} className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#b47a2c] px-5 text-base font-semibold text-white shadow-[0_10px_24px_rgba(180,122,44,.22)] transition hover:bg-[#9d6823] disabled:cursor-wait disabled:opacity-60">
                {loading ? "Verificando…" : "Ingresar"}
                {!loading && <ArrowRight size={19} />}
              </button>
            </form>

            <p className="mt-5 rounded-2xl bg-[#f4f8f6] px-4 py-3 text-center text-xs leading-5 text-[#61736d]">Los perfiles visibles son datos de prueba. Solo funcionarán cuando las cuentas demo existan en un proyecto Supabase de ensayo.</p>
            <p className="mt-5 text-center text-sm text-[#687671]">¿Aún no tienes cuenta? <Link href="/afiliarse" className="font-semibold text-[#56706b] underline-offset-4 hover:underline">Afíliate aquí</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
}
