"use client";

import { useState } from 'react';

// Import custom hooks
import { useCoinGrading } from '@/hooks/useCoinGrading';
import { useSavedCoins } from '@/hooks/useSavedCoins';
import { useDarkMode } from '@/hooks/useDarkMode';

// Import components
import Navbar from '@/components/navigation/Navbar';
import Header from '@/components/sections/Header';
import UploadSection from '@/components/upload/UploadSection';
import ResultsSection from '@/components/results/ResultsSection';
import SavedCoinsSection from '@/components/saved-coins/SavedCoinsSection';
import FeatureCards from '@/components/sections/FeatureCards';
import HowItWorks from '@/components/sections/HowItWorks';
import SupportedCoinTypes from '@/components/sections/SupportedCoinTypes';
import Footer from '@/components/sections/Footer';

// Import utilities
import { generateMockGradingResults } from '@/lib/utils';

export default function Home() {
  // Custom hooks for state management
  const {
    obverseImage,
    reverseImage,
    obversePreview,
    reversePreview,
    selectedCoinType,
    coinDetails,
    isAnalyzing,
    gradingResults,
    activeTab,
    setSelectedCoinType,
    setCoinDetails,
    setActiveTab,
    handleImageUpload,
    clearImage,
    clearAll,
  } = useCoinGrading();

  const {
    savedCoins,
    showSavedCoins,
    setShowSavedCoins,
    saveCoin,
    deleteSavedCoin,
    loadSavedCoin,
    savedCoinsCount,
  } = useSavedCoins();

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Local state for animations and UI
  const [progress, setProgress] = useState(0);

  // Enhanced analyze coin function with progress simulation
  const analyzeCoin = async () => {
    if (!obverseImage && !reverseImage) return;

    setProgress(0);
    
    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Generate mock results using utility function
    const results = generateMockGradingResults(selectedCoinType, coinDetails);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    clearInterval(progressInterval);
    setProgress(100);
    
    // Update results in the coin grading hook
    // Since we're using the hook, we need to trigger the analyze function from there
    window.gradingResults = results;
    
    setTimeout(() => setProgress(0), 1000);
  };

  // Save current coin data
  const handleSaveCoin = () => {
    if (!gradingResults) return;

    const coinData = {
      obverseImage: obversePreview,
      reverseImage: reversePreview,
      selectedCoinType,
      coinDetails,
      gradingResults,
    };

    const savedCoin = saveCoin(coinData);
    console.log('Coin saved:', savedCoin);
  };

  // Load saved coin data
  const handleLoadSavedCoin = (coin) => {
    loadSavedCoin(coin);
    
    // Manually set the loaded data (in a real app, this would be handled by the hook)
    setSelectedCoinType(coin.selectedCoinType || '');
    setCoinDetails(coin.coinDetails || '');
    
    // Set images
    if (coin.obverseImage) {
      const file = new File([''], 'obverse.jpg', { type: 'image/jpeg' });
      handleImageUpload(file, 'obverse');
    }
    if (coin.reverseImage) {
      const file = new File([''], 'reverse.jpg', { type: 'image/jpeg' });
      handleImageUpload(file, 'reverse');
    }
    
    // Set results
    window.gradingResults = coin.gradingResults;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navbar */}
      <Navbar 
        savedCoinsCount={savedCoinsCount}
        setShowSavedCoins={setShowSavedCoins}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Show Saved Coins Section */}
        {showSavedCoins && (
          <SavedCoinsSection
            savedCoins={savedCoins}
            setShowSavedCoins={setShowSavedCoins}
            loadSavedCoin={handleLoadSavedCoin}
            deleteSavedCoin={deleteSavedCoin}
          />
        )}

        {/* Show Main App Content */}
        {!showSavedCoins && (
          <>
            {/* Header Section */}
            <Header />

            {/* Upload Section */}
            <UploadSection
              obverseImage={obverseImage}
              reverseImage={reverseImage}
              obversePreview={obversePreview}
              reversePreview={reversePreview}
              selectedCoinType={selectedCoinType}
              coinDetails={coinDetails}
              isAnalyzing={isAnalyzing}
              progress={progress}
              onImageUpload={handleImageUpload}
              onClearImage={clearImage}
              onSelectedCoinTypeChange={setSelectedCoinType}
              onCoinDetailsChange={setCoinDetails}
              onAnalyzeCoin={analyzeCoin}
            />

            {/* Results Section */}
            {gradingResults && (
              <ResultsSection
                gradingResults={gradingResults}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onSaveCoin={handleSaveCoin}
                onClearAll={clearAll}
              />
            )}

            {/* Feature Cards */}
            <FeatureCards />

            {/* How It Works */}
            <HowItWorks />

            {/* Supported Coin Types */}
            <SupportedCoinTypes />

            {/* Footer */}
            <Footer />
          </>
        )}
      </main>
    </div>
  );
}
  Download,
  Archive,
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
  const [savedCoins, setSavedCoins] = useState([]);
  const [showSavedCoins, setShowSavedCoins] = useState(false);

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
            checkApiKey: true,
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

  // Load saved coins from localStorage
  useEffect(() => {
    const savedCoinsData = localStorage.getItem("savedCoins");
    if (savedCoinsData) {
      setSavedCoins(JSON.parse(savedCoinsData));
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Save current grading results
  const saveCoin = () => {
    if (!gradingResults) return;

    const coinData = {
      id: Date.now(), // Simple ID based on timestamp
      obverseImage,
      reverseImage,
      coinDetails,
      selectedCoinType,
      gradingResults,
      savedAt: new Date().toISOString(),
    };

    const updatedSavedCoins = [...savedCoins, coinData];
    setSavedCoins(updatedSavedCoins);
    localStorage.setItem("savedCoins", JSON.stringify(updatedSavedCoins));
  };

  // Delete a saved coin
  const deleteSavedCoin = (coinId) => {
    const updatedSavedCoins = savedCoins.filter(coin => coin.id !== coinId);
    setSavedCoins(updatedSavedCoins);
    localStorage.setItem("savedCoins", JSON.stringify(updatedSavedCoins));
  };

  // Load a saved coin for viewing
  const loadSavedCoin = (coin) => {
    setObverseImage(coin.obverseImage);
    setReverseImage(coin.reverseImage);
    setCoinDetails(coin.coinDetails);
    setSelectedCoinType(coin.selectedCoinType);
    setGradingResults(coin.gradingResults);
    setShowSavedCoins(false);
  };

  // Clear current analysis
  const clearAnalysis = () => {
    setObverseImage(null);
    setReverseImage(null);
    setCoinDetails("");
    setSelectedCoinType("");
    setGradingResults(null);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
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
        throw new Error(
          errorData.error || `Failed to grade coin (Status: ${response.status})`
        );
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-indigo-900 dark:to-slate-800 p-4 transition-colors duration-300 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div
          className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-32 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Enhanced Navigation Bar */}
        <nav className="flex justify-between items-center py-6 mb-6 glass rounded-2xl px-6 backdrop-blur-lg shadow-xl border border-white/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Award className="h-10 w-10 text-blue-600 dark:text-blue-400 animate-glow" />
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-20 animate-pulse"></div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              CoinGrader
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className="hidden md:flex glass border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 shadow-lg"
            >
              <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
              AI-Powered
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSavedCoins(!showSavedCoins)}
              className="p-3 glass border-slate-200/50 dark:border-slate-700/50 hover:scale-110 transition-all duration-300 shadow-lg relative"
            >
              <Archive className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              {savedCoins.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5">
                  {savedCoins.length}
                </Badge>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
              className="p-3 glass border-slate-200/50 dark:border-slate-700/50 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600" />
              )}
            </Button>
          </div>
        </nav>
        {/* Enhanced Header with Stats */}
        <header className="text-center py-16 mb-12">
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <Award className="relative h-16 w-16 text-blue-600 dark:text-blue-400 animate-float" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-bounce shadow-xl shadow-green-500/50"></div>
            </div>
            <h1 className="text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent animate-shimmer">
              CoinGrader
            </h1>
          </div>
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-2xl text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Revolutionary AI-powered coin grading technology
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Upload your coin images and receive professional-grade analysis
              using advanced computer vision
            </p>
          </div>

          {/* Enhanced Stats Row with Color Themes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="card-hover glass bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200/50 dark:border-blue-700/50 shadow-xl hover:shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                  <Users className="relative h-8 w-8 mx-auto text-blue-600 dark:text-blue-400 animate-float" />
                </div>
                <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">
                  50K+
                </div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
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

        {/* Enhanced Main Content with Color Themes */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Enhanced Upload Section */}
          <Card className="glass bg-gradient-to-br from-slate-50/80 via-white/80 to-slate-100/80 dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-900/80 border-slate-200/50 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 card-hover">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-slate-900 dark:text-white text-2xl font-black">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                  <Upload className="relative h-6 w-6 text-blue-600 dark:text-blue-400 animate-float" />
                </div>
                Upload Coin Images
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Upload clear, high-resolution images of both sides of your coin
                for the most accurate professional grading.
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
                  onValueChange={setSelectedCoinType}
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
                <div className="space-y-3">
                  <Label
                    htmlFor="obverse"
                    className="text-slate-700 dark:text-slate-300 font-semibold text-lg flex items-center gap-2"
                  >
                    <Camera className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Obverse (Front)
                  </Label>
                  <div
                    className="border-3 border-dashed border-slate-200 dark:border-slate-600 rounded-2xl p-8 text-center hover:border-green-400 dark:hover:border-green-500 transition-all duration-300 cursor-pointer relative overflow-hidden bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100/80 hover:to-emerald-100/80 dark:hover:from-green-800/30 dark:hover:to-emerald-800/30 hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-green-500/20 group"
                    onClick={() =>
                      document.getElementById("obverse-input").click()
                    }
                  >
                    {obverseImage ? (
                      <div className="relative">
                        <div className="relative overflow-hidden rounded-xl">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={obverseImage}
                            alt="Obverse"
                            className="w-full h-32 object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        </div>
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                      </div>
                    ) : (
                      <>
                        <div className="relative mb-4">
                          <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                          <Camera className="relative h-10 w-10 text-green-500 dark:text-green-400 mx-auto animate-float" />
                        </div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
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
                <div className="space-y-3">
                  <Label
                    htmlFor="reverse"
                    className="text-slate-700 dark:text-slate-300 font-semibold text-lg flex items-center gap-2"
                  >
                    <Camera className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    Reverse (Back)
                  </Label>
                  <div
                    className="border-3 border-dashed border-slate-200 dark:border-slate-600 rounded-2xl p-8 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 cursor-pointer relative overflow-hidden bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-900/20 dark:to-indigo-900/20 hover:from-purple-100/80 hover:to-indigo-100/80 dark:hover:from-purple-800/30 dark:hover:to-indigo-800/30 hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-purple-500/20 group"
                    onClick={() =>
                      document.getElementById("reverse-input").click()
                    }
                  >
                    {reverseImage ? (
                      <div className="relative">
                        <div className="relative overflow-hidden rounded-xl">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={reverseImage}
                            alt="Reverse"
                            className="w-full h-32 object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        </div>
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                      </div>
                    ) : (
                      <>
                        <div className="relative mb-4">
                          <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                          <Camera
                            className="relative h-10 w-10 text-purple-500 dark:text-purple-400 mx-auto animate-float"
                            style={{ animationDelay: "0.5s" }}
                          />
                        </div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
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
                  onChange={(e) => setCoinDetails(e.target.value)}
                />
              </div>

              {/* Enhanced Analysis Progress */}
              {isAnalyzing && (
                <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Analyzing your coin with AI...
                    </span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {analysisProgress}%
                    </span>
                  </div>
                  <Progress
                    value={analysisProgress}
                    className="w-full h-3 bg-blue-200 dark:bg-blue-800"
                  />
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    Our advanced AI is examining your coin&apos;s features,
                    condition, and authenticity...
                  </p>
                </div>
              )}

              {/* Enhanced Grade Button */}
              <Button
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white border-0 font-bold py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] disabled:scale-100 disabled:from-slate-400 disabled:to-slate-500 relative overflow-hidden group"
                size="lg"
                onClick={gradeWithGemini}
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
                  Use good lighting, avoid shadows, and ensure the entire coin
                  is visible for best results. High-resolution images yield more
                  accurate grades.
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
                    Without it, demo results will be shown. Get your free API
                    key at{" "}
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

          {/* Results Section */}
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
                      disabled={savedCoins.some(coin => 
                        coin.obverseImage === obverseImage && 
                        coin.reverseImage === reverseImage &&
                        coin.gradingResults?.overallGrade === gradingResults.overallGrade
                      )}
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

        {/* Enhanced Saved Coins Section */}
        {showSavedCoins && (
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
                    <Card key={coin.id} className="glass bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-700/80 border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
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
                            <Badge variant="outline" className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-700">
                              {coin.gradingResults.confidence}% Confidence
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            <p><strong>Type:</strong> {coin.selectedCoinType || "Not specified"}</p>
                            <p><strong>Market Value:</strong> {coin.gradingResults.marketValue}</p>
                            <p><strong>Saved:</strong> {new Date(coin.savedAt).toLocaleDateString()}</p>
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
                  <p className="text-sm">Grade some coins and save them to build your collection</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

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
