"use client";

import React, { useState } from "react";
import { Check, Sparkles, Shield, Award, ArrowRight } from "lucide-react";
import { premiumBenefits } from "@/data/legalServices";

interface MembershipSectionProps {
  onOpenConsultation: () => void;
}

export default function MembershipSection({ onOpenConsultation }: MembershipSectionProps) {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");

  const monthlyPrice = 19.99;
  const annualPrice = 199.0; // saves ~2 months

  return (
    <section id="membresia" className="py-28 bg-luxury-radial relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-gold-500/30 text-xs font-semibold text-gold-400 mb-4 backdrop-blur-xl">
            <Award className="w-3.5 h-3.5" />
            <span>Comunidad Jurídica Digital • Miembros Fundadores</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-silver-gradient tracking-tight">
            Membresía VIS LEGAL PREMIUM
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            La justicia no debe ser solo reactiva. Aprende a blindar tu patrimonio, resolver
            conflictos antes de que escalen a juicios y accede a respaldo jurídico permanente por una fracción del costo tradicional.
          </p>

          {/* Billing Switcher Pill */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-2xl">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow-gold-glow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Facturación Mensual
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center space-x-2 active:scale-95 ${
                billingCycle === "annual"
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow-gold-glow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Plan Anual</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">
                Ahorra 2 meses
              </span>
            </button>
          </div>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto mb-12">
          {/* Card 1: Cuenta Gratuita (5 cols) */}
          <div className="lg:col-span-5 rounded-[32px] luxury-glass p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Acceso Ciudadano
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/[0.05] text-slate-300 border border-white/10">
                  Siempre Libre
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-ivory-50">Cuenta Gratuita</h3>
              <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
                Ideal para quienes desean consultar servicios, informarse sobre leyes básicas y dar seguimiento a una causa puntual.
              </p>

              <div className="my-6">
                <span className="text-4xl font-extrabold text-ivory-50 font-serif">$0</span>
                <span className="text-xs text-slate-400 ml-1">/ para siempre</span>
              </div>

              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Descarga y acceso libre a la aplicación móvil (iOS / Android)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Seguimiento de un expediente judicial activo contratado</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Acceso a noticias y alertas legales generales abiertas</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Solicitud y cotización de honorarios para litigios</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenConsultation}
              className="mt-8 w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-xs font-bold border border-white/10 hover:border-slate-400 transition-all active:scale-95"
            >
              Crear Cuenta Gratuita
            </button>
          </div>

          {/* Card 2: VIS LEGAL PREMIUM (7 cols) */}
          <div className="lg:col-span-7 rounded-[32px] luxury-glass-gold p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Founder badge corner */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-gold-500 to-gold-600 text-navy-950 font-black text-[10px] px-5 py-1.5 rounded-bl-2xl tracking-widest uppercase shadow-lg">
              Cupo Fundador • 1.000 Plazas
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold-400">
                  Protección Integral Continua
                </span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-ivory-50">
                VIS LEGAL PREMIUM
              </h3>
              <p className="text-sm text-slate-300 mt-2 font-light leading-relaxed">
                Tranquilidad jurídica total para familias, profesionales y emprendedores con formación y acompañamiento continuo.
              </p>

              <div className="my-6 flex items-baseline space-x-2">
                <span className="text-5xl font-extrabold text-gold-400 font-serif">
                  ${billingCycle === "annual" ? annualPrice.toFixed(0) : monthlyPrice.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400">
                  {billingCycle === "annual" ? "USD / año facturado anualmente" : "USD / mes"}
                </span>
              </div>

              {/* Benefits list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                {premiumBenefits.map((b, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-2xl bg-black/30 border border-white/[0.06]">
                    <Check className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-ivory-50 block">{b.title}</span>
                      <span className="text-[10px] text-slate-400 leading-tight block mt-0.5">{b.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:flex-1 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-bold text-xs shadow-gold-glow flex items-center justify-center space-x-2 active:scale-95 transition-all"
              >
                <Shield className="w-4 h-4 text-navy-950" />
                <span>Unirme como Miembro Fundador</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-slate-400 text-center sm:text-left">
                Garantía total. Cancela tu suscripción en cualquier momento desde la app.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
