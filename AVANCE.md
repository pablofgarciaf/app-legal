
## [2026-10-23] - VIS Legal - Codex
**Qué se hizo:** Se separó la portada pública de VIS Legal de la aplicación existente. La ruta `/` ahora presenta un landing responsive con propuesta de valor, áreas de práctica, método, portal de clientes, preguntas frecuentes y formulario de contacto; la app existente quedó disponible en `/app`.
**Resultado:** `npm run build` completó la compilación y generó las rutas `/` y `/app`. El build muestra además una advertencia preexistente porque ESLint no está instalado como dependencia de desarrollo.
**Skills usadas/modificadas:** reglas-seguridad, registrar-avance.
**Próximos pasos:** Validar visualmente en navegador, conectar el formulario a un endpoint seguro, auditar Supabase/RLS y continuar la conexión real de autenticación, casos, documentos, citas y pagos.
**Archivos modificados:** C:\Users\pablo\Documents\Judicial\src\app\page.tsx; C:\Users\pablo\Documents\Judicial\src\app\app\page.tsx; C:\Users\pablo\Documents\Judicial\src\app\globals.css.

## [2026-10-23] - VIS Legal - Codex
**Qué se hizo:** Se crearon las rutas públicas `/privacidad` y `/terminos` con copy prudente y placeholders visibles para la información legal todavía no confirmada.
**Resultado:** Ambas páginas incluyen navegación, advertencias de revisión pendiente, contenido base de privacidad y términos, y enlaces cruzados; no se inventaron razón social, domicilio ni datos de contacto legales.
**Skills usadas/modificadas:** reglas-seguridad, registrar-avance.
**Próximos pasos:** Completar y validar los placeholders con el titular legal y asesoría jurídica antes de publicar como documentos definitivos.
**Archivos modificados:** C:\Users\pablo\Documents\Judicial\src\app\privacidad\page.tsx; C:\Users\pablo\Documents\Judicial\src\app\terminos\page.tsx; C:\Users\pablo\Documents\Judicial\AVANCE.md.

## [2026-10-23] - VIS Legal - Codex
**Qué se hizo:** Se preparó una migración SQL local fail-closed para `users`, `case_timelines`, `appointments` y `subscriptions`, basada únicamente en las columnas y relaciones presentes en `database/supabase_schema.sql`.
**Resultado:** Las cuatro tablas quedan con RLS habilitado y forzado; se agregan únicamente lecturas autenticadas de perfil propio, timelines públicos del propio caso, citas de participantes y suscripciones propias. No se añadieron escrituras ni acceso administrativo inferido; la migración no fue ejecutada contra Supabase remoto.
**Skills usadas/modificadas:** reglas-seguridad, supabase, supabase-postgres-best-practices, registrar-avance.
**Próximos pasos:** Revisar en una base local con datos de prueba; definir explícitamente claims/flujo backend para operaciones de abogados y administradores antes de agregar políticas de escritura.
**Archivos modificados:** C:\Users\pablo\Documents\Judicial\database\migrations\20261023133000_rls_fail_closed_core.sql; C:\Users\pablo\Documents\Judicial\AVANCE.md.
## [2026-10-23] - Judicial - Codex
**Qué se hizo:** Se reemplazó la simulación del formulario público por un POST server-side validado hacia `crm_leads`.
**Resultado:** La captura solo intenta insertar con configuración segura del servidor; sin ella responde 503 y la UI no afirma registro exitoso. No se enviaron datos externos.
**Skills usadas/modificadas:** reglas-seguridad, registrar-avance.
**Próximos pasos:** Configurar `SUPABASE_SERVICE_ROLE_KEY` únicamente en el entorno del servidor y probar con un registro controlado.
**Archivos modificados:** C:/Users/pablo/Documents/Judicial/src/app/api/leads/route.ts; C:/Users/pablo/Documents/Judicial/src/components/LegalConsultationModal.tsx
