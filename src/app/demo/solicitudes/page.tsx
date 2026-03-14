"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { solicitudes, EstadoSolicitud } from "@/data/demo-data";
import { Brain } from "lucide-react";

const ESTADOS: (EstadoSolicitud | "todos")[] = [
  "todos",
  "pendiente",
  "en_revision",
  "aprobada",
  "rechazada",
  "desembolsada",
];

const estadoLabel: Record<string, string> = {
  todos: "Todos",
  pendiente: "Pendiente",
  en_revision: "En revisión",
  aprobada: "Aprobada",
  rechazada: "Rechazada",
  desembolsada: "Desembolsada",
};

const estadoStyle: Record<string, string> = {
  pendiente: "bg-amber-100 text-amber-700",
  en_revision: "bg-blue-100 text-blue-700",
  aprobada: "bg-green-100 text-green-700",
  rechazada: "bg-red-100 text-red-700",
  desembolsada: "bg-purple-100 text-purple-700",
};

export default function SolicitudesPage() {
  const [filtro, setFiltro] = useState<EstadoSolicitud | "todos">("todos");

  const filtered =
    filtro === "todos" ? solicitudes : solicitudes.filter((s) => s.estado === filtro);

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <DemoBanner />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1">
          <Header
            title="Solicitudes de Crédito"
            subtitle={`${solicitudes.length} solicitudes · Marzo 2025`}
          />
          <div className="p-6">
            {/* Filtros */}
            <div className="flex flex-wrap gap-2 mb-5">
              {ESTADOS.map((e) => (
                <button
                  key={e}
                  onClick={() => setFiltro(e)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filtro === e
                      ? "bg-[#0A2540] text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
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

            {/* Tabla */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr className="text-left text-xs text-gray-500 font-medium uppercase tracking-wider">
                      <th className="px-4 py-3">Número</th>
                      <th className="px-4 py-3">Asociado</th>
                      <th className="px-4 py-3">Tipo</th>
                      <th className="px-4 py-3">Monto</th>
                      <th className="px-4 py-3">Plazo</th>
                      <th className="px-4 py-3">Score IA</th>
                      <th className="px-4 py-3">Estado</th>
                      <th className="px-4 py-3">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">
                          {s.numero}
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {s.asociado.nombre}
                            </p>
                            <p className="text-xs text-gray-400">{s.asociado.cargo}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="capitalize text-gray-600 text-xs">
                            {s.tipo}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800">
                          ${(s.monto / 1_000_000).toFixed(1)}M
                        </td>
                        <td className="px-4 py-3 text-gray-600">{s.plazo} meses</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <Brain className="w-3.5 h-3.5 text-[#6C63FF]" />
                            <span
                              className="font-bold text-sm"
                              style={{
                                color:
                                  s.score_ia >= 80
                                    ? "#00B894"
                                    : s.score_ia >= 60
                                    ? "#f59e0b"
                                    : "#ef4444",
                              }}
                            >
                              {s.score_ia}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${estadoStyle[s.estado]}`}
                          >
                            {estadoLabel[s.estado]}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/demo/solicitudes/${s.id}`}
                            className="text-xs font-semibold text-[#6C63FF] hover:underline flex items-center gap-1"
                          >
                            <Brain className="w-3 h-3" />
                            Score IA
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
