import { NextRequest, NextResponse } from "next/server";
import PDFParser from "pdf2json";

const MAX_BYTES = 5 * 1024 * 1024;

interface PDFTextItem {
    R?: Array<{
        T?: string;
    }>;
}

interface PDFPage {
    Texts?: PDFTextItem[];
}

interface PDFData {
    Pages?: PDFPage[];
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: "No file provided." }, { status: 400 });
        }
        if (file.type !== "application/pdf") {
            return NextResponse.json({ error: "Only PDF files are accepted." }, { status: 400 });
        }
        if (file.size > MAX_BYTES) {
            return NextResponse.json({ error: "File exceeds the 5 MB limit." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const pdfParser = new PDFParser();

        // Parse the PDF
        const data = await new Promise<PDFData>((resolve, reject) => {
            pdfParser.on('pdfParser_dataReady', (pdfData: PDFData) => {
                resolve(pdfData);
            });

            pdfParser.on('pdfParser_dataError', (errMsg: Error | { parserError: Error }) => {
                // Handle both error types
                if (errMsg instanceof Error) {
                    reject(errMsg);
                } else {
                    reject(errMsg.parserError || new Error('PDF parsing failed'));
                }
            });

            pdfParser.parseBuffer(buffer);
        });

        // Extract text safely
        const pages = data.Pages || [];
        const pageCount = pages.length;

        let fullText = '';
        for (const page of pages) {
            const texts = page.Texts || [];
            for (const textItem of texts) {
                const rawText = textItem.R?.[0]?.T || '';
                try {
                    fullText += decodeURIComponent(rawText) + ' ';
                } catch {
                    fullText += rawText + ' ';
                }
            }
            fullText += '\n';
        }

        const text = fullText.trim();
        const wordCount = text ? text.split(/\s+/).filter(Boolean).length : 0;

        if (!text || text.length < 50) {
            return NextResponse.json({
                error: "No text could be extracted from this PDF. It may be a scanned image or encrypted file.",
                text: "",
                pageCount,
                wordCount: 0,
            }, { status: 422 });
        }

        return NextResponse.json({ text, pageCount, wordCount });

    } catch (err) {
        console.error("[parse-pdf] ERROR:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to parse PDF";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}