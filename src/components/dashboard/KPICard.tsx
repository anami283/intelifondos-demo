"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number;
  format?: "cop" | "number" | "percent";
  suffix?: string;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
  color?: "verde" | "ia" | "primary" | "default";
}

function useCountUp(target: number, duration: number = 1200) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  return count;
}

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

  const accentColor = {
    verde: "text-[#00B894]",
    ia: "text-[#6C63FF]",
    primary: "text-[#0A2540]",
    default: "text-gray-700",
  }[color];

  const bgColor = {
    verde: "bg-[#00B894]/10",
    ia: "bg-[#6C63FF]/10",
    primary: "bg-[#0A2540]/10",
    default: "bg-gray-100",
  }[color];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {title}
        </p>
        {icon && (
          <div className={cn("p-2 rounded-lg", bgColor)}>
            <div className={cn("w-4 h-4", accentColor)}>{icon}</div>
          </div>
        )}
      </div>
      <p className={cn("text-2xl font-bold tracking-tight", accentColor)}>
        {formatValue(animated)}
        {suffix && <span className="text-sm font-normal ml-1 text-gray-400">{suffix}</span>}
      </p>
      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-2">
          {trend >= 0 ? (
            <TrendingUp className="w-3 h-3 text-[#00B894]" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-500" />
          )}
          <span
            className={cn(
              "text-xs font-medium",
              trend >= 0 ? "text-[#00B894]" : "text-red-500"
            )}
          >
            {trend >= 0 ? "+" : ""}
            {trend.toFixed(1)}%
          </span>
          {trendLabel && (
            <span className="text-xs text-gray-400">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
