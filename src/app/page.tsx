"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Scale,
  Gavel,
  Briefcase,
  Building2,
  Users2,
  ScrollText,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Lock,
  Sparkles,
  Send,
  Award,
  BookOpen,
  Landmark,
} from "lucide-react";
import LandingAssist from "@/components/LandingAssist";

// ─── SLIDES DATA (ESTILO HOASESOR CON ESTÉTICA LUXURY VIS LEGAL) ─────────────
const slides = [
  {
    tag: "FIRMA JURÍDICA & LITIGIOS · ECUADOR",
    title: "Defensa Legal & Litigios de Alto Impacto",
    subtitle:
      "Estrategia procesal implacable, argumentación rigurosa y acompañamiento jurídico personalizado para proteger lo que más importa.",
    primaryCta: { text: "Hablar con un Abogado", href: "#contacto" },
    secondaryCta: { text: "Conocer Áreas de Litigio", href: "#servicios" },
    badge: "Representación Nacional",
  },
  {
    tag: "DERECHO CORPORATIVO & MERCANTIL",
    title: "Asesoría Mercantil & Blindaje Empresarial",
    subtitle:
      "Constitución, contratos de alta complejidad, cumplimiento normativo y consultoría societaria estratégica para empresas y directorios.",
    primaryCta: { text: "Asesoría Corporativa", href: "#contacto" },
    secondaryCta: { text: "Ver Servicios de Empresa", href: "#servicios" },
    badge: "Soluciones a Medida",
  },
  {
    tag: "DERECHO DE FAMILIA & PATRIMONIO",
    title: "Protección Familiar, Herencias & Sucesiones",
    subtitle:
      "Resolución pacífica de acuerdos familiares, división patrimonial, testamentos y sucesiones con discreción, respaldo ético y trato humano.",
    primaryCta: { text: "Consultar Caso Familiar", href: "#contacto" },
    secondaryCta: { text: "Guía de Sucesiones", href: "#servicios" },
    badge: "Confidencialidad Absoluta",
  },
];

// ─── SERVICIOS PRINCIPALES (HOASESOR GRID) ──────────────────────────────────
const services = [
  {
    icon: Gavel,
    category: "LITIGIOS & PENAL",
    title: "Litigios & Defensa Penal",
    desc: "Defensa técnica en sede fiscal y judicial. Intervención en audiencias, casación y recursos extraordinarios de protección.",
    highlights: ["Defensa penal corporativa e individual", "Acciones constitucionales", "Recursos de casación y apelación"],
    href: "#contacto",
  },
  {
    icon: Briefcase,
    category: "MERCANTIL & EMPRESAS",
    title: "Asesoría Mercantil & Societaria",
    desc: "Acompañamiento integral para sociedades: constitución, reformas estatutarias, pactos de socios y fusiones.",
    highlights: ["Constitución y reestructuración societaria", "Contratación mercantil especializada", "Gobierno corporativo & compliance"],
    href: "#contacto",
  },
  {
    icon: Scale,
    category: "FAMILIA & SUCESIONES",
    title: "Familia, Herencias & Donaciones",
    desc: "Gestión experta en partición judicial o notarial de herencias, inventarios de bienes, testamentos y régimen patrimonial.",
    highlights: ["Partición de bienes y herencias", "Divorcios por mutuo acuerdo y contenciosos", "Planificación sucesoria patrimonial"],
    href: "#contacto",
  },
  {
    icon: Building2,
    category: "LABORAL & REGULATORIO",
    title: "Asesoría Laboral & Corporativa",
    desc: "Auditorías laborales preventivas, desvinculaciones seguras, mediaciones y defensa en sumarios o demandas del trabajo.",
    highlights: ["Contratos de trabajo y reglamentos internos", "Actas de finiquito y mediación", "Defensa judicial laboral"],
    href: "#contacto",
  },
];

// ─── CREDENCIALES NUMÉRICAS (HOASESOR COUNTERS) ─────────────────────────────
const metrics = [
  { value: "+20", label: "Años de Trayectoria Combinada", subtext: "Experiencia en cortes y asesoría corporativa" },
  { value: "+650", label: "Casos & Procesos Atendidos", subtext: "Estrategias ganadoras en todo el país" },
  { value: "99.4%", label: "Tasa de Conformidad de Clientes", subtext: "Acompañamiento transparente y ético" },
  { value: "24/7", label: "Portal & Plataforma LegalTech", subtext: "Acceso seguro a expedientes en línea" },
];

// ─── MÉTODO EN 3 PASOS (HOASESOR METODOLOGÍA) ──────────────────────────────
const methodSteps = [
  {
    step: "01",
    title: "Te Escuchamos & Diagnosticamos",
    desc: "Analizamos tu caso y sus implicaciones legales y patrimoniales sin tecnicismos confusos ni costos ocultos.",
  },
  {
    step: "02",
    title: "Diseño Estratégico & Plan de Acción",
    desc: "Construimos una hoja de ruta con análisis de riesgos, probabilidades y presupuesto a medida cerrado.",
  },
  {
    step: "03",
    title: "Ejecución Rigurosa & Seguimiento Digital",
    desc: "Actuamos con contundencia legal mientras sigues cada avance en tiempo real desde tu Portal Privado.",
  },
];

// ─── PREGUNTAS FRECUENTES (FAQS) ───────────────────────────────────────────
const faqs = [
  {
    q: "¿Cómo inicio una consulta legal con VIS Legal?",
    a: "Puedes solicitar una sesión a través de nuestro formulario web, por WhatsApp directo o ingresando a la plataforma. Un abogado especialista evaluará tu requerimiento en menos de 24 horas laborables.",
  },
  {
    q: "¿Qué diferencia a VIS Legal de los estudios tradicionales?",
    a: "Unimos el rigor de la abogacía de élite con una infraestructura tecnológica propia (Portal de Clientes 24/7 y Asistencia Digital) que te da transparencia total sobre cada documento y trámite de tu expediente.",
  },
  {
    q: "¿Atienden casos fuera de Quito?",
    a: "Sí. Contamos con sede principal en Quito y una red de abogados asociados y procuradores con cobertura en Guayaquil, Cuenca, Ambato, Manta y todo el territorio ecuatoriano.",
  },
  {
    q: "¿Tienen planes continuos para empresas y personas?",
    a: "Sí. Ofrecemos esquemas de iguala jurídica mensual para personas jurídicas que requieren blindaje societario y laboral permanente, así como contratos por caso específico.",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  // Scroll listener para el Navbar flotante
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slider automático cada 6.5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const service = String(data.get("service") || "Consulta General");
    const message = String(data.get("message") || "");

    const text = encodeURIComponent(
      `Hola VIS Legal, deseo solicitar una consulta jurídica.\n\n*Nombre:* ${name}\n*Teléfono:* ${phone}\n*Correo:* ${email}\n*Área:* ${service}\n*Mensaje:* ${message}`
    );
    window.open(`https://wa.me/593991786275?text=${text}`, "_blank");
  };

  return (
    <div className="site-shell relative min-h-screen">
      {/* ────────────────────────────────────────────────────────────────────────
          1. NAVBAR FLOTANTE INTELIGENTE (ESTILO HOASESOR LUXURY)
          ──────────────────────────────────────────────────────────────────────── */}
      <header
        className={`vis-navbar-container transition-all duration-300 ${scrolled ? "vis-navbar-scrolled py-3" : "vis-navbar-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo Brand con Logo Oficial */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#c99a5b]/50 shadow-md bg-[#102d29] flex items-center justify-center group-hover:border-[#c99a5b] transition-all duration-200">
              <Image
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+9s30AAAAASUVORK5CYII="
                alt="VIS LEGAL ABOGADOS"
                width={44}
                height={44}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider text-white font-sans drop-shadow-sm">
                VIS <span className="text-[#c99a5b] font-serif italic">LEGAL</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-emerald-100/70 -mt-0.5">
                Abogados & LegalTech
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="#inicio"
              className="text-xs uppercase tracking-widest font-semibold text-white/90 hover:text-[#e7c78d] transition-colors py-2"
            >
              Inicio
            </Link>
            <Link
              href="#historia"
              className="text-xs uppercase tracking-widest font-semibold text-white/80 hover:text-[#e7c78d] transition-colors py-2"
            >
              Sobre Nosotros
            </Link>

            {/* Dropdown Servicios */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-white/80 hover:text-[#e7c78d] transition-colors py-2 cursor-pointer focus:outline-none"
                onClick={() => setServicesDropdown(!servicesDropdown)}
              >
                Servicios
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdown ? "rotate-180" : ""}`} />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-64 bg-[#102d29]/95 backdrop-blur-xl border border-[#c99a5b]/30 rounded-xl shadow-2xl p-2.5 flex flex-col gap-1 z-50 animate-fade-in">
                  <Link
                    href="#servicios"
                    onClick={() => setServicesDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-white/90 hover:bg-[#c99a5b]/15 hover:text-[#e7c78d] transition-all"
                  >
                    <Gavel className="w-4 h-4 text-[#c99a5b]" />
                    <span>Litigios & Defensa Penal</span>
                  </Link>
                  <Link
                    href="#servicios"
                    onClick={() => setServicesDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-white/90 hover:bg-[#c99a5b]/15 hover:text-[#e7c78d] transition-all"
                  >
                    <Briefcase className="w-4 h-4 text-[#c99a5b]" />
                    <span>Mercantil & Empresas</span>
                  </Link>
                  <Link
                    href="#servicios"
                    onClick={() => setServicesDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-white/90 hover:bg-[#c99a5b]/15 hover:text-[#e7c78d] transition-all"
                  >
                    <Scale className="w-4 h-4 text-[#c99a5b]" />
                    <span>Familia & Sucesiones</span>
                  </Link>
                  <Link
                    href="#servicios"
                    onClick={() => setServicesDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-white/90 hover:bg-[#c99a5b]/15 hover:text-[#e7c78d] transition-all"
                  >
                    <Building2 className="w-4 h-4 text-[#c99a5b]" />
                    <span>Laboral & Regulatorio</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="#metodo"
              className="text-xs uppercase tracking-widest font-semibold text-white/80 hover:text-[#e7c78d] transition-colors py-2"
            >
              Método
            </Link>
            <Link
              href="#faqs"
              className="text-xs uppercase tracking-widest font-semibold text-white/80 hover:text-[#e7c78d] transition-colors py-2"
            >
              Preguntas
            </Link>
            <Link
              href="#contacto"
              className="text-xs uppercase tracking-widest font-semibold text-white/80 hover:text-[#e7c78d] transition-colors py-2"
            >
              Contacto
            </Link>
          </nav>

          {/* Action Buttons Right */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="#contacto"
              className="vis-interactive-btn px-4 py-2.5 rounded-lg border border-[#c99a5b]/60 text-xs font-semibold text-[#f7f4ee] hover:bg-[#c99a5b]/20 hover:border-[#c99a5b] transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#e7c78d]" />
              <span>Solicitar Consulta</span>
            </Link>

            <Link
              href="/app"
              className="vis-interactive-btn px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#c99a5b] to-[#b47a2c] text-white text-xs font-bold shadow-lg shadow-[#c99a5b]/25 hover:brightness-110 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-white/90" />
              <span>Tu app</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#e7c78d] focus:outline-none"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#102d29]/98 backdrop-blur-2xl border-b border-[#c99a5b]/30 px-6 py-6 flex flex-col gap-4 animate-fade-in text-center">
            <Link
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold tracking-wider text-white hover:text-[#c99a5b] py-1"
            >
              Inicio
            </Link>
            <Link
              href="#historia"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold tracking-wider text-white hover:text-[#c99a5b] py-1"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold tracking-wider text-white hover:text-[#c99a5b] py-1"
            >
              Servicios Jurídicos
            </Link>
            <Link
              href="#metodo"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold tracking-wider text-white hover:text-[#c99a5b] py-1"
            >
              Método de Trabajo
            </Link>
            <Link
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold tracking-wider text-white hover:text-[#c99a5b] py-1"
            >
              Contacto
            </Link>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <Link
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg border border-[#c99a5b] text-white text-xs font-semibold hover:bg-[#c99a5b]/20"
              >
                Solicitar Consulta
              </Link>
              <Link
                href="/app"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#c99a5b] to-[#b47a2c] text-white text-xs font-bold"
              >
                Tu app
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ────────────────────────────────────────────────────────────────────────
          2. HERO CAROUSEL INTERACTIVO ESTILO HOASESOR
          ──────────────────────────────────────────────────────────────────────── */}
      <section id="inicio" className="relative min-h-[640px] md:min-h-[720px] lg:min-h-[780px] flex items-center justify-center overflow-hidden bg-[#0c1f1c]">
        {/* Background Image / Texture Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+9s30AAAAASUVORK5CYII="
            alt="Firma Jurídica VIS Legal Ecuador"
            fill
            priority
            className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1f1c] via-[#0c1f1c]/75 to-[#0c1f1c]/50" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0c1f1c]/60 to-[#0c1f1c]" />
        </div>

        {/* Carousel Slides Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
          {slides.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
              <div
                key={slide.title}
                className={`transition-all duration-700 ${isActive ? "opacity-100 translate-y-0 scale-100" : "hidden opacity-0 translate-y-4 scale-95"
                  }`}
              >
                {/* Eyebrow Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#c99a5b]/40 backdrop-blur-md mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#c99a5b] animate-pulse" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#e7c78d]">
                    {slide.tag}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-white tracking-tight leading-[1.08] mb-6 max-w-4xl mx-auto">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl text-[#f4f5f1]/90 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                  <a
                    href={slide.primaryCta.href}
                    className="vis-interactive-btn w-full sm:w-auto px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#c99a5b] to-[#b47a2c] text-white font-bold text-sm shadow-xl shadow-[#b47a2c]/30 hover:brightness-110 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>{slide.primaryCta.text}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={slide.secondaryCta.href}
                    className="vis-interactive-btn w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm backdrop-blur-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>{slide.secondaryCta.text}</span>
                    <ChevronRight className="w-4 h-4 text-[#e7c78d]" />
                  </a>
                </div>
              </div>
            );
          })}

          {/* Slider Navigation Controls */}
          <div className="mt-14 flex items-center justify-center gap-4">
            <button
              onClick={handlePrevSlide}
              aria-label="Diapositiva anterior"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all active:scale-90"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Bullets indicator */}
            <div className="flex items-center gap-2.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Ir a diapositiva ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === activeSlide ? "w-8 bg-[#c99a5b]" : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              aria-label="Siguiente diapositiva"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all active:scale-90"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating Trust Strip at Bottom of Hero */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#102d29] via-[#173d36] to-[#102d29] border-t border-[#c99a5b]/20 py-3.5 px-4 z-20">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs font-medium text-emerald-100/90">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#e7c78d]" />
              <span>Atención 100% Confidencial y Secreto Profesional</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Clock3 className="w-4 h-4 text-[#e7c78d]" />
              <span>Respuesta Legal en Menos de 24 Horas</span>
            </div>
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#e7c78d]" />
              <span>Sede Central en Quito · Cobertura en Todo Ecuador</span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          3. SECCIÓN DE CREDENCIALES & HISTORIA (ESTILO HOASESOR)
          ──────────────────────────────────────────────────────────────────────── */}
      <section id="historia" className="py-24 bg-[#faf8f5] border-b border-[#e6e0d6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Copy Left */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#a87535]">
                  LA FIRMA JURÍDICA
                </span>
                <div className="vis-gold-divider mb-4" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#17211f] leading-tight">
                  Defendiendo derechos y asesorando con rigor estratégico en Ecuador
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[#55605a] leading-relaxed font-normal">
                VIS Legal nace de la convergencia entre la <strong>excelencia procesal en litigios</strong> y la
                urgencia de dotar al ejercicio del derecho de <strong>transparencia y tecnología de vanguardia</strong>.
                Trabajamos desde Quito con profesionales formados al más alto nivel académico, asesorando a empresas,
                familias y personas en sus decisiones más críticas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white border border-[#e6e0d6] shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#173d36]/10 text-[#173d36]">
                    <Award className="w-5 h-5 text-[#a87535]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#17211f]">Formación de Cuarto Nivel</h4>
                    <p className="text-xs text-[#6e7771] mt-0.5">
                      Magísteres en Derecho Procesal Penal y Argumentación Jurídica.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#e6e0d6] shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#173d36]/10 text-[#173d36]">
                    <Sparkles className="w-5 h-5 text-[#a87535]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#17211f]">Ecosistema LegalTech</h4>
                    <p className="text-xs text-[#6e7771] mt-0.5">
                      Portal web y móvil 24/7 con trazabilidad total de providencias y citas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Card Right (Luxury Visual) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-br from-[#173d36] to-[#0e2722] p-8 md:p-10 text-white shadow-2xl border border-[#c99a5b]/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-[#c99a5b]/10 blur-3xl pointer-events-none" />
                <div className="text-[#e7c78d] text-4xl font-serif mb-4">“</div>
                <p className="font-serif text-xl sm:text-2xl text-[#f7f4ee] leading-snug mb-8">
                  La tecnología organiza el camino y elimina la incertidumbre; el criterio jurídico y la ética guían cada decisión procesal.
                </p>
                <div className="pt-6 border-t border-white/15 flex items-center justify-between">
                  <div>
                    <strong className="block text-sm font-bold text-[#e7c78d]">Dirección Estratégica</strong>
                    <span className="text-xs text-emerald-100/70">VIS Legal Abogados</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#e7c78d]">
                    <Scale className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Counters Grid (Hoasesor Metricas) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-16 border-t border-[#e6e0d6]">
            {metrics.map((item) => (
              <div key={item.label} className="text-center p-4">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-[#a87535] tracking-tight mb-2">
                  {item.value}
                </div>
                <div className="font-bold text-sm text-[#17211f] mb-1">{item.label}</div>
                <p className="text-xs text-[#717872] leading-relaxed">{item.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          4. REJILLA DE SERVICIOS / ÁREAS DE PRÁCTICA (HOASESOR CARDS)
          ──────────────────────────────────────────────────────────────────────── */}
      <section id="servicios" className="py-24 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#a87535]">
              ÁREAS DE ESPECIALIZACIÓN
            </span>
            <div className="vis-gold-divider mx-auto my-3" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#17211f] leading-tight">
              Soluciones jurídicas con criterio, rigor y confidencialidad
            </h2>
            <p className="text-base text-[#69736d] mt-4">
              Cada área está liderada por profesionales con experiencia probada en tribunales y negociación de alto nivel.
            </p>
          </div>

          {/* Grid de 4 Cards de Servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.title}
                  className="vis-card-luxury p-7 flex flex-col justify-between group hover:border-[#c99a5b] transition-all"
                >
                  <div>
                    {/* Top Icon with Gold/Emerald Touch */}
                    <div className="w-12 h-12 rounded-xl bg-[#173d36]/10 text-[#173d36] group-hover:bg-[#173d36] group-hover:text-[#e7c78d] flex items-center justify-center transition-all duration-300 mb-6">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#a87535] block mb-1">
                      {srv.category}
                    </span>
                    <h3 className="text-xl font-bold font-serif text-[#17211f] mb-3 group-hover:text-[#a87535] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#69736d] leading-relaxed mb-6">
                      {srv.desc}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-2 border-t border-[#f0ebe3] pt-4 mb-6">
                      {srv.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#55605a]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#a87535] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={srv.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173d36] group-hover:text-[#a87535] tracking-wider uppercase transition-colors"
                  >
                    <span>Consultar Área</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Banner CTA adicional (Estilo Hoasesor: '¿No encuentras tu servicio?') */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#173d36] to-[#0f2c27] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#c99a5b]/30 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-xl md:text-2xl font-bold font-serif text-white">
                ¿Requieres un diagnóstico preliminar para tu empresa o familia?
              </h4>
              <p className="text-sm text-emerald-100/80 max-w-2xl">
                Agenda una sesión con nuestro equipo. Evaluaremos los antecedentes de tu caso con estricta reserva.
              </p>
            </div>
            <a
              href="#contacto"
              className="vis-interactive-btn px-6 py-3 rounded-lg bg-[#c99a5b] hover:bg-[#b47a2c] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all active:scale-95 shadow-lg"
            >
              Solicitar Asesoría
            </a>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          5. SECCIÓN DE EXPERIENCIA & MÉTODO (CÓMO TRABAJAMOS - 3 PASOS)
          ──────────────────────────────────────────────────────────────────────── */}
      <section id="metodo" className="py-24 bg-[#102d29] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#e7c78d]">
              NUESTRA METODOLOGÍA
            </span>
            <div className="vis-gold-divider mx-auto my-3" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white leading-tight">
              Menos incertidumbre. Mayor contundencia procesal.
            </h2>
            <p className="text-base text-emerald-100/80 mt-4">
              Un estándar claro para que conozcas en todo momento dónde estás parado y cuál es el próximo paso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodSteps.map((m) => (
              <div
                key={m.step}
                className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#c99a5b]/50 transition-all duration-300"
              >
                <div className="text-4xl font-extrabold font-serif text-[#c99a5b] mb-4">
                  {m.step}
                </div>
                <h3 className="text-xl font-bold font-serif text-white mb-3">{m.title}</h3>
                <p className="text-sm text-emerald-100/75 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Portal Tech Highlight */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-[#c99a5b]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c99a5b]/20 text-[#e7c78d] text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>Portal Privado LegalTech</span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-white">
                Tu información legal y expediente, siempre al alcance
              </h3>
              <p className="text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
                Nuestros clientes no dependen de llamadas interminables para saber cómo va su proceso judicial. Tienen
                acceso al portal con el estado actualizado, archivos compartidos y calendario de diligencias.
              </p>
            </div>
            <Link
              href="/app"
              className="vis-interactive-btn px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#c99a5b] to-[#b47a2c] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all active:scale-95 shadow-xl flex items-center gap-2"
            >
              <span>Acceder al Portal</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          6. SECCIÓN DE PREGUNTAS FRECUENTES (FAQS)
          ──────────────────────────────────────────────────────────────────────── */}
      <section id="faqs" className="py-24 bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#a87535]">
              RESOLVEMOS TUS DUDAS
            </span>
            <div className="vis-gold-divider mx-auto my-3" />
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#17211f]">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = faqOpen === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-[#e6e0d6] bg-white overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : index)}
                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-[#17211f] hover:text-[#a87535] transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-serif">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#a87535] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm sm:text-base text-[#55605a] leading-relaxed border-t border-[#f3eee8] pt-4 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          7. FORMULARIO DE CONTACTO PREMIUM (ESTILO HOASESOR)
          ──────────────────────────────────────────────────────────────────────── */}
      <section id="contacto" className="py-24 bg-gradient-to-br from-[#173d36] to-[#0c1f1c] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#e7c78d]">
                COMUNÍCATE CON NOSOTROS
              </span>
              <div className="vis-gold-divider mb-4" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white leading-tight">
                Hablemos de tu situación con total reserva
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed font-normal">
                El primer paso consiste en escuchar los detalles de tu problema para brindarte una orientación clara y
                un presupuesto cerrado y sin sorpresas.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#e7c78d]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-emerald-100/60 block">Teléfono / WhatsApp</span>
                    <a href="tel:+593991786275" className="text-sm font-bold text-white hover:text-[#e7c78d]">
                      +593 99 178 6275
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#e7c78d]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-emerald-100/60 block">Correo Electrónico</span>
                    <a href="mailto:vislegalec@gmail.com" className="text-sm font-bold text-white hover:text-[#e7c78d]">
                      vislegalec@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#e7c78d]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-emerald-100/60 block">Sede Jurídica</span>
                    <span className="text-sm font-bold text-white">Quito, Ecuador · Cobertura Nacional</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-emerald-100/80 mt-6">
                <ShieldCheck className="w-5 h-5 text-[#e7c78d] shrink-0" />
                <span>Tu información está protegida bajo el Código de Ética y Secreto Profesional de la Abogacía.</span>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-[#c99a5b]/30 p-8 sm:p-10 shadow-2xl">
                <h3 className="text-xl font-bold font-serif text-white mb-2">Solicitar Asesoría o Presupuesto</h3>
                <p className="text-xs text-emerald-100/70 mb-6">
                  Completa los campos a continuación y te responderemos inmediatamente vía WhatsApp.
                </p>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-white/90 block mb-1">Nombre completo *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Ej. Dr. Carlos Andrade"
                        className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#c99a5b]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/90 block mb-1">Teléfono o WhatsApp *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Ej. +593 99 999 9999"
                        className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#c99a5b]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-white/90 block mb-1">Correo electrónico *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="tu@correo.com"
                        className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#c99a5b]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/90 block mb-1">Área de interés</label>
                      <select
                        name="service"
                        className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#c99a5b]"
                      >
                        <option value="Litigios & Penal">Litigios & Penal</option>
                        <option value="Mercantil & Empresas">Mercantil & Empresas</option>
                        <option value="Familia & Sucesiones">Familia & Sucesiones</option>
                        <option value="Laboral & Regulatorio">Laboral & Regulatorio</option>
                        <option value="Consulta General">Otra Consulta Jurídica</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white/90 block mb-1">¿En qué podemos ayudarte? *</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Describe brevemente los antecedentes de tu situación..."
                      className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#c99a5b]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="vis-interactive-btn w-full py-4 rounded-lg bg-gradient-to-r from-[#c99a5b] to-[#b47a2c] text-white font-bold text-sm tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Continuar por WhatsApp Seguro</span>
                  </button>

                  <p className="text-[11px] text-emerald-100/60 text-center pt-2">
                    El envío de este formulario no constituye relación abogado-cliente hasta la suscripción del convenio profesional.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          8. FOOTER COMPLETO (DATOS LEGALES, LINKS & COPYRIGHT)
          ──────────────────────────────────────────────────────────────────────── */}
      <footer className="bg-[#081715] text-[#bdc9c0] border-t border-[#1b3a35] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
            {/* Col 1: Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#c99a5b]/40 bg-[#173d36] flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="VIS LEGAL"
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-lg font-bold tracking-wider text-white font-sans">
                  VIS <span className="text-[#c99a5b] font-serif italic">LEGAL</span>
                </span>
              </Link>
              <p className="text-xs text-[#8d9b93] leading-relaxed">
                Firma jurídica y plataforma LegalTech. Estrategia legal, prevención y seguimiento de procesos en Ecuador.
              </p>
            </div>

            {/* Col 2: Enlaces Rápidos */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white">Navegación</span>
              <ul className="space-y-2 text-xs">
                <li><a href="#inicio" className="hover:text-[#c99a5b] transition-colors">Inicio</a></li>
                <li><a href="#historia" className="hover:text-[#c99a5b] transition-colors">Sobre Nosotros</a></li>
                <li><a href="#servicios" className="hover:text-[#c99a5b] transition-colors">Áreas de Práctica</a></li>
                <li><a href="#metodo" className="hover:text-[#c99a5b] transition-colors">Cómo Trabajamos</a></li>
                <li><a href="#faqs" className="hover:text-[#c99a5b] transition-colors">Preguntas Frecuentes</a></li>
              </ul>
            </div>

            {/* Col 3: Legal & Portal */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white">Legal & Clientes</span>
              <ul className="space-y-2 text-xs">
                <li><Link href="/privacidad" className="hover:text-[#c99a5b] transition-colors">Política de Privacidad</Link></li>
                <li><Link href="/terminos" className="hover:text-[#c99a5b] transition-colors">Términos y Condiciones</Link></li>
                <li><Link href="/app" className="hover:text-[#c99a5b] transition-colors">Portal de Clientes</Link></li>
                <li><Link href="/ingresar" className="hover:text-[#c99a5b] transition-colors">Acceso Profesionales</Link></li>
              </ul>
            </div>

            {/* Col 4: Contacto */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white">Contacto Directo</span>
              <div className="space-y-2 text-xs text-[#8d9b93]">
                <p>Quito, Pichincha, Ecuador</p>
                <p>+593 99 178 6275</p>
                <p>vislegalec@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e7771]">
            <p>© {new Date().getFullYear()} VIS Legal Abogados. Todos los derechos reservados.</p>
            <p>Excelencia Jurídica & LegalTech · Ecuador</p>
          </div>
        </div>
      </footer>

      {/* Floating Assist / WhatsApp */}
      <LandingAssist />
    </div>
  );
}
