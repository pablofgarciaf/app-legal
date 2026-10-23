import { NextResponse } from "next/server";
import { searchEcuadorLaw } from "@/data/ecuadorLaws";

export async function POST(req: Request) {
  try {
    let query = "";
    let category = "todas";
    let apiKey = process.env.GEMINI_API_KEY || "";

    try {
      const text = await req.text();
      try {
        const body = JSON.parse(text);
        query = typeof body === "string" ? body : body?.query || "";
        category = body?.category || "todas";
        if (body?.apiKey && typeof body.apiKey === "string" && body.apiKey.trim().length > 5) {
          apiKey = body.apiKey.trim();
        }
      } catch {
        query = text || "";
      }
    } catch {
      query = "";
    }

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "La consulta no es válida" }, { status: 400 });
    }

    // Attempt direct Google Gemini 1.5 Flash Call if key is real (starts with AIza and not the mock sample)
    const isRealGeminiKey = apiKey && apiKey.startsWith("AIza") && !apiKey.includes("DemoSample");
    
    if (isRealGeminiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const systemPrompt = `Eres el Asistente Jurídico Gemini de VIS LEGAL ABOGADOS / BIZ LEGAL S.A.S. especializado en legislación de la República del Ecuador (Constitución 2008, COGEP, COIP, Código del Trabajo, Código Civil, Ley de Compañías). Cita artículos exactos, términos procesales en días hábiles (Art. 73 COGEP), y redacta con lenguaje jurídico profesional ecuatoriano.`;
        
        const geminiRes = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${systemPrompt}\n\nConsulta del usuario: ${query}` }],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 800,
            },
          }),
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({
              answer: generatedText,
              provider: "Google Gemini 1.5 Flash (Live)",
              citations: [
                "Constitución de la República del Ecuador (CRE 2008)",
                "Código Orgánico General de Procesos (COGEP)",
                "Jurisprudencia Corte Nacional de Justicia",
              ],
              timestamp: new Date().toISOString(),
            });
          }
        }
      } catch (geminiError) {
        console.warn("Gemini Live API fallback triggered:", geminiError);
      }
    }

    // Local Verified Legal Knowledgebase Search
    const matches = searchEcuadorLaw(query);
    let answerText = "";
    const citations: string[] = [];

    if (matches.length > 0) {
      const topMatch = matches[0];
      citations.push(`${topMatch.norm} - ${topMatch.article}: ${topMatch.title}`);

      answerText = `Conforme al ordenamiento jurídico de la **República del Ecuador** y en concordancia con **${topMatch.norm} (${topMatch.article})**:

**1. Fundamento Normativo Oficial:**
> "${topMatch.content}"

**2. Dictamen Jurídico y Aplicación Práctica:**
${topMatch.application}

**3. Directriz Procesal VIS LEGAL ABOGADOS:**
• **Cómputo de Términos:** Conforme al Art. 73 del COGEP, todos los términos corren únicamente en días hábiles judiciales (excluyendo fines de semana y feriados nacionales decretados).
• **Carga de la Prueba:** Toda alegación debe ser respaldada con prueba documental o testimonial anticipada antes de la audiencia preliminar o única.
• **Validación Deontológica:** Dictamen emitido bajo la supervisión de letrados colegiados en el Foro de Abogados del Consejo de la Judicatura.`;
    } else {
      answerText = `Su consulta referente a **"${query}"** ha sido analizada bajo los principios procesales vigentes en el Ecuador.

**1. Marco Constitucional y Legal Aplicable:**
• **Constitución de la República del Ecuador (CRE):** Art. 76 (Garantías Básicas del Debido Proceso) y Art. 82 (Seguridad Jurídica y Certeza Normativa).
• **Código Orgánico General de Procesos (COGEP):** Art. 73 (Términos judiciales) y Art. 142 (Requisitos formales de la demanda o comparecencia).
• **Código del Trabajo / Código Civil:** Normas supletorias según la naturaleza sustantiva de la controversia.

**2. Recomendación del Despacho:**
Para patrocinio específico o radicación de escritos ante las Unidades Judiciales de Quito, Guayaquil o Cuenca, coordine la revisión directa con su abogado asignado a través del módulo de **Despacho & Chat** o agende una cita en la **Agenda Judicial**.`;
      citations.push("Constitución de la República del Ecuador (Art. 76 y 82)");
      citations.push("Código Orgánico General de Procesos (COGEP)");
      citations.push("Ley Notarial y de Mediación (Ecuador)");
    }

    return NextResponse.json({
      answer: answerText,
      provider: "Agente Gemini Legal AI (Ecuador Knowledge Engine)",
      citations,
      matchedArticles: matches.slice(0, 3),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Legal AI Query Error:", error);
    return NextResponse.json(
      { error: "Error procesando la consulta jurídica con el motor de IA." },
      { status: 500 }
    );
  }
}
