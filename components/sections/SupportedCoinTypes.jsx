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
  Crown,
  Landmark,
  Coins,
  Star,
  Calendar,
  Globe,
  Gem,
  Trophy,
} from "lucide-react";

export default function SupportedCoinTypes() {
  const coinCategories = [
    {
      icon: Crown,
      title: "Ancient Coins",
      description:
        "Roman, Greek, Byzantine, and other historical civilizations",
      examples: [
        "Roman Denarii",
        "Greek Tetradrachms",
        "Byzantine Solidi",
        "Celtic Coins",
      ],
      color: "from-amber-600 to-yellow-500",
      bgColor:
        "from-amber-50/80 via-white/80 to-yellow-100/80 dark:from-amber-900/30 dark:via-slate-800/80 dark:to-yellow-900/30",
      borderColor: "border-amber-200/50 dark:border-amber-700/50",
      iconColor: "text-amber-600 dark:text-amber-400",
      count: "500+ Types",
    },
    {
      icon: Landmark,
      title: "World Coins",
      description: "International currencies from around the globe",
      examples: [
        "British Pounds",
        "Canadian Dollars",
        "Australian Coins",
        "European Euros",
      ],
      color: "from-blue-600 to-indigo-500",
      bgColor:
        "from-blue-50/80 via-white/80 to-indigo-100/80 dark:from-blue-900/30 dark:via-slate-800/80 dark:to-indigo-900/30",
      borderColor: "border-blue-200/50 dark:border-blue-700/50",
      iconColor: "text-blue-600 dark:text-blue-400",
      count: "200+ Countries",
    },
    {
      icon: Star,
      title: "US Coins",
      description: "American currency from colonial times to modern day",
      examples: [
        "Morgan Dollars",
        "Walking Liberty",
        "Mercury Dimes",
        "Indian Head Cents",
      ],
      color: "from-red-600 to-rose-500",
      bgColor:
        "from-red-50/80 via-white/80 to-rose-100/80 dark:from-red-900/30 dark:via-slate-800/80 dark:to-rose-900/30",
      borderColor: "border-red-200/50 dark:border-red-700/50",
      iconColor: "text-red-600 dark:text-red-400",
      count: "All Denominations",
    },
    {
      icon: Calendar,
      title: "Commemorative",
      description: "Special edition and commemorative coin releases",
      examples: [
        "Olympic Coins",
        "Royal Mint Specials",
        "Anniversary Issues",
        "Limited Editions",
      ],
      color: "from-purple-600 to-pink-500",
      bgColor:
        "from-purple-50/80 via-white/80 to-pink-100/80 dark:from-purple-900/30 dark:via-slate-800/80 dark:to-pink-900/30",
      borderColor: "border-purple-200/50 dark:border-purple-700/50",
      iconColor: "text-purple-600 dark:text-purple-400",
      count: "1000+ Events",
    },
    {
      icon: Globe,
      title: "Colonial Coins",
      description: "Pre-independence and colonial era currencies",
      examples: [
        "Spanish Reales",
        "Colonial Coppers",
        "Trade Tokens",
        "Provincial Issues",
      ],
      color: "from-green-600 to-emerald-500",
      bgColor:
        "from-green-50/80 via-white/80 to-emerald-100/80 dark:from-green-900/30 dark:via-slate-800/80 dark:to-emerald-900/30",
      borderColor: "border-green-200/50 dark:border-green-700/50",
      iconColor: "text-green-600 dark:text-green-400",
      count: "Historical Rarities",
    },
    {
      icon: Gem,
      title: "Precious Metals",
      description: "Gold, silver, platinum, and other precious metal coins",
      examples: [
        "Gold Eagles",
        "Silver Rounds",
        "Platinum Coins",
        "Palladium Issues",
      ],
      color: "from-cyan-600 to-teal-500",
      bgColor:
        "from-cyan-50/80 via-white/80 to-teal-100/80 dark:from-cyan-900/30 dark:via-slate-800/80 dark:to-teal-900/30",
      borderColor: "border-cyan-200/50 dark:border-cyan-700/50",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      count: "All Metals",
    },
    {
      icon: Trophy,
      title: "Error Coins",
      description: "Minting errors and varieties for specialists",
      examples: [
        "Double Dies",
        "Off-Center Strikes",
        "Clipped Planchets",
        "Die Cracks",
      ],
      color: "from-orange-600 to-red-500",
      bgColor:
        "from-orange-50/80 via-white/80 to-red-100/80 dark:from-orange-900/30 dark:via-slate-800/80 dark:to-red-900/30",
      borderColor: "border-orange-200/50 dark:border-orange-700/50",
      iconColor: "text-orange-600 dark:text-orange-400",
      count: "Expert Analysis",
    },
    {
      icon: Coins,
      title: "Tokens & Medals",
      description: "Trade tokens, medals, and exonumia items",
      examples: [
        "Civil War Tokens",
        "Hard Times Tokens",
        "Award Medals",
        "So-Called Dollars",
      ],
      color: "from-slate-600 to-gray-500",
      bgColor:
        "from-slate-50/80 via-white/80 to-gray-100/80 dark:from-slate-900/30 dark:via-slate-800/80 dark:to-gray-900/30",
      borderColor: "border-slate-200/50 dark:border-slate-700/50",
      iconColor: "text-slate-600 dark:text-slate-400",
      count: "Specialized Items",
    },
  ];

  return (
    <section className="mb-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-slate-900 via-green-800 to-slate-900 dark:from-white dark:via-green-200 dark:to-white bg-clip-text text-transparent">
          Supported Coin Types
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Our AI recognizes and grades a comprehensive range of coin types from
          around the world and throughout history.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coinCategories.map((category, index) => (
          <Card
            key={index}
            className={`glass bg-gradient-to-br ${category.bgColor} ${category.borderColor} shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group animate-fade-in-up h-full`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="relative">
              <div className="flex justify-between items-start mb-4">
                <div className="relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-full blur-xl opacity-30 animate-pulse`}
                  ></div>
                  <category.icon
                    className={`relative h-10 w-10 ${category.iconColor} animate-float group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <Badge
                  className={`bg-gradient-to-r ${category.color} text-white font-semibold text-xs px-2 py-1 rounded-full shadow-lg`}
                >
                  {category.count}
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                {category.title}
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Examples:
                </p>
                <div className="flex flex-wrap gap-1">
                  {category.examples.map((example, exampleIndex) => (
                    <Badge
                      key={exampleIndex}
                      variant="outline"
                      className="text-xs px-2 py-1 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300"
                    >
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Card className="glass bg-gradient-to-br from-slate-50/80 via-white/80 to-slate-100/80 dark:from-slate-800/80 dark:via-slate-700/80 dark:to-slate-800/80 border-slate-200/50 dark:border-slate-600/50 shadow-2xl max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <Coins className="relative h-12 w-12 text-blue-600 dark:text-blue-400 animate-float" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Don&apos;t See Your Coin Type?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-6">
              Our AI is constantly learning and expanding. Upload your coin and
              our system will do its best to provide accurate grading, even for
              rare or unusual types.
            </p>
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-base px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              Try It Anyway
            </Badge>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
