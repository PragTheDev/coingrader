"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Zap, Shield, Coins, TrendingUp, Award } from "lucide-react";

export default function FeatureCards() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms trained on thousands of coin images for accurate grading.",
      color: "from-blue-600 to-cyan-500",
      bgColor:
        "from-blue-50/80 via-white/80 to-cyan-100/80 dark:from-blue-900/30 dark:via-slate-800/80 dark:to-cyan-900/30",
      borderColor: "border-blue-200/50 dark:border-blue-700/50",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Get professional-grade coin evaluations in seconds, not days or weeks.",
      color: "from-yellow-600 to-orange-500",
      bgColor:
        "from-yellow-50/80 via-white/80 to-orange-100/80 dark:from-yellow-900/30 dark:via-slate-800/80 dark:to-orange-900/30",
      borderColor: "border-yellow-200/50 dark:border-yellow-700/50",
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your coin images and data are processed securely with bank-level encryption.",
      color: "from-green-600 to-emerald-500",
      bgColor:
        "from-green-50/80 via-white/80 to-emerald-100/80 dark:from-green-900/30 dark:via-slate-800/80 dark:to-emerald-900/30",
      borderColor: "border-green-200/50 dark:border-green-700/50",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      icon: Coins,
      title: "Multiple Coin Types",
      description:
        "Support for various coin types including ancient, modern, and collectible coins.",
      color: "from-purple-600 to-pink-500",
      bgColor:
        "from-purple-50/80 via-white/80 to-pink-100/80 dark:from-purple-900/30 dark:via-slate-800/80 dark:to-pink-900/30",
      borderColor: "border-purple-200/50 dark:border-purple-700/50",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: TrendingUp,
      title: "Market Value Insights",
      description:
        "Real-time market data and pricing trends for accurate coin valuations.",
      color: "from-red-600 to-rose-500",
      bgColor:
        "from-red-50/80 via-white/80 to-rose-100/80 dark:from-red-900/30 dark:via-slate-800/80 dark:to-rose-900/30",
      borderColor: "border-red-200/50 dark:border-red-700/50",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      icon: Award,
      title: "Professional Standards",
      description:
        "Grading based on industry-standard criteria used by professional numismatists.",
      color: "from-indigo-600 to-blue-500",
      bgColor:
        "from-indigo-50/80 via-white/80 to-blue-100/80 dark:from-indigo-900/30 dark:via-slate-800/80 dark:to-blue-900/30",
      borderColor: "border-indigo-200/50 dark:border-indigo-700/50",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
  ];

  return (
    <section className="mb-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
          Why Choose CoinGrader?
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Experience the future of coin grading with our cutting-edge AI
          technology and professional standards.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className={`glass bg-gradient-to-br ${feature.bgColor} ${feature.borderColor} shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group animate-fade-in-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="relative">
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-full blur-xl opacity-30 animate-pulse`}
                ></div>
                <feature.icon
                  className={`relative h-12 w-12 ${feature.iconColor} animate-float group-hover:scale-110 transition-transform duration-300`}
                />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
