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
        const result = e.target.result;
        if (side === "obverse") {
          setObverseImage(file);
          setObversePreview(result);
        } else {
          setReverseImage(file);
          setReversePreview(result);
        }
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

    // Simulate API call with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock grading results
    const mockResults = {
      overallGrade: "MS-65",
      confidence: Math.floor(Math.random() * 15) + 85,
      marketValue: `$${(Math.random() * 500 + 50).toFixed(2)}`,
      condition: "Excellent",
      authenticity: "Verified Authentic",
      rarity: "Common",
      details: {
        surface: Math.floor(Math.random() * 20) + 80,
        strike: Math.floor(Math.random() * 20) + 80,
        luster: Math.floor(Math.random() * 20) + 80,
        eye_appeal: Math.floor(Math.random() * 20) + 80,
      },
      aiNotes:
        "This coin shows excellent preservation with minimal wear. The strike is sharp and the surfaces are well-maintained. Some minor contact marks are present but do not significantly detract from the overall appeal.",
      historicalInfo:
        "This coin represents a significant period in numismatic history. The design elements are well-executed and the coin maintains its original mint characteristics.",
      marketTrends:
        "Current market conditions show stable demand for this grade. Recent sales indicate consistent pricing in the current range.",
    };

    setGradingResults(mockResults);
    setIsAnalyzing(false);
  }, [obverseImage, reverseImage]);

  return {
    // Images
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

    // Actions
    handleImageUpload,
    clearImage,
    clearAll,
    analyzeCoin,
  };
}
