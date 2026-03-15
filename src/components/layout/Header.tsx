"use client";

import { Bell, Search, User, ChevronRight } from "lucide-react";

interface HeaderProps {
    title: string;
    subtitle?: string;
    breadcrumb?: string;
}

export function Header({ title, subtitle, breadcrumb }: HeaderProps) {
    return (
          <header
                  className="sticky top-0 z-20 border-b"
                  style={{
                            background: "rgba(255,255,255,0.97)",
                            backdropFilter: "blur(12px)",
                            borderColor: "rgba(226,232,240,0.8)",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                <div className="px-5 lg:px-8 py-4">
                        <div className="flex items-center justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    {breadcrumb && (
                                <div className="flex items-center gap-1 mb-1">
                                                <span className="text-xs" style={{ color: "#94a3b8" }}>Demo</span>span>
                                                <ChevronRight className="w-3 h-3" style={{ color: "#cbd5e1" }} />
                                                <span className="text-xs font-semibold" style={{ color: "#00B894" }}>{breadcrumb}</span>span>
                                </div>div>
                                              )}
                                              <h1
                                                              className="text-xl lg:text-2xl font-bold truncate"
                                                              style={{ color: "#0A2540", letterSpacing: "-0.02em" }}
                                                            >
                                                {title}
                                              </h1>h1>
                                    {subtitle && (
                                <p className="text-xs lg:text-sm mt-0.5 truncate" style={{ color: "#64748b" }}>
                                  {subtitle}
                                </p>p>
                                              )}
                                  </div>div>
                        
                                  <div className="flex items-center gap-2">
                                              <button
                                                              className="hidden lg:flex p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95"
                                                              style={{ color: "#64748b" }}
                                                              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f1f5f9"; }}
                                                              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                                                              aria-label="Buscar"
                                                            >
                                                            <Search className="w-5 h-5" />
                                              </button>button>
                                              <button
                                                              className="relative p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95"
                                                              style={{ color: "#64748b" }}
                                                              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f1f5f9"; }}
                                                              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                                                              aria-label="Notificaciones"
                                                            >
                                                            <Bell className="w-5 h-5" />
                                                            <span
                                                                              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                                                                              style={{ background: "#00B894" }}
                                                                            />
                                              </button>button>
                                              <div
                                                              className="w-9 h-9 rounded-xl flex items-center justify-center text-white cursor-pointer transition-all hover:scale-105"
                                                              style={{
                                                                                background: "linear-gradient(135deg, #0A2540 0%, #1a3a5c 100%)",
                                                                                boxShadow: "0 2px 8px rgba(10,37,64,0.3)",
                                                              }}
                                                            >
                                                            <User className="w-4 h-4" />
                                              </div>div>
                                  </div>div>
                        </div>div>
                </div>div>
          </header>header>
        );
}</header>
