import MobileAppShell, { type UserRole } from "@/components/app/MobileAppShell";

const roles: UserRole[] = ["cliente", "abogado", "admin", "b2b"];

export default async function DemoAppPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const requestedRole = params.role as UserRole | undefined;
  const role = requestedRole && roles.includes(requestedRole) ? requestedRole : "cliente";

  return (
    <MobileAppShell initialRole={role} demoMode />
  );
}
