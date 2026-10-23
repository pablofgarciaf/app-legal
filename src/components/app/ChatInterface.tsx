"use client";

import React, { useState } from "react";
import { Send, Paperclip, Shield, CheckCheck, User, ArrowLeft, Download } from "lucide-react";
import { initialMessages, ChatMessage } from "@/data/appState";

interface ChatInterfaceProps {
  onBack?: () => void;
}

export default function ChatInterface({ onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "client",
      senderName: "Roberto Andrade",
      text: inputText,
      time: new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate lawyer reply
    setTimeout(() => {
      setIsTyping(false);
      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "lawyer",
        senderName: "Dra. Valeria Santamaría",
        text: "Recibido. He anexado la instrucción a su expediente digital. Continuamos con el seguimiento puntual de la causa.",
        time: new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1800);
  };

  return (
    <div className="flex flex-col h-full rounded-[28px] luxury-glass border border-white/10 overflow-hidden">
      {/* Chat Top Header */}
      <div className="p-4 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-full hover:bg-white/[0.1] text-slate-300"
              aria-label="Volver"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 text-navy-950 font-bold flex items-center justify-center font-serif text-sm shadow-gold-glow-subtle">
              VS
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-navy-950"></span>
          </div>

          <div>
            <h3 className="font-bold text-sm text-ivory-50">Dra. Valeria Santamaría</h3>
            <p className="text-[10px] text-slate-400">Socia Litigante • Caso #17230-2026</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
          <Shield className="w-3 h-3" />
          <span>Canal Cifrado E2E</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 text-xs">
        <div className="text-center my-2">
          <span className="text-[10px] text-slate-400 font-mono bg-black/40 px-3 py-1 rounded-full border border-white/[0.05]">
            Comunicaciones amparadas bajo el secreto profesional de la abogacía
          </span>
        </div>

        {messages.map((m) => {
          const isMe = m.sender === "client";
          return (
            <div key={m.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl space-y-1.5 shadow-md ${
                  isMe
                    ? "bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 rounded-br-none font-medium"
                    : "bg-white/[0.06] border border-white/[0.08] text-slate-200 rounded-bl-none"
                }`}
              >
                {!isMe && <span className="text-[10px] font-bold text-gold-400 block">{m.senderName}</span>}
                <p className="leading-relaxed">{m.text}</p>

                {m.attachment && (
                  <div className="mt-2 p-2 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between text-[11px]">
                    <span className="truncate pr-2 font-mono text-ivory-50">{m.attachment.name}</span>
                    <Download className="w-3.5 h-3.5 shrink-0 text-gold-400 cursor-pointer" />
                  </div>
                )}

                <div className={`flex items-center justify-end space-x-1 text-[9px] ${isMe ? "text-navy-950/70" : "text-slate-400"}`}>
                  <span>{m.time}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-navy-950" />}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-slate-400 pl-2">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
            <span>Dra. Valeria Santamaría está escribiendo...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/[0.08] bg-white/[0.02] flex items-center space-x-2">
        <button
          type="button"
          className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all"
          title="Adjuntar documento"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <input
          type="text"
          placeholder="Escribe tu consulta jurídica confidencial..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-full bg-black/40 border border-white/10 text-xs text-ivory-50 focus:border-gold-500 focus:outline-none"
        />

        <button
          type="submit"
          className="p-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold active:scale-95 shadow-gold-glow-subtle transition-all"
          aria-label="Enviar mensaje"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
