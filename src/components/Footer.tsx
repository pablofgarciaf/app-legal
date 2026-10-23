import React from "react";
import { Scale, Shield, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-850 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-navy-850">
          {/* Col 1 (4 cols): Brand & Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-navy-900 border border-gold-500/40 flex items-center justify-center text-gold-400 shadow-gold-glow">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif tracking-wider text-lg font-bold text-ivory-50 block">
                  VIS LEGAL ABOGADOS
                </span>
                <span className="text-[10px] tracking-widest uppercase text-gold-400 font-mono">
                  Plataforma LegalTech Integral
                </span>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">
              Comunidad jurídica digital para la sociedad, familias y empresas.
              &quot;Aprende. Previene. Consulta. Protege. Resuelve.&quot; Litigación de alto nivel y
              tecnología móvil para el seguimiento transparente de causas judiciales.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-slate-400">
              <Shield className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Titularidad tecnológica y derechos de autor: BIZ LEGAL.</span>
            </div>
          </div>

          {/* Col 2 (2 cols): Navegación */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-serif font-bold text-ivory-50 text-sm">Plataforma</h3>
            <ul className="space-y-2">
              <li>
                <a href="#servicios" className="hover:text-gold-400 transition-colors">
                  Áreas de Práctica
                </a>
              </li>
              <li>
                <a href="#app-showcase" className="hover:text-gold-400 transition-colors">
                  App iOS & Android
                </a>
              </li>
              <li>
                <a href="#membresia" className="hover:text-gold-400 transition-colors">
                  Membresía Premium
                </a>
              </li>
              <li>
                <a href="#empresas" className="hover:text-gold-400 transition-colors">
                  VIS LEGAL Empresas
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-gold-400 transition-colors">
                  Simulador en Vivo
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 (3 cols): Áreas Legales */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif font-bold text-ivory-50 text-sm">Especialidades</h3>
            <ul className="space-y-2">
              <li>Derecho Civil y Contratos</li>
              <li>Derecho Laboral y Visto Bueno</li>
              <li>Derecho Corporativo & SAS 24h</li>
              <li>Derecho de Familia y Niñez</li>
              <li>Litigación Penal Estratégica</li>
              <li>Tránsito y Contencioso Administrativo</li>
            </ul>
          </div>

          {/* Col 4 (3 cols): Contacto & Redes (Ofuscados) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif font-bold text-ivory-50 text-sm">Atención al Cliente</h3>
            <div className="space-y-2.5">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Quito & Guayaquil, Ecuador. Cobertura en las 24 provincias.</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+593 99 876 5432 / +593 2 298 4400</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gold-400 font-bold">@</span>
                {/* Obfuscated email address against scrapers */}
                <span>
                  <span>contacto</span>
                  <span className="text-gold-400">&#64;</span>
                  <span>vislegalabogados.com</span>
                </span>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-3">
              <span className="text-[11px] font-semibold text-slate-300 block mb-2">Canales Oficiales:</span>
              <div className="flex items-center space-x-2 text-xs">
                <span className="px-2 py-1 rounded bg-navy-900 border border-navy-800 text-slate-300 hover:text-gold-400 cursor-pointer">
                  LinkedIn
                </span>
                <span className="px-2 py-1 rounded bg-navy-900 border border-navy-800 text-slate-300 hover:text-gold-400 cursor-pointer">
                  X / Twitter
                </span>
                <span className="px-2 py-1 rounded bg-navy-900 border border-navy-800 text-slate-300 hover:text-gold-400 cursor-pointer">
                  Facebook
                </span>
                <span className="px-2 py-1 rounded bg-navy-900 border border-navy-800 text-slate-300 hover:text-gold-400 cursor-pointer">
                  YouTube
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} VIS LEGAL ABOGADOS. Todos los derechos reservados. Titular: BIZ LEGAL.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:underline cursor-pointer">Términos y Condiciones</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Política de Privacidad</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Código Deontológico</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
