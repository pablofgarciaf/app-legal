"use client";

import React from "react";
import {
  Scale,
  FileCheck2,
  Briefcase,
  Building2,
  Users,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { legalAreas, LegalArea } from "@/data/legalServices";

interface ServicesSectionProps {
  onOpenConsultation: () => void;
}

export default function ServicesSection({ onOpenConsultation }: ServicesSectionProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "FileCheck2":
        return <FileCheck2 className="w-5 h-5 text-gold-400" />;
      case "Briefcase":
        return <Briefcase className="w-5 h-5 text-gold-400" />;
      case "Building2":
        return <Building2 className="w-5 h-5 text-gold-400" />;
      case "Users":
        return <Users className="w-5 h-5 text-gold-400" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5 text-gold-400" />;
      default:
        return <Scale className="w-5 h-5 text-gold-400" />;
    }
  };

  return (
    <section id="servicios" className="py-28 bg-navy-950 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-gold-500/30 text-xs font-semibold text-gold-400 mb-4 backdrop-blur-xl">
            <Scale className="w-3.5 h-3.5" />
            <span>Áreas de Práctica Especializada</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-silver-gradient tracking-tight">
            Defensa Técnica y Litigación Estratégica
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Nuestros abogados aúnan sólida experiencia en los tribunales con metodologías preventivas
            para resolver controversias con rapidez, rigor procesal y certeza económica.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legalAreas.map((area: LegalArea) => (
            <div
              key={area.id}
              className="p-8 rounded-[30px] luxury-glass hover:luxury-glass-gold transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-gold-500/50 group-hover:bg-gold-500/10 transition-all duration-300 shadow-gold-glow-subtle">
                  {getIcon(area.iconName)}
                </div>

                <h3 className="font-serif text-xl font-bold text-ivory-50 group-hover:text-gold-300 transition-colors">
                  {area.name}
                </h3>

                <p className="text-xs text-slate-300 mt-3 font-light leading-relaxed">
                  {area.detailedDesc}
                </p>

                <div className="mt-6 pt-5 border-t border-white/[0.08] space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Actuaciones Frecuentes:
                  </span>
                  {area.typicalCases.map((c, i) => (
                    <div key={i} className="flex items-center space-x-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span className="truncate">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.08]">
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3 rounded-full bg-white/[0.04] hover:bg-gold-500 hover:text-navy-950 text-slate-200 text-xs font-bold border border-white/10 hover:border-gold-500/50 flex items-center justify-center space-x-2 transition-all active:scale-95"
                >
                  <span>Consultar este Asunto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
