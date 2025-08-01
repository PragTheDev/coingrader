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
