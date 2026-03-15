"use client";
import { useEffect, useState } from "react";
import { Solicitud } from "@/data/demo-data";
import { formatCOP } from "@/lib/utils";
import { toast } from "sonner";
import { CheckCircle, XCircle, Brain, Shield, AlertTriangle } from "lucide-react";

const loadingMessages = [
  "Analizando perfil financiero...",
  "Calculando capacidad de endeudamiento...",
  "Evaluando historial crediticio...",
  "Generando recomendacion IA...",
];

interface ScoreIAProps {
  solicitud: Solicitud;
}

export function ScoreIA({ solicitud }: ScoreIAProps) {
  const [loading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMsg((i) => Math.min(i + 1, loadingMessages.length - 1));
    }, 600);
    const timer = setTimeout(() => {
      clearInterval(interval);
      setLoading(false);
    }, 2500);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [solicitud.id]);

  const score = solicitud.score_ia;
  const color = score >= 80 ? "#059669" : score >= 60 ? "#d97706" : "#dc2626";
  const bg = score >= 80 ? "rgba(5,150,105,0.06)" : score >= 60 ? "rgba(245,158,11,0.06)" : "rgba(220,38,38,0.06)";
  const label = score >= 80 ? "Alto" : score >= 60 ? "Medio" : "Bajo";
  const Icon = score >= 80 ? CheckCircle : score >= 60 ? AlertTriangle : XCircle;

  return (
    <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-4 h-4" style={{ color: "#00B894" }} />
        <h3 className="text-sm font-bold" style={{ color: "#0A2540" }}>Analisis de Score IA</h3>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#00B894", borderTopColor: "transparent" }} />
          <p className="text-sm font-medium" style={{ color: "#00B894" }}>{loadingMessages[loadingMsg]}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: bg }}>
            <div className="text-center">
              <p className="text-4xl font-bold" style={{ color }}>{score}</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color }}>Riesgo {label}</p>
            </div>
            <div className="flex-1">
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: score + "%", background: color }}
                />
              </div>
              <p className="text-xs mt-1" style={{ color: "#64748b" }}>Score sobre 100 puntos</p>
            </div>
            <Icon className="w-6 h-6" style={{ color }} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs py-2" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ color: "#64748b" }}>Monto solicitado</span>
              <span className="font-semibold" style={{ color: "#0A2540" }}>{formatCOP(solicitud.monto)}</span>
            </div>
            <div className="flex justify-between text-xs py-2" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ color: "#64748b" }}>Capacidad de pago</span>
              <span className="font-semibold" style={{ color: "#059669" }}>
                {formatCOP(Math.round(solicitud.asociado.salario * 0.3))} / mes
              </span>
            </div>
            <div className="flex justify-between text-xs py-2" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ color: "#64748b" }}>Cuota estimada</span>
              <span className="font-semibold" style={{ color: "#0A2540" }}>
                {formatCOP(Math.round(solicitud.monto / solicitud.plazo))} / mes
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl" style={{ background: "#f8fafc" }}>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-3.5 h-3.5" style={{ color: "#0A2540" }} />
              <p className="text-xs font-semibold" style={{ color: "#0A2540" }}>Recomendacion IA</p>
            </div>
            <p className="text-xs" style={{ color: "#475569" }}>
              {score >= 80
                ? "Perfil crediticio excelente. Se recomienda aprobacion inmediata."
                : score >= 60
                ? "Perfil aceptable. Verificar capacidad de pago antes de aprobar."
                : "Riesgo alto. Se recomienda revision adicional o rechazo."}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => toast.success("Solicitud aprobada con Score IA " + score)}
              className="flex-1 py-2 text-xs font-semibold text-white rounded-xl"
              style={{ background: "#059669" }}
            >
              Aprobar
            </button>
            <button
              onClick={() => toast.error("Solicitud rechazada")}
              className="flex-1 py-2 text-xs font-semibold rounded-xl border"
              style={{ color: "#dc2626", borderColor: "#dc2626" }}
            >
              Rechazar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
