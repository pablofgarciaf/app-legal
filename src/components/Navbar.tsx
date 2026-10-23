"use client";

import React, { useState, useEffect } from "react";
import { Scale, Sparkles, FileText, Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenProposal: () => void;
}

export default function Navbar({ onOpenConsultation, onOpenProposal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl transition-all duration-300">
      {/* Floating Glass Pill */}
      <div
        className={`rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
          scrolled
            ? "bg-navy-950/85 backdrop-blur-2xl border border-gold-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_-5px_rgba(212,175,55,0.25)]"
            : "bg-navy-900/60 backdrop-blur-xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)]"
        }`}
      >
        {/* Brand Mark */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-navy-800 to-navy-950 border border-gold-500/50 flex items-center justify-center shadow-gold-glow-subtle group-hover:border-gold-400 group-hover:scale-105 transition-all duration-300">
            <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 group-hover:text-gold-300 transition-colors" />
            <div className="absolute inset-0 rounded-full bg-gold-400/10 blur-sm group-hover:bg-gold-400/20 transition-all"></div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-base sm:text-lg font-extrabold tracking-wide text-ivory-50 group-hover:text-gold-200 transition-colors">
                VIS LEGAL
              </span>
              <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full font-mono font-bold bg-gold-500/15 text-gold-400 border border-gold-500/30">
                LegalTech
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium hidden sm:block">
              Firma Jurídica Digital
            </span>
          </div>
        </a>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden lg:flex items-center space-x-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.05]">
          <a
            href="#servicios"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Servicios
          </a>
          <a
            href="#app-showcase"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            App Móvil
          </a>
          <a
            href="#membresia"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all flex items-center space-x-1.5"
          >
            <span>Membresía</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse"></span>
          </a>
          <a
            href="#empresas"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Empresas
          </a>
          <a
            href="#simulador"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Simulador</span>
          </a>
        </div>

        {/* Right Actions (Desktop) */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link href="/ingresar" className="px-4 py-2 rounded-full text-xs font-semibold text-slate-200 hover:text-gold-300 border border-white/15 hover:border-gold-500/40 transition-all">
            Ingresar
          </Link>
          <button
            onClick={onOpenProposal}
            className="px-3 py-1.5 rounded-full text-xs font-semibold text-gold-400/90 hover:text-gold-300 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 transition-all active:scale-95 flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Propuesta $15.5k</span>
          </button>

          <button
            onClick={onOpenConsultation}
            className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-navy-950 shadow-gold-glow hover:shadow-[0_0_28px_rgba(212,175,55,0.6)] active:scale-95 transition-all duration-200 flex items-center space-x-1.5 group"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-navy-950" />
            <span>Solicitar Asistencia</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger / Quick CTA */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={onOpenProposal}
            className="px-2.5 py-1 rounded-full text-[11px] font-bold text-gold-400 bg-navy-850 border border-gold-500/30 active:scale-95"
          >
            $15.5k
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-slate-200 hover:text-white bg-white/[0.05] border border-white/10 active:scale-95 transition-all"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-gold-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Floating Glass Mobile Sheet */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2.5 rounded-3xl p-5 bg-navy-950/95 backdrop-blur-2xl border border-gold-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-4">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-200">
            <a
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] hover:text-gold-300 border border-white/[0.05]"
            >
              Áreas de Práctica
            </a>
            <a
              href="#app-showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] hover:text-gold-300 border border-white/[0.05]"
            >
              App iOS & Android
            </a>
            <a
              href="#membresia"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] hover:text-gold-300 border border-white/[0.05]"
            >
              Membresía Premium
            </a>
            <a
              href="#empresas"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] hover:text-gold-300 border border-white/[0.05]"
            >
              VIS LEGAL Empresas
            </a>
          </div>

          <a
            href="#simulador"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full p-3 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-between text-xs font-bold text-gold-300"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Probar Simulador de Expedientes en Vivo</span>
            </div>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <div className="pt-2 flex flex-col space-y-2">
            <Link href="/ingresar" onClick={() => setMobileMenuOpen(false)} className="w-full py-2.5 rounded-full text-center text-slate-200 border border-white/15">
              Ingresar a la plataforma
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProposal();
              }}
              className="w-full py-2.5 rounded-full bg-navy-850 text-gold-400 text-xs font-bold border border-gold-500/30 active:scale-95 transition-all"
            >
              Ver Propuesta Técnica ($15,500 USD)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-xs shadow-gold-glow active:scale-95 transition-all"
            >
              Solicitar Asistencia Legal Inmediata
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
