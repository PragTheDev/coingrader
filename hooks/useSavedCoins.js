"use client";

import { useState, useEffect, useCallback } from "react";

export function useSavedCoins() {
  const [savedCoins, setSavedCoins] = useState([]);
  const [showSavedCoins, setShowSavedCoins] = useState(false);

  // Load saved coins from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("coinGraderSavedCoins");
    if (saved) {
      try {
        setSavedCoins(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading saved coins:", error);
        setSavedCoins([]);
      }
    }
  }, []);

  // Save coins to localStorage whenever savedCoins changes
  useEffect(() => {
    localStorage.setItem("coinGraderSavedCoins", JSON.stringify(savedCoins));
  }, [savedCoins]);

  const saveCoin = useCallback((coinData) => {
    const newSavedCoin = {
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
      ...coinData,
    };

    setSavedCoins((prev) => [newSavedCoin, ...prev]);
    return newSavedCoin;
  }, []);

  const deleteSavedCoin = useCallback((coinId) => {
    setSavedCoins((prev) => prev.filter((coin) => coin.id !== coinId));
  }, []);

  const loadSavedCoin = useCallback((coin) => {
    // This function returns the coin data to be loaded into the main form
    // The actual loading logic will be handled by the parent component
    setShowSavedCoins(false);
    return coin;
  }, []);

  const clearAllSavedCoins = useCallback(() => {
    setSavedCoins([]);
    localStorage.removeItem("coinGraderSavedCoins");
  }, []);

  return {
    savedCoins,
    showSavedCoins,
    setShowSavedCoins,
    saveCoin,
    deleteSavedCoin,
    loadSavedCoin,
    clearAllSavedCoins,
    savedCoinsCount: savedCoins.length,
  };
}
