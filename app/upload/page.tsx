"use client";

import Link from "next/link";
import UploadBox from "@/components/upload/UploadBox";
import { HeroBackground } from "@/components/home/HeroBackground";

export default function UploadPage() {
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
                    from { opacity: 0; transform: translateY(22px); }
                    to   { opacity: 1; transform: translateY(0);    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .u-anim-1, .u-anim-2, .u-anim-3 {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }

                .u-anim-1 { animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0ms   both; }
                .u-anim-2 { animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) 90ms  both; }
                .u-anim-3 { animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) 170ms both; }
            `}</style>

            {/* Same canvas orbs as Hero */}
            <HeroBackground />

            {/* Same vignette as Hero — identical values */}
            <div
                aria-hidden="true"
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: "none",
                    background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(15,10,30,0) 0%, #06090a 72%)",
                }}
            />

            <main
                style={{
                    position: "relative",
                    zIndex: 10,
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "90px 24px 60px",
                }}
            >
                {/* Back link — sits below the 58px fixed Navbar */}
                <div
                    className="u-anim-1"
                    style={{ position: "absolute", top: 72, left: 32 }}
                >
                    <Link
                        href="/"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 13,
                            fontWeight: 500,
                            color: "#52506a",
                            textDecoration: "none",
                            transition: "color 0.15s ease",
                            cursor: "pointer",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#c4b5fd")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#52506a")}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to home
                    </Link>
                </div>

                {/* Step badge */}
                <div
                    className="u-anim-1"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "5px 12px",
                        borderRadius: 999,
                        marginBottom: 28,
                        background: "rgba(99,73,228,0.10)",
                        border: "1px solid rgba(99,73,228,0.22)",
                    }}
                >
                    <div
                        style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#a78bfa",
                            boxShadow: "0 0 8px rgba(167,139,250,0.9)",
                        }}
                    />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#a78bfa", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        Step 1 of 3
                    </span>
                    <span style={{ width: 1, height: 10, background: "rgba(167,139,250,0.3)" }} />
                    <span style={{ fontSize: 11, fontWeight: 500, color: "#7c7a92" }}>Upload Resume</span>
                </div>

                {/* Heading */}
                <div style={{ textAlign: "center", marginBottom: 40, maxWidth: 560 }}>
                    <h1
                        className="u-anim-2"
                        style={{
                            fontSize: "clamp(32px, 5vw, 52px)",
                            fontWeight: 800,
                            lineHeight: 1.06,
                            letterSpacing: "-0.04em",
                            marginBottom: 16,
                            background: "linear-gradient(155deg, #ffffff 0%, #ffffff 45%, rgba(196,181,253,0.75) 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Upload your resume
                    </h1>
                    <p
                        className="u-anim-3"
                        style={{
                            fontSize: "clamp(14px, 1.8vw, 17px)",
                            color: "#7c7a92",
                            lineHeight: 1.7,
                            letterSpacing: "-0.01em",
                        }}
                    >
                        We&apos;ll extract the text and run it through our AI reviewer.
                        <br />
                        Your file is never stored — only the text is analysed.
                    </p>
                </div>

                {/* Upload box */}
                <div className="u-anim-3" style={{ width: "100%", maxWidth: 520 }}>
                    <UploadBox />
                </div>

                {/* Step progress strip */}
                <div
                    className="u-anim-3"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 40,
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {[
                        { step: "1", label: "Upload PDF", active: true },
                        { step: "2", label: "AI Analysis", active: false },
                    ].map((item, i) => (
                        <div key={item.step} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {i > 0 && (
                                <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.08)" }} />
                            )}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 7,
                                    padding: "6px 12px",
                                    borderRadius: 999,
                                    background: item.active ? "rgba(99,73,228,0.12)" : "transparent",
                                    border: `1px solid ${item.active ? "rgba(99,73,228,0.25)" : "rgba(255,255,255,0.06)"}`,
                                }}
                            >
                                <div
                                    style={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: item.active ? "rgba(167,139,250,0.25)" : "rgba(255,255,255,0.05)",
                                        fontSize: 10,
                                        fontWeight: 700,
                                        color: item.active ? "#c4b5fd" : "#3d3b52",
                                    }}
                                >
                                    {item.step}
                                </div>
                                <span
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        color: item.active ? "#c4b5fd" : "#3d3b52",
                                        letterSpacing: "-0.01em",
                                    }}
                                >
                                    {item.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}