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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <DemoBanner />
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-16 left-4 z-50 lg:hidden p-2.5 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all border border-slate-200"
      >
        {sidebarOpen ? (
          <X className="w-5 h-5 text-slate-700" />
        ) : (
          <Menu className="w-5 h-5 text-slate-700" />
        )}
      </button>

      <div className="flex pt-12">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main content */}
        <main className="flex-1 w-full lg:ml-64 transition-all duration-300 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
