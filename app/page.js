"use client";

import { useState, useEffect } from "react";

// Import custom hooks
import { useCoinGrading } from "@/hooks/useCoinGrading";
import { useSavedCoins } from "@/hooks/useSavedCoins";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useBackground } from "@/hooks/useBackground";

// Import components
import Navbar from "@/components/navigation/Navbar";
import Header from "@/components/sections/Header";
import UploadSection from "@/components/upload/UploadSection";
import ResultsSection from "@/components/results/ResultsSection";
import SavedCoinsSection from "@/components/saved-coins/SavedCoinsSection";
import FeatureCards from "@/components/sections/FeatureCards";
import HowItWorks from "@/components/sections/HowItWorks";
import NumismaticsGuide from "@/components/sections/NumismaticsGuide";
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
    setGradingResults,
    setObverseImage,
    setReverseImage,
    setObversePreview,
    setReversePreview,
    handleImageUpload,
    clearImage,
    clearAll,
    analyzeCoin,
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

  // Initialize background system
  const { currentBackground } = useBackground();

  // State for API key availability
  const [hasApiKey, setHasApiKey] = useState(false);

  // Check API key on component mount
  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const response = await fetch("/api/grade-coin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ checkApiKey: true }),
        });

        if (response.ok) {
          const data = await response.json();
          setHasApiKey(data.hasApiKey || false);
        }
      } catch (error) {
        console.error("Error checking API key:", error);
        setHasApiKey(false);
      }
    };

    checkApiKey();
  }, []);

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
    // Set the coin type and details
    setSelectedCoinType(coin.selectedCoinType || "");
    setCoinDetails(coin.coinDetails || "");

    // Load the saved grading results directly
    setGradingResults(coin.gradingResults);

    // Load the image previews (these are already base64 data URLs from when they were saved)
    if (coin.obverseImage) {
      // Create a fake file object and set the preview
      const fakeFile = new File([""], "saved-obverse.jpg", {
        type: "image/jpeg",
      });
      setObverseImage(fakeFile);
      setObversePreview(coin.obverseImage);
    }
    if (coin.reverseImage) {
      // Create a fake file object and set the preview
      const fakeFile = new File([""], "saved-reverse.jpg", {
        type: "image/jpeg",
      });
      setReverseImage(fakeFile);
      setReversePreview(coin.reverseImage);
    }

    // Close the saved coins section to show the loaded coin
    setShowSavedCoins(false);

    // Scroll to results section to show the loaded results
    setTimeout(() => {
      const resultsSection = document.querySelector("[data-results-section]");
      if (resultsSection) {
        resultsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
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
              onImageUpload={handleImageUpload}
              onClearImage={clearImage}
              onSelectedCoinTypeChange={setSelectedCoinType}
              onCoinDetailsChange={setCoinDetails}
              onAnalyzeCoin={analyzeCoin}
              hasApiKey={hasApiKey}
            />

            {/* Results Section */}
            {gradingResults && (
              <ResultsSection
                gradingResults={gradingResults}
                saveCoin={handleSaveCoin}
                clearAnalysis={clearAll}
                savedCoins={savedCoins}
                obverseImage={obversePreview}
                reverseImage={reversePreview}
              />
            )}

            {/* Feature Cards */}
            <FeatureCards />

            {/* How It Works */}
            <HowItWorks />

            {/* Numismatics Guide */}
            <NumismaticsGuide />

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
