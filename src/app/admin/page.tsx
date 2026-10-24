"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  UserCheck,
  Bot,
  Filter,
  Search,
  Calendar,
  Bell,
  LogOut,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileText,
  Building2,
  Mail,
  Phone,
  Settings,
  Sparkles,
  ArrowUpRight,
  Eye,
  Shield,
  Gavel,
  ChevronLeft,
  Menu,
  X,
  ExternalLink,
  Plus,
  RefreshCw,
  FolderOpen
} from "lucide-react";
import { demoCases, DemoCase, judicialNotificationAIDemo, JudicialNotificationAI, demoLeads, DemoLead } from "@/data/platformDemo";

// Mock Clients data for B2B/Client Directory
interface B2BClient {
  id: string;
  name: string;
  type: "Empresa B2B" | "Persona Natural";
  ruc: string;
  email: string;
  phone: string;
  activeCases: number;
  plan: "Plan Corporativo Pro" | "Retainer Legal" | "Caso Individual";
  status: "Al día" | "Auditoría en curso" | "Pendiente pago";
  assignedLawyer: string;
}

const mockB2BClients: B2BClient[] = [
  {
    id: "cl-01",
    name: "Constructora Nova S.A.",
    type: "Empresa B2B",
    ruc: "1792458921001",
    email: "cmendoza@constructoranova.ec",
    phone: "+593 99 234 5678",
    activeCases: 4,
    plan: "Plan Corporativo Pro",
    status: "Al día",
    assignedLawyer: "Dra. Valeria Santamaría",
  },
  {
    id: "cl-02",
    name: "Farmacias del Sol Cía. Ltda.",
    type: "Empresa B2B",
    ruc: "0992384102001",
    email: "legal@farmaciasdelsol.com",
    phone: "+593 98 456 7890",
    activeCases: 2,
    plan: "Retainer Legal",
    status: "Al día",
    assignedLawyer: "Abg. Diego Alarcón",
  },
  {
    id: "cl-03",
    name: "Industrias Lácteas Andinas S.A.",
    type: "Empresa B2B",
    ruc: "1790123847001",
    email: "gerencia@lacteasandinas.com",
    phone: "+593 99 112 3344",
    activeCases: 3,
    plan: "Plan Corporativo Pro",
    status: "Auditoría en curso",
    assignedLawyer: "Abg. Marcelo Viteri",
  },
  {
    id: "cl-04",
    name: "Sra. Carmen Salazar",
    type: "Persona Natural",
    ruc: "1714589201",
    email: "carmen.salazar@gmail.com",
    phone: "+593 99 887 6655",
    activeCases: 1,
    plan: "Caso Individual",
    status: "Al día",
    assignedLawyer: "Abg. Marcelo Viteri",
  },
];

// Mock Lawyers
interface Lawyer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  activeCasesCount: number;
  courtHearingsMonth: number;
  rating: number;
  status: "Disponible" | "En Audiencia" | "Sobrecargado";
  avatar: string;
}

const mockLawyers: Lawyer[] = [
  {
    id: "law-01",
    name: "Dra. Valeria Santamaría",
    role: "Socia Directora / Litigante",
    specialty: "Derecho Civil, Mercantil & Arbitraje",
    activeCasesCount: 18,
    courtHearingsMonth: 6,
    rating: 4.9,
    status: "Disponible",
    avatar: "VS",
  },
  {
    id: "law-02",
    name: "Abg. Diego Alarcón",
    role: "Socio / Especialista Contencioso",
    specialty: "Constitucional & Administrativo",
    activeCasesCount: 14,
    courtHearingsMonth: 4,
    rating: 4.8,
    status: "En Audiencia",
    avatar: "DA",
  },
  {
    id: "law-03",
    name: "Abg. Marcelo Viteri",
    role: "Coordinador Laboral & Mediador",
    specialty: "Derecho Laboral & Seguridad Social",
    activeCasesCount: 12,
    courtHearingsMonth: 3,
    rating: 4.9,
    status: "Disponible",
    avatar: "MV",
  },
  {
    id: "law-04",
    name: "Dra. Sofía Montenegro",
    role: "Abogada Asociada",
    specialty: "Derecho Corporativo & Compliance",
    activeCasesCount: 9,
    courtHearingsMonth: 2,
    rating: 4.7,
    status: "Disponible",
    avatar: "SM",
  },
];

type ActiveTab = "dashboard" | "expedientes" | "clientes" | "abogados" | "buzon_ia" | "crm" | "configuracion";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search & Filters
  const [searchGlobal, setSearchGlobal] = useState("");
  const [dateRange, setDateRange] = useState("octubre_2026");
  const [caseFilterStatus, setCaseFilterStatus] = useState("todos");
  const [selectedCaseModal, setSelectedCaseModal] = useState<DemoCase | null>(null);

  // CRM State
  const [leads, setLeads] = useState<DemoLead[]>(demoLeads);
  const [leadFilter, setLeadFilter] = useState("todos");

  // Providencias IA State
  const [providencia, setProvidencia] = useState<JudicialNotificationAI>(judicialNotificationAIDemo);
  const [providenciaValidated, setProvidenciaValidated] = useState(false);

  // Notifications toggle mock
  const [showNotifications, setShowNotifications] = useState(false);

  const updateLeadStatus = (id: string, newStatus: DemoLead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  const filteredCases = demoCases.filter((c) => {
    const matchesFilter =
      caseFilterStatus === "todos"
        ? true
        : caseFilterStatus === "en_tramite"
        ? c.status === "En trámite"
        : caseFilterStatus === "audiencia"
        ? c.status === "Audiencia programada"
        : caseFilterStatus === "sentencia"
        ? c.status === "Para sentencia"
        : true;

    const matchesSearch =
      searchGlobal.trim() === ""
        ? true
        : c.code.toLowerCase().includes(searchGlobal.toLowerCase()) ||
          c.title.toLowerCase().includes(searchGlobal.toLowerCase()) ||
          c.client.toLowerCase().includes(searchGlobal.toLowerCase()) ||
          c.assignedLawyer.toLowerCase().includes(searchGlobal.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const filteredLeads = leads.filter((l) => {
    const matchesFilter = leadFilter === "todos" ? true : l.status === leadFilter;
    const matchesSearch =
      searchGlobal.trim() === ""
        ? true
        : l.name.toLowerCase().includes(searchGlobal.toLowerCase()) ||
          l.area.toLowerCase().includes(searchGlobal.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0c1015] text-slate-200 flex font-sans antialiased selection:bg-blue-600/30 selection:text-blue-200">
      {/* ─── SIDEBAR ──────────────────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-[#131a20] border-r border-[#222c36] flex flex-col transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "w-20" : "w-64"
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Brand / Logo Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#222c36]">
          {!sidebarCollapsed ? (
            <Link href="/admin" className="flex items-center space-x-2.5 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-[#c99a5b]/40 bg-slate-900 flex items-center justify-center shadow-lg shadow-black/40 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="VIS LEGAL"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight">
                <span className="font-bold text-sm tracking-wide text-white block">VIS LEGAL</span>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  Admin Console
                </span>
              </div>
            </Link>
          ) : (
            <div className="mx-auto w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Gavel className="w-5 h-5 text-white" />
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#19222a] transition-all"
            title={sidebarCollapsed ? "Expandir menú" : "Colapsar menú"}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {[
            { id: "dashboard", label: "Dashboard General", icon: LayoutDashboard, badge: null },
            { id: "expedientes", label: "Expedientes & Causas", icon: Briefcase, badge: "3" },
            { id: "clientes", label: "Clientes & B2B", icon: Building2, badge: "4" },
            { id: "abogados", label: "Abogados & Asignaciones", icon: Users, badge: null },
            { id: "buzon_ia", label: "Buzón Providencias IA", icon: Bot, badge: "SATJE" },
            { id: "crm", label: "CRM Leads Landing", icon: Filter, badge: leads.filter(l => l.status === "Nuevo").length.toString() },
            { id: "configuracion", label: "Configuración Firma", icon: Settings, badge: null },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as ActiveTab);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
                  isActive
                    ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-600/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#19222a]"
                } ${sidebarCollapsed ? "justify-center" : ""}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                {!sidebarCollapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      item.badge === "SATJE"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer / User Profile & Client View Link */}
        <div className="p-3 border-t border-[#222c36] bg-[#0f141a]">
          {!sidebarCollapsed ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl bg-[#182029] border border-[#263342]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                  PA
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">Dr. Pablo Andrade</p>
                  <p className="text-[10px] text-slate-400 font-mono truncate">Admin Principal</p>
                </div>
              </div>

              <Link
                href="/app/demo?role=cliente"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-semibold text-slate-300 bg-[#19222a] hover:bg-[#202b35] hover:text-white transition-all border border-[#2b3949] active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>Vista Cliente</span>
                </span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black text-xs flex items-center justify-center" title="Dr. Pablo Andrade">
                PA
              </div>
              <Link
                href="/app/demo?role=cliente"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#19222a]"
                title="Cambiar a Vista Cliente"
              >
                <Eye className="w-4 h-4 text-blue-400" />
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* ─── MOBILE BACKDROP ─────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* ─── MAIN CONTENT AREA ──────────────────────────────────────────── */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {/* TOP BAR / HEADER */}
        <header className="sticky top-0 z-20 h-16 bg-[#131a20]/90 backdrop-blur-md border-b border-[#222c36] px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#19222a] md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Universal Search */}
            <div className="relative w-48 sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar causa, cliente, juicio o SATJE..."
                value={searchGlobal}
                onChange={(e) => setSearchGlobal(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#182029] border border-[#2a3746] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Date Range Selector */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#182029] border border-[#2a3746] text-xs text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent text-xs font-semibold focus:outline-none text-white cursor-pointer"
              >
                <option value="octubre_2026" className="bg-[#182029]">Octubre 2026</option>
                <option value="q4_2026" className="bg-[#182029]">Q4 - 2026</option>
                <option value="anual_2026" className="bg-[#182029]">Año Judicial 2026</option>
              </select>
            </div>

            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-slate-300 hover:text-white bg-[#182029] hover:bg-[#202b37] border border-[#2a3746] transition-all active:scale-95"
                title="Notificaciones y Alertas"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              </button>

              {/* Notifications Popup */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#182029] border border-[#2a3746] shadow-2xl p-4 z-50 animate-scale-in">
                  <div className="flex items-center justify-between border-b border-[#2a3746] pb-2.5 mb-2.5">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Alertas SATJE & Notificaciones
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400">2 nuevas</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#131a20] border border-[#263342]">
                      <p className="font-bold text-blue-300 text-[11px]">Providencia Auto Interlocutorio</p>
                      <p className="text-[11px] text-slate-300 mt-0.5">Causa 17230-2026-00891 (Término 3 días)</p>
                      <span className="text-[9px] font-mono text-slate-400 mt-1 block">Hace 2 horas</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#131a20] border border-[#263342]">
                      <p className="font-bold text-emerald-400 text-[11px]">Nuevo Lead Corporativo</p>
                      <p className="text-[11px] text-slate-300 mt-0.5">Dra. Patricia Cevallos (Derecho Corporativo)</p>
                      <span className="text-[9px] font-mono text-slate-400 mt-1 block">Hace 15 minutos</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Link back to public site */}
            <Link
              href="/"
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-[#182029] hover:bg-[#202b37] border border-[#2a3746] transition-all active:scale-95"
              title="Volver a la Web Principal"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* ─── BODY VIEW CONTENT ────────────────────────────────────────── */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">

          {/* TAB 1: DASHBOARD GENERAL */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              {/* Header Title & Quick Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-[#131a20] border border-[#222c36] shadow-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      SISTEMA ACTIVO • SATJE SYNC
                    </span>
                    <span className="text-slate-400 text-xs">• Quito, Ecuador</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Panel de Control y Litigio Estratégico
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Supervisión integral de causas judiciales, audiencias, clientes corporativos y providencias automatizadas con IA.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("expedientes")}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-blue-600/30 flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nueva Causa</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("buzon_ia")}
                    className="px-3.5 py-2 rounded-xl bg-[#19222a] hover:bg-[#222d38] border border-[#2d3a4b] text-slate-200 font-semibold text-xs transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <Bot className="w-3.5 h-3.5 text-blue-400" />
                    <span>Providencias IA</span>
                  </button>
                </div>
              </div>

              {/* 4 Metric KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#182029] border border-[#263342] shadow-md hover:border-blue-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                      Causas Activas
                    </span>
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <Briefcase className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-3xl font-extrabold text-white">43</p>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-400 font-medium">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+8 este trimestre</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#182029] border border-[#263342] shadow-md hover:border-amber-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                      Audiencias Esta Semana
                    </span>
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Gavel className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-3xl font-extrabold text-amber-300">5</p>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-amber-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Próxima: Jueves 29 Oct</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#182029] border border-[#263342] shadow-md hover:border-indigo-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                      Leads CRM Landing
                    </span>
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Filter className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-3xl font-extrabold text-white">{leads.length}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-indigo-400 font-medium">
                      <span>{leads.filter(l => l.status === "Nuevo").length} pendientes contacto</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#182029] border border-[#263342] shadow-md hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                      Facturación / Retainers
                    </span>
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-3xl font-extrabold text-white">$14,850</p>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>96% de cobranza efectiva</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Column Section: Providencia Alert + Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Critical Providencia IA Card (2 cols) */}
                <div className="lg:col-span-2 p-5 sm:p-6 rounded-3xl bg-[#131a20] border border-[#222c36] shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Alerta de Providencia Judicial Inteligente</h3>
                        <p className="text-[11px] text-slate-400">SATJE Casillero Judicial • Procesado por Antigravity AI Engine</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      Término Perentorio: 3 Días
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#182029] border border-[#263342] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-mono font-bold text-blue-400">Causa: {providencia.processNumber}</span>
                      <span className="text-slate-400 text-[11px]">{providencia.court}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed bg-[#131a20] p-3 rounded-xl border border-[#222c36]">
                      &quot;{providencia.aiSummary}&quot;
                    </p>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[11px]">Vence: <strong className="text-amber-300">{providencia.deadlineExpiration}</strong></span>
                      </div>
                      <button
                        onClick={() => setActiveTab("buzon_ia")}
                        className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                      >
                        <span>Gestionar en Buzón IA</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Team Status / Assigned Litigants (1 col) */}
                <div className="p-5 sm:p-6 rounded-3xl bg-[#131a20] border border-[#222c36] shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" /> Abogados Litigantes
                    </h3>
                    <button
                      onClick={() => setActiveTab("abogados")}
                      className="text-[11px] text-blue-400 hover:text-blue-300 font-bold"
                    >
                      Ver todos
                    </button>
                  </div>

                  <div className="space-y-3">
                    {mockLawyers.slice(0, 3).map((law) => (
                      <div
                        key={law.id}
                        className="p-3 rounded-xl bg-[#182029] border border-[#263342] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 font-bold text-xs flex items-center justify-center border border-blue-500/30">
                            {law.avatar}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{law.name}</p>
                            <p className="text-[10px] text-slate-400 truncate max-w-[140px]">{law.specialty}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                          {law.activeCasesCount} causas
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table of Critical Cases */}
              <div className="rounded-3xl bg-[#131a20] border border-[#222c36] overflow-hidden shadow-xl">
                <div className="p-4 sm:p-5 border-b border-[#222c36] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#161e27]">
                  <div>
                    <h3 className="font-bold text-sm text-white">Causas en Seguimiento Prioritario</h3>
                    <p className="text-[11px] text-slate-400">Sincronización SATJE y control de términos perentorios</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("expedientes")}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Ver catálogo completo de expedientes</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-[#222c36]">
                  {demoCases.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#182029] transition-colors cursor-pointer"
                      onClick={() => setSelectedCaseModal(c)}
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono font-bold text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                            {c.code}
                          </span>
                          <span className="font-bold text-xs text-white">{c.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-[#222c36] text-slate-300">
                            {c.area}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Cliente: <strong className="text-slate-200">{c.client}</strong> • Asignado a: <span className="text-slate-300">{c.assignedLawyer}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            c.status === "Audiencia programada"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : c.status === "Para sentencia"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          }`}
                        >
                          {c.status}
                        </span>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#19222a] border border-[#2b3847]">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXPEDIENTES & CAUSAS */}
          {activeTab === "expedientes" && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 sm:p-6 rounded-3xl bg-[#131a20] border border-[#222c36] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
                    Gestión Integral • Módulo de Expedientes
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Expedientes Judiciales y Causas Activas
                  </h2>
                  <p className="text-xs text-slate-400">
                    Control de juicios ordinarios, acciones constitucionales, controversias laborales y términos procesales.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center p-1 rounded-2xl bg-[#0a0e13] border border-[#222c36] text-[10px] font-semibold">
                    {[
                      { key: "todos", label: "Todos" },
                      { key: "en_tramite", label: "En Trámite" },
                      { key: "audiencia", label: "Audiencias" },
                      { key: "sentencia", label: "Sentencia" },
                    ].map((st) => (
                      <button
                        key={st.key}
                        onClick={() => setCaseFilterStatus(st.key)}
                        className={`px-3 py-1.5 rounded-xl transition-all capitalize whitespace-nowrap ${
                          caseFilterStatus === st.key
                            ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cases List */}
              <div className="rounded-3xl bg-[#131a20] border border-[#222c36] overflow-hidden shadow-xl divide-y divide-[#222c36]">
                {filteredCases.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 hover:bg-[#182029] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          {c.code}
                        </span>
                        <h4 className="font-bold text-sm text-white">{c.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-[#222c36] text-slate-300">
                          {c.area}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            c.status === "Audiencia programada"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : c.status === "Para sentencia"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          }`}
                        >
                          {c.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-400 pt-1">
                        <div>
                          <span className="text-[10px] uppercase font-mono block text-slate-400">Cliente</span>
                          <span className="text-white font-medium">{c.client}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono block text-slate-400">Abogado Asignado</span>
                          <span className="text-slate-200">{c.assignedLawyer}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono block text-slate-400">Próximo Hito / Evento</span>
                          <span className="text-amber-300 font-medium">{c.nextEventDate}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 italic bg-[#0f141a] p-2.5 rounded-xl border border-[#202b37]">
                        📌 {c.nextEventDescription}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
                      <button
                        onClick={() => setSelectedCaseModal(c)}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs active:scale-95 transition-all shadow-md shadow-blue-600/30 flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver Expediente</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CLIENTES & EMPRESAS B2B */}
          {activeTab === "clientes" && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 sm:p-6 rounded-3xl bg-[#131a20] border border-[#222c36] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
                    Directorio Corporativo • Clientes & B2B
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Empresas con Retainer y Clientes Particulares
                  </h2>
                  <p className="text-xs text-slate-400">
                    Control de contratos corporativos, asesoría preventiva, causas vinculadas y estados de cuenta.
                  </p>
                </div>

                <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-blue-600/30 flex items-center gap-1.5 self-start md:self-auto">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nuevo Cliente Corporativo</span>
                </button>
              </div>

              {/* Client Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockB2BClients.map((cl) => (
                  <div
                    key={cl.id}
                    className="p-5 rounded-3xl bg-[#182029] border border-[#263342] shadow-xl hover:border-blue-500/40 transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                          {cl.type === "Empresa B2B" ? <Building2 className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white">{cl.name}</h4>
                          <span className="text-[10px] font-mono text-slate-400">RUC/CI: {cl.ruc}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        {cl.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-[#131a20] p-3 rounded-2xl border border-[#222c36]">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-400 block">Plan Legal</span>
                        <span className="font-semibold text-blue-300">{cl.plan}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-400 block">Causas Activas</span>
                        <span className="font-semibold text-white">{cl.activeCases} expedientes</span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-[#222c36]">
                        <span className="text-[10px] uppercase font-mono text-slate-400 block">Abogado Líder</span>
                        <span className="text-slate-300 text-[11px]">{cl.assignedLawyer}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-blue-400" /> {cl.phone}
                        </span>
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 font-bold text-xs flex items-center gap-1">
                        <span>Ver Ficha</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ABOGADOS & ASIGNACIONES */}
          {activeTab === "abogados" && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 sm:p-6 rounded-3xl bg-[#131a20] border border-[#222c36] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
                    Equipo Jurídico • Capacidad Operativa
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Socios, Abogados Litigantes y Especialistas
                  </h2>
                  <p className="text-xs text-slate-400">
                    Carga procesal por profesional, audiencias agendadas en juzgados y evaluación de satisfacción.
                  </p>
                </div>

                <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-blue-600/30 flex items-center gap-1.5 self-start md:self-auto">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Registrar Abogado</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockLawyers.map((law) => (
                  <div
                    key={law.id}
                    className="p-5 rounded-3xl bg-[#182029] border border-[#263342] shadow-xl space-y-4 hover:border-blue-500/40 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-blue-600/20">
                          {law.avatar}
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            law.status === "Disponible"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {law.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-white">{law.name}</h4>
                        <p className="text-[11px] text-blue-400 font-medium">{law.role}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{law.specialty}</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#263342] text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Causas en patrocinio:</span>
                        <strong className="text-white font-mono">{law.activeCasesCount}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Audiencias este mes:</span>
                        <strong className="text-amber-300 font-mono">{law.courtHearingsMonth}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Satisfacción cliente:</span>
                        <strong className="text-emerald-400 font-mono">⭐ {law.rating} / 5.0</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BUZÓN PROVIDENCIAS IA */}
          {activeTab === "buzon_ia" && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 sm:p-6 rounded-3xl bg-[#131a20] border border-[#222c36] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      INTELIGENCIA JUDICIAL • SATJE SCRAPER
                    </span>
                    <span className="text-slate-400 text-xs">• Función Judicial Ecuador</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Buzón de Providencias y Autos Judiciales con IA
                  </h2>
                  <p className="text-xs text-slate-400">
                    Extracción de texto PDF oficial, detección de términos perentorios y sugerencia de estrategia de contestación.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setProvidenciaValidated(!providenciaValidated)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-md flex items-center gap-1.5 ${
                      providenciaValidated
                        ? "bg-emerald-600 text-white shadow-emerald-600/30"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{providenciaValidated ? "Validado por Abogado" : "Validar y Cargar al Expediente"}</span>
                  </button>
                </div>
              </div>

              {/* Main Providencia Detail Box */}
              <div className="p-6 rounded-3xl bg-[#182029] border border-[#263342] shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#263342] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                        {providencia.processNumber}
                      </span>
                      <span className="font-bold text-sm text-white">{providencia.aiClassification}</span>
                    </div>
                    <p className="text-xs text-slate-400">{providencia.court}</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-mono text-slate-400 block">Recepción en Casillero:</span>
                    <span className="text-xs font-bold text-white">{providencia.receiptTimestamp}</span>
                  </div>
                </div>

                {/* Deadline Alert Banner */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-amber-300">
                      Término Perentorio Detectado: {providencia.detectedDeadlineDays} Días
                    </h4>
                    <p className="text-xs text-slate-300">
                      Vencimiento improrrogable: <strong className="text-white">{providencia.deadlineExpiration}</strong>.
                      La falta de contestación causará preclusión del derecho procesal.
                    </p>
                  </div>
                </div>

                {/* Two Panels: AI Summary and Suggested Legal Action */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#131a20] border border-[#222c36] space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-blue-400 block">
                      Síntesis de la Providencia (IA)
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {providencia.aiSummary}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#131a20] border border-[#222c36] space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block">
                      Acción Legal Sugerida
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {providencia.suggestedAction}
                    </p>
                  </div>
                </div>

                {/* Document attachment info */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-[#263342]">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Archivo fuente: <strong className="text-slate-300">{providencia.sourceDoc}</strong></span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    {providenciaValidated ? "● Expediente actualizado" : "○ Pendiente de firma de abogado"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CRM LEADS */}
          {activeTab === "crm" && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 sm:p-6 rounded-3xl bg-[#131a20] border border-[#222c36] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
                    Pipeline Comercial • CRM de Prospectos
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Solicitudes de Asesoría Legal del Landing
                  </h2>
                  <p className="text-xs text-slate-400">
                    Captación omnicanal (Formulario Web, Instagram, Referidos y App Móvil) para conversión a clientes.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0a0e13] border border-[#222c36] text-[10px] font-semibold overflow-x-auto">
                  {["todos", "Nuevo", "Contactado", "Consulta Agendada", "Contratado"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setLeadFilter(st)}
                      className={`px-3 py-1.5 rounded-xl transition-all capitalize whitespace-nowrap ${
                        leadFilter === st
                          ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leads Table */}
              <div className="rounded-3xl bg-[#131a20] border border-[#222c36] overflow-hidden shadow-xl divide-y divide-[#222c36]">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 hover:bg-[#182029] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-white">{lead.name}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#222c36] text-blue-300">
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
                          Canal: {lead.source || "Web"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-slate-400 text-xs">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-blue-400" />
                          <span>{lead.phone}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-blue-400" />
                          <span>{lead.email}</span>
                        </span>
                        <span>•</span>
                        <span className="text-slate-400">Ingreso: {lead.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as DemoLead["status"])}
                        className="px-3 py-1.5 rounded-xl bg-[#0a0e13] border border-[#2a3746] text-blue-300 text-xs font-semibold focus:outline-none focus:border-blue-500"
                      >
                        <option value="Nuevo">Nuevo</option>
                        <option value="Contactado">Contactado</option>
                        <option value="Consulta Agendada">Consulta Agendada</option>
                        <option value="Contratado">Contratado</option>
                      </select>

                      <button
                        onClick={() => updateLeadStatus(lead.id, "Contratado")}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs active:scale-95 shadow-md shadow-blue-600/30 transition-all flex items-center gap-1"
                        title="Convertir prospecto en cliente formal"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Aprobar Cliente</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CONFIGURACIÓN FIRMA */}
          {activeTab === "configuracion" && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div className="p-5 sm:p-6 rounded-3xl bg-[#131a20] border border-[#222c36] shadow-xl">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
                  Ajustes Globales • Firma Legal
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  Parámetros de la Firma y Conexión SATJE
                </h2>
                <p className="text-xs text-slate-400">
                  Configuración de notificaciones electrónicas, credenciales del casillero judicial y modelos IA.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#182029] border border-[#263342] shadow-xl space-y-5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" /> Parámetros del Casillero Judicial
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 text-[11px] font-semibold mb-1">
                      Casillero Judicial Electrónico (SATJE)
                    </label>
                    <input
                      type="text"
                      defaultValue="09-1723-CJ-QUITO"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#131a20] border border-[#263342] text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] font-semibold mb-1">
                      Email de Notificaciones de Providencias
                    </label>
                    <input
                      type="email"
                      defaultValue="notificaciones@vislegal.ec"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#131a20] border border-[#263342] text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white text-xs">Sincronización Automática con SATJE</p>
                      <p className="text-[10px] text-slate-400">Consultar nuevas providencias cada 30 minutos</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ACTIVA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ─── CASE DETAIL MODAL ────────────────────────────────────────────── */}
      {selectedCaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl rounded-3xl bg-[#182029] border border-[#2d3a4b] shadow-2xl overflow-hidden p-6 space-y-5 animate-scale-in">
            <div className="flex items-start justify-between border-b border-[#263342] pb-4">
              <div className="space-y-1">
                <span className="font-mono font-bold text-xs text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                  {selectedCaseModal.code}
                </span>
                <h3 className="font-bold text-base text-white mt-1">{selectedCaseModal.title}</h3>
                <p className="text-xs text-slate-400">{selectedCaseModal.area}</p>
              </div>
              <button
                onClick={() => setSelectedCaseModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#131a20] border border-[#222c36]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-[#131a20] p-4 rounded-2xl border border-[#222c36]">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Cliente Patrocinado</span>
                <strong className="text-white">{selectedCaseModal.client}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Abogado Litigante</span>
                <span className="text-slate-200">{selectedCaseModal.assignedLawyer}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Fase Procesal</span>
                <span className="text-blue-300 font-semibold">{selectedCaseModal.stage}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Documentos Vinculados</span>
                <span className="text-slate-200 font-mono">{selectedCaseModal.documentsCount} fojas / actas</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#131a20] border border-[#222c36] space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block">
                Próxima Actuación Procesal
              </span>
              <p className="text-xs text-slate-200">
                <strong>{selectedCaseModal.nextEventDate}</strong>: {selectedCaseModal.nextEventDescription}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedCaseModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-[#131a20] border border-[#263342] transition-all"
              >
                Cerrar
              </button>
              <button
                onClick={() => setSelectedCaseModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-600/30"
              >
                Actualizar Actuación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
