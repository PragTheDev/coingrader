"use client";

import { useState, useCallback } from "react";

export function useCoinGrading() {
  const [obverseImage, setObverseImage] = useState(null);
  const [reverseImage, setReverseImage] = useState(null);
  const [obversePreview, setObversePreview] = useState(null);
  const [reversePreview, setReversePreview] = useState(null);
  const [selectedCoinType, setSelectedCoinType] = useState("");
  const [coinDetails, setCoinDetails] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [gradingResults, setGradingResults] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const handleImageUpload = useCallback((file, side) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Create canvas to resize and compress the image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Calculate new dimensions (max 1024px on longest side)
          const maxSize = 1024;
          let { width, height } = img;

          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }

          // Set canvas dimensions and draw resized image
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to compressed base64 (JPEG with 0.8 quality)
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8);

          if (side === "obverse") {
            setObverseImage(file);
            setObversePreview(compressedDataUrl);
          } else {
            setReverseImage(file);
            setReversePreview(compressedDataUrl);
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const clearImage = useCallback((side) => {
    if (side === "obverse") {
      setObverseImage(null);
      setObversePreview(null);
    } else {
      setReverseImage(null);
      setReversePreview(null);
    }
  }, []);

  const clearAll = useCallback(() => {
    setObverseImage(null);
    setReverseImage(null);
    setObversePreview(null);
    setReversePreview(null);
    setSelectedCoinType("");
    setCoinDetails("");
    setGradingResults(null);
    setActiveTab("overview");
  }, []);

  const analyzeCoin = useCallback(async () => {
    if (!obverseImage && !reverseImage) return;

    setIsAnalyzing(true);

    try {
      // Call the actual AI API
      console.log("Calling AI API with data:", {
        hasObverse: !!obversePreview,
        hasReverse: !!reversePreview,
        coinType: selectedCoinType,
        coinDetails: coinDetails,
      });

      const response = await fetch("/api/grade-coin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          obverseImage: obversePreview,
          reverseImage: reversePreview,
          coinType: selectedCoinType,
          coinDetails: coinDetails,
        }),
      });

      if (!response.ok) {
        if (response.status === 413) {
          throw new Error(
            "Image files are too large. Please use smaller images (under 5MB each)."
          );
        }
        throw new Error(`API error: ${response.status}`);
      }

      const aiResults = await response.json();
      console.log("AI API Response:", aiResults);

      // Convert AI results to match our expected format
      const gradingResults = {
        overallGrade: aiResults.overallGrade || "Unable to determine",
        confidence: aiResults.confidence || 0,
        marketValue: aiResults.marketValue || "Unable to determine",
        condition: aiResults.details?.surface || "Unknown",
        authenticity: "AI Analysis Complete",
        rarity: aiResults.rarity || "Unknown",
        details: {
          surface: aiResults.details?.surface || 0,
          strike: aiResults.details?.strike || 0,
          luster: aiResults.details?.luster || 0,
          eye_appeal: aiResults.details?.eyeAppeal || 0,
        },
        gradingNotes:
          aiResults.gradingNotes || "AI analysis completed successfully.",
        historicalInfo: `Coin Type: ${selectedCoinType || "Not specified"}. ${
          coinDetails || ""
        }`,
        marketTrends: `Market Value: ${
          aiResults.marketValue || "To be determined"
        }. Rarity: ${aiResults.rarity || "Unknown"}.`,
      };

      console.log("Converted grading results:", gradingResults);
      setGradingResults(gradingResults);

      // Scroll to results section after a brief delay
      setTimeout(() => {
        const resultsSection = document.querySelector("[data-results-section]");
        if (resultsSection) {
          resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } catch (error) {
      console.error("Error analyzing coin:", error);

      // Fallback to mock results if API fails
      const mockResults = {
        overallGrade: "API Error - Demo Mode",
        confidence: 0,
        marketValue: "API Unavailable",
        condition: "Demo Mode",
        authenticity: "API Error",
        rarity: "Unknown",
        details: {
          surface: 0,
          strike: 0,
          luster: 0,
          eye_appeal: 0,
        },
        gradingNotes: `API Error: ${error.message}. Please check your Gemini API key configuration.`,
        historicalInfo:
          "API connection failed. Please verify your API key in .env.local",
        marketTrends: "API unavailable for market analysis.",
      };

      setGradingResults(mockResults);
    }

    setIsAnalyzing(false);
  }, [
    obverseImage,
    reverseImage,
    obversePreview,
    reversePreview,
    selectedCoinType,
    coinDetails,
  ]);

  return {
    obverseImage,
    reverseImage,
    obversePreview,
    reversePreview,

    // Form data
    selectedCoinType,
    coinDetails,

    // Analysis state
    isAnalyzing,
    gradingResults,
    activeTab,

    // Setters
    setSelectedCoinType,
    setCoinDetails,
    setActiveTab,
    setGradingResults,
    setObverseImage,
    setReverseImage,
    setObversePreview,
    setReversePreview,

    // Actions
    handleImageUpload,
    clearImage,
    clearAll,
    analyzeCoin,
  };
}
