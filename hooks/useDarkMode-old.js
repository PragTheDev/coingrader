"use client";

import { useState, useEffect, useCallback } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Update body class for dark mode
  const updateBodyClass = useCallback((isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedMode = localStorage.getItem("coinGraderDarkMode");
    if (savedMode !== null) {
      const isDark = JSON.parse(savedMode);
      setIsDarkMode(isDark);
      updateBodyClass(isDark);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
      updateBodyClass(prefersDark);
    }
  }, [updateBodyClass]);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    updateBodyClass(newMode);
    localStorage.setItem("coinGraderDarkMode", JSON.stringify(newMode));
  }, [isDarkMode, updateBodyClass]);

  // Set specific mode
  const setDarkMode = useCallback(
    (mode) => {
      setIsDarkMode(mode);
      updateBodyClass(mode);
      localStorage.setItem("coinGraderDarkMode", JSON.stringify(mode));
    },
    [updateBodyClass]
  );

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
  };
}
