"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Camera, Clock, Sparkles, Info, Coins } from "lucide-react";
import ImageUploadArea from "./ImageUploadArea";

export default function UploadSection({
  obverseImage,
  reverseImage,
  obversePreview,
  reversePreview,
  selectedCoinType,
  coinDetails,
  isAnalyzing,
  onImageUpload,
  onClearImage,
  onSelectedCoinTypeChange,
  onCoinDetailsChange,
  onAnalyzeCoin,
  hasApiKey = false, // Default to false if not provided
}) {
  return (
    <Card
      data-upload-section
      className="glass bg-gradient-to-br from-slate-50/80 via-white/80 to-slate-100/80 dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-900/80 border-slate-200/50 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 card-hover"
    >
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-slate-900 dark:text-white text-2xl font-black">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <Upload className="relative h-6 w-6 text-blue-600 dark:text-blue-400 animate-float" />
          </div>
          Upload Coin Images
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
          Upload clear, high-resolution images of both sides of your coin for
          the most accurate professional grading.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Enhanced Coin Type Selection */}
        <div className="space-y-3">
          <Label
            htmlFor="coin-type"
            className="text-slate-700 dark:text-slate-300 font-semibold text-lg flex items-center gap-2"
          >
            <Coins className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Coin Type
          </Label>
          <Select
            value={selectedCoinType}
            onValueChange={onSelectedCoinTypeChange}
          >
            <SelectTrigger className="bg-gradient-to-r from-white to-slate-50 dark:from-slate-700 dark:to-slate-600 border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 h-12 text-lg shadow-lg hover:shadow-xl">
              <SelectValue placeholder="Select coin type (optional)" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 shadow-2xl">
              <SelectItem
                value="penny"
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Penny/Cent
              </SelectItem>
              <SelectItem
                value="nickel"
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Nickel
              </SelectItem>
              <SelectItem
                value="dime"
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Dime
              </SelectItem>
              <SelectItem
                value="quarter"
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Quarter
              </SelectItem>
              <SelectItem
                value="half-dollar"
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Half Dollar
              </SelectItem>
              <SelectItem
                value="dollar"
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Dollar Coin
              </SelectItem>
              <SelectItem
                value="foreign"
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Foreign Coin
              </SelectItem>
              <SelectItem
                value="commemorative"
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Commemorative
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Enhanced Image Upload Grid */}
        <div className="grid grid-cols-2 gap-6">
          <ImageUploadArea
            side="obverse"
            label="Obverse (Front)"
            image={obversePreview}
            handleFileUpload={onImageUpload}
            iconColor="green"
          />
          <ImageUploadArea
            side="reverse"
            label="Reverse (Back)"
            image={reversePreview}
            handleFileUpload={onImageUpload}
            iconColor="purple"
          />
        </div>

        {/* Enhanced Coin Details Section */}
        <div className="space-y-3">
          <Label
            htmlFor="coin-details"
            className="text-slate-700 dark:text-slate-300 font-semibold text-lg flex items-center gap-2"
          >
            <Info className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            Coin Details (Optional)
          </Label>
          <Textarea
            id="coin-details"
            placeholder="Enter any additional information about your coin (year, mint mark, denomination, special features, etc.)"
            className="resize-none bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-600 border-slate-200 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl p-4 shadow-lg hover:shadow-xl focus:shadow-cyan-500/20 min-h-[120px]"
            value={coinDetails}
            onChange={(e) => onCoinDetailsChange(e.target.value)}
          />
        </div>

        {/* Enhanced Analysis Progress */}
        {isAnalyzing && (
          <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-center">
              <span className="text-lg font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Analyzing your coin with AI...
              </span>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium text-center">
              Our advanced AI is examining your coin&apos;s features, condition,
              and authenticity...
            </p>
          </div>
        )}

        {/* Enhanced Grade Button */}
        <Button
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white border-0 font-bold py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] disabled:scale-100 disabled:from-slate-400 disabled:to-slate-500 relative overflow-hidden group"
          size="lg"
          onClick={onAnalyzeCoin}
          disabled={isAnalyzing || (!obverseImage && !reverseImage)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          {isAnalyzing ? (
            <>
              <div className="relative flex items-center justify-center gap-3">
                <Clock className="h-6 w-6 animate-spin" />
                <span>Analyzing with AI...</span>
              </div>
            </>
          ) : (
            <>
              <div className="relative flex items-center justify-center gap-3">
                <Sparkles className="h-6 w-6 animate-pulse" />
                <span>Grade My Coin with Gemini AI</span>
                <Sparkles
                  className="h-6 w-6 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
              </div>
            </>
          )}
        </Button>

        {/* Enhanced Upload Tips */}
        <Alert className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-700 rounded-xl shadow-lg">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-10 animate-pulse"></div>
            <Info className="relative h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <AlertDescription className="text-blue-800 dark:text-blue-200 ml-2">
            <strong className="text-blue-900 dark:text-blue-100">
              Pro Tips:
            </strong>{" "}
            Use good lighting, avoid shadows, and ensure the entire coin is
            visible for best results. High-resolution images yield more accurate
            grades.
          </AlertDescription>
        </Alert>

        {/* Enhanced API Configuration Notice */}
        {!hasApiKey && (
          <Alert className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700 rounded-xl shadow-lg">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-10 animate-pulse"></div>
              <Sparkles className="relative h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <AlertDescription className="text-amber-800 dark:text-amber-200 ml-2">
              <strong className="text-amber-900 dark:text-amber-100">
                Setup Required:
              </strong>{" "}
              Configure your Gemini API key in .env.local for AI grading.
              Without it, demo results will be shown. Get your free API key at{" "}
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline text-amber-700 dark:text-amber-300 font-semibold"
              >
                Google AI Studio
              </a>
              .
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
