"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Target, Zap, Clock } from "lucide-react";

export default function Header() {
  return (
    <header className="text-center py-16 mb-12">
      <div className="flex justify-center items-center gap-4 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <Award className="relative h-16 w-16 text-blue-600 dark:text-blue-400 animate-float" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-bounce shadow-xl shadow-green-500/50"></div>
        </div>
        <h1 className="text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent animate-shimmer">
          CoinGrader
        </h1>
      </div>
      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-2xl text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          Revolutionary AI-powered coin grading technology
        </p>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          Upload your coin images and receive professional-grade analysis using
          advanced computer vision
        </p>
      </div>

      {/* Enhanced Stats Row with Color Themes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <Card className="card-hover glass bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200/50 dark:border-blue-700/50 shadow-xl hover:shadow-2xl">
          <CardContent className="p-6 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <Users className="relative h-8 w-8 mx-auto text-blue-600 dark:text-blue-400 animate-float" />
            </div>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">
              50K+
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Coins Graded
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover glass bg-gradient-to-br from-green-50/80 to-green-100/80 dark:from-green-900/30 dark:to-green-800/30 border-green-200/50 dark:border-green-700/50 shadow-xl hover:shadow-2xl">
          <CardContent className="p-6 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <Target
                className="relative h-8 w-8 mx-auto text-green-600 dark:text-green-400 animate-float"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            <div className="text-3xl font-black text-green-600 dark:text-green-400 mb-2">
              98%
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Accuracy Rate
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover glass bg-gradient-to-br from-purple-50/80 to-purple-100/80 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-200/50 dark:border-purple-700/50 shadow-xl hover:shadow-2xl">
          <CardContent className="p-6 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <Zap
                className="relative h-8 w-8 mx-auto text-purple-600 dark:text-purple-400 animate-float"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <div className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-2">
              2.5s
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Avg. Analysis Time
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover glass bg-gradient-to-br from-orange-50/80 to-orange-100/80 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-200/50 dark:border-orange-700/50 shadow-xl hover:shadow-2xl">
          <CardContent className="p-6 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <Clock
                className="relative h-8 w-8 mx-auto text-orange-600 dark:text-orange-400 animate-float"
                style={{ animationDelay: "1.5s" }}
              />
            </div>
            <div className="text-3xl font-black text-orange-600 dark:text-orange-400 mb-2">
              24/7
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Available
            </div>
          </CardContent>
        </Card>
      </div>
    </header>
  );
}
