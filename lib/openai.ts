import OpenAI from "openai";
import { GeneratePayload, GenerateResponse } from "@/types";
import { buildSystemPrompt, buildUserPrompt } from "./prompts";

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function generateResearchIdeas(
  payload: GeneratePayload
): Promise<GenerateResponse> {
  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.85,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: buildSystemPrompt(payload) },
      { role: "user", content: buildUserPrompt(payload) },
    ],
  });
  const content = response.choices[0].message.content;
  if (!content) throw new Error("No content returned from OpenAI");
  return JSON.parse(content) as GenerateResponse;
}
