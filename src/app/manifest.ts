import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VIS LEGAL ABOGADOS - LegalTech Ecuador",
    short_name: "VIS LEGAL",
    description: "Aplicación Jurídica Integral y Seguimiento de Causas Judiciales en Ecuador (Titular: BIZ LEGAL S.A.S.)",
    start_url: "/",
    display: "standalone",
    background_color: "#060911",
    theme_color: "#2563EB",
    icons: [
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
