// Update your existing Navbar with these real hrefs.
// "Try free" and the logo CTA both point to /upload.
// Nav links point to landing page sections (add id= anchors on your home page
// sections when you build them, e.g. <section id="features">).
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Examples", href: "/#examples" },
    { label: "Blog", href: "/blog" },
] as const;

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

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
                {/* Logo → home */}
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
                        ResumeAI
                    </span>
                </Link>

                {/* Center links */}
                <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
                    {NAV_LINKS.map((l) => (
                        <Link
                            key={l.label}
                            href={l.href}
                            style={{
                                fontSize: 13.5, fontWeight: 450, color: "#7c7a92",
                                textDecoration: "none", letterSpacing: "-0.01em",
                                transition: "color 0.15s ease",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#d4d2e8")}
                            onMouseLeave={e => (e.currentTarget.style.color = "#7c7a92")}
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>

                {/* Right: sign in + CTA */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Link
                        href="/sign-in"
                        style={{
                            fontSize: 13.5, fontWeight: 450, color: "#7c7a92",
                            textDecoration: "none", letterSpacing: "-0.01em",
                            transition: "color 0.15s ease",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#d4d2e8")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#7c7a92")}
                    >
                        Sign in
                    </Link>

                    {/* "Try free" → upload page */}
                    <Link
                        href=""
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