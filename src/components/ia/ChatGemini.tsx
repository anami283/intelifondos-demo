"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";

interface Mensaje {
  rol: "usuario" | "asistente";
  texto: string;
}

const CHIPS = [
  "Cual es el ICV actual?",
  "Cuantas solicitudes hay pendientes?",
  "Resume la planilla de nomina",
  "Que alertas de mora hay?",
  "Como esta la cartera de creditos?",
];

export function ChatGemini() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { rol: "asistente", texto: "Hola! Soy el asistente IA de Intelifondos. Puedo ayudarte con informacion sobre cartera, nomina, solicitudes y mas. Como puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const enviar = async (texto?: string) => {
    const msg = texto || input.trim();
    if (!msg || cargando) return;
    setInput("");
    const nuevos: Mensaje[] = [...mensajes, { rol: "usuario", texto: msg }];
    setMensajes(nuevos);
    setCargando(true);

    try {
      const historial = nuevos.slice(0, -1).map((m) => ({
        rol: m.rol === "usuario" ? "user" : "model",
        texto: m.texto,
      }));
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: msg, historial }),
      });
      if (!res.ok || !res.body) throw new Error("Error");
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let respuesta = "";
      setMensajes([...nuevos, { rol: "asistente", texto: "" }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        respuesta += dec.decode(value, { stream: true });
        setMensajes([...nuevos, { rol: "asistente", texto: respuesta }]);
      }
    } catch {
      setMensajes([...nuevos, { rol: "asistente", texto: "Error al conectar con Gemini. Intente de nuevo." }]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center gap-3 px-5 py-3.5" style={{ borderBottom: "1px solid #f1f5f9", background: "#0A2540" }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#00B894" }}>
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Asistente IA</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Powered by Gemini</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: "#00B894" }} />
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>En linea</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
        {mensajes.map((m, i) => (
          <div key={i} className={m.rol === "usuario" ? "flex justify-end" : "flex justify-start"}>
            {m.rol === "asistente" && (
              <div className="w-7 h-7 rounded-xl flex items-center justify-center mr-2 shrink-0 mt-0.5" style={{ background: "rgba(0,184,148,0.1)" }}>
                <Bot className="w-3.5 h-3.5" style={{ color: "#00B894" }} />
              </div>
            )}
            <div
              className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
              style={
                m.rol === "usuario"
                  ? { background: "#0A2540", color: "#ffffff" }
                  : { background: "#f8fafc", color: "#334155", border: "1px solid #e2e8f0" }
              }
            >
              {m.texto || (cargando && i === mensajes.length - 1 ? (
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              ) : "")}
            </div>
            {m.rol === "usuario" && (
              <div className="w-7 h-7 rounded-xl flex items-center justify-center ml-2 shrink-0 mt-0.5" style={{ background: "rgba(10,37,64,0.1)" }}>
                <User className="w-3.5 h-3.5" style={{ color: "#0A2540" }} />
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{ borderTop: "1px solid #f1f5f9" }}>
        <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2">
          {CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => enviar(chip)}
              disabled={cargando}
              className="text-xs px-3 py-1.5 rounded-full border transition-colors disabled:opacity-40"
              style={{ borderColor: "#e2e8f0", color: "#475569", background: "#f8fafc" }}
            >
              {chip}
            </button>
          ))}
        </div>
        <div className="flex gap-2 px-4 pb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && enviar()}
            placeholder="Escribe una pregunta..."
            disabled={cargando}
            className="flex-1 text-sm px-4 py-2.5 rounded-xl border outline-none transition-colors"
            style={{ borderColor: "#e2e8f0", color: "#334155" }}
          />
          <button
            onClick={() => enviar()}
            disabled={!input.trim() || cargando}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-40"
            style={{ background: "#0A2540" }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-xs pb-2" style={{ color: "#94a3b8" }}>
          Este chat usa Gemini API real
        </p>
      </div>
    </div>
  );
            }
