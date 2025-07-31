"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Save, Trash2 } from "lucide-react";
import ResultsTabs from "./ResultsTabs";

export default function ResultsSection({
  gradingResults,
  saveCoin,
  clearAnalysis,
  savedCoins,
  obverseImage,
  reverseImage,
}) {
  const isAlreadySaved = savedCoins.some(
    (coin) =>
      coin.obverseImage === obverseImage &&
      coin.reverseImage === reverseImage &&
      coin.gradingResults?.overallGrade === gradingResults?.overallGrade
  );

  return (
    <Card className="glass bg-gradient-to-br from-white/80 via-slate-50/80 to-white/80 dark:from-slate-800/80 dark:via-slate-900/80 dark:to-slate-800/80 border-slate-200/50 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-3 text-slate-900 dark:text-white text-2xl font-black">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <Star className="relative h-6 w-6 text-amber-600 dark:text-amber-400 animate-float" />
              </div>
              Grading Results
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Your coin grading results will appear here after analysis.
            </CardDescription>
          </div>
          {gradingResults && (
            <div className="flex gap-2">
              <Button
                onClick={saveCoin}
                disabled={isAlreadySaved}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:from-slate-400 disabled:to-slate-500 disabled:scale-100"
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={clearAnalysis}
                variant="outline"
                className="border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {gradingResults ? (
          <ResultsTabs gradingResults={gradingResults} />
        ) : (
          <div className="text-center py-12 text-slate-400 dark:text-slate-500">
            <Star className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2 text-slate-600 dark:text-slate-400">
              No coin analyzed yet
            </p>
            <p className="text-sm">Upload coin images to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
