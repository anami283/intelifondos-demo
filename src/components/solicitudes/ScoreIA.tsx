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
                toast.success(`Solicitud ${solicitud.numero} aprobada - Asociado notificado`, { duration: 4000 });
        } else {
                toast.error(`Solicitud ${solicitud.numero} rechazada - Se notificara al asociado`, { duration: 4000 });
        }
  };

  const scoreColor = solicitud.score_ia >= 80 ? "#059669" : solicitud.score_ia >= 60 ? "#d97706" : "#dc2626";
    const circumference = 2 * Math.PI * 54;
    const strokeDashoffset = circumference - (scoreAnimated / 100) * circumference;

  const riesgoConfig: Record<string, { bg: string; color: string }> = {
        BAJO: { bg: "rgba(5,150,105,0.1)", color: "#059669" },
        MEDIO: { bg: "rgba(245,158,11,0.1)", color: "#d97706" },
        ALTO: { bg: "rgba(234,88,12,0.1)", color: "#ea580c" },
        MUY_ALTO: { bg: "rgba(220,38,38,0.1)", color: "#dc2626" },
  };

  const barData = [
    {
            label: "Capacidad de pago",
            value: Math.min(100, ((solicitud.asociado.salario - solicitud.asociado.descuentos - solicitud.cuota_mensual) / solicitud.asociado.salario) * 100 * 3),
            color: "#00B894",
    },
    {
            label: "Respaldo en ahorros",
            value: Math.min(100, (solicitud.asociado.ahorros / solicitud.monto) * 100),
            color: "#0284c7",
    },
    {
            label: "Antiguedad en el fondo",
            value: Math.min(100, (solicitud.asociado.antiguedad / 15) * 100),
            color: "#0A2540",
    },
    {
            label: "Nivel de endeudamiento",
            value: Math.max(0, 100 - ((solicitud.asociado.descuentos + solicitud.cuota_mensual) / solicitud.asociado.salario) * 100 * 2.5),
            color: "#d97706",
    },
      ];

  if (loading) {
        return (
                <div
                          className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center"
                          style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", minHeight: "16rem" }}
                        >
                        <div className="relative mb-6">
                                  <div
                                                className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin"
                                                style={{ borderColor: "rgba(0,184,148,0.2)", borderTopColor: "#00B894" }}
                                              />
                                  <Brain className="w-6 h-6 absolute inset-0 m-auto" style={{ color: "#00B894" }} />
                        </div>div>
                        <p className="text-sm font-medium text-center transition-all duration-300" style={{ color: "#00B894" }}>
                          {loadingMessages[loadingMsg]}
                        </p>p>
                        <div className="flex gap-1 mt-4">
                          {loadingMessages.map((_, i) => (
                                      <div
                                                      key={i}
                                                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                                                      style={{ background: i <= loadingMsg ? "#00B894" : "#e2e8f0" }}
                                                    />
                                    ))}
                        </div>div>
                </div>div>
              );
  }
  
    const riesgoCfg = riesgoConfig[solicitud.nivel_riesgo] ?? riesgoConfig.BAJO;
  
    return (
          <div
                  className="bg-white rounded-2xl p-6 space-y-5"
                  style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                >
            {/* Velocimetro Score */}
                <div className="flex flex-col items-center">
                        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#94a3b8" }}>
                                  Score IA de Riesgo
                        </p>p>
                        <div className="relative">
                                  <svg viewBox="0 0 120 120" className="w-36 h-36">
                                              <circle cx="60" cy="60" r="54" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                                              <circle
                                                              cx="60" cy="60" r="54" fill="none"
                                                              stroke={scoreColor} strokeWidth="10" strokeLinecap="round"
                                                              strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                                                              transform="rotate(-90 60 60)"
                                                              style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                                                            />
                                  </svg>svg>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                                              <span className="text-3xl font-bold" style={{ color: scoreColor }}>{scoreAnimated}</span>span>
                                              <span className="text-xs" style={{ color: "#94a3b8" }}>/100</span>span>
                                  </div>div>
                        </div>div>
                        <span
                                    className="text-xs font-semibold px-3 py-1 rounded-full mt-2"
                                    style={{ background: riesgoCfg.bg, color: riesgoCfg.color }}
                                  >
                                  Riesgo {solicitud.nivel_riesgo.replace("_", " ")}
                        </span>span>
                </div>div>
          
            {/* Barras factores */}
                <div className="space-y-3">
                  {barData.map((bar, i) => (
                            <div key={i}>
                                        <div className="flex justify-between text-xs mb-1">
                                                      <span style={{ color: "#64748b" }}>{bar.label}</span>span>
                                                      <span className="font-semibold" style={{ color: bar.color }}>{Math.round(bar.value)}%</span>span>
                                        </div>div>
                                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#f1f5f9" }}>
                                                      <div
                                                                        className="h-full rounded-full"
                                                                        style={{
                                                                                            background: bar.color,
                                                                                            width: `${bar.value}%`,
                                                                                            transition: `width 0.8s ease-out ${i * 0.15}s`,
                                                                        }}
                                                                      />
                                        </div>div>
                            </div>div>
                          ))}
                </div>div>
          
            {/* Recomendacion IA */}
                <div
                          className="rounded-xl p-4"
                          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                        >
                        <div className="flex items-center gap-2 mb-2">
                                  <Shield className="w-4 h-4" style={{ color: "#00B894" }} />
                                  <p className="text-xs font-semibold" style={{ color: "#00B894" }}>Recomendacion Gemini AI</p>p>
                        </div>div>
                        <p className="text-sm leading-relaxed" style={{ color: "#334155" }}>{solicitud.justificacion_ia}</p>p>
                </div>div>
          
            {/* Alerta si hay */}
            {solicitud.nivel_riesgo !== "BAJO" && (
                          <div
                                      className="flex items-start gap-2 rounded-lg p-3"
                                      style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}
                                    >
                                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#d97706" }} />
                                    <p className="text-xs" style={{ color: "#92400e" }}>
                                                Verificar compromisos financieros externos antes de aprobar.
                                    </p>p>
                          </div>div>
                )}
          
            {/* Cuota proyectada */}
                <div className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ background: "#f8fafc" }}>
                        <span className="text-xs" style={{ color: "#64748b" }}>Cuota proyectada</span>span>
                        <span className="text-sm font-bold" style={{ color: "#0A2540" }}>{formatCOP(solicitud.cuota_mensual)}/mes</span>span>
                </div>div>
          
            {/* Botones accion */}
            {approved === null ? (
                          <div className="flex gap-3 pt-1">
                                    <button
                                                  onClick={() => handleAction("aprobar")}
                                                  className="flex-1 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                                                  style={{ background: "linear-gradient(135deg, #059669, #00B894)", boxShadow: "0 4px 12px rgba(5,150,105,0.25)" }}
                                                >
                                                <CheckCircle className="w-4 h-4" />
                                                Aprobar
                                    </button>button>
                                    <button
                                                  onClick={() => handleAction("rechazar")}
                                                  className="flex-1 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                                                  style={{ background: "linear-gradient(135deg, #dc2626, #ef4444)", boxShadow: "0 4px 12px rgba(220,38,38,0.25)" }}
                                                >
                                                <XCircle className="w-4 h-4" />
                                                Rechazar
                                    </button>button>
                          </div>div>
                        ) : (
                          <div
                                      className="text-center py-3 rounded-xl font-semibold text-sm"
                                      style={approved ? {
                                                    background: "rgba(5,150,105,0.08)",
                                                    color: "#059669",
                                                    border: "1px solid rgba(5,150,105,0.2)",
                                      } : {
                                                    background: "rgba(220,38,38,0.08)",
                                                    color: "#dc2626",
                                                    border: "1px solid rgba(220,38,38,0.2)",
                                      }}
                                    >
                            {approved ? "Solicitud aprobada - Asociado notificado" : "Solicitud rechazada - Asociado notificado"}
                          </div>div>
                )}
          </div>div>
        );
}</div>
