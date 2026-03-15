import Link from "next/link";
import { LayoutDashboard, CreditCard, Users, FileText, Bot, BarChart3, Settings, ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";

const ROLES = [
  {
    id: "gerente",
    label: "Gerente General",
    desc: "Vision global: KPIs, cartera, rentabilidad y alertas criticas",
    href: "/demo/dashboard",
    icon: LayoutDashboard,
    badge: "Recomendado",
    badgeColor: "#00B894",
    gradient: "linear-gradient(135deg, #0A2540 0%, #0d3260 100%)",
    accent: "#00B894",
    stat: "312 asociados activos",
  },
  {
    id: "cartera",
    label: "Gestor de Cartera",
    desc: "Seguimiento de creditos, mora y recaudo mensual",
    href: "/demo/cartera",
    icon: CreditCard,
    badge: "Creditos",
    badgeColor: "#0284c7",
    gradient: "linear-gradient(135deg, #0c2d52 0%, #0e4070 100%)",
    accent: "#38bdf8",
    stat: "$847.5M cartera activa",
  },
  {
    id: "rrhh",
    label: "Recursos Humanos",
    desc: "Planilla de nomina, descuentos y envio a RRHH",
    href: "/demo/nomina",
    icon: Users,
    badge: "Nomina",
    badgeColor: "#00B894",
    gradient: "linear-gradient(135deg, #063d2e 0%, #0a5540 100%)",
    accent: "#00B894",
    stat: "10 empleados en planilla",
  },
  {
    id: "credito",
    label: "Analista de Credito",
    desc: "Revision de solicitudes con score IA y recomendaciones",
    href: "/demo/solicitudes",
    icon: FileText,
    badge: "IA Score",
    badgeColor: "#d97706",
    gradient: "linear-gradient(135deg, #3d2600 0%, #5a3a00 100%)",
    accent: "#f59e0b",
    stat: "8 solicitudes en revision",
  },
  {
    id: "ia",
    label: "Asistente IA",
    desc: "Chat inteligente con acceso a todos los modulos del fondo",
    href: "/demo/ia",
    icon: Bot,
    badge: "Gemini",
    badgeColor: "#059669",
    gradient: "linear-gradient(135deg, #052e16 0%, #064e3b 100%)",
    accent: "#34d399",
    stat: "Powered by Gemini 1.5",
  },
  {
    id: "reportes",
    label: "Reportes y Analitica",
    desc: "Informes ejecutivos, tendencias y exportacion de datos",
    href: "/demo/reportes",
    icon: BarChart3,
    badge: "Reportes",
    badgeColor: "#7c3aed",
    gradient: "linear-gradient(135deg, #2e1065 0%, #4c1d95 100%)",
    accent: "#a78bfa",
    stat: "6 meses de historico",
  },
];

const FEATURES = [
  { icon: Zap, label: "IA en tiempo real", desc: "Scores automaticos con Gemini" },
  { icon: Shield, label: "Datos seguros", desc: "Cifrado extremo a extremo" },
  { icon: TrendingUp, label: "Analitica avanzada", desc: "Tendencias y proyecciones" },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg, #020d1a 0%, #0A2540 40%, #0d3260 70%, #0f172a 100%)" }}>
      {/* Decorative background elements */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}>
        <div style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,184,148,0.12) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(10,37,64,0.8) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute",
          top: "40%",
          left: "20%",
          width: "2px",
          height: "200px",
          background: "linear-gradient(180deg, transparent, rgba(0,184,148,0.3), transparent)",
          transform: "rotate(45deg)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem 1.5rem 4rem" }}>

        {/* Hero Header */}
        <div className="text-center mb-12" style={{ maxWidth: "700px" }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "rgba(0,184,148,0.15)",
              color: "#00B894",
              border: "1px solid rgba(0,184,148,0.3)",
              backdropFilter: "blur(8px)",
            }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00B894", boxShadow: "0 0 8px #00B894" }} />
            Demo interactivo en vivo — Datos reales simulados
          </div>

          <h1 className="font-bold mb-4" style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: "1.1",
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}>
            Bienvenido a
            <span style={{
              display: "block",
              background: "linear-gradient(135deg, #00B894 0%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Intelifondos
            </span>
          </h1>

          <p className="text-lg mb-6" style={{ color: "rgba(255,255,255,0.65)", lineHeight: "1.6", maxWidth: "540px", margin: "0 auto 1.5rem" }}>
            Explora la plataforma completa como lo haria cada usuario del fondo COFEM.
            Selecciona tu rol para comenzar.
          </p>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,184,148,0.2)" }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: "#00B894" }} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold" style={{ color: "#ffffff" }}>{f.label}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{f.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Role selector label */}
        <div className="flex items-center gap-3 mb-6 w-full" style={{ maxWidth: "900px" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
            Seleccione su rol
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Roles Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
          gap: "1rem",
          width: "100%",
          maxWidth: "900px",
        }}>
          {ROLES.map((role) => {
            const Icon = role.icon;
            return (
              <Link
                key={role.id}
                href={role.href}
                style={{
                  display: "block",
                  background: role.gradient,
                  borderRadius: "1rem",
                  padding: "1.25rem 1.25rem 1rem",
                  border: "1px solid rgba(255,255,255,0.08)",
                  textDecoration: "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="role-card"
              >
                {/* Glow accent */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, " + role.accent + "20 0%, transparent 70%)",
                  transform: "translate(40%, -40%)",
                }} />

                <div style={{ position: "relative" }}>
                  {/* Top row */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <div style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "0.625rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}>
                      <Icon style={{ width: "1.125rem", height: "1.125rem", color: role.accent }} />
                    </div>
                    <span style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      padding: "0.25rem 0.625rem",
                      borderRadius: "9999px",
                      background: role.accent + "25",
                      color: role.accent,
                      border: "1px solid " + role.accent + "40",
                      letterSpacing: "0.04em",
                    }}>
                      {role.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <h2 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.25rem", letterSpacing: "-0.01em" }}>
                    {role.label}
                  </h2>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", lineHeight: "1.5", marginBottom: "0.875rem" }}>
                    {role.desc}
                  </p>

                  {/* Footer */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.6875rem", color: role.accent, fontWeight: 600 }}>
                      {role.stat}
                    </span>
                    <div style={{
                      width: "1.625rem",
                      height: "1.625rem",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}>
                      <ArrowRight style={{ width: "0.75rem", height: "0.75rem", color: "rgba(255,255,255,0.6)" }} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom links */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", alignItems: "center" }}>
          <Link href="/demo/configuracion" style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
            <Settings style={{ width: "0.875rem", height: "0.875rem" }} />
            Configuracion
          </Link>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
            Intelifondos v1.0 — COFEM Demo
          </span>
        </div>
      </div>

      <style>{".role-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.45) !important; }"}</style>
    </div>
  );
}
