"use client";

import { useState, useEffect } from "react";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { FloatingCard } from "./FloatingCard";
import { TrustStrip } from "./TrustStrip";

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

                *,
                *::before,
                *::after {
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    background: #06050a;
                    color: #f1f0f5;
                    overflow-x: hidden;
                }

                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(22px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes glowPulse {
                    0%,
                    100% {
                        opacity: 0.55;
                    }
                    50% {
                        opacity: 1;
                    }
                }

                @keyframes floatCard {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .anim,
                    .float-card {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }

                .anim-1 {
                    animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0ms both;
                }
                .anim-2 {
                    animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) 90ms both;
                }
                .anim-3 {
                    animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) 170ms both;
                }
                .anim-4 {
                    animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) 250ms both;
                }
                .anim-5 {
                    animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) 330ms both;
                }
                .float-card {
                    animation: floatCard 5s ease-in-out infinite;
                }

                .btn-main {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 13px 26px;
                    border-radius: 10px;
                    font-size: 15px;
                    font-weight: 600;
                    letter-spacing: -0.015em;
                    text-decoration: none;
                    white-space: nowrap;
                    cursor: pointer;
                    border: none;
                    background: linear-gradient(135deg, #6349e4 0%, #818cf8 60%, #a78bfa 100%);
                    color: #fff;
                    box-shadow: 0 0 0 1px rgba(99, 73, 228, 0.35), 0 6px 24px rgba(99, 73, 228, 0.40),
                        inset 0 1px 0 rgba(255, 255, 255, 0.15);
                    transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
                }
                .btn-main:hover {
                    opacity: 0.88;
                    transform: translateY(-2px);
                    box-shadow: 0 0 0 1px rgba(99, 73, 228, 0.45), 0 12px 36px rgba(99, 73, 228, 0.50),
                        inset 0 1px 0 rgba(255, 255, 255, 0.18);
                }
                .btn-main:active {
                    transform: translateY(0);
                }

                .btn-ghost {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 13px 22px;
                    border-radius: 10px;
                    font-size: 15px;
                    font-weight: 500;
                    letter-spacing: -0.015em;
                    text-decoration: none;
                    white-space: nowrap;
                    cursor: pointer;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.11);
                    color: #c4c2d4;
                    backdrop-filter: blur(8px);
                    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
                }
                .btn-ghost:hover {
                    background: rgba(255, 255, 255, 0.09);
                    border-color: rgba(255, 255, 255, 0.18);
                    color: #f1f0f5;
                    transform: translateY(-2px);
                }

                .glow-dot {
                    animation: glowPulse 2.4s ease-in-out infinite;
                }

                .logo-chip {
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 0.03em;
                    text-transform: uppercase;
                    color: #fff;
                    opacity: 0.2;
                    transition: opacity 0.2s ease;
                    user-select: none;
                }
                .logo-chip:hover {
                    opacity: 0.4;
                }
            `}</style>

            {/* Canvas gradient BG */}
            <HeroBackground />

            {/* Vignette */}
            <div
                aria-hidden="true"
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: "none",
                    background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(15,10,30,0) 0%, #06050a 72%)",
                }}
            />

            {/* ── Main hero ── */}
            <section
                style={{
                    position: "relative",
                    zIndex: 10,
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
                <HeroContent />

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
                            width: 320,
                            height: 320,
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
            <TrustStrip />
        </>
    );
}