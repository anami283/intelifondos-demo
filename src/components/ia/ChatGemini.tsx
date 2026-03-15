"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { cartera_contexto_ia } from "@/data/demo-data";

interface Message {
    role: "user" | "model";
    content: string;
}

const quickQuestions = [
    "Cual es el indice de mora actual?",
    "Cuantos creditos activos tenemos?",
    "Como va el recaudo este mes?",
    "Cual es la tasa de aprobacion?",
  ];

const initialHistory: Message[] = [
  {
        role: "user",
        content: "Cual es el estado general de la cartera de COFEM?",
  },
  {
        role: "model",
        content:
                "La cartera de COFEM muestra un desempeno solido con $847.500.000 COP en creditos activos (127 creditos vigentes). El indice de calidad de cartera es del 3,2%, dentro del rango aceptable para fondos de empleados. El recaudo mensual alcanzo $64.320.000 COP, con desembolsos crecientes: +9,5% respecto al mes anterior ($81M vs $74M). Los creditos en mora superan los $27M, lo que amerita seguimiento especial en los casos de 30+ dias.",
  },
  {
        role: "user",
        content: "Cuantas solicitudes estan pendientes de aprobacion?",
  },
  {
        role: "model",
        content:
                "Actualmente hay 3 solicitudes pendientes y 2 en revision por el comite, para un total de 5 en proceso. La tasa de aprobacion mensual se mantiene en 68%, con un score promedio de 91/100 para los creditos aprobados. El sistema de IA ha analizado todas las solicitudes activas y tiene recomendaciones disponibles para cada caso.",
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
                          body: JSON.stringify({ mensaje: text, historial: messages }),
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
                  { role: "model", content: "Lo siento, ocurrio un error. Por favor intente nuevamente." },
                        ]);
        } finally {
                setLoading(false);
        }
  };

  return (
        <div className="flex flex-col gap-4 h-full">
          {/* Panel contexto */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <button
                                  onClick={() => setShowContext(!showContext)}
                                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full" style={{ background: "#00B894" }} />
                                            Contexto enviado a Gemini
                                </span>span>
                        {showContext ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>button>
                {showContext && (
                    <div className="px-4 pb-4 border-t border-slate-100">
                                <pre className="text-xs bg-slate-50 rounded-lg p-3 overflow-auto max-h-48 text-slate-600 font-mono mt-3">
                                  {JSON.stringify(cartera_contexto_ia, null, 2)}
                                </pre>pre>
                    </div>div>
                      )}
              </div>div>
        
          {/* Chat principal */}
              <div
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden"
                        style={{ height: "calc(100vh - 19rem)", minHeight: "480px" }}
                      >
                {/* Header del chat */}
                      <div
                                  className="flex-shrink-0 px-5 py-4 border-b border-slate-100"
                                  style={{ background: "linear-gradient(135deg, #0A2540 0%, #0d3460 100%)" }}
                                >
                                <div className="flex items-center gap-3">
                                            <div
                                                            className="w-9 h-9 rounded-xl flex items-center justify-center"
                                                            style={{ background: "rgba(0,184,148,0.2)", border: "1px solid rgba(0,184,148,0.3)" }}
                                                          >
                                                          <Sparkles className="w-4 h-4" style={{ color: "#00B894" }} />
                                            </div>div>
                                            <div>
                                                          <p className="text-sm font-bold text-white">Asistente Financiero IA</p>p>
                                                          <p className="text-xs" style={{ color: "#64748b" }}>Gemini 1.5 Flash - Datos COFEM en tiempo real</p>p>
                                            </div>div>
                                            <div className="ml-auto flex items-center gap-1.5">
                                                          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00B894" }} />
                                                          <span className="text-xs font-semibold" style={{ color: "#00B894" }}>En linea</span>span>
                                            </div>div>
                                </div>div>
                      </div>div>
              
                {/* Mensajes con scroll */}
                      <div
                                  className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
                                  style={{ scrollbarWidth: "thin", scrollbarColor: "#e2e8f0 transparent" }}
                                >
                        {messages.map((msg, i) => (
                                              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                                                            <div
                                                                              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                                                                              style={{
                                                                                                  background: msg.role === "model" ? "#0A2540" : "#00B894",
                                                                                                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                                                              }}
                                                                            >
                                                              {msg.role === "model" ? (
                                                                                                <Bot className="w-4 h-4" style={{ color: "#00B894" }} />
                                                                                              ) : (
                                                                                                <User className="w-4 h-4 text-white" />
                                                                                              )}
                                                            </div>div>
                                                            <div
                                                                              className="rounded-2xl px-4 py-3 max-w-[78%] text-sm leading-relaxed"
                                                                              style={msg.role === "model" ? {
                                                                                                  background: "#f8fafc",
                                                                                                  color: "#334155",
                                                                                                  border: "1px solid #e2e8f0",
                                                                                                  borderTopLeftRadius: "4px",
                                                                              } : {
                                                                                                  background: "#0A2540",
                                                                                                  color: "#ffffff",
                                                                                                  borderTopRightRadius: "4px",
                                                                              }}
                                                                            >
                                                              {msg.content || (
                                                                                                <span className="inline-flex gap-1 items-center py-0.5">
                                                                                                                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#00B894", animationDelay: "0ms" }} />
                                                                                                                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#00B894", animationDelay: "150ms" }} />
                                                                                                                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#00B894", animationDelay: "300ms" }} />
                                                                                                  </span>span>
                                                                            )}
                                                            </div>div>
                                              </div>div>
                                            ))}
                                <div ref={endRef} />
                      </div>div>
              
                {/* Chips preguntas rapidas */}
                      <div className="flex-shrink-0 px-5 py-3 border-t border-slate-100" style={{ background: "#fafbfc" }}>
                                <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "#94a3b8" }}>Preguntas frecuentes</p>p>
                                <div className="flex flex-wrap gap-2">
                                  {quickQuestions.map((q) => (
                                      <button
                                                        key={q}
                                                        onClick={() => sendMessage(q)}
                                                        disabled={loading}
                                                        className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-full transition-all hover:scale-105 disabled:opacity-50 font-medium"
                                                        style={{ color: "#0A2540" }}
                                                        onMouseEnter={(e) => {
                                                                            (e.currentTarget as HTMLElement).style.borderColor = "#00B894";
                                                                            (e.currentTarget as HTMLElement).style.color = "#00B894";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                                            (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
                                                                            (e.currentTarget as HTMLElement).style.color = "#0A2540";
                                                        }}
                                                      >
                                        {q}
                                      </button>button>
                                    ))}
                                </div>div>
                      </div>div>
              
                {/* Input */}
                      <div className="flex-shrink-0 px-5 py-4 border-t border-slate-100 bg-white">
                                <div className="flex gap-3">
                                            <input
                                                            value={input}
                                                            onChange={(e) => setInput(e.target.value)}
                                                            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                                                            placeholder="Consulte sobre cartera, mora, solicitudes..."
                                                            disabled={loading}
                                                            className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none disabled:opacity-50 transition-all"
                                                            style={{ background: "#f8fafc" }}
                                                            onFocus={(e) => { e.currentTarget.style.borderColor = "#00B894"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,184,148,0.12)"; }}
                                                            onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}
                                                          />
                                            <button
                                                            onClick={() => sendMessage(input)}
                                                            disabled={loading || !input.trim()}
                                                            className="p-3 rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
                                                            style={{
                                                                              background: input.trim() && !loading ? "#0A2540" : "#e2e8f0",
                                                                              color: input.trim() && !loading ? "#ffffff" : "#94a3b8",
                                                                              boxShadow: input.trim() && !loading ? "0 2px 8px rgba(10,37,64,0.25)" : "none",
                                                            }}
                                                          >
                                                          <Send className="w-4 h-4" />
                                            </button>button>
                                </div>div>
                      </div>div>
              
                {/* Footer discreto */}
                      <div className="flex-shrink-0 px-5 pb-2.5 flex items-center justify-center gap-1.5">
                                <Sparkles className="w-3 h-3" style={{ color: "#cbd5e1" }} />
                                <p className="text-[11px]" style={{ color: "#cbd5e1" }}>
                                            Respuestas generadas por Gemini API - Solo con fines demostrativos
                                </p>p>
                      </div>div>
              </div>div>
        </div>div>
      );
}</div>
