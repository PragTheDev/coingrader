# 🪙 CoinGrader - AI-Powered Coin Grading

CoinGrader is a professional coin grading website that uses Google's Gemini AI to analyze and grade coin images. Upload photos of your coins and get instant, professional-quality grading results with detailed analysis.

## 📱 Demo

### � Live Website

**[Try CoinGrader Live →](https://your-vercel-deployment-url.vercel.app)**

### 🎥 Demo Video

![CoinGrader Demo](./docs/media/demo.gif)

### 📸 Screenshots

<div align="center">

**Main Interface**
![Main Interface](./docs/media/screenshot-main.png)

**AI Grading Results**
![Grading Results](./docs/media/screenshot-results.png)

</div>

---

## ✨ Features

- **🤖 AI-Powered Analysis**: Advanced computer vision using Google Gemini AI
- **🎯 Professional Standards**: Grades following industry-standard scales (Sheldon, PCGS, NGC)
- **⚡ Instant Results**: Get detailed grading reports in seconds
- **🌙 Dark Mode**: Beautiful dark/light theme toggle
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **📊 Detailed Analysis**: Comprehensive breakdown of surface, strike, luster, and eye appeal
- **💰 Market Valuations**: Estimated value ranges and rarity assessments
- **🔒 Secure**: No coin images are stored - analysis happens in real-time

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Google AI Studio account for Gemini API key

### Installation

(RECOMMENDED use the Website URL, but if you wish to run locally proceed!)

1. **Clone the repository**

   ```bash
   git clone https://github.com/PragTheDev/coingrader.git
   cd coingrader
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your Gemini API key:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Get your Gemini API key**

   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your `.env.local` file

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Start grading your coins!

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **AI**: Google Gemini API (@google/generative-ai)
- **Icons**: Lucide React
- **Language**: JavaScript (ES6+)

## 📸 How to Use

1. **Upload Images**: Click to upload clear photos of both sides of your coin
2. **Optional Details**: Add coin type and additional details for better analysis
3. **AI Analysis**: Click "Grade My Coin with Gemini AI" to start analysis
4. **View Results**: Get comprehensive grading results in multiple tabs:
   - **Overview**: Grade, confidence score, and certification recommendation
   - **Details**: Surface condition, strike quality, luster, and eye appeal
   - **Market Info**: Estimated value and rarity assessment
   - **AI Notes**: Detailed analysis notes from Gemini AI

## 🎨 UI Components

Built with [shadcn/ui](https://ui.shadcn.com/) components:

- Cards, Buttons, Inputs, Labels
- Tabs, Progress bars, Badges
- Alerts, Select dropdowns
- Dark mode support

## 📝 Grading Standards

CoinGrader follows professional numismatic grading standards:

- **Sheldon Scale** (MS-70 to PO-01)
- **PCGS Standards**
- **NGC Compatible** grading
- **European Standards** for world coins

## 🔧 API Endpoints

### POST `/api/grade-coin`

Analyze coin images using Gemini AI.

**Request Body:**

```json
{
  "obverseImage": "data:image/jpeg;base64,...",
  "reverseImage": "data:image/jpeg;base64,...",
  "coinDetails": "Optional details",
  "coinType": "quarter"
}
```

**Response:**

```json
{
  "overallGrade": "MS-65",
  "gradeScore": 85,
  "confidence": 92,
  "details": {
    "surface": "Excellent",
    "strike": "Sharp",
    "luster": "Outstanding",
    "eyeAppeal": "Attractive"
  },
  "marketValue": "$145 - $175",
  "rarity": "Common",
  "certificationRecommendation": "Recommended for certification",
  "gradingNotes": "Detailed AI analysis..."
}
```

## 🌟 Supported Coin Types

- US Coins (pennies, nickels, dimes, quarters, etc.)
- World Coins (international currencies)
- Ancient Coins (historical pieces)
- Commemoratives (special edition coins)
- Gold, Silver, and Copper coins
- Modern Issues

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Disclaimer

AI grading is for reference purposes only. Professional certification by recognized grading services (PCGS, NGC, ANACS) is recommended for valuable coins. Market values are estimates and may vary based on market conditions.

## 🆘 Support

If you encounter any issues:

1. Check that your Gemini API key is correctly configured
2. Ensure images are in supported formats (JPEG, PNG)
3. Verify your internet connection for API calls

---

**Built with ❤️ by PragTheDev using Next.js and Google Gemini AI**
