"use client";

import { useState, useEffect } from "react";

export function useBackground() {
  const [currentBackground, setCurrentBackground] = useState("default");

  useEffect(() => {
    // Load saved background from localStorage
    const savedBackground = localStorage.getItem("coingrader-background") || "default";
    setCurrentBackground(savedBackground);
    
    // Apply initial background
    applyBackground(savedBackground);

    // Listen for background changes from settings page
    const handleBackgroundChange = (event) => {
      const newBackground = event.detail.background;
      setCurrentBackground(newBackground);
      applyBackground(newBackground);
    };

    window.addEventListener('backgroundChanged', handleBackgroundChange);
    
    return () => {
      window.removeEventListener('backgroundChanged', handleBackgroundChange);
    };
  }, []);

  const applyBackground = (backgroundId) => {
    // Remove all existing background classes
    document.body.className = document.body.className.replace(/bg-\w+/g, '');
    // Add new background class
    document.body.classList.add(`bg-${backgroundId}`);
  };

  const setBackground = (backgroundId) => {
    setCurrentBackground(backgroundId);
    localStorage.setItem("coingrader-background", backgroundId);
    applyBackground(backgroundId);
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('backgroundChanged', { 
      detail: { background: backgroundId } 
    }));
  };

  return {
    currentBackground,
    setBackground,
  };
}
