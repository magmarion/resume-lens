"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Orb {
    cx: number;   // center x as fraction of width
    cy: number;   // center y as fraction of height
    r: number;    // radius as fraction of width
    color: string;
    sinFreq: number;
    cosFreq: number;
    sinAmp: number;
    cosAmp: number;
    alpha: number;
    alphaFade: number;
}

// ── Canvas gradient background ─────────────────────────────────────────────────

const ORBS: Orb[] = [
    // Deep indigo — top-left
    { cx: 0.16, cy: 0.22, r: 0.58, color: "99,73,228", sinFreq: 0.0004, cosFreq: 0.0003, sinAmp: 0.04, cosAmp: 0.05, alpha: 0.26, alphaFade: 0.06 },
    // Violet — top-right
    { cx: 0.84, cy: 0.28, r: 0.52, color: "168,85,247", sinFreq: 0.0005, cosFreq: 0.0004, sinAmp: 0.04, cosAmp: 0.06, alpha: 0.18, alphaFade: 0.06 },
    // Sapphire — bottom-center
    { cx: 0.50, cy: 0.82, r: 0.50, color: "29,78,216", sinFreq: 0.0003, cosFreq: 0.0005, sinAmp: 0.06, cosAmp: 0.04, alpha: 0.18, alphaFade: 0.06 },
    // Rose accent — mid-right
    { cx: 0.78, cy: 0.55, r: 0.30, color: "190,18,60", sinFreq: 0.0006, cosFreq: 0.0004, sinAmp: 0.03, cosAmp: 0.04, alpha: 0.12, alphaFade: 0.05 },
    // Teal center glow
    { cx: 0.50, cy: 0.44, r: 0.32, color: "15,118,110", sinFreq: 0.0004, cosFreq: 0.0003, sinAmp: 0.03, cosAmp: 0.03, alpha: 0.10, alphaFade: 0.04 },
];

function GradientCanvas() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let t = 0;

        function resize() {
            if (!canvas || !ctx) return;
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        resize();
        window.addEventListener("resize", resize);

        function drawOrb(orb: Orb) {
            if (!canvas || !ctx) return;
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            const ox = w * (orb.cx + Math.sin(t * orb.sinFreq) * orb.sinAmp);
            const oy = h * (orb.cy + Math.cos(t * orb.cosFreq) * orb.cosAmp);
            const rad = w * orb.r;
            const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, rad);
            g.addColorStop(0, `rgba(${orb.color},${orb.alpha})`);
            g.addColorStop(0.5, `rgba(${orb.color},${orb.alphaFade})`);
            g.addColorStop(1, `rgba(${orb.color},0)`);
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        }

        function draw() {
            if (!canvas || !ctx) return;
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);
            ORBS.forEach(drawOrb);
            t++;
            animId = requestAnimationFrame(draw);
        }

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            t = 300;
            // single static frame — call draw once without rAF
            if (canvas && ctx) {
                const w = canvas.offsetWidth;
                const h = canvas.offsetHeight;
                ctx.clearRect(0, 0, w, h);
                ORBS.forEach(drawOrb);
            }
        } else {
            draw();
        }

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={ref}
            aria-hidden="true"
            style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 0,
            }}
        />
    );
}

// ── Stat pill ──────────────────────────────────────────────────────────────────

interface StatPillProps {
    value: string;
    label: string;
}

function StatPill({ value, label }: StatPillProps) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                padding: "10px 20px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                minWidth: 90,
            }}
        >
            <span style={{ fontSize: 20, fontWeight: 700, color: "#e8e5f5", letterSpacing: "-0.03em", lineHeight: 1 }}>
                {value}
            </span>
            <span style={{ fontSize: 11, color: "#6d6b85", fontWeight: 400, whiteSpace: "nowrap" }}>
                {label}
            </span>
        </div>
    );
}

// ── Animated score ring ────────────────────────────────────────────────────────

function ScoreRing() {
    const score = 87;
    const radius = 38;
    const circ = 2 * Math.PI * radius;
    const dash = (score / 100) * circ;

    return (
        <div
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 96,
                height: 96,
            }}
        >
            <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
                <circle
                    cx="48" cy="48" r={radius}
                    fill="none"
                    stroke="url(#scoreGrad)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${circ}`}
                    style={{ transition: "stroke-dasharray 1s ease" }}
                />
                <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                </defs>
            </svg>
            <div style={{ position: "absolute", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 750, color: "#e8e5f5", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {score}
                </div>
                <div style={{ fontSize: 9, color: "#6d6b85", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    Score
                </div>
            </div>
        </div>
    );
}

// ── Floating product card ──────────────────────────────────────────────────────

function FloatingCard() {
    const CHECKS: { label: string; ok: boolean; note: string }[] = [
        { label: "ATS Compatibility", ok: true, note: "Passes all major parsers" },
        { label: "Keyword Density", ok: true, note: "18 role-matched keywords" },
        { label: "Impact Statements", ok: false, note: "3 bullets lack metrics" },
        { label: "Formatting", ok: true, note: "Clean single-column layout" },
        { label: "Action Verbs", ok: false, note: 'Avoid "responsible for"' },
    ];

    return (
        <div
            style={{
                width: "100%",
                maxWidth: 400,
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.09)",
                background: "linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.4), 0 32px 80px rgba(0,0,0,0.65), 0 0 60px rgba(99,73,228,0.1)",
                overflow: "hidden",
            }}
        >
            {/* Card header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(0,0,0,0.15)",
                }}
            >
                <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e8e5f5", letterSpacing: "-0.01em" }}>
                        Resume Analysis
                    </div>
                    <div style={{ fontSize: 11, color: "#52506a", marginTop: 1 }}>Senior Frontend Engineer · Google</div>
                </div>
                <ScoreRing />
            </div>

            {/* Checks */}
            <div style={{ padding: "14px 18px 18px" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#3d3b52", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                    Review Summary
                </div>
                {CHECKS.map((c) => (
                    <div
                        key={c.label}
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            padding: "8px 0",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                    >
                        {/* Icon */}
                        <div
                            style={{
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                marginTop: 1,
                                background: c.ok ? "rgba(52,211,153,0.15)" : "rgba(251,113,133,0.15)",
                                border: `1px solid ${c.ok ? "rgba(52,211,153,0.3)" : "rgba(251,113,133,0.3)"}`,
                            }}
                        >
                            {c.ok ? (
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M2 5L4 7L8 3" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M3 3L7 7M7 3L3 7" stroke="#fb7185" strokeWidth="1.4" strokeLinecap="round" />
                                </svg>
                            )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, fontWeight: 500, color: "#c4c2d4", letterSpacing: "-0.01em" }}>
                                {c.label}
                            </div>
                            <div style={{ fontSize: 11, color: "#52506a", marginTop: 1 }}>{c.note}</div>
                        </div>
                    </div>
                ))}

                {/* AI suggestion chip */}
                <div
                    style={{
                        marginTop: 12,
                        padding: "10px 12px",
                        borderRadius: 10,
                        background: "rgba(99,73,228,0.10)",
                        border: "1px solid rgba(99,73,228,0.22)",
                    }}
                >
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#a78bfa", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
                        AI Suggestion
                    </div>
                    <div style={{ fontSize: 11.5, color: "#9f9cb8", lineHeight: 1.55 }}>
                        Replace <span style={{ color: "#fb7185" }}>&quot;responsible for leading&quot;</span> with{" "}
                        <span style={{ color: "#34d399" }}>&quot;led a 6-person team that shipped…&quot;</span> to add measurable impact.
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Features", "Pricing", "Examples", "Blog"] as const;

function Navbar({ scrolled }: { scrolled: boolean }) {
    return (
        <nav
            style={{
                position: "fixed",
                top: 0, left: 0, right: 0,
                zIndex: 100,
                height: 58,
                display: "flex",
                alignItems: "center",
                transition: "background 0.3s ease, border-color 0.3s ease",
                background: scrolled ? "rgba(6,5,10,0.80)" : "transparent",
                backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
                WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
                borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.07)" : "transparent"}`,
            }}
        >
            <div
                style={{
                    maxWidth: 1120, margin: "0 auto", padding: "0 24px",
                    width: "100%",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }}
            >
                {/* Logo */}
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                    <div
                        style={{
                            width: 28, height: 28, borderRadius: 8,
                            background: "linear-gradient(135deg, #6349e4, #a78bfa)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 0 14px rgba(99,73,228,0.45)",
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M4 10.5L7 3.5L10 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 8.5H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span style={{ color: "#f1f0f5", fontWeight: 650, fontSize: 15, letterSpacing: "-0.03em" }}>
                        Resume Lens
                    </span>
                </Link>

                {/* Center links */}
                <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
                    {NAV_LINKS.map((l) => (
                        <Link key={l} href="#" style={{
                            fontSize: 13.5, fontWeight: 450, color: "#7c7a92",
                            textDecoration: "none", letterSpacing: "-0.01em",
                            transition: "color 0.15s ease",
                        }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#d4d2e8")}
                            onMouseLeave={e => (e.currentTarget.style.color = "#7c7a92")}
                        >
                            {l}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Link href="#" style={{
                        fontSize: 13.5, fontWeight: 450, color: "#7c7a92",
                        textDecoration: "none", letterSpacing: "-0.01em",
                    }}>
                        Sign in
                    </Link>
                    <Link
                        href="#"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            padding: "8px 16px", borderRadius: 9,
                            background: "linear-gradient(135deg, #6349e4, #818cf8)",
                            color: "#fff", fontSize: 13, fontWeight: 600,
                            letterSpacing: "-0.01em", textDecoration: "none",
                            boxShadow: "0 0 0 1px rgba(99,73,228,0.4), 0 4px 16px rgba(99,73,228,0.3)",
                            transition: "opacity 0.2s ease, transform 0.2s ease",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                        Try free
                    </Link>
                </div>
            </div>
        </nav>
    );
}

// ── Hero (default export) ──────────────────────────────────────────────────────

export default function Hero() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: #06050a;
          color: #f1f0f5;
          overflow-x: hidden;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 1; }
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .anim, .float-card { animation: none !important; opacity: 1 !important; transform: none !important; }
        }

        .anim-1 { animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0ms   both; }
        .anim-2 { animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 90ms  both; }
        .anim-3 { animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 170ms both; }
        .anim-4 { animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 250ms both; }
        .anim-5 { animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 330ms both; }
        .float-card { animation: floatCard 5s ease-in-out infinite; }

        .btn-main {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 13px 26px; border-radius: 10px;
          font-size: 15px; font-weight: 600; letter-spacing: -0.015em;
          text-decoration: none; white-space: nowrap; cursor: pointer; border: none;
          background: linear-gradient(135deg, #6349e4 0%, #818cf8 60%, #a78bfa 100%);
          color: #fff;
          box-shadow: 0 0 0 1px rgba(99,73,228,0.35), 0 6px 24px rgba(99,73,228,0.40), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-main:hover {
          opacity: 0.88; transform: translateY(-2px);
          box-shadow: 0 0 0 1px rgba(99,73,228,0.45), 0 12px 36px rgba(99,73,228,0.50), inset 0 1px 0 rgba(255,255,255,0.18);
        }
        .btn-main:active { transform: translateY(0); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 13px 22px; border-radius: 10px;
          font-size: 15px; font-weight: 500; letter-spacing: -0.015em;
          text-decoration: none; white-space: nowrap; cursor: pointer;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.11);
          color: #c4c2d4; backdrop-filter: blur(8px);
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.18);
          color: #f1f0f5; transform: translateY(-2px);
        }

        .glow-dot { animation: glowPulse 2.4s ease-in-out infinite; }

        .logo-chip {
          font-size: 12px; font-weight: 600; letter-spacing: 0.03em;
          text-transform: uppercase; color: #fff;
          opacity: 0.2; transition: opacity 0.2s ease; user-select: none;
        }
        .logo-chip:hover { opacity: 0.4; }
      `}</style>

            {/* Canvas gradient BG */}
            <GradientCanvas />

            {/* Vignette */}
            <div
                aria-hidden="true"
                style={{
                    position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
                    background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(15,10,30,0) 0%, #06050a 72%)",
                }}
            />

            {/* Nav */}
            <Navbar scrolled={scrolled} />

            {/* ── Main hero ── */}
            <section
                style={{
                    position: "relative", zIndex: 10,
                    minHeight: "100vh",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    alignItems: "center",
                    maxWidth: 1140,
                    margin: "0 auto",
                    padding: "100px 40px 80px",
                    gap: 64,
                }}
            >
                {/* Left: copy */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    {/* Badge */}
                    <div
                        className="anim-1"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            padding: "6px 14px 6px 10px", borderRadius: 999, marginBottom: 28,
                            background: "rgba(99,73,228,0.10)", border: "1px solid rgba(99,73,228,0.24)",
                            backdropFilter: "blur(12px)",
                        }}
                    >
                        <div
                            className="glow-dot"
                            style={{
                                width: 6, height: 6, borderRadius: "50%",
                                background: "#a78bfa",
                                boxShadow: "0 0 8px rgba(167,139,250,0.9)",
                            }}
                        />
                        <span style={{ fontSize: 12, fontWeight: 500, color: "#c4b5fd", letterSpacing: "0.01em" }}>
                            AI-powered · Instant feedback · Free to start
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="anim-2"
                        style={{
                            fontSize: "clamp(38px, 4.5vw, 52px)",
                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: "-0.04em",
                            marginBottom: 22,
                            background: "linear-gradient(155deg, #ffffff 0%, #ffffff 42%, rgba(196,181,253,0.75) 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            textAlign: "left",
                        }}
                    >
                        Land your dream job
                        <br />
                        with a resume that
                        <br />
                        <span style={{
                            background: "linear-gradient(90deg, #a78bfa, #818cf8, #60a5fa)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}>
                            gets past ATS.
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="anim-3"
                        style={{
                            fontSize: "clamp(15px, 1.8vw, 17.5px)",
                            lineHeight: 1.7,
                            color: "#7c7a92",
                            maxWidth: 460,
                            marginBottom: 36,
                            letterSpacing: "-0.01em",
                            textAlign: "left",
                        }}
                    >
                        Upload your resume, paste a job description, and get an instant AI review —
                        keyword gaps, ATS score, bullet rewrites, and actionable fixes in seconds.
                    </p>

                    {/* CTA row */}
                    <div className="anim-4" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 44 }}>
                        <Link href="#" className="btn-main">
                            Analyse my resume free
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                <path d="M3 7.5H12M12 7.5L8.5 4M12 7.5L8.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link href="#" className="btn-ghost">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M6 5.5L10 7.5L6 9.5V5.5Z" fill="currentColor" />
                            </svg>
                            See it in action
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="anim-5" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <StatPill value="50k+" label="Resumes reviewed" />
                        <StatPill value="3×" label="More interviews" />
                        <StatPill value="< 10s" label="Instant results" />
                    </div>
                </div>

                {/* Right: floating card */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    {/* Glow behind card */}
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            width: 320, height: 320,
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(99,73,228,0.18) 0%, transparent 70%)",
                            filter: "blur(40px)",
                            zIndex: 0,
                        }}
                    />
                    <div className="float-card" style={{ position: "relative", zIndex: 1, width: "100%" }}>
                        <FloatingCard />
                    </div>
                </div>
            </section>

            {/* ── Trust strip ── */}
            <div
                style={{
                    position: "relative", zIndex: 10,
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    padding: "28px 24px",
                }}
            >
                <div
                    style={{
                        maxWidth: 900, margin: "0 auto",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
                    }}
                >
                    <p style={{ fontSize: 11, fontWeight: 500, color: "#2d2b42", letterSpacing: "0.09em", textTransform: "uppercase" }}>
                        Helped candidates land roles at
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 36, alignItems: "center" }}>
                        {["Google", "Meta", "Stripe", "Notion", "Figma", "Shopify"].map((co) => (
                            <span key={co} className="logo-chip">{co}</span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}