"use client";

import { useState, useRef, useCallback, DragEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import UploadProgress, { type UploadStage } from "./UploadProgress";

const ACCEPTED_TYPE = "application/pdf";
const MAX_BYTES = 5 * 1024 * 1024;

function validateFile(file: File): string | null {
    if (file.type !== ACCEPTED_TYPE) return "Only PDF files are supported.";
    if (file.size > MAX_BYTES) return "File must be under 5 MB.";
    return null;
}

function UploadIcon({ dragging }: { dragging: boolean }) {
    return (
        <div
            className={`w-16 h-16 rounded-[18px] flex items-center justify-center mb-5 transition-all duration-250 border ${dragging
                ? "bg-violet-600/20 border-violet-400/40"
                : "bg-white/4 border-white/8"
                }`}
        >
            <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
                className={`transition-transform duration-250 ${dragging ? "translate-y-0.75" : "translate-y-0"
                    }`}
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
        <div className="flex items-center gap-1.5">
            <span className="text-[12px]">{icon}</span>
            <span className="text-[12px] text-mist-800">{text}</span>
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

    const processFile = useCallback(async (file: File) => {
        setFileName(file.name);
        setErrorMessage("");

        setStage("validating");
        await new Promise(r => setTimeout(r, 600));

        const validationError = validateFile(file);
        if (validationError) {
            setErrorMessage(validationError);
            setStage("error");
            return;
        }

        setStage("uploading");
        const formData = new FormData();
        formData.append("file", file);

        let parsed: { text: string; pageCount: number; wordCount: number };
        try {
            const res = await fetch("/api/parse-pdf", {
                method: "POST",
                body: formData,
            });

            const data = await res.json() as {
                text?: string;
                pageCount?: number;
                wordCount?: number;
                error?: string;
            };

            if (!res.ok || !data.text) {
                setErrorMessage(data.error ?? "Unexpected error. Please try again.");
                setStage("error");
                return;
            }

            parsed = {
                text: data.text,
                pageCount: data.pageCount ?? 1,
                wordCount: data.wordCount ?? 0,
            };
        } catch {
            setErrorMessage("Network error — please check your connection and try again.");
            setStage("error");
            return;
        }

        setStage("parsing");
        await new Promise(r => setTimeout(r, 700));

        // Store the extracted text + metadata for the results page
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

        // Also store the raw file as a base64 data URL so /results
        // can render the actual PDF visually
        const reader = new FileReader();
        reader.onload = () => {
            sessionStorage.setItem("resumePdfDataUrl", reader.result as string);
        };
        reader.readAsDataURL(file);

        setStage("redirecting");
        await new Promise(r => setTimeout(r, 600));

        router.push("/results");
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
        e.target.value = "";
    };

    const resetToIdle = () => {
        setStage("idle");
        setFileName("");
        setErrorMessage("");
    };

    const isProcessing = stage !== "idle" && stage !== "error";

    // Determine border color based on state
    const getBorderColor = () => {
        if (dragging) return "border-violet-400/60";
        if (stage === "error") return "border-rose-400/35";
        if (isProcessing) return "border-violet-600/35";
        return "border-white/9";
    };

    // Determine background color based on state
    const getBackgroundColor = () => {
        if (dragging) return "bg-violet-600/7";
        if (stage === "error") return "bg-rose-400/3";
        if (isProcessing) return "bg-violet-600/4";
        return "bg-white/3";
    };

    // Determine shadow based on state
    const getShadow = () => {
        if (dragging) {
            return "shadow-[0_0_0_4px_rgba(99,73,228,0.10),0_20px_60px_rgba(0,0,0,0.5)]";
        }
        return "shadow-[0_20px_60px_rgba(0,0,0,0.4)]";
    };

    return (
        <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => {
                if (stage === "idle" || stage === "error") inputRef.current?.click();
            }}
            className={`w-full max-w-130 min-h-85 rounded-[20px] border-2 border-dashed ${getBorderColor()} ${getBackgroundColor()} backdrop-blur-bg flex flex-col items-center justify-center px-8 py-10 transition-all duration-250 ${getShadow()} ${isProcessing ? "cursor-default" : "cursor-pointer"
                }`}
        >
            <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={onFileChange}
                aria-label="Upload PDF resume"
            />

            {/* ── Idle state ── */}
            {stage === "idle" && (
                <>
                    <UploadIcon dragging={dragging} />

                    <div className="text-center mb-6">
                        <p className="text-[17px] font-semibold text-mist-300 tracking-[-0.02em] mb-1.5">
                            {dragging ? "Drop it here" : "Drop your resume here"}
                        </p>
                        <p className="text-[13px] text-mist-800 leading-[1.6]">
                            or{" "}
                            <span className="text-brand-400 font-medium underline underline-offset-[3px]">
                                click to browse
                            </span>{" "}
                            your files
                        </p>
                    </div>

                    <div className="flex flex-col gap-1.5 p-[14px_18px] rounded-xl bg-white/3 border border-white/6">
                        <TipRow icon="📄" text="PDF format only" />
                        <TipRow icon="📏" text="Maximum file size: 5 MB" />
                        <TipRow icon="🔒" text="Your file is never stored" />
                    </div>
                </>
            )}

            {/* ── Processing / error state ── */}
            {stage !== "idle" && (
                <div className="w-full">
                    <UploadProgress
                        stage={stage}
                        fileName={fileName}
                        errorMessage={errorMessage}
                    />

                    {/* Try again button on error */}
                    {stage === "error" && (
                        <div className="flex justify-center mt-5">
                            <button
                                onClick={e => { e.stopPropagation(); resetToIdle(); }}
                                className="inline-flex items-center gap-1.5 px-5 py-2.25 rounded-[9px] bg-white/6 border border-white/12 text-mist-400 text-[13px] font-medium cursor-pointer transition-colors duration-200 hover:bg-white/10"
                            >
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                                    <path
                                        d="M2 6.5A4.5 4.5 0 0 1 10.5 3.5M11 6.5A4.5 4.5 0 0 1 2.5 9.5"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M10 1.5L10.5 3.5L8.5 4"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
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