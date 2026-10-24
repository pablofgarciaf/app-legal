import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VIS LEGAL ABOGADOS - LegalTech Ecuador",
    short_name: "VIS LEGAL",
    description: "Aplicación Jurídica Integral y Seguimiento de Causas Judiciales en Ecuador (Titular: BIZ LEGAL S.A.S.)",
    start_url: "/",
    display: "standalone",
    background_color: "#F2F2F7",
    theme_color: "#173D38",
    icons: [
      {
        src: "/brand/vis-legal-shield-transparent.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
