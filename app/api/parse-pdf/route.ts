// app/api/parse-pdf/route.ts
// Extracts plain text from an uploaded PDF using pdf-parse.
// Install: npm install pdf-parse
// (no @types needed — we inline the minimal type above)

import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse") as (buf: Buffer) => Promise<{ text: string; numpages: number }>;

// Max allowed file size: 5 MB
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        // ── Validation ──────────────────────────────────────────────────────────
        if (!file || !(file instanceof File)) {
            return NextResponse.json(
                { error: "No file provided." },
                { status: 400 }
            );
        }

        if (file.type !== "application/pdf") {
            return NextResponse.json(
                { error: "Only PDF files are accepted." },
                { status: 400 }
            );
        }

        if (file.size > MAX_BYTES) {
            return NextResponse.json(
                { error: "File exceeds the 5 MB limit." },
                { status: 400 }
            );
        }

        // ── Parse ───────────────────────────────────────────────────────────────
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const parsed = await pdfParse(buffer);
        const text = parsed.text.trim();

        if (!text || text.length < 50) {
            return NextResponse.json(
                { error: "Could not extract readable text from this PDF. It may be image-based or scanned — please use a text-based PDF." },
                { status: 422 }
            );
        }

        return NextResponse.json({
            text,
            pageCount: parsed.numpages,
            wordCount: text.split(/\s+/).filter(Boolean).length,
        });
    } catch (err) {
        console.error("[parse-pdf]", err);
        return NextResponse.json(
            { error: "Failed to parse the PDF. Please try a different file." },
            { status: 500 }
        );
    }
}