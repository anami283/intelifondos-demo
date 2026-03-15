import Link from "next/link";
import { LayoutDashboard, CreditCard, Users, FileText, Bot } from "lucide-react";

const ROLES = [
  {
    id: "gerente",
    label: "Gerente General",
    desc: "Vision global: KPIs, cartera, rentabilidad y alertas criticas",
    href: "/demo/dashboard",
    icon: LayoutDashboard,
    badge: "Recomendado",
    badgeColor: "#00B894",
  },
  {
    id: "cartera",
    label: "Gestor de Cartera",
    desc: "Seguimiento de creditos, mora y recaudo mensual",
    href: "/demo/cartera",
    icon: CreditCard,
    badge: "Creditos",
    badgeColor: "#0284c7",
  },
  {
    id: "rrhh",
    label: "Recursos Humanos",
    desc: "Planilla de nomina, descuentos y envio a RRHH",
    href: "/demo/nomina",
    icon: Users,
    badge: "Nomina",
    badgeColor: "#7c3aed",
  },
  {
    id: "credito",
    label: "Analista de Credito",
    desc: "Revision de solicitudes con score IA y recomendaciones",
    href: "/demo/solicitudes",
    icon: FileText,
    badge: "IA Score",
    badgeColor: "#d97706",
  },
  {
    id: "ia",
    label: "Asistente IA",
    desc: "Chat inteligente con acceso a todos los modulos del fondo",
    href: "/demo/ia",
    icon: Bot,
    badge: "Gemini",
    badgeColor: "#059669",
  },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: "#f8fafc" }}>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(0,184,148,0.1)", color: "#00B894" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00B894" }} />
          Demo interactivo en vivo
        </div>
        <h1 className="text-3xl font-bold mb-3" style={{ color: "#0A2540" }}>
          Seleccione su rol
        </h1>
        <p className="text-lg" style={{ color: "#64748b" }}>
          Explore la plataforma desde la perspectiva de cada usuario
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {ROLES.map((role) => {
          const Icon = role.icon;
          return (
            <Link
              key={role.id}
              href={role.href}
              className="group bg-white rounded-2xl p-5 transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(10,37,64,0.06)" }}>
                  <Icon className="w-5 h-5" style={{ color: "#0A2540" }} />
                </div>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: role.badgeColor + "22", color: role.badgeColor }}
                >
                  {role.badge}
                </span>
              </div>
              <h2 className="text-sm font-bold mb-1" style={{ color: "#0A2540" }}>{role.label}</h2>
              <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>{role.desc}</p>
            </Link>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-center" style={{ color: "#94a3b8" }}>
        Intelifondos - Sistema de gestion para fondos de empleados
      </p>
    </div>
  );
}
