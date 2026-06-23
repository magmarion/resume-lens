"use client";

import { useState, useRef, useCallback, DragEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import UploadProgress, { type UploadStage } from "./UploadProgress";

const ACCEPTED_TYPE = "application/pdf";
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB


function validateFile(file: File): string | null {
    if (file.type !== ACCEPTED_TYPE) return "Only PDF files are supported.";
    if (file.size > MAX_BYTES) return "File must be under 5 MB.";
    return null;
}

function UploadIcon({ dragging }: { dragging: boolean }) {
    return (
        <div
            style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: dragging
                    ? "rgba(99,73,228,0.20)"
                    : "rgba(255,255,255,0.04)",
                border: `1px solid ${dragging ? "rgba(167,139,250,0.40)" : "rgba(255,255,255,0.08)"}`,
                transition: "all 0.25s ease",
                marginBottom: 20,
            }}
        >
            <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
                style={{
                    transition: "transform 0.25s ease",
                    transform: dragging ? "translateY(-3px)" : "translateY(0)",
                }}
            >
                <path
                    d="M14 18V10M14 10L10.5 13.5M14 10L17.5 13.5"
                    stroke={dragging ? "#a78bfa" : "#52506a"}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M6 20C4.343 20 3 18.657 3 17C3 15.477 4.117 14.213 5.584 14.026C5.535 13.693 5.5 13.351 5.5 13C5.5 9.686 8.186 7 11.5 7C13.431 7 15.148 7.908 16.268 9.322C16.671 9.112 17.123 9 17.6 9C19.478 9 21 10.522 21 12.4C21 12.598 20.983 12.792 20.951 12.981C22.66 13.301 24 14.8 24 16.6C24 18.578 22.378 20 20.5 20H6Z"
                    stroke={dragging ? "#a78bfa" : "#52506a"}
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}

function TipRow({ icon, text }: { icon: string; text: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12 }}>{icon}</span>
            <span style={{ fontSize: 12, color: "#52506a" }}>{text}</span>
        </div>
    );
}

export default function UploadBox() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const [dragging, setDragging] = useState(false);
    const [stage, setStage] = useState<UploadStage>("idle");
    const [fileName, setFileName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // ── Process a file through all stages ──────────────────────────────────────

    const processFile = useCallback(async (file: File) => {
        setFileName(file.name);
        setErrorMessage("");

        // Stage 1: validate
        setStage("validating");
        await new Promise(r => setTimeout(r, 600));

        const validationError = validateFile(file);
        if (validationError) {
            setErrorMessage(validationError);
            setStage("error");
            return;
        }

        // Stage 2: upload to API
        setStage("uploading");
        const formData = new FormData();
        formData.append("file", file);

        let parsed: { text: string; pageCount: number; wordCount: number };
        try {
            const res = await fetch("/api/parse-pdf", {
                method: "POST",
                body: formData,
            });

            const data = await res.json() as { text?: string; pageCount?: number; wordCount?: number; error?: string };

            if (!res.ok || !data.text) {
                setErrorMessage(data.error ?? "Unexpected error. Please try again.");
                setStage("error");
                return;
            }

            parsed = { text: data.text, pageCount: data.pageCount ?? 1, wordCount: data.wordCount ?? 0 };
        } catch {
            setErrorMessage("Network error — please check your connection and try again.");
            setStage("error");
            return;
        }

        // Stage 3: text extracted
        setStage("parsing");
        await new Promise(r => setTimeout(r, 700));

        // Store extracted text for the analyze page to pick up
        sessionStorage.setItem(
            "resumeData",
            JSON.stringify({
                text: parsed.text,
                pageCount: parsed.pageCount,
                wordCount: parsed.wordCount,
                fileName: file.name,
                uploadedAt: new Date().toISOString(),
            })
        );

        // Stage 4: redirect
        setStage("redirecting");
        await new Promise(r => setTimeout(r, 500));
        router.push("/analyze");
    }, [router]);

    const onDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setDragging(true); };
    const onDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setDragging(false); };

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) void processFile(file);
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) void processFile(file);
        // Reset input so the same file can be re-selected after an error
        e.target.value = "";
    };

    const resetToIdle = () => {
        setStage("idle");
        setFileName("");
        setErrorMessage("");
    };

    const isProcessing = stage !== "idle" && stage !== "error";

    return (
        <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => {
                if (stage === "idle" || stage === "error") inputRef.current?.click();
            }}
            style={{
                width: "100%",
                maxWidth: 520,
                minHeight: 340,
                borderRadius: 20,
                border: `2px dashed ${dragging
                    ? "rgba(167,139,250,0.6)"
                    : stage === "error"
                        ? "rgba(251,113,133,0.35)"
                        : isProcessing
                            ? "rgba(99,73,228,0.35)"
                            : "rgba(255,255,255,0.09)"
                    }`,
                background: dragging
                    ? "rgba(99,73,228,0.07)"
                    : stage === "error"
                        ? "rgba(251,113,133,0.03)"
                        : isProcessing
                            ? "rgba(99,73,228,0.04)"
                            : "rgba(255,255,255,0.025)",
                backdropFilter: "blur(16px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 32px",
                gap: 0,
                cursor: isProcessing ? "default" : "pointer",
                transition: "border-color 0.25s ease, background 0.25s ease",
                boxShadow: dragging
                    ? "0 0 0 4px rgba(99,73,228,0.10), 0 20px 60px rgba(0,0,0,0.5)"
                    : "0 20px 60px rgba(0,0,0,0.4)",
            }}
        >
            <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={onFileChange}
                aria-label="Upload PDF resume"
            />

            {/* ── Idle state ── */}
            {stage === "idle" && (
                <>
                    <UploadIcon dragging={dragging} />

                    <div style={{ textAlign: "center", marginBottom: 24 }}>
                        <p style={{ fontSize: 17, fontWeight: 600, color: "#e8e5f5", letterSpacing: "-0.02em", marginBottom: 6 }}>
                            {dragging ? "Drop it here" : "Drop your resume here"}
                        </p>
                        <p style={{ fontSize: 13, color: "#52506a", lineHeight: 1.6 }}>
                            or{" "}
                            <span style={{ color: "#a78bfa", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>
                                click to browse
                            </span>{" "}
                            your files
                        </p>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                            padding: "14px 18px",
                            borderRadius: 12,
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        <TipRow icon="📄" text="PDF format only" />
                        <TipRow icon="📏" text="Maximum file size: 5 MB" />
                        <TipRow icon="🔒" text="Your file is never stored" />
                    </div>
                </>
            )}

            {/* ── Processing / error state ── */}
            {stage !== "idle" && (
                <div style={{ width: "100%" }}>
                    <UploadProgress
                        stage={stage}
                        fileName={fileName}
                        errorMessage={errorMessage}
                    />

                    {/* Try again button on error */}
                    {stage === "error" && (
                        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                            <button
                                onClick={e => { e.stopPropagation(); resetToIdle(); }}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 6,
                                    padding: "9px 20px",
                                    borderRadius: 9,
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    color: "#c4c2d4",
                                    fontSize: 13,
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    transition: "background 0.2s ease, border-color 0.2s ease",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                            >
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                                    <path d="M2 6.5A4.5 4.5 0 0 1 10.5 3.5M11 6.5A4.5 4.5 0 0 1 2.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                    <path d="M10 1.5L10.5 3.5L8.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Try again
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}