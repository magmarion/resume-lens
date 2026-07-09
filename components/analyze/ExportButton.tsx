"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/types/analysis";

interface ExportButtonProps {
    result: AnalysisResult;
    fileName: string;
}

type ExportStatus = "idle" | "exporting" | "error";

export default function ExportButton({ result, fileName }: ExportButtonProps) {
    const [status, setStatus] = useState<ExportStatus>("idle");

    async function handleExport() {
        setStatus("exporting");
        try {
            const res = await fetch("/api/export-pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ result, fileName }),
            });

            if (!res.ok) {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
                return;
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const safeName = fileName.replace(/\.pdf$/i, "").replace(/[^a-z0-9-_]+/gi, "-");

            const a = document.createElement("a");
            a.href = url;
            a.download = `${safeName}-analysis.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setStatus("idle");
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    }

    return (
        <button
            onClick={handleExport}
            disabled={status === "exporting"}
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-white/8 bg-white/4 px-5 py-2.5 text-[13px] font-medium text-mist-600 transition-colors hover:bg-white/8 hover:text-mist-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {status === "exporting" ? (
                <>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" className="animate-spin-slow shrink-0">
                        <circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                        <path d="M6.5 1.5A5 5 0 0 1 11.5 6.5" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Generating PDF…
                </>
            ) : status === "error" ? (
                <span className="text-danger-400">Export failed — try again</span>
            ) : (
                <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M7 1.5V9M7 9L4.5 6.5M7 9L9.5 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 10.5V11.5C2 12.05 2.45 12.5 3 12.5H11C11.55 12.5 12 12.05 12 11.5V10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Export as PDF
                </>
            )}
        </button>
    );
}