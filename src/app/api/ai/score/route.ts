import { NextRequest, NextResponse } from "next/server";
import { geminiScore } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { asociado, solicitud } = await req.json();

    if (!asociado || !solicitud) {
      return NextResponse.json(
        { error: "Se requieren los campos 'asociado' y 'solicitud'" },
        { status: 400 }
      );
    }

    const prompt = `Eres un motor de análisis de riesgo crediticio para el fondo de empleados COFEM (Pereira, Colombia).
Analiza la siguiente solicitud y devuelve un JSON con el análisis de riesgo.

DATOS DEL ASOCIADO:
- Nombre: ${asociado.nombre}
- Cédula: ${asociado.cedula}
- Cargo: ${asociado.cargo}
- Salario bruto: $${asociado.salario.toLocaleString("es-CO")} COP
- Descuentos actuales: $${asociado.descuentos.toLocaleString("es-CO")} COP
- Antigüedad en el fondo: ${asociado.antiguedad} años
- Ahorros en el fondo: $${asociado.ahorros.toLocaleString("es-CO")} COP

DATOS DE LA SOLICITUD:
- Tipo: ${solicitud.tipo}
- Monto solicitado: $${solicitud.monto.toLocaleString("es-CO")} COP
- Plazo: ${solicitud.plazo} meses
- Cuota mensual estimada: $${solicitud.cuota_mensual.toLocaleString("es-CO")} COP

REGLAS DEL FONDO:
- El total de descuentos NO debe superar el 30% del salario
- Antigüedad mínima requerida: 2 años (excepto crédito de emergencia: 1 año)
- Monto máximo: $50.000.000 COP
- Plazo máximo: 84 meses

CALCULA:
- Salario neto disponible = Salario - Descuentos actuales - Cuota nueva
- Porcentaje de endeudamiento total = (Descuentos + Cuota nueva) / Salario * 100

Devuelve ÚNICAMENTE un JSON válido con esta estructura exacta:
{
  "score": <número entre 0 y 100>,
  "nivel_riesgo": <"BAJO" | "MEDIO" | "ALTO" | "MUY_ALTO">,
  "recomendacion": <"APROBAR" | "REVISAR" | "RECHAZAR">,
  "justificacion": <string, máximo 120 palabras, en español formal>,
  "alertas": [<lista de strings con alertas específicas, puede estar vacía>],
  "capacidad_cuota_maxima": <número en COP, basado en 30% del salario>
}`;

    const result = await geminiScore.generateContent(prompt);
    const responseText = result.response.text();

    // Extraer JSON de la respuesta
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No se pudo extraer JSON de la respuesta de Gemini");
    }

    const scoreData = JSON.parse(jsonMatch[0]);

    return NextResponse.json(scoreData);
  } catch (error) {
    console.error("Error en /api/ai/score:", error);
    // Fallback con datos del demo en caso de error
    return NextResponse.json({
      score: 75,
      nivel_riesgo: "MEDIO",
      recomendacion: "REVISAR",
      justificacion:
        "No fue posible calcular el score en tiempo real. Se muestra un análisis estimado basado en los parámetros básicos del asociado.",
      alertas: ["Verificación manual requerida"],
      capacidad_cuota_maxima: 0,
    });
  }
}
