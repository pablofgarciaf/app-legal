export interface DemoCase {
  id: string;
  code: string;
  title: string;
  area: string;
  client: string;
  assignedLawyer: string;
  stage: string;
  status: "En trámite" | "Para sentencia" | "Audiencia programada" | "Completado";
  nextEventDate: string;
  nextEventDescription: string;
  lastUpdateDate: string;
  internalNotesRestricted: boolean;
  documentsCount: number;
}

export const demoCases: DemoCase[] = [
  {
    id: "case-01",
    code: "17230-2026-00891",
    title: "Juicio Ordinario de Cumplimiento de Contrato Mercantil",
    area: "Derecho Civil / Mercantil",
    client: "Ing. Carlos Mendoza (Constructora Nova S.A.)",
    assignedLawyer: "Dra. Valeria Santamaría - Socia Litigante",
    stage: "Término de Prueba (Fase Pericial)",
    status: "En trámite",
    nextEventDate: "2026-11-04 10:30 AM",
    nextEventDescription: "Presentación de informe pericial contable en el Juzgado de lo Civil.",
    lastUpdateDate: "Hace 2 horas",
    internalNotesRestricted: true,
    documentsCount: 14,
  },
  {
    id: "case-02",
    code: "09201-2026-01452",
    title: "Acción de Protección Constitucional por Clausura Indebida",
    area: "Derecho Constitucional / Administrativo",
    client: "Farmacias del Sol Cía. Ltda.",
    assignedLawyer: "Abg. Diego Alarcón - Especialista Contencioso",
    stage: "Audiencia Oral de Sustanciación",
    status: "Audiencia programada",
    nextEventDate: "2026-10-29 09:00 AM",
    nextEventDescription: "Audiencia pública telemática ante la Sala de lo Contencioso.",
    lastUpdateDate: "Ayer a las 16:45",
    internalNotesRestricted: true,
    documentsCount: 8,
  },
  {
    id: "case-03",
    code: "17371-2026-00318",
    title: "Controversia Laboral por Despido Intempestivo y Finiquito",
    area: "Derecho Laboral",
    client: "Sra. Carmen Salazar",
    assignedLawyer: "Abg. Marcelo Viteri - Coordinador Laboral",
    stage: "Acta de Mediación en Centro Autorizado",
    status: "Para sentencia",
    nextEventDate: "2026-10-31 15:00 PM",
    nextEventDescription: "Firma de acuerdo transaccional en Centro de Arbitraje y Mediación.",
    lastUpdateDate: "Hace 1 día",
    internalNotesRestricted: true,
    documentsCount: 5,
  },
];

export interface JudicialNotificationAI {
  id: string;
  sourceDoc: string;
  court: string;
  processNumber: string;
  receiptTimestamp: string;
  aiClassification: string;
  detectedDeadlineDays: number;
  deadlineExpiration: string;
  aiSummary: string;
  suggestedAction: string;
  humanReviewStatus: "Pendiente de validación" | "Validado por abogado" | "Incorporado al expediente";
}

export const judicialNotificationAIDemo: JudicialNotificationAI = {
  id: "prov-2026-4412",
  sourceDoc: "Providencia_Notificada_Auto_de_Sustanciacion_17230.pdf",
  court: "Unidad Judicial Civil con sede en el Cantón Quito",
  processNumber: "17230-2026-00891",
  receiptTimestamp: "Hoy 08:15 AM (Casillero Judicial Electrónico)",
  aiClassification: "Auto Interlocutorio / Admisión de Excepción Previa",
  detectedDeadlineDays: 3,
  deadlineExpiration: "28 de Octubre de 2026 (18:00 hrs)",
  aiSummary:
    "El Juez de la causa corre traslado a la parte actora con el escrito de excepciones presentado por la demandada. Concede el término perentorio de 3 días para que se pronuncie sobre la excepción de incompetencia en razón de la materia.",
  suggestedAction:
    "Preparar escrito de contestación ratificando la competencia territorial y material, anexando copia certificada de la cláusula de sumisión expresa.",
  humanReviewStatus: "Pendiente de validación",
};

export interface DemoLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  area: string;
  urgency: "Alta" | "Media" | "Baja";
  status: "Nuevo" | "Contactado" | "Consulta Agendada" | "Contratado";
  source?: "Instagram" | "Facebook" | "Web" | "App" | "Referido";
  date: string;
}

export const demoLeads: DemoLead[] = [
  {
    id: "lead-01",
    name: "Dra. Patricia Cevallos",
    phone: "+593 99 876 5432",
    email: "patricia.c***@gmail.com",
    area: "Derecho Corporativo & SAS",
    urgency: "Alta",
    status: "Nuevo",
    source: "Instagram",
    date: "Hace 15 min",
  },
  {
    id: "lead-02",
    name: "Lic. Roberto Andrade",
    phone: "+593 98 123 4567",
    email: "roberto.a***@outlook.com",
    area: "Laboral / Visto Bueno",
    urgency: "Media",
    status: "Contactado",
    source: "Web",
    date: "Hace 2 horas",
  },
  {
    id: "lead-03",
    name: "Ing. Fausto Carrión",
    phone: "+593 99 555 7890",
    email: "fausto.c***@empresa.ec",
    area: "Civil / Arrendamiento Comercial",
    urgency: "Alta",
    status: "Consulta Agendada",
    source: "Referido",
    date: "Ayer",
  },
  {
    id: "lead-04",
    name: "Dra. Andrea Játiva",
    phone: "+593 99 444 1122",
    email: "andrea.j***@gmail.com",
    area: "Derecho Laboral",
    urgency: "Media",
    status: "Contratado",
    source: "Facebook",
    date: "Hace 3 días",
  },
  {
    id: "lead-05",
    name: "Ing. Marco Guzmán",
    phone: "+593 98 777 6655",
    email: "mguzman***@holding.ec",
    area: "Derecho Societario",
    urgency: "Baja",
    status: "Nuevo",
    source: "App",
    date: "Hace 4 horas",
  },
  {
    id: "lead-06",
    name: "Sra. Lucía Paredes",
    phone: "+593 97 555 4433",
    email: "lucia.p***@yahoo.com",
    area: "Derecho de Familia",
    urgency: "Alta",
    status: "Contactado",
    source: "Instagram",
    date: "Hace 6 horas",
  },
];
