"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Users,
  MessageSquare,
  ChevronRight,
  X,
  Menu,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/demo/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/demo/solicitudes", label: "Solicitudes", icon: FileText },
  { href: "/demo/cartera", label: "Cartera", icon: CreditCard },
  { href: "/demo/nomina", label: "Nómina", icon: Users },
  { href: "/demo/ia", label: "Asistente IA", icon: MessageSquare, badge: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 glass p-3 rounded-xl hover-lift"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed left-0 top-12 h-[calc(100vh-3rem)] z-40",
          "glass-dark border-r border-white/10",
          "transition-all duration-300 ease-out",
          "flex flex-col",
          isOpen ? "w-64" : "w-0 lg:w-16",
          "overflow-hidden"
        )}
      >
        {/* Logo & Brand */}
        <div className="p-4 lg:p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 gradient-primary blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <svg
                viewBox="0 0 40 40"
                className="w-10 h-10 relative z-10"
                aria-label="Intelifondos"
              >
                <defs>
                  <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <polygon
                  points="20,4 34,12 34,28 20,36 6,28 6,12"
                  fill="none"
                  stroke="url(#logo-grad)"
                  strokeWidth="2.5"
                />
                <circle cx="20" cy="20" r="3" fill="url(#logo-grad)" />
                <circle cx="20" cy="8" r="2" fill="#6366F1" opacity="0.8" />
                <circle cx="30" cy="14" r="2" fill="#8B5CF6" opacity="0.8" />
                <circle cx="30" cy="26" r="2" fill="#8B5CF6" opacity="0.8" />
                <circle cx="20" cy="32" r="2" fill="#6366F1" opacity="0.8" />
                <circle cx="10" cy="26" r="2" fill="#6366F1" opacity="0.8" />
                <circle cx="10" cy="14" r="2" fill="#8B5CF6" opacity="0.8" />
              </svg>
            </div>
            {isOpen && (
              <div className="animate-slide-in">
                <p className="text-white font-bold text-base tracking-wide">
                  Intelifondos
                </p>
                <p className="text-white/40 text-xs">COFEM · Demo</p>
              </div>
            )}
          </Link>
        </div>

        {/* AI Badge */}
        {isOpen && (
          <div className="mx-3 lg:mx-4 mt-4 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 border border-[#6366F1]/30 animate-fade-in-up">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6366F1] animate-pulse-glow" />
              <span className="text-[#8B5CF6] text-xs font-semibold">
                IA Activa · Gemini
              </span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 lg:px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item, index) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-3 rounded-xl",
                  "text-sm font-medium transition-all duration-200",
                  "hover-lift",
                  active
                    ? "gradient-primary text-white shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/5",
                  !isOpen && "lg:justify-center"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Active Indicator */}
                {active && (
                  <div className="absolute inset-0 gradient-primary rounded-xl blur-xl opacity-50" />
                )}

                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0 relative z-10",
                  "transition-transform group-hover:scale-110"
                )} />

                {isOpen && (
                  <>
                    <span className="flex-1 relative z-10">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded-md bg-[#10B981]/20 text-[#10B981] font-semibold">
                        AI
                      </span>
                    )}
                    {active && (
                      <ChevronRight className="w-4 h-4 opacity-70 relative z-10" />
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 border-t border-white/10">
            <p className="text-white/30 text-xs text-center">
              v2.1 Premium · Pereira
            </p>
          </div>
        )}
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
