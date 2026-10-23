"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Send,
  BookOpen,
  Shield,
  CheckCircle2,
  ChevronRight,
  Scale,
  Search,
  Lock,
  Key,
  Cpu,
  Copy,
  Check,
  FileCheck,
  Terminal,
} from "lucide-react";

interface LegalChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  provider?: string;
  citations?: string[];
  timestamp: string;
}

export default function LegalAIAssistant() {
  const [geminiApiKey, setGeminiApiKey] = useState(
    "AIzaSyDemoSampleKeyForGeminiLegalTesting2026"
  );
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<LegalChatMessage[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: `Hola, soy el **Agente Gemini Legal de VIS LEGAL ABOGADOS / BIZ LEGAL S.A.S.**

Tengo indexado el marco normativo vigente de la **República del Ecuador**:
• **Constitución de la República del Ecuador (CRE 2008)**
• **Código Orgánico General de Procesos (COGEP)** — Términos y Juicios
• **Código del Trabajo** — Despidos, Liquidaciones y Actas de Finiquito
• **Código Civil & Código de Comercio** — Contratos y Obligaciones
• **Ley de Compañías & Régimen SAS** — Creación de Empresas
• **Código Orgánico Integral Penal (COIP)** — Delitos y Procedimiento

¿Qué causa judicial, término procesal o borrador legal deseas consultar hoy?`,
      provider: "Google Gemini 1.5 Flash • LegalTech Brain",
      timestamp: "09:00",
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLawFilter, setSelectedLawFilter] = useState<string>("todas");

  const promptSuggestions = [
    { label: "Término Art. 73 COGEP", query: "¿Cómo se computan los 3 días de término de una providencia según el Art. 73 del COGEP?" },
    { label: "Despido Intempestivo", query: "¿Cómo se calcula la indemnización por despido intempestivo según el Código del Trabajo de Ecuador?" },
    { label: "Acción de Protección", query: "¿Cuáles son los requisitos y causales para interponer una Acción de Protección (Art. 88 CRE)?" },
    { label: "Constitución SAS", query: "¿Cuáles son los pasos y ventajas para constituir una Sociedad por Acciones Simplificada (SAS) en la Superintendencia de Compañías?" },
    { label: "Medidas Cautelares COIP", query: "¿Qué medidas cautelares no privativas de la libertad establece el COIP para procesados?" },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMsg: LegalChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/legal-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: queryText,
          category: selectedLawFilter,
          apiKey: geminiApiKey,
        }),
      });

      const data = await res.json();

      const aiMsg: LegalChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.answer || "No se pudo procesar la consulta en este momento.",
        provider: data.provider || "Agente Gemini Legal AI",
        citations: data.citations || [],
        timestamp: new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: LegalChatMessage = {
        id: `err-${Date.now()}`,
        sender: "ai",
        text: "Error de conexión con el motor legal. Verifique su conexión a Internet o intente de nuevo.",
        timestamp: new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[750px] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden font-sans">
      {/* Top Bar: Gemini Status & Configuration */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-bold text-sm sm:text-base text-white">
                Agente Gemini Legal AI • Ecuador 24/7
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Gemini 1.5 Flash Activo</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Corpus normativo nacional: Constitución, COGEP, COIP, Código del Trabajo y Jurisprudencia
            </p>
          </div>
        </div>

        {/* Right side: Key configuration button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowKeyConfig(!showKeyConfig)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 border border-slate-700 transition-all active:scale-95"
          >
            <Key className="w-3.5 h-3.5 text-blue-400" />
            <span>API Key de Muestra</span>
          </button>
        </div>
      </div>

      {/* API Key Drawer / Configuration Banner */}
      {showKeyConfig && (
        <div className="p-4 bg-blue-950/40 border-b border-blue-800/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="space-y-1 w-full sm:w-auto">
            <div className="flex items-center space-x-2 text-blue-300 font-bold">
              <Terminal className="w-4 h-4" />
              <span>Configuración de Google Gemini API Key</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Usa la clave de prueba preconfigurada o ingresa tu clave personal de Google AI Studio.
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <input
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono w-full sm:w-64 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => setShowKeyConfig(false)}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 active:scale-95"
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {/* Law Quick Filters */}
      <div className="px-4 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center space-x-2 overflow-x-auto text-[11px]">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Filtro Jurídico:
        </span>
        {[
          { id: "todas", label: "Todas las Leyes" },
          { id: "cogep", label: "COGEP (Procesal)" },
          { id: "laboral", label: "Código del Trabajo" },
          { id: "cre", label: "Constitución (CRE)" },
          { id: "coip", label: "COIP (Penal)" },
          { id: "companias", label: "Compañías & SAS" },
        ].map((law) => (
          <button
            key={law.id}
            onClick={() => setSelectedLawFilter(law.id)}
            className={`px-3 py-1 rounded-xl transition-all font-medium whitespace-nowrap active:scale-95 ${
              selectedLawFilter === law.id
                ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {law.label}
          </button>
        ))}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2.5 bg-slate-950/20 border-b border-slate-800/60 overflow-x-auto flex items-center space-x-2">
        <span className="text-[10px] font-mono font-bold text-blue-400 shrink-0 uppercase flex items-center space-x-1">
          <Sparkles className="w-3 h-3" />
          <span>Preguntas Rápidas:</span>
        </span>
        {promptSuggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleQuery(s.query)}
            className="px-3 py-1 rounded-xl bg-slate-800/70 hover:bg-blue-900/40 hover:text-blue-200 border border-slate-700/80 text-[11px] text-slate-300 whitespace-nowrap active:scale-95 transition-all"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
        {messages.map((m) => {
          const isUser = m.sender === "user";
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[92%] sm:max-w-[80%] p-4 sm:p-5 rounded-3xl space-y-3 shadow-md transition-all ${
                  isUser
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm font-medium"
                    : "bg-slate-800/90 border border-slate-700/80 text-slate-100 rounded-bl-sm"
                }`}
              >
                {!isUser && (
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                    <div className="flex items-center space-x-2 text-blue-400 font-bold text-[11px] font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span>{m.provider || "Agente Gemini Legal AI"}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(m.id, m.text)}
                      className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700/60 transition-colors flex items-center space-x-1 text-[10px]"
                      title="Copiar respuesta o borrador"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                <div className="leading-relaxed whitespace-pre-line text-[13px]">
                  {m.text}
                </div>

                {m.citations && m.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-700/60 space-y-1.5 bg-slate-900/40 p-3 rounded-2xl">
                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider block">
                      Fundamento Normativo Verificado:
                    </span>
                    {m.citations.map((c, i) => (
                      <div
                        key={i}
                        className="text-[11px] text-slate-300 flex items-center space-x-2 font-mono"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`text-right text-[10px] font-mono ${
                    isUser ? "text-blue-200" : "text-slate-400"
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center space-x-3 text-xs text-blue-400 p-3 rounded-2xl bg-blue-950/30 border border-blue-800/40 w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping"></span>
            <span>
              Consultando modelo Google Gemini 1.5 Flash con indexación de leyes del Ecuador...
            </span>
          </div>
        )}
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleQuery(inputQuery);
        }}
        className="p-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center space-x-2.5"
      >
        <input
          type="text"
          placeholder="Pregúntale al Agente Gemini sobre artículos de leyes, términos procesales o redacción de minutas..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
        />

        <button
          type="submit"
          disabled={isLoading || !inputQuery.trim()}
          className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-blue-600/30 active:scale-95 transition-all shrink-0"
        >
          <span>Preguntar</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
