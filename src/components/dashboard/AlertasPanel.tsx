"use client";

import { actividad } from "@/data/demo-data";
import { CheckCircle, AlertTriangle, XCircle, PlusCircle, Cpu, ArrowDownCircle } from "lucide-react";

const iconMap: Record<string, { icon: React.ReactNode; dot: string }> = {
    credito_aprobado: { icon: <CheckCircle className="w-4 h-4" style={{ color: "#059669" }} />, dot: "#059669" },
    pago_recibido: { icon: <ArrowDownCircle className="w-4 h-4" style={{ color: "#0284c7" }} />, dot: "#0284c7" },
    alerta_mora: { icon: <AlertTriangle className="w-4 h-4" style={{ color: "#d97706" }} />, dot: "#d97706" },
    solicitud_nueva: { icon: <PlusCircle className="w-4 h-4" style={{ color: "#00B894" }} />, dot: "#00B894" },
    score_calculado: { icon: <Cpu className="w-4 h-4" style={{ color: "#0284c7" }} />, dot: "#0284c7" },
    desembolso: { icon: <CheckCircle className="w-4 h-4" style={{ color: "#059669" }} />, dot: "#059669" },
    credito_rechazado: { icon: <XCircle className="w-4 h-4" style={{ color: "#dc2626" }} />, dot: "#dc2626" },
};

export function AlertasPanel() {
    return (
          <div
                  className="bg-white rounded-2xl p-5"
                  style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                >
                <h3 className="text-sm font-bold mb-4" style={{ color: "#0A2540" }}>Actividad reciente</h3>h3>
                <div className="space-y-1 max-h-72 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                  {actividad.slice(0, 10).map((item, idx) => {
                            const cfg = iconMap[item.tipo] ?? { icon: <div className="w-4 h-4 rounded-full" style={{ background: "#e2e8f0" }} />, dot: "#e2e8f0" };
                            return (
                                          <div
                                                          key={item.id}
                                                          className="flex items-start gap-3 py-2.5 px-2 rounded-xl transition-colors"
                                                          style={{ animationDelay: `${idx * 50}ms` }}
                                                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f8fafc"; }}
                                                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                                                        >
                                                        <div className="flex-shrink-0 mt-0.5">{cfg.icon}</div>div>
                                                        <div className="flex-1 min-w-0">
                                                                        <p className="text-xs leading-snug" style={{ color: "#334155" }}>{item.descripcion}</p>p>
                                                                        <p className="text-[11px] mt-0.5" style={{ color: "#94a3b8" }}>{item.fecha}</p>p>
                                                        </div>div>
                                          </div>div>
                                        );
                })}
                </div>div>
          </div>div>
        );
}</div>
