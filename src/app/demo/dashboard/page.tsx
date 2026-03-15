import { Header } from "@/components/layout/Header";
import { KPICard } from "@/components/dashboard/KPICard";
import { AlertasPanel } from "@/components/dashboard/AlertasPanel";
import { fondo, cartera, solicitudes, kpis_mensuales } from "@/data/demo-data";
import { Users, CreditCard, TrendingUp, BarChart2, Activity } from "lucide-react";

export default function DashboardPage() {
  const pendientes = solicitudes.filter((s) => s.estado === "pendiente").length;
  const enRevision = solicitudes.filter((s) => s.estado === "en_revision").length;

  return (
    <>
      <Header title="Dashboard" subtitle={"Vista general - " + fondo.nombre} breadcrumb="Dashboard" />
      <div className="p-5 lg:p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Asociados activos"
            value={fondo.asociados}
            format="number"
            color="navy"
            icon={<Users className="w-5 h-5" />}
            trend={2.4}
          />
          <KPICard
            title="Cartera total"
            value={cartera.total}
            format="cop"
            color="teal"
            icon={<CreditCard className="w-5 h-5" />}
            trend={5.1}
          />
          <KPICard
            title="Recaudo mensual"
            value={cartera.recaudo}
            format="cop"
            color="verde"
            icon={<TrendingUp className="w-5 h-5" />}
            trend={0.8}
          />
          <KPICard
            title="ICV (mora)"
            value={cartera.icv}
            format="percent"
            color="amarillo"
            icon={<BarChart2 className="w-5 h-5" />}
            trend={-0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold" style={{ color: "#0A2540" }}>Desembolsos vs Recaudo</h3>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(0,184,148,0.1)", color: "#00B894" }}>
                  Ultimos 6 meses
                </span>
              </div>
              <div className="flex items-end gap-2 h-32">
                {kpis_mensuales.map((k) => {
                  const maxVal = Math.max(...kpis_mensuales.map((m) => Math.max(m.desembolsos, m.recaudo)));
                  const h1 = Math.round((k.desembolsos / maxVal) * 100);
                  const h2 = Math.round((k.recaudo / maxVal) * 100);
                  return (
                    <div key={k.mes} className="flex-1 flex flex-col items-center gap-1">
                      <div className="flex items-end gap-0.5 h-24 w-full">
                        <div className="flex-1 rounded-t-sm transition-all" style={{ height: h1 + "%", background: "#0A2540", opacity: 0.7 }} />
                        <div className="flex-1 rounded-t-sm transition-all" style={{ height: h2 + "%", background: "#00B894" }} />
                      </div>
                      <span className="text-xs" style={{ color: "#94a3b8" }}>{k.mes}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ background: "#0A2540", opacity: 0.7 }} />
                  <span className="text-xs" style={{ color: "#64748b" }}>Desembolsos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ background: "#00B894" }} />
                  <span className="text-xs" style={{ color: "#64748b" }}>Recaudo</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <Activity className="w-4 h-4 mb-2" style={{ color: "#00B894" }} />
                <p className="text-2xl font-bold" style={{ color: "#0A2540" }}>{solicitudes.length}</p>
                <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>Solicitudes totales</p>
              </div>
              <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div className="w-4 h-4 rounded-full mb-2" style={{ background: "rgba(245,158,11,0.3)" }} />
                <p className="text-2xl font-bold" style={{ color: "#d97706" }}>{pendientes}</p>
                <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>Pendientes</p>
              </div>
              <div className="bg-white rounded-2xl p-4" style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div className="w-4 h-4 rounded-full mb-2" style={{ background: "rgba(59,130,246,0.3)" }} />
                <p className="text-2xl font-bold" style={{ color: "#3b82f6" }}>{enRevision}</p>
                <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>En revision</p>
              </div>
            </div>
          </div>

          <div>
            <AlertasPanel />
          </div>
        </div>
      </div>
    </>
  );
}
