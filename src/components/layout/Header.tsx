"use client";
import { Bell } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

export function Header({ title, subtitle, breadcrumb }: HeaderProps) {
  return (
    <header
      className="sticky top-10 z-30 flex items-center justify-between px-5 lg:px-6 py-3"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(226,232,240,0.8)",
        minHeight: "3.5rem",
      }}
    >
      <div>
        {breadcrumb && (
          <p className="text-xs font-medium mb-0.5" style={{ color: "#94a3b8" }}>
            Demo / {breadcrumb}
          </p>
        )}
        <h1 className="text-base font-bold leading-tight" style={{ color: "#0A2540" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
            {subtitle}
          </p>
        )}
      </div>
      <button
        className="relative p-2 rounded-xl transition-colors hover:bg-slate-100"
        style={{ color: "#475569" }}
        aria-label="Notificaciones"
      >
        <Bell className="w-5 h-5" />
        <span
          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white"
          style={{ background: "#00B894" }}
        />
      </button>
    </header>
  );
}
