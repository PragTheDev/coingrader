"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Star,
  Eye,
  Shield,
  TrendingUp,
  Award,
  Coins,
  Search,
} from "lucide-react";

export default function NumismaticsGuide() {
  const gradingScales = [
    {
      grade: "MS-70",
      range: "70",
      description: "Perfect Uncirculated",
      details: "Flawless coin with no post-production imperfections",
      color: "bg-emerald-500",
    },
    {
      grade: "MS-69",
      range: "69",
      description: "Superb Uncirculated",
      details: "Exceptional quality with minimal contact marks",
      color: "bg-green-500",
    },
    {
      grade: "MS-65",
      range: "65-68",
      description: "Gem Uncirculated",
      details: "High quality with minor imperfections",
      color: "bg-blue-500",
    },
    {
      grade: "MS-60",
      range: "60-64",
      description: "Uncirculated",
      details: "No wear but may have contact marks",
      color: "bg-cyan-500",
    },
    {
      grade: "AU-58",
      range: "58-59",
      description: "About Uncirculated",
      details: "Slight wear on highest points",
      color: "bg-yellow-500",
    },
    {
      grade: "XF-45",
      range: "45-55",
      description: "Extremely Fine",
      details: "Light wear on high points, details sharp",
      color: "bg-orange-500",
    },
    {
      grade: "VF-30",
      range: "30-40",
      description: "Very Fine",
      details: "Moderate wear, major features clear",
      color: "bg-red-500",
    },
    {
      grade: "F-12",
      range: "12-25",
      description: "Fine",
      details: "Considerable wear but readable",
      color: "bg-purple-500",
    },
  ];

  const gradingFactors = [
    {
      icon: Eye,
      title: "Strike Quality",
      description: "How well the design was impressed into the coin",
      details: "Sharp strikes show full detail, weak strikes appear flat",
    },
    {
      icon: Star,
      title: "Surface Preservation",
      description: "Condition of the coin's original surface",
      details: "Look for scratches, marks, corrosion, or cleaning damage",
    },
    {
      icon: Shield,
      title: "Luster",
      description: "The original mint finish and reflectivity",
      details: "Original luster adds significant value to a coin",
    },
    {
      icon: Award,
      title: "Eye Appeal",
      description: "Overall aesthetic attractiveness",
      details: "Toning, color, and visual impact affect desirability",
    },
  ];

  return (
    <section className="space-y-16">
      {/* Main Header */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h2 className="text-4xl font-black text-slate-900 dark:text-white">
            Understanding Numismatics
          </h2>
        </div>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
          Numismatics is the study and collection of coins, paper money, and
          related objects. Professional coin grading determines a coin's
          condition and market value using standardized criteria.
        </p>
      </div>

      {/* What is Numismatics */}
      <Card className="glass bg-gradient-to-br from-blue-50/80 via-white/80 to-indigo-50/80 dark:from-blue-900/20 dark:via-slate-800/80 dark:to-indigo-900/20 border-blue-200/50 dark:border-blue-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-blue-900 dark:text-blue-100">
            <Coins className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            What is Numismatics?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
            Numismatics encompasses the systematic study of coins, tokens, paper
            money, and medals. It involves examining their historical context,
            artistic merit, production methods, and cultural significance.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Historical Research
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Understanding the historical period, mint marks, production
                quantities, and historical significance of coins.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Market Analysis
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Evaluating rarity, collector demand, market trends, and
                investment potential of numismatic items.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coin Grading Basics */}
      <Card className="glass bg-gradient-to-br from-slate-50/80 via-white/80 to-slate-100/80 dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-900/80 border-slate-200/50 dark:border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-slate-900 dark:text-white">
            <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            Professional Coin Grading
          </CardTitle>
          <CardDescription className="text-lg text-slate-600 dark:text-slate-400">
            Coin grading is the process of determining a coin's condition and
            assigning it a numerical grade that affects its value.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            The Sheldon Grading Scale, developed by Dr. William Sheldon in 1949,
            uses a 70-point scale where 70 represents a perfect coin and 1
            represents a barely identifiable coin. This system is universally
            accepted by collectors, dealers, and certification services.
          </p>

          {/* Grading Factors */}
          <div className="grid md:grid-cols-2 gap-6">
            {gradingFactors.map((factor, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-600 border border-slate-200 dark:border-slate-600"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                    <factor.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {factor.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {factor.description}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      {factor.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grading Scale */}
      <Card className="glass bg-gradient-to-br from-purple-50/80 via-white/80 to-pink-50/80 dark:from-purple-900/20 dark:via-slate-800/80 dark:to-pink-900/20 border-purple-200/50 dark:border-purple-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-purple-900 dark:text-purple-100">
            <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            Sheldon Grading Scale
          </CardTitle>
          <CardDescription className="text-lg text-purple-700 dark:text-purple-300">
            Understanding the 70-point grading scale used by professional
            certification services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {gradingScales.map((scale, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white to-slate-50 dark:from-slate-700 dark:to-slate-600 border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300"
              >
                <Badge
                  className={`${scale.color} text-white font-bold px-3 py-1 min-w-[60px] justify-center`}
                >
                  {scale.range}
                </Badge>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {scale.grade}
                    </h4>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {scale.description}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    {scale.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Why Grading Matters */}
      <Card className="glass bg-gradient-to-br from-green-50/80 via-white/80 to-emerald-50/80 dark:from-green-900/20 dark:via-slate-800/80 dark:to-emerald-900/20 border-green-200/50 dark:border-green-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-green-900 dark:text-green-100">
            <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            Why Professional Grading Matters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Authentication
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Professional grading services authenticate coins and detect
                counterfeits using advanced techniques.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Market Value
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Graded coins have established market values, making buying,
                selling, and insurance easier.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Standardization
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Consistent grading standards allow collectors worldwide to
                communicate effectively.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
