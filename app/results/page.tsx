"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HeroBackground } from "@/components/home/HeroBackground";

interface ResumeData {
    text: string;
    pageCount: number;
    wordCount: number;
    fileName: string;
    uploadedAt: string;
}

function readSessionData(): { resume: ResumeData | null; pdfUrl: string | null } {
    if (typeof window === "undefined") return { resume: null, pdfUrl: null };
    try {
        const raw = sessionStorage.getItem("resumeData");
        const pdfUrl = sessionStorage.getItem("resumePdfDataUrl");
        if (!raw) return { resume: null, pdfUrl: null };
        return { resume: JSON.parse(raw) as ResumeData, pdfUrl };
    } catch {
        return { resume: null, pdfUrl: null };
    }
}

function RedirectToUpload() {
    const router = useRouter();
    useState(() => { router.replace("/upload"); });
    return (
        <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#06050a" }}>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ animation: "spin 0.8s linear infinite" }} aria-hidden="true">
                    <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    <path d="M9 2A7 7 0 0 1 16 9" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: 14, color: "#52506a", fontFamily: "Inter, system-ui, sans-serif" }}>Redirecting…</span>
            </div>
        </main>
    );
}

export default function ResultsPage() {
    const [{ resume, pdfUrl }] = useState(readSessionData);

    if (!resume) return <RedirectToUpload />;

    const uploadTime = new Date(resume.uploadedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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
                .r-anim-1 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0ms   both; }
                .r-anim-2 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 80ms  both; }
                .r-anim-3 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 160ms both; }
                .r-anim-4 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 240ms both; }
                @media (prefers-reduced-motion: reduce) {
                    .r-anim-1,.r-anim-2,.r-anim-3,.r-anim-4 { animation: none !important; opacity: 1 !important; }
                }
                .btn-analyse {
                    width: 100%;
                    display: flex; align-items: center; justify-content: center; gap: 7px;
                    padding: 12px 20px; border-radius: 10px;
                    background: linear-gradient(135deg, #6349e4 0%, #818cf8 60%, #a78bfa 100%);
                    color: #fff; font-size: 14px; font-weight: 600;
                    letter-spacing: -0.01em; border: none; cursor: pointer;
                    box-shadow: 0 0 0 1px rgba(99,73,228,0.35), 0 6px 24px rgba(99,73,228,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
                    transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
                    text-decoration: none;
                }
                .btn-analyse:hover {
                    opacity: 0.88; transform: translateY(-1px);
                    box-shadow: 0 0 0 1px rgba(99,73,228,0.45), 0 10px 32px rgba(99,73,228,0.5), inset 0 1px 0 rgba(255,255,255,0.18);
                }
            `}</style>

            <HeroBackground />
            <div aria-hidden="true" style={{
                position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
                background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(15,10,30,0) 0%, #06090a 72%)",
            }} />

            <main style={{
                position: "relative", zIndex: 10, minHeight: "100vh",
                display: "flex", flexDirection: "column", alignItems: "center",
                padding: "90px 24px 60px",
            }}>
                {/* Back */}
                <div className="r-anim-1" style={{ position: "absolute", top: 72, left: 32 }}>
                    <Link href="/upload" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#52506a", textDecoration: "none", transition: "color 0.15s ease" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#c4b5fd")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#52506a")}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                    </Link>
                </div>

                {/* Badge */}
                <div className="r-anim-1" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, marginBottom: 24, background: "rgba(99,73,228,0.10)", border: "1px solid rgba(99,73,228,0.22)" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 8px rgba(167,139,250,0.9)" }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#a78bfa", letterSpacing: "0.05em", textTransform: "uppercase" }}>Step 2 of 3</span>
                    <span style={{ width: 1, height: 10, background: "rgba(167,139,250,0.3)" }} />
                    <span style={{ fontSize: 11, fontWeight: 500, color: "#7c7a92" }}>Review &amp; Confirm</span>
                </div>

                <h1 className="r-anim-2" style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-0.04em", textAlign: "center", marginBottom: 8, background: "linear-gradient(155deg, #ffffff 0%, #ffffff 45%, rgba(196,181,253,0.75) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Does this look right?
                </h1>
                <p className="r-anim-2" style={{ fontSize: 15, color: "#52506a", textAlign: "center", marginBottom: 36, letterSpacing: "-0.01em" }}>
                    Confirm your resume looks correct before we analyse it
                </p>

                <div className="r-anim-3" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, width: "100%", maxWidth: 980, alignItems: "start" }}>
                    {/* PDF viewer */}
                    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 24px 60px rgba(0,0,0,0.5)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                                <rect x="1.5" y="1.5" width="10" height="10" rx="1.5" stroke="#52506a" strokeWidth="1.2" />
                                <path d="M4 4.5H9M4 6.5H9M4 8.5H7" stroke="#52506a" strokeWidth="1" strokeLinecap="round" />
                            </svg>
                            <span style={{ fontSize: 12, color: "#52506a", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{resume.fileName}</span>
                            <span style={{ fontSize: 11, color: "#3d3b52" }}>{resume.pageCount}p</span>
                        </div>
                        {pdfUrl ? (
                            <iframe src={pdfUrl} title="Resume PDF preview" style={{ width: "100%", height: 680, border: "none", display: "block", background: "#1a1825" }} />
                        ) : (
                            <div style={{ height: 680, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: "#0e0d16", color: "#3d3b52" }}>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                                    <rect x="4" y="2" width="18" height="26" rx="2.5" stroke="#3d3b52" strokeWidth="1.5" />
                                    <path d="M8 9H18M8 13H18M8 17H14" stroke="#3d3b52" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <span style={{ fontSize: 13 }}>PDF preview unavailable</span>
                                <span style={{ fontSize: 11, color: "#2d2b42" }}>Text was extracted successfully</span>
                            </div>
                        )}
                    </div>

                    {/* Right panel */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {/* File info */}
                        <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.018) 100%)", backdropFilter: "blur(16px)", overflow: "hidden" }}>
                            <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.12)" }}>
                                <div style={{ fontSize: 10, fontWeight: 600, color: "#3d3b52", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>File details</div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "#e8e5f5", letterSpacing: "-0.01em", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{resume.fileName}</div>
                                <div style={{ fontSize: 11, color: "#52506a" }}>Uploaded at {uploadTime}</div>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.04)" }}>
                                {[{ label: "Page(s)", value: String(resume.pageCount) }, { label: "Words", value: resume.wordCount.toLocaleString() }].map((s, i) => (
                                    <div key={s.label} style={{ padding: "14px 16px", background: "#06050a", borderRight: i === 0 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                                        <div style={{ fontSize: 20, fontWeight: 700, color: "#e8e5f5", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 3 }}>{s.value}</div>
                                        <div style={{ fontSize: 11, color: "#52506a" }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                                        <path d="M2 5.5L4.5 8L9 3" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 500, color: "#c4c2d4" }}>Text extracted</div>
                                    <div style={{ fontSize: 11, color: "#52506a" }}>{resume.text.length.toLocaleString()} characters</div>
                                </div>
                            </div>
                        </div>

                        {/* ── Analyse CTA — now a real Link to /analyze ── */}
                        <div style={{ borderRadius: 14, border: "1px solid rgba(99,73,228,0.25)", background: "rgba(99,73,228,0.08)", padding: "16px" }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#e8e5f5", marginBottom: 4, letterSpacing: "-0.01em" }}>Ready to analyse</div>
                            <div style={{ fontSize: 12, color: "#7c7a92", lineHeight: 1.55, marginBottom: 14 }}>
                                Our AI will review your resume for ATS compatibility, keyword gaps, and suggest improvements.
                            </div>
                            <Link href="/analyze" className="btn-analyse">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                    <path d="M7.5 1L9.18 5.27L13.5 6L10.5 9L11.18 13.5L7.5 11.27L3.82 13.5L4.5 9L1.5 6L5.82 5.27L7.5 1Z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
                                </svg>
                                Analyse with AI
                            </Link>
                        </div>

                        <Link href="/upload" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 16px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#7c7a92", fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "all 0.2s ease", textAlign: "center" }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#c4c2d4"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#7c7a92"; }}
                        >
                            Upload a different resume
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}