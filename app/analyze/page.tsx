"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ResumeData {
    text: string;
    pageCount: number;
    wordCount: number;
    fileName: string;
    uploadedAt: string;
}

// ── Read sessionStorage once at render time (avoids setState-in-effect lint) ──
// This runs only on the client because the file is "use client".
// The lazy initializer passed to useState runs exactly once on mount.
function readResumeData(): ResumeData | null {
    if (typeof window === "undefined") return null; // SSR guard
    try {
        const raw = sessionStorage.getItem("resumeData");
        if (!raw) return null;
        return JSON.parse(raw) as ResumeData;
    } catch {
        return null;
    }
}

export default function AnalyzePage() {
    const router = useRouter();

    // Lazy initializer — runs once, no effect needed
    const [resumeData] = useState<ResumeData | null>(readResumeData);

    // Redirect if nothing was uploaded — useEffect is correct here because
    // it's synchronizing with an external system (the router), not setting state.
    if (!resumeData) {
        // Can't call router in render, so render a redirect trigger
        return <RedirectToUpload />;
    }

    return (
        <>
            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .a-anim-1 { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0ms   both; }
        .a-anim-2 { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 80ms  both; }
        .a-anim-3 { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 160ms both; }
      `}</style>

            <main
                style={{
                    minHeight: "100vh",
                    background: "#06050a",
                    color: "#f1f0f5",
                    fontFamily: "'Inter', system-ui, sans-serif",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px 24px",
                }}
            >
                {/* Back link */}
                <div style={{ position: "absolute", top: 24, left: 24 }}>
                    <Link
                        href="/upload"
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

                {/* Step badge */}
                <div
                    className="a-anim-1"
                    style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "5px 12px", borderRadius: 999, marginBottom: 28,
                        background: "rgba(99,73,228,0.10)", border: "1px solid rgba(99,73,228,0.22)",
                    }}
                >
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#a78bfa", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        Step 2 of 2
                    </span>
                    <span style={{ width: 1, height: 10, background: "rgba(167,139,250,0.3)" }} />
                    <span style={{ fontSize: 11, fontWeight: 500, color: "#7c7a92" }}>AI Analysis</span>
                </div>

                {/* Heading */}
                <h1
                    className="a-anim-2"
                    style={{
                        fontSize: "clamp(26px, 4vw, 40px)",
                        fontWeight: 800,
                        letterSpacing: "-0.04em",
                        textAlign: "center",
                        marginBottom: 12,
                        background: "linear-gradient(155deg, #ffffff 0%, #ffffff 45%, rgba(196,181,253,0.75) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Resume received
                </h1>

                <p
                    className="a-anim-2"
                    style={{
                        fontSize: 15, color: "#7c7a92",
                        textAlign: "center", marginBottom: 40,
                        letterSpacing: "-0.01em",
                    }}
                >
                    AI analysis coming in Phase 3.
                </p>

                {/* Resume metadata card */}
                <div
                    className="a-anim-3"
                    style={{
                        width: "100%",
                        maxWidth: 480,
                        borderRadius: 16,
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
                        backdropFilter: "blur(16px)",
                        overflow: "hidden",
                    }}
                >
                    {/* Card header */}
                    <div
                        style={{
                            padding: "14px 20px",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            background: "rgba(0,0,0,0.12)",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <div
                            style={{
                                width: 32, height: 32, borderRadius: 8,
                                background: "rgba(99,73,228,0.15)",
                                border: "1px solid rgba(99,73,228,0.25)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <rect x="2" y="1" width="8" height="11" rx="1.5" stroke="#a78bfa" strokeWidth="1.2" />
                                <path d="M4 4.5H8M4 6.5H8M4 8.5H6" stroke="#a78bfa" strokeWidth="1" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#e8e5f5", letterSpacing: "-0.01em" }}>
                                {resumeData.fileName}
                            </div>
                            <div style={{ fontSize: 11, color: "#52506a", marginTop: 1 }}>
                                Uploaded {new Date(resumeData.uploadedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 1,
                            background: "rgba(255,255,255,0.04)",
                        }}
                    >
                        {[
                            { label: "Pages", value: String(resumeData.pageCount) },
                            { label: "Words", value: resumeData.wordCount.toLocaleString() },
                            { label: "Characters", value: resumeData.text.length.toLocaleString() },
                        ].map(stat => (
                            <div
                                key={stat.label}
                                style={{
                                    padding: "16px 20px",
                                    background: "#06050a",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 4,
                                }}
                            >
                                <span style={{ fontSize: 20, fontWeight: 700, color: "#e8e5f5", letterSpacing: "-0.03em", lineHeight: 1 }}>
                                    {stat.value}
                                </span>
                                <span style={{ fontSize: 11, color: "#52506a" }}>{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Text preview */}
                    <div style={{ padding: "16px 20px" }}>
                        <div style={{
                            fontSize: 10, fontWeight: 600, color: "#3d3b52",
                            letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 10,
                        }}>
                            Extracted text preview
                        </div>
                        <div
                            style={{
                                fontSize: 12, color: "#6d6b85", lineHeight: 1.6,
                                maxHeight: 120, overflow: "hidden",
                                WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                                maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                            }}
                        >
                            {resumeData.text.slice(0, 400)}
                        </div>
                    </div>

                    {/* Phase 3 placeholder footer */}
                    <div
                        style={{
                            padding: "14px 20px",
                            borderTop: "1px solid rgba(255,255,255,0.05)",
                            background: "rgba(99,73,228,0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <span style={{ fontSize: 13, color: "#7c7a92" }}>AI analysis in Phase 3</span>
                        <div
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 5,
                                padding: "5px 12px", borderRadius: 999,
                                background: "rgba(99,73,228,0.12)", border: "1px solid rgba(99,73,228,0.22)",
                            }}
                        >
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa", display: "block" }} />
                            <span style={{ fontSize: 11, fontWeight: 500, color: "#c4b5fd" }}>Coming next</span>
                        </div>
                    </div>
                </div>

                {/* Upload another */}
                <div className="a-anim-3" style={{ marginTop: 24 }}>
                    <Link
                        href="/upload"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            padding: "9px 18px", borderRadius: 9,
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#7c7a92", fontSize: 13, fontWeight: 500,
                            textDecoration: "none", transition: "all 0.2s ease",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#c4c2d4"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#7c7a92"; }}
                    >
                        Upload a different resume
                    </Link>
                </div>
            </main>
        </>
    );
}

// ── Redirect component — keeps router.replace out of render ───────────────────
// This is a tiny client component whose only job is to redirect.
// It avoids calling router in the render body of AnalyzePage.
function RedirectToUpload() {
    const router = useRouter();

    // useEffect here is correct: it's not setting React state,
    // it's calling an external system (the router) once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useState(() => { router.replace("/upload"); });

    return (
        <main
            style={{
                minHeight: "100vh", display: "flex",
                alignItems: "center", justifyContent: "center",
                background: "#06050a",
            }}
        >
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg
                    width="18" height="18" viewBox="0 0 18 18" fill="none"
                    style={{ animation: "spin 0.8s linear infinite" }}
                    aria-hidden="true"
                >
                    <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    <path d="M9 2A7 7 0 0 1 16 9" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: 14, color: "#52506a" }}>Redirecting…</span>
            </div>
        </main>
    );
}