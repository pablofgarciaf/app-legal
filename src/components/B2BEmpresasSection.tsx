"use client";

import React from "react";
import { Building2, ShieldCheck, FileCheck, Users2, Landmark, ArrowRight, CheckCircle2 } from "lucide-react";

interface B2BEmpresasSectionProps {
  onOpenConsultation: () => void;
}

export default function B2BEmpresasSection({ onOpenConsultation }: B2BEmpresasSectionProps) {
  const corporateServices = [
    {
      icon: <Building2 className="w-5 h-5 text-gold-400" />,
      title: "Constitución y Reformas SAS 24h",
      desc: "Constitución de compañías por acciones simplificadas, pactos de socios, acuerdos de confidencialidad y reformas estatutarias.",
    },
    {
      icon: <FileCheck className="w-5 h-5 text-gold-400" />,
      title: "Auditoría & Blindaje Contractual",
      desc: "Revisión minuciosa de contratos comerciales, proveedores, distribuidores y acuerdos de prestación de servicios para erradicar contingencias.",
    },
    {
      icon: <Users2 className="w-5 h-5 text-gold-400" />,
      title: "Gestión Laboral Patronal Preventiva",
      desc: "Reglamentos internos de trabajo aprobados por el MDT, protocolos de acoso y desvinculaciones seguras minimizando contingencias indemnizatorias.",
    },
    {
      icon: <Landmark className="w-5 h-5 text-gold-400" />,
      title: "Cobranza Judicial de Cartera",
      desc: "Protocolos ágiles de mediación y cobro de pagarés, letras de cambio y facturas comerciales impagas ante las Unidades Judiciales.",
    },
  ];

  return (
    <section id="empresas" className="py-28 bg-navy-950 relative border-t border-white/[0.06] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-blue-600/10 blur-[170px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-blue-500/30 text-xs font-semibold text-blue-300 backdrop-blur-xl">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Línea Corporativa B2B Especializada</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-silver-gradient tracking-tight leading-tight">
              VIS LEGAL EMPRESAS: Blindaje para tu Negocio
            </h2>

            <p className="text-slate-300 text-base font-light leading-relaxed">
              Un litigio mal gestionado o un contrato ambiguo pueden comprometer años de esfuerzo.
              Nuestro equipo actúa como tu departamento legal externo con tarifa plana mensual,
              atendiendo consultas ilimitadas y protegiendo tus intereses estratégicos.
            </p>

            <div className="p-5 rounded-3xl luxury-glass border border-gold-500/30 space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <p className="text-xs font-bold text-gold-400 uppercase tracking-wider font-mono">
                  Diagnóstico de Salud Legal Empresarial
                </p>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Auditamos tus contratos clave y contingencias laborales sin costo de apertura para empresas con más de 5 colaboradores.
              </p>
            </div>

            <div>
              <button
                onClick={onOpenConsultation}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-navy-950 font-bold text-xs shadow-gold-glow hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] flex items-center space-x-2 active:scale-95 transition-all"
              >
                <span>Solicitar Diagnóstico Corporativo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column (7 cols): Service Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {corporateServices.map((srv, idx) => (
              <div
                key={idx}
                className="p-7 rounded-[30px] luxury-glass hover:luxury-glass-gold transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                  {srv.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-ivory-50">{srv.title}</h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
