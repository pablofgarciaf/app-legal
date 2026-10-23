ALTER TABLE public.users ADD COLUMN IF NOT EXISTS cedula VARCHAR(20);
CREATE UNIQUE INDEX IF NOT EXISTS users_cedula_unique ON public.users (cedula) WHERE cedula IS NOT NULL;
