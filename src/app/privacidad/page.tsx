import Link from "next/link";

export const metadata = {
  title: "Política de privacidad | VIS Legal",
  description: "Información sobre el tratamiento de datos personales en VIS Legal.",
};

const sections = [
  ["1. Responsable del tratamiento", <>El responsable del tratamiento es <strong>[PENDIENTE: razón social o nombre completo del responsable]</strong>, con domicilio en <strong>[PENDIENTE: domicilio legal]</strong>. Para consultas sobre privacidad puedes escribir a <strong>[PENDIENTE: correo de privacidad]</strong>.</>],
  ["2. Datos que podemos tratar", <>Según la interacción que tengas con el sitio o el portal, podemos tratar datos de identificación y contacto, información que decidas incluir en una consulta, datos de navegación y la información necesaria para gestionar una relación profesional. No envíes información sensible o documentos confidenciales mediante formularios públicos hasta que se te indique un canal seguro.</>],
  ["3. Finalidades", <>Usamos los datos para responder solicitudes, coordinar consultas, prestar y administrar servicios solicitados, mantener la seguridad del sitio, atender obligaciones legales y mejorar la experiencia. No afirmamos que exista una relación abogado-cliente por el solo envío de un formulario.</>],
  ["4. Base y carácter del suministro", <>El tratamiento se realizará conforme a la normativa aplicable y a la base jurídica que corresponda en cada caso. Los campos marcados como obligatorios son necesarios para atender la solicitud; si no proporcionas la información requerida, es posible que no podamos responderla.</>],
  ["5. Comunicaciones y encargados", <>Podemos apoyarnos en proveedores tecnológicos que actúen bajo instrucciones y medidas de seguridad adecuadas. <strong>[PENDIENTE: identificar categorías de proveedores, transferencias internacionales y garantías aplicables]</strong>. No venderemos datos personales.</>],
  ["6. Conservación y seguridad", <>Conservaremos la información durante el tiempo necesario para la finalidad correspondiente y para cumplir obligaciones legales o resolver reclamaciones. Aplicamos medidas razonables de seguridad, aunque ningún sistema conectado a Internet puede garantizar riesgo cero. <strong>[PENDIENTE: plazo o criterios específicos de conservación]</strong>.</>],
  ["7. Derechos y consultas", <>Puedes solicitar acceso, rectificación, actualización, eliminación, oposición, limitación o portabilidad cuando resulten aplicables, y presentar una reclamación ante la autoridad competente. Para ejercer tus derechos, contacta a <strong>[PENDIENTE: canal formal de derechos]</strong>. Podremos pedir información para verificar tu identidad.</>],
  ["8. Cookies", <>El sitio puede utilizar tecnologías necesarias para su funcionamiento y, si corresponde, herramientas de medición o preferencias. <strong>[PENDIENTE: confirmar cookies utilizadas, proveedor, duración y mecanismo de consentimiento]</strong>.</>],
  ["9. Cambios", <>Podremos actualizar esta política cuando cambien el servicio, la normativa o nuestras prácticas. Publicaremos la versión vigente en esta página.</>],
];

export default function PrivacyPage() {
  return <main className="site-shell min-h-screen">
    <nav className="site-nav"><Link href="/" className="brand"><span className="brand-mark">⚖</span><span>VIS <em>LEGAL</em></span></Link><Link href="/" className="text-link">Volver al inicio</Link></nav>
    <article className="mx-auto max-w-4xl px-6 py-20 sm:px-10">
      <p className="eyebrow">Información legal</p>
      <h1 className="mt-5 font-serif text-5xl font-semibold tracking-tight text-[#17211f] sm:text-7xl">Política de privacidad</h1>
      <p className="mt-6 max-w-2xl text-base leading-8 text-[#69736d]">Este documento explica, de forma general, cómo se tratarían los datos personales en VIS Legal. Los campos entre corchetes deben completarse y validarse antes de publicar una versión definitiva.</p>
      <div className="mt-8 border border-[#a87535]/40 bg-[#fff8ed] p-5 text-sm leading-7 text-[#5e4930]"><strong>Revisión pendiente:</strong> completar los datos del responsable, canales, proveedores, plazos y demás información específica con asesoría legal antes de considerar esta política final.</div>
      <p className="mt-8 text-xs font-semibold uppercase tracking-[.16em] text-[#8a918b]">Última actualización: [PENDIENTE: fecha]</p>
      <div className="mt-12 space-y-10 text-[15px] leading-8 text-[#59645d]">{sections.map(([title, content], index) => <section key={index}><h2 className="mb-3 font-serif text-2xl font-semibold text-[#1b3a35]">{title}</h2><p>{content}</p></section>)}</div>
    </article>
    <footer className="site-footer"><span>VIS Legal · Información legal</span><div><Link href="/terminos">Términos y condiciones</Link><Link href="/">Inicio</Link></div></footer>
  </main>;
}
