"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Archive, Eye, Trash2 } from "lucide-react";

export default function SavedCoinsSection({
  savedCoins,
  setShowSavedCoins,
  loadSavedCoin,
  deleteSavedCoin,
}) {
  return (
    <Card className="mb-12 glass bg-gradient-to-br from-purple-50/80 via-white/80 to-purple-100/80 dark:from-purple-900/30 dark:via-slate-800/80 dark:to-purple-900/30 border-purple-200/50 dark:border-purple-700/50 shadow-2xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-3 text-slate-900 dark:text-white text-2xl font-black">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <Archive className="relative h-6 w-6 text-purple-600 dark:text-purple-400 animate-float" />
            </div>
            Saved Coins ({savedCoins.length})
          </CardTitle>
          <Button
            onClick={() => setShowSavedCoins(false)}
            variant="outline"
            size="sm"
            className="border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Close
          </Button>
        </div>
        <CardDescription className="text-slate-600 dark:text-slate-400 text-lg">
          Your collection of graded coins saved for future reference.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {savedCoins.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCoins.map((coin) => (
              <Card
                key={coin.id}
                className="glass bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-700/80 border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4 mb-4">
                    {coin.obverseImage && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={coin.obverseImage}
                          alt="Obverse"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    )}
                    {coin.reverseImage && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={coin.reverseImage}
                          alt="Reverse"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                        {coin.gradingResults.overallGrade}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-700"
                      >
                        {coin.gradingResults.confidence}% Confidence
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <p>
                        <strong>Type:</strong>{" "}
                        {coin.selectedCoinType || "Not specified"}
                      </p>
                      <p>
                        <strong>Market Value:</strong>{" "}
                        {coin.gradingResults.marketValue}
                      </p>
                      <p>
                        <strong>Saved:</strong>{" "}
                        {new Date(coin.savedAt).toLocaleDateString()}
                      </p>
                    </div>
                    {coin.coinDetails && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 italic line-clamp-2">
                        &quot;{coin.coinDetails}&quot;
                      </p>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => loadSavedCoin(coin)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        onClick={() => deleteSavedCoin(coin.id)}
                        variant="outline"
                        className="border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 dark:text-slate-500">
            <Archive className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2 text-slate-600 dark:text-slate-400">
              No saved coins yet
            </p>
            <p className="text-sm">
              Grade some coins and save them to build your collection
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
