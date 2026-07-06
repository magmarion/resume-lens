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
            <HeroBackground />

            <div
                aria-hidden="true"
                className="fixed inset-0 z-1 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(15,10,30,0) 0%, #06090a 72%)",
                }}
            />

            <section
                className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center max-w-285 mx-auto px-10 py-25 lg:py-20 gap-16"
            >
                {/* Left: copy */}
                <HeroContent />

                {/* Right: floating card */}
                <div className="flex items-center relative justify-self-end">
                    {/* Glow behind card */}
                    <div
                        aria-hidden="true"
                        className="absolute w-80 h-80 rounded-full blur-4xl z-0"
                        style={{
                            background: "radial-gradient(circle, rgba(99,73,228,0.18) 0%, transparent 70%)",
                        }}
                    />
                    <div className="float-card relative z-1 w-full">
                        <FloatingCard />
                    </div>
                </div>
            </section>

            {/* ── Trust strip ── */}
            <TrustStrip />
        </>
    );
}