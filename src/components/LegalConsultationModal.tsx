"use client";

import React, { useState } from "react";
import { X, ShieldCheck, Upload, CheckCircle2, AlertCircle, Clock, Send } from "lucide-react";
import { legalAreas } from "@/data/legalServices";

interface LegalConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LegalConsultationModal({ isOpen, onClose }: LegalConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    area: legalAreas[0].name,
    urgency: "Media",
    description: "",
  });

  const [submittedTicket, setSubmittedTicket] = useState<{
    code: string;
    assignedLawyer: string;
    date: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "No se pudo registrar la solicitud.");
      const ticketNum = Math.floor(1000 + Math.random() * 9000);
      setSubmittedTicket({
        code: `VL-2026-${ticketNum}`,
        assignedLawyer:
          formData.area.includes("Civil")
            ? "Dra. Valeria Santamaría (Socia Litigante Civil)"
            : formData.area.includes("Laboral")
            ? "Abg. Marcelo Viteri (Coordinador Derecho Laboral)"
            : "Abg. Diego Alarcón (Especialista en Litigios)",
        date: new Date().toLocaleDateString("es-EC", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "No se pudo registrar la solicitud.");
    } finally { setIsSubmitting(false); }
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setSubmitError(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      area: legalAreas[0].name,
      urgency: "Media",
      description: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-xl rounded-3xl bg-navy-950 border border-gold-500/40 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-navy-900 to-navy-850 border-b border-navy-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-ivory-50">Solicitar Asistencia Jurídica</h2>
              <p className="text-[11px] text-slate-400">Atención letrada confidencial y personalizada</p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
            aria-label="Cerrar formulario"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submittedTicket ? (
            /* Ticket Confirmation View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-mono text-gold-400 font-bold tracking-wider">
                  Solicitud Registrada con Éxito
                </span>
                <h3 className="font-serif text-2xl font-bold text-ivory-50 mt-1">
                  Ticket #{submittedTicket.code}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-navy-900 border border-navy-800 text-xs text-left space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-navy-800 pb-1.5">
                  <span className="text-slate-400">Solicitante:</span>
                  <span className="text-ivory-50 font-bold">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-navy-800 pb-1.5">
                  <span className="text-slate-400">Área Asignada:</span>
                  <span className="text-gold-400 font-semibold">{formData.area}</span>
                </div>
                <div className="flex justify-between border-b border-navy-800 pb-1.5">
                  <span className="text-slate-400">Abogado Responsable:</span>
                  <span className="text-slate-200 font-semibold">{submittedTicket.assignedLawyer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fecha de Registro:</span>
                  <span className="text-slate-300">{submittedTicket.date}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Un abogado de nuestro equipo revisará los antecedentes y se pondrá en contacto contigo
                vía telefónica o WhatsApp para coordinar la cita inicial.
              </p>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-champagne-500 hover:bg-champagne-400 text-white font-bold text-sm shadow-gold-glow"
              >
                Finalizar y Cerrar
              </button>
            </div>
          ) : (
            /* Inquiry Intake Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {submitError && <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-red-200"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /><span>{submitError}</span></div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="client-name" className="block text-slate-300 font-semibold mb-1">Nombre Completo *</label>
                  <input
                    id="client-name"
                    required
                    type="text"
                    placeholder="Ej. Ing. Carlos Mendoza"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-750 text-ivory-50 focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="client-phone" className="block text-slate-300 font-semibold mb-1">Teléfono Móvil (WhatsApp) *</label>
                  <input
                    id="client-phone"
                    required
                    type="tel"
                    placeholder="+593 99 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-750 text-ivory-50 focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="client-email" className="block text-slate-300 font-semibold mb-1">Correo Electrónico *</label>
                  <input
                    id="client-email"
                    required
                    type="email"
                    placeholder="carlos@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-750 text-ivory-50 focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="client-area" className="block text-slate-300 font-semibold mb-1">Área Jurídica de Interés *</label>
                  <select
                    id="client-area"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-750 text-ivory-50 focus:border-gold-500 focus:outline-none"
                  >
                    {legalAreas.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="client-urgency" className="block text-slate-300 font-semibold mb-1">Nivel de Urgencia</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Baja", "Media", "Alta"] as const).map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setFormData({ ...formData, urgency: lvl })}
                      className={`py-2 rounded-xl text-center font-semibold transition-all ${
                        formData.urgency === lvl
                          ? "bg-gold-500 text-navy-950 font-bold"
                          : "bg-navy-900 text-slate-400 border border-navy-800 hover:text-white"
                      }`}
                    >
                      {lvl === "Alta" ? "🚨 Alta (24h)" : lvl === "Media" ? "⚖️ Media (48h)" : "📅 Ordinaria"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="client-description" className="block text-slate-300 font-semibold mb-1">
                  Descripción Breve de la Consulta o Conflicto *
                </label>
                <textarea
                  id="client-description"
                  required
                  rows={3}
                  placeholder="Detalla de forma general los hechos para asignar al especialista correspondiente..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-750 text-ivory-50 focus:border-gold-500 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div className="p-3 rounded-xl bg-navy-900/60 border border-dashed border-navy-700 flex items-center justify-between text-slate-400">
                <div className="flex items-center space-x-2">
                  <Upload className="w-4 h-4 text-gold-400" />
                  <span className="text-[11px]">Adjuntar documentos o citaciones (Opcional)</span>
                </div>
                <span className="text-[10px] text-slate-400">PDF, JPG hasta 25MB</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold text-sm shadow-gold-glow flex items-center justify-center space-x-2 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Enviando Solicitud..." : "Enviar Consulta al Equipo Letrado"}</span>
              </button>

              <p className="text-[10px] text-slate-400 text-center">
                Toda información compartida se encuentra amparada bajo el secreto profesional de la abogacía y la Ley de Protección de Datos Personales.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
