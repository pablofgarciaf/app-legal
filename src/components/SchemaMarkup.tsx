import React from "react";

export default function SchemaMarkup() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": "https://vislegalabogados.com/#organization",
        "name": "VIS LEGAL ABOGADOS",
        "alternateName": "VIS LEGAL",
        "url": "https://vislegalabogados.com",
        "logo": "https://vislegalabogados.com/logo.png",
        "description":
          "Firma jurídica y plataforma LegalTech integral. Asesoría jurídica, litigios, membresía preventiva y seguimiento digital de expedientes en Ecuador.",
        "areaServed": {
          "@type": "Country",
          "name": "Ecuador",
        },
        "knowsAbout": [
          "Derecho Civil",
          "Derecho Laboral",
          "Derecho Corporativo y Societario",
          "Derecho de Familia",
          "Derecho Penal",
          "Prevención Jurídica",
          "LegalTech",
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Servicios Jurídicos y Membresías",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Membresía VIS LEGAL PREMIUM",
                "description": "Capacitación jurídica mensual para ciudadanos y pymes, check-up preventivo y tarifas preferenciales.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Patrocinio Judicial y Asesoría Legal Integral",
                "description": "Representación técnica en causas civiles, laborales, societarias y de familia.",
              },
            },
          ],
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+593-99-178-6275",
          "contactType": "customer service",
          "availableLanguage": ["Spanish", "English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://vislegalabogados.com/#website",
        "url": "https://vislegalabogados.com",
        "name": "VIS LEGAL ABOGADOS",
        "publisher": {
          "@id": "https://vislegalabogados.com/#organization",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
