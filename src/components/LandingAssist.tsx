"use client";

import { FormEvent, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

export default function LandingAssist() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("Hola. Puedo orientarte de forma informativa sobre trámites y áreas legales en Ecuador.");
  const [loading, setLoading] = useState(false);

  async function ask(event: FormEvent) {
    event.preventDefault();
    if (!query.trim() || loading) return;
    setLoading(true);
    try {
      const response = await fetch("/api/ai/legal-query", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }) });
      const data = await response.json().catch(() => null);
      setAnswer(data?.answer ?? "No pude procesar la consulta. Escríbenos por WhatsApp para coordinar una revisión.");
      setQuery("");
    } catch {
      setAnswer("El asistente no está disponible ahora. Puedes escribirnos directamente por WhatsApp.");
    } finally { setLoading(false); }
  }

  return <>
    <div className="landing-float-actions" aria-label="Contacto VIS Legal">
      <a className="whatsapp-float" href="https://wa.me/593991786275?text=Hola%20VIS%20Legal,%20quiero%20una%20orientación" target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp"><MessageCircle size={22}/><span>WhatsApp</span></a>
      <button className="ai-float" onClick={() => setOpen(true)} aria-label="Abrir asistente jurídico"><Bot size={20}/><span>Asistente IA</span></button>
    </div>
    {open && <div className="assistant-panel" role="dialog" aria-label="Asistente informativo VIS Legal">
      <div className="assistant-head"><div><strong>Asistente VIS Legal</strong><small>Orientación informativa · Ecuador</small></div><button onClick={() => setOpen(false)} aria-label="Cerrar"><X size={18}/></button></div>
      <div className="assistant-answer">{answer}</div>
      <form onSubmit={ask} className="assistant-form"><input value={query} onChange={e => setQuery(e.target.value)} placeholder="¿Qué necesitas saber?" aria-label="Consulta jurídica"/><button disabled={loading} aria-label="Enviar consulta"><Send size={16}/></button></form>
      <small className="assistant-disclaimer">No reemplaza asesoría profesional ni calcula vencimientos procesales.</small>
    </div>}
  </>;
}
