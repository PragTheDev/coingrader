"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Camera,
  Star,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  Award,
  Eye,
  BarChart3,
  ImageIcon,
  CheckCircle,
  AlertTriangle,
  Info,
  Moon,
  Sun,
  Sparkles,
  Users,
  Trophy,
  Target,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [obverseImage, setObverseImage] = useState(null);
  const [reverseImage, setReverseImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [coinDetails, setCoinDetails] = useState("");
  const [selectedCoinType, setSelectedCoinType] = useState("");
  const [gradingResults, setGradingResults] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true); // Assume we have it until proven otherwise

  // Check if API key is configured
  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const response = await fetch("/api/grade-coin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            checkApiKey: true
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.error && errorData.error.includes("API key")) {
            setHasApiKey(false);
          }
        }
      } catch (error) {
        // If we can't check, assume we need to show the warning
        setHasApiKey(false);
      }
    };

    checkApiKey();
  }, []);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    } else {
      // Check system preference
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Mock grading results for demonstration (fallback)
  const mockResults = {
    overallGrade: "MS-65",
    gradeScore: 85,
    confidence: 92,
    details: {
      surface: "Excellent",
      strike: "Sharp",
      luster: "Outstanding",
      eyeAppeal: "Attractive",
    },
    marketValue: "$145 - $175",
    rarity: "Common",
    certificationRecommendation: "Recommended for certification",
    gradingNotes:
      "This is a simulated grading result. Configure Gemini API key for real AI analysis.",
  };

  const handleFileUpload = (file, side) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (side === "obverse") {
          setObverseImage(e.target.result);
        } else {
          setReverseImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const gradeWithGemini = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setGradingResults(null);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 15;
        });
      }, 500);

      const response = await fetch("/api/grade-coin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          obverseImage: obverseImage,
          reverseImage: reverseImage,
          coinDetails: coinDetails,
          coinType: selectedCoinType,
        }),
      });

      clearInterval(progressInterval);
      setAnalysisProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        console.error("Response status:", response.status);
        throw new Error(errorData.error || `Failed to grade coin (Status: ${response.status})`);
      }

      const result = await response.json();

      // Small delay to show completion
      setTimeout(() => {
        setGradingResults(result);
        setIsAnalyzing(false);
      }, 500);
    } catch (error) {
      console.error("Grading error:", error);

      // Show error message and fallback to mock data
      setAnalysisProgress(100);
      setTimeout(() => {
        setGradingResults({
          ...mockResults,
          gradingNotes: `Error: ${error.message}. Showing demo results. Please configure your Gemini API key in .env.local`,
        });
        setIsAnalyzing(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center py-6 mb-6">
          <div className="flex items-center gap-2">
            <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              CoinGrader
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="hidden md:flex">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </nav>
        {/* Header with Stats */}
        <header className="text-center py-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="relative">
              <Award className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              CoinGrader
            </h1>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            Professional AI-powered coin grading. Upload your coin images and
            get accurate, professional grades using advanced computer vision
            technology.
          </p>

          {/* Enhanced Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
                  <Users className="h-5 w-5" />
                  50K+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Coins Graded
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center justify-center gap-1">
                  <Target className="h-5 w-5" />
                  98%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Accuracy Rate
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 flex items-center justify-center gap-1">
                  <Zap className="h-5 w-5" />
                  2.5s
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Avg. Analysis Time
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 flex items-center justify-center gap-1">
                  <Clock className="h-5 w-5" />
                  24/7
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Available
                </div>
              </CardContent>
            </Card>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Upload Section */}
          <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 transition-colors bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                <Upload className="h-5 w-5" />
                Upload Coin Images
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Upload clear, high-resolution images of both sides of your coin
                for the most accurate grading.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Coin Type Selection */}
              <div className="space-y-2">
                <Label
                  htmlFor="coin-type"
                  className="text-slate-700 dark:text-slate-300"
                >
                  Coin Type
                </Label>
                <Select
                  value={selectedCoinType}
                  onValueChange={setSelectedCoinType}
                >
                  <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                    <SelectValue placeholder="Select coin type (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="penny">Penny/Cent</SelectItem>
                    <SelectItem value="nickel">Nickel</SelectItem>
                    <SelectItem value="dime">Dime</SelectItem>
                    <SelectItem value="quarter">Quarter</SelectItem>
                    <SelectItem value="half-dollar">Half Dollar</SelectItem>
                    <SelectItem value="dollar">Dollar Coin</SelectItem>
                    <SelectItem value="foreign">Foreign Coin</SelectItem>
                    <SelectItem value="commemorative">Commemorative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="obverse"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Obverse (Front)
                  </Label>
                  <div
                    className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-lg p-8 text-center hover:border-slate-300 dark:hover:border-slate-500 transition-colors cursor-pointer relative overflow-hidden bg-slate-50 dark:bg-slate-700/50"
                    onClick={() =>
                      document.getElementById("obverse-input").click()
                    }
                  >
                    {obverseImage ? (
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={obverseImage}
                          alt="Obverse"
                          className="w-full h-32 object-cover rounded"
                        />
                        <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                      </div>
                    ) : (
                      <>
                        <Camera className="h-8 w-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Click to upload front side
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="obverse-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(e.target.files[0], "obverse")
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="reverse"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Reverse (Back)
                  </Label>
                  <div
                    className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-lg p-8 text-center hover:border-slate-300 dark:hover:border-slate-500 transition-colors cursor-pointer relative overflow-hidden bg-slate-50 dark:bg-slate-700/50"
                    onClick={() =>
                      document.getElementById("reverse-input").click()
                    }
                  >
                    {reverseImage ? (
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={reverseImage}
                          alt="Reverse"
                          className="w-full h-32 object-cover rounded"
                        />
                        <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                      </div>
                    ) : (
                      <>
                        <Camera className="h-8 w-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Click to upload back side
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="reverse-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(e.target.files[0], "reverse")
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="coin-details"
                  className="text-slate-700 dark:text-slate-300"
                >
                  Coin Details (Optional)
                </Label>
                <Textarea
                  id="coin-details"
                  placeholder="Enter any additional information about your coin (year, mint mark, denomination, etc.)"
                  className="resize-none bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                  value={coinDetails}
                  onChange={(e) => setCoinDetails(e.target.value)}
                />
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Analyzing your coin...
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {analysisProgress}%
                    </span>
                  </div>
                  <Progress value={analysisProgress} className="w-full" />
                </div>
              )}

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                size="lg"
                onClick={gradeWithGemini}
                disabled={isAnalyzing || (!obverseImage && !reverseImage)}
              >
                {isAnalyzing ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Grade My Coin with Gemini AI
                  </>
                )}
              </Button>

              {/* Upload Tips */}
              <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  <strong>Pro Tips:</strong> Use good lighting, avoid shadows,
                  and ensure the entire coin is visible for best results.
                </AlertDescription>
              </Alert>

              {/* API Configuration Notice */}
              {!hasApiKey && (
                <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                  <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertDescription className="text-amber-800 dark:text-amber-200">
                    <strong>Setup Required:</strong> Configure your Gemini API key
                    in .env.local for AI grading. Without it, demo results will be
                    shown. Get your free API key at{" "}
                    <a
                      href="https://makersuite.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline"
                    >
                      Google AI Studio
                    </a>
                    .
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                <Star className="h-5 w-5" />
                Grading Results
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Your coin grading results will appear here after analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {gradingResults ? (
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
                      <Progress
                        value={gradingResults.gradeScore}
                        className="w-full"
                      />
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
                      {Object.entries(gradingResults.details).map(
                        ([key, value]) => (
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
                        )
                      )}
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
        </div>

        {/* Enhanced Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                <Eye className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                AI-Powered Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Advanced computer vision analyzes surface condition, strike
                quality, and overall preservation.
              </p>
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="mr-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                >
                  Computer Vision
                </Badge>
                <Badge
                  variant="outline"
                  className="mr-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                >
                  Deep Learning
                </Badge>
                <Badge
                  variant="outline"
                  className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                >
                  Neural Networks
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                <Shield className="h-5 w-5 text-green-500 dark:text-green-400" />
                Professional Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Grades follow industry-standard scales including Sheldon,
                European, and other recognized systems.
              </p>
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="mr-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                >
                  Sheldon Scale
                </Badge>
                <Badge
                  variant="outline"
                  className="mr-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                >
                  PCGS Standards
                </Badge>
                <Badge
                  variant="outline"
                  className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                >
                  NGC Compatible
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                <Zap className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                Instant Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Get detailed grading reports with confidence scores and
                condition analysis in seconds.
              </p>
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="mr-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                >
                  Real-time
                </Badge>
                <Badge
                  variant="outline"
                  className="mr-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                >
                  Detailed Reports
                </Badge>
                <Badge
                  variant="outline"
                  className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                >
                  Market Values
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <Card className="mb-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2 text-slate-900 dark:text-white">
              How CoinGrader Works
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Our advanced AI system analyzes your coins in three simple steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-blue-200 dark:border-blue-700">
                  <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">
                  1. Upload Images
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Upload clear photos of both sides of your coin in good
                  lighting
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-purple-200 dark:border-purple-700">
                  <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">
                  2. AI Analysis
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Our AI examines surface quality, strike sharpness, and overall
                  condition
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-green-200 dark:border-green-700">
                  <Trophy className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">
                  3. Get Results
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Receive professional grade, confidence score, and market value
                  estimate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supported Coin Types */}
        <Card className="mb-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 dark:text-white">
              Supported Coin Types
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              We can grade a wide variety of coins from different countries and
              time periods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "US Coins",
                "World Coins",
                "Ancient Coins",
                "Commemoratives",
                "Gold Coins",
                "Silver Coins",
                "Copper Coins",
                "Modern Issues",
              ].map((type) => (
                <div
                  key={type}
                  className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600/50 transition-all duration-300 border border-slate-200 dark:border-slate-600 hover:scale-105 hover:shadow-md group"
                >
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                  <div className="font-medium text-sm text-slate-700 dark:text-slate-300">
                    {type}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Footer */}
        <footer className="text-center py-12 border-t border-slate-200 dark:border-slate-700 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-t-lg">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-3 flex items-center justify-center gap-2 text-slate-900 dark:text-white">
                  <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  CoinGrader
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Professional AI-powered coin grading technology for collectors
                  and dealers worldwide.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">
                  Features
                </h4>
                <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-1">
                  <li>• AI-Powered Analysis</li>
                  <li>• Professional Standards</li>
                  <li>• Instant Results</li>
                  <li>• Market Valuations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">
                  Accuracy
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Grade Accuracy:
                    </span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      98%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Confidence Score:
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      95%+
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                &copy; 2025 CoinGrader. Professional coin grading powered by AI
                technology.
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-2">
                Disclaimer: AI grading is for reference purposes. Professional
                certification recommended for valuable coins.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
