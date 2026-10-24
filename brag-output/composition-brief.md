# Hyperframes Composition Brief: VIS Legal Abogados

## Objective

Create a polished, premium brag video for VIS Legal Abogados — a modern law firm in Ecuador that combines legal expertise with a client portal. The video should convey clarity, organization, and human-centered service through refined visuals and calm, professional pacing.

## Output

- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: Vertical (9:16) — 1080×1920px
- Duration: 18 seconds
- Frame 0: Poster frame (brand mark or hero tagline)

## Source Material

- **Project root:** `C:\Users\pablo\Documents\Judicial\`
- **Primary files read:** `src/app/page.tsx` (homepage), `src/app/globals.css` (design system), `package.json`
- **Product name:** VIS Legal Abogados
- **Tagline / strongest claim:** _"Tu defensa empieza con claridad"_ (Your defense begins with clarity)
- **Key UI moment to recreate:** The client portal card showing:
  - Case status (68% progress bar)
  - Document count (12 documentos)
  - Last update (Actualizado hoy)
  - Team communication bubble ("Equipo VIS Legal — Te responderemos pronto")
- **Copy that must appear verbatim:**
  - "Tu defensa empieza con claridad."
  - "Entendemos. Diseñamos. Acompañamos."
  - "Solicitar consulta"
  - "VIS LEGAL"

## Creative Direction

- **Tone preset:** Polished
- **Creative direction:** Quiet premium product film — composed, confident, no hype. Legal services reframed as clear, organized, and human.
- **Interpretation:** 
  - Pacing is unhurried; scenes settle before transitioning.
  - Visuals are sophisticated (premium colors, refined typography).
  - Motion is smooth and minimal — no flashy effects.
  - The focus is on the product doing the talking, not aggressive copy.
  - Audio is warm but professional; no surprise or urgency.

- **Angle:** VIS Legal's core insight is that legal decisions deserve clarity and organization. The video shows this through the portal interface — a client opening their case and seeing it come into focus. The promise is not "faster legal service" but "legal service you can understand."

- **Hook (0–2s):** Tagline fades in over deep green background. No motion yet. Establishes the mission.

- **Outro / punchline (17–18s):** Logo and firm description appear. Calm, confident close. Ready to contact.

- **Avoid:**
  - "Streamline," "optimize," "empower" — generic SaaS language
  - Abstract filler (floating shapes, generic icons without context)
  - Redesigning the actual product — use real UI/copy from the project
  - Urgency or hype — this is premium, not a quick-fix tool

## Visual Identity

- **Background (hero/primary):** `#173d36` (forest green)
- **Text (primary):** `#ffffff` (white on dark bg) / `#173d36` (dark on light bg)
- **Accent (highlights, buttons):** `#c99a5b` (warm gold)
- **Accent (soft/secondary):** `#e7c78d` (light gold)
- **Neutral/ivory (for cards on dark):** `#f7f4ee`
- **Display font:** Playfair Display (serif, headlines) or fallback serif
- **Body font:** System stack (SF Pro Display, -apple-system, sans-serif)
- **Visual references from the project:**
  - Hero section with orbiting geometric shapes (subtle, blurred)
  - Case card mockup with progress bar, document icons, message bubble
  - Three-step method layout (01, 02, 03 badges)
  - Apple iOS-inspired card design (minimal borders, subtle shadows)
  - WhatsApp button (green highlight)

## Storyboard

Use the beat-by-beat storyboard in `brag-output/brag-plan.md` as the creative contract.

**Scene summary:**

1. **Hook** — 0–2s — "Tu defensa empieza con claridad" fades in over green bg. Text settles, no motion. Establishes mission.

2. **Portal reveal** — 2–4s — Case card slides up from bottom. Shows status (68%), documents (12), last update ("Hoy"). UI speaks; no copy. Emphasize the organized, visible progress.

3. **Case progress** — 4–6s — Progress bar animates to 68%. Subtle pulse on status dot. Highlight transparency and real-time data.

4. **Document preview** — 6–8s — Slide left to show "12 documentos" with file icons. All documents neatly listed. Demonstrates available, organized information.

5. **Method intro** — 8–11s — Three method cards fade in sequentially: "01 Entendemos," "02 Diseñamos," "03 Acompañamos." Each holds 0.8-1s. Three pillars of the service.

6. **Communication** — 11–15s — Chat bubble from "Equipo VIS Legal" with preview message ("Te responderemos pronto"). Emphasize that the team is responsive and present.

7. **CTA frame** — 15–17s — WhatsApp button highlighted with "Solicitar consulta" headline. Clear, single action. Green button, confident close.

8. **Logo/outro** — 17–18s — Brand mark + "VIS LEGAL" + tagline ("Firma jurídica y tecnología para decisiones más claras") on dark green bg. Done.

## Audio

- **Audio role:** Warm, professional bed supporting premium positioning. No narration. SFX subtle and motion-matched.

- **Audio arc:** 
  - Opens with calm, confident pad/synth + minimal orchestration (piano, strings, or both).
  - Builds gently through case reveal and method intro (texture, warmth).
  - Sustains through communication and CTA.
  - Fades to silence at 16s for a composed, quiet close (brand mark lands in near-silence).

- **Music:** Select from `C:\Users\pablo\.claude\skills\brag\assets\music\` — prefer a warm, minor-key or calm-major track that is professional and elegant (avoid overly "happy" or upbeat). For a polished law firm, "Happy Beats Business Moves Vol. 11 or 12" may work if they have a calm, warm tone; otherwise, the briefing suggests a piano/string-led composition.

- **Music treatment:** 
  - Fade in at 0s (no abrupt start).
  - Sustain at comfortable volume (not loud; let it support, not dominate).
  - Begin fade-out at 16s.
  - Fully silent by 17.5s.
  - Let the brand mark land in near-silence (last 0.5s near-mute).

- **Music cue guidance:** Analyze the selected track via `npx hyperframes beats` to find strong cues. Lock 1–2 major moments (portal reveal, method intro start, or communication reveal) to the strongest beat within ±0.15s. Mark as `// beat-locked`. Snap sequential method cards to consecutive beats within ±0.10s if available.

- **Audio-reactive treatment:** Subtle. If available, bind audio data to one element:
  - **Option A:** Gentle glow or depth shift on the case card (RMS-driven, soft pulse).
  - **Option B:** Subtle warmth/brightness on gold accents during music peaks.
  - **Option C:** Gentle elevation or card-surface shimmer on the method badges during beat.
  - Keep the reaction low-frequency and understated — not a visual equalizer, not strobing.

- **Audio-coupled moments:**
  - Portal reveal (2–4s) — card slides in with soft UI click SFX; align with nearest beat if possible.
  - Progress bar pulse (4–6s) — gentle tone synced to bar animation (~50ms hits).
  - Document reveal (6–8s) — subtle file/page-turn SFX.
  - Method cards (8–11s) — staggered UI reveals (3× light clicks, one per card).
  - Message notification (11–15s) — soft ping SFX.
  - Button press (15–17s) — deeper click, haptic-like (120–150Hz).

- **SFX selection guidance:** 
  - Polished moments = lower high-frequency content (avoid harsh clicks or bright pings).
  - Card interactions = soft UI sounds (not mechanical or aggressive).
  - Text reveals = gentle, brief tones (not loud announcements).
  - Notifications = short, warm bell-like or chime tones.
  - Overall volume: 3–6dB below music bed, subtle and supportive.
  - Hyperframes should choose exact SFX files from skill assets based on animation timing.

- **SFX analysis guidance:** Reference `C:\Users\pablo\.claude\skills\brag\assets\sfx\sfx-analysis.md` for low-risk, polished sound selection.

- **Audio files:** 
  - Music: Copy selected track to `brag-output/composition/assets/music/` before composition build.
  - SFX: Hyperframes selects and copies chosen SFX to `brag-output/composition/assets/sfx/` after implementing animation.

## Hyperframes Instructions

- Load `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, and `hyperframes-cli` to create the composition in `brag-output/composition/`.
- **Do not enter the Hyperframes entry-point intent interview.** This is a `/brag` workflow, not a generic launch-video flow.
- Pass the brief, the plan, and the source files to Hyperframes.
- Implement the storyboard scenes exactly as specified in the plan.
- Use the visual identity colors and typography from the project (no redesign).
- Decide exact animation timing, easing, and SFX placement based on the composition's rhythm and the music's cues.
- Run `npx hyperframes check` before render (the single gate).
- Render locally to `brag-output/brag.mp4`.
- No remote publishing or upload workflows — this is local-only delivery.

## Self-Review Checklist

Before render:

- [ ] Composition uses current Hyperframes workflow (not a hardcoded `/brag` template).
- [ ] Storyboard from `brag-plan.md` is implemented exactly.
- [ ] At least one real UI element is shown (case card with progress bar, documents, or team message).
- [ ] All copy on screen is grounded in the project (tagline, method names, CTA text are verbatim from `page.tsx`).
- [ ] Music file is copied to `brag-output/composition/assets/music/`.
- [ ] At least 1 major visual moment is beat-locked to a strong cue (marked `// beat-locked`).
- [ ] Sequential events (method cards) snap to consecutive beats (marked `// beat-grid`) or use natural timing for readability.
- [ ] Audio-reactive treatment is present and subtle (or documented as unavailable).
- [ ] SFX are motion-matched and polished (low high-frequency risk, supportive volume).
- [ ] Total duration is 18 seconds (within 15–25s window).
- [ ] Frame 0 is a poster shot (brand mark or hero tagline).
- [ ] `hyperframes check` passes cleanly.

---

## Grounding Notes

All text and claims in the composition are sourced directly from the project:

- **"Tu defensa empieza con claridad"** — Hero tagline from `page.tsx`
- **"Entendemos. Diseñamos. Acompañamos."** — Method step names from method section
- **Portal UI (68%, 12 documentos, "Actualizado hoy")** — Exact from case-card mockup
- **"Equipo VIS Legal — Te responderemos pronto"** — From floating message in hero section
- **"Solicitar consulta"** — Button CTA from project
- **"Firma jurídica y tecnología para decisiones más claras"** — From footer
- **Colors, typography, card design** — All from `globals.css` design system

No invented claims or generic language. The composition tells the project's own story.
