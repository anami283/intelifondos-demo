"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
    title: string;
    value: number;
    format?: "cop" | "number" | "percent";
    suffix?: string;
    trend?: number;
    trendLabel?: string;
    icon?: React.ReactNode;
    color?: "verde" | "ia" | "primary" | "default" | "amarillo" | "rojo" | "teal" | "navy";
    description?: string;
}

function useCountUp(target: number, duration: number = 1400) {
    const [count, setCount] = useState(0);
    const startedRef = useRef(false);
    useEffect(() => {
          if (startedRef.current) return;
          startedRef.current = true;
          const startTime = Date.now();
          const tick = () => {
                  const elapsed = Date.now() - startTime;
                  const progress = Math.min(elapsed / duration, 1);
                  const eased = 1 - Math.pow(1 - progress, 4);
                  setCount(Math.round(target * eased));
                  if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
    }, [target, duration]);
    return count;
}

const colorMap: Record<string, { icon: string; iconBg: string; value: string; trend: string; trendBg: string }> = {
    verde: {
          icon: "#059669",
          iconBg: "rgba(5,150,105,0.1)",
          value: "#047857",
          trend: "#059669",
          trendBg: "rgba(5,150,105,0.08)",
    },
    ia: {
          icon: "#00B894",
          iconBg: "rgba(0,184,148,0.1)",
          value: "#00a884",
          trend: "#00B894",
          trendBg: "rgba(0,184,148,0.08)",
    },
    teal: {
          icon: "#00B894",
          iconBg: "rgba(0,184,148,0.1)",
          value: "#00a884",
          trend: "#00B894",
          trendBg: "rgba(0,184,148,0.08)",
    },
    primary: {
          icon: "#0A2540",
          iconBg: "rgba(10,37,64,0.08)",
          value: "#0A2540",
          trend: "#0A2540",
          trendBg: "rgba(10,37,64,0.06)",
    },
    navy: {
          icon: "#0A2540",
          iconBg: "rgba(10,37,64,0.08)",
          value: "#0A2540",
          trend: "#0A2540",
          trendBg: "rgba(10,37,64,0.06)",
    },
    amarillo: {
          icon: "#d97706",
          iconBg: "rgba(217,119,6,0.1)",
          value: "#b45309",
          trend: "#d97706",
          trendBg: "rgba(217,119,6,0.08)",
    },
    rojo: {
          icon: "#dc2626",
          iconBg: "rgba(220,38,38,0.1)",
          value: "#b91c1c",
          trend: "#dc2626",
          trendBg: "rgba(220,38,38,0.08)",
    },
  default: {
        icon: "#475569",
        iconBg: "rgba(71,85,105,0.08)",
        value: "#1e293b",
        trend: "#475569",
        trendBg: "rgba(71,85,105,0.06)",
  },
};

export function KPICard({
    title,
    value,
    format = "number",
    suffix = "",
    trend,
    trendLabel,
    icon,
    color = "default",
}: KPICardProps) {
    const animated = useCountUp(value);
    const cfg = colorMap[color] ?? colorMap.default;

  const formatValue = (v: number) => {
        if (format === "cop") {
                return new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                          notation: v >= 1_000_000 ? "compact" : "standard",
                }).format(v);
        }
        if (format === "percent") return `${v.toFixed(1)}%`;
        return new Intl.NumberFormat("es-CO").format(v);
  };

  const isPositiveTrend = trend !== undefined && trend >= 0;
    const trendColor = trend === undefined ? "" : trend >= 0 ? "#059669" : "#dc2626";
    const trendBg = trend === undefined ? "" : trend >= 0 ? "rgba(5,150,105,0.08)" : "rgba(220,38,38,0.08)";

  return (
        <div
                className="bg-white rounded-2xl p-5 hover:shadow-lg transition-all duration-300 cursor-default group"
                style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
              <div className="flex items-start justify-between mb-4">
                      <p
                                  className="text-xs font-semibold uppercase tracking-wider"
                                  style={{ color: "#94a3b8", letterSpacing: "0.06em" }}
                                >
                        {title}
                      </p>p>
                {icon && (
                          <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                        style={{ background: cfg.iconBg }}
                                      >
                                      <div className="w-5 h-5" style={{ color: cfg.icon }}>
                                        {icon}
                                      </div>div>
                          </div>div>
                      )}
              </div>div>
        
              <p className="text-2xl font-bold tracking-tight mb-3" style={{ color: cfg.value, letterSpacing: "-0.02em" }}>
                {formatValue(animated)}
                {suffix && <span className="text-sm font-normal ml-1" style={{ color: "#94a3b8" }}>{suffix}</span>span>}
              </p>p>
        
          {trend !== undefined && (
                        <div
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                                    style={{ background: trendBg, color: trendColor }}
                                  >
                          {isPositiveTrend ? (
                                                <TrendingUp className="w-3.5 h-3.5" />
                                              ) : (
                                                <TrendingDown className="w-3.5 h-3.5" />
                                              )}
                                  <span>{isPositiveTrend ? "+" : ""}{trend.toFixed(1)}%</span>span>
                          {trendLabel && (
                                                <span className="text-[10px] font-medium" style={{ color: "#94a3b8" }}>{trendLabel}</span>span>
                                  )}
                        </div>div>
              )}
        
          {trend === undefined && (
                        <div className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: cfg.icon }} />
                                  <span className="text-xs" style={{ color: "#94a3b8" }}>Tiempo real</span>span>
                        </div>div>
              )}
        </div>div>
      );
}</div>
