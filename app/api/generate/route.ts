import { NextRequest, NextResponse } from "next/server";
import { generateResearchIdeas } from "@/lib/gemini";
import { GeneratePayload } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: GeneratePayload = await req.json();
    if (!body.field || !body.subdomain || !body.interests) {
      return NextResponse.json(
        { error: "field, subdomain, and interests are required" },
        { status: 400 }
      );
    }
    const result = await generateResearchIdeas(body);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Generate error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}