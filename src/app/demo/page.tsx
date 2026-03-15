import Link from "next/link";
import { Users, BarChart2, Settings, BookOpen, ArrowRight, Sparkles } from "lucide-react";

const roles = [
  {
        title: "Asociado",
        icon: <Users className="w-7 h-7" />,
        desc: "Consulta el estado de tus creditos, saldos y aplica a nuevas solicitudes.",
        href: "/demo/solicitudes",
        gradient: "linear-gradient(135deg, #0A2540 0%, #1a3a5c 100%)",
        badge: "Vista Asociado",
  },
  {
        title: "Comite de Credito",
        icon: <BarChart2 className="w-7 h-7" />,
        desc: "Revisa solicitudes con el apoyo del score IA. Aprueba o rechaza con un clic.",
        href: "/demo/solicitudes",
        gradient: "linear-gradient(135deg, #00B894 0%, #00a884 100%)",
        badge: "Vista Comite",
        highlight: true,
  },
  {
        title: "Administrador",
        icon: <Settings className="w-7 h-7" />,
        desc: "Dashboard completo: cartera, KPIs, alertas de mora y analisis de portafolio.",
        href: "/demo/dashboard",
        gradient: "linear-gradient(135deg, #0A2540 0%, #00B894 100%)",
        badge: "Vista Admin",
  },
  {
        title: "Contador / RRHH",
        icon: <BookOpen className="w-7 h-7" />,
        desc: "Gestion de planilla, exportacion de nomina e integracion con sistemas de RRHH.",
        href: "/demo/nomina",
        gradient: "linear-gradient(135deg, #1a3a5c 0%, #0284c7 100%)",
        badge: "Vista Contable",
  },
  ];

export default function DemoPage() {
    return (
          <div className="min-h-[calc(100vh-2.5rem)] flex items-center justify-center px-6 py-16" style={{ background: "#F0F4F8" }}>
                  <div className="max-w-4xl w-full mx-auto">
                          <div className="text-center mb-12">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: "rgba(0,184,148,0.1)", border: "1px solid rgba(0,184,148,0.2)" }}>
                                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00B894" }} />
                                                <span className="text-xs font-semibold" style={{ color: "#00B894" }}>Demo interactivo en vivo</span>span>
                                    </div>div>
                                    <h1 className="text-3xl font-bold mb-3" style={{ color: "#0A2540", letterSpacing: "-0.02em" }}>
                                                Seleccione su rol
                                    </h1>h1>
                                    <p className="text-lg" style={{ color: "#64748b" }}>
                                                Explore la plataforma desde la perspectiva de cada usuario
                                    </p>p>
                          </div>div>
                  
                          <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            {roles.map((role) => (
                        <Link key={role.title} href={role.href}>
                                      <div
                                                        className="relative rounded-2xl p-6 cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-200 text-white overflow-hidden"
                                                        style={{
                                                                            background: role.gradient,
                                                                            boxShadow: role.highlight
                                                                                                  ? "0 8px 30px rgba(0,184,148,0.3)"
                                                                                                  : "0 4px 12px rgba(0,0,0,0.15)",
                                                                            outline: role.highlight ? "2px solid rgba(0,184,148,0.5)" : "none",
                                                                            outlineOffset: "2px",
                                                        }}
                                                      >
                                                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "rgba(255,255,255,0.3)", transform: "translate(30%,-30%)" }} />
                                                      <span
                                                                          className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded-full"
                                                                          style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}
                                                                        >
                                                        {role.badge}
                                                      </span>span>
                                                      <div className="mb-4 opacity-90">{role.icon}</div>div>
                                                      <h2 className="text-xl font-bold mb-2">{role.title}</h2>h2>
                                                      <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>{role.desc}</p>p>
                                                      <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                                                                        Explorar <ArrowRight className="w-4 h-4" />
                                                      </div>div>
                                      </div>div>
                        </Link>Link>
                      ))}
                          </div>div>
                  
                          <div className="text-center">
                                    <Link
                                                  href="/demo/ia"
                                                  className="inline-flex items-center gap-3 text-white font-bold px-8 py-3.5 rounded-2xl transition-all hover:scale-105 hover:shadow-lg"
                                                  style={{ background: "linear-gradient(135deg, #0A2540 0%, #00B894 100%)", boxShadow: "0 4px 15px rgba(0,184,148,0.3)" }}
                                                >
                                                <Sparkles className="w-5 h-5" />
                                                Probar Asistente IA - Gemini real
                                                <ArrowRight className="w-4 h-4" />
                                    </Link>Link>
                          </div>div>
                  </div>div>
          </div>div>
        );
}</div>
