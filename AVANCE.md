
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

## [2026-10-23] - Judicial - Codex
**Qué se hizo:** Se implementó bootstrap administrativo server-only para roles ADMIN, ABOGADO y B2B, con cliente de Supabase SSR/administrador aislado, inicio de sesión mediante cookies y middleware de protección para `/app`.
**Resultado:** El bootstrap requiere `ADMIN_BOOTSTRAP_SECRET`, crea perfiles con `must_change_password`, no devuelve contraseñas ni expone la service role en la UI, y fuerza el cambio de contraseña antes de acceder al área protegida. La migración SQL queda preparada y no fue ejecutada contra Supabase remoto.
**Skills usadas/modificadas:** reglas-seguridad, registrar-avance.
**Próximos pasos:** Configurar `SUPABASE_SERVICE_ROLE_KEY` y `ADMIN_BOOTSTRAP_SECRET` solo en el entorno server-side; aplicar la migración en una base controlada y probar los tres roles con cuentas de prueba.
**Archivos modificados:** C:/Users/pablo/Documents/Judicial/package.json; C:/Users/pablo/Documents/Judicial/package-lock.json; C:/Users/pablo/Documents/Judicial/src/lib/supabase-server.ts; C:/Users/pablo/Documents/Judicial/src/lib/auth-server.ts; C:/Users/pablo/Documents/Judicial/src/middleware.ts; C:/Users/pablo/Documents/Judicial/src/app/api/admin/bootstrap/route.ts; C:/Users/pablo/Documents/Judicial/src/app/api/auth/sign-in/route.ts; C:/Users/pablo/Documents/Judicial/src/app/api/auth/change-password/route.ts; C:/Users/pablo/Documents/Judicial/src/app/ingresar/page.tsx; C:/Users/pablo/Documents/Judicial/src/app/app/cambiar-contrasena/page.tsx; C:/Users/pablo/Documents/Judicial/database/migrations/20261023150000_admin_bootstrap_temp_password.sql.
## [2026-10-23] - Judicial - Codex
**Qué se hizo:** Rediseño visual acotado de `MobileAppShell` y estilos de la app con estética Apple premium, paleta VIS Legal y navegación móvil inferior con safe-area.
**Resultado:** La app compila correctamente en producción; no se modificaron auth, schema ni la lógica funcional del shell.
**Skills usadas/modificadas:** reglas-seguridad, registrar-avance.
**Próximos pasos:** Revisar visualmente `/app` en un dispositivo móvil real o emulador.
**Archivos modificados:** C:/Users/pablo/Documents/Judicial/src/components/app/MobileAppShell.tsx; C:/Users/pablo/Documents/Judicial/src/app/globals.css

## [2026-10-23] - Judicial - Codex
**Qué se hizo:** Se mejoró exclusivamente el landing público: hero, historia, equipo, integraciones, CTA y responsive premium.
**Resultado:** Se reforzaron jerarquía visual, estados hover/focus, tarjetas, formulario de contacto y adaptación móvil sin tocar autenticación, datos ni la app privada.
**Skills usadas/modificadas:** reglas-seguridad, registrar-avance.
**Próximos pasos:** Validar visualmente el landing en navegador cuando `.next` no esté bloqueado por otro proceso.
**Archivos modificados:** C:/Users/pablo/Documents/Judicial/src/app/page.tsx; C:/Users/pablo/Documents/Judicial/src/app/globals.css; C:/Users/pablo/Documents/Judicial/AVANCE.md
