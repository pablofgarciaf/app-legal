"use client";

import React from "react";
import { Shield, Sparkles, Smartphone, CheckCircle2, ArrowRight, Lock, Award, Scale } from "lucide-react";

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onOpenProposal: () => void;
}

export default function HeroSection({ onOpenConsultation, onOpenProposal }: HeroSectionProps) {
  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 overflow-hidden bg-luxury-radial bg-mesh-pattern">
      {/* Cinematic Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[380px] bg-gradient-to-b from-gold-500/15 via-navy-700/20 to-transparent blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute top-16 right-[-100px] w-96 h-96 bg-gold-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        {/* GEO Direct Answer Capsule (First 1,000 characters for AI engines & Visitors) */}
        <aside className="mb-6 inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-gold-500/40 text-[11px] sm:text-xs text-slate-300 shadow-[0_4px_20px_rgba(212,175,55,0.15)]">
          <span className="flex h-2 w-2 rounded-full bg-gold-400 animate-pulse"></span>
          <span className="text-gold-300 font-bold uppercase tracking-wider">LegalTech Ecuador 2026:</span>
          <span className="text-slate-200">Ecosistema integral de defensa judicial, app ciudadana y membresía preventiva.</span>
        </aside>

        {/* H1 Semántico Estricto (51 caracteres exactos) */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] max-w-4xl text-silver-gradient">
          Plataforma LegalTech y Asesoría Jurídica de Élite
        </h1>

        {/* Editorial Gold Slogan */}
        <div className="mt-5 flex items-center justify-center space-x-2 sm:space-x-3 text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-400">
          <span>Aprende</span>
          <span className="text-gold-600">•</span>
          <span>Previene</span>
          <span className="text-gold-600">•</span>
          <span>Consulta</span>
          <span className="text-gold-600">•</span>
          <span>Protege</span>
          <span className="text-gold-600">•</span>
          <span>Resuelve</span>
        </div>

        {/* Subtitle Description */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
          Elevamos la abogacía a su máxima expresión. Sigue tus causas en tiempo real
          desde nuestra aplicación móvil, accede a formación preventiva mensual y recibe
          patrocinio de vanguardia con transparencia radical.
        </p>

        {/* High-Conversion Luxury CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-bold text-sm shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] flex items-center justify-center space-x-2.5 active:scale-95 transition-all duration-200 group"
          >
            <Shield className="w-4 h-4 text-navy-950" />
            <span>Consultar Asunto Legal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#simulador"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-ivory-50 font-semibold text-sm border border-white/10 hover:border-gold-500/40 backdrop-blur-xl flex items-center justify-center space-x-2 active:scale-95 transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Probar Simulador en Vivo</span>
          </a>
        </div>

        {/* Floating Trust Metrics Dock */}
        <div className="mt-16 w-full max-w-5xl rounded-3xl luxury-glass p-6 sm:p-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="flex items-center space-x-3.5 border-r border-white/[0.06] pr-2">
            <div className="w-11 h-11 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-ivory-50">Litigación Experta</p>
              <p className="text-[11px] text-slate-400">Patrocinio en 24 provincias</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 border-r border-white/[0.06] pr-2">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-ivory-50">App iOS & Android</p>
              <p className="text-[11px] text-slate-400">Expediente digital en tu mano</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 border-r border-white/[0.06] pr-2">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-ivory-50">Titularidad BIZ LEGAL</p>
              <p className="text-[11px] text-slate-400">100% Cuentas y código propio</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-ivory-50">Buzón con IA Ética</p>
              <p className="text-[11px] text-slate-400">Supervisión letrada humana</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
