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
        "use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, Archive, Sun, Moon } from "lucide-react";

export default function Navbar({
  isDarkMode,
  toggleDarkMode,
  savedCoinsCount,
  setShowSavedCoins,
}) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
              <Coins className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              CoinGrader
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Saved Coins Button */}
            <Button
              onClick={() => setShowSavedCoins(true)}
              variant="ghost"
              size="sm"
              className="relative hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Archive className="h-4 w-4 mr-2" />
              Collection
              {savedCoinsCount > 0 && (
                <Badge className="ml-2 bg-indigo-500 text-white text-xs px-1.5 py-0.5">
                  {savedCoinsCount}
                </Badge>
              )}
            </Button>

            {/* Dark Mode Toggle */}
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
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
