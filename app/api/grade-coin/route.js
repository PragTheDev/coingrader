import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    // Handle API key check request
    if (body.checkApiKey) {
      if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json(
          { error: "Gemini API key not configured" },
          { status: 500 }
        );
      }
      return NextResponse.json({ hasApiKey: true });
    }

    const { obverseImage, reverseImage, coinDetails, coinType } = body;

    if (!obverseImage && !reverseImage) {
      return NextResponse.json(
        { error: "At least one coin image is required" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare the prompt for coin grading
    let prompt = `You are a professional numismatist and coin grading expert. Please analyze this coin image(s) and provide a detailed grading assessment.

Please provide your analysis in the following JSON format:
{
  "overallGrade": "Grade using standard scale (e.g., MS-65, AU-58, VF-30, etc.)",
  "gradeScore": number from 1-100,
  "confidence": number from 1-100 (how confident you are in this grade),
  "details": {
    "surface": "Condition description (Poor, Fair, Good, Very Good, Fine, Very Fine, Extremely Fine, About Uncirculated, Mint State)",
    "strike": "Strike quality (Weak, Average, Sharp, Full)",
    "luster": "Luster description (None, Dull, Average, Good, Outstanding)",
    "eyeAppeal": "Overall eye appeal (Poor, Below Average, Average, Above Average, Attractive, Exceptional)"
  },
  "marketValue": "Estimated value range (e.g., $10-15, $50-75)",
  "rarity": "Rarity assessment (Common, Scarce, Rare, Very Rare, Extremely Rare)",
  "certificationRecommendation": "Whether certification is recommended",
  "gradingNotes": "Detailed explanation of the grade including any notable features, wear patterns, or defects"
}`;

    if (coinType) {
      prompt += `\n\nCoin type provided: ${coinType}`;
    }

    if (coinDetails) {
      prompt += `\n\nAdditional details provided: ${coinDetails}`;
    }

    prompt += `\n\nPlease be thorough in your analysis, considering factors like:
- Surface preservation and wear patterns
- Strike quality and completeness
- Luster and original mint surface
- Any scratches, dings, or environmental damage
- Eye appeal and overall aesthetic quality
- Centering and planchet quality

Respond only with valid JSON.`;

    const imageParts = [];

    if (obverseImage) {
      // Remove data URL prefix to get base64 data
      const base64Data = obverseImage.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );
      imageParts.push({
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      });
    }

    if (reverseImage) {
      // Remove data URL prefix to get base64 data
      const base64Data = reverseImage.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );
      imageParts.push({
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      });
    }

    // Generate content with images
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    let gradingResult;
    try {
      // Clean the response text to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        gradingResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON found in response");
      }
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      console.error("Raw response:", text);

      // Fallback response if parsing fails
      gradingResult = {
        overallGrade: "Unable to determine",
        gradeScore: 0,
        confidence: 0,
        details: {
          surface: "Analysis incomplete",
          strike: "Analysis incomplete",
          luster: "Analysis incomplete",
          eyeAppeal: "Analysis incomplete",
        },
        marketValue: "Unable to determine",
        rarity: "Unknown",
        certificationRecommendation: "Professional evaluation recommended",
        gradingNotes:
          "AI analysis encountered an error. Please try again or consult a professional numismatist.",
      };
    }

    return NextResponse.json(gradingResult);
  } catch (error) {
    console.error("Error in coin grading API:", error);

    // Check if it's an API key issue
    if (error.message && error.message.includes("API_KEY")) {
      return NextResponse.json(
        { error: "Invalid Gemini API key. Please check your configuration." },
        { status: 401 }
      );
    }

    // Check if it's a quota issue
    if (error.message && error.message.includes("quota")) {
      return NextResponse.json(
        { error: "API quota exceeded. Please try again later." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: `Failed to grade coin: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
