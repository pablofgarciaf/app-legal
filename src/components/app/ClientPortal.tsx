"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Clock,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  FileText,
  Download,
  Phone,
  MessageCircle,
  Video,
  AlertTriangle,
  User,
  ArrowRight,
  Share2,
  FolderKanban,
  Eye,
  Check,
  Search,
} from "lucide-react";
import { initialCases, AppCase, JudicialAct } from "@/data/appState";

interface ClientPortalProps {
  onOpenConsultation: () => void;
  onOpenChat: () => void;
  onSelectCase: (c: AppCase) => void;
  subscriptionTier: "gratis" | "premium";
}

export default function ClientPortal({
  onOpenConsultation,
  onOpenChat,
  onSelectCase,
  subscriptionTier,
}: ClientPortalProps) {
  // Primary active case for the client (Juicio Ordinario)
  const primaryCase = initialCases[0];
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedDocPreview, setSelectedDocPreview] = useState<JudicialAct | null>(null);

  // Quick action: simulated download
  const handleDownload = (docName: string) => {
    setDownloadSuccess(docName);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Human-friendly AI explanations for acts
  const aiExplanations: Record<string, { summary: string; nextStep: string; impact: string }> = {
    "act-1": {
      summary:
        "El Juez te notificó que la contraparte presentó argumentos de defensa. Ahora nuestro equipo tiene 3 días hábiles para responder y defender tu postura legal.",
      nextStep: "Nuestra abogada Dra. Valeria ya redactó la contestación y la radicará antes del término fatal.",
      impact: "Trámite normal del juicio • Tu reclamo continúa firme",
    },
    "act-2": {
      summary:
        "Ingresamos formalmente todas las facturas, contratos y cheques al expediente judicial para respaldar cada dólar reclamado.",
      nextStep: "El juzgado revisará la documentación para ordenar el peritaje oficial.",
      impact: "Prueba 100% incorporada al expediente",
    },
    "act-3": {
      summary:
        "El juez verificó que tu demanda cumple con todos los requisitos del COGEP y admitió a trámite el caso en la Unidad Judicial Civil de Quito.",
      nextStep: "Se citó formalmente a la empresa demandada.",
      impact: "Juicio iniciado exitosamente",
    },
  };

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. TARJETA PRINCIPAL DE ESTADO DE CAUSA (ESTILO INSPECTION FIELD CARD) */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/70 border border-blue-500/30 p-5 sm:p-7 shadow-2xl backdrop-blur-md">
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 uppercase tracking-wider">
                Expediente Activo Principal
              </span>
              <span className="font-mono text-xs text-slate-300 font-bold bg-slate-800/80 px-2.5 py-0.5 rounded-lg border border-slate-700/60">
                {primaryCase.code}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{primaryCase.status}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {primaryCase.title}
            </h2>

            <p className="text-xs text-slate-300 flex items-center space-x-1.5">
              <span className="text-slate-400">Juzgado:</span>
              <span className="text-white font-medium">{primaryCase.court}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 active:scale-95 transition-all text-xs flex items-center gap-1.5"
              title="Compartir o copiar enlace del caso"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? "Copiado" : "Compartir"}</span>
            </button>

            <button
              onClick={() => onSelectCase(primaryCase)}
              className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center space-x-1.5 active:scale-95 transition-all"
            >
              <span>Ver Expediente Completo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Barra de Progreso Visual de Etapas Procesales COGEP */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Progreso Procesal del Caso:</span>
            <span className="font-mono text-blue-400 font-bold">Fase 3 de 5 (60% completado)</span>
          </div>

          {/* Stepper bar */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {[
              { num: 1, label: "Calificación", status: "completed" },
              { num: 2, label: "Citación", status: "completed" },
              { num: 3, label: "Término Prueba", status: "active" },
              { num: 4, label: "Audiencia", status: "pending" },
              { num: 5, label: "Sentencia", status: "pending" },
            ].map((step) => (
              <div key={step.num} className="space-y-1.5">
                <div
                  className={`h-2 rounded-full transition-all ${
                    step.status === "completed"
                      ? "bg-emerald-500 shadow-sm shadow-emerald-500/50"
                      : step.status === "active"
                      ? "bg-blue-500 shadow-md shadow-blue-500/50 animate-pulse"
                      : "bg-slate-800"
                  }`}
                />
                <p
                  className={`text-[10px] font-mono text-center truncate ${
                    step.status === "completed"
                      ? "text-emerald-400 font-semibold"
                      : step.status === "active"
                      ? "text-blue-300 font-bold"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>

          {/* Próximo Hito / Siguiente Evento */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  Próximo Hito Procesal
                </span>
                <p className="text-xs sm:text-sm font-bold text-white">
                  {primaryCase.nextHearing.date} • {primaryCase.nextHearing.time}
                </p>
                <p className="text-[11px] text-slate-400">{primaryCase.nextHearing.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 self-start sm:self-auto">
              <span className="px-3 py-1 rounded-xl bg-blue-500/15 text-blue-300 border border-blue-500/30 text-xs font-semibold">
                Modalidad {primaryCase.nextHearing.type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CONTACTO RÁPIDO 1 A 1 CON TU ABOGADO ASIGNADO */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-serif font-black flex items-center justify-center text-base shadow-lg shadow-blue-600/30 ring-2 ring-blue-400/30">
              {primaryCase.assignedLawyer.avatar}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base text-white">{primaryCase.assignedLawyer.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  En línea
                </span>
              </div>
              <p className="text-xs text-slate-400">{primaryCase.assignedLawyer.role}</p>
            </div>
          </div>

          <div className="text-left sm:text-right text-[11px] text-slate-400 font-mono">
            <span>Matrícula Foro de Abogados CJ</span>
            <p className="text-white font-semibold">Reg. 17-2015-842 Pichincha</p>
          </div>
        </div>

        {/* 3 Botones Táctiles de Contacto Rápido */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <a
            href="https://wa.me/593998765432?text=Estimada%20Dra.%20Valeria%20Santamaria,%20le%20escribo%20desde%20mi%20portal%20VIS%20Legal%20sobre%20el%20expediente%2017230-2026-00891."
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-sm min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Directo 1-a-1</span>
          </a>

          <a
            href="tel:+593998765432"
            className="p-3 rounded-2xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/40 text-blue-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-sm min-h-[44px]"
          >
            <Phone className="w-4 h-4 text-blue-400" />
            <span>Llamar al Despacho</span>
          </a>

          <button
            onClick={onOpenConsultation}
            className="p-3 rounded-2xl bg-amber-600/15 hover:bg-amber-600/25 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-sm min-h-[44px]"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Agendar Cita Privada</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FEED DE ACTUALIZACIONES RECIENTES EXPLICADAS POR IA EN LENGUAJE CLARO */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-base sm:text-lg text-white">
              Actualizaciones Recientes Explicadas con IA
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Lenguaje Claro Ciudadano
          </span>
        </div>

        <div className="space-y-3">
          {primaryCase.acts.map((act) => {
            const explanation = aiExplanations[act.id] || {
              summary: act.description,
              nextStep: "El equipo jurídico monitorea el casillero electrónico.",
              impact: "En revisión de sustanciación",
            };

            return (
              <div
                key={act.id}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3 shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2.5 border-b border-slate-800/80">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-xs font-bold text-white">{act.type}</span>
                    <span className="text-[10px] font-mono text-slate-400">• {act.date}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Emisor: {act.actor}</span>
                </div>

                {/* Explicación IA en lenguaje sencillo */}
                <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/20 space-y-2">
                  <div className="flex items-center space-x-1.5 text-blue-400 text-[11px] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>¿Qué significa esto para ti?</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-light">
                    {explanation.summary}
                  </p>

                  <div className="pt-2 border-t border-blue-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                    <div className="text-slate-300">
                      <span className="text-slate-500">Próximo paso letrado: </span>
                      <strong className="text-blue-200">{explanation.nextStep}</strong>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 self-start sm:self-auto">
                      {explanation.impact}
                    </span>
                  </div>
                </div>

                {/* Documento adjunto si existe */}
                {act.documentName && (
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span className="font-mono text-[11px] truncate max-w-xs">{act.documentName}</span>
                      <span className="text-slate-500 text-[10px]">({act.fileSize})</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedDocPreview(act)}
                        className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold flex items-center space-x-1 active:scale-95 transition-all"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Previsualizar</span>
                      </button>

                      <button
                        onClick={() => handleDownload(act.documentName!)}
                        className="p-1.5 px-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-[11px] font-semibold flex items-center space-x-1 active:scale-95 transition-all"
                      >
                        <Download className="w-3 h-3" />
                        <span>Descargar</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. DOCUMENTOS COMPARTIDOS CON VISTA PREVIA Y DESCARGA */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-base sm:text-lg text-white">Documentos del Expediente</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">3 Archivos Certificados</span>
        </div>

        {downloadSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Descarga iniciada para: <strong>{downloadSuccess}</strong> (Copia auténtica judicial).</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {primaryCase.acts
            .filter((a) => a.documentName)
            .map((a) => (
              <div
                key={a.id}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono font-bold">
                      PDF Judicial
                    </span>
                    <span className="text-slate-400">{a.fileSize}</span>
                  </div>
                  <h4 className="font-semibold text-xs text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                    {a.documentName}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">Emisor: {a.actor}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedDocPreview(a)}
                    className="text-slate-300 hover:text-white text-[11px] font-semibold flex items-center space-x-1 active:scale-95 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    <span>Ver</span>
                  </button>

                  <button
                    onClick={() => handleDownload(a.documentName!)}
                    className="text-blue-400 hover:text-blue-300 text-[11px] font-bold flex items-center space-x-1 active:scale-95 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Bajar</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modal de Previsualización de Documento */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-xl w-full rounded-3xl bg-slate-900 border border-blue-500/30 p-6 space-y-4 text-left relative shadow-2xl">
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold block">
                  Copia Digital Certificada
                </span>
                <h4 className="font-bold text-base text-white">{selectedDocPreview.documentName}</h4>
                <p className="text-xs text-slate-400">Emisor: {selectedDocPreview.actor} • {selectedDocPreview.date}</p>
              </div>
              <button
                onClick={() => setSelectedDocPreview(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs text-slate-300 max-h-60 overflow-y-auto">
              <p className="text-slate-400 text-[11px]">// Sello digital de la Función Judicial del Ecuador</p>
              <p className="text-white font-bold">EXPEDIENTE: 17230-2026-00891</p>
              <p className="leading-relaxed text-slate-300">
                "{selectedDocPreview.description}"
              </p>
              <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-[11px] text-blue-300 font-sans">
                <strong>Análisis Automatizado:</strong> Documento sellado y validado en la plataforma SATJE.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedDocPreview(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  handleDownload(selectedDocPreview.documentName!);
                  setSelectedDocPreview(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
