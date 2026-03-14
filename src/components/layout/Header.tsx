"use client";

import { Bell, Search } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      <div>
        <h1 className="text-base font-semibold text-[#1A1A2E]">{title}</h1>
        {subtitle && (
          <p className="text-xs text-gray-500">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
          <Search className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 relative transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#00B894] rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00B894] to-[#6C63FF] flex items-center justify-center text-white text-xs font-bold">
          CF
        </div>
      </div>
    </header>
  );
}
