import { NextRequest, NextResponse } from "next/server";
import { gemini } from "@/lib/gemini";
import { cartera_contexto_ia } from "@/data/demo-data";

export async function POST(req: NextRequest) {
  try {
    const { mensaje, historial } = await req.json();

    if (!mensaje) {
      return NextResponse.json(
        { error: "El campo 'mensaje' es requerido" },
        { status: 400 }
      );
    }

    const contexto = JSON.stringify(cartera_contexto_ia, null, 2);

    const systemPrompt = `Eres el asistente financiero inteligente del fondo de empleados COFEM, con sede en Pereira, Colombia. 
Tu función es ayudar al equipo directivo y administrativo a entender y gestionar la cartera de créditos.

DATOS ACTUALES DEL FONDO:
${contexto}

INSTRUCCIONES:
- Responde siempre en español formal colombiano
- Solo usa los datos del contexto proporcionado, no inventes cifras
- Sé conciso: máximo 150 palabras por respuesta
- Si te preguntan algo que no está en los datos, di que no tienes esa información disponible
- Puedes hacer cálculos simples con los datos disponibles
- Usa formato de moneda colombiana (COP) cuando menciones valores
- Sé analítico y proporciona insights útiles basados en los datos`;

    const chat = gemini.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [
            {
              text: "Entendido. Soy el asistente financiero de COFEM. Tengo acceso a los datos actuales de la cartera y estoy listo para ayudarle con análisis, consultas y recomendaciones sobre la gestión financiera del fondo.",
            },
          ],
        },
        ...(historial || []).map(
          (msg: { role: string; content: string }) => ({
            role: msg.role as "user" | "model",
            parts: [{ text: msg.content }],
          })
        ),
      ],
    });

    const result = await chat.sendMessageStream(mensaje);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error en /api/ai/chat:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud con Gemini" },
      { status: 500 }
    );
  }
}
