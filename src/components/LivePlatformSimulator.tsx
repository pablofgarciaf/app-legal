"use client";

import React, { useState } from "react";
import {
  Sparkles,
  UserCheck,
  Briefcase,
  FileCheck,
  Calendar,
  Clock,
  Download,
  CheckCircle2,
  Lock,
  ChevronRight,
  Filter,
  Terminal,
} from "lucide-react";
import { demoCases, judicialNotificationAIDemo, demoLeads, DemoCase } from "@/data/platformDemo";

export default function LivePlatformSimulator() {
  const [activeSimulatorTab, setActiveSimulatorTab] = useState<"ai-inbox" | "client" | "crm">("ai-inbox");
  const [selectedCase, setSelectedCase] = useState<DemoCase>(demoCases[0]);
  const [validatedAI, setValidatedAI] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownload = (docName: string) => {
    setDownloadNotice(`Simulación: Descargando ${docName} con firma electrónica y hash SHA-256...`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <section id="simulador" className="py-28 bg-navy-950 relative border-t border-white/[0.06] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-gold-500/30 text-xs font-semibold text-gold-400 mb-4 backdrop-blur-xl">
            <Terminal className="w-3.5 h-3.5" />
            <span>Entorno Operativo en Tiempo Real</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-silver-gradient tracking-tight">
            Experimenta el Ecosistema Digital
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Prueba cómo interactúan nuestros clientes con sus causas, cómo nuestro
            buzón con IA procesa notificaciones judiciales y cómo la firma gestiona los expedientes.
          </p>

          {/* Luxury Switcher Pill */}
          <div className="mt-10 inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-2xl">
            <button
              onClick={() => setActiveSimulatorTab("ai-inbox")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all active:scale-95 ${
                activeSimulatorTab === "ai-inbox"
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold shadow-gold-glow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Buzón Judicial con IA</span>
            </button>

            <button
              onClick={() => setActiveSimulatorTab("client")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all active:scale-95 ${
                activeSimulatorTab === "client"
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold shadow-gold-glow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Portal de Expediente</span>
            </button>

            <button
              onClick={() => setActiveSimulatorTab("crm")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all active:scale-95 ${
                activeSimulatorTab === "crm"
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold shadow-gold-glow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Panel CRM & Leads</span>
            </button>
          </div>
        </div>

        {/* Download Alert Notice */}
        {downloadNotice && (
          <div className="mb-6 max-w-xl mx-auto p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between shadow-2xl backdrop-blur-xl">
            <span className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{downloadNotice}</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">TLS 1.3</span>
          </div>
        )}

        {/* macOS Workstation Frame */}
        <div className="rounded-[32px] luxury-glass border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden">
          {/* macOS Title Bar */}
          <div className="px-6 py-4 border-b border-white/[0.08] bg-white/[0.03] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20"></div>
            </div>

            <div className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] font-mono text-slate-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>vis-legal-judicial-os.internal • v1.0.4</span>
            </div>

            <span className="text-[11px] text-slate-400 font-mono hidden sm:block">Servidor Seguro Cifrado</span>
          </div>

          {/* Workstation Content Body */}
          <div className="p-6 sm:p-10">
            {/* Tab 1: Buzón Judicial con IA */}
            {activeSimulatorTab === "ai-inbox" && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block font-bold">
                      Extracción Asistida por Inteligencia Jurídica
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-ivory-50 mt-1">
                      Auto Judicial Notificado en Casillero Electrónico
                    </h3>
                  </div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold self-start sm:self-auto">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                    <span>Análisis Instantáneo (1.4s)</span>
                  </div>
                </div>

                {/* Metadata cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-black/30 p-4 rounded-2xl border border-white/[0.06]">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Juzgado de Origen:</span>
                    <span className="text-slate-200 font-semibold">{judicialNotificationAIDemo.court}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Expediente Judicial:</span>
                    <span className="text-gold-400 font-mono font-bold">{judicialNotificationAIDemo.processNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Fecha de Citación:</span>
                    <span className="text-slate-200">{judicialNotificationAIDemo.receiptTimestamp}</span>
                  </div>
                </div>

                {/* AI Extracted Findings */}
                <div className="p-6 rounded-3xl bg-white/[0.03] border border-gold-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Sparkles className="w-5 h-5 text-gold-400" />
                      <span className="font-bold text-sm text-ivory-50">Extracción Estructurada por Modelo LLM</span>
                    </div>
                    <span className="text-xs px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                      {judicialNotificationAIDemo.aiClassification}
                    </span>
                  </div>

                  {/* Peremptory deadline pill */}
                  <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-between">
                    <div className="flex items-center space-x-3.5">
                      <Clock className="w-5 h-5 text-rose-400 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-rose-200">
                          Término Fatal Detectado: {judicialNotificationAIDemo.detectedDeadlineDays} DÍAS HÁBILES
                        </p>
                        <p className="text-[11px] text-rose-200/80">
                          Vencimiento procesal improrrogable: {judicialNotificationAIDemo.deadlineExpiration}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-rose-500/30 text-rose-200 font-bold uppercase tracking-wider">
                      Urgente
                    </span>
                  </div>

                  {/* Summary */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      Síntesis Jurídica de la Resolución:
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/[0.06]">
                      {judicialNotificationAIDemo.aiSummary}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider font-mono">
                      Línea de Acción Recomendada:
                    </span>
                    <p className="text-xs text-slate-300 bg-black/40 p-4 rounded-2xl border border-white/[0.06]">
                      {judicialNotificationAIDemo.suggestedAction}
                    </p>
                  </div>
                </div>

                {/* Validation Footer */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Principio Ético: Ningún escrito se radica sin firma del abogado patrocinador.</span>
                  </div>

                  <button
                    onClick={() => setValidatedAI(true)}
                    disabled={validatedAI}
                    className={`px-7 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all active:scale-95 ${
                      validatedAI
                        ? "bg-emerald-500 text-navy-950 cursor-default"
                        : "bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow-gold-glow hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{validatedAI ? "Validado por el Abogado Patrocinador" : "Aprobar & Agendar en Calendario"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Portal de Expediente */}
            {activeSimulatorTab === "client" && (
              <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Case selector sidebar (4 cols) */}
                <div className="lg:col-span-4 space-y-3">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-1">
                    Causas en Seguimiento Activo
                  </span>
                  {demoCases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCase(c)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all active:scale-95 ${
                        selectedCase.id === c.id
                          ? "bg-white/[0.08] border-gold-500/50 shadow-gold-glow-subtle"
                          : "bg-white/[0.02] border-white/[0.06] hover:border-white/20"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] mb-1.5">
                        <span className="font-mono text-gold-400 font-bold">{c.code}</span>
                        <span className="px-2 py-0.5 rounded-full bg-navy-800 text-slate-300 font-medium">
                          {c.status}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-ivory-50 line-clamp-2">{c.title}</p>
                      <p className="text-[10px] text-slate-400 mt-2">{c.area}</p>
                    </button>
                  ))}
                </div>

                {/* Case Detail View (8 cols) */}
                <div className="lg:col-span-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-2">
                    <div>
                      <span className="text-xs font-mono text-gold-400 font-bold">{selectedCase.code}</span>
                      <h3 className="font-serif text-xl font-bold text-ivory-50 mt-0.5">
                        {selectedCase.title}
                      </h3>
                    </div>
                    <span className="inline-flex self-start sm:self-auto text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                      {selectedCase.status}
                    </span>
                  </div>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Abogado Asignado:</span>
                      <span className="text-ivory-50 font-bold">{selectedCase.assignedLawyer}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Etapa Procesal:</span>
                      <span className="text-ivory-50 font-bold">{selectedCase.stage}</span>
                    </div>
                  </div>

                  {/* Next Event / Hearing */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-gold-500/30 flex items-start space-x-4">
                    <Calendar className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-ivory-50 block">Próxima Diligencia Judicial:</span>
                      <p className="text-slate-300 mt-1">{selectedCase.nextEventDescription}</p>
                      <p className="text-gold-400 font-mono text-[11px] mt-1 font-semibold">
                        Fecha y Hora: {selectedCase.nextEventDate}
                      </p>
                    </div>
                  </div>

                  {/* Downloadable Documents */}
                  <div>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3 font-mono">
                      Actuaciones y Providencias Certificadas ({selectedCase.documentsCount})
                    </span>
                    <div className="space-y-2">
                      <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                          <FileCheck className="w-4 h-4 text-gold-400" />
                          <div>
                            <p className="font-bold text-ivory-50">Demanda_Inicial_Calificada_Firma_Digital.pdf</p>
                            <p className="text-[10px] text-slate-400">Certificada por la Sala Civil • 2.4 MB</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload("Demanda_Inicial_Calificada.pdf")}
                          className="px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-gold-500 hover:text-navy-950 text-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-all active:scale-95"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Descargar</span>
                        </button>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                          <FileCheck className="w-4 h-4 text-gold-400" />
                          <div>
                            <p className="font-bold text-ivory-50">Auto_Sustanciacion_Termino_Prueba.pdf</p>
                            <p className="text-[10px] text-slate-400">Notificación oficial en casillero • 840 KB</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload("Auto_Sustanciacion_Termino_Prueba.pdf")}
                          className="px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-gold-500 hover:text-navy-950 text-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-all active:scale-95"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Descargar</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Restrict Note */}
                  <div className="p-3.5 rounded-2xl bg-black/50 border border-white/[0.06] text-[11px] text-slate-400 flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>Control de Secreto Profesional: Las notas estratégicas internas se encuentran blindadas.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: CRM Leads */}
            {activeSimulatorTab === "crm" && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block font-bold">
                      Embudo LegalTech CRM
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-ivory-50 mt-1">
                      Captación & Asignación Automatizada de Prospectos
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <Filter className="w-4 h-4 text-gold-400" />
                    <span>3 Solicitudes Nuevas en Cola</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {demoLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] hover:border-gold-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2.5">
                          <span className="font-bold text-ivory-50 text-sm">{lead.name}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/[0.08] text-slate-300">
                            {lead.area}
                          </span>
                        </div>
                        <div className="text-slate-400 flex items-center space-x-3 text-[11px]">
                          <span>{lead.phone}</span>
                          <span>•</span>
                          <span>{lead.email}</span>
                          <span>•</span>
                          <span>{lead.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                            lead.urgency === "Alta"
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          }`}
                        >
                          Urgencia {lead.urgency}
                        </span>

                        <span className="px-3.5 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30 font-semibold text-[11px]">
                          {lead.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 flex items-center justify-between">
                  <span>Conexión inmediata con formularios de asistencia jurídica y campañas activas.</span>
                  <span className="text-gold-400 font-bold cursor-pointer hover:underline">
                    Exportar Registro Completo →
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
