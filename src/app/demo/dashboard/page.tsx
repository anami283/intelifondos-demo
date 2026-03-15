import { Header } from "@/components/layout/Header";
import { KPICard } from "@/components/dashboard/KPICard";
import { CarteraChart } from "@/components/dashboard/CarteraChart";
import { AlertasPanel } from "@/components/dashboard/AlertasPanel";
import { cartera, solicitudes } from "@/data/demo-data";
import { Wallet, CreditCard, TrendingDown, Users, Brain, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const pendientes = solicitudes.filter((s) => s.estado === "pendiente").length;
    const enRevision = solicitudes.filter((s) => s.estado === "en_revision").length;

  return (
        <>
              <Header
                        title="Dashboard Ejecutivo"
                        subtitle="COFEM - Pereira - Marzo 2025"
                        breadcrumb="Dashboard"
                      />
              <div className="p-5 lg:p-6 space-y-6">
              
                {/* KPIs */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <KPICard
                                              title="Cartera Total"
                                              value={cartera.total}
                                              format="cop"
                                              trend={9.5}
                                              trendLabel="vs feb"
                                              color="navy"
                                              icon={<Wallet className="w-5 h-5" />}
                                            />
                                <KPICard
                                              title="Creditos Activos"
                                              value={cartera.activos}
                                              format="number"
                                              trend={4.1}
                                              trendLabel="vs feb"
                                              color="verde"
                                              icon={<CreditCard className="w-5 h-5" />}
                                            />
                                <KPICard
                                              title="Recaudo Marzo"
                                              value={cartera.recaudo}
                                              format="cop"
                                              trend={-1.9}
                                              trendLabel="vs feb"
                                              color="amarillo"
                                              icon={<TrendingDown className="w-5 h-5" />}
                                            />
                                <KPICard
                                              title="Asociados"
                                              value={312}
                                              format="number"
                                              color="teal"
                                              icon={<Users className="w-5 h-5" />}
                                            />
                      </div>div>
              
                {/* Graficas */}
                      <div className="grid lg:grid-cols-3 gap-5">
                                <div className="lg:col-span-2">
                                            <CarteraChart />
                                </div>div>
                                <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                                            <h3 className="text-sm font-bold mb-4" style={{ color: "#0A2540" }}>Estado de solicitudes</h3>h3>
                                            <div className="space-y-3">
                                              {[
          { label: "Pendientes", val: pendientes, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
          { label: "En revision", val: enRevision, color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
          { label: "Aprobadas", val: solicitudes.filter((s) => s.estado === "aprobada").length, color: "#00B894", bg: "rgba(0,184,148,0.1)" },
          { label: "Rechazadas", val: solicitudes.filter((s) => s.estado === "rechazada").length, color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
          { label: "Desembolsadas", val: solicitudes.filter((s) => s.estado === "desembolsada").length, color: "#0A2540", bg: "rgba(10,37,64,0.1)" },
                        ].map((item) => (
                                          <div key={item.label} className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: item.bg }}>
                                                                                <span className="text-sm font-bold" style={{ color: item.color }}>{item.val}</span>span>
                                                            </div>div>
                                                            <span className="text-sm flex-1" style={{ color: "#475569" }}>{item.label}</span>span>
                                                            <div className="h-1.5 w-16 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
                                                                                <div className="h-full rounded-full" style={{ width: `${(item.val / solicitudes.length) * 100}%`, background: item.color }} />
                                                            </div>div>
                                          </div>div>
                                        ))}
                                            </div>div>
                                            <Link
                                                            href="/demo/solicitudes"
                                                            className="mt-4 flex items-center gap-1 text-xs font-semibold transition-colors"
                                                            style={{ color: "#00B894" }}
                                                          >
                                                          Ver todas las solicitudes <ArrowRight className="w-3 h-3" />
                                            </Link>Link>
                                </div>div>
                      </div>div>
              
                {/* Solicitudes recientes + Actividad */}
                      <div className="grid lg:grid-cols-3 gap-5">
                                <div className="lg:col-span-2 bg-white rounded-2xl p-5" style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                                            <div className="flex items-center justify-between mb-4">
                                                          <h3 className="text-sm font-bold" style={{ color: "#0A2540" }}>Solicitudes recientes</h3>h3>
                                                          <Link href="/demo/solicitudes" className="text-xs font-semibold" style={{ color: "#00B894" }}>
                                                                          Ver todas
                                                          </Link>Link>
                                            </div>div>
                                            <div className="overflow-x-auto">
                                                          <table className="w-full text-xs">
                                                                          <thead>
                                                                                            <tr className="text-left" style={{ color: "#94a3b8" }}>
                                                                                                                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Numero</th>th>
                                                                                                                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Asociado</th>th>
                                                                                                                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Monto</th>th>
                                                                                                                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Score IA</th>th>
                                                                                                                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Estado</th>th>
                                                                                              </tr>tr>
                                                                          </thead>thead>
                                                                          <tbody className="divide-y divide-slate-50">
                                                                            {solicitudes.slice(0, 5).map((s) => (
                              <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="py-3 font-mono text-[11px]" style={{ color: "#64748b" }}>
                                                                            <Link href={`/demo/solicitudes/${s.id}`} className="hover:text-[#00B894] transition-colors">
                                                                              {s.numero}
                                                                              </Link>Link>
                                                    </td>td>
                                                    <td className="py-3 font-medium" style={{ color: "#0A2540" }}>
                                                      {s.asociado.nombre.split(" ").slice(0, 2).join(" ")}
                                                    </td>td>
                                                    <td className="py-3 font-semibold" style={{ color: "#1e293b" }}>
                                                                            ${(s.monto / 1_000_000).toFixed(1)}M
                                                    </td>td>
                                                    <td className="py-3">
                                                                            <div className="flex items-center gap-1.5">
                                                                                                      <Brain className="w-3 h-3" style={{ color: "#00B894" }} />
                                                                                                      <span className="font-bold text-sm" style={{
                                                            color: s.score_ia >= 80 ? "#059669" : s.score_ia >= 60 ? "#d97706" : "#dc2626",
                              }}>
                                                                                                        {s.score_ia}
                                                                                                        </span>span>
                                                                              </div>div>
                                                    </td>td>
                                                    <td className="py-3">
                                                                            <span
                                                                                                        className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                                                                                                        style={{
                                                                                                                                      background: s.estado === "aprobada" || s.estado === "desembolsada"
                                                                                                                                                                      ? "rgba(5,150,105,0.1)" : s.estado === "rechazada"
                                                                                                                                                                      ? "rgba(220,38,38,0.1)" : s.estado === "en_revision"
                                                                                                                                                                      ? "rgba(59,130,246,0.1)" : "rgba(245,158,11,0.1)",
                                                                                                                                      color: s.estado === "aprobada" || s.estado === "desembolsada"
                                                                                                                                                                      ? "#059669" : s.estado === "rechazada"
                                                                                                                                                                      ? "#dc2626" : s.estado === "en_revision"
                                                                                                                                                                      ? "#3b82f6" : "#d97706",
                                                                                                          }}
                                                                                                      >
                                                                              {s.estado.replace("_", " ")}
                                                                              </span>span>
                                                    </td>td>
                              </tr>tr>
                            ))}
                                                                          </tbody>tbody>
                                                          </table>table>
                                            </div>div>
                                </div>div>
                                <AlertasPanel />
                      </div>div>
              </div>div>
        </>>
      );
}</>
