"use client";

import React, { useState } from "react";
import {
  FolderOpen,
  Calendar,
  MessageSquare,
  Sparkles,
  Clock,
  Shield,
  FileText,
  Video,
  Download,
  PlusCircle,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Play,
} from "lucide-react";
import { initialCases, premiumTrainings, AppCase } from "@/data/appState";
import CaseDetailModal from "./CaseDetailModal";
import ChatInterface from "./ChatInterface";

interface ClientViewProps {
  onOpenConsultation: () => void;
}

export default function ClientView({ onOpenConsultation }: ClientViewProps) {
  const [activeTab, setActiveTab] = useState<"inicio" | "casos" | "chat" | "agenda" | "premium">("inicio");
  const [selectedCase, setSelectedCase] = useState<AppCase | null>(null);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("2026-11-05");
  const [appointmentType, setAppointmentType] = useState<"Telemática" | "Presencial">("Telemática");

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentBooked(true);
    setTimeout(() => setAppointmentBooked(false), 4500);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Client View Header */}
      <div className="p-4 sm:p-5 rounded-3xl luxury-glass border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-champagne-400 to-champagne-600 text-slate-950 font-serif font-black flex items-center justify-center text-lg shadow-gold-glow-subtle">
            RA
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-bold text-base text-ivory-50">Roberto Andrade</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-champagne-500/20 text-champagne-400 border border-champagne-500/30">
                Miembro Fundador
              </span>
            </div>
            <p className="text-xs text-slate-400">Cliente Verificado • C.I. 1714589210</p>
          </div>
        </div>

        {/* Client Subnavigation Tabs */}
        <div className="flex items-center space-x-1 p-1 rounded-full bg-slate-950/80 border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab("inicio")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
              activeTab === "inicio" ? "bg-champagne-500 text-white shadow-gold-glow-subtle font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setActiveTab("casos")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
              activeTab === "casos" ? "bg-champagne-500 text-white shadow-gold-glow-subtle font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Mis Casos (2)
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 flex items-center space-x-1.5 ${
              activeTab === "chat" ? "bg-champagne-500 text-white shadow-gold-glow-subtle font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <span>Chat Abogado</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </button>
          <button
            onClick={() => setActiveTab("agenda")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
              activeTab === "agenda" ? "bg-champagne-500 text-white shadow-gold-glow-subtle font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Citas & Agenda
          </button>
          <button
            onClick={() => setActiveTab("premium")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 flex items-center space-x-1 ${
              activeTab === "premium" ? "bg-champagne-500 text-white shadow-gold-glow-subtle font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3 h-3 text-champagne-400" />
            <span>Talleres Premium</span>
          </button>
        </div>
      </div>

      {/* Main Tab Views */}
      <div className="flex-1">
        {/* TAB 1: INICIO */}
        {activeTab === "inicio" && (
          <div className="space-y-4">
            {/* Urgent / Next Hearing Hero Card */}
            <div className="p-6 rounded-3xl luxury-glass-gold flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-400 font-bold block">
                  Próxima Actuación Judicial Confirmada
                </span>
                <h3 className="font-serif text-xl font-bold text-ivory-50">
                  Audiencia Oral en Sala de lo Constitucional
                </h3>
                <p className="text-xs text-slate-300">
                  Acción de Protección #09201-2026-01452 • Jueves 29 de Octubre, 09:00 AM
                </p>
                <div className="pt-2 flex items-center space-x-2 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Abogado patrocinador: Abg. Diego Alarcón preparado para alegato oral.</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCase(initialCases[1])}
                className="px-5 py-2.5 rounded-full bg-champagne-500 hover:bg-champagne-400 text-white font-bold text-xs shadow-gold-glow active:scale-95 transition-all flex items-center space-x-2 self-start sm:self-auto"
              >
                <span>Ver Ficha del Caso</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => setActiveTab("casos")}
                className="p-4 rounded-2xl luxury-glass border border-white/[0.06] hover:border-champagne-500/40 cursor-pointer transition-all"
              >
                <span className="text-[10px] font-mono uppercase text-slate-400">Expedientes en Trámite</span>
                <p className="text-2xl font-serif font-bold text-champagne-400 mt-1">2 Causas</p>
                <p className="text-[11px] text-slate-300 mt-0.5">Civil y Constitucional</p>
              </div>

              <div
                onClick={() => setActiveTab("chat")}
                className="p-4 rounded-2xl luxury-glass border border-white/[0.06] hover:border-champagne-500/40 cursor-pointer transition-all"
              >
                <span className="text-[10px] font-mono uppercase text-slate-400">Mensajes del Letrado</span>
                <p className="text-2xl font-serif font-bold text-emerald-400 mt-1">1 Nuevo</p>
                <p className="text-[11px] text-slate-300 mt-0.5">Dra. Valeria Santamaría</p>
              </div>

              <div
                onClick={() => setActiveTab("premium")}
                className="p-4 rounded-2xl luxury-glass border border-white/[0.06] hover:border-champagne-500/40 cursor-pointer transition-all"
              >
                <span className="text-[10px] font-mono uppercase text-slate-400">Taller del Mes en Vivo</span>
                <p className="text-sm font-serif font-bold text-ivory-50 mt-1">Blindaje de Arriendos</p>
                <p className="text-[11px] text-champagne-400 mt-0.5">31 Octubre • 18:30</p>
              </div>
            </div>

            {/* Cases List Overview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-ivory-50">Tus Expedientes Judiciales</h3>
                <button
                  onClick={onOpenConsultation}
                  className="text-xs text-champagne-400 hover:text-champagne-300 font-semibold flex items-center space-x-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Solicitar Nueva Causa</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {initialCases.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCase(c)}
                    className="p-5 rounded-3xl luxury-glass border border-white/[0.08] hover:luxury-glass-gold cursor-pointer transition-all group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-xs font-bold text-champagne-400">{c.code}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/[0.06] text-slate-300">
                        {c.status}
                      </span>
                    </div>

                    <h4 className="font-serif text-sm font-bold text-ivory-50 group-hover:text-champagne-300 transition-colors">
                      {c.title}
                    </h4>

                    <p className="text-xs text-slate-400 mt-1">{c.area}</p>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                      <span className="text-slate-300">Abogada: {c.assignedLawyer.name}</span>
                      <span className="text-champagne-400 font-bold flex items-center space-x-1">
                        <span>Ver Expediente</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CASOS */}
        {activeTab === "casos" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl luxury-glass flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">Mostrando todos los procesos activos patrocinados</span>
              <button
                onClick={onOpenConsultation}
                className="px-4 py-2 rounded-full bg-champagne-500 hover:bg-champagne-400 text-white font-bold text-xs shadow-gold-glow-subtle transition-all active:scale-95"
              >
                + Ingresar Nueva Causa
              </button>
            </div>

            <div className="space-y-3">
              {initialCases.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className="p-5 rounded-3xl luxury-glass border border-white/[0.08] hover:border-champagne-500/40 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-champagne-400">{c.code}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300">
                        {c.status}
                      </span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-ivory-50">{c.title}</h4>
                    <p className="text-xs text-slate-400">{c.court}</p>
                    <p className="text-[11px] text-slate-300">Etapa actual: {c.stage}</p>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <button className="px-4 py-2 rounded-full bg-white/[0.05] hover:bg-champagne-500 hover:text-white text-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-all">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{c.acts.length} Actuaciones</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CHAT */}
        {activeTab === "chat" && (
          <div className="h-[550px]">
            <ChatInterface />
          </div>
        )}

        {/* TAB 4: AGENDA */}
        {activeTab === "agenda" && (
          <div className="max-w-2xl mx-auto rounded-3xl luxury-glass p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[10px] font-mono text-champagne-400 uppercase tracking-widest block font-bold">
                Agendamiento de Consultas
              </span>
              <h3 className="font-serif text-2xl font-bold text-ivory-50 mt-1">
                Programa tu Consulta con el Equipo Letrado
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Atención preferencial por ser Miembro Fundador Premium. Sesiones privadas presenciales o por videollamada.
              </p>
            </div>

            {appointmentBooked && (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cita confirmada para el {appointmentDate} ({appointmentType}). Te enviamos los accesos a tu correo.</span>
                </span>
              </div>
            )}

            <form onSubmit={handleBookAppointment} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Abogado Titular Asignado</label>
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <span className="text-ivory-50 font-bold">Dra. Valeria Santamaría (Socia Litigante Civil)</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Disponible</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Fecha Deseada</label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-black/40 border border-white/10 text-ivory-50 focus:border-champagne-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Modalidad de Reunión</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAppointmentType("Telemática")}
                      className={`py-2.5 rounded-xl font-bold transition-all ${
                        appointmentType === "Telemática"
                          ? "bg-champagne-500 text-white shadow-gold-glow-subtle"
                          : "bg-black/30 text-slate-400 border border-white/10"
                      }`}
                    >
                      Telemática (Zoom)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAppointmentType("Presencial")}
                      className={`py-2.5 rounded-xl font-bold transition-all ${
                        appointmentType === "Presencial"
                          ? "bg-champagne-500 text-white shadow-gold-glow-subtle"
                          : "bg-black/30 text-slate-400 border border-white/10"
                      }`}
                    >
                      Presencial (Sede)
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold text-xs shadow-gold-glow active:scale-95 transition-all"
              >
                Confirmar Agendamiento de Cita
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: PREMIUM */}
        {activeTab === "premium" && (
          <div className="space-y-4">
            <div className="p-5 rounded-3xl luxury-glass-gold flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-champagne-400 font-bold">
                  Comunidad Jurídica Ciudadana
                </span>
                <h3 className="font-serif text-xl font-bold text-ivory-50 mt-0.5">
                  Videoteca & Capacitación Mensual Exclusiva
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Acceso irrestricto a grabaciones, modelos de contratos y consultorio grupal mensual.
                </p>
              </div>

              <span className="px-4 py-1.5 rounded-full bg-champagne-500 text-white font-bold text-xs shrink-0">
                Membresía Activa
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {premiumTrainings.map((trn) => (
                <div
                  key={trn.id}
                  className="p-5 rounded-3xl luxury-glass border border-white/[0.08] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-400 font-semibold">
                        {trn.category}
                      </span>
                      <span className="text-slate-400">{trn.duration}</span>
                    </div>

                    <h4 className="font-serif text-sm font-bold text-ivory-50">{trn.title}</h4>
                    <p className="text-[11px] text-slate-400">Imparte: {trn.instructor}</p>
                    <p className="text-[10px] text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gold-400" />
                      <span>{trn.date}</span>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-gold-400 text-xs font-bold flex items-center space-x-1 cursor-pointer hover:underline">
                      <Play className="w-3 h-3 fill-gold-400" />
                      <span>{trn.status === "En vivo" ? "Unirse al En Vivo" : "Ver Grabación"}</span>
                    </span>

                    <span className="text-slate-400 text-[10px] flex items-center space-x-1 cursor-pointer hover:text-white">
                      <Download className="w-3 h-3" />
                      <span>Checklist</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Case Detail Modal */}
      <CaseDetailModal
        caseItem={selectedCase}
        role="cliente"
        onClose={() => setSelectedCase(null)}
        onOpenChat={() => setActiveTab("chat")}
      />
    </div>
  );
}
