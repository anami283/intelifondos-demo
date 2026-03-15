"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
        <div className="min-h-screen bg-[#F0F4F8]">
              <DemoBanner />
        
          {sidebarOpen && (
                  <div
                              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                              onClick={() => setSidebarOpen(false)}
                            />
                )}
        
              <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="fixed top-10 left-4 z-50 lg:hidden p-2.5 rounded-xl bg-white shadow-lg border border-slate-200 hover:shadow-xl transition-all"
                        aria-label="Menu"
                      >
                {sidebarOpen ? (
                                  <X className="w-5 h-5 text-slate-700" />
                                ) : (
                                  <Menu className="w-5 h-5 text-slate-700" />
                                )}
              </button>button>
        
              <div className="flex" style={{ paddingTop: "2.5rem" }}>
                      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                      <main className="flex-1 min-h-[calc(100vh-2.5rem)] transition-all duration-300 lg:pl-64">
                        {children}
                      </main>main>
              </div>div>
        </div>div>
      );
}</div>
