export interface LegalNorm {
  id: string;
  code: string;
  name: string;
  category: "Constitucional" | "Procesal" | "Laboral" | "Civil" | "Penal" | "Mercantil";
  keyArticles: {
    article: string;
    title: string;
    content: string;
    application: string;
  }[];
}

export const ecuadorLegalCorpus: LegalNorm[] = [
  {
    id: "cre",
    code: "CRE-2008",
    name: "Constitución de la República del Ecuador",
    category: "Constitucional",
    keyArticles: [
      {
        article: "Art. 76",
        title: "Garantías Básicas del Debido Proceso",
        content: "En todo proceso en el que se determinen derechos y obligaciones de cualquier orden, se asegurará el derecho al debido proceso que incluirá garantías básicas como la presunción de inocencia, el derecho a la defensa y la motivación de resoluciones.",
        application: "Aplicable en impugnación de actos administrativos, nulidades procesales y recursos constitucionales.",
      },
      {
        article: "Art. 82",
        title: "Derecho a la Seguridad Jurídica",
        content: "El derecho a la seguridad jurídica se fundamenta en el respeto a la Constitución y en la existencia de normas jurídicas previas, claras, públicas y aplicadas por las autoridades competentes.",
        application: "Invocable en controversias tributarias, cambios intempestivos de reglamentación y defensa de contratos vigentes.",
      },
      {
        article: "Art. 88",
        title: "Acción de Protección",
        content: "La acción de protección tendrá por objeto el amparo directo y eficaz de los derechos reconocidos en la Constitución, y podrá interponerse cuando exista una vulneración de derechos constitucionales por actos u omisiones de cualquier autoridad pública.",
        application: "Procedente contra clausuras arbitrarias, despidos discriminatorios y retenciones indebidas del Estado.",
      },
    ],
  },
  {
    id: "cogep",
    code: "COGEP",
    name: "Código Orgánico General de Procesos",
    category: "Procesal",
    keyArticles: [
      {
        article: "Art. 73",
        title: "Términos Procesales y Cómputo",
        content: "Los términos correrán en días hábiles. Se entiende por término el tiempo que la ley o la o el juzgador señala para la realización de un acto procesal.",
        application: "Cálculo perentorio para contestación de demandas, excepciones previas y anuncio de pruebas periciales.",
      },
      {
        article: "Art. 153",
        title: "Excepciones Previas Admisibles",
        content: "Solo se podrán plantear como excepciones previas: 1. Incompetencia de la o del juzgador; 2. Incapacidad de la parte actora o de su representante; 3. Falta de legitimación en la causa; 4. Litispendencia; 5. Prescripción; 6. Caducidad; 7. Cosa juzgada; 8. Transacción; 9. Existencia de convenio arbitral.",
        application: "Defensa preliminar en juicios ordinarios para solicitar el archivo o incompetencia del tribunal.",
      },
      {
        article: "Art. 289",
        title: "Procedimiento Ordinario",
        content: "Se tramitarán por el procedimiento ordinario todas las controversias que no tengan una tramitación especial en este Código.",
        application: "Juicios de cumplimiento de contrato, indemnizaciones de daños y perjuicios y nulidades contractuales.",
      },
    ],
  },
  {
    id: "ct",
    code: "COD-TRABAJO",
    name: "Código del Trabajo del Ecuador",
    category: "Laboral",
    keyArticles: [
      {
        article: "Art. 172",
        title: "Causas para que el Empleador Dé por Terminado el Contrato (Visto Bueno)",
        content: "El empleador podrá dar por terminado el contrato de trabajo, previo visto bueno: por faltas repetidas e injustificadas de puntualidad, indisciplina o abandono del trabajo por más de tres días consecutivos.",
        application: "Procedimiento administrativo ante el Inspector del Trabajo para desvinculación sin indemnización patronal.",
      },
      {
        article: "Art. 188",
        title: "Indemnización por Despido Intempestivo",
        content: "El empleador que despidiere intempestivamente al trabajador, será condenado a indemnizarle: hasta tres años de servicio, con el valor de tres meses de remuneración; y, de más de tres años, con el valor equivalente a un mes de remuneración por cada año de servicio.",
        application: "Cálculo matemático exacto de liquidaciones laborales ante despido unilateral.",
      },
    ],
  },
  {
    id: "cc",
    code: "COD-CIVIL",
    name: "Código Civil Ecuatoriano",
    category: "Civil",
    keyArticles: [
      {
        article: "Art. 1454",
        title: "Definición Legal de Contrato o Convención",
        content: "Contrato o convención es un acto por el cual una parte se obliga para con otra a dar, hacer o no hacer alguna cosa. Cada parte puede ser una o muchas personas.",
        application: "Estructuración de contratos de arrendamiento, compraventa, prestación de servicios y garantías.",
      },
      {
        article: "Art. 1561",
        title: "Fuerza Obligatoria del Contrato",
        content: "Todo contrato legalmente celebrado es una ley para los contratantes, y no puede ser invalidado sino por su consentimiento mutuo o por causas legales.",
        application: "Fundamento sustantivo en juicios ejecutivos y ordinarios de cobro de facturas y obligaciones.",
      },
    ],
  },
  {
    id: "coip",
    code: "COIP",
    name: "Código Orgánico Integral Penal",
    category: "Penal",
    keyArticles: [
      {
        article: "Art. 186",
        title: "Delito de Estafa",
        content: "La persona que, para obtener un beneficio patrimonial para sí misma o para un tercero, mediante simulación de hechos falsos o deformación u ocultamiento de hechos verdaderos, induzca a error a otra, será sancionada con pena privativa de libertad de cinco a siete años.",
        application: "Patrocinio en denuncias penales por fraudes mercantiles y estafas piramidales.",
      },
      {
        article: "Art. 526",
        title: "Audiencia de Calificación de Flagrancia",
        content: "La persona aprehendida en flagrancia será puesta inmediatamente a órdenes de la o del juzgador competente para la audiencia correspondiente dentro de las veinticuatro horas posteriores a la aprehensión.",
        application: "Defensa penal técnica urgente para solicitar medidas cautelares no privativas de la libertad.",
      },
    ],
  },
  {
    id: "companias",
    code: "LEY-COMPANIAS",
    name: "Ley de Compañías (Reformas SAS)",
    category: "Mercantil",
    keyArticles: [
      {
        article: "Art. 98.1",
        title: "Sociedad por Acciones Simplificada (SAS)",
        content: "La sociedad por acciones simplificada es una sociedad de capitales cuya naturaleza será siempre mercantil, constituida por una o varias personas naturales o jurídicas, que solo serán responsables hasta el monto de sus respectivos aportes.",
        application: "Constitución ágil de startups y empresas en 24h ante la Superintendencia de Compañías sin escritura pública obligatoria.",
      },
    ],
  },
];

export function searchEcuadorLaw(query: string): {
  article: string;
  norm: string;
  title: string;
  content: string;
  application: string;
  relevanceScore: number;
}[] {
  const q = query.toLowerCase();
  const results: {
    article: string;
    norm: string;
    title: string;
    content: string;
    application: string;
    relevanceScore: number;
  }[] = [];

  for (const norm of ecuadorLegalCorpus) {
    for (const art of norm.keyArticles) {
      let score = 0;
      if (art.article.toLowerCase().includes(q)) score += 10;
      if (art.title.toLowerCase().includes(q)) score += 6;
      if (art.content.toLowerCase().includes(q)) score += 4;
      if (art.application.toLowerCase().includes(q)) score += 3;
      if (norm.name.toLowerCase().includes(q)) score += 2;

      // Partial keyword matches
      const words = q.split(" ").filter((w) => w.length > 3);
      for (const w of words) {
        if (art.title.toLowerCase().includes(w)) score += 2;
        if (art.content.toLowerCase().includes(w)) score += 1;
        if (art.application.toLowerCase().includes(w)) score += 1;
      }

      if (score > 0) {
        results.push({
          article: art.article,
          norm: norm.name,
          title: art.title,
          content: art.content,
          application: art.application,
          relevanceScore: score,
        });
      }
    }
  }

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}
