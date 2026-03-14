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
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/demo/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/demo/solicitudes", label: "Solicitudes", icon: FileText },
  { href: "/demo/cartera", label: "Cartera", icon: CreditCard },
  { href: "/demo/nomina", label: "Nómina", icon: Users },
  { href: "/demo/ia", label: "Asistente IA", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0A2540] flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <svg
            viewBox="0 0 40 40"
            className="w-9 h-9 flex-shrink-0"
            aria-label="Intelifondos logo"
          >
            <defs>
              <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00B894" />
                <stop offset="100%" stopColor="#6C63FF" />
              </linearGradient>
            </defs>
            <polygon
              points="20,2 36,11 36,29 20,38 4,29 4,11"
              fill="none"
              stroke="url(#sg)"
              strokeWidth="2"
            />
            <circle cx="20" cy="20" r="2.5" fill="url(#sg)" />
            <circle cx="20" cy="7" r="1.8" fill="#00B894" opacity="0.8" />
            <circle cx="32" cy="14" r="1.8" fill="#6C63FF" opacity="0.8" />
            <circle cx="32" cy="26" r="1.8" fill="#6C63FF" opacity="0.8" />
            <circle cx="20" cy="33" r="1.8" fill="#00B894" opacity="0.8" />
            <circle cx="8" cy="26" r="1.8" fill="#00B894" opacity="0.8" />
            <circle cx="8" cy="14" r="1.8" fill="#6C63FF" opacity="0.8" />
            <line x1="20" y1="20" x2="20" y2="7" stroke="#00B894" strokeWidth="0.8" opacity="0.6" />
            <line x1="20" y1="20" x2="32" y2="14" stroke="#6C63FF" strokeWidth="0.8" opacity="0.6" />
            <line x1="20" y1="20" x2="32" y2="26" stroke="#6C63FF" strokeWidth="0.8" opacity="0.6" />
            <line x1="20" y1="20" x2="20" y2="33" stroke="#00B894" strokeWidth="0.8" opacity="0.6" />
            <line x1="20" y1="20" x2="8" y2="26" stroke="#00B894" strokeWidth="0.8" opacity="0.6" />
            <line x1="20" y1="20" x2="8" y2="14" stroke="#6C63FF" strokeWidth="0.8" opacity="0.6" />
          </svg>
          <div>
            <p className="text-white font-bold text-sm tracking-wide">
              Intelifondos
            </p>
            <p className="text-white/40 text-xs">COFEM · Demo</p>
          </div>
        </Link>
      </div>

      {/* Badge IA */}
      <div className="mx-4 mt-4 px-3 py-2 rounded-lg bg-[#00B894]/10 border border-[#00B894]/20 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00B894] pulse-verde" />
        <span className="text-[#00B894] text-xs font-medium">
          IA Activa · Gemini
        </span>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
                active
                  ? "bg-[#00B894]/20 text-[#00B894] font-medium"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {active && (
                <ChevronRight className="w-3 h-3 opacity-60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer sidebar */}
      <div className="p-4 border-t border-white/10">
        <p className="text-white/30 text-xs text-center">
          v2.1 · Pereira, Colombia
        </p>
      </div>
    </aside>
  );
}
