"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  MessageSquare,
  Calendar,
  Scale,
  Download,
  User,
  Shield,
  Layers,
  Bell,
  Menu,
  X,
  Search,
  FileText,
  CheckCircle2,
  Apple,
  Play,
  Smartphone,
  GraduationCap,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Clock,
  Briefcase,
  Database,
  Building2,
  Check,
  CreditCard,
  Users,
  Activity,
  DollarSign,
  TrendingUp,
  Cpu,
  Lock,
  ArrowUpRight,
  FileCheck,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import ClientView from "./ClientView";
import ClientPortal from "./ClientPortal";
import LawyerFieldPanel from "./LawyerFieldPanel";
import LawyerJudicialInbox from "./LawyerJudicialInbox";
import CRMView from "./CRMView";
import LegalAIAssistant from "./LegalAIAssistant";
import ChatInterface from "./ChatInterface";
import LegalConsultationModal from "../LegalConsultationModal";
import CaseDetailModal from "./CaseDetailModal";
import { initialCases, premiumTrainings, AppCase } from "@/data/appState";
import { checkSupabaseConnection, SupabaseHealth } from "@/lib/supabase";

export type UserRole = "admin" | "abogado" | "cliente" | "b2b";
export type SubscriptionTier = "gratis" | "premium";

type AppTab =
  | "dashboard"
  | "casos"
  | "buzon"
  | "ai"
  | "chat"
  | "crm"
  | "agenda"
  | "premium"
  | "b2b"
  | "supabase";

export default function MobileAppShell({ initialRole = "cliente", demoMode = false }: { initialRole?: UserRole; demoMode?: boolean } = {}) {
  const { theme, toggle: toggleTheme } = useTheme();
  const [role, setRole] = useState<UserRole>(initialRole);
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>("premium");
  const [activeTab, setActiveTab] = useState<AppTab>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showSupabaseModal, setShowSupabaseModal] = useState(false);
  const [installTab, setInstallTab] = useState<"pwa" | "stores">("pwa");
  const [selectedCase, setSelectedCase] = useState<AppCase | null>(null);
  const [supabaseHealth, setSupabaseHealth] = useState<SupabaseHealth | null>(null);

  useEffect(() => {
    if (demoMode) return;
    checkSupabaseConnection().then(setSupabaseHealth);
  }, [demoMode]);

  const navigationItems = [
    {
      id: "dashboard" as AppTab,
      label: "Panel Principal",
      icon: LayoutDashboard,
      badge: null,
      roles: ["cliente", "abogado", "admin", "b2b"],
    },
    {
      id: "casos" as AppTab,
      label: role === "cliente" ? "Mis Juicios & Causas" : "Expedientes Judiciales",
      icon: FolderKanban,
      badge: role === "b2b" ? "14 Causas" : "2 Activos",
      roles: ["cliente", "abogado", "admin", "b2b"],
    },
    {
      id: "buzon" as AppTab,
      label: "Buzón Notificaciones IA",
      icon: Sparkles,
      badge: "1 Urgente",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      roles: ["cliente", "abogado", "admin", "b2b"],
    },
    {
      id: "ai" as AppTab,
      label: "Agente Gemini Legal AI",
      icon: Cpu,
      badge: "Gemini 1.5",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      roles: ["cliente", "abogado", "admin", "b2b"],
    },
    {
      id: "chat" as AppTab,
      label: "Despacho & Chat Cifrado",
      icon: MessageSquare,
      badge: "1 Nuevo",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      roles: ["cliente", "abogado", "admin", "b2b"],
    },
    {
      id: "crm" as AppTab,
      label: "CRM & Embudo de Leads",
      icon: Layers,
      badge: "6 Leads",
      roles: ["abogado", "admin"],
    },
    {
      id: "agenda" as AppTab,
      label: "Agenda Judicial (Audiencias)",
      icon: Calendar,
      badge: null,
      roles: ["cliente", "abogado", "admin", "b2b"],
    },
    {
      id: "premium" as AppTab,
      label: "Comunidad & Formación",
      icon: GraduationCap,
      badge: subscriptionTier === "premium" ? "VIP" : "Gratis",
      roles: ["cliente", "abogado", "admin"],
    },
    {
      id: "b2b" as AppTab,
      label: "Portal Corporativo B2B",
      icon: Building2,
      badge: "Multi-Tenant",
      roles: ["admin", "b2b"],
    },
  ];

  const filteredNav = navigationItems.filter((item) =>
    item.roles.includes(role)
  );

  const roleStyles = {
    cliente: {
      activeBg: "bg-blue-600",
      activeText: "text-blue-400",
      badgeBg: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      dot: "bg-blue-500",
      gradient: "from-blue-600 to-indigo-700",
      label: "Cliente",
    },
    abogado: {
      activeBg: "bg-amber-600",
      activeText: "text-amber-400",
      badgeBg: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      dot: "bg-amber-500",
      gradient: "from-amber-600 to-amber-700",
      label: "Abogado",
    },
    admin: {
      activeBg: "bg-purple-600",
      activeText: "text-purple-400",
      badgeBg: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      dot: "bg-purple-500",
      gradient: "from-purple-600 to-indigo-800",
      label: "Administrador",
    },
    b2b: {
      activeBg: "bg-emerald-600",
      activeText: "text-emerald-400",
      badgeBg: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      dot: "bg-emerald-500",
      gradient: "from-emerald-600 to-teal-700",
      label: "Empresa B2B",
    },
  };
  const roleConfig = roleStyles[role];

  return (
    <div className="app-private app-shell min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col font-sans selection:bg-[var(--vis-gold)]/30 selection:text-[var(--vis-gold-soft)] transition-colors duration-200">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none ambient-top -z-10" />

      {/* ========================================================================= */}
      {/* 🚀 BARRA MAESTRA DE ROLES & SISTEMA (VISIBLE EN MOVIL Y DESKTOP) */}
      {/* ========================================================================= */}
      <div className="app-topbar sticky top-0 z-40 glass border-b border-[var(--border)] px-3 py-2 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Left: Role indicator label */}
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-slate-400 uppercase tracking-wider text-[10px] font-mono">
                Rol Activo:
              </span>
            </div>

            {/* Honest runtime state: demo never presents a fake cloud connection. */}
            {demoMode ? (
              <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/30 text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Demo local</span>
              </span>
            ) : (
              <button
                onClick={() => setShowSupabaseModal(true)}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold transition-all active:scale-95"
                title="Ver estado de conexión Supabase PostgreSQL 16"
              >
                <Database className="w-3 h-3 text-emerald-400" />
                <span>{supabaseHealth ? `Supabase ${supabaseHealth.latencyMs}ms` : "Supabase verificando"}</span>
              </button>
            )}
          </div>

          {/* Center: 4 Prominent Role Buttons */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-950 border border-slate-700/80 w-full sm:w-auto overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => {
                setRole("cliente");
                if (activeTab === "crm" || activeTab === "b2b") setActiveTab("dashboard");
              }}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl transition-all duration-150 flex items-center justify-center space-x-1.5 whitespace-nowrap active:scale-95 ${
                role === "cliente"
                  ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30 ring-1 ring-blue-400/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Cliente</span>
            </button>

            <button
              onClick={() => {
                setRole("abogado");
                if (activeTab === "b2b") setActiveTab("dashboard");
              }}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl transition-all duration-150 flex items-center justify-center space-x-1.5 whitespace-nowrap active:scale-95 ${
                role === "abogado"
                  ? "bg-amber-600 text-white font-bold shadow-md shadow-amber-600/30 ring-1 ring-amber-400/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Abogado</span>
            </button>

            <button
              onClick={() => setRole("admin")}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl transition-all duration-150 flex items-center justify-center space-x-1.5 whitespace-nowrap active:scale-95 ${
                role === "admin"
                  ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30 ring-1 ring-purple-400/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            <button
              onClick={() => {
                setRole("b2b");
                setActiveTab("b2b");
              }}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl transition-all duration-150 flex items-center justify-center space-x-1.5 whitespace-nowrap active:scale-95 ${
                role === "b2b"
                  ? "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400/50"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B Empresas</span>
            </button>
          </div>

          {/* Right: Plan Toggle & iOS Theme Switcher */}
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            {role === "cliente" && (
              <div className="flex items-center space-x-1.5 bg-slate-950 dark:bg-black/80 light:bg-slate-100 p-1 rounded-2xl border border-slate-700/80 dark:border-white/10 light:border-black/10 text-[11px] font-semibold">
                <span className="text-[10px] text-slate-400 px-1 font-mono uppercase">Plan:</span>
                <button
                  onClick={() => setSubscriptionTier("gratis")}
                  className={`px-2.5 py-1 rounded-xl transition-all ${
                    subscriptionTier === "gratis"
                      ? "bg-slate-700 text-white font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Gratis
                </button>
                <button
                  onClick={() => setSubscriptionTier("premium")}
                  className={`px-2.5 py-1 rounded-xl transition-all flex items-center space-x-1 ${
                    subscriptionTier === "premium"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-sm"
                      : "text-amber-400/80 hover:text-amber-300"
                  }`}
                >
                  <span>⭐ VIP</span>
                </button>
              </div>
            )}

            {/* iOS Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 px-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 dark:bg-neutral-900 dark:border-white/15 dark:hover:bg-neutral-800 light:bg-white light:border-black/10 light:text-slate-900 border border-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1.5 transition-all active:scale-95 shadow-sm"
              title={`Cambiar a modo ${theme === "dark" ? "Claro (iOS White)" : "Oscuro (iOS Midnight)"}`}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-mono font-medium hidden sm:inline">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[11px] font-mono font-medium hidden sm:inline">Modo Oscuro</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main SaaS App Container */}
      <div className="flex flex-1 min-h-[calc(100vh-50px)]">
        {/* ========================================================================= */}
        {/* DESKTOP SIDEBAR (lg:flex) */}
        {/* ========================================================================= */}
        <aside className="hidden lg:flex flex-col w-72 shrink-0 glass border-r border-[var(--border)] min-h-full sticky top-[49px] h-[calc(100vh-49px)] z-30 transition-colors duration-200">
          {/* Brand Header */}
          <div className="p-6 border-b border-[var(--border)]">
            <div className="flex items-center space-x-3.5">
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-[#c99a5b]/50 shadow-md bg-slate-900 flex items-center justify-center shrink-0">
                <img
                  src="/logo.png"
                  alt="VIS LEGAL"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <h1 className="font-bold text-sm tracking-wider truncate text-[var(--fg)]">
                    VIS LEGAL
                  </h1>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#c99a5b]/15 text-[#c99a5b] border border-[#c99a5b]/25">
                    PRO
                  </span>
                </div>
                <p className="text-[10px] text-[var(--fg-2)] font-mono tracking-tight truncate">
                  Titular: BIZ LEGAL S.A.S.
                </p>
              </div>
            </div>

            {/* Judicial SATJE Indicator */}
            <div className="mt-4 px-3 py-1.5 rounded-xl bg-[var(--bg-3)] border border-[var(--border)] flex items-center justify-between text-[10px]">
              <span className="text-[var(--fg-2)] font-medium">Judicatura SATJE:</span>
              <span className="flex items-center space-x-1.5 text-emerald-500 dark:text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Conectado (Quito)</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <div className="flex items-center justify-between px-3 py-1.5 mb-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--fg-2)] font-bold">
                {role === "cliente" ? "Mi Portal Legal" : role === "abogado" ? "Despacho Litigante" : role === "b2b" ? "Sede Corporativa" : "Control Central"}
              </span>
              <span className={`w-2 h-2 rounded-full ${roleConfig.dot}`}></span>
            </div>

            {filteredNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 active:scale-[0.98] ${
                    isActive
                      ? `${roleConfig.activeBg} text-white font-semibold shadow-sm`
                      : "text-[var(--fg-1)] hover:text-[var(--fg)] hover:bg-[var(--bg-4)]"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-white" : "text-[var(--fg-2)]"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        item.badgeColor ||
                        (isActive
                          ? "bg-white/20 text-white"
                          : "bg-[var(--bg-3)] text-[var(--fg-1)] border border-[var(--border)]")
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile Footer (Clean Apple iOS Style) */}
          <div className="p-4 border-t border-[var(--border)] mt-auto">
            <div className={`p-3 rounded-2xl ${roleConfig.badgeBg} border ${roleConfig.borderColor} transition-all`}>
              <div className="flex items-center space-x-3">
                <div className={`w-9 h-9 rounded-xl ${roleConfig.activeBg} text-white flex items-center justify-center font-bold text-xs shadow-sm`}>
                  {role === "cliente" ? "RA" : role === "abogado" ? "DA" : role === "b2b" ? "CF" : "BL"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[var(--fg)] leading-tight truncate">
                    {role === "cliente"
                      ? "Roberto Andrade"
                      : role === "abogado"
                      ? "Abg. Diego Alarcón"
                      : role === "b2b"
                      ? "Corp. Favorita S.A."
                      : "Admin BIZ LEGAL"}
                  </p>
                  <p className="text-[10px] text-[var(--fg-2)] capitalize truncate mt-0.5">
                    {role === "cliente"
                      ? `Cliente ${subscriptionTier === "premium" ? "• Plan VIP" : "• Plan Básico"}`
                      : role === "abogado"
                      ? "Letrado Patrocinador"
                      : role === "b2b"
                      ? "Tenant Corporativo"
                      : "Gerencia & Finanzas"}
                  </p>
                  {role === "cliente" && (
                    <div className="mt-2 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wide">
                      <span className="text-[var(--fg-2)]">Plan:</span>
                      <span className={`rounded-full px-2 py-0.5 ${subscriptionTier === "premium" ? "bg-amber-500 text-white" : "bg-[var(--bg-3)] text-[var(--fg-1)] border border-[var(--border)]"}`}>
                        {subscriptionTier === "premium" ? "★ VIP" : "Gratis"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* MOBILE SLIDE-OVER DRAWER (< lg) */}
        {/* ========================================================================= */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-72 bg-slate-900 border-r border-slate-800 p-5 flex flex-col z-50">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-white flex items-center justify-center font-bold">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-white">VIS LEGAL</h2>
                    <p className="text-[10px] text-slate-400 font-mono">BIZ LEGAL S.A.S.</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex-1 space-y-1 overflow-y-auto py-4">
                {filteredNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4 text-blue-400" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Mobile Profile & Info */}
              <div className="pt-4 border-t border-slate-800">
                <div className={`p-3 rounded-xl ${roleConfig.badgeBg} border ${roleConfig.borderColor}`}>
                  <p className="text-xs font-semibold text-white">
                    {role === "cliente" ? "Roberto Andrade" : role === "abogado" ? "Abg. Diego Alarcón" : role === "b2b" ? "Corp. Favorita S.A." : "Admin BIZ LEGAL"}
                  </p>
                  <p className="text-[10px] text-slate-400 capitalize mt-0.5">
                    {role === "cliente" ? `Cliente (${subscriptionTier.toUpperCase()})` : roleConfig.label}
                  </p>
                  {role === "cliente" && (
                    <div className="mt-2 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wide">
                      <span className="text-slate-500">Plan:</span>
                      <span className={`rounded-full px-2 py-0.5 ${subscriptionTier === "premium" ? "bg-amber-500 text-white" : "bg-slate-800 text-slate-300 border border-slate-700"}`}>
                        {subscriptionTier === "premium" ? "★ VIP" : "Gratis"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MAIN WORKSPACE CONTENT */}
        {/* ========================================================================= */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar / Global View Header */}
          <header className="app-workspace-header sticky top-[49px] z-20 glass border-b border-[var(--border)] px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 transition-colors duration-200">
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-[var(--bg-3)] border border-[var(--border)] text-[var(--fg-1)] hover:text-[var(--fg)]"
                aria-label="Abrir menú"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Title / Current View */}
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[var(--fg)] flex items-center space-x-2">
                  <span>
                    {activeTab === "dashboard" && "Consola de Operaciones Jurídicas"}
                    {activeTab === "casos" && "Expedientes y Causas Procesales"}
                    {activeTab === "buzon" && "Buzón Notificaciones con IA (COGEP)"}
                    {activeTab === "ai" && "Agente Google Gemini Legal • Ecuador"}
                    {activeTab === "chat" && "Despacho & Mensajería Cifrada"}
                    {activeTab === "crm" && "Embudo de Prospectos & CRM"}
                    {activeTab === "agenda" && "Agenda de Audiencias & Términos"}
                    {activeTab === "premium" && "Comunidad Jurídica & Formación VIP"}
                    {activeTab === "b2b" && "Portal Corporativo Multi-Tenant B2B"}
                    {activeTab === "supabase" && "Consola de Arquitectura Supabase"}
                  </span>
                </h2>
                <p className="text-[11px] text-[var(--fg-2)] hidden sm:block">
                  Sede Judicial: Quito • Corte Nacional de Justicia & Consejos Provinciales
                </p>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              {/* Consultation CTA */}
              <button
                onClick={() => setIsConsultationModalOpen(true)}
                className="px-3.5 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-blue-600/30 active:scale-95 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Nueva Consulta</span>
                <span className="sm:hidden">Consulta</span>
              </button>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setActiveTab("buzon")}
                  className="p-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white relative active:scale-95 transition-all"
                  aria-label="Ver notificaciones judiciales"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                </button>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-24 lg:pb-12">
            {/* TAB: DASHBOARD */}
            {activeTab === "dashboard" && (
              <>
                {role === "cliente" ? (
                  <ClientPortal
                    onOpenConsultation={() => setIsConsultationModalOpen(true)}
                    onOpenChat={() => setActiveTab("chat")}
                    onSelectCase={(c) => setSelectedCase(c)}
                    subscriptionTier={subscriptionTier}
                  />
                ) : role === "abogado" ? (
                  <LawyerFieldPanel
                    onSelectCase={(c) => setSelectedCase(c)}
                    onOpenConsultation={() => setIsConsultationModalOpen(true)}
                  />
                ) : (
                  <div className="space-y-6">
                    {/* Hero Greeting & Stats Card */}
                    <div className={`p-6 sm:p-8 rounded-3xl bg-slate-900/90 border ${roleConfig.borderColor} flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl backdrop-blur-md`}>
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${roleConfig.badgeBg} ${roleConfig.activeText} border ${roleConfig.borderColor}`}>
                        {role === "b2b"
                          ? "Cuenta Corporativa B2B • Multi-Tenant"
                          : "Gerencia General • BIZ LEGAL S.A.S."}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Expedientes Digitales Actualizados
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {role === "b2b"
                        ? "Corporación Favorita S.A. (B2B)"
                        : "Consola de Dirección BIZ LEGAL"}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      {role === "b2b"
                        ? "Gestión centralizada de litigios laborales, cumplimiento societario y revisión preventiva de contratos comerciales."
                        : "Métricas ejecutivas de facturación MRR, tasa de conversión de prospectos y asignación de expedientes."}
                    </p>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
                    <button
                      onClick={() => setActiveTab("buzon")}
                      className={`px-5 py-3 rounded-2xl ${roleConfig.activeBg} text-white font-bold text-xs shadow-lg flex items-center space-x-2 active:scale-95 transition-all`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Notificaciones IA</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("ai")}
                      className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold flex items-center space-x-2 active:scale-95 transition-all"
                    >
                      <Cpu className="w-4 h-4 text-blue-400" />
                      <span>Preguntar a Gemini</span>
                    </button>
                  </div>
                </div>

                {/* 4 Metric KPI Cards (Module 10 Spec for Admin, Case stats for others) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {role === "admin" ? (
                    <>
                      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider">Facturación MRR</span>
                          <DollarSign className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-white">$14,850</p>
                        <p className="text-[11px] text-emerald-400 mt-1">+18.4% este mes</p>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider">Usuarios Activos</span>
                          <Users className="w-4 h-4 text-blue-400" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-white">482</p>
                        <p className="text-[11px] text-slate-400 mt-1">380 Gratis • 102 Premium</p>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider">Conversión Leads</span>
                          <TrendingUp className="w-4 h-4 text-amber-400" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-amber-400">33.3%</p>
                        <p className="text-[11px] text-slate-400 mt-1">Meta mensual superada</p>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider">Causas en Litigio</span>
                          <Activity className="w-4 h-4 text-purple-400" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-white">18</p>
                        <p className="text-[11px] text-slate-400 mt-1">4 Abogados asignados</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={() => setActiveTab("casos")}
                        className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all group shadow-md"
                      >
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider">Causas Activas</span>
                          <FolderKanban className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-white">{role === "b2b" ? "14" : "2"}</p>
                        <p className="text-[11px] text-slate-400 mt-1">Civil y Constitucional</p>
                      </div>

                      <div
                        onClick={() => setActiveTab("buzon")}
                        className="p-5 rounded-2xl bg-slate-900 border border-rose-500/30 hover:border-rose-500/60 cursor-pointer transition-all group shadow-md"
                      >
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider">Término Fatal</span>
                          <Clock className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-rose-400">3 Días</p>
                        <p className="text-[11px] text-rose-300 mt-1">Art. 73 COGEP (Pendiente)</p>
                      </div>

                      <div
                        onClick={() => setActiveTab("chat")}
                        className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all group shadow-md"
                      >
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider">Chat Cifrado</span>
                          <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-emerald-400">1</p>
                        <p className="text-[11px] text-slate-400 mt-1">Mensaje de letrado</p>
                      </div>

                      <div
                        onClick={() => setActiveTab("agenda")}
                        className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all group shadow-md"
                      >
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider">Audiencia Oral</span>
                          <Calendar className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <p className="text-lg sm:text-xl font-black text-blue-400 mt-1">29 Octubre</p>
                        <p className="text-[11px] text-slate-400">09:00 AM • Sala Constitucional</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Dashboard Main Rows */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left 2 Cols: Active Cases */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FolderKanban className="w-4 h-4 text-blue-400" />
                        <h4 className="font-bold text-base text-white">
                          Expedientes Judiciales en Trámite
                        </h4>
                      </div>
                      <button
                        onClick={() => setActiveTab("casos")}
                        className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-1"
                      >
                        <span>Ver todos</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {initialCases.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => setSelectedCase(c)}
                          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-md"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-xs font-bold text-blue-400">
                                {c.code}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                {c.status}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {c.area}
                              </span>
                            </div>
                            <h5 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                              {c.title}
                            </h5>
                            <p className="text-xs text-slate-400">{c.court}</p>
                          </div>

                          <div className="flex items-center space-x-3 self-end sm:self-center shrink-0">
                            <span className="text-[11px] text-slate-400">
                              Etapa: <strong className="text-slate-200">{c.stage}</strong>
                            </span>
                            <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right 1 Col: Urgent Providencia & Quick AI */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <h4 className="font-bold text-base text-white">
                        Alerta Judicial Prioritaria
                      </h4>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-rose-500/30 space-y-4 shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400">
                          Auto Interlocutorio
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300">
                          COGEP Art. 73
                        </span>
                      </div>

                      <h5 className="text-sm font-bold text-white">
                        Causa #17203-2026-00891 • Unidad Judicial Civil
                      </h5>

                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        El juez concede 3 días para aclarar prueba documental. El asistente Gemini ha redactado
                        un borrador de contestación listo para firma.
                      </p>

                      <button
                        onClick={() => setActiveTab("buzon")}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-blue-600/30 active:scale-95"
                      >
                        <span>Gestionar en Buzón IA</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick Access to Gemini Legal AI */}
                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-md">
                      <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold">
                        <Cpu className="w-4 h-4" />
                        <span>Motor Gemini 1.5 Flash</span>
                      </div>
                      <p className="text-xs text-slate-300 font-light">
                        Búsqueda jurídica y redacción legal en CRE, COGEP, COIP, Código Civil y Laboral.
                      </p>
                      <button
                        onClick={() => setActiveTab("ai")}
                        className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center space-x-1.5"
                      >
                        <span>Abrir Asistente Gemini</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

            {/* TAB: CASOS */}
            {activeTab === "casos" && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Expedientes Judiciales y Causas en Trámite
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Visualiza causas procesales, providencias del casillero judicial y etapas del juicio.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-2 active:scale-95 transition-all shadow-md shadow-blue-600/30 self-start sm:self-auto"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Ingresar Nueva Causa</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {initialCases.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCase(c)}
                      className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 cursor-pointer transition-all space-y-4 group shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-blue-400">
                          {c.code}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          {c.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                          {c.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">{c.court}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-800">
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-mono">
                            Materia
                          </span>
                          <span className="font-semibold text-slate-200">{c.area}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-mono">
                            Etapa
                          </span>
                          <span className="font-semibold text-slate-200">{c.stage}</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                        <span>Abogado: {c.assignedLawyer.name}</span>
                        <span className="text-blue-400 font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                          <span>Ver Ficha Completa</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: BUZON NOTIFICACIONES IA (COGEP) */}
            {activeTab === "buzon" && <LawyerJudicialInbox />}

            {/* TAB: AGENTE GEMINI LEGAL AI */}
            {activeTab === "ai" && <LegalAIAssistant />}

            {/* TAB: CHAT CIFRADO */}
            {activeTab === "chat" && (
              <div className="h-[750px]">
                <ChatInterface />
              </div>
            )}

            {/* TAB: CRM LEADS */}
            {activeTab === "crm" && <CRMView />}

            {/* TAB: AGENDA JUDICIAL */}
            {activeTab === "agenda" && (
              <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">
                    Agenda Procesal
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    Próximas Audiencias y Vencimientos de Términos
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Registro consolidado de plazos procesales perentorios y sesiones privadas telemáticas o presenciales.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
                    <div className="flex items-center space-x-3.5">
                      <Clock className="w-5 h-5 text-rose-400 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-rose-200">
                          Vencimiento de Término COGEP (3 días)
                        </p>
                        <p className="text-[11px] text-rose-200/80">
                          Causa #17203-2026-00891 • 28 de Octubre, 18:00
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Urgente
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                    <div className="flex items-center space-x-3.5">
                      <Calendar className="w-5 h-5 text-blue-400 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-white">
                          Audiencia Oral - Acción de Protección #09201-2026-01452
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Corte Provincial del Guayas • Jueves 29 de Octubre, 09:00 AM
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Confirmada
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs active:scale-95 transition-all shadow-md shadow-blue-600/30"
                  >
                    Agendar Nueva Consulta Letrada
                  </button>
                </div>
              </div>
            )}

            {/* TAB: PREMIUM / VIDEOTECA */}
            {activeTab === "premium" && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold block">
                      Comunidad Jurídica Ciudadana
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-0.5">
                      Videoteca & Capacitaciones Exclusivas
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Acceso para clientes a grabaciones de talleres, formatos de contratos y asesoría preventiva.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 self-start sm:self-auto">
                    {subscriptionTier === "premium" ? "Membresía VIP Activa" : "Acceso Gratis Básico"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {premiumTrainings.map((trn) => (
                    <div
                      key={trn.id}
                      className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 shadow-md"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold">
                            {trn.category}
                          </span>
                          <span className="text-slate-400">{trn.duration}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white">
                          {trn.title}
                        </h4>
                        <p className="text-[11px] text-slate-400">Imparte: {trn.instructor}</p>
                        <p className="text-[10px] text-slate-400 flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-blue-400" />
                          <span>{trn.date}</span>
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-blue-400 font-bold flex items-center space-x-1 cursor-pointer hover:underline">
                          <Play className="w-3 h-3 fill-blue-400" />
                          <span>{trn.status === "En vivo" ? "Unirse al En Vivo" : "Ver Grabación"}</span>
                        </span>
                        <span className="text-slate-400 text-[10px] flex items-center space-x-1 cursor-pointer hover:text-white">
                          <Download className="w-3 h-3" />
                          <span>Checklist</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: B2B CORPORATIVO (Module 4 Spec: Multi-Tenant Corporate) */}
            {activeTab === "b2b" && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-5 h-5 text-indigo-400" />
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        Portal B2B • Cuenta Corporativa Multi-Tenant
                      </h3>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Empresa Titular: <strong className="text-indigo-300">Corporación Favorita S.A.</strong> • Tenant ID: <span className="font-mono text-slate-400">b2b_corp_fav_ec</span>
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 self-start sm:self-auto">
                    Plan Enterprise SLA 99.9%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-mono uppercase text-slate-400">Juicios Laborales Empleador</span>
                    <p className="text-2xl font-bold text-white mt-1">9 Causas</p>
                    <p className="text-[11px] text-emerald-400 mt-0.5">8 en etapa de mediación previa</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-mono uppercase text-slate-400">Contratos Comerciales Auditados</span>
                    <p className="text-2xl font-bold text-white mt-1">142</p>
                    <p className="text-[11px] text-blue-400 mt-0.5">Cláusulas arbitrales revisadas</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-mono uppercase text-slate-400">Sub-usuarios Corporativos</span>
                    <p className="text-2xl font-bold text-white mt-1">12 Asignados</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Departamento Legal y RRHH</p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                  <h4 className="font-bold text-base text-white">Litigios Corporativos en Curso</h4>
                  <div className="divide-y divide-slate-800 text-xs">
                    <div className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-200">#17203-2026-03191 • Sumario Laboral (Ex-colaborador)</p>
                        <p className="text-slate-400 text-[11px]">Unidad Judicial de Trabajo de Pichincha</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">En Término de Prueba</span>
                    </div>

                    <div className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-200">#09201-2026-00412 • Cobro Ejecutivo de Facturas Comerciales</p>
                        <p className="text-slate-400 text-[11px]">Unidad Judicial Civil de Guayaquil</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400">Mandamiento de Ejecución</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE BOTTOM NAVIGATION DOCK (< lg) - LUXURY INSPECTION PWA STYLE */}
      {/* ========================================================================= */}
      <nav
        className="app-bottom-nav lg:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 dark:bg-black/95 backdrop-blur-xl border-t border-slate-800/80 px-2 pt-1 pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))] flex justify-around items-center shadow-[0_-8px_30px_rgba(0,0,0,0.5)] transition-all"
        aria-label="Navegación móvil principal"
      >
        {/* Item 1: Inicio / Panel */}
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`app-bottom-nav-item flex-1 flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 px-1 rounded-2xl transition-all duration-200 active:scale-95 ${
            activeTab === "dashboard"
              ? "text-blue-400 font-bold bg-blue-500/10 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
          aria-label="Panel principal"
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5 shrink-0 transition-transform active:scale-90" />
          <span className="text-[10px] tracking-tight truncate">
            {role === "cliente" ? "Mi Caso" : role === "abogado" ? "Campo" : "Inicio"}
          </span>
        </button>

        {/* Item 2: Casos / Expedientes */}
        <button
          onClick={() => setActiveTab("casos")}
          className={`app-bottom-nav-item flex-1 flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 px-1 rounded-2xl transition-all duration-200 active:scale-95 relative ${
            activeTab === "casos"
              ? "text-blue-400 font-bold bg-blue-500/10 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
          aria-label="Expedientes judiciales"
        >
          <FolderKanban className="w-5 h-5 mb-0.5 shrink-0 transition-transform active:scale-90" />
          <span className="text-[10px] tracking-tight truncate">Expedientes</span>
        </button>

        {/* Item 3: Buzón IA / Notificaciones */}
        <button
          onClick={() => setActiveTab("buzon")}
          className={`app-bottom-nav-item flex-1 flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 px-1 rounded-2xl transition-all duration-200 active:scale-95 relative ${
            activeTab === "buzon"
              ? "text-rose-400 font-bold bg-rose-500/10 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
          aria-label="Buzón de notificaciones judiciales IA"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 mb-0.5 shrink-0 transition-transform active:scale-90" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute -top-0.5 -right-1 animate-pulse" />
          </div>
          <span className="text-[10px] tracking-tight truncate">Buzón IA</span>
        </button>

        {/* Item 4: Gemini IA */}
        <button
          onClick={() => setActiveTab("ai")}
          className={`app-bottom-nav-item flex-1 flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 px-1 rounded-2xl transition-all duration-200 active:scale-95 ${
            activeTab === "ai"
              ? "text-blue-400 font-bold bg-blue-500/10 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
          aria-label="Asistente de inteligencia artificial legal"
        >
          <Cpu className="w-5 h-5 mb-0.5 shrink-0 transition-transform active:scale-90" />
          <span className="text-[10px] tracking-tight truncate">Gemini</span>
        </button>

        {/* Item 5: Chat Cifrado */}
        <button
          onClick={() => setActiveTab("chat")}
          className={`app-bottom-nav-item flex-1 flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 px-1 rounded-2xl transition-all duration-200 active:scale-95 relative ${
            activeTab === "chat"
              ? "text-emerald-400 font-bold bg-emerald-500/10 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
          aria-label="Despacho y chat cifrado"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 mb-0.5 shrink-0 transition-transform active:scale-90" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 absolute -top-0.5 -right-1" />
          </div>
          <span className="text-[10px] tracking-tight truncate">Chat</span>
        </button>
      </nav>

      {/* ========================================================================= */}
      {/* SUPABASE CLOUD STATUS MODAL */}
      {/* ========================================================================= */}
      {showSupabaseModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-7 space-y-5 text-left relative shadow-2xl">
            <button
              onClick={() => setShowSupabaseModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold">
                <Database className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Infraestructura Cloud
                </span>
                <h3 className="font-bold text-xl text-white">
                  Conexión Supabase PostgreSQL 16
                </h3>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Estado de Servidor:</span>
                  <span className="text-emerald-400 font-bold flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Conectado (SSL Encriptado)</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Latencia de Conexión:</span>
                  <span className="font-mono text-white font-bold">{supabaseHealth?.latencyMs || 28} ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Cifrado de Datos:</span>
                  <span className="text-blue-400 font-mono font-semibold">AES-256 en Reposo • TLS 1.3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Políticas Row Level Security (RLS):</span>
                  <span className="text-purple-400 font-mono font-bold">14 Políticas Activas (Zero-Trust)</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Tablas Sincronizadas en el Esquema:
                </span>
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px] text-slate-300">
                  {[
                    "public.users",
                    "public.cases",
                    "public.case_timelines",
                    "public.case_private_notes",
                    "public.documents",
                    "public.crm_leads",
                    "public.judicial_notifications",
                    "public.appointments",
                    "public.subscriptions",
                    "public.audit_logs",
                  ].map((table, i) => (
                    <div key={i} className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{table}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 text-[11px] text-blue-200">
                <strong className="block text-white mb-0.5">Regla de Privacidad Activa:</strong>
                Las notas privadas de estrategia legal (<code className="font-mono text-blue-300">case_private_notes</code>) son inaccesibles para el rol CLIENTE a nivel de base de datos vía RLS.
              </div>
            </div>

            <button
              onClick={() => setShowSupabaseModal(false)}
              className="w-full py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs active:scale-95 transition-all"
            >
              Cerrar Consola Supabase
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PWA / MOBILE APP INSTALL MODAL */}
      {/* ========================================================================= */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-3xl bg-slate-900 border border-blue-500/30 p-6 sm:p-7 space-y-5 text-left relative shadow-2xl">
            <button
              onClick={() => setShowInstallModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
                  Aplicación Multiplataforma
                </span>
                <h3 className="font-bold text-xl text-white">
                  Instalar VIS LEGAL ABOGADOS
                </h3>
              </div>
            </div>

            {/* Modal Tabs */}
            <div className="flex rounded-2xl bg-slate-950 p-1 border border-slate-800 text-xs">
              <button
                onClick={() => setInstallTab("pwa")}
                className={`flex-1 py-2 rounded-xl font-semibold transition-all ${
                  installTab === "pwa"
                    ? "bg-blue-600 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                PWA (Instalación Inmediata)
              </button>
              <button
                onClick={() => setInstallTab("stores")}
                className={`flex-1 py-2 rounded-xl font-semibold transition-all ${
                  installTab === "stores"
                    ? "bg-blue-600 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                App Store & Google Play
              </button>
            </div>

            {installTab === "pwa" ? (
              <div className="space-y-4 text-xs">
                <p className="text-slate-300 leading-relaxed font-light">
                  Instala la aplicación directamente en la pantalla de inicio de tu iPhone, iPad o Android sin pasar por tiendas ni pagar comisiones. Funciona como una app nativa con soporte fuera de línea y notificaciones push.
                </p>

                <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-start space-x-3">
                    <Apple className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">En Apple iOS (iPhone/iPad):</strong>
                      <span className="text-slate-400">
                        1. Abre en Safari • 2. Toca el botón <em>Compartir</em> (icono cuadrado con flecha hacia arriba) • 3. Selecciona <strong>"Añadir a pantalla de inicio"</strong>.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pt-2 border-t border-slate-800">
                    <Play className="w-4 h-4 text-blue-400 shrink-0 mt-0.5 fill-blue-400" />
                    <div>
                      <strong className="text-white block">En Google Android (Chrome):</strong>
                      <span className="text-slate-400">
                        1. Abre en Chrome • 2. Toca los tres puntos del menú • 3. Selecciona <strong>"Instalar aplicación"</strong> o pulsa el banner inferior.
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    alert("Aplicación lista para agregar a pantalla de inicio.");
                    setShowInstallModal(false);
                  }}
                  className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Entendido, agregar a pantalla de inicio</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <p className="text-slate-300 leading-relaxed font-light">
                  El código base está construido en <strong>Next.js 15</strong> y estructurado para empaquetarse con <strong>Capacitor</strong>. Genera el proyecto nativo de Xcode (.ipa) y Android Studio (.apk) con un solo comando.
                </p>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-[11px] text-slate-300">
                  <p className="text-blue-400 font-bold"># Comandos de compilación nativa:</p>
                  <p className="text-slate-400">npx cap add ios && npx cap add android</p>
                  <p className="text-slate-400">npx cap sync</p>
                  <p className="text-slate-400">npx cap open ios # Abre en Xcode para App Store</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => {
                      alert("Simulación: Paquete iOS preparado para Apple TestFlight.");
                      setShowInstallModal(false);
                    }}
                    className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white flex items-center justify-center space-x-2 active:scale-95"
                  >
                    <Apple className="w-4 h-4 text-white" />
                    <span>Apple TestFlight</span>
                  </button>

                  <button
                    onClick={() => {
                      alert("Simulación: Descargando APK firmado para Android v1.0.4.");
                      setShowInstallModal(false);
                    }}
                    className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white flex items-center justify-center space-x-2 active:scale-95"
                  >
                    <Play className="w-4 h-4 text-white fill-white" />
                    <span>Descargar APK</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Case Detail Modal */}
      <CaseDetailModal
        caseItem={selectedCase}
        role={role}
        onClose={() => setSelectedCase(null)}
        onOpenChat={() => {
          setSelectedCase(null);
          setActiveTab("chat");
        }}
      />

      {/* Legal Consultation Modal */}
      <LegalConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </div>
  );
}

