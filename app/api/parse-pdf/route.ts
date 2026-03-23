import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Dynamically import pdf-parse to work with serverComponentsExternalPackages
    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(buffer);

    const MAX_CHARS = 8000;
    const truncated = data.text.length > MAX_CHARS;
    const text = truncated ? data.text.slice(0, MAX_CHARS) : data.text;

    return NextResponse.json({
      text,
      pages: data.numpages,
      truncated,
    });
  } catch (error) {
    console.error("PDF parse error:", error);
    return NextResponse.json(
      { error: "Failed to parse PDF. Please try again." },
      { status: 500 }
    );
  }
}
