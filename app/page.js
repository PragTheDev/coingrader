"use client";

import { useState } from "react";

// Import custom hooks
import { useCoinGrading } from "@/hooks/useCoinGrading";
import { useSavedCoins } from "@/hooks/useSavedCoins";
import { useDarkMode } from "@/hooks/useDarkMode";

// Import components
import Navbar from "@/components/navigation/Navbar";
import Header from "@/components/sections/Header";
import UploadSection from "@/components/upload/UploadSection";
import ResultsSection from "@/components/results/ResultsSection";
import SavedCoinsSection from "@/components/saved-coins/SavedCoinsSection";
import FeatureCards from "@/components/sections/FeatureCards";
import HowItWorks from "@/components/sections/HowItWorks";
import SupportedCoinTypes from "@/components/sections/SupportedCoinTypes";
import Footer from "@/components/sections/Footer";

// Import utilities
import { generateMockGradingResults } from "@/lib/utils";

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
      setProgress((prev) => {
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
    await new Promise((resolve) => setTimeout(resolve, 3000));

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
    console.log("Coin saved:", savedCoin);
  };

  // Load saved coin data
  const handleLoadSavedCoin = (coin) => {
    loadSavedCoin(coin);

    // Manually set the loaded data (in a real app, this would be handled by the hook)
    setSelectedCoinType(coin.selectedCoinType || "");
    setCoinDetails(coin.coinDetails || "");

    // Set images
    if (coin.obverseImage) {
      const file = new File([""], "obverse.jpg", { type: "image/jpeg" });
      handleImageUpload(file, "obverse");
    }
    if (coin.reverseImage) {
      const file = new File([""], "reverse.jpg", { type: "image/jpeg" });
      handleImageUpload(file, "reverse");
    }

    // Set results
    window.gradingResults = coin.gradingResults;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Navbar */}
      <Navbar
        savedCoinsCount={savedCoinsCount}
        setShowSavedCoins={setShowSavedCoins}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
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
          <div className="space-y-16">
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
          </div>
        )}
      </main>
    </div>
  );
}
