import { NextRequest, NextResponse } from "next/server";
import { generateResearchIdeas } from "@/lib/openai";
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
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate ideas. Please try again." },
      { status: 500 }
    );
  }
}
