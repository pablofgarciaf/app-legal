import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App | VIS LEGAL",
  description: "Espacio de trabajo de la plataforma VIS LEGAL.",
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
