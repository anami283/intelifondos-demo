"use client";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { KPICard } from "@/components/dashboard/KPICard";
import { cartera } from "@/data/demo-data";
import { formatCOP } from "@/lib/utils";
import { toast } from "sonner";
import { Wallet, AlertTriangle, TrendingDown, Percent, CreditCard, Download, Sparkles } from "lucide-react";

const TEXTS = ["Analizando...", "Calculando...", "Generando...", "Redactando..."];

export default function CarteraPage() {
  const [generando, setGenerando] = useState(false);
  const [reporte, setReporte] = useState(null);
  const [msgIdx, setMsgIdx] = useState(0);
  const sub = cartera.activos + " creditos activos - ICV " + cartera.icv + "%";
  const gen = async () => {
    setGenerando(true); setReporte(null); setMsgIdx(0);
    const iv = setInterval(() => setMsgIdx(i => Math.min(i+1, TEXTS.length-1)), 700);
    try {
      const res = await fetch("/api/ai/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ mensaje:"Analisis cartera COFEM.", historial:[] }) });
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let t = "";
      clearInterval(iv); setGenerando(false); setReporte("");
      while (true) { const {done,value} = await reader.read(); if(done)break; t+=dec.decode(value,{stream:true}); setReporte(t); }
    } catch { clearInterval(iv); setGenerando(false); setReporte("Error."); }
  };
  return (
    <>
      <Header title="Gestion de Cartera" subtitle={sub} breadcrumb="Cartera" />
      <div className="p-5 lg:p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <KPICard title="Cartera total" value={cartera.total} format="cop" color="navy" icon={<Wallet className="w-5 h-5" />} />
          <KPICard title="Creditos activos" value={cartera.activos} format="number" color="verde" icon={<CreditCard className="w-5 h-5" />} />
          <KPICard title="ICV" value={cartera.icv} format="percent" color="teal" icon={<Percent className="w-5 h-5" />} />
          <KPICard title="Mora 30 dias" value={cartera.mora_30} format="cop" color="amarillo" icon={<AlertTriangle className="w-5 h-5" />} />
          <KPICard title="Mora mas 30 dias" value={cartera.mora_mas30} format="cop" color="rojo" icon={<TrendingDown className="w-5 h-5" />} />
          <KPICard title="Recaudo mensual" value={cartera.recaudo} format="cop" color="verde" icon={<Wallet className="w-5 h-5" />} />
        </div>
        <div className="bg-white rounded-2xl p-5" style={{border:"1px solid #e2e8f0", boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold" style={{color:"#0A2540"}}>Creditos con alertas</h3>
            <button onClick={() => toast.success("Exportando...")} className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg" style={{color:"#475569"}}>
              Exportar
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase" style={{color:"#94a3b8", background:"#f8fafc"}}>
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Asociado</th>
                  <th className="px-3 py-2">Monto</th>
                  <th className="px-3 py-2">Dias mora</th>
                  <th className="px-3 py-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {cartera.creditos.map((c) => (
                  <tr key={c.id} className="border-t border-slate-50 hover:bg-slate-50">
                    <td className="px-3 py-2 font-mono text-xs">{c.id}</td>
                    <td className="px-3 py-2 font-semibold" style={{color:"#0A2540"}}>{c.asociado}</td>
                    <td className="px-3 py-2">{formatCOP(c.monto)}</td>
                    <td className="px-3 py-2 font-bold" style={{color: c.dias_mora === 0 ? "#059669" : "#dc2626"}}>{c.dias_mora}</td>
                    <td className="px-3 py-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{
                        background: c.estado === "al_dia" ? "rgba(5,150,105,0.1)" : "rgba(220,38,38,0.1)",
                        color: c.estado === "al_dia" ? "#059669" : "#dc2626"
                      }}>
                        {c.estado === "al_dia" ? "Al dia" : "En mora"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5" style={{border:"1px solid #e2e8f0", boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold" style={{color:"#0A2540"}}>Analisis IA</h3>
            <button onClick={gen} disabled={generando} className="flex items-center gap-2 text-white text-xs font-semibold px-4 py-2 rounded-lg disabled:opacity-50" style={{background:"#0A2540"}}>
              <Sparkles className="w-3.5 h-3.5" />{generando ? "..." : "Generar IA"}
            </button>
          </div>
          {generando && <p className="text-sm py-2" style={{color:"#00B894"}}>{TEXTS[msgIdx]}</p>}
          {reporte && <div className="rounded-xl p-4 bg-slate-50"><p className="text-sm whitespace-pre-wrap">{reporte}</p></div>}
          {!generando && !reporte && <p className="text-sm py-2 text-slate-400">Haga clic en Generar IA para obtener analisis con Gemini.</p>}
        </div>
      </div>
    </>
  );
}
