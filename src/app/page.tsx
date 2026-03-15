"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle, Brain, TrendingUp, Shield, ArrowRight, Zap, BarChart2, Star, Users, Clock, CreditCard } from "lucide-react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.6s " + delay + "ms ease, transform 0.6s " + delay + "ms ease" }}>
      {children}
    </div>
  );
}

const FEATURES = [
  { icon: Brain, title: "Score IA en tiempo real", desc: "Gemini analiza capacidad de pago, historial, ahorros y antiguedad para una recomendacion precisa en segundos.", color: "#00B894" },
  { icon: BarChart2, title: "Cartera inteligente", desc: "Dashboards con alertas de mora proactivas, proyecciones de recaudo y analisis de riesgo por segmento.", color: "#0284c7" },
  { icon: Zap, title: "Nomina automatizada", desc: "Integracion con RRHH para descuentos automaticos y exportacion a los principales sistemas de nomina.", color: "#d97706" },
  { icon: Shield, title: "Cumplimiento regulatorio", desc: "Reglas del fondo configurables, limites de endeudamiento automaticos y trazabilidad completa.", color: "#059669" },
];

const PROBLEMAS = [
  { emoji: "📋", titulo: "Analisis manual lento", desc: "El comite dedica dias a revisar solicitudes sin datos objetivos ni sistematizados.", bg: "#fff1f2", border: "#fecdd3", titleColor: "#be123c" },
  { emoji: "📉", titulo: "Mora sin alertas", desc: "La mora crece silenciosamente porque no existen alertas automaticas ni herramientas predictivas.", bg: "#fff7ed", border: "#fed7aa", titleColor: "#c2410c" },
  { emoji: "🗂️", titulo: "Nomina desconectada", desc: "Los descuentos se registran manualmente generando errores, reprocesos y conflictos con RRHH.", bg: "#fefce8", border: "#fde68a", titleColor: "#a16207" },
];

const PLANES = [
  {
    nombre: "Basico", precio: "890.000", asociados: "Hasta 150 asociados",
    features: ["Dashboard basico", "Gestion de solicitudes", "Planilla de nomina", "Soporte por email"],
    highlight: false,
  },
  {
    nombre: "Profesional", precio: "1.890.000", asociados: "Hasta 500 asociados",
    features: ["Todo en Basico", "Score IA (Gemini)", "Analisis de cartera", "Alertas automaticas", "Soporte prioritario"],
    highlight: true, badge: "Mas popular",
  },
  {
    nombre: "Enterprise", precio: "A convenir", asociados: "Asociados ilimitados",
    features: ["Todo en Profesional", "IA personalizada", "Integraciones a la medida", "Gerente de cuenta", "SLA garantizado"],
    highlight: false,
  },
];

const TESTIMONIOS = [
  { nombre: "Jorge Ivan Bermudez", cargo: "Gerente, Fondemcali", ciudad: "Cali, Valle del Cauca", texto: "Redujimos el tiempo de analisis de credito de 3 dias a 20 minutos. El score IA es preciso y nuestro comite lo usa como guia principal." },
  { nombre: "Claudia Patricia Henao", cargo: "Directora, Fondemed Antioquia", ciudad: "Medellin, Antioquia", texto: "La integracion con nuestra nomina fue sencilla. Llevamos 18 meses sin un error en los descuentos. Resultados excepcionales." },
  { nombre: "Ricardo Alejandro Ruiz", cargo: "Presidente, COFETRANS Bogota", ciudad: "Bogota, Cundinamarca", texto: "El indice de mora bajo del 6.8% al 2.1% en seis meses gracias a las alertas proactivas y el analisis predictivo." },
];

export default function LandingPage() {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ nombre: "", fondo: "", email: "", telefono: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModal(false);
    setForm({ nombre: "", fondo: "", email: "", telefono: "" });
    toast.success("Gracias. Un asesor le contactara en menos de 24 horas.", { duration: 5000 });
  };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ============ HERO ============ */}
      <section style={{ background: "linear-gradient(145deg, #020c1b 0%, #0A2540 45%, #0c3060 100%)", minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>

        {/* Background glows */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,184,148,0.1) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(2,132,199,0.08) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", top: "30%", left: "50%", width: "1px", height: "300px", background: "linear-gradient(180deg, transparent, rgba(0,184,148,0.15), transparent)", transform: "translateX(-50%) rotate(30deg)" }} />
        </div>

        {/* Nav */}
        <nav style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 3rem", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "linear-gradient(135deg, #00B894, #0284c7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#ffffff", fontWeight: 900, fontSize: "1rem" }}>IF</span>
            </div>
            <span style={{ color: "#ffffff", fontWeight: 800, fontSize: "1.125rem", letterSpacing: "-0.02em" }}>Intelifondos</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Link href="/demo" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}>
              Ver demo
            </Link>
            <button onClick={() => setModal(true)} style={{ background: "#00B894", color: "#ffffff", border: "none", borderRadius: "0.5rem", padding: "0.5rem 1.125rem", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer" }}>
              Solicitar licencia
            </button>
          </div>
        </nav>

        {/* Hero body */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "2rem 3rem 4rem", position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", width: "100%", gap: "4rem" }}>

          {/* Left */}
          <div style={{ flex: "0 0 auto", maxWidth: "540px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(0,184,148,0.12)", border: "1px solid rgba(0,184,148,0.3)", borderRadius: "9999px", padding: "0.375rem 1rem", marginBottom: "1.75rem" }}>
              <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#00B894", boxShadow: "0 0 10px #00B894", display: "inline-block" }} />
              <span style={{ color: "#00B894", fontSize: "0.8125rem", fontWeight: 600 }}>Gemini AI activo — Analisis en tiempo real</span>
            </div>

            <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: "1.5rem", color: "#ffffff" }}>
              Su fondo merece
              <br />
              <span style={{ background: "linear-gradient(90deg, #00B894 0%, #38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                inteligencia artificial
              </span>
            </h1>

            <p style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.65, marginBottom: "2rem", maxWidth: "460px" }}>
              La plataforma SaaS que moderniza la gestion de credito, nomina y cartera de fondos de empleados en Colombia. IA real. Resultados reales.
            </p>

            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              <Link href="/demo" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#00B894", color: "#ffffff", textDecoration: "none", borderRadius: "0.75rem", padding: "0.875rem 1.5rem", fontSize: "0.9375rem", fontWeight: 700, boxShadow: "0 4px 24px rgba(0,184,148,0.35)" }}>
                Ver demo en vivo <ArrowRight style={{ width: "1rem", height: "1rem" }} />
              </Link>
              <button onClick={() => setModal(true)} style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.25)", color: "#ffffff", borderRadius: "0.75rem", padding: "0.875rem 1.5rem", fontSize: "0.9375rem", fontWeight: 600, cursor: "pointer" }}>
                Hablar con un asesor
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "0", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem" }}>
              {[
                { val: "312+", label: "Asociados gestionados" },
                { val: "97%", label: "Precision del score IA" },
                { val: "20 min", label: "Analisis de credito" },
              ].map((s, i) => (
                <div key={s.label} style={{ flex: 1, paddingLeft: i > 0 ? "1.5rem" : 0, borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none", marginLeft: i > 0 ? "1.5rem" : 0 }}>
                  <div style={{ fontSize: "1.875rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginTop: "0.3rem", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Dashboard mockup */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
              background: "#ffffff",
              borderRadius: "1.25rem",
              padding: "1.5rem",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
              transform: "perspective(1200px) rotateY(-6deg) rotateX(3deg)",
              width: "100%",
              maxWidth: "420px",
            }}>
              {/* Window bar */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "1rem" }}>
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "#ef4444" }} />
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "#f59e0b" }} />
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ marginLeft: "0.5rem", fontSize: "0.6875rem", color: "#94a3b8", fontWeight: 600 }}>COFEM · Dashboard</span>
              </div>
              {/* KPIs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem", marginBottom: "0.875rem" }}>
                {[
                  { l: "Cartera Total", v: "$847.5M", c: "#0A2540", bg: "#f8fafc" },
                  { l: "Score Promedio IA", v: "91/100", c: "#059669", bg: "#f0fdf4" },
                  { l: "Creditos Activos", v: "127", c: "#0284c7", bg: "#f0f9ff" },
                  { l: "Recaudo Marzo", v: "$64.3M", c: "#0A2540", bg: "#f8fafc" },
                ].map((k) => (
                  <div key={k.l} style={{ background: k.bg, borderRadius: "0.5rem", padding: "0.75rem" }}>
                    <div style={{ fontSize: "0.6rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>{k.l}</div>
                    <div style={{ fontSize: "1.1875rem", fontWeight: 800, color: k.c }}>{k.v}</div>
                  </div>
                ))}
              </div>
              {/* Chart bar */}
              <div style={{ background: "#f8fafc", borderRadius: "0.5rem", padding: "0.75rem", marginBottom: "0.625rem" }}>
                <div style={{ fontSize: "0.6rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Desembolsos 6 meses</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "36px" }}>
                  {[52, 61, 45, 68, 74, 81].map((v, i) => (
                    <div key={i} style={{ flex: 1, background: i === 5 ? "#00B894" : "#0A2540", borderRadius: "2px 2px 0 0", height: Math.round((v / 81) * 100) + "%" }} />
                  ))}
                </div>
              </div>
              {/* AI badge */}
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "0.5rem", padding: "0.625rem 0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Brain style={{ width: "0.875rem", height: "0.875rem", color: "#059669", flexShrink: 0 }} />
                <span style={{ fontSize: "0.6875rem", color: "#065f46", fontWeight: 600 }}>Gemini AI · SOL-0091 · Score: 87 · APROBAR</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============ PROBLEMAS ============ */}
      <section style={{ background: "#ffffff", padding: "5rem 3rem" }}>
        <FadeIn>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ display: "inline-block", background: "#fee2e2", borderRadius: "9999px", padding: "0.375rem 1rem", marginBottom: "1rem" }}>
                <span style={{ color: "#be123c", fontSize: "0.8125rem", fontWeight: 700 }}>El problema que resolvemos</span>
              </div>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "#0A2540", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                Su fondo todavia gestiona creditos asi?
              </h2>
              <p style={{ color: "#64748b", maxWidth: "500px", margin: "0 auto", fontSize: "1rem", lineHeight: 1.6 }}>
                La mayoria de fondos de empleados en Colombia enfrenta estos tres problemas criticos cada dia.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {PROBLEMAS.map((p) => (
                <div key={p.titulo} style={{ background: p.bg, border: "1.5px solid " + p.border, borderRadius: "1rem", padding: "2rem", textAlign: "center" }}>
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>{p.emoji}</span>
                  <h3 style={{ fontWeight: 800, color: p.titleColor, fontSize: "1.0625rem", marginBottom: "0.625rem" }}>{p.titulo}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ============ FEATURES ============ */}
      <section style={{ background: "#f8fafc", padding: "5rem 3rem" }}>
        <FadeIn>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ display: "inline-block", background: "rgba(0,184,148,0.1)", borderRadius: "9999px", padding: "0.375rem 1rem", marginBottom: "1rem" }}>
                <span style={{ color: "#00B894", fontSize: "0.8125rem", fontWeight: 700 }}>La solucion completa</span>
              </div>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "#0A2540", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                Todo en una sola plataforma inteligente
              </h2>
              <p style={{ color: "#64748b", maxWidth: "480px", margin: "0 auto", fontSize: "1rem", lineHeight: 1.6 }}>
                Intelifondos integra gestion de credito, nomina y cartera con inteligencia artificial real.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} style={{ background: "#ffffff", borderRadius: "1rem", padding: "1.75rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ width: "3rem", height: "3rem", borderRadius: "0.75rem", background: f.color + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                      <Icon style={{ width: "1.375rem", height: "1.375rem", color: f.color }} />
                    </div>
                    <h3 style={{ fontWeight: 800, color: "#0A2540", fontSize: "1rem", marginBottom: "0.5rem" }}>{f.title}</h3>
                    <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.65 }}>{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ============ METRICS BAND ============ */}
      <section style={{ background: "#0A2540", padding: "3.5rem 3rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {[
            { icon: Users, val: "312+", label: "Asociados gestionados", color: "#00B894" },
            { icon: Brain, val: "97%", label: "Precision del score IA", color: "#38bdf8" },
            { icon: Clock, val: "20 min", label: "Analisis de credito", color: "#f59e0b" },
            { icon: CreditCard, val: "$847M", label: "Cartera administrada", color: "#a78bfa" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "3rem", height: "3rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.25rem" }}>
                  <Icon style={{ width: "1.375rem", height: "1.375rem", color: s.color }} />
                </div>
                <div style={{ fontSize: "2.25rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ PRECIOS ============ */}
      <section style={{ background: "#ffffff", padding: "5rem 3rem" }}>
        <FadeIn>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ display: "inline-block", background: "#f0f9ff", borderRadius: "9999px", padding: "0.375rem 1rem", marginBottom: "1rem" }}>
                <span style={{ color: "#0284c7", fontSize: "0.8125rem", fontWeight: 700 }}>Planes y precios</span>
              </div>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "#0A2540", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                Inversion que se paga sola
              </h2>
              <p style={{ color: "#64748b", maxWidth: "420px", margin: "0 auto", fontSize: "1rem" }}>
                Tarifas mensuales en COP. Sin costos ocultos. Sin contratos anuales obligatorios.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", alignItems: "start" }}>
              {PLANES.map((p) => (
                <div key={p.nombre} style={{ background: p.highlight ? "#0A2540" : "#ffffff", borderRadius: "1.25rem", padding: "2rem", border: p.highlight ? "none" : "1.5px solid #e2e8f0", position: "relative", boxShadow: p.highlight ? "0 20px 60px rgba(10,37,64,0.25)" : "0 2px 12px rgba(0,0,0,0.04)" }}>
                  {p.badge && (
                    <div style={{ position: "absolute", top: "-0.875rem", left: "50%", transform: "translateX(-50%)", background: "#00B894", color: "#ffffff", fontSize: "0.6875rem", fontWeight: 800, padding: "0.25rem 0.875rem", borderRadius: "9999px", whiteSpace: "nowrap" }}>
                      {p.badge}
                    </div>
                  )}
                  <h3 style={{ fontWeight: 800, color: p.highlight ? "#ffffff" : "#0A2540", fontSize: "1.125rem", marginBottom: "0.25rem" }}>{p.nombre}</h3>
                  <p style={{ fontSize: "0.8125rem", color: p.highlight ? "rgba(255,255,255,0.5)" : "#94a3b8", marginBottom: "1.25rem" }}>{p.asociados}</p>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <span style={{ fontSize: "2rem", fontWeight: 900, color: p.highlight ? "#ffffff" : "#0A2540" }}>
                      {p.precio === "A convenir" ? p.precio : "$" + p.precio}
                    </span>
                    {p.precio !== "A convenir" && (
                      <span style={{ fontSize: "0.8125rem", color: p.highlight ? "rgba(255,255,255,0.4)" : "#94a3b8" }}>/mes</span>
                    )}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {p.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontSize: "0.875rem", color: p.highlight ? "rgba(255,255,255,0.75)" : "#374151" }}>
                        <CheckCircle style={{ width: "1rem", height: "1rem", color: "#00B894", flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setModal(true)} style={{ width: "100%", padding: "0.75rem", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.9375rem", border: "none", cursor: "pointer", background: p.highlight ? "#00B894" : "#f1f5f9", color: p.highlight ? "#ffffff" : "#0A2540" }}>
                    Comenzar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ============ TESTIMONIOS ============ */}
      <section style={{ background: "#f8fafc", padding: "5rem 3rem" }}>
        <FadeIn>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "#0A2540", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                Fondos que ya confiaron en nosotros
              </h2>
              <p style={{ color: "#64748b", fontSize: "1rem" }}>Resultados reales, no proyecciones.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {TESTIMONIOS.map((t) => (
                <div key={t.nombre} style={{ background: "#ffffff", borderRadius: "1rem", padding: "1.75rem", border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1rem" }}>
                    {[1,2,3,4,5].map((i) => <Star key={i} style={{ width: "1rem", height: "1rem", color: "#f59e0b", fill: "#f59e0b" }} />)}
                  </div>
                  <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1.25rem", fontStyle: "italic" }}>
                    &ldquo;{t.texto}&rdquo;
                  </p>
                  <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "1rem" }}>
                    <div style={{ fontWeight: 700, color: "#0A2540", fontSize: "0.875rem" }}>{t.nombre}</div>
                    <div style={{ fontSize: "0.8125rem", color: "#64748b" }}>{t.cargo}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{t.ciudad}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section style={{ background: "linear-gradient(145deg, #020c1b 0%, #0A2540 50%, #0c3060 100%)", padding: "5rem 3rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "700px", height: "300px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,184,148,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.03em", marginBottom: "1rem", lineHeight: 1.1 }}>
            La inteligencia que
            <br />
            <span style={{ background: "linear-gradient(90deg, #00B894, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              su fondo necesitaba
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.0625rem", marginBottom: "2.5rem", lineHeight: 1.65 }}>
            Unase a los fondos de empleados colombianos que ya gestionan su cartera con IA.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/demo" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#00B894", color: "#ffffff", textDecoration: "none", borderRadius: "0.75rem", padding: "1rem 2rem", fontSize: "1rem", fontWeight: 700, boxShadow: "0 4px 28px rgba(0,184,148,0.4)" }}>
              Ver demo ahora <ArrowRight style={{ width: "1.125rem", height: "1.125rem" }} />
            </Link>
            <button onClick={() => setModal(true)} style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.25)", color: "#ffffff", borderRadius: "0.75rem", padding: "1rem 2rem", fontSize: "1rem", fontWeight: 600, cursor: "pointer" }}>
              Solicitar licencia
            </button>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{ background: "#06192c", padding: "2rem 3rem", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.875rem" }}>
          2025 Intelifondos · Pereira, Colombia · Todos los derechos reservados
        </p>
      </footer>

      {/* ============ MODAL LEAD ============ */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)", padding: "1rem" }}>
          <div style={{ background: "#ffffff", borderRadius: "1.25rem", boxShadow: "0 30px 80px rgba(0,0,0,0.3)", width: "100%", maxWidth: "440px", padding: "2rem", position: "relative" }}>
            <button onClick={() => setModal(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "#f1f5f9", border: "none", borderRadius: "50%", width: "2rem", height: "2rem", fontSize: "1rem", cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>
              &times;
            </button>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0A2540", marginBottom: "0.375rem" }}>Solicitar licencia</h2>
            <p style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "1.5rem" }}>Un asesor le contactara en menos de 24 horas.</p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                { key: "nombre", label: "Nombre completo", ph: "Ej: Carlos Ospina" },
                { key: "fondo", label: "Nombre del fondo", ph: "Ej: Fondo de Empleados XYZ" },
                { key: "email", label: "Correo electronico", ph: "gerente@fondoxyz.com" },
                { key: "telefono", label: "Telefono / WhatsApp", ph: "+57 300 123 4567" },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.375rem" }}>{f.label}</label>
                  <input
                    type={f.key === "email" ? "email" : f.key === "telefono" ? "tel" : "text"}
                    required
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.ph}
                    style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: "0.5rem", padding: "0.625rem 0.875rem", fontSize: "0.875rem", color: "#0A2540", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              ))}
              <button type="submit" style={{ width: "100%", background: "#00B894", color: "#ffffff", border: "none", borderRadius: "0.625rem", padding: "0.875rem", fontSize: "0.9375rem", fontWeight: 700, cursor: "pointer", marginTop: "0.25rem" }}>
                Solicitar propuesta
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
