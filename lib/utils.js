import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const coinTypes = [
  "American Silver Eagle",
  "Morgan Silver Dollar",
  "Peace Silver Dollar",
  "Walking Liberty Half Dollar",
  "Mercury Dime",
  "Indian Head Penny",
  "Wheat Penny",
  "Buffalo Nickel",
  "Jefferson Nickel",
  "Standing Liberty Quarter",
  "Washington Quarter",
  "Barber Dime",
  "Seated Liberty",
  "Draped Bust",
  "Flowing Hair",
  "Large Cent",
  "Half Cent",
  "Two Cent Piece",
  "Three Cent Silver",
  "Three Cent Nickel",
  "Twenty Cent Piece",
  "Trade Dollar",
  "Eisenhower Dollar",
  "Susan B. Anthony Dollar",
  "Sacagawea Dollar",
  "Presidential Dollar",
  "Kennedy Half Dollar",
  "Franklin Half Dollar",
  "Barber Half Dollar",
  "Roosevelt Dime",
  "Liberty Head Nickel",
  "Shield Nickel",
  "Flying Eagle Cent",
  "Indian Head Cent",
  "Lincoln Cent",
  "Gold Eagle ($10)",
  "Gold Double Eagle ($20)",
  "Gold Half Eagle ($5)",
  "Gold Quarter Eagle ($2.50)",
  "Gold Dollar",
  "Commemorative Gold",
  "Commemorative Silver",
  "Proof Sets",
  "Mint Sets",
  "Ancient Roman",
  "Ancient Greek",
  "Medieval",
  "World Coins",
  "Colonial Coins",
  "Civil War Tokens",
  "Hard Times Tokens",
  "Other/Custom",
];

export const gradingScales = {
  "Poor (P-1)": {
    min: 1,
    max: 1,
    description: "Barely identifiable, heavy wear",
  },
  "Fair (FR-2)": {
    min: 2,
    max: 2,
    description: "Heavily worn, some details visible",
  },
  "About Good (AG-3)": {
    min: 3,
    max: 3,
    description: "Very heavily worn, major details clear",
  },
  "Good (G-4, G-6)": {
    min: 4,
    max: 6,
    description: "Heavily worn, all major details clear",
  },
  "Very Good (VG-8, VG-10)": {
    min: 8,
    max: 10,
    description: "Well worn, most details clear",
  },
  "Fine (F-12, F-15)": {
    min: 12,
    max: 15,
    description: "Moderate wear, good details",
  },
  "Very Fine (VF-20, VF-25, VF-30, VF-35)": {
    min: 20,
    max: 35,
    description: "Light to moderate wear",
  },
  "Extremely Fine (EF-40, EF-45)": {
    min: 40,
    max: 45,
    description: "Slight wear on highest points",
  },
  "About Uncirculated (AU-50, AU-53, AU-55, AU-58)": {
    min: 50,
    max: 58,
    description: "Traces of wear, nearly uncirculated",
  },
  "Mint State (MS-60 to MS-70)": {
    min: 60,
    max: 70,
    description: "No wear, uncirculated condition",
  },
  "Proof (PR-60 to PR-70)": {
    min: 60,
    max: 70,
    description: "Special minting process, mirror-like finish",
  },
};

export const formatCurrency = (amount) => {
  if (typeof amount === "string" && amount.startsWith("$")) {
    return amount;
  }

  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return "$0.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numAmount);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const generateMockGradingResults = (coinType = "", coinDetails = "") => {
  const grades = [
    "MS-70",
    "MS-69",
    "MS-68",
    "MS-67",
    "MS-66",
    "MS-65",
    "MS-64",
    "MS-63",
    "AU-58",
    "AU-55",
    "EF-45",
    "VF-30",
  ];
  const randomGrade = grades[Math.floor(Math.random() * grades.length)];

  const baseValue = Math.random() * 1000 + 50;
  const gradeMultiplier = grades.indexOf(randomGrade) * 0.1 + 1;
  const finalValue = baseValue * gradeMultiplier;

  return {
    overallGrade: randomGrade,
    confidence: Math.floor(Math.random() * 15) + 85,
    marketValue: formatCurrency(finalValue),
    condition: getConditionFromGrade(randomGrade),
    authenticity:
      Math.random() > 0.1
        ? "Verified Authentic"
        : "Requires Further Authentication",
    rarity: getRarityLevel(),
    details: {
      surface: Math.floor(Math.random() * 20) + 80,
      strike: Math.floor(Math.random() * 20) + 80,
      luster: Math.floor(Math.random() * 20) + 80,
      eye_appeal: Math.floor(Math.random() * 20) + 80,
    },
    aiNotes: generateAINotes(randomGrade, coinType),
    historicalInfo: generateHistoricalInfo(coinType),
    marketTrends: generateMarketTrends(randomGrade, finalValue),
  };
};

const getConditionFromGrade = (grade) => {
  if (grade.startsWith("MS-")) {
    const num = parseInt(grade.split("-")[1]);
    if (num >= 68) return "Superb";
    if (num >= 65) return "Excellent";
    if (num >= 63) return "Very Good";
    return "Good";
  }
  if (grade.startsWith("AU-")) return "Nearly Uncirculated";
  if (grade.startsWith("EF-")) return "Extremely Fine";
  if (grade.startsWith("VF-")) return "Very Fine";
  return "Fine";
};

const getRarityLevel = () => {
  const rarities = [
    "Common",
    "Uncommon",
    "Scarce",
    "Rare",
    "Very Rare",
    "Extremely Rare",
  ];
  const weights = [40, 25, 15, 10, 7, 3]; // Percentages
  const random = Math.random() * 100;
  let cumulative = 0;

  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (random <= cumulative) {
      return rarities[i];
    }
  }
  return rarities[0];
};

const generateAINotes = (grade, coinType) => {
  const baseNotes = [
    "This coin shows excellent preservation with minimal wear.",
    "The strike is sharp and the surfaces are well-maintained.",
    "Some minor contact marks are present but do not significantly detract from the overall appeal.",
    "The luster is original and attractive.",
    "No major issues or damage detected.",
  ];

  const gradeSpecificNotes = {
    "MS-70": [
      "Perfect specimen with no imperfections visible.",
      "Exceptional quality for this type.",
    ],
    "MS-69": [
      "Near perfect with only minor imperfections.",
      "Outstanding example of this coin type.",
    ],
    "MS-68": [
      "High-quality specimen with minimal marks.",
      "Well above average for this grade.",
    ],
    "AU-58": [
      "Traces of wear on highest points only.",
      "Retains most of its original mint luster.",
    ],
    "EF-45": [
      "Light wear on high points.",
      "All major details remain sharp and clear.",
    ],
  };

  let notes = baseNotes[Math.floor(Math.random() * baseNotes.length)];

  if (gradeSpecificNotes[grade]) {
    notes +=
      " " +
      gradeSpecificNotes[grade][
        Math.floor(Math.random() * gradeSpecificNotes[grade].length)
      ];
  }

  if (coinType && coinType !== "") {
    notes += ` This ${coinType} represents a fine example of its type.`;
  }

  return notes;
};

const generateHistoricalInfo = (coinType) => {
  const genericInfo = [
    "This coin represents a significant period in numismatic history.",
    "The design elements are well-executed and the coin maintains its original mint characteristics.",
    "This type was minted during an important era in American coinage.",
    "The historical significance of this coin adds to its collectible value.",
  ];

  return genericInfo[Math.floor(Math.random() * genericInfo.length)];
};

const generateMarketTrends = (grade, value) => {
  const trends = [
    "Current market conditions show stable demand for this grade.",
    "Recent sales indicate consistent pricing in the current range.",
    "Market activity for this grade has been steady over the past quarter.",
    "Collector interest remains strong for coins in this condition.",
    "Price trends show moderate appreciation over the past year.",
  ];

  return (
    trends[Math.floor(Math.random() * trends.length)] +
    " Similar examples have sold in the range of " +
    formatCurrency(value * 0.9) +
    " to " +
    formatCurrency(value * 1.1) +
    "."
  );
};

export const validateImageFile = (file) => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!file) {
    return { valid: false, error: "No file selected" };
  }

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Please upload a valid image file (JPEG, PNG, or WebP)",
    };
  }

  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 10MB" };
  }

  return { valid: true };
};

export const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(resolve, "image/jpeg", quality);
    };

    img.src = URL.createObjectURL(file);
  });
};
