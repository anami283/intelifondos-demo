import { AlertTriangle, TrendingDown, Clock, CheckCircle } from "lucide-react";
import { solicitudes, cartera } from "@/data/demo-data";

export function AlertasPanel() {
  const pendientes = solicitudes.filter((s) => s.estado === "pendiente").length;
  const enRevision = solicitudes.filter((s) => s.estado === "en_revision").length;
  const creditosMora = cartera.creditos.filter((c) => c.dias_mora > 0).length;

  const alertas = [
    {
      icon: Clock,
      color: "#d97706",
      bg: "rgba(245,158,11,0.08)",
      titulo: "Solicitudes pendientes",
      desc: pendientes + " solicitudes esperan revision",
    },
    {
      icon: AlertTriangle,
      color: "#ea580c",
      bg: "rgba(234,88,12,0.08)",
      titulo: "En revision",
      desc: enRevision + " solicitudes en proceso",
    },
    {
      icon: TrendingDown,
      color: "#dc2626",
      bg: "rgba(220,38,38,0.08)",
      titulo: "Creditos en mora",
      desc: creditosMora + " creditos con dias de mora",
    },
    {
      icon: CheckCircle,
      color: "#059669",
      bg: "rgba(5,150,105,0.08)",
      titulo: "Sistema activo",
      desc: "Todos los modulos funcionando",
    },
  ];

  return (
    <div
      className="bg-white rounded-2xl p-5"
      style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
    >
      <h3 className="text-sm font-bold mb-4" style={{ color: "#0A2540" }}>
        Alertas del sistema
      </h3>
      <div className="space-y-3">
        {alertas.map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.titulo} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: a.bg }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: a.bg, color: a.color }}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold" style={{ color: "#1e293b" }}>{a.titulo}</p>
                <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{a.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
