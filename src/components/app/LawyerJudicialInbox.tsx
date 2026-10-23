"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Clock,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Lock,
  Calendar,
  Download,
  ChevronRight,
  ShieldCheck,
  Send,
  Eye,
} from "lucide-react";
import { judicialNotificationAIDemo } from "@/data/platformDemo";

export default function LawyerJudicialInbox() {
  const [validated, setValidated] = useState(false);
  const [draftGenerated, setDraftGenerated] = useState(false);
  const [showFullDraft, setShowFullDraft] = useState(false);

  return (
    <div className="space-y-6 text-xs text-slate-200">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
            Buzón Judicial Electrónico • Consejo de la Judicatura (Module 9)
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            Gestión Inteligente de Providencias y Términos Fatales
          </h2>
          <p className="text-xs text-slate-400">
            Detección automática de providencias en casillero judicial con extracción de términos según Art. 73 COGEP.
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Casillero SATJE Conectado</span>
        </div>
      </div>

      {/* Main Notification Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-blue-400">
              Causa: {judicialNotificationAIDemo.processNumber}
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              {judicialNotificationAIDemo.court}
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 self-start sm:self-auto">
            {judicialNotificationAIDemo.aiClassification}
          </span>
        </div>

        {/* Critical Deadline Alert */}
        <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3.5">
            <Clock className="w-6 h-6 text-rose-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-rose-200">
                TÉRMINO FATAL COGEP: {judicialNotificationAIDemo.detectedDeadlineDays} DÍAS HÁBILES
              </p>
              <p className="text-[11px] text-rose-200/80">
                Vence el {judicialNotificationAIDemo.deadlineExpiration} a las 18:00 hrs (Días Hábiles Judiciales).
              </p>
            </div>
          </div>

          <button
            onClick={() => setValidated(true)}
            disabled={validated}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all self-start sm:self-auto active:scale-95 ${
              validated
                ? "bg-emerald-500 text-slate-950 cursor-default shadow-md"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {validated
                ? "Confirmado por Abogado (Agendado)"
                : "Validar y Agendar Término (Human-in-the-Loop)"}
            </span>
          </button>
        </div>

        {/* Summary extracted by AI */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Resumen Jurídico Generado por el Motor de IA:
          </span>
          <p className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed text-xs">
            {judicialNotificationAIDemo.aiSummary}
          </p>
        </div>

        {/* Action Strategy */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider block">
            Estrategia de Contestación Sugerida:
          </span>
          <p className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed text-xs">
            {judicialNotificationAIDemo.suggestedAction}
          </p>
        </div>

        {/* AI Governance Rule & Drafting */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div className="flex items-center space-x-2 text-[11px] text-slate-400">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Gobernanza de IA:</strong> Revisión humana obligatoria antes de computar términos procesales.
            </span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setDraftGenerated(true);
                setShowFullDraft(!showFullDraft);
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center space-x-1.5 active:scale-95"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>{showFullDraft ? "Ocultar Borrador" : "Generar Borrador Escrito"}</span>
            </button>
          </div>
        </div>

        {/* Full Draft Section */}
        {showFullDraft && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-blue-400 font-bold">
                Borrador de Escrito: Desahogo de Término • Art. 73 COGEP
              </span>
              <button
                onClick={() => alert("Minuta descargada en formato Word / PDF")}
                className="text-[11px] text-blue-400 hover:underline flex items-center space-x-1"
              >
                <Download className="w-3 h-3" />
                <span>Exportar .DOCX</span>
              </button>
            </div>
            <pre className="font-mono text-[11px] text-slate-300 bg-slate-900/90 p-4 rounded-xl whitespace-pre-wrap leading-relaxed border border-slate-800">
{`SEÑOR JUEZ DE LA UNIDAD JUDICIAL CIVIL CON SEDE EN EL DISTRITO METROPOLITANO DE QUITO, PROVINCIA DE PICHINCHA.

JUICIO No: 17203-2026-00891
ACTOR: ROBERTO ANDRADE SALAZAR
DEMANDADO: INMOBILIARIA ANDINA CIA. LTDA.

Abg. Diego Alarcón, dentro del término perentorio concedido en providencia de fecha 22 de octubre de 2026, comparezco y expongo:

1. Dando estricto cumplimiento a lo ordenado por su señoría, adjunto copia certificada del Certificado de Gravámenes conferido por el Registrador de la Propiedad del Cantón Quito, con lo cual se subsana la observación documental.
2. Sírvase tener por cumplido el requerimiento y señalar día y hora para la Audiencia Preliminar prevista en el Art. 294 del Código Orgánico General de Procesos.

Notificaciones que me correspondan las seguiré recibiendo en la casilla judicial electrónica No. 17182910-CJ.

FIRMO CONJUNTO A MI PATROCINADO,
Abg. Diego Alarcón - Mat. 17-2018-912 FA`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
