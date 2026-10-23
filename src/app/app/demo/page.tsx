import MobileAppShell, { type UserRole } from "@/components/app/MobileAppShell";

const roles: UserRole[] = ["cliente", "abogado", "admin", "b2b"];

export default async function DemoAppPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const requestedRole = params.role as UserRole | undefined;
  const role = requestedRole && roles.includes(requestedRole) ? requestedRole : "cliente";

  return (
    <div className="relative">
      <div className="pointer-events-none fixed left-1/2 top-3 z-[70] -translate-x-1/2 rounded-full border border-amber-300/30 bg-[#173d38]/90 px-4 py-2 text-center text-[11px] font-semibold text-[#f7dfad] shadow-lg backdrop-blur">
        Vista previa demo · datos ficticios · no es producción
      </div>
      <MobileAppShell initialRole={role} />
    </div>
  );
}
