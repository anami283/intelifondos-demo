import { ReactNode } from "react";
import { formatCOP } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number;
  format?: "cop" | "number" | "percent";
  color?: "navy" | "teal" | "verde" | "amarillo" | "rojo";
  icon?: ReactNode;
  trend?: number;
}

const colorMap = {
  navy:     { bg: "rgba(10,37,64,0.06)",    text: "#0A2540", accent: "#0A2540" },
  teal:     { bg: "rgba(0,184,148,0.08)",   text: "#00B894", accent: "#00B894" },
  verde:    { bg: "rgba(5,150,105,0.08)",   text: "#059669", accent: "#059669" },
  amarillo: { bg: "rgba(245,158,11,0.08)",  text: "#d97706", accent: "#d97706" },
  rojo:     { bg: "rgba(220,38,38,0.08)",   text: "#dc2626", accent: "#dc2626" },
};

export function KPICard({ title, value, format = "number", color = "navy", icon, trend }: KPICardProps) {
  const c = colorMap[color];

  const formatted = () => {
    if (format === "cop") return formatCOP(value);
    if (format === "percent") return value.toFixed(1) + "%";
    return value.toLocaleString("es-CO");
  };

  return (
    <div
      className="bg-white rounded-2xl p-5 hover:shadow-md transition-all"
      style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
          {title}
        </p>
        {icon && (
          <div className="p-2 rounded-xl" style={{ background: c.bg, color: c.accent }}>
            {icon}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold mb-1" style={{ color: c.text }}>
        {formatted()}
      </p>
      {typeof trend === "number" && (
        <div className="flex items-center gap-1 mt-1">
          {trend >= 0 ? (
            <TrendingUp className="w-3 h-3" style={{ color: "#059669" }} />
          ) : (
            <TrendingDown className="w-3 h-3" style={{ color: "#dc2626" }} />
          )}
          <span className="text-xs font-semibold" style={{ color: trend >= 0 ? "#059669" : "#dc2626" }}>
            {Math.abs(trend)}% vs mes anterior
          </span>
        </div>
      )}
    </div>
  );
}
