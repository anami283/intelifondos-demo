"use client";

import { Bell, Search, User } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Title Section */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs lg:text-sm text-slate-600 mt-0.5 truncate">
                {subtitle}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Button - Hidden on mobile */}
            <button 
              className="hidden lg:flex p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-all hover:scale-105 active:scale-95"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications Button */}
            <button 
              className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-all hover:scale-105 active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-full" />
            </button>

            {/* User Avatar */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
