// app/upload/page.tsx
"use client";

import Link from "next/link";
import UploadBox from "@/components/upload/UploadBox";

import { useEffect, useRef } from "react";

interface Orb {
    cx: number; cy: number; r: number; color: string;
    sinFreq: number; cosFreq: number;
    sinAmp: number; cosAmp: number;
    alpha: number; alphaFade: number;
}

const ORBS: Orb[] = [
    { cx: 0.15, cy: 0.20, r: 0.50, color: "99,73,228", sinFreq: 0.0004, cosFreq: 0.0003, sinAmp: 0.04, cosAmp: 0.05, alpha: 0.22, alphaFade: 0.05 },
    { cx: 0.85, cy: 0.25, r: 0.45, color: "168,85,247", sinFreq: 0.0005, cosFreq: 0.0004, sinAmp: 0.04, cosAmp: 0.06, alpha: 0.15, alphaFade: 0.05 },
    { cx: 0.50, cy: 0.80, r: 0.45, color: "29,78,216", sinFreq: 0.0003, cosFreq: 0.0005, sinAmp: 0.06, cosAmp: 0.04, alpha: 0.14, alphaFade: 0.04 },
];

function GradientCanvas() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId = 0;
        let t = 0;

        function resize() {
            if (!canvas || !ctx) return;
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        resize();
        window.addEventListener("resize", resize);

        function draw() {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
            ORBS.forEach(orb => {
                if (!canvas || !ctx) return;
                const w = canvas.offsetWidth;
                const h = canvas.offsetHeight;
                const ox = w * (orb.cx + Math.sin(t * orb.sinFreq) * orb.sinAmp);
                const oy = h * (orb.cy + Math.cos(t * orb.cosFreq) * orb.cosAmp);
                const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, w * orb.r);
                g.addColorStop(0, `rgba(${orb.color},${orb.alpha})`);
                g.addColorStop(0.5, `rgba(${orb.color},${orb.alphaFade})`);
                g.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, w, h);
            });
            t++;
            animId = requestAnimationFrame(draw);
        }

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) { t = 200; draw(); cancelAnimationFrame(animId); animId = 0; }
        else draw();

        return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
    }, []);

    return (
        <canvas
            ref={ref}
            aria-hidden="true"
            style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        />
    );
}

export default function UploadPage() {
    return (
        <>
            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .u-anim { animation: none !important; opacity: 1 !important; }
        }
        .u-anim-1 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0ms   both; }
        .u-anim-2 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 80ms  both; }
        .u-anim-3 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 160ms both; }
      `}</style>

            <GradientCanvas />

            {/* Vignette */}
            <div
                aria-hidden="true"
                style={{
                    position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
                    background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(15,10,30,0) 0%, #06050a 72%)",
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
                    padding: "80px 24px 60px",
                }}
            >
                {/* Back link */}
                <div
                    className="u-anim-1"
                    style={{ position: "absolute", top: 24, left: 24 }}
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
                <div
                    className="u-anim-1"
                    style={{ textAlign: "center", marginBottom: 40, maxWidth: 560 }}
                >
                    {/* Step badge */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "5px 12px",
                            borderRadius: 999,
                            background: "rgba(99,73,228,0.10)",
                            border: "1px solid rgba(99,73,228,0.22)",
                            marginBottom: 20,
                        }}
                    >
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#a78bfa", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                            Step 1 of 2
                        </span>
                        <span style={{ width: 1, height: 10, background: "rgba(167,139,250,0.3)" }} />
                        <span style={{ fontSize: 11, fontWeight: 500, color: "#7c7a92" }}>Upload Resume</span>
                    </div>

                    <h1
                        className="u-anim-2"
                        style={{
                            fontSize: "clamp(28px, 4vw, 42px)",
                            fontWeight: 800,
                            lineHeight: 1.08,
                            letterSpacing: "-0.04em",
                            marginBottom: 14,
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
                            fontSize: "clamp(14px, 1.8vw, 16px)",
                            color: "#7c7a92",
                            lineHeight: 1.65,
                            letterSpacing: "-0.01em",
                        }}
                    >
                        We&apos;ll extract the text and run it through our AI reviewer.
                        Your file is never stored — only the text is analysed.
                    </p>
                </div>

                {/* Upload box */}
                <div className="u-anim-3" style={{ width: "100%", maxWidth: 520, display: "flex", justifyContent: "center" }}>
                    <UploadBox />
                </div>

                {/* Steps preview */}
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