import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SchemaMarkup from "@/components/SchemaMarkup";
import ThemeProvider from "@/components/ThemeProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VIS LEGAL | Plataforma LegalTech & Abogados Ecuador",
  description:
    "Firma jurídica y plataforma LegalTech con app móvil 24/7. Gestión transparente de casos, prevención ciudadana y membresía premium en Ecuador.",
  keywords: [
    "VIS LEGAL ABOGADOS",
    "LegalTech Ecuador",
    "App judicial",
    "Membresía jurídica",
    "Abogados Quito",
    "Abogados Guayaquil",
    "Buzón judicial IA",
    "Prevención legal",
  ],
  authors: [{ name: "VIS LEGAL ABOGADOS" }],
  creator: "BIZ LEGAL",
  publisher: "BIZ LEGAL",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://vislegalabogados.com",
    siteName: "VIS LEGAL ABOGADOS",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VIS LEGAL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <SchemaMarkup />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/brand/vis-legal-shield-transparent.png" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#F2F2F7" media="(prefers-color-scheme: light)" />
        {/* Inline script to prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.classList.add(t==='dark'?'dark':'light')}catch(e){document.documentElement.classList.add('light')}})();`
        }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
