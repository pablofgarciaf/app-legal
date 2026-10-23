import Link from "next/link";

export const metadata = {
  title: "Términos y condiciones | VIS Legal",
  description: "Términos de uso del sitio y del portal VIS Legal.",
};

const sections = [
  ["1. Identificación y alcance", <>Este sitio y sus contenidos son presentados bajo la marca VIS Legal. El titular, operador y datos de contacto deben confirmarse en <strong>[PENDIENTE: razón social o nombre completo]</strong>, con domicilio en <strong>[PENDIENTE: domicilio legal]</strong> y correo <strong>[PENDIENTE: correo legal]</strong>. Estos términos regulan el uso informativo del sitio y de las funcionalidades que se habiliten en el portal.</>],
  ["2. Información general, no asesoría automática", <>El contenido del sitio es general y no sustituye un análisis profesional de un caso concreto. Una consulta, registro o uso de una herramienta tecnológica no crea por sí solo una relación abogado-cliente, mandato, representación ni obligación de aceptar un encargo.</>],
  ["3. Uso permitido", <>Debes utilizar el sitio de forma lícita, diligente y respetuosa. No debes introducir código malicioso, intentar acceder a cuentas o datos ajenos, interferir con la disponibilidad del servicio, suplantar identidades ni usar el contenido para fines ilícitos.</>],
  ["4. Cuenta y portal", <>Si se habilita una cuenta, eres responsable de mantener la confidencialidad de tus credenciales y de avisar de inmediato sobre cualquier uso no autorizado. Las funciones, disponibilidad, requisitos de acceso y reglas específicas del portal pueden cambiar. <strong>[PENDIENTE: confirmar proceso de registro, recuperación, suspensión y cierre de cuentas]</strong>.</>],
  ["5. Solicitudes y contratación", <>El envío de una solicitud no garantiza disponibilidad, aceptación del caso, resultado, plazo ni precio. Cualquier servicio profesional, alcance, honorario, forma de pago y representación deberá constar en el acuerdo o documento que corresponda. <strong>[PENDIENTE: completar reglas de contratación, cancelación, reembolsos e impuestos]</strong>.</>],
  ["6. Contenidos y propiedad intelectual", <>Los textos, diseños, marcas, software y demás elementos del sitio pertenecen a sus titulares o se utilizan con autorización. Puedes consultar el sitio para su finalidad legítima, pero no copiar, redistribuir, modificar o explotar sus elementos fuera de los límites permitidos por la ley o por autorización escrita.</>],
  ["7. Proveedores y enlaces", <>El sitio puede integrar servicios de terceros o enlazar a otros sitios. Cada tercero puede aplicar sus propias condiciones y políticas. <strong>[PENDIENTE: identificar integraciones externas relevantes]</strong>. No garantizamos la disponibilidad ni el contenido de sitios ajenos.</>],
  ["8. Responsabilidad y disponibilidad", <>Adoptaremos esfuerzos razonables para mantener información útil y servicios disponibles, pero no garantizamos que el sitio esté libre de errores, interrupciones o riesgos. Nada de este documento limita derechos que no puedan excluirse legalmente.</>],
  ["9. Ley aplicable y contacto", <>La ley aplicable, autoridad competente y mecanismo de solución de controversias deben confirmarse antes de publicar: <strong>[PENDIENTE: ley aplicable, jurisdicción y mecanismo]</strong>. Para consultas sobre estos términos: <strong>[PENDIENTE: correo legal]</strong>.</>],
  ["10. Cambios", <>Podremos actualizar estos términos para reflejar cambios del servicio o de la normativa. La versión publicada en esta página será la vigente desde la fecha que se indique.</>],
];

export default function TermsPage() {
  return <main className="site-shell min-h-screen">
    <nav className="site-nav"><Link href="/" className="brand"><span className="brand-mark">⚖</span><span>VIS <em>LEGAL</em></span></Link><Link href="/" className="text-link">Volver al inicio</Link></nav>
    <article className="mx-auto max-w-4xl px-6 py-20 sm:px-10">
      <p className="eyebrow">Información legal</p>
      <h1 className="mt-5 font-serif text-5xl font-semibold tracking-tight text-[#17211f] sm:text-7xl">Términos y condiciones</h1>
      <p className="mt-6 max-w-2xl text-base leading-8 text-[#69736d]">Estas condiciones son un borrador prudente para el uso del sitio y del portal. No deben presentarse como versión final mientras permanezcan placeholders legales.</p>
      <div className="mt-8 border border-[#a87535]/40 bg-[#fff8ed] p-5 text-sm leading-7 text-[#5e4930]"><strong>Revisión pendiente:</strong> completar identidad del titular, ley aplicable, contratación, pagos, jurisdicción y demás datos específicos con asesoría legal.</div>
      <p className="mt-8 text-xs font-semibold uppercase tracking-[.16em] text-[#8a918b]">Última actualización: [PENDIENTE: fecha]</p>
      <div className="mt-12 space-y-10 text-[15px] leading-8 text-[#59645d]">{sections.map(([title, content], index) => <section key={index}><h2 className="mb-3 font-serif text-2xl font-semibold text-[#1b3a35]">{title}</h2><p>{content}</p></section>)}</div>
    </article>
    <footer className="site-footer"><span>VIS Legal · Información legal</span><div><Link href="/privacidad">Política de privacidad</Link><Link href="/">Inicio</Link></div></footer>
  </main>;
}
