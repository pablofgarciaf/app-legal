-- ==============================================================================
-- VIS LEGAL ABOGADOS / BIZ LEGAL S.A.S. - ESQUEMA DE BASE DE DATOS SUPABASE
-- Motor: PostgreSQL 16 con Row Level Security (RLS) & Cifrado AES-256
-- ==============================================================================

-- Habilitar extensiones criptográficas y UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. TABLA: users (Autenticación y Perfiles RBAC)
-- ------------------------------------------------------------------------------
CREATE TYPE user_role AS ENUM ('ADMIN', 'ABOGADO', 'CLIENTE', 'B2B');
CREATE TYPE subscription_tier AS ENUM ('GRATIS', 'PREMIUM', 'EMPRESARIAL');

CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'CLIENTE',
    subscription_tier subscription_tier NOT NULL DEFAULT 'GRATIS',
    phone VARCHAR(50),
    organization_id UUID,
    fcm_device_token TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. TABLA: cases (Expedientes y Causas Judiciales)
-- ------------------------------------------------------------------------------
CREATE TYPE case_status AS ENUM ('ACTIVO', 'EN_TERMINO', 'AUDIENCIA_PENDIENTE', 'SENTENCIA', 'ARCHIVADO');

CREATE TABLE IF NOT EXISTS public.cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    process_number VARCHAR(100) UNIQUE NOT NULL, -- Ej: 17203-2026-01892
    client_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    lawyer_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    legal_area VARCHAR(100) NOT NULL, -- Laboral, Civil, Penal, Mercantil
    court VARCHAR(255) NOT NULL, -- Unidad Judicial Norte Quito
    judge_name VARCHAR(255),
    status case_status NOT NULL DEFAULT 'ACTIVO',
    current_stage VARCHAR(100) NOT NULL,
    critical_term_deadline DATE, -- Art. 73 COGEP
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. TABLA: case_timelines (Eventos Públicos Visibles para el Cliente)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.case_timelines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
    event_title VARCHAR(255) NOT NULL,
    event_description TEXT,
    event_date TIMESTAMPTZ NOT NULL,
    is_public_to_client BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. TABLA: case_private_notes (Estrategia Confidencial - SOLO ABOGADO Y ADMIN)
-- REGLA DE PRIVACIDAD CRÍTICA DE BIZ LEGAL
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.case_private_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.users(id),
    strategy_note TEXT NOT NULL,
    risk_assessment VARCHAR(50), -- BAJO, MEDIO, ALTO
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. TABLA: documents (Gestión Documental Vinculada a AWS S3)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id),
    file_name VARCHAR(255) NOT NULL,
    s3_key TEXT NOT NULL,
    file_size_bytes BIGINT,
    mime_type VARCHAR(100),
    category VARCHAR(100), -- Demanda, Notificación, Prueba, Sentencia
    is_client_accessible BOOLEAN DEFAULT TRUE,
    version INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. TABLA: crm_leads (Captura y Embudo de Prospectos)
-- ------------------------------------------------------------------------------
CREATE TYPE lead_status AS ENUM ('NUEVO', 'CONTACTADO', 'CONSULTA', 'CONTRATADO', 'CLIENTE');
CREATE TYPE lead_source AS ENUM ('INSTAGRAM', 'FACEBOOK', 'WEB', 'APP', 'REFERIDO');

CREATE TABLE IF NOT EXISTS public.crm_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    legal_area VARCHAR(100) NOT NULL,
    source lead_source NOT NULL DEFAULT 'APP',
    status lead_status NOT NULL DEFAULT 'NUEVO',
    case_description TEXT,
    estimated_budget DECIMAL(12, 2),
    assigned_lawyer_id UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. TABLA: judicial_notifications (Buzón Judicial SATJE con IA Human-in-the-Loop)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.judicial_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.cases(id),
    process_number VARCHAR(100) NOT NULL,
    court_name VARCHAR(255) NOT NULL,
    notification_date DATE NOT NULL,
    raw_email_subject TEXT,
    ai_summary TEXT,
    urgency_level VARCHAR(50), -- ALTA, MEDIA, BAJA
    calculated_term_days INT, -- Ej: 3 días Art. 73 COGEP
    term_deadline_date DATE,
    is_lawyer_confirmed BOOLEAN DEFAULT FALSE, -- REGLA OBLIGATORIA: El letrado debe confirmar
    confirmed_by_lawyer_id UUID REFERENCES public.users(id),
    confirmed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. TABLA: appointments (Agenda Judicial, Audiencias y Reuniones)
-- ------------------------------------------------------------------------------
CREATE TYPE appointment_type AS ENUM ('AUDIENCIA_JUDICIAL', 'REUNION_CLIENTE', 'DILIGENCIA_PERICIAL', 'CONSULTA_VIRTUAL');
CREATE TYPE appointment_modality AS ENUM ('VIRTUAL_ZOOM', 'PRESENCIAL_SALA', 'PRESENCIAL_JUZGADO');

CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES public.cases(id),
    lawyer_id UUID NOT NULL REFERENCES public.users(id),
    client_id UUID NOT NULL REFERENCES public.users(id),
    title VARCHAR(255) NOT NULL,
    appointment_type appointment_type NOT NULL,
    modality appointment_modality NOT NULL,
    location_or_link TEXT,
    scheduled_at TIMESTAMPTZ NOT NULL,
    reminder_24h_sent BOOLEAN DEFAULT FALSE,
    reminder_1h_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. TABLA: subscriptions & payments (Pagos y Recurrencia MRR)
-- ------------------------------------------------------------------------------
CREATE TYPE payment_status AS ENUM ('ACTIVA', 'PENDIENTE', 'VENCIDA', 'CANCELADA', 'FALLIDA');

CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    tier subscription_tier NOT NULL,
    monthly_fee_cents INT NOT NULL DEFAULT 2900, -- $29.00 USD
    status payment_status NOT NULL DEFAULT 'ACTIVA',
    payment_gateway VARCHAR(50) DEFAULT 'STRIPE_PAYPHONE',
    gateway_subscription_id VARCHAR(255),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. SEGURIDAD Y ZERO-TRUST: POLÍTICAS ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_private_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.judicial_notifications ENABLE ROW LEVEL SECURITY;

-- Política 1: Clientes solo ven sus propios casos
CREATE POLICY client_cases_policy ON public.cases
    FOR SELECT USING (
        auth.uid() = client_id OR 
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('ADMIN', 'ABOGADO'))
    );

-- Política 2: NOTAS PRIVADAS: PROHIBIDO ACCESO A CLIENTES (Solo Abogado y Admin)
CREATE POLICY private_notes_restriction_policy ON public.case_private_notes
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('ADMIN', 'ABOGADO'))
    );

-- Política 3: CRM LEADS: Solo acceso administrativo y letrados
CREATE POLICY crm_leads_access_policy ON public.crm_leads
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('ADMIN', 'ABOGADO'))
    );
