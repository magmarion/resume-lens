// app/api/parse-pdf/route.ts
// npm install pdfjs-dist
import { NextRequest, NextResponse } from "next/server";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

interface TextItem {
    str: string;
}

interface TextMarkedContent {
    type: string;
}

type TextContentItem = TextItem | TextMarkedContent;

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        // ── Validation ─────────────────────────────────────────────────────────
        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: "No file provided." }, { status: 400 });
        }
        if (file.type !== "application/pdf") {
            return NextResponse.json({ error: "Only PDF files are accepted." }, { status: 400 });
        }
        if (file.size > MAX_BYTES) {
            return NextResponse.json({ error: "File exceeds the 5 MB limit." }, { status: 400 });
        }

        // ── Parse with pdfjs-dist ───────────────────────────────────────────────
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.cjs") as {
            GlobalWorkerOptions: { workerSrc: string };
            getDocument: (options: {
                data: Uint8Array;
                useWorkerFetch: boolean;
                isEvalSupported: boolean;
                useSystemFonts: boolean;
            }) => {
                promise: Promise<{
                    numPages: number;
                    getPage: (n: number) => Promise<{
                        getTextContent: () => Promise<{ items: TextContentItem[] }>;
                    }>;
                }>;
            };
        };

        // Disable the web worker — not available in Node API routes
        pdfjsLib.GlobalWorkerOptions.workerSrc = "";

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({
            data: new Uint8Array(arrayBuffer),
            useWorkerFetch: false,
            isEvalSupported: false,
            useSystemFonts: true,
        });

        const pdf = await loadingTask.promise;
        const pageCount = pdf.numPages;

        // Extract text page by page
        const pageTexts: string[] = [];
        for (let i = 1; i <= pageCount; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items
                .map((item) => ("str" in item ? item.str : ""))
                .join(" ");
            pageTexts.push(pageText);
        }

        const text = pageTexts.join("\n").trim();

        if (!text || text.length < 50) {
            return NextResponse.json(
                {
                    error:
                        "Could not extract readable text from this PDF. It may be image-based or scanned — please use a text-based PDF.",
                },
                { status: 422 }
            );
        }

        const wordCount = text.split(/\s+/).filter(Boolean).length;

        return NextResponse.json({ text, pageCount, wordCount });

    } catch (err) {
        console.error("[parse-pdf]", err);
        return NextResponse.json(
            { error: "Failed to parse the PDF. Please try a different file." },
            { status: 500 }
        );
    }
}