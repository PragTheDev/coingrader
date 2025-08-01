"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Target, Zap } from "lucide-react";

export default function Header() {
  return (
    <section className="text-center py-20">
      {/* Hero Content */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg animate-gentle-float">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">
            CoinGrader
          </h1>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-medium text-slate-600 dark:text-slate-300 mb-6">
          Professional AI-powered coin grading
        </h2>
        
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Upload your coin images and receive professional-grade analysis using advanced computer vision technology. Get accurate grading, market values, and detailed condition reports in seconds.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <Card className="glass interactive-card">
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 w-fit mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              50K+
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Coins Graded
            </div>
          </CardContent>
        </Card>

        <Card className="glass interactive-card">
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30 w-fit mx-auto mb-4">
              <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              98.5%
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Accuracy Rate
            </div>
          </CardContent>
        </Card>

        <Card className="glass interactive-card">
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 w-fit mx-auto mb-4">
              <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              &lt;30s
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Analysis Time
            </div>
          </CardContent>
        </Card>

        <Card className="glass interactive-card">
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30 w-fit mx-auto mb-4">
              <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Expert
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Grade Quality
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
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
