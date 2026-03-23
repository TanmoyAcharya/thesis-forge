import { GoogleGenerativeAI } from "@google/generative-ai";
import { GeneratePayload, GenerateResponse } from "@/types";
import { buildSystemPrompt, buildUserPrompt } from "./prompts";

function getGeminiClient() {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_AI_API_KEY environment variable is not set");
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
      responseMimeType: "application/json",
    },
  });

  const systemPrompt = buildSystemPrompt(payload);
  const userPrompt = buildUserPrompt(payload);
  const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

  const result = await model.generateContent(fullPrompt);
  const response = result.response;
  const text = response.text();

  if (!text) throw new Error("Empty response received from Gemini API");

  // Clean up any markdown code fences if present
  const cleaned = text.replace(/^```json\n?|\n?```$/g, "").trim();
  return JSON.parse(cleaned) as GenerateResponse;
}
