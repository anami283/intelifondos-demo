"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { KPICard } from "@/components/dashboard/KPICard";
import { cartera } from "@/data/demo-data";
import { formatCOP } from "@/lib/utils";
import { toast } from "sonner";
import {
  Wallet,
  AlertTriangle,
  TrendingDown,
  Percent,
  CreditCard,
  Download,
  Sparkles,
} from "lucide-react";

const REPORTE_TEXTS = [
  "Analizando portafolio crediticio...",
  "Calculando índices de mora...",
  "Generando análisis de riesgo...",
  "Redactando reporte ejecutivo...",
];

export default function CarteraPage() {
  const [generando, setGenerando] = useState(false);
  const [reporte, setReporte] = useState<string | null>(null);
  const [msgIdx, setMsgIdx] = useState(0);

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
          mensaje:
            "Genera un análisis ejecutivo breve de la cartera de COFEM: estado general, principales indicadores, alertas de mora y 2 recomendaciones concretas. Máximo 120 palabras.",
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
      setReporte(
        "Error al generar el reporte. Verifique la conexión con Gemini AI."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <DemoBanner />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1">
          <Header
            title="Gestión de Cartera"
            subtitle={`${cartera.activos} créditos activos · ICV ${cartera.icv}%`}
          />
          <div className="p-6 space-y-6">
            {/* KPIs cartera */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <KPICard
                title="Cartera total"
                value={cartera.total}
                format="cop"
                color="primary"
                icon={<Wallet />}
              />
              <KPICard
                title="Créditos activos"
                value={cartera.activos}
                format="number"
                color="verde"
                icon={<CreditCard />}
              />
              <KPICard
                title="ICV"
                value={cartera.icv}
                format="percent"
                color="default"
                icon={<Percent />}
              />
              <KPICard
                title="Mora 30 días"
                value={cartera.mora_30}
                format="cop"
                color="default"
                icon={<AlertTriangle />}
              />
              <KPICard
                title="Mora +30 días"
                value={cartera.mora_mas30}
                format="cop"
                color="default"
                icon={<TrendingDown />}
              />
              <KPICard
                title="Recaudo mensual"
                value={cartera.recaudo}
                format="cop"
                color="verde"
                icon={<Wallet />}
              />
            </div>

            {/* Tabla mora */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Créditos con alertas
                </h3>
                <button
                  onClick={() => toast.success("Exportando reporte de cartera...")}
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Download className="w-3 h-3" />
                  Exportar
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left text-xs text-gray-500 font-medium uppercase tracking-wider">
                    <tr>
                      <th className="px-3 py-2.5">ID Crédito</th>
                      <th className="px-3 py-2.5">Asociado</th>
                      <th className="px-3 py-2.5">Monto</th>
                      <th className="px-3 py-2.5">Saldo</th>
                      <th className="px-3 py-2.5">Cuota</th>
                      <th className="px-3 py-2.5">Días mora</th>
                      <th className="px-3 py-2.5">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {cartera.creditos.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="px-3 py-3 font-mono text-xs text-gray-500">
                          {c.id}
                        </td>
                        <td className="px-3 py-3 font-medium text-gray-800">
                          {c.asociado}
                        </td>
                        <td className="px-3 py-3 text-gray-700">
                          {formatCOP(c.monto)}
                        </td>
                        <td className="px-3 py-3 text-gray-700">
                          {formatCOP(c.saldo)}
                        </td>
                        <td className="px-3 py-3 text-gray-700">
                          {formatCOP(c.cuota)}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`font-bold ${
                              c.dias_mora === 0
                                ? "text-[#00B894]"
                                : c.dias_mora < 30
                                ? "text-amber-500"
                                : c.dias_mora < 60
                                ? "text-orange-500"
                                : "text-red-600"
                            }`}
                          >
                            {c.dias_mora}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              c.estado === "al_dia"
                                ? "bg-green-100 text-green-700"
                                : c.estado === "mora"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {c.estado === "al_dia" ? "Al día" : c.estado === "mora" ? "En mora" : "Mora crítica"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reporte IA */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Análisis IA de cartera
                </h3>
                <button
                  onClick={generarReporte}
                  disabled={generando}
                  className="flex items-center gap-2 bg-[#6C63FF] hover:bg-[#5b52e8] disabled:bg-gray-200 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {generando ? "Generando..." : "Generar reporte IA"}
                </button>
              </div>
              {generando && (
                <div className="flex items-center gap-3 py-4">
                  <div className="w-5 h-5 border-2 border-[#6C63FF] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-[#6C63FF]">
                    {REPORTE_TEXTS[msgIdx]}
                  </p>
                </div>
              )}
              {reporte && (
                <div className="bg-[#F8FAFB] rounded-lg p-4 border border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {reporte}
                  </p>
                </div>
              )}
              {!generando && !reporte && (
                <p className="text-sm text-gray-400 py-2">
                  Haga clic en &quot;Generar reporte IA&quot; para obtener un análisis ejecutivo de la cartera con Gemini.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
