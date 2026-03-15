"use client";
import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { solicitudes, EstadoSolicitud } from "@/data/demo-data";
import { Brain, ArrowRight } from "lucide-react";

const ESTADOS: (EstadoSolicitud | "todos")[] = ["todos", "pendiente", "en_revision", "aprobada", "rechazada", "desembolsada"];

const estadoLabel: Record<string, string> = {
  todos: "Todos", pendiente: "Pendiente", en_revision: "En revision",
  aprobada: "Aprobada", rechazada: "Rechazada", desembolsada: "Desembolsada",
};

const estadoStyle: Record<string, { bg: string; color: string }> = {
  pendiente:    { bg: "rgba(245,158,11,0.1)",  color: "#d97706" },
  en_revision:  { bg: "rgba(59,130,246,0.1)",  color: "#3b82f6" },
  aprobada:     { bg: "rgba(5,150,105,0.1)",   color: "#059669" },
  rechazada:    { bg: "rgba(220,38,38,0.1)",   color: "#dc2626" },
  desembolsada: { bg: "rgba(10,37,64,0.1)",    color: "#0A2540" },
};

export default function SolicitudesPage() {
  const [filtro, setFiltro] = useState<EstadoSolicitud | "todos">("todos");
  const filtered = filtro === "todos" ? solicitudes : solicitudes.filter((s) => s.estado === filtro);
  const subtitleText = solicitudes.length + " solicitudes - Marzo 2025";

  return (
    <>
      <Header title="Solicitudes de Credito" subtitle={subtitleText} breadcrumb="Solicitudes" />
      <div className="p-5 lg:p-6 space-y-5">
        <div className="flex flex-wrap gap-2">
          {ESTADOS.map((e) => (
            <button
              key={e}
              onClick={() => setFiltro(e)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={
                filtro === e
                  ? { background: "#0A2540", color: "#ffffff" }
                  : { background: "#ffffff", color: "#475569", border: "1px solid #e2e8f0" }
              }
            >
              {estadoLabel[e]}
              {e !== "todos" && (
                <span className="ml-1 opacity-60">
                  ({solicitudes.filter((s) => s.estado === e).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: "#f8fafc" }}>
                <tr className="text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                  <th className="px-4 py-3">Numero</th>
                  <th className="px-4 py-3">Asociado</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Monto</th>
                  <th className="px-4 py-3">Plazo</th>
                  <th className="px-4 py-3">Score IA</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Accion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: "#64748b" }}>{s.numero}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-sm" style={{ color: "#0A2540" }}>{s.asociado.nombre}</p>
                      <p className="text-xs" style={{ color: "#94a3b8" }}>{s.asociado.cargo}</p>
                    </td>
                    <td className="px-4 py-3 capitalize text-xs" style={{ color: "#475569" }}>{s.tipo}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: "#1e293b" }}>
                      {(s.monto / 1000000).toFixed(1) + "M"}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#64748b" }}>{s.plazo} meses</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5" style={{ color: "#00B894" }} />
                        <span className="font-bold text-sm" style={{ color: s.score_ia >= 80 ? "#059669" : s.score_ia >= 60 ? "#d97706" : "#dc2626" }}>
                          {s.score_ia}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={estadoStyle[s.estado] || {}}
                      >
                        {estadoLabel[s.estado]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={"/demo/solicitudes/" + s.id}
                        className="flex items-center gap-1 text-xs font-semibold transition-colors"
                        style={{ color: "#00B894" }}
                      >
                        Ver Score <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
