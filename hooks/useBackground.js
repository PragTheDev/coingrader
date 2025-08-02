"use client";

import { useState, useEffect } from "react";

export function useBackground() {
  const [currentBackground, setCurrentBackground] = useState("default");

  useEffect(() => {
    // Simple initialization
    const savedBackground =
      localStorage.getItem("coingrader-background") || "default";
    const savedTheme = localStorage.getItem("coingrader-theme") || "light";

    setCurrentBackground(savedBackground);

    // Apply theme
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Simple event listeners
    const handleBackgroundChange = (event) => {
      setCurrentBackground(event.detail.background);
    };

    const handleThemeChange = (event) => {
      if (event.detail.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    window.addEventListener("backgroundChanged", handleBackgroundChange);
    window.addEventListener("themeChanged", handleThemeChange);

    return () => {
      window.removeEventListener("backgroundChanged", handleBackgroundChange);
      window.removeEventListener("themeChanged", handleThemeChange);
    };
  }, []);

  return {
    currentBackground,
  };
}
