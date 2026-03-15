"use client";

import { Bell, Search } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-700/50 shadow-premium">
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Title Section */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent animate-gradient">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 animate-fade-in-up">
                {subtitle}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button className="glass-effect p-2.5 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition-all hover:scale-105 active:scale-95">
              <Search className="w-5 h-5" />
            </button>
            
            {/* Notifications Button */}
            <button className="glass-effect p-2.5 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 relative transition-all hover:scale-105 active:scale-95">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-glow animate-pulse-subtle">
                3
              </span>
            </button>
            
            {/* User Avatar */}
            <div className="glass-effect w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold shadow-premium cursor-pointer transition-all hover:scale-105 active:scale-95 hover:shadow-glow">
              CF
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
