"use client";

import { actividad } from "@/data/demo-data";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  PlusCircle,
  Cpu,
  ArrowDownCircle,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  credito_aprobado: <CheckCircle className="w-4 h-4 text-[#00B894]" />,
  pago_recibido: <ArrowDownCircle className="w-4 h-4 text-blue-500" />,
  alerta_mora: <AlertTriangle className="w-4 h-4 text-amber-500" />,
  solicitud_nueva: <PlusCircle className="w-4 h-4 text-[#6C63FF]" />,
  score_calculado: <Cpu className="w-4 h-4 text-[#6C63FF]" />,
  desembolso: <CheckCircle className="w-4 h-4 text-[#00B894]" />,
  credito_rechazado: <XCircle className="w-4 h-4 text-red-500" />,
};

export function AlertasPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Actividad reciente
      </h3>
      <div className="space-y-3 max-h-72 overflow-y-auto">
        {actividad.slice(0, 10).map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {iconMap[item.tipo] ?? (
                <div className="w-4 h-4 rounded-full bg-gray-200" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-700 leading-snug">
                {item.descripcion}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{item.fecha}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
