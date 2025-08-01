import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    // Check content length before processing
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // 10MB limit
      return NextResponse.json(
        { error: "Request payload too large. Please use smaller images." },
        { status: 413 }
      );
    }

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

Respond ONLY with valid JSON. Do not use markdown formatting or code blocks. Return pure JSON only.`;

    const imageParts = [];

    if (obverseImage) {
      // Remove data URL prefix if present
      const base64Data = obverseImage.replace(/^data:image\/[a-z]+;base64,/, "");
      imageParts.push({
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      });
    }

    if (reverseImage) {
      // Remove data URL prefix if present
      const base64Data = reverseImage.replace(/^data:image\/[a-z]+;base64,/, "");
      imageParts.push({
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      });
    }

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    console.log("Raw AI response:", text);

    try {
      // Clean the response text to handle markdown code blocks
      let cleanedText = text.trim();
      
      // Remove markdown code block markers if present
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      // Try to parse the cleaned JSON response
      const jsonResponse = JSON.parse(cleanedText);
      console.log("Parsed AI response:", jsonResponse);
      return NextResponse.json(jsonResponse);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      console.log("Raw response that failed to parse:", text);

      // Return a fallback response if JSON parsing fails
      return NextResponse.json({
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
        rarity: "Analysis incomplete",
        certificationRecommendation: "Unable to assess",
        gradingNotes: `AI response parsing failed. Raw response: ${text.substring(0, 500)}...`,
      });
    }
  } catch (error) {
    console.error("API Error:", error);

    // Check if it's a payload too large error
    if (error.message && error.message.includes("request entity too large")) {
      return NextResponse.json(
        { error: "Image files are too large. Please use smaller images." },
        { status: 413 }
      );
    }

    // Check if it's a JSON parsing error due to size
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Request payload too large or malformed. Please use smaller images." },
        { status: 413 }
      );
    }

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
