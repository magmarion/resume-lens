"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HeroBackground } from "@/components/home/HeroBackground";
import ScoreGauge from "@/components/analyze/ScoreGauge";
import StrengthsWeaknesses from "@/components/analyze/StrengthsWeaknesses";
import MissingSkills from "@/components/analyze/MissingSkills";
import SuggestionCard from "@/components/analyze/SuggestionCard";
import AnalysisSkeleton from "@/components/analyze/AnalysisSkeleton";
import type { AnalysisResult } from "@/types/analysis";

interface ResumeData {
    text: string;
    pageCount: number;
    wordCount: number;
    fileName: string;
    uploadedAt: string;
}

function readResumeData(): ResumeData | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = sessionStorage.getItem("resumeData");
        return raw ? (JSON.parse(raw) as ResumeData) : null;
    } catch {
        return null;
    }
}

type Status = "loading" | "success" | "error";

export default function AnalyzePage() {
    const router = useRouter();
    const [resumeData] = useState<ResumeData | null>(readResumeData);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [status, setStatus] = useState<Status>("loading");
    const [errorMsg, setErrorMsg] = useState("");

    // Bumping this re-runs the effect below without duplicating fetch logic —
    // used by the "Try again" button on error.
    const [retryKey, setRetryKey] = useState(0);

    useEffect(() => {
        if (!resumeData) {
            router.replace("/upload");
            return;
        }

        let cancelled = false;

        async function runAnalysis() {
            setStatus("loading");
            setErrorMsg("");

            try {
                const res = await fetch("/api/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: resumeData!.text, fileName: resumeData!.fileName }),
                });
                const data = (await res.json()) as AnalysisResult & { error?: string };

                if (cancelled) return;

                if (!res.ok || data.error) {
                    setErrorMsg(data.error ?? "Something went wrong. Please try again.");
                    setStatus("error");
                    return;
                }

                setResult(data);
                setStatus("success");
            } catch {
                if (!cancelled) {
                    setErrorMsg("Network error — please check your connection and try again.");
                    setStatus("error");
                }
            }
        }

        void runAnalysis();

        return () => {
            cancelled = true;
        };
    }, [resumeData, router, retryKey]);

    return (
        <>
            <HeroBackground />
            <div aria-hidden="true" className="bg-vignette fixed inset-0 z-1 pointer-events-none" />

            <main className="relative z-10 flex min-h-screen flex-col items-center px-4 pb-20 pt-24 sm:px-6 sm:pt-22.5">
                {/* Back */}
                <div className="anim-1 absolute left-5 top-16 sm:left-8 sm:top-18">
                    <Link href="/results" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-mist-800 transition-colors hover:text-brand-400">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                    </Link>
                </div>

                {/* Header */}
                <div className="anim-1 badge-pill mb-6 border-brand-600/22 bg-brand-600/10">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-400">Step 3 of 3</span>
                    <span className="h-2.5 w-px bg-brand-400/30" />
                    <span className="text-[11px] font-medium text-mist-600">AI Analysis</span>
                </div>

                <h1 className="anim-2 text-gradient-brand mb-2 text-center text-[clamp(22px,5vw,42px)] font-extrabold tracking-[-0.04em]">
                    {status === "loading" ? "Analysing your resume…" : status === "error" ? "Analysis failed" : "Your resume analysis"}
                </h1>

                {resumeData && (
                    <p className="anim-2 mb-9 text-center text-[13px] text-mist-800 sm:mb-10 sm:text-sm">
                        {status === "loading"
                            ? `Reading ${resumeData.fileName} · ${resumeData.wordCount.toLocaleString()} words`
                            : resumeData.fileName}
                    </p>
                )}

                {/* Loading */}
                {status === "loading" && (
                    <div className="anim-3 w-full max-w-215">
                        <div className="mx-auto mb-9 w-fit rounded-full border border-brand-600/18 bg-brand-600/8 px-5 py-3 sm:mb-9">
                            <div className="flex items-center gap-2.5">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 animate-spin-slow">
                                    <circle cx="7" cy="7" r="5.5" stroke="rgba(167,139,250,0.25)" strokeWidth="1.5" />
                                    <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <span className="text-[13px] font-medium text-mist-500">Your resume is being analysed by our AI. This may take a few moments depending on the length of your resume.</span>
                            </div>
                        </div>
                        <AnalysisSkeleton />
                    </div>
                )}

                {/* Error */}
                {status === "error" && (
                    <div className="anim-3 w-full max-w-120 rounded-2xl border border-danger-400/20 bg-danger-400/6 p-6 text-center">
                        <div className="mb-2 text-sm font-medium text-danger-400">{errorMsg}</div>
                        <button
                            onClick={() => setRetryKey((k) => k + 1)}
                            className="mt-4 rounded-lg border border-white/12 bg-white/6 px-5 py-2.5 text-[13px] font-medium text-mist-400 transition-colors hover:bg-white/10"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Results */}
                {status === "success" && result && (
                    <div className="flex w-full max-w-215 flex-col gap-5">
                        {/* Score + Summary */}
                        <div className="anim-3 glass-card grid grid-cols-1 items-center gap-6 p-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-8">
                            <div className="flex justify-center sm:justify-start">
                                <ScoreGauge score={result.score} atsSafe={result.atsSafe} />
                            </div>
                            <div>
                                <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-mist-950">Summary</div>
                                <p className="m-0 text-[14px] leading-relaxed tracking-tight text-mist-400 sm:text-[15px]">
                                    {result.summary}
                                </p>
                            </div>
                        </div>

                        <div className="anim-4">
                            <StrengthsWeaknesses strengths={result.strengths} weaknesses={result.weaknesses} />
                        </div>

                        <div className="anim-4">
                            <MissingSkills skills={result.missingSkills} />
                        </div>

                        <div className="anim-5 mt-2">
                            <div className="mb-3.5 text-[10px] font-semibold uppercase tracking-wider text-mist-950">AI Bullet Rewrites</div>
                            <div className="flex flex-col gap-3.5">
                                {result.suggestions.map((s, i) => (
                                    <SuggestionCard key={i} suggestion={s} index={i} />
                                ))}
                            </div>
                        </div>

                        <div className="anim-6 mt-3 flex flex-wrap justify-center gap-2.5">
                            <Link
                                href="/upload"
                                className="inline-flex items-center gap-1.5 rounded-[10px] border border-white/8 bg-white/4 px-5 py-2.5 text-[13px] font-medium text-mist-600 transition-colors hover:bg-white/8 hover:text-mist-400"
                            >
                                Analyse another resume
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}