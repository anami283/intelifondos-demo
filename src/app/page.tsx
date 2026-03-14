"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  CheckCircle,
  Brain,
  TrendingUp,
  Shield,
  ArrowRight,
  Zap,
  BarChart2,
  Clock,
  Users,
  Star,
} from "lucide-react";

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Score IA en tiempo real",
    desc: "Gemini analiza cada solicitud en segundos: capacidad de pago, historial, ahorros y antigüedad para una recomendación precisa.",
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: "Cartera inteligente",
    desc: "Dashboards dinámicos con alertas de mora proactivas, proyecciones de recaudo y análisis de riesgo por segmento.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Nómina automatizada",
    desc: "Integración directa con RRHH para descuentos automáticos, exportación a los principales sistemas de nómina del país.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Cumplimiento regulatorio",
    desc: "Reglas del fondo configurables, límites de endeudamiento automáticos y trazabilidad completa para auditorías.",
  },
];

const planes = [
  {
    nombre: "Básico",
    precio: "890.000",
    asociados: "Hasta 150 asociados",
    features: [
      "Dashboard básico",
      "Gestión de solicitudes",
      "Planilla de nómina",
      "Soporte por email",
    ],
    color: "border-gray-200",
    cta: false,
  },
  {
    nombre: "Profesional",
    precio: "1.890.000",
    asociados: "Hasta 500 asociados",
    features: [
      "Todo en Básico",
      "Score IA (Gemini)",
      "Análisis de cartera",
      "Alertas automáticas",
      "Soporte prioritario",
    ],
    color: "border-[#00B894]",
    cta: true,
    badge: "Más popular",
  },
  {
    nombre: "Enterprise",
    precio: "A convenir",
    asociados: "Asociados ilimitados",
    features: [
      "Todo en Profesional",
      "IA personalizada",
      "Integraciones a la medida",
      "Gerente de cuenta",
      "SLA garantizado",
    ],
    color: "border-[#6C63FF]",
    cta: false,
  },
];

const testimonios = [
  {
    nombre: "Jorge Iván Bermúdez",
    cargo: "Gerente, Fondemcali",
    ciudad: "Cali, Valle del Cauca",
    texto:
      "Redujimos el tiempo de análisis de crédito de 3 días a 20 minutos. El score IA es increíblemente preciso y nuestro comité lo usa como guía principal.",
  },
  {
    nombre: "Claudia Patricia Henao",
    cargo: "Directora, Fondemed Antioquia",
    ciudad: "Medellín, Antioquia",
    texto:
      "La integración con nuestra nómina fue más sencilla de lo esperado. Llevamos 18 meses sin un solo error en los descuentos. Resultados excepcionales.",
  },
  {
    nombre: "Ricardo Alejandro Ruiz",
    cargo: "Presidente, COFETRANS Bogotá",
    ciudad: "Bogotá, Cundinamarca",
    texto:
      "El índice de mora bajó del 6,8% al 2,1% en seis meses gracias a las alertas proactivas y el análisis predictivo de la plataforma.",
  },
];

function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [leadModal, setLeadModal] = useState(false);
  const [form, setForm] = useState({ nombre: "", fondo: "", email: "", telefono: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadModal(false);
    setForm({ nombre: "", fondo: "", email: "", telefono: "" });
    toast.success("¡Gracias! Un asesor le contactará en menos de 24 horas.", { duration: 5000 });
  };

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="bg-[#0A2540] min-h-screen flex flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 lg:px-12 py-5">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 40 40" className="w-8 h-8" aria-label="Intelifondos">
              <defs>
                <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00B894" />
                  <stop offset="100%" stopColor="#6C63FF" />
                </linearGradient>
              </defs>
              <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="none" stroke="url(#lg)" strokeWidth="2" />
              <circle cx="20" cy="20" r="2.5" fill="url(#lg)" />
              <circle cx="20" cy="7" r="1.8" fill="#00B894" />
              <circle cx="32" cy="14" r="1.8" fill="#6C63FF" />
              <circle cx="32" cy="26" r="1.8" fill="#6C63FF" />
              <circle cx="20" cy="33" r="1.8" fill="#00B894" />
              <circle cx="8" cy="26" r="1.8" fill="#00B894" />
              <circle cx="8" cy="14" r="1.8" fill="#6C63FF" />
            </svg>
            <span className="text-white font-bold text-lg">Intelifondos</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/demo" className="text-white/70 hover:text-white text-sm transition-colors hidden sm:block">
              Ver demo
            </Link>
            <button
              onClick={() => setLeadModal(true)}
              className="bg-[#00B894] hover:bg-[#00a884] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Solicitar licencia
            </button>
          </div>
        </nav>

        {/* Hero content */}
        <div className="flex-1 flex items-center justify-center px-6 lg:px-12 py-16">
          <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#00B894]/10 border border-[#00B894]/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00B894] pulse-verde" />
                <span className="text-[#00B894] text-sm font-medium">
                  ✦ Gemini AI · Análisis en tiempo real
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Su fondo merece{" "}
                <span className="text-gradient-verde">inteligencia artificial</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                La plataforma SaaS que moderniza la gestión de crédito, nómina y cartera
                de fondos de empleados en Colombia. IA real. Resultados reales.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/demo"
                  className="bg-[#00B894] hover:bg-[#00a884] text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
                >
                  Ver demo en vivo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setLeadModal(true)}
                  className="border border-white/20 text-white hover:bg-white/5 font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Hablar con un asesor
                </button>
              </div>
              <div className="flex gap-6 mt-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-2xl font-bold text-white">312+</p>
                  <p className="text-white/50 text-xs">Asociados gestionados</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">97%</p>
                  <p className="text-white/50 text-xs">Precisión del score IA</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">20 min</p>
                  <p className="text-white/50 text-xs">Análisis de crédito</p>
                </div>
              </div>
            </div>

            {/* Mockup */}
            <div className="relative hidden lg:block">
              <div
                className="bg-white rounded-2xl shadow-2xl p-6 border border-white/10"
                style={{ transform: "perspective(1200px) rotateY(-8deg) rotateX(4deg)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-white text-gray-100 text-xs ml-2">COFEM · Dashboard</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Cartera Total", val: "$847.5M", color: "text-white" },
                    { label: "Score Promedio", val: "91/100", color: "text-[#00B894]" },
                    { label: "Créditos Activos", val: "127", color: "text-[#6C63FF]" },
                    { label: "Recaudo Mar", val: "$64.3M", color: "text-white" },
                  ].map((k) => (
                    <div key={k.label} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-white text-gray-100">{k.label}</p>
                      <p className={`text-lg font-bold ${k.color}`}>{k.val}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-[#6C63FF]/5 border border-[#6C63FF]/20 rounded-lg p-3 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-[#6C63FF]" />
                  <span className="text-xs text-[#6C63FF] font-medium">
                    IA Gemini · SOL-0091 · Score: 87 · Recomendar: APROBAR
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#00B894]/20 rounded-full blur-3xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#6C63FF]/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMAS */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <FadeInSection>
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Su fondo todavía gestiona créditos así?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              La mayoría de fondos de empleados en Colombia enfrenta estos tres problemas críticos cada día.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              { emoji: "📋", titulo: "Análisis manual lento", desc: "El comité dedica días a revisar solicitudes manualmente, sin datos objetivos ni sistematizados." },
              { emoji: "📉", titulo: "Mora sin alertas", desc: "La mora crece silenciosamente porque no existen alertas automáticas ni herramientas predictivas." },
              { emoji: "🗂️", titulo: "Nómina desconectada", desc: "Los descuentos se registran manualmente, generando errores, reprocesos y conflictos con RRHH." },
            ].map((p) => (
              <div key={p.titulo} className="bg-red-50 border border-red-100 rounded-xl p-6 text-center">
                <span className="text-3xl mb-3 block">{p.emoji}</span>
                <h3 className="font-bold text-gray-800 mb-2">{p.titulo}</h3>
                <p className="text-sm text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 lg:px-12 bg-[#F8FAFB]">
        <FadeInSection>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                La solución completa
              </h2>
              <p className="text-gray-500">Intelifondos integra todo en una sola plataforma inteligente.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((f) => (
                <div key={f.title} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF] flex-shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* PRECIOS */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <FadeInSection>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Planes y precios</h2>
              <p className="text-gray-500">Tarifas mensuales en COP · Sin costos ocultos</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {planes.map((p) => (
                <div key={p.nombre} className={`bg-white border-2 ${p.color} rounded-2xl p-6 relative`}>
                  {p.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00B894] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {p.badge}
                    </span>
                  )}
                  <h3 className="font-bold text-white text-lg mb-1">{p.nombre}</h3>
                  <p className="text-sm text-gray-500 mb-3">{p.asociados}</p>
                  <div className="mb-5">
                    <span className="text-2xl font-bold text-white">
                      {p.precio === "A convenir" ? p.precio : `$${p.precio}`}
                    </span>
                    {p.precio !== "A convenir" && <span className="text-white text-gray-100 text-sm">/mes</span>}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-[#00B894] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setLeadModal(true)}
                    className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                      p.cta
                        ? "bg-[#00B894] hover:bg-[#00a884] text-white"
                        : "border border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    Comenzar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-20 px-6 lg:px-12 bg-[#F8FAFB]">
        <FadeInSection>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Lo que dicen nuestros clientes
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonios.map((t) => (
                <div key={t.nombre} className="bg-white rounded-xl p-6 border border-gray-100">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4 italic">
                    &ldquo;{t.texto}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.nombre}</p>
                    <p className="text-xs text-gray-500">{t.cargo}</p>
                    <p className="text-xs text-white text-gray-100">{t.ciudad}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* CTA final */}
      <section className="py-20 px-6 bg-[#0A2540]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            La inteligencia que su fondo necesitaba
          </h2>
          <p className="text-white/60 mb-8">
            Únase a los fondos de empleados colombianos que ya gestionan su cartera con IA.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/demo"
              className="bg-[#00B894] hover:bg-[#00a884] text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Ver demo ahora
            </Link>
            <button
              onClick={() => setLeadModal(true)}
              className="border border-white/20 text-white hover:bg-white/5 font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Solicitar licencia
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#06192c] py-8 px-6 text-center">
        <p className="text-white/40 text-sm">
          © 2025 Intelifondos · Pereira, Colombia · Todos los derechos reservados
        </p>
      </footer>

      {/* Modal Lead */}
      {leadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setLeadModal(false)} className="absolute top-4 right-4 text-white text-gray-100 hover:text-gray-600 text-xl">&times;</button>
            <h2 className="text-xl font-bold text-white mb-1">Solicitar licencia</h2>
            <p className="text-sm text-gray-500 mb-5">Un asesor le contactará en menos de 24 horas.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              {[
                { key: "nombre", label: "Nombre completo", placeholder: "Ej: Carlos Ospina" },
                { key: "fondo", label: "Nombre del fondo", placeholder: "Ej: Fondo de Empleados XYZ" },
                { key: "email", label: "Correo electrónico", placeholder: "gerente@fondoxyz.com" },
                { key: "telefono", label: "Teléfono / WhatsApp", placeholder: "+57 300 123 4567" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-sm font-medium text-gray-700 block mb-1">{f.label}</label>
                  <input
                    type={f.key === "email" ? "email" : f.key === "telefono" ? "tel" : "text"}
                    required
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B894]/30"
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
              <button type="submit" className="w-full bg-[#00B894] hover:bg-[#00a884] text-white font-semibold py-2.5 rounded-lg transition-colors mt-2">
                Solicitar propuesta
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
