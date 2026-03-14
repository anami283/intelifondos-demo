"use client";

import { useEffect, useState } from "react";
import { Solicitud } from "@/data/demo-data";
import { formatCOP } from "@/lib/utils";
import { toast } from "sonner";
import { CheckCircle, XCircle, Brain, Shield, TrendingUp, AlertTriangle } from "lucide-react";

const loadingMessages = [
  "Analizando perfil financiero...",
  "Calculando capacidad de endeudamiento...",
  "Evaluando historial crediticio...",
  "Generando recomendación IA...",
];

interface ScoreIAProps {
  solicitud: Solicitud;
}

export function ScoreIA({ solicitud }: ScoreIAProps) {
  const [loading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [approved, setApproved] = useState<boolean | null>(null);
  const [scoreAnimated, setScoreAnimated] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    loadingMessages.forEach((_, i) => {
      timers.push(setTimeout(() => setLoadingMsg(i), i * 575));
    });
    timers.push(
      setTimeout(() => {
        setLoading(false);
        // Animate score
        let s = 0;
        const interval = setInterval(() => {
          s += 2;
          if (s >= solicitud.score_ia) {
            setScoreAnimated(solicitud.score_ia);
            clearInterval(interval);
          } else {
            setScoreAnimated(s);
          }
        }, 15);
      }, 2300)
    );
    return () => timers.forEach(clearTimeout);
  }, [solicitud.score_ia]);

  const handleAction = (action: "aprobar" | "rechazar") => {
    setApproved(action === "aprobar");
    if (action === "aprobar") {
      toast.success(
        `✓ Solicitud ${solicitud.numero} aprobada · Asociado notificado`,
        { duration: 4000 }
      );
    } else {
      toast.error(
        `Solicitud ${solicitud.numero} rechazada · Se notificará al asociado`,
        { duration: 4000 }
      );
    }
  };

  const scoreColor =
    solicitud.score_ia >= 80
      ? "#00B894"
      : solicitud.score_ia >= 60
      ? "#f59e0b"
      : "#ef4444";

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset =
    circumference - (scoreAnimated / 100) * circumference;

  const riesgoColors: Record<string, string> = {
    BAJO: "bg-green-100 text-green-700",
    MEDIO: "bg-amber-100 text-amber-700",
    ALTO: "bg-orange-100 text-orange-700",
    MUY_ALTO: "bg-red-100 text-red-700",
  };

  const barData = [
    {
      label: "Capacidad de pago",
      value: Math.min(
        100,
        ((solicitud.asociado.salario -
          solicitud.asociado.descuentos -
          solicitud.cuota_mensual) /
          solicitud.asociado.salario) *
          100 *
          3
      ),
      color: "#00B894",
    },
    {
      label: "Respaldo en ahorros",
      value: Math.min(
        100,
        (solicitud.asociado.ahorros / solicitud.monto) * 100
      ),
      color: "#6C63FF",
    },
    {
      label: "Antigüedad en el fondo",
      value: Math.min(100, (solicitud.asociado.antiguedad / 15) * 100),
      color: "#0A2540",
    },
    {
      label: "Nivel de endeudamiento",
      value: Math.max(
        0,
        100 -
          ((solicitud.asociado.descuentos + solicitud.cuota_mensual) /
            solicitud.asociado.salario) *
            100 *
            2.5
      ),
      color: "#f59e0b",
    },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 flex flex-col items-center justify-center min-h-64">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-[#6C63FF]/20 border-t-[#6C63FF] animate-spin" />
          <Brain className="w-6 h-6 text-[#6C63FF] absolute inset-0 m-auto" />
        </div>
        <p className="text-sm font-medium text-[#6C63FF] text-center transition-all duration-300">
          {loadingMessages[loadingMsg]}
        </p>
        <div className="flex gap-1 mt-4">
          {loadingMessages.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i <= loadingMsg ? "bg-[#6C63FF]" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
      {/* Velocímetro Score */}
      <div className="flex flex-col items-center">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          Score IA de Riesgo
        </p>
        <div className="relative">
          <svg viewBox="0 0 120 120" className="w-36 h-36">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={scoreColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 60 60)"
              style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-3xl font-bold"
              style={{ color: scoreColor }}
            >
              {scoreAnimated}
            </span>
            <span className="text-xs text-gray-400">/100</span>
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full mt-2 ${riesgoColors[solicitud.nivel_riesgo]}`}
        >
          Riesgo {solicitud.nivel_riesgo.replace("_", " ")}
        </span>
      </div>

      {/* Barras de factores */}
      <div className="space-y-3">
        {barData.map((bar, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">{bar.label}</span>
              <span className="font-medium" style={{ color: bar.color }}>
                {Math.round(bar.value)}%
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  backgroundColor: bar.color,
                  width: `${bar.value}%`,
                  transition: `width 0.8s ease-out ${i * 0.15}s`,
                  transitionDelay: `${i * 0.15}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recomendación IA */}
      <div className="bg-[#F8FAFB] rounded-lg p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-[#6C63FF]" />
          <p className="text-xs font-semibold text-[#6C63FF]">
            Recomendación Gemini AI
          </p>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          {solicitud.justificacion_ia}
        </p>
      </div>

      {/* Alertas si las hay */}
      {solicitud.nivel_riesgo !== "BAJO" && (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg p-3">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">
            Verificar compromisos financieros externos antes de aprobar.
          </p>
        </div>
      )}

      {/* Botones de acción */}
      {approved === null ? (
        <div className="flex gap-3 pt-1">
          <button
            onClick={() => handleAction("aprobar")}
            className="flex-1 bg-[#00B894] hover:bg-[#00a884] text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Aprobar
          </button>
          <button
            onClick={() => handleAction("rechazar")}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <XCircle className="w-4 h-4" />
            Rechazar
          </button>
        </div>
      ) : (
        <div
          className={`text-center py-3 rounded-lg font-semibold text-sm ${
            approved
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {approved
            ? "✓ Solicitud aprobada · Asociado notificado"
            : "✗ Solicitud rechazada · Asociado notificado"}
        </div>
      )}
    </div>
  );
}
