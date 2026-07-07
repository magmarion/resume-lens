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

    useEffect(() => {
        if (!resumeData) {
            router.replace("/upload");
            return;
        }

        async function runAnalysis() {
            if (!resumeData) return;
            try {
                const res = await fetch("/api/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: resumeData.text, fileName: resumeData.fileName }),
                });

                const data = (await res.json()) as AnalysisResult & { error?: string };

                if (!res.ok || data.error) {
                    setErrorMsg(data.error ?? "Something went wrong. Please try again.");
                    setStatus("error");
                    return;
                }

                setResult(data);
                setStatus("success");
            } catch {
                setErrorMsg("Network error — please check your connection and try again.");
                setStatus("error");
            }
        }

        void runAnalysis();
    }, [resumeData, router]);

    return (
        <>
            {/* Custom animations - need to stay in style tag */}
            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .an-1 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0ms   both; }
        .an-2 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 80ms  both; }
        .an-3 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 160ms both; }
        .an-4 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 240ms both; }
        .an-5 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 320ms both; }
        .an-6 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 400ms both; }
        @media (prefers-reduced-motion: reduce) {
          .an-1,.an-2,.an-3,.an-4,.an-5,.an-6 { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

            <HeroBackground />
            <div
                aria-hidden="true"
                className="fixed inset-0 z-1 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(15,10,30,0) 0%, #06090a 72%)",
                }}
            />

            <main className="relative z-10 min-h-screen flex flex-col items-center px-6 pt-22.5 pb-20">
                {/* Back link */}
                <div className="an-1 absolute top-18 left-8">
                    <Link
                        href="/results"
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#52506a] no-underline transition-colors duration-150 hover:text-[#c4b5fd]"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path
                                d="M9 2L4 7L9 12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Back
                    </Link>
                </div>

                {/* Header */}
                <div className="an-1 inline-flex items-center gap-1.5 px-3 py-1.25 rounded-full mb-6 bg-violet-600/10 border border-violet-600/22">
                    <div className="size-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                    <span className="text-[11px] font-semibold text-[#a78bfa] tracking-wider uppercase">
                        Step 3 of 3
                    </span>
                    <span className="w-px h-2.5 bg-violet-400/30" />
                    <span className="text-[11px] font-medium text-[#7c7a92]">AI Analysis</span>
                </div>

                <h1
                    className="an-2 text-[clamp(26px,4vw,42px)] font-extrabold tracking-[-0.04em] text-center mb-2 bg-linear-to-b from-white via-white to-[rgba(196,181,253,0.75)] bg-clip-text text-transparent"
                >
                    {status === "loading"
                        ? "Analysing your resume…"
                        : status === "error"
                            ? "Analysis failed"
                            : "Your resume analysis"}
                </h1>

                {resumeData && (
                    <p className="an-2 text-[14px] text-[#52506a] text-center mb-10">
                        {status === "loading"
                            ? `Analysing ${resumeData.fileName} · ${resumeData.wordCount.toLocaleString()} words`
                            : resumeData.fileName}
                    </p>
                )}

                {/* ── Loading ── */}
                {status === "loading" && (
                    <div className="an-3 w-full max-w-215">
                        {/* Thinking indicator */}
                        <div className="flex items-center justify-center gap-2.5 mb-9 px-5 py-3 rounded-full bg-violet-600/8 border border-violet-600/18 w-fit mx-auto">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                className="animate-spin shrink-0"
                                style={{ animationDuration: "0.9s" }}
                                aria-hidden="true"
                            >
                                <circle cx="7" cy="7" r="5.5" stroke="rgba(167,139,250,0.25)" strokeWidth="1.5" />
                                <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <span className="text-[13px] text-[#9f9cb8] font-medium">
                                Your resume is being analysed by AI. This may take a few moments depending on the length of your resume.
                            </span>
                        </div>
                        <AnalysisSkeleton />
                    </div>
                )}

                {/* ── Error ── */}
                {status === "error" && (
                    <div className="an-3 max-w-120 w-full p-6 rounded-2xl bg-rose-400/6 border border-rose-400/20 text-center">
                        <div className="text-[14px] text-rose-400 font-medium mb-2">{errorMsg}</div>
                        <button
                            onClick={() => {
                                setStatus("loading");
                                setErrorMsg("");
                                void (async () => {
                                    if (!resumeData) return;
                                    try {
                                        const res = await fetch("/api/analyze", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ text: resumeData.text, fileName: resumeData.fileName }),
                                        });
                                        const data = (await res.json()) as AnalysisResult & { error?: string };
                                        if (!res.ok || data.error) {
                                            setErrorMsg(data.error ?? "Error");
                                            setStatus("error");
                                            return;
                                        }
                                        setResult(data);
                                        setStatus("success");
                                    } catch {
                                        setErrorMsg("Network error.");
                                        setStatus("error");
                                    }
                                })();
                            }}
                            className="mt-4 px-5 py-2.25 rounded-[9px] bg-white/6 border border-white/12 text-[#c4c2d4] text-[13px] font-medium cursor-pointer hover:bg-white/10 transition-colors duration-200"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* ── Results ── */}
                {status === "success" && result && (
                    <div className="w-full max-w-215 flex flex-col gap-5">
                        {/* Score + Summary */}
                        <div className="an-3 rounded-[20px] border border-white/8 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.3),0_24px_60px_rgba(0,0,0,0.4)] p-7 sm:p-8 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 items-center">
                            <ScoreGauge score={result.score} atsSafe={result.atsSafe} />
                            <div>
                                <div className="text-[10px] font-semibold text-[#3d3b52] tracking-[0.08em] uppercase mb-2.5">
                                    Summary
                                </div>
                                <p className="text-[15px] text-[#c4c2d4] leading-[1.7] tracking-[-0.01em] m-0">
                                    {result.summary}
                                </p>
                            </div>
                        </div>

                        {/* Strengths + Weaknesses */}
                        <div className="an-4">
                            <StrengthsWeaknesses strengths={result.strengths} weaknesses={result.weaknesses} />
                        </div>

                        {/* Missing skills */}
                        <div className="an-4">
                            <MissingSkills skills={result.missingSkills} />
                        </div>

                        {/* Suggestions header */}
                        <div className="an-5 mt-2">
                            <div className="text-[10px] font-semibold text-[#3d3b52] tracking-[0.08em] uppercase mb-3.5">
                                AI Bullet Rewrites
                            </div>
                            <div className="flex flex-col gap-3.5">
                                {result.suggestions.map((s, i) => (
                                    <div key={i} className={`an-${Math.min(i + 5, 6) as 5 | 6}`}>
                                        <SuggestionCard suggestion={s} index={i} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer actions */}
                        <div className="an-6 flex gap-2.5 justify-center mt-3 flex-wrap">
                            <Link
                                href="/upload"
                                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[10px] bg-white/4 border border-white/8 text-[#7c7a92] text-[13px] font-medium no-underline transition-all duration-200 hover:bg-white/8 hover:text-[#c4c2d4]"
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