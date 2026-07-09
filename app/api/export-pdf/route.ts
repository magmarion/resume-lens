import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { AnalysisDocument } from "@/lib/pdf/AnalysisDocument";
import type { AnalysisResult } from "@/types/analysis";

// @react-pdf/renderer needs the Node runtime, not Edge.
export const runtime = "nodejs";

interface ExportRequestBody {
    result?: AnalysisResult;
    fileName?: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as ExportRequestBody;

        if (!body.result || typeof body.result.score !== "number") {
            return NextResponse.json({ error: "No analysis result provided." }, { status: 400 });
        }

        const fileName = body.fileName || "resume";
        const generatedAt = new Date();

        const buffer = await renderToBuffer(
            React.createElement(AnalysisDocument, {
                result: body.result,
                fileName,
                generatedAt,
            }) as Parameters<typeof renderToBuffer>[0]
        );
        
        const safeName = fileName
            .replace(/\.pdf$/i, "")
            .replace(/[^a-z0-9-_]+/gi, "-")
            .slice(0, 60);

        return new NextResponse(new Uint8Array(buffer), {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${safeName}-analysis.pdf"`,
            },
        });
    } catch (err) {
        console.error("[export-pdf]", err);
        return NextResponse.json(
            { error: "Failed to generate PDF. Please try again." },
            { status: 500 }
        );
    }
}