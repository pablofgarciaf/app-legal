"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Clock,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Calendar,
  ChevronRight,
  ShieldAlert,
  Send,
  Eye,
  PlusCircle,
  Save,
  Check,
  Scale,
  MessageSquare,
  FileEdit,
  Activity,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { initialCases, AppCase } from "@/data/appState";
import { judicialNotificationAIDemo } from "@/data/platformDemo";

interface LawyerFieldPanelProps {
  onSelectCase: (c: AppCase) => void;
  onOpenConsultation: () => void;
}

export default function LawyerFieldPanel({
  onSelectCase,
  onOpenConsultation,
}: LawyerFieldPanelProps) {
  // 1. Semaforo de plazos (Urgente, En termino, Notificado)
  const [filterPriority, setFilterPriority] = useState<"todos" | "urgente" | "termino" | "notificado">("todos");

  // 2. Lector de providencias con analisis IA
  const [validatedProvidencia, setValidatedProvidencia] = useState(false);
  const [draftGenerated, setDraftGenerated] = useState(false);
  const [showFullDraft, setShowFullDraft] = useState(false);

  // 3. Registro rápido de diligencias / actuaciones con guardado de notas
  const [diligenceType, setDiligenceType] = useState("Escrito de Impulso");
  const [diligenceCaseCode, setDiligenceCaseCode] = useState("17230-2026-00891");
  const [diligenceNote, setDiligenceNote] = useState("");
  const [savedNotes, setSavedNotes] = useState<Array<{ id: string; time: string; caseCode: string; type: string; text: string }>>([
    {
      id: "note-1",
      time: "Hoy 10:15 AM",
      caseCode: "17230-2026-00891",
      type: "Reunión Pericial",
      text: "Conferencia telefónica con perito Ing. Alvear. Confirma entrega del borrador de peritaje contable para el 30 de Octubre.",
    },
    {
      id: "note-2",
      time: "Ayer 16:30 PM",
      caseCode: "09201-2026-01452",
      type: "Revisión de Casillero",
      text: "Se verificó sorteo de Sala de la Corte Provincial. Ponente Dr. M. Villacís sin observaciones de inhibición.",
    },
  ]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveDiligence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diligenceNote.trim()) return;

    const newNote = {
      id: `note-${Date.now()}`,
      time: "Ahora",
      caseCode: diligenceCaseCode,
      type: diligenceType,
      text: diligenceNote.trim(),
    };

    setSavedNotes([newNote, ...savedNotes]);
    setDiligenceNote("");
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Expedientes con semaforo procesal
  const docketCases = [
    {
      caseRef: initialCases[0],
      trafficLight: "urgente" as const, // Vence en 3 dias
      badgeLabel: "Urgente • Vence 28 Oct",
      badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/30",
      dotColor: "bg-rose-500",
      termDays: "3 Días COGEP",
      actionNeeded: "Contestar excepción previa de incompetencia",
    },
    {
      caseRef: initialCases[1],
      trafficLight: "termino" as const, // En termino de preparacion audiencia
      badgeLabel: "En Término • 29 Oct",
      badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      dotColor: "bg-amber-500",
      termDays: "Audiencia Oral",
      actionNeeded: "Alegato oral de sustanciación en Sala Constitucional",
    },
    {
      caseRef: {
        id: "case-03",
        code: "17371-2026-00318",
        title: "Controversia Laboral por Despido Intempestivo y Finiquito",
        area: "Derecho Laboral",
        court: "Unidad Judicial de Trabajo de Pichincha",
        clientName: "Sra. Carmen Salazar",
        assignedLawyer: {
          name: "Abg. Diego Alarcón",
          role: "Especialista Litigio",
          avatar: "DA",
          phone: "+593 98 765 4321",
        },
        status: "En trámite" as const,
        stage: "Notificación de Auto Inicial",
        nextHearing: {
          date: "12 de Noviembre, 2026",
          time: "11:00 AM",
          type: "Telemática" as const,
          location: "Sala Virtual Zoom CJ",
        },
        acts: [],
        internalNotes: [],
      },
      trafficLight: "notificado" as const,
      badgeLabel: "Notificado • Sin Plazo Activo",
      badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      dotColor: "bg-emerald-500",
      termDays: "Término General",
      actionNeeded: "Citación a la empresa empleadora en trámite",
    },
  ];

  const filteredDocket = docketCases.filter((item) => {
    if (filterPriority === "todos") return true;
    return item.trafficLight === filterPriority;
  });

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* CABECERA: PANEL JUDICIAL DE CAMPO */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900 border border-amber-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                Consola Profesional de Litigio • Consejo de la Judicatura
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Panel Judicial de Campo & Despacho
            </h2>
            <p className="text-xs text-slate-300">
              Operación pericial en juzgados, control de términos COGEP/COIP y bitácora de actuaciones procesales en tiempo real.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1.5 rounded-2xl bg-slate-800 border border-slate-700 text-xs font-mono text-emerald-400 font-bold flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SATJE Activo</span>
            </span>
          </div>
        </div>

        {/* Resumen Operativo de Hoy */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-rose-500/30">
            <span className="text-[10px] font-mono uppercase text-rose-300 font-bold block">
              Plazos Fatales
            </span>
            <p className="text-2xl font-bold text-rose-400 mt-0.5">1 Urgente</p>
            <p className="text-[11px] text-slate-400">Vence en 3 días</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30">
            <span className="text-[10px] font-mono uppercase text-amber-300 font-bold block">
              Audiencias
            </span>
            <p className="text-2xl font-bold text-amber-400 mt-0.5">1 en 6 Días</p>
            <p className="text-[11px] text-slate-400">Oral Constitucional</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-blue-500/30">
            <span className="text-[10px] font-mono uppercase text-blue-300 font-bold block">
              Expedientes
            </span>
            <p className="text-2xl font-bold text-white mt-0.5">3 Activos</p>
            <p className="text-[11px] text-slate-400">Pichincha y Guayas</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/30">
            <span className="text-[10px] font-mono uppercase text-emerald-300 font-bold block">
              IA Asistente
            </span>
            <p className="text-2xl font-bold text-emerald-400 mt-0.5">Gemini 1.5</p>
            <p className="text-[11px] text-slate-400">Análisis y borradores</p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. EXPEDIENTES CON SEMÁFORO DE PLAZOS */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base sm:text-lg text-white">
              Expedientes Asignados & Semáforo Procesal
            </h3>
          </div>

          {/* Filtros de Semáforo */}
          <div className="flex items-center space-x-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <button
              onClick={() => setFilterPriority("todos")}
              className={`px-3 py-1 rounded-xl transition-all font-semibold ${
                filterPriority === "todos" ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              Todos (3)
            </button>
            <button
              onClick={() => setFilterPriority("urgente")}
              className={`px-3 py-1 rounded-xl transition-all font-semibold flex items-center space-x-1.5 ${
                filterPriority === "urgente" ? "bg-rose-600 text-white font-bold" : "text-rose-400 hover:text-rose-300"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Urgente</span>
            </button>
            <button
              onClick={() => setFilterPriority("termino")}
              className={`px-3 py-1 rounded-xl transition-all font-semibold flex items-center space-x-1.5 ${
                filterPriority === "termino" ? "bg-amber-600 text-white font-bold" : "text-amber-400 hover:text-amber-300"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>En Término</span>
            </button>
            <button
              onClick={() => setFilterPriority("notificado")}
              className={`px-3 py-1 rounded-xl transition-all font-semibold flex items-center space-x-1.5 ${
                filterPriority === "notificado" ? "bg-emerald-600 text-white font-bold" : "text-emerald-400 hover:text-emerald-300"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Notificado</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredDocket.map((item) => (
            <div
              key={item.caseRef.id}
              onClick={() => onSelectCase(item.caseRef)}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all space-y-3 shadow-md group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.dotColor} animate-pulse`} />
                  <span className="font-mono text-xs font-bold text-white">{item.caseRef.code}</span>
                  <span className="text-xs text-slate-400">• {item.caseRef.area}</span>
                </div>

                <span className={`px-3 py-0.5 rounded-full text-[11px] font-bold border ${item.badgeColor} self-start sm:self-auto`}>
                  {item.badgeLabel}
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.caseRef.title}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">{item.caseRef.court}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] font-mono uppercase block">
                    Actuación Procesal Requerida:
                  </span>
                  <span className="text-amber-200 font-semibold">{item.actionNeeded}</span>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-slate-400 self-end sm:self-auto shrink-0">
                  <span>Cliente: <strong className="text-white">{item.caseRef.clientName}</strong></span>
                  <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. LECTOR DE PROVIDENCIAS JUDICIALES CON ANÁLISIS IA */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider block">
                Casillero SATJE • Providencia Recibida Hoy
              </span>
              <h3 className="font-bold text-lg text-white">
                Lector de Providencias Judiciales con Análisis IA
              </h3>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 self-start sm:self-auto">
            {judicialNotificationAIDemo.aiClassification}
          </span>
        </div>

        {/* Datos Clave de la Notificación */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Juicio / Causa</span>
            <span className="text-white font-mono font-bold text-xs">{judicialNotificationAIDemo.processNumber}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-mono block">Recepción</span>
            <span className="text-white font-bold text-xs">{judicialNotificationAIDemo.receiptTimestamp}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-rose-500/30">
            <span className="text-rose-400 text-[10px] uppercase font-mono font-bold block">Término Fatal COGEP</span>
            <span className="text-rose-300 font-bold text-xs">{judicialNotificationAIDemo.deadlineExpiration}</span>
          </div>
        </div>

        {/* Resumen Sintético IA */}
        <div className="space-y-2">
          <div className="flex items-center space-x-1.5 text-blue-400 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Resumen Sintético Generado por Gemini Legal:</span>
          </div>
          <p className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed">
            "{judicialNotificationAIDemo.aiSummary}"
          </p>
        </div>

        {/* Sugerencia de Actuación Procesal */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs">
          <div className="flex items-center space-x-1.5 text-amber-300 font-bold">
            <Scale className="w-4 h-4" />
            <span>Sugerencia de Actuación Procesal:</span>
          </div>
          <p className="text-amber-100/90 leading-relaxed">
            {judicialNotificationAIDemo.suggestedAction}
          </p>
        </div>

        {/* Acciones de Lector: Validar & Generar Borrador */}
        <div className="pt-2 flex flex-wrap gap-2.5">
          <button
            onClick={() => setValidatedProvidencia(true)}
            disabled={validatedProvidencia}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center space-x-2 transition-all active:scale-95 ${
              validatedProvidencia
                ? "bg-emerald-500 text-slate-950 cursor-default"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {validatedProvidencia
                ? "Providencia Validada por Abogado"
                : "Validar y Agendar Término (Human-in-the-Loop)"}
            </span>
          </button>

          <button
            onClick={() => setDraftGenerated(true)}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs flex items-center space-x-2 transition-all active:scale-95"
          >
            <FileEdit className="w-4 h-4 text-blue-400" />
            <span>{draftGenerated ? "Borrador Generado" : "Generar Escrito de Contestación"}</span>
          </button>
        </div>

        {draftGenerated && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-3 text-xs animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-mono text-blue-400 font-bold">
                Borrador Automático: contestacion_excepciones_17230.docx
              </span>
              <button
                onClick={() => setShowFullDraft(!showFullDraft)}
                className="text-xs text-blue-400 hover:underline font-semibold"
              >
                {showFullDraft ? "Ocultar texto" : "Ver texto completo"}
              </button>
            </div>

            <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
              SEÑOR JUEZ DE LA UNIDAD JUDICIAL CIVIL CON SEDE EN EL CANTÓN QUITO... comparezco y contesto la excepción de incompetencia...
            </p>

            {showFullDraft && (
              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-[10px] text-slate-400 space-y-2">
                <p>1. La competencia territorial quedó fijada expresamente en la Cláusula Vigésima Segunda del contrato matriz.</p>
                <p>2. Por tanto, solicito se rechace de plano la excepción dilatoria deducida por la parte demandada y se continúe con la fase de evacuación de prueba pericial.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. REGISTRO RÁPIDO DE DILIGENCIAS / ACTUACIONES CON NOTAS */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
              <FileEdit className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                Bitácora Móvil de Campo
              </span>
              <h3 className="font-bold text-lg text-white">
                Registro Rápido de Diligencias & Notas Privadas
              </h3>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">Cifrado AES-256</span>
        </div>

        {saveSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Diligencia registrada y guardada en el expediente judicial de forma segura.</span>
          </div>
        )}

        <form onSubmit={handleSaveDiligence} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Causa Procesal</label>
              <select
                value={diligenceCaseCode}
                onChange={(e) => setDiligenceCaseCode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="17230-2026-00891">#17230-2026-00891 • Juicio Ordinario Civil</option>
                <option value="09201-2026-01452">#09201-2026-01452 • Acción de Protección</option>
                <option value="17371-2026-00318">#17371-2026-00318 • Sumario Laboral</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Tipo de Actuación / Diligencia</label>
              <select
                value={diligenceType}
                onChange={(e) => setDiligenceType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="Reunión Pericial">Reunión con Perito Judicial</option>
                <option value="Revisión de Casillero">Revisión Física en Unidad Judicial</option>
                <option value="Escrito de Impulso">Escrito de Impulso Procesal</option>
                <option value="Llamada Cliente">Conferencia con Cliente Patrocinado</option>
                <option value="Acta de Mediación">Acuerdo Previo / Mediación</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Nota / Observaciones de la Diligencia (Uso interno confidencial)
            </label>
            <textarea
              rows={3}
              value={diligenceNote}
              onChange={(e) => setDiligenceNote(e.target.value)}
              placeholder="Ej. Se acudió a la Secretaría de la Sala Civil. El perito acreditó su informe. Se solicitó copia simple del folio 84..."
              className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-amber-600/30 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Actuación en Bitácora</span>
            </button>
          </div>
        </form>

        {/* Historial de Notas Recientes de Campo */}
        <div className="space-y-3 pt-3 border-t border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Actuaciones Recientes en este Dispositivo:
          </span>

          <div className="space-y-2.5">
            {savedNotes.map((note) => (
              <div
                key={note.id}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs"
              >
                <div className="flex justify-between items-center text-[11px]">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 font-semibold text-[10px]">
                      {note.type}
                    </span>
                    <span className="font-mono text-slate-300 font-bold">{note.caseCode}</span>
                  </div>
                  <span className="text-slate-500 text-[10px] font-mono">{note.time}</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-light">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. AGENDA DE AUDIENCIAS CON CUENTA REGRESIVA */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider block">
                Términos y Audiencias
              </span>
              <h3 className="font-bold text-lg text-white">
                Agenda Judicial con Cuenta Regresiva
              </h3>
            </div>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-1 active:scale-95 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Nueva Cita</span>
          </button>
        </div>

        <div className="space-y-3">
          {/* Item 1: Vencimiento perentorio 3 dias */}
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start sm:items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-rose-200">Vencimiento Término Excepciones COGEP</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-500 text-white">
                    Fatal
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Causa #17230-2026-00891 • Unidad Judicial Civil de Quito
                </p>
                <p className="text-rose-300 font-mono text-[10px] mt-0.5">
                  Fecha límite: 28 de Octubre, 18:00 hrs
                </p>
              </div>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center space-x-2 self-start sm:self-auto">
              <div className="text-center px-3 py-1.5 rounded-xl bg-rose-950/80 border border-rose-500/40">
                <span className="text-sm font-black text-rose-300 font-mono block">02d 14h</span>
                <span className="text-[9px] text-rose-400 font-mono uppercase">Cuenta regresiva</span>
              </div>
            </div>
          </div>

          {/* Item 2: Audiencia oral 29 Oct */}
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start sm:items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white">Audiencia Oral de Sustanciación Constitucional</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Telemática
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Acción de Protección #09201-2026-01452 • Sala de lo Penal de Guayas
                </p>
                <p className="text-blue-300 font-mono text-[10px] mt-0.5">
                  Jueves 29 de Octubre, 09:00 AM (Sala Zoom #4 CJ)
                </p>
              </div>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center space-x-2 self-start sm:self-auto">
              <div className="text-center px-3 py-1.5 rounded-xl bg-slate-950 border border-blue-500/40">
                <span className="text-sm font-black text-blue-300 font-mono block">06d 04h</span>
                <span className="text-[9px] text-blue-400 font-mono uppercase">Cuenta regresiva</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
