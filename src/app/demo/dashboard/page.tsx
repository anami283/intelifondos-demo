import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { KPICard } from "@/components/dashboard/KPICard";
import { CarteraChart } from "@/components/dashboard/CarteraChart";
import { AlertasPanel } from "@/components/dashboard/AlertasPanel";
import { cartera, solicitudes } from "@/data/demo-data";
import {
  Wallet,
  CreditCard,
  TrendingDown,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const pendientes = solicitudes.filter((s) => s.estado === "pendiente").length;
  const enRevision = solicitudes.filter((s) => s.estado === "en_revision").length;

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <DemoBanner />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1 flex flex-col">
          <Header
            title="Dashboard Ejecutivo"
            subtitle="COFEM · Pereira · Marzo 2025"
          />
          <div className="p-6 space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                title="Cartera Total"
                value={cartera.total}
                format="cop"
                trend={9.5}
                trendLabel="vs feb"
                color="primary"
                icon={<Wallet />}
              />
              <KPICard
                title="Créditos Activos"
                value={cartera.activos}
                format="number"
                trend={4.1}
                trendLabel="vs feb"
                color="verde"
                icon={<CreditCard />}
              />
              <KPICard
                title="Recaudo Marzo"
                value={cartera.recaudo}
                format="cop"
                trend={-1.9}
                trendLabel="vs feb"
                color="default"
                icon={<TrendingDown />}
              />
              <KPICard
                title="Asociados"
                value={312}
                format="number"
                color="ia"
                icon={<Users />}
              />
            </div>

            {/* Gráficas */}
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <CarteraChart />
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                  Estado de solicitudes
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Pendientes", val: pendientes, color: "bg-amber-400" },
                    { label: "En revisión", val: enRevision, color: "bg-[#6C63FF]" },
                    { label: "Aprobadas", val: solicitudes.filter((s) => s.estado === "aprobada").length, color: "bg-[#00B894]" },
                    { label: "Rechazadas", val: solicitudes.filter((s) => s.estado === "rechazada").length, color: "bg-red-400" },
                    { label: "Desembolsadas", val: solicitudes.filter((s) => s.estado === "desembolsada").length, color: "bg-blue-400" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                      <span className="text-sm text-gray-600 flex-1">{item.label}</span>
                      <span className="text-sm font-bold text-gray-800">{item.val}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/demo/solicitudes"
                  className="mt-4 block text-center text-xs text-[#6C63FF] hover:underline font-medium"
                >
                  Ver todas las solicitudes →
                </Link>
              </div>
            </div>

            {/* Solicitudes recientes + actividad */}
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Solicitudes recientes
                  </h3>
                  <Link
                    href="/demo/solicitudes"
                    className="text-xs text-[#6C63FF] hover:underline font-medium"
                  >
                    Ver todas →
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-gray-400 text-left">
                        <th className="pb-3 font-medium">Número</th>
                        <th className="pb-3 font-medium">Asociado</th>
                        <th className="pb-3 font-medium">Monto</th>
                        <th className="pb-3 font-medium">Score IA</th>
                        <th className="pb-3 font-medium">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {solicitudes.slice(0, 5).map((s) => (
                        <tr key={s.id}>
                          <td className="py-2.5 font-mono text-gray-500">
                            <Link href={`/demo/solicitudes/${s.id}`} className="hover:text-[#6C63FF]">
                              {s.numero}
                            </Link>
                          </td>
                          <td className="py-2.5 text-gray-700">{s.asociado.nombre.split(" ").slice(0, 2).join(" ")}</td>
                          <td className="py-2.5 text-gray-700">
                            ${(s.monto / 1_000_000).toFixed(1)}M
                          </td>
                          <td className="py-2.5">
                            <span
                              className="font-bold"
                              style={{
                                color:
                                  s.score_ia >= 80 ? "#00B894" : s.score_ia >= 60 ? "#f59e0b" : "#ef4444",
                              }}
                            >
                              {s.score_ia}
                            </span>
                          </td>
                          <td className="py-2.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                s.estado === "aprobada" || s.estado === "desembolsada"
                                  ? "bg-green-100 text-green-700"
                                  : s.estado === "rechazada"
                                  ? "bg-red-100 text-red-700"
                                  : s.estado === "en_revision"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {s.estado.replace("_", " ")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <AlertasPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
