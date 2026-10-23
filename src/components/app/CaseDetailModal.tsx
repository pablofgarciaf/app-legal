"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Download,
  FileText,
  Lock,
  ShieldCheck,
  User,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { AppCase } from "@/data/appState";
import { UserRole } from "./MobileAppShell";

interface CaseDetailModalProps {
  caseItem: AppCase | null;
  role: UserRole;
  onClose: () => void;
  onOpenChat: () => void;
}

export default function CaseDetailModal({
  caseItem,
  role,
  onClose,
  onOpenChat,
}: CaseDetailModalProps) {
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  if (!caseItem) return null;

  const handleDownload = (docName: string) => {
    setDownloadMsg(`Descargando documento judicial certificado: ${docName}...`);
    setTimeout(() => setDownloadMsg(null), 3000);
  };

  const stages = [
    "Demanda Calificada",
    "Contestación",
    "Término de Prueba",
    "Audiencia Oral",
    "Sentencia",
  ];
  const currentStageIndex = 2; // Término de prueba

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-[32px] bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-blue-400">
                  {caseItem.code}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {caseItem.status}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                {caseItem.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all"
            aria-label="Cerrar expediente"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Download notification */}
        {downloadMsg && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{downloadMsg}</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 uppercase">
              Certificado AWS S3 OK
            </span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          {/* Stage Progress Bar */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
              Etapa Procesal Actual: {caseItem.stage}
            </span>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-center text-[9px] sm:text-[10px]">
              {stages.map((stg, idx) => (
                <div key={idx} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full ${
                      idx <= currentStageIndex
                        ? "bg-blue-500 shadow-md shadow-blue-500/30"
                        : "bg-slate-800"
                    }`}
                  ></div>
                  <span
                    className={
                      idx === currentStageIndex
                        ? "text-blue-400 font-bold"
                        : "text-slate-400"
                    }
                  >
                    {stg}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Lawyer Card */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                {caseItem.assignedLawyer.avatar}
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  {caseItem.assignedLawyer.name}
                </p>
                <p className="text-[11px] text-slate-400">
                  {caseItem.assignedLawyer.role}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenChat();
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] active:scale-95 shadow-md shadow-blue-600/30 transition-all"
            >
              Enviar Mensaje al Letrado
            </button>
          </div>

          {/* Next Hearing Date */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/30 flex items-start space-x-3.5">
            <Calendar className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-white text-xs block">
                Próxima Actuación Judicial en Calendario:
              </span>
              <p className="text-slate-200">
                {caseItem.nextHearing.date} a las {caseItem.nextHearing.time} (
                {caseItem.nextHearing.type})
              </p>
              <p className="text-[11px] text-slate-400">
                {caseItem.nextHearing.location}
              </p>
            </div>
          </div>

          {/* Judicial Acts Timeline */}
          <div>
            <h3 className="font-bold text-white text-sm mb-3">
              Historial de Actuaciones Procesales ({caseItem.acts.length})
            </h3>
            <div className="space-y-2.5">
              {caseItem.acts.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono text-blue-400 font-bold">
                        {act.date}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {act.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {act.description}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Actor: {act.actor}
                    </p>
                  </div>

                  {act.documentName && (
                    <button
                      onClick={() => handleDownload(act.documentName!)}
                      className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-200 text-[11px] font-bold border border-slate-700 flex items-center space-x-1.5 shrink-0 active:scale-95 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{act.fileSize}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Internal Notes: Strict Privacy Rule (Module 3 Spec) */}
          {role === "abogado" || role === "admin" ? (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <Lock className="w-4 h-4" />
                <span>
                  Notas Internas de Estrategia Jurídica (Confidencial • Solo Abogado/Admin)
                </span>
              </div>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300 text-xs">
                {caseItem.internalNotes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-2">
              <Lock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>
                <strong>Privacidad RLS:</strong> Las notas y estrategias internas del equipo litigante se encuentran blindadas en base de datos.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
