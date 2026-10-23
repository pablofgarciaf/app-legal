-- VIS Legal: RLS fail-closed para tablas con datos de usuario.
-- Esta migración es local/preparada; no se ejecuta desde este archivo.
-- Evidencia usada: database/supabase_schema.sql.
--
-- No se agregan permisos de escritura porque el esquema no documenta un flujo
-- seguro de creación/edición ni una fuente de claims administrativos.

BEGIN;

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users FORCE ROW LEVEL SECURITY;
ALTER TABLE public.case_timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_timelines FORCE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments FORCE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions FORCE ROW LEVEL SECURITY;

-- La tabla de perfiles solo expone el propio perfil. No se permite a clientes
-- modificar role, subscription_tier, is_active ni ningún otro campo mediante
-- una política genérica de UPDATE.
DROP POLICY IF EXISTS users_select_own ON public.users;
CREATE POLICY users_select_own
    ON public.users
    FOR SELECT
    TO authenticated
    USING ((SELECT auth.uid()) = id);

-- Un timeline solo puede verse si pertenece a un caso cuyo client_id es el
-- usuario autenticado y el evento está marcado como público para el cliente.
-- No se infiere acceso de abogado/admin porque el esquema no aporta un claim
-- seguro ni una relación adicional para autorizarlo sin ampliar exposición.
DROP POLICY IF EXISTS case_timelines_select_client_public ON public.case_timelines;
CREATE POLICY case_timelines_select_client_public
    ON public.case_timelines
    FOR SELECT
    TO authenticated
    USING (
        is_public_to_client IS TRUE
        AND EXISTS (
            SELECT 1
            FROM public.cases c
            WHERE c.id = case_timelines.case_id
              AND c.client_id = (SELECT auth.uid())
        )
    );

-- Una cita solo puede verse por el cliente o abogado explícitamente vinculados
-- en la propia fila. No se conceden INSERT/UPDATE/DELETE sin evidencia de un
-- flujo de escritura y sus invariantes.
DROP POLICY IF EXISTS appointments_select_participant ON public.appointments;
CREATE POLICY appointments_select_participant
    ON public.appointments
    FOR SELECT
    TO authenticated
    USING (
        (SELECT auth.uid()) = client_id
        OR (SELECT auth.uid()) = lawyer_id
    );

-- La suscripción solo puede verse por su titular. Los pagos permanecen sin
-- escrituras desde roles de cliente hasta definir un backend privilegiado.
DROP POLICY IF EXISTS subscriptions_select_own ON public.subscriptions;
CREATE POLICY subscriptions_select_own
    ON public.subscriptions
    FOR SELECT
    TO authenticated
    USING ((SELECT auth.uid()) = user_id);

COMMIT;
