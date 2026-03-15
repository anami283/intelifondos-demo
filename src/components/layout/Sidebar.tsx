"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    CreditCard,
    Users,
    MessageSquare,
    ChevronRight,
    Sparkles,
    TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/demo/dashboard", label: "Dashboard", icon: LayoutDashboard, desc: "Resumen ejecutivo" },
  { href: "/demo/solicitudes", label: "Solicitudes", icon: FileText, desc: "Gestion de creditos" },
  { href: "/demo/cartera", label: "Cartera", icon: CreditCard, desc: "Portafolio activo" },
  { href: "/demo/nomina", label: "Nomina", icon: Users, desc: "Planilla descuentos" },
  { href: "/demo/ia", label: "Asistente IA", icon: MessageSquare, desc: "Gemini - Tiempo real", badge: true },
  ];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    const pathname = usePathname();

  return (
        <aside
                className={cn(
                          "fixed left-0 z-40",
                          "w-64 h-[calc(100vh-2.5rem)]",
                          "flex flex-col",
                          "transition-transform duration-300 ease-in-out",
                          "shadow-2xl",
                          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                        )}
                style={{
                          top: "2.5rem",
                          background: "linear-gradient(180deg, #071c30 0%, #0A2540 60%, #0d2d4a 100%)",
                          borderRight: "1px solid rgba(255,255,255,0.07)",
                }}
              >
          {/* Logo */}
              <div className="px-5 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <Link href="/" className="flex items-center gap-3 group" onClick={onClose}>
                                <div className="relative w-10 h-10 flex-shrink-0">
                                            <div
                                                            className="absolute inset-0 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"
                                                            style={{ background: "#00B894" }}
                                                          />
                                            <svg viewBox="0 0 40 40" className="w-10 h-10 relative z-10" aria-label="Intelifondos">
                                                          <defs>
                                                                          <linearGradient id="sb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                                                            <stop offset="0%" stopColor="#00B894" />
                                                                                            <stop offset="100%" stopColor="#00CBA8" />
                                                                          </linearGradient>linearGradient>
                                                          </defs>defs>
                                                          <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" fill="none" stroke="url(#sb-grad)" strokeWidth="2.5" />
                                                          <circle cx="20" cy="20" r="3" fill="url(#sb-grad)" />
                                                          <circle cx="20" cy="8" r="2" fill="#00B894" opacity="0.9" />
                                                          <circle cx="30" cy="14" r="2" fill="#00CBA8" opacity="0.8" />
                                                          <circle cx="30" cy="26" r="2" fill="#00CBA8" opacity="0.8" />
                                                          <circle cx="20" cy="32" r="2" fill="#00B894" opacity="0.9" />
                                                          <circle cx="10" cy="26" r="2" fill="#00B894" opacity="0.8" />
                                                          <circle cx="10" cy="14" r="2" fill="#00CBA8" opacity="0.8" />
                                            </svg>svg>
                                </div>div>
                                <div>
                                            <p className="font-bold text-base tracking-wide" style={{ color: "#ffffff", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                                                          Intelifondos
                                            </p>p>
                                            <p className="text-xs" style={{ color: "#64748b", fontFamily: "var(--font-dm-sans, sans-serif)" }}>COFEM Demo</p>p>
                                </div>div>
                      </Link>Link>
              </div>div>
        
          {/* Badge IA */}
              <div className="mx-4 mt-4 px-3 py-2.5 rounded-xl" style={{ background: "rgba(0,184,148,0.12)", border: "1px solid rgba(0,184,148,0.25)" }}>
                      <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4" style={{ color: "#00B894" }} />
                                <span className="text-xs font-semibold" style={{ color: "#00B894", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                                            IA Activa - Gemini 1.5 Flash
                                </span>span>
                      </div>div>
              </div>div>
        
          {/* Navegacion */}
              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                          const active = pathname === item.href || pathname.startsWith(item.href + "/");
                          const Icon = item.icon;
                          return (
                                        <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        onClick={onClose}
                                                        className={cn(
                                                                          "group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                                                                          active ? "text-white" : "text-slate-400 hover:text-white"
                                                                        )}
                                                        style={active ? {
                                                                          background: "linear-gradient(135deg, #00B894 0%, #00a884 100%)",
                                                                          boxShadow: "0 4px 15px rgba(0,184,148,0.25)",
                                                        } : {
                                                                          background: "transparent",
                                                        }}
                                                        onMouseEnter={(e) => {
                                                                          if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                                          if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                                                        }}
                                                      >
                                                      <div
                                                                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                                                                        style={{ background: active ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)" }}
                                                                      >
                                                                      <Icon className="w-4 h-4" />
                                                      </div>div>
                                                      <div className="flex-1 min-w-0">
                                                                      <p className="text-sm font-semibold leading-none" style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}>{item.label}</p>p>
                                                                      <p className="text-xs mt-0.5 truncate" style={{ color: active ? "rgba(255,255,255,0.7)" : "#475569", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{item.desc}</p>p>
                                                      </div>div>
                                          {item.badge && (
                                                                        <span className="px-1.5 py-0.5 text-[10px] rounded-md font-bold" style={{ background: "rgba(52,211,153,0.2)", color: "#34d399" }}>AI</span>span>
                                                      )}
                                          {active && <ChevronRight className="w-4 h-4 opacity-70" />}
                                        </Link>Link>
                                      );
              })}
              </nav>nav>
        
          {/* Metrica rapida */}
              <div className="mx-4 mb-4 px-3 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="flex items-center gap-2 mb-1.5">
                                <TrendingUp className="w-3.5 h-3.5" style={{ color: "#00B894" }} />
                                <span className="text-xs font-semibold" style={{ color: "#94a3b8", fontFamily: "var(--font-dm-sans, sans-serif)" }}>Cartera al dia</span>span>
                      </div>div>
                      <div className="flex items-end justify-between mb-2">
                                <span className="text-xl font-bold" style={{ color: "#ffffff", fontFamily: "var(--font-dm-sans, sans-serif)" }}>96.8%</span>span>
                                <span className="text-xs font-semibold" style={{ color: "#00B894" }}>+0.4% vs feb</span>span>
                      </div>div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                                <div className="h-full rounded-full" style={{ width: "96.8%", background: "linear-gradient(90deg, #00B894, #00CBA8)" }} />
                      </div>div>
              </div>div>
        
          {/* Footer */}
              <div className="px-4 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                      <p className="text-xs text-center" style={{ color: "#334155", fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                                v2.1 Premium - Pereira, Colombia
                      </p>p>
              </div>div>
        </aside>aside>
      );
}</aside>
