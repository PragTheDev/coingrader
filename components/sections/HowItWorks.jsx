"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, BarChart3, Save, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      step: "1",
      title: "Upload Your Coin",
      description:
        "Take clear photos of both sides of your coin and upload them to our secure platform.",
      color: "from-blue-600 to-cyan-500",
      bgColor:
        "from-blue-50/80 via-white/80 to-cyan-100/80 dark:from-blue-900/30 dark:via-slate-800/80 dark:to-cyan-900/30",
      borderColor: "border-blue-200/50 dark:border-blue-700/50",
      iconColor: "text-blue-600 dark:text-blue-400",
      badgeColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      icon: Search,
      step: "2",
      title: "AI Analysis",
      description:
        "Our advanced AI examines your coin's condition, authenticity, and historical significance.",
      color: "from-purple-600 to-pink-500",
      bgColor:
        "from-purple-50/80 via-white/80 to-pink-100/80 dark:from-purple-900/30 dark:via-slate-800/80 dark:to-pink-900/30",
      borderColor: "border-purple-200/50 dark:border-purple-700/50",
      iconColor: "text-purple-600 dark:text-purple-400",
      badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      step: "3",
      title: "Get Results",
      description:
        "Receive a comprehensive grade, market value, and detailed analysis report instantly.",
      color: "from-green-600 to-emerald-500",
      bgColor:
        "from-green-50/80 via-white/80 to-emerald-100/80 dark:from-green-900/30 dark:via-slate-800/80 dark:to-emerald-900/30",
      borderColor: "border-green-200/50 dark:border-green-700/50",
      iconColor: "text-green-600 dark:text-green-400",
      badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
    {
      icon: Save,
      step: "4",
      title: "Save & Track",
      description:
        "Save your graded coins to your personal collection and track their value over time.",
      color: "from-yellow-600 to-orange-500",
      bgColor:
        "from-yellow-50/80 via-white/80 to-orange-100/80 dark:from-yellow-900/30 dark:via-slate-800/80 dark:to-orange-900/30",
      borderColor: "border-yellow-200/50 dark:border-yellow-700/50",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      badgeColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="mb-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent">
          How It Works
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Get professional coin grading in four simple steps with our AI-powered
          platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <Card
              className={`glass bg-gradient-to-br ${step.bgColor} ${step.borderColor} shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group animate-fade-in-up h-full`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="relative text-center">
                <div className="relative mx-auto mb-4">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full blur-xl opacity-30 animate-pulse`}
                  ></div>
                  <Badge
                    className={`relative ${step.badgeColor} text-white font-bold text-lg px-4 py-2 rounded-full shadow-lg`}
                  >
                    {step.step}
                  </Badge>
                </div>
                <div className="relative mx-auto mb-4">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full blur-xl opacity-30 animate-pulse`}
                  ></div>
                  <step.icon
                    className={`relative h-12 w-12 ${step.iconColor} animate-float group-hover:scale-110 transition-transform duration-300 mx-auto`}
                  />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-400 text-base leading-relaxed text-center">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>

            {/* Arrow connector for desktop */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
                  <ArrowRight className="relative h-8 w-8 text-slate-400 dark:text-slate-500 animate-float" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
          Ready to get started? Upload your first coin today!
        </p>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
          <Badge
            className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => {
              const uploadSection = document.querySelector(
                "[data-upload-section]"
              );
              if (uploadSection) {
                uploadSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
          >
            Start Grading Now
          </Badge>
        </div>
      </div>
    </section>
  );
}
