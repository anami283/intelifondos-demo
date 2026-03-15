import { Header } from "@/components/layout/Header";
import { KPICard } from "@/components/dashboard/KPICard";
import { AlertasPanel } from "@/components/dashboard/AlertasPanel";
import { dashboard } from "@/data/demo-data";
import { Users, CreditCard, TrendingUp, BarChart2, Wallet } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" subtitle="Vista general del fondo" breadcrumb="Dashboard" />
      <div className="p-5 lg:p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Asociados activos"
            value={dashboard.asociados}
            format="number"
            color="navy"
            icon={<Users className="w-5 h-5" />}
            trend={2.4}
          />
          <KPICard
            title="Cartera total"
            value={dashboard.cartera_total}
            format="cop"
            color="teal"
            icon={<CreditCard className="w-5 h-5" />}
            trend={5.1}
          />
          <KPICard
            title="Rendimiento"
            value={dashboard.rendimiento}
            format="percent"
            color="verde"
            icon={<TrendingUp className="w-5 h-5" />}
            trend={0.8}
          />
          <KPICard
            title="Mora promedio"
            value={dashboard.mora}
            format="percent"
            color="amarillo"
            icon={<BarChart2 className="w-5 h-5" />}
            trend={-0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold" style={{ color: "#0A2540" }}>Resumen financiero</h3>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(0,184,148,0.1)", color: "#00B894" }}>
                  Marzo 2025
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl" style={{ background: "#f8fafc" }}>
                  <Wallet className="w-6 h-6 mx-auto mb-2" style={{ color: "#0A2540" }} />
                  <p className="text-xs text-slate-500 mb-1">Ahorros</p>
                  <p className="text-sm font-bold" style={{ color: "#0A2540" }}>
                    {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(dashboard.ahorros || 0)}
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ background: "#f8fafc" }}>
                  <CreditCard className="w-6 h-6 mx-auto mb-2" style={{ color: "#00B894" }} />
                  <p className="text-xs text-slate-500 mb-1">Creditos activos</p>
                  <p className="text-sm font-bold" style={{ color: "#00B894" }}>
                    {dashboard.creditos_activos || 0}
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ background: "#f8fafc" }}>
                  <TrendingUp className="w-6 h-6 mx-auto mb-2" style={{ color: "#059669" }} />
                  <p className="text-xs text-slate-500 mb-1">Recaudo mes</p>
                  <p className="text-sm font-bold" style={{ color: "#059669" }}>
                    {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(dashboard.recaudo_mes || 0)}
                  </p>
                </div>
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
