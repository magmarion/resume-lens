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

                const data = await res.json() as AnalysisResult & { error?: string };

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
            <style>{`
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: #06050a;
          color: #f1f0f5;
          overflow-x: hidden;
        }
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
                style={{
                    position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
                    background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(15,10,30,0) 0%, #06090a 72%)",
                }}
            />

            <main style={{
                position: "relative", zIndex: 10,
                minHeight: "100vh",
                display: "flex", flexDirection: "column", alignItems: "center",
                padding: "90px 24px 80px",
            }}>
                {/* Back link */}
                <div className="an-1" style={{ position: "absolute", top: 72, left: 32 }}>
                    <Link
                        href="/results"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            fontSize: 13, fontWeight: 500, color: "#52506a",
                            textDecoration: "none", transition: "color 0.15s ease",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#c4b5fd")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#52506a")}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                    </Link>
                </div>

                {/* Header */}
                <div className="an-1" style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "5px 12px", borderRadius: 999, marginBottom: 24,
                    background: "rgba(99,73,228,0.10)", border: "1px solid rgba(99,73,228,0.22)",
                }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 8px rgba(167,139,250,0.9)" }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#a78bfa", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        Step 3 of 3
                    </span>
                    <span style={{ width: 1, height: 10, background: "rgba(167,139,250,0.3)" }} />
                    <span style={{ fontSize: 11, fontWeight: 500, color: "#7c7a92" }}>AI Analysis</span>
                </div>

                <h1 className="an-2" style={{
                    fontSize: "clamp(26px, 4vw, 42px)",
                    fontWeight: 800, letterSpacing: "-0.04em", textAlign: "center", marginBottom: 8,
                    background: "linear-gradient(155deg, #ffffff 0%, #ffffff 45%, rgba(196,181,253,0.75) 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                    {status === "loading" ? "Analysing your resume…" : status === "error" ? "Analysis failed" : "Your resume analysis"}
                </h1>

                {resumeData && (
                    <p className="an-2" style={{ fontSize: 14, color: "#52506a", textAlign: "center", marginBottom: 40 }}>
                        {status === "loading"
                            ? `Analysing ${resumeData.fileName} · ${resumeData.wordCount.toLocaleString()} words`
                            : resumeData.fileName}
                    </p>
                )}

                {/* ── Loading ── */}
                {status === "loading" && (
                    <div className="an-3" style={{ width: "100%", maxWidth: 860 }}>
                        {/* Thinking indicator */}
                        <div style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                            marginBottom: 36,
                            padding: "12px 20px", borderRadius: 999,
                            background: "rgba(99,73,228,0.08)", border: "1px solid rgba(99,73,228,0.18)",
                            width: "fit-content", margin: "0 auto 36px",
                        }}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: "spin 0.9s linear infinite", flexShrink: 0 }} aria-hidden="true">
                                <circle cx="7" cy="7" r="5.5" stroke="rgba(167,139,250,0.25)" strokeWidth="1.5" />
                                <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <span style={{ fontSize: 13, color: "#9f9cb8", fontWeight: 500 }}>
                                Your resume is being analysed by AI. This may take a few moments depending on the length of your resume.
                            </span>
                        </div>
                        <AnalysisSkeleton />
                    </div>
                )}

                {/* ── Error ── */}
                {status === "error" && (
                    <div className="an-3" style={{
                        maxWidth: 480, width: "100%",
                        padding: "24px", borderRadius: 16,
                        background: "rgba(251,113,133,0.06)",
                        border: "1px solid rgba(251,113,133,0.20)",
                        textAlign: "center",
                    }}>
                        <div style={{ fontSize: 14, color: "#fb7185", fontWeight: 500, marginBottom: 8 }}>
                            {errorMsg}
                        </div>
                        <button
                            onClick={() => {
                                setStatus("loading"); setErrorMsg(""); void (async () => {
                                    if (!resumeData) return;
                                    try {
                                        const res = await fetch("/api/analyze", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ text: resumeData.text, fileName: resumeData.fileName }),
                                        });
                                        const data = await res.json() as AnalysisResult & { error?: string };
                                        if (!res.ok || data.error) { setErrorMsg(data.error ?? "Error"); setStatus("error"); return; }
                                        setResult(data); setStatus("success");
                                    } catch { setErrorMsg("Network error."); setStatus("error"); }
                                })();
                            }}
                            style={{
                                marginTop: 16, padding: "9px 20px", borderRadius: 9,
                                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                                color: "#c4c2d4", fontSize: 13, fontWeight: 500, cursor: "pointer",
                            }}
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* ── Results ── */}
                {status === "success" && result && (
                    <div style={{ width: "100%", maxWidth: 860, display: "flex", flexDirection: "column", gap: 20 }}>

                        {/* Score + Summary */}
                        <div className="an-3" style={{
                            borderRadius: 20,
                            border: "1px solid rgba(255,255,255,0.08)",
                            background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.018) 100%)",
                            backdropFilter: "blur(24px)",
                            boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 24px 60px rgba(0,0,0,0.4)",
                            padding: "28px 32px",
                            display: "grid",
                            gridTemplateColumns: "auto 1fr",
                            gap: 32,
                            alignItems: "center",
                        }}>
                            <ScoreGauge score={result.score} atsSafe={result.atsSafe} />
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 600, color: "#3d3b52", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                                    Summary
                                </div>
                                <p style={{ fontSize: 15, color: "#c4c2d4", lineHeight: 1.7, letterSpacing: "-0.01em", margin: 0 }}>
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
                        <div className="an-5" style={{ marginTop: 8 }}>
                            <div style={{ fontSize: 10, fontWeight: 600, color: "#3d3b52", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
                                AI Bullet Rewrites
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {result.suggestions.map((s, i) => (
                                    <div key={i} className={`an-${Math.min(i + 5, 6) as 5 | 6}`}>
                                        <SuggestionCard suggestion={s} index={i} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer actions */}
                        <div className="an-6" style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
                            <Link
                                href="/upload"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 6,
                                    padding: "10px 20px", borderRadius: 10,
                                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                                    color: "#7c7a92", fontSize: 13, fontWeight: 500,
                                    textDecoration: "none", transition: "all 0.2s ease",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#c4c2d4"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#7c7a92"; }}
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