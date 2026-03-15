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
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/demo/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/demo/solicitudes", label: "Solicitudes", icon: FileText },
  { href: "/demo/cartera", label: "Cartera", icon: CreditCard },
  { href: "/demo/nomina", label: "Nómina", icon: Users },
  { href: "/demo/ia", label: "Asistente IA", icon: MessageSquare, badge: true },
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
        "fixed left-0 top-12 h-[calc(100vh-3rem)] z-40",
        "bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-800/90",
        "backdrop-blur-xl border-r border-slate-700/50",
        "transition-all duration-300 ease-in-out",
        "flex flex-col shadow-2xl",
        isOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-64"
      )}
    >
      {/* Logo & Brand */}
      <div className="p-5 border-b border-slate-700/50">
        <Link href="/" className="flex items-center gap-3 group" onClick={onClose}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
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
          <div>
            <p className="text-white font-bold text-base tracking-wide">
              Intelifondos
            </p>
            <p className="text-slate-400 text-xs">COFEM · Demo</p>
          </div>
        </Link>
      </div>

      {/* AI Badge */}
      <div className="mx-4 mt-4 px-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span className="text-purple-300 text-xs font-semibold">
            IA Activa · Gemini
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-3 rounded-xl",
                "text-sm font-medium transition-all duration-200",
                active
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              )}
            >
              {active && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur-xl opacity-30" />
              )}
              <Icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 relative z-10",
                  "transition-transform group-hover:scale-110"
                )}
              />
              <span className="flex-1 relative z-10">{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] rounded-md bg-emerald-500/20 text-emerald-400 font-semibold">
                  AI
                </span>
              )}
              {active && (
                <ChevronRight className="w-4 h-4 opacity-70 relative z-10" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <p className="text-slate-500 text-xs text-center">
          v2.1 Premium · Pereira
        </p>
      </div>
    </aside>
  );
}
