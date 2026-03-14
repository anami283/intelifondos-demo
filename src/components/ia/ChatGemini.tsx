"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ChevronDown, ChevronUp } from "lucide-react";
import { cartera_contexto_ia } from "@/data/demo-data";

interface Message {
  role: "user" | "model";
  content: string;
}

const quickQuestions = [
  "¿Cuál es el índice de mora actual?",
  "¿Cuántos créditos activos tenemos?",
  "¿Cómo va el recaudo este mes?",
  "¿Cuál es la tasa de aprobación?",
];

const initialHistory: Message[] = [
  {
    role: "user",
    content: "¿Cuál es el estado general de la cartera de COFEM?",
  },
  {
    role: "model",
    content:
      "La cartera de COFEM muestra un desempeño sólido con $847.500.000 COP en créditos activos (127 créditos vigentes). El índice de calidad de cartera es del 3,2%, dentro del rango aceptable para fondos de empleados. El recaudo mensual alcanzó $64.320.000 COP, con desembolsos crecientes: +9,5% respecto al mes anterior ($81M vs $74M). Los créditos en mora superan los $27M, lo que amerita seguimiento especial en los casos de 30+ días.",
  },
  {
    role: "user",
    content: "¿Cuántas solicitudes están pendientes de aprobación?",
  },
  {
    role: "model",
    content:
      "Actualmente hay 3 solicitudes pendientes y 2 en revisión por el comité, para un total de 5 en proceso. La tasa de aprobación mensual se mantiene en 68%, con un score promedio de 91/100 para los créditos aprobados. El sistema de IA ha analizado todas las solicitudes activas y tiene recomendaciones disponibles para cada caso.",
  },
];

export function ChatGemini() {
  const [messages, setMessages] = useState<Message[]>(initialHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensaje: text,
          historial: messages,
        }),
      });

      if (!res.ok) throw new Error("Error en la API");
      if (!res.body) throw new Error("Sin respuesta");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiText = "";

      setMessages((prev) => [...prev, { role: "model", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        aiText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "model", content: aiText };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content:
            "Lo siento, ocurrió un error al procesar su consulta. Por favor intente nuevamente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Panel contexto colapsable */}
      <div className="bg-white rounded-xl border border-gray-100">
        <button
          onClick={() => setShowContext(!showContext)}
          className="w-full flex items-center justify-between p-4 text-sm font-medium text-gray-700"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6C63FF]" />
            Contexto enviado a Gemini
          </span>
          {showContext ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {showContext && (
          <div className="px-4 pb-4">
            <pre className="text-xs bg-gray-50 rounded-lg p-3 overflow-auto max-h-48 text-gray-600 font-mono">
              {JSON.stringify(cartera_contexto_ia, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Chat */}
      <div className="flex-1 bg-white rounded-xl border border-gray-100 flex flex-col">
        {/* Mensajes */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-96">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "model"
                    ? "bg-[#6C63FF]/10"
                    : "bg-[#0A2540]/10"
                }`}
              >
                {msg.role === "model" ? (
                  <Bot className="w-3.5 h-3.5 text-[#6C63FF]" />
                ) : (
                  <User className="w-3.5 h-3.5 text-[#0A2540]" />
                )}
              </div>
              <div
                className={`rounded-xl px-4 py-2.5 max-w-[80%] text-sm leading-relaxed ${
                  msg.role === "model"
                    ? "bg-gray-50 text-gray-700"
                    : "bg-[#0A2540] text-white"
                }`}
              >
                {msg.content || (
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#6C63FF] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#6C63FF] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#6C63FF] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Quick questions */}
        <div className="px-4 py-2 border-t border-gray-50 flex flex-wrap gap-2">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={loading}
              className="text-xs bg-[#6C63FF]/10 hover:bg-[#6C63FF]/20 text-[#6C63FF] px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Consulte sobre cartera, mora, solicitudes..."
            disabled={loading}
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/30 disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            className="bg-[#6C63FF] hover:bg-[#5b52e8] disabled:bg-gray-200 text-white p-2.5 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
