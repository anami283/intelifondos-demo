"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { KPICard } from "@/components/dashboard/KPICard";
import { cartera } from "@/data/demo-data";
import { formatCOP } from "@/lib/utils";
import { toast } from "sonner";
import { Wallet, AlertTriangle, TrendingDown, Percent, CreditCard, Download, Sparkles } from "lucide-react";

const REPORTE_TEXTS = [
      "Analizando portafolio crediticio...",
      "Calculando indices de mora...",
      "Generando analisis de riesgo...",
      "Redactando reporte ejecutivo...",
    ];

export default function CarteraPage() {
      const [generando, setGenerando] = useState(false);
      const [reporte, setReporte] = useState<string | null>(null);
      const [msgIdx, setMsgIdx] = useState(0);

  const subtitleText = cartera.activos + " creditos activos - ICV " + cartera.icv + "%";

  const generarReporte = async () => {
          setGenerando(true);
          setReporte(null);
          setMsgIdx(0);
          const interval = setInterval(() => {
                    setMsgIdx((i) => Math.min(i + 1, REPORTE_TEXTS.length - 1));
          }, 700);
          try {
                    const res = await fetch("/api/ai/chat", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                              mensaje: "Genera un analisis ejecutivo breve de la cartera de COFEM: estado general, principales indicadores, alertas de mora y 2 recomendaciones concretas. Maximo 120 palabras.",
                                              historial: [],
                                }),
                    });
                    if (!res.ok || !res.body) throw new Error("Error");
                    const reader = res.body.getReader();
                    const decoder = new TextDecoder();
                    let text = "";
                    clearInterval(interval);
                    setGenerando(false);
                    setReporte("");
                    while (true) {
                                const { done, value } = await reader.read();
                                if (done) break;
                                text += decoder.decode(value, { stream: true });
                                setReporte(text);
                    }
          } catch {
                    clearInterval(interval);
                    setGenerando(false);
                    setReporte("Error al generar el reporte. Verifique la conexion con Gemini AI.");
          }
  };

  return (
          <>
                <Header title="Gestion de Cartera" subtitle={subtitleText} breadcrumb="Cartera" />
                <div className="p-5 lg:p-6 space-y-6">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                  <KPICard title="Cartera total" value={cartera.total} format="cop" color="navy" icon={<Wallet className="w-5 h-5" />} />
                                  <KPICard title="Creditos activos" value={cartera.activos} format="number" color="verde" icon={<CreditCard className="w-5 h-5" />} />
                                  <KPICard title="ICV" value={cartera.icv} format="percent" color="teal" icon={<Percent className="w-5 h-5" />} />
                                  <KPICard title="Mora 30 dias" value={cartera.mora_30} format="cop" color="amarillo" icon={<AlertTriangle className="w-5 h-5" />} />
                                  <KPICard title="Mora mas 30 dias" value={cartera.mora_mas30} format="cop" color="rojo" icon={<TrendingDown className="w-5 h-5" />} />
                                  <KPICard title="Recaudo mensual" value={cartera.recaudo} format="cop" color="verde" icon={<Wallet className="w-5 h-5" />} />
                        </div>div>
                
                        <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                                  <div className="flex items-center justify-between mb-4">
                                              <h3 className="text-sm font-bold" style={{ color: "#0A2540" }}>Creditos con alertas</h3>h3>
                                              <button
                                                                onClick={() => toast.success("Exportando reporte de cartera...")}
                                                                className="flex items-center gap-1.5 text-xs border border-slate-200 px-3 py-1.5 rounded-lg transition-colors hover:border-slate-300"
                                                                style={{ color: "#475569" }}
                                                              >
                                                            <Download className="w-3 h-3" /> Exportar
                                              </button>button>
                                  </div>div>
                                  <div className="overflow-x-auto">
                                              <table className="w-full text-sm">
                                                            <thead style={{ background: "#f8fafc" }}>
                                                                            <tr className="text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                                                                                              <th className="px-3 py-2.5">ID</th>th>
                                                                                              <th className="px-3 py-2.5">Asociado</th>th>
                                                                                              <th className="px-3 py-2.5">Monto</th>th>
                                                                                              <th className="px-3 py-2.5">Saldo</th>th>
                                                                                              <th className="px-3 py-2.5">Cuota</th>th>
                                                                                              <th className="px-3 py-2.5">Dias mora</th>th>
                                                                                              <th className="px-3 py-2.5">Estado</th>th>
                                                                            </tr>tr>
                                                            </thead>thead>
                                                            <tbody className="divide-y divide-slate-50">
                                                                {cartera.creditos.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-3 py-3 font-mono text-xs" style={{ color: "#64748b" }}>{c.id}</td>td>
                                                    <td className="px-3 py-3 font-semibold" style={{ color: "#0A2540" }}>{c.asociado}</td>td>
                                                    <td className="px-3 py-3" style={{ color: "#475569" }}>{formatCOP(c.monto)}</td>td>
                                                    <td className="px-3 py-3" style={{ color: "#475569" }}>{formatCOP(c.saldo)}</td>td>
                                                    <td className="px-3 py-3" style={{ color: "#475569" }}>{formatCOP(c.cuota)}</td>td>
                                                    <td className="px-3 py-3">
                                                                          <span className="font-bold text-sm" style={{ color: c.dias_mora === 0 ? "#059669" : c.dias_mora < 30 ? "#d97706" : c.dias_mora < 60 ? "#ea580c" : "#dc2626" }}>
                                                                              {c.dias_mora}
                                                                          </span>span>
                                                    </td>td>
                                                    <td className="px-3 py-3">
                                                                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{
                                                            background: c.estado === "al_dia" ? "rgba(5,150,105,0.1)" : c.estado === "mora" ? "rgba(245,158,11,0.1)" : "rgba(220,38,38,0.1)",
                                                            color: c.estado === "al_dia" ? "#059669" : c.estado === "mora" ? "#d97706" : "#dc2626",
                                }}>
                                                                              {c.estado === "al_dia" ? "Al dia" : c.estado === "mora" ? "En mora" : "Mora critica"}
                                                                          </span>span>
                                                    </td>td>
                                </tr>tr>
                              ))}
                                                            </tbody>tbody>
                                              </table>table>
                                  </div>div>
                        </div>div>
                
                        <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                                  <div className="flex items-center justify-between mb-4">
                                              <h3 className="text-sm font-bold" style={{ color: "#0A2540" }}>Analisis IA de cartera</h3>h3>
                                              <button onClick={generarReporte} disabled={generando} className="flex items-center gap-2 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50" style={{ background: generando ? "#94a3b8" : "#0A2540" }}>
                                                            <Sparkles className="w-3.5 h-3.5" />
                                                  {generando ? "Generando..." : "Generar reporte IA"}
                                              </button>button>
                                  </div>div>
                            {generando && (
                          <div className="flex items-center gap-3 py-4">
                                        <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#00B894", borderTopColor: "transparent" }} />
                                        <p className="text-sm font-medium" style={{ color: "#00B894" }}>{REPORTE_TEXTS[msgIdx]}</p>p>
                          </div>div>
                                  )}
                            {reporte && (
                          <div className="rounded-xl p-4" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#334155" }}>{reporte}</p>p>
                          </div>div>
                                  )}
                            {!generando && !reporte && (
                          <p className="text-sm py-2" style={{ color: "#94a3b8" }}>
                                        Haga clic en Generar reporte IA para obtener un analisis ejecutivo con Gemini.
                          </p>p>
                                  )}
                        </div>div>
                </div>div>
          </>>
        );
}</>
