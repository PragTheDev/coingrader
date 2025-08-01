"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Sparkles, Archive, Sun, Moon } from "lucide-react";

export default function Navbar({
  darkMode,
  toggleDarkMode,
  showSavedCoins,
  setShowSavedCoins,
  savedCoinsCount,
}) {
  return (
    <nav className="flex justify-between items-center py-6 mb-6 glass rounded-2xl px-6 backdrop-blur-lg shadow-xl border border-white/20">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Award className="h-10 w-10 text-blue-600 dark:text-blue-400 animate-glow" />
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-20 animate-pulse"></div>
        </div>
        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
          CoinGrader
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Badge
          variant="outline"
          className="hidden md:flex glass border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 shadow-lg"
        >
          <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
          AI-Powered
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSavedCoins(!showSavedCoins)}
          className="p-3 glass border-slate-200/50 dark:border-slate-700/50 hover:scale-110 transition-all duration-300 shadow-lg relative"
        >
          <Archive className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          {savedCoinsCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5">
              {savedCoinsCount}
            </Badge>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleDarkMode}
          className="p-3 glass border-slate-200/50 dark:border-slate-700/50 hover:scale-110 transition-all duration-300 shadow-lg"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-amber-500" />
          ) : (
            <Moon className="h-5 w-5 text-slate-600" />
          )}
        </Button>
      </div>
    </nav>
  );
}
