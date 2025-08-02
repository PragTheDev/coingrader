"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Palette,
  Stars,
  Grid3X3,
  Waves,
  Sparkles,
  Moon,
  Sun,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const backgroundOptions = [
  {
    id: "default",
    name: "Default",
    description: "Clean gradient background",
    icon: Palette,
    preview: "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
  },
  {
    id: "stars",
    name: "Shooting Stars",
    description: "Animated starfield with shooting stars",
    icon: Stars,
    preview: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800",
  },
  {
    id: "grid",
    name: "Grid Pattern",
    description: "Modern grid overlay",
    icon: Grid3X3,
    preview: "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
  },
  {
    id: "waves",
    name: "Animated Waves",
    description: "Flowing wave animation",
    icon: Waves,
    preview: "bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900",
  },
  {
    id: "sparkles",
    name: "Floating Sparkles",
    description: "Magical floating particles",
    icon: Sparkles,
    preview: "bg-gradient-to-br from-purple-50 via-pink-50 to-rose-100 dark:from-purple-900 dark:via-pink-900 dark:to-rose-900",
  },
];

export default function SettingsPage() {
  const [selectedBackground, setSelectedBackground] = useState("default");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load saved settings
    const savedBackground = localStorage.getItem("coingrader-background") || "default";
    const savedTheme = localStorage.getItem("coingrader-theme") || "light";
    
    setSelectedBackground(savedBackground);
    setIsDarkMode(savedTheme === "dark");
    
    // Apply background class to body
    document.body.className = document.body.className.replace(/bg-\w+/g, '');
    document.body.classList.add(`bg-${savedBackground}`);
  }, []);

  const handleBackgroundChange = (backgroundId) => {
    setSelectedBackground(backgroundId);
    localStorage.setItem("coingrader-background", backgroundId);
    
    // Apply background class to body
    document.body.className = document.body.className.replace(/bg-\w+/g, '');
    document.body.classList.add(`bg-${backgroundId}`);
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('backgroundChanged', { 
      detail: { background: backgroundId } 
    }));
  };

  const handleThemeChange = (theme) => {
    setIsDarkMode(theme === "dark");
    localStorage.setItem("coingrader-theme", theme);
    
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to CoinGrader
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <Settings className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              Settings
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Customize your CoinGrader experience
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Theme Settings */}
          <Card className="glass border-slate-200/50 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
                  <Sun className="h-5 w-5 text-white" />
                </div>
                Theme Preferences
              </CardTitle>
              <CardDescription>
                Choose between light and dark mode
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Label className="text-slate-700 dark:text-slate-300 font-medium">
                  Color Theme:
                </Label>
                <Select 
                  value={isDarkMode ? "dark" : "light"} 
                  onValueChange={handleThemeChange}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light" className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Light Mode
                    </SelectItem>
                    <SelectItem value="dark" className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      Dark Mode
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Background Settings */}
          <Card className="glass border-slate-200/50 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                  <Palette className="h-5 w-5 text-white" />
                </div>
                Background Style
              </CardTitle>
              <CardDescription>
                Choose your preferred background animation and style
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {backgroundOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`relative cursor-pointer rounded-xl border-2 transition-all duration-300 ${
                      selectedBackground === option.id
                        ? "border-blue-500 ring-2 ring-blue-500/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                    onClick={() => handleBackgroundChange(option.id)}
                  >
                    {/* Preview */}
                    <div className={`h-24 rounded-t-xl ${option.preview} relative overflow-hidden`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <option.icon className="h-8 w-8 text-slate-600 dark:text-slate-300 opacity-60" />
                      </div>
                      {selectedBackground === option.id && (
                        <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
                          Active
                        </Badge>
                      )}
                    </div>
                    
                    {/* Info */}
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-b-xl">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                        {option.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      Preview Note
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Background changes will be applied immediately. Animated backgrounds may affect performance on older devices.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reset Settings */}
          <Card className="glass border-slate-200/50 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">
                Reset Settings
              </CardTitle>
              <CardDescription>
                Restore all settings to their default values
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                onClick={() => {
                  localStorage.removeItem("coingrader-background");
                  localStorage.removeItem("coingrader-theme");
                  setSelectedBackground("default");
                  setIsDarkMode(false);
                  document.documentElement.classList.remove("dark");
                  handleBackgroundChange("default");
                }}
                className="text-slate-700 dark:text-slate-300"
              >
                Reset to Defaults
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
