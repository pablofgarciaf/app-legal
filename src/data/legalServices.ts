export interface LegalArea {
  id: string;
  name: string;
  shortDesc: string;
  detailedDesc: string;
  iconName: string;
  typicalCases: string[];
}

export const legalAreas: LegalArea[] = [
  {
    id: "civil-contratos",
    name: "Derecho Civil y Contratos",
    shortDesc: "Protección patrimonial, arrendamientos, cobro de deudas y controversias contractuales.",
    detailedDesc: "Asesoramos en la estructuración de contratos blindados, compraventas seguras, juicios ordinarios de cumplimiento y recuperación de obligaciones dinerarias.",
    iconName: "FileCheck2",
    typicalCases: ["Incumplimiento de contratos", "Juicios ejecutivos de cobro", "Prescripciones adquisitivas", "Herencias y particiones"],
  },
  {
    id: "laboral",
    name: "Derecho Laboral y Empleo",
    shortDesc: "Defensa jurídica laboral tanto para trabajadores como para empleadores y pymes.",
    detailedDesc: "Resolución de despidos intempestivos, vistos buenos, cálculo de liquidaciones, mediación laboral y auditoría de cumplimiento patronal.",
    iconName: "Briefcase",
    typicalCases: ["Despido intempestivo", "Trámites de Visto Bueno", "Auditoría de actas de finiquito", "Demandas laborales en sede judicial"],
  },
  {
    id: "corporativo",
    name: "Derecho Corporativo & Societario",
    shortDesc: "Constitución de compañías SAS, acuerdos de socios y blindaje de operaciones mercantiles.",
    detailedDesc: "Acompañamiento integral a startups y empresas consolidadas en fusiones, reformas estatutarias, contratos comerciales y defensa contra multas de entidades de control.",
    iconName: "Building2",
    typicalCases: ["Constitución de SAS en 24h", "Pactos de accionistas y gobernanza", "Contratos de confidencialidad y distribución", "Cumplimiento ante Superintendencia de Compañías"],
  },
  {
    id: "familia",
    name: "Derecho de Familia y Menores",
    shortDesc: "Pensión de alimentos, divorcios consensuales o litigiosos y patria potestad con empatía y firmeza.",
    detailedDesc: "Gestión humana y resolutiva de procesos familiares, garantizando el bienestar de los hijos y la liquidación justa de la sociedad conyugal.",
    iconName: "Users",
    typicalCases: ["Fijación y rebaja de pensiones alimenticias", "Divorcio por mutuo acuerdo o contencioso", "Régimen de visitas y tenencia", "Capitulaciones matrimoniales"],
  },
  {
    id: "penal-estrategico",
    name: "Derecho Penal Estratégico",
    shortDesc: "Patrocinio en audiencias de flagrancia, estafas, delitos económicos y defensa técnica rigurosa.",
    detailedDesc: "Estrategias de litigación oral con apego irrestricto al debido proceso, medidas cautelares, recursos de apelación y casación penal.",
    iconName: "ShieldAlert",
    typicalCases: ["Defensa en formulación de cargos", "Estafas y delitos patrimoniales", "Investigaciones previas en Fiscalía", "Recursos de apelación judicial"],
  },
  {
    id: "transito-administrativo",
    name: "Tránsito y Contencioso Administrativo",
    shortDesc: "Impugnación de multas indebidas, accidentes de tránsito y demandas contra el Estado.",
    detailedDesc: "Defensa contra resoluciones ilegítimas de la administración pública, procesos coactivos y peritajes en siniestros viales.",
    iconName: "Scale",
    typicalCases: ["Impugnación de fotomultas ilegales", "Accidentes de tránsito con daños materiales", "Suspensión de cobros coactivos", "Acciones de protección constitucional"],
  },
];

export interface PremiumBenefit {
  title: string;
  description: string;
  tag: string;
}

export const premiumBenefits: PremiumBenefit[] = [
  {
    title: "Capacitación Jurídica Mensual Exclusiva",
    description: "Webinars en vivo impartidos por especialistas para la ciudadanía y emprendedores. Temas reales: arriendos, deudas, despidos, herencias y prevención.",
    tag: "Formación Activa",
  },
  {
    title: "Consultorio Jurídico Grupal Mensual",
    description: "Sesión interactiva de preguntas y respuestas donde nuestros abogados resuelven tus dudas legales cotidianas antes de que se conviertan en litigios.",
    tag: "Resolución Directa",
  },
  {
    title: "Check-Up Jurídico Periódico",
    description: "Evaluación integral de tu situación patrimonial, contractual o empresarial para detectar riesgos legales ocultos y prevenir demandas.",
    tag: "Prevención Activa",
  },
  {
    title: "Biblioteca de Guías, Modelos y Checklists",
    description: "Descarga plantillas contractuales verificadas, modelos de cartas de reclamo y checklists paso a paso redactados en lenguaje claro.",
    tag: "Recursos Prácticos",
  },
  {
    title: "Tarifas Preferenciales en Litigios y Trámites",
    description: "Descuentos de hasta el 25% en honorarios profesionales cuando requieras patrocinio judicial individual o trámites notariales.",
    tag: "Ahorro Tangible",
  },
  {
    title: "Prioridad de Agenda y Atención en la App",
    description: "Turnos preferentes de agendamiento para citas presenciales o telemáticas con el equipo de especialistas de VIS LEGAL ABOGADOS.",
    tag: "Acceso VIP",
  },
];
