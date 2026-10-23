"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Filter,
  Plus,
  Phone,
  Mail,
  ArrowRight,
  UserPlus,
  CheckCircle2,
  DollarSign,
  Share2,
  Calendar,
  Sparkles,
  Search,
} from "lucide-react";
import { demoLeads, DemoLead } from "@/data/platformDemo";

export default function CRMView() {
  const [leads, setLeads] = useState<DemoLead[]>(demoLeads);
  const [filterState, setFilterState] = useState<string>("todos");
  const [search, setSearch] = useState("");

  const updateStatus = (id: string, newStatus: DemoLead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  const filteredLeads = leads
    .filter((l) => (filterState === "todos" ? true : l.status === filterState))
    .filter((l) =>
      search
        ? l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.area.toLowerCase().includes(search.toLowerCase())
        : true
    );

  const stages = ["Nuevo", "Contactado", "Consulta Agendada", "Contratado"];

  return (
    <div className="space-y-6 text-xs text-slate-200">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
            Módulo CRM Jurídico • Pipeline de Captación (Module 2)
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            Embudo de Captación y Conversión de Prospectos
          </h2>
          <p className="text-xs text-slate-400">
            Pipeline: <strong className="text-blue-300">Nuevo → Contactado → Consulta → Contratado → Cliente</strong> con atribución de canal.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1 p-1 rounded-2xl bg-slate-950 border border-slate-800 text-[10px] font-semibold overflow-x-auto">
          {["todos", "Nuevo", "Contactado", "Consulta Agendada", "Contratado"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterState(st)}
              className={`px-3 py-1.5 rounded-xl transition-all capitalize whitespace-nowrap ${
                filterState === st
                  ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-[10px] uppercase font-mono text-slate-400">Total Prospectos</span>
          <p className="text-2xl font-black text-white mt-1">{leads.length}</p>
          <p className="text-[10px] text-emerald-400 mt-0.5">+2 hoy (Instagram & App)</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-[10px] uppercase font-mono text-slate-400">Nuevos Sin Contactar</span>
          <p className="text-2xl font-black text-rose-400 mt-1">
            {leads.filter((l) => l.status === "Nuevo").length}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">SLA de respuesta &lt; 20 min</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-[10px] uppercase font-mono text-slate-400">Consultas Agendadas</span>
          <p className="text-2xl font-black text-blue-400 mt-1">
            {leads.filter((l) => l.status === "Consulta Agendada").length}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">En agenda con socios</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-[10px] uppercase font-mono text-slate-400">Tasa de Conversión</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">33.3%</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Prospecto a Cliente VIP</p>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-950/60">
          <h3 className="font-bold text-sm text-white">Prospectos Activos en el Pipeline</h3>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por nombre o materia..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline whitespace-nowrap">
              ● Sincronizado Supabase
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-850/60 transition-colors"
            >
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2.5">
                  <span className="font-bold text-sm text-white">{lead.name}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-blue-300 border border-slate-700">
                    {lead.area}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      lead.urgency === "Alta"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    Urgencia {lead.urgency}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                    {lead.source || "App Móvil"}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-slate-400 text-[11px]">
                  <span className="flex items-center space-x-1">
                    <Phone className="w-3 h-3 text-blue-400" />
                    <span>{lead.phone}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Mail className="w-3 h-3 text-blue-400" />
                    <span>{lead.email}</span>
                  </span>
                  <span>•</span>
                  <span>Ingreso: {lead.date}</span>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center space-x-2 self-start sm:self-auto">
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value as DemoLead["status"])}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-blue-300 text-xs font-semibold focus:outline-none focus:border-blue-500"
                >
                  <option value="Nuevo">Nuevo</option>
                  <option value="Contactado">Contactado</option>
                  <option value="Consulta Agendada">Consulta Agendada</option>
                  <option value="Contratado">Contratado</option>
                </select>

                <button
                  onClick={() => updateStatus(lead.id, "Contratado")}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] active:scale-95 shadow-md shadow-blue-600/30 transition-all flex items-center space-x-1"
                  title="Convertir prospecto en cliente formal"
                >
                  <UserCheck className="w-3 h-3" />
                  <span>Convertir a Cliente</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
