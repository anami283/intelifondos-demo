"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, CreditCard, Users, FileText, Bot, BarChart3, Settings
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/demo/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/demo/cartera", label: "Cartera", icon: CreditCard },
  { href: "/demo/nomina", label: "Nomina", icon: Users },
  { href: "/demo/solicitudes", label: "Solicitudes", icon: FileText },
  { href: "/demo/ia", label: "Asistente IA", icon: Bot },
  { href: "/demo/reportes", label: "Reportes", icon: BarChart3 },
  { href: "/demo/configuracion", label: "Configuracion", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col fixed left-0 z-40 w-64"
      style={{
        top: "2.5rem",
        height: "calc(100vh - 2.5rem)",
        background: "#0A2540",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold text-white"
          style={{ background: "#00B894" }}
        >
          C
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-tight">COFEM</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            Fondo de Empleados
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={
                active
                  ? { background: "#00B894", color: "#ffffff" }
                  : { color: "rgba(255,255,255,0.65)" }
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div
        className="px-4 py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
          Demo v1.0 - Intelifondos
        </p>
      </div>
    </aside>
  );
}
