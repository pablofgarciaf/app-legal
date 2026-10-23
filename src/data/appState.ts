export interface JudicialAct {
  id: string;
  date: string;
  type: string;
  description: string;
  actor: string;
  documentName?: string;
  fileSize?: string;
}

export interface AppCase {
  id: string;
  code: string;
  title: string;
  area: string;
  court: string;
  clientName: string;
  assignedLawyer: {
    name: string;
    role: string;
    avatar: string;
    phone: string;
  };
  status: "En trámite" | "Para sentencia" | "Audiencia oral" | "Mediación";
  stage: string;
  nextHearing: {
    date: string;
    time: string;
    type: "Presencial" | "Telemática";
    location: string;
  };
  acts: JudicialAct[];
  internalNotes: string[];
}

export const initialCases: AppCase[] = [
  {
    id: "case-01",
    code: "17230-2026-00891",
    title: "Juicio Ordinario de Cumplimiento de Contrato Mercantil",
    area: "Derecho Civil y Mercantil",
    court: "Unidad Judicial Civil con sede en el Cantón Quito",
    clientName: "Lic. Roberto Andrade",
    assignedLawyer: {
      name: "Dra. Valeria Santamaría",
      role: "Socia Litigante Civil & Mercantil",
      avatar: "VS",
      phone: "+593 99 876 5432",
    },
    status: "En trámite",
    stage: "Término de Prueba (Fase Pericial)",
    nextHearing: {
      date: "4 de Noviembre, 2026",
      time: "10:30 AM",
      type: "Presencial",
      location: "Sala 3B, Complejo Judicial Norte, Quito",
    },
    acts: [
      {
        id: "act-1",
        date: "Hoy 08:15 AM",
        type: "Providencia Notificada",
        description: "El Juez concede el término de 3 días para contestar excepciones previas formuladas por la contraparte.",
        actor: "Unidad Judicial Civil",
        documentName: "Auto_Sustanciacion_Termino_Excepciones.pdf",
        fileSize: "840 KB",
      },
      {
        id: "act-2",
        date: "20 de Octubre, 2026",
        type: "Escrito Presentado",
        description: "Se evacuó la prueba documental anunciada en la demanda inicial.",
        actor: "Dra. Valeria Santamaría (VIS LEGAL)",
        documentName: "Escrito_Evacuacion_Pruebas_Certificadas.pdf",
        fileSize: "1.8 MB",
      },
      {
        id: "act-3",
        date: "12 de Octubre, 2026",
        type: "Calificación de Demanda",
        description: "La demanda cumple los requisitos legales del COGEP y se admite a trámite ordinario.",
        actor: "Juez Ponente Dr. M. Villacís",
        documentName: "Auto_Calificacion_Demanda_17230.pdf",
        fileSize: "2.1 MB",
      },
    ],
    internalNotes: [
      "Estrategia interna: La contraparte alega falta de personería, pero tenemos el nombramiento inscrito en el Registro Mercantil al folio 14.",
      "Reunión preparatoria con perito contable agendada para el 31 de octubre.",
    ],
  },
  {
    id: "case-02",
    code: "09201-2026-01452",
    title: "Acción de Protección Constitucional por Clausura Arbitraria",
    area: "Derecho Constitucional & Administrativo",
    court: "Sala de lo Penal y Tránsito de la Corte Provincial",
    clientName: "Farmacias del Sol Cía. Ltda.",
    assignedLawyer: {
      name: "Abg. Diego Alarcón",
      role: "Especialista en Litigio Constitucional",
      avatar: "DA",
      phone: "+593 98 111 2233",
    },
    status: "Audiencia oral",
    stage: "Convocatoria a Audiencia Pública",
    nextHearing: {
      date: "29 de Octubre, 2026",
      time: "09:00 AM",
      type: "Telemática",
      location: "Sala Virtual Zoom de la Corte Provincial",
    },
    acts: [
      {
        id: "act-21",
        date: "Ayer 16:30 PM",
        type: "Notificación de Convocatoria",
        description: "Se convoca a las partes procesales a la audiencia pública oral y contradictoria.",
        actor: "Secretaría de la Sala Constitucional",
        documentName: "Notificacion_Convocatoria_Audiencia.pdf",
        fileSize: "620 KB",
      },
      {
        id: "act-22",
        date: "15 de Octubre, 2026",
        type: "Medida Cautelar Concedida",
        description: "Se dispone el levantamiento provisional de los sellos de clausura hasta resolver el fondo.",
        actor: "Juez Constitucional",
        documentName: "Resolucion_Medida_Cautelar_Urgente.pdf",
        fileSize: "1.4 MB",
      },
    ],
    internalNotes: [
      "La entidad demandada no notificó previamente el informe técnico; se vulneró el derecho a la defensa y al debido proceso (Art. 76 CRE).",
    ],
  },
];

export interface ChatMessage {
  id: string;
  sender: "client" | "lawyer";
  senderName: string;
  text: string;
  time: string;
  attachment?: {
    name: string;
    size: string;
  };
}

export const initialMessages: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "lawyer",
    senderName: "Dra. Valeria Santamaría",
    text: "Estimado Roberto, le notifico que el Juzgado Civil emitió hoy una providencia dándonos 3 días de término. Ya nuestro equipo de VIS LEGAL está estructurando el escrito de contestación.",
    time: "08:45 AM",
    attachment: {
      name: "Providencia_Notificada_Auto.pdf",
      size: "840 KB",
    },
  },
  {
    id: "msg-2",
    sender: "client",
    senderName: "Roberto Andrade",
    text: "Excelente Dra. Santamaría, ¿requiere que le envíe la copia actualizada del nombramiento o ya cuentan con ella en el expediente digital?",
    time: "09:12 AM",
  },
  {
    id: "msg-3",
    sender: "lawyer",
    senderName: "Dra. Valeria Santamaría",
    text: "La tenemos completa y verificada en el expediente digital. Todo bajo control, le mantendré informado del ingreso del escrito.",
    time: "09:15 AM",
  },
];

export interface PremiumTraining {
  id: string;
  title: string;
  date: string;
  duration: string;
  category: "Prevención" | "Contratos" | "Laboral" | "Patrimonio";
  instructor: string;
  status: "En vivo" | "Grabada";
  checklistUrl: string;
}

export const premiumTrainings: PremiumTraining[] = [
  {
    id: "trn-1",
    title: "Blindaje de Contratos de Arrendamiento Comercial y Vivienda 2026",
    date: "Jueves 31 de Octubre, 18:30",
    duration: "60 min",
    category: "Contratos",
    instructor: "Dra. Valeria Santamaría",
    status: "En vivo",
    checklistUrl: "Checklist_Arrendamiento_Seguro_2026.pdf",
  },
  {
    id: "trn-2",
    title: "Protocolo Patronal de Desvinculaciones y Prevención de Vistos Buenos",
    date: "15 de Octubre, 2026",
    duration: "75 min",
    category: "Laboral",
    instructor: "Abg. Marcelo Viteri",
    status: "Grabada",
    checklistUrl: "Guia_Calculo_Liquidaciones_Acta_Finiquito.pdf",
  },
  {
    id: "trn-3",
    title: "Estructuración Patrimonial Familiar y Herencias sin Litigio",
    date: "28 de Septiembre, 2026",
    duration: "50 min",
    category: "Patrimonio",
    instructor: "Abg. Diego Alarcón",
    status: "Grabada",
    checklistUrl: "Modelos_Testamento_y_Capitulaciones.pdf",
  },
];
