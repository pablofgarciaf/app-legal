"use client";

import React, { useState } from "react";
import {
  Smartphone,
  FolderOpen,
  Calendar,
  Sparkles,
  Bell,
  FileText,
  Clock,
  Shield,
  Download,
  Apple,
  Play,
  ArrowRight,
} from "lucide-react";

export default function AppShowcase() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "cases" | "ai" | "agenda">("dashboard");

  return (
    <section id="app-showcase" className="py-28 bg-navy-950 relative overflow-hidden border-t border-white/[0.06]">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-gold-500/30 text-xs font-semibold text-gold-400 mb-4 backdrop-blur-xl">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Versión 1.0 Oficial • iOS & Android</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-silver-gradient tracking-tight">
            Tu Estudio Jurídico en la Palma de tu Mano
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Diseñada con estándares de alta ingeniería y experiencia nativa. Revisa en tiempo real el avance
            de tus audiencias, descarga providencias y consulta con tus abogados con máxima confidencialidad.
          </p>
        </div>

        {/* Interactive Keynote Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Interactive Feature Selectors (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full text-left p-5 rounded-3xl transition-all duration-200 flex items-start space-x-4 active:scale-95 ${
                activeTab === "dashboard"
                  ? "luxury-glass-gold"
                  : "luxury-glass hover:bg-white/[0.06] text-slate-400"
              }`}
            >
              <div
                className={`p-3 rounded-2xl ${
                  activeTab === "dashboard"
                    ? "bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-gold-glow"
                    : "bg-navy-850 text-slate-300"
                }`}
              >
                <FolderOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ivory-50">Dashboard Unificado</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Visión 360° de tus expedientes activos, citas programadas y contenidos exclusivos de la membresía.
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("cases")}
              className={`w-full text-left p-5 rounded-3xl transition-all duration-200 flex items-start space-x-4 active:scale-95 ${
                activeTab === "cases"
                  ? "luxury-glass-gold"
                  : "luxury-glass hover:bg-white/[0.06] text-slate-400"
              }`}
            >
              <div
                className={`p-3 rounded-2xl ${
                  activeTab === "cases"
                    ? "bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-gold-glow"
                    : "bg-navy-850 text-slate-300"
                }`}
              >
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ivory-50">Expedientes Judiciales en Vivo</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Seguimiento de etapas procesales, abogado asignado y próximos eventos con transparencia absoluta.
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`w-full text-left p-5 rounded-3xl transition-all duration-200 flex items-start space-x-4 active:scale-95 ${
                activeTab === "ai"
                  ? "luxury-glass-gold"
                  : "luxury-glass hover:bg-white/[0.06] text-slate-400"
              }`}
            >
              <div
                className={`p-3 rounded-2xl ${
                  activeTab === "ai"
                    ? "bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-gold-glow"
                    : "bg-navy-850 text-slate-300"
                }`}
              >
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-bold text-ivory-50">Buzón con Inteligencia Artificial</h3>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Ético
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Síntesis automática de providencias y cálculo de términos con validación y firma obligatoria del abogado.
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("agenda")}
              className={`w-full text-left p-5 rounded-3xl transition-all duration-200 flex items-start space-x-4 active:scale-95 ${
                activeTab === "agenda"
                  ? "luxury-glass-gold"
                  : "luxury-glass hover:bg-white/[0.06] text-slate-400"
              }`}
            >
              <div
                className={`p-3 rounded-2xl ${
                  activeTab === "agenda"
                    ? "bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-gold-glow"
                    : "bg-navy-850 text-slate-300"
                }`}
              >
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ivory-50">Agenda & Consultas Telemáticas</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Reserva reuniones presenciales o salas virtuales encriptadas con sincronización a tu calendario personal.
                </p>
              </div>
            </button>

            {/* App Store / Google Play Badges */}
            <div className="pt-4 flex items-center gap-3">
              <div className="flex-1 py-3 px-4 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center space-x-3 cursor-pointer hover:bg-white/[0.08] transition-all">
                <Apple className="w-6 h-6 text-white shrink-0" />
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-wider text-slate-400">Disponible en</p>
                  <p className="text-xs font-bold text-white">App Store</p>
                </div>
              </div>

              <div className="flex-1 py-3 px-4 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center space-x-3 cursor-pointer hover:bg-white/[0.08] transition-all">
                <Play className="w-5 h-5 text-white shrink-0 fill-white" />
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-wider text-slate-400">Disponible en</p>
                  <p className="text-xs font-bold text-white">Google Play</p>
                </div>
              </div>
            </div>
          </div>

          {/* Titanium iPhone 16 Pro Mockup (7 cols) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-[330px] sm:w-[365px] rounded-[52px] p-4 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.15)] border-4 border-slate-600/70">
              {/* Dynamic Island */}
              <div className="absolute top-7 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>
                <div className="w-2 h-2 rounded-full bg-blue-950/80"></div>
              </div>

              {/* Screen Glass Body */}
              <div className="relative rounded-[42px] bg-navy-950 overflow-hidden border border-navy-850 h-[650px] flex flex-col font-sans">
                {/* Status Bar */}
                <div className="pt-3 px-7 pb-2 flex justify-between items-center text-[11px] font-semibold text-slate-400 z-20">
                  <span>09:41</span>
                  <div className="flex items-center space-x-1.5">
                    <span>5G</span>
                    <span className="text-emerald-400 font-bold">100%</span>
                  </div>
                </div>

                {/* Internal App Navigation */}
                <div className="px-5 py-3 border-b border-navy-850 flex items-center justify-between bg-navy-900/80 backdrop-blur-md">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
                      <span className="text-gold-400 text-xs font-serif font-bold">VL</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ivory-50 leading-none">VIS LEGAL</p>
                      <p className="text-[9px] text-slate-400 leading-none mt-1">Portal Digital</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <Bell className="w-4 h-4 text-slate-300" />
                  </div>
                </div>

                {/* Tab Screens Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-left">
                  {activeTab === "dashboard" && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-navy-850 to-navy-800 border border-gold-500/30 shadow-sm">
                        <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-gold-400">
                          Identidad Verificada
                        </span>
                        <p className="text-sm font-bold text-ivory-50 mt-0.5">Lic. Roberto Andrade</p>
                        <p className="text-[11px] text-slate-300">Miembro Fundador Premium</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="p-3.5 rounded-2xl bg-navy-900 border border-white/[0.06]">
                          <span className="text-2xl font-serif font-bold text-gold-400">3</span>
                          <p className="text-xs font-semibold text-slate-200 mt-0.5">Casos en Trámite</p>
                          <p className="text-[9px] text-emerald-400 font-medium">Plazos al día</p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-navy-900 border border-white/[0.06]">
                          <span className="text-2xl font-serif font-bold text-blue-400">1</span>
                          <p className="text-xs font-semibold text-slate-200 mt-0.5">Próxima Audiencia</p>
                          <p className="text-[9px] text-slate-400">29 de Octubre</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-navy-900/90 border border-white/[0.06] space-y-2">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>Juicio Ordinario</span>
                          <span className="text-gold-400 font-mono font-bold">#17230-2026</span>
                        </div>
                        <p className="text-xs font-bold text-ivory-50 truncate">
                          Incumplimiento de Contrato Mercantil
                        </p>
                        <div className="text-[10px] flex items-center justify-between text-slate-400 bg-navy-950 p-2 rounded-xl">
                          <span>Fase: Dictamen Pericial</span>
                          <span className="text-emerald-400 font-bold">Activo</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-gold-500/10 border border-gold-500/30">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-gold-400 uppercase">Taller Exclusivo</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-300">Zoom</span>
                        </div>
                        <p className="text-xs font-bold text-slate-200 mt-1">
                          Blindaje de Contratos de Arrendamiento 2026
                        </p>
                        <p className="text-[10px] text-gold-400 mt-1 font-semibold flex items-center space-x-1">
                          <span>Inscribirme con 1 clic</span>
                          <ArrowRight className="w-3 h-3" />
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "cases" && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-ivory-50">Causas Judiciales Patrocinadas</span>
                        <span className="text-[10px] text-slate-400">3 expedientes</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-navy-900 border border-gold-500/40 space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                            En Trámite
                          </span>
                          <span className="font-mono text-slate-400">17230-2026-00891</span>
                        </div>
                        <p className="text-xs font-bold text-ivory-50">
                          Juicio Ordinario de Cumplimiento
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Abogada: Dra. Valeria Santamaría
                        </p>
                        <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-[10px]">
                          <span className="text-slate-300 flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-gold-400" />
                            <span>Peritaje contable (4 Nov)</span>
                          </span>
                          <span className="text-gold-400 font-bold">14 Docs</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-navy-900 border border-white/[0.06] space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold">
                            Audiencia
                          </span>
                          <span className="font-mono text-slate-400">09201-2026-01452</span>
                        </div>
                        <p className="text-xs font-bold text-ivory-50">
                          Acción de Protección Constitucional
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Abogado: Abg. Diego Alarcón
                        </p>
                        <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-[10px]">
                          <span className="text-slate-300 flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-blue-400" />
                            <span>Audiencia oral (29 Oct)</span>
                          </span>
                          <span className="text-slate-400">8 Docs</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "ai" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ivory-50 flex items-center space-x-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                          <span>Extracción Asistida por IA</span>
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Supervisado
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-navy-900 border border-white/[0.08] space-y-2.5 text-[11px]">
                        <div className="text-[10px] text-slate-400 flex justify-between">
                          <span>Notificación Electrónica</span>
                          <span>Hoy 08:15 AM</span>
                        </div>
                        <p className="font-bold text-ivory-50 text-xs">
                          Juzgado 3ro Civil de Pichincha
                        </p>
                        <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                          <span className="text-[10px] font-bold text-gold-400 uppercase">
                            Resumen de Providencia:
                          </span>
                          <p className="text-[10px] text-slate-300 leading-relaxed">
                            Se confiere el término de 3 días para contestar excepción previa de incompetencia.
                          </p>
                        </div>
                        <div className="flex justify-between items-center text-[10px] pt-1">
                          <span className="text-rose-400 font-bold">Vencimiento: 28 Oct</span>
                          <span className="text-emerald-400 font-bold">Letrado Notificado</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-navy-900/60 border border-white/[0.04] text-[10px] text-slate-400 leading-relaxed">
                        <p className="italic">
                          * Principio Ético: La IA extrae y resume; la estrategia y firma de escritos corresponde exclusivamente al letrado humano patrocinador.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "agenda" && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-ivory-50">Citas & Videollamadas</span>
                        <span className="text-[10px] text-gold-400 font-bold">+ Agendar</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-navy-900 border border-gold-500/40 space-y-2.5">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold">
                            Sala Telemática Encriptada
                          </span>
                          <span className="text-slate-400">Mañana</span>
                        </div>
                        <p className="text-xs font-bold text-ivory-50">
                          Revisión de Estrategia Pre-Audiencia
                        </p>
                        <div className="text-[10px] text-slate-300 flex items-center space-x-2">
                          <Clock className="w-3.5 h-3.5 text-gold-400" />
                          <span>10:30 AM - 11:15 AM</span>
                        </div>
                        <div className="pt-2 border-t border-navy-800 flex justify-between items-center">
                          <span className="text-[10px] text-slate-400">Sala Lista</span>
                          <button className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-gold-500 text-navy-950 shadow-gold-glow">
                            Ingresar a Videollamada
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom App Bar */}
                <div className="px-5 py-3 bg-navy-900/90 border-t border-navy-850 flex justify-around items-center text-[9px] text-slate-400">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`flex flex-col items-center ${activeTab === "dashboard" ? "text-gold-400 font-bold" : ""}`}
                  >
                    <FolderOpen className="w-4 h-4 mb-0.5" />
                    <span>Inicio</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("cases")}
                    className={`flex flex-col items-center ${activeTab === "cases" ? "text-gold-400 font-bold" : ""}`}
                  >
                    <FileText className="w-4 h-4 mb-0.5" />
                    <span>Casos</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("ai")}
                    className={`flex flex-col items-center ${activeTab === "ai" ? "text-gold-400 font-bold" : ""}`}
                  >
                    <Sparkles className="w-4 h-4 mb-0.5" />
                    <span>Buzón IA</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("agenda")}
                    className={`flex flex-col items-center ${activeTab === "agenda" ? "text-gold-400 font-bold" : ""}`}
                  >
                    <Calendar className="w-4 h-4 mb-0.5" />
                    <span>Agenda</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
