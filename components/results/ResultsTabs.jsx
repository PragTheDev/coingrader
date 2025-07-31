"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Sparkles } from "lucide-react";

export default function ResultsTabs({ gradingResults }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-slate-100 dark:bg-slate-700">
        <TabsTrigger
          value="overview"
          className="dark:data-[state=active]:bg-slate-600"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="details"
          className="dark:data-[state=active]:bg-slate-600"
        >
          Details
        </TabsTrigger>
        <TabsTrigger
          value="market"
          className="dark:data-[state=active]:bg-slate-600"
        >
          Market Info
        </TabsTrigger>
        <TabsTrigger
          value="notes"
          className="dark:data-[state=active]:bg-slate-600"
        >
          AI Notes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {gradingResults.overallGrade}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Overall Grade
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
              {gradingResults.confidence}%
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Confidence
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Grade Score
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {gradingResults.gradeScore}/100
            </span>
          </div>
          <Progress value={gradingResults.gradeScore} className="w-full" />
        </div>
        <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            {gradingResults.certificationRecommendation}
          </AlertDescription>
        </Alert>
      </TabsContent>

      <TabsContent value="details" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(gradingResults.details).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded border border-slate-200 dark:border-slate-600"
            >
              <span className="capitalize font-medium text-slate-700 dark:text-slate-300">
                {key}:
              </span>
              <Badge
                variant="outline"
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
              >
                {value}
              </Badge>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="market" className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Estimated Value:
            </span>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              {gradingResults.marketValue}
            </span>
          </div>
          <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Rarity:
            </span>
            <Badge
              variant="secondary"
              className="bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300"
            >
              {gradingResults.rarity}
            </Badge>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="notes" className="space-y-4">
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
            <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              AI Analysis Notes
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
              {gradingResults.gradingNotes ||
                "Detailed AI analysis notes will appear here."}
            </p>
          </div>

          {/* Confidence indicator */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                AI Confidence Level
              </span>
              <span className="text-sm text-blue-600 dark:text-blue-400">
                {gradingResults.confidence}%
              </span>
            </div>
            <Progress
              value={gradingResults.confidence}
              className="w-full h-2"
            />
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
              {gradingResults.confidence >= 90
                ? "Very High Confidence"
                : gradingResults.confidence >= 75
                ? "High Confidence"
                : gradingResults.confidence >= 60
                ? "Moderate Confidence"
                : "Low Confidence - Consider professional evaluation"}
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
