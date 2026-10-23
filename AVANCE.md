
## [2026-10-23] - VIS Legal - Codex
**Qué se hizo:** Se separó la portada pública de VIS Legal de la aplicación existente. La ruta `/` ahora presenta un landing responsive con propuesta de valor, áreas de práctica, método, portal de clientes, preguntas frecuentes y formulario de contacto; la app existente quedó disponible en `/app`.
**Resultado:** `npm run build` completó la compilación y generó las rutas `/` y `/app`. El build muestra además una advertencia preexistente porque ESLint no está instalado como dependencia de desarrollo.
**Skills usadas/modificadas:** reglas-seguridad, registrar-avance.
**Próximos pasos:** Validar visualmente en navegador, conectar el formulario a un endpoint seguro, auditar Supabase/RLS y continuar la conexión real de autenticación, casos, documentos, citas y pagos.
**Archivos modificados:** C:\Users\pablo\Documents\Judicial\src\app\page.tsx; C:\Users\pablo\Documents\Judicial\src\app\app\page.tsx; C:\Users\pablo\Documents\Judicial\src\app\globals.css.
