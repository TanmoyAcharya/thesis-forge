import { GoogleGenerativeAI } from "@google/generative-ai";
import { GeneratePayload, GenerateResponse } from "@/types";
import { buildSystemPrompt, buildUserPrompt } from "./prompts";

function getGeminiClient() {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_AI_API_KEY environment variable is not set. Please add it in Vercel Settings > Environment Variables.");
  }
  return new GoogleGenerativeAI(apiKey);
}

export async function generateResearchIdeas(
  payload: GeneratePayload
): Promise<GenerateResponse> {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.85,
      maxOutputTokens: 8192,
    },
  });

  const systemPrompt = buildSystemPrompt(payload);
  const userPrompt = buildUserPrompt(payload);
  const fullPrompt = `${systemPrompt}\n\n${userPrompt}\n\nIMPORTANT: Your response must be ONLY the raw JSON object. Do not wrap it in markdown code fences. Do not add any text before or after. Start directly with { and end with }.`;

  const result = await model.generateContent(fullPrompt);
  const response = result.response;
  const text = response.text();

  if (!text || text.trim() === "") {
    throw new Error("Empty response received from Gemini API. Please try again.");
  }

  // Clean up any markdown code fences if present
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
  cleaned = cleaned.replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

  // Find JSON object boundaries
  const startIdx = cleaned.indexOf("{");
  const endIdx = cleaned.lastIndexOf("}");
  if (startIdx !== -1 && endIdx !== -1) {
    cleaned = cleaned.substring(startIdx, endIdx + 1);
  }

  try {
    return JSON.parse(cleaned) as GenerateResponse;
  } catch {
    console.error("JSON parse error. Raw response (first 500 chars):", text.substring(0, 500));
    throw new Error(`Failed to parse AI response. Raw: ${text.substring(0, 300)}`);
  }
}