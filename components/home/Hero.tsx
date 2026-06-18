"use client";
import { useState, useEffect } from "react";

const NAV_LINKS = ["Product", "Pricing", "Docs", "Blog"];

const TRUST_LOGOS = [
    { name: "Vercel", width: 72 },
    { name: "Linear", width: 60 },
    { name: "Resend", width: 68 },
    { name: "Supabase", width: 80 },
    { name: "Planetscale", width: 92 },
];

function WordmarkIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect width="22" height="22" rx="6" fill="white" fillOpacity="0.08" />
            <rect
                x="0.5"
                y="0.5"
                width="21"
                height="21"
                rx="5.5"
                stroke="white"
                strokeOpacity="0.12"
            />
            <path
                d="M6 16L11 6L16 16"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.5 13H14.5"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

function GridBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {/* Faint grid */}
            <svg
                className="absolute inset-0 w-full h-full opacity-[0.04]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="grid"
                        width="48"
                        height="48"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 48 0 L 0 0 0 48"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.5"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Central radial glow — the signature element */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -60%)",
                    width: "820px",
                    height: "520px",
                    background:
                        "radial-gradient(ellipse at center, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 42%, transparent 72%)",
                    filter: "blur(1px)",
                }}
            />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
                    backgroundSize: "256px 256px",
                    opacity: 0.4,
                }}
            />

            {/* Subtle top vignette */}
            <div
                className="absolute top-0 left-0 right-0 h-64"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(9,9,11,0.6) 0%, transparent 100%)",
                }}
            />

            {/* Bottom fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-40"
                style={{
                    background:
                        "linear-gradient(to top, rgba(9,9,11,1) 0%, transparent 100%)",
                }}
            />
        </div>
    );
}

type TrustLogoProps = {
    name: string;
    width?: string | number;
};

function TrustLogo({ name, width }: TrustLogoProps) {
    return (
        <div
            className="flex items-center justify-center opacity-30 hover:opacity-50 transition-opacity duration-300"
            style={{ minWidth: width }}
        >
            <span
                className="text-white font-semibold tracking-tight select-none"
                style={{
                    fontSize: "13px",
                    letterSpacing: "-0.02em",
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                {name}
            </span>
        </div>
    );
}

export default function SaaSHero() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: "#09090b", color: "#fafafa" }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { font-family: 'Inter', system-ui, sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }

        .btn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 11px 22px;
          border-radius: 8px;
          background: #fafafa;
          color: #09090b;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          border: none;
          cursor: pointer;
          transition: background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 0 1px 2px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08);
          white-space: nowrap;
          text-decoration: none;
        }
        .btn-primary:hover {
          background: #e4e4e7;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
        }
        .btn-primary:active { transform: translateY(0); }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 11px 18px;
          border-radius: 8px;
          background: transparent;
          color: #a1a1aa;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          transition: color 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
          white-space: nowrap;
          text-decoration: none;
        }
        .btn-secondary:hover {
          color: #fafafa;
          border-color: rgba(255,255,255,0.18);
          transform: translateY(-1px);
        }

        .nav-link {
          color: #71717a;
          font-size: 13.5px;
          font-weight: 450;
          text-decoration: none;
          transition: color 0.15s ease;
          letter-spacing: -0.01em;
          cursor: pointer;
        }
        .nav-link:hover { color: #d4d4d8; }

        .headline-gradient {
          background: linear-gradient(
            160deg,
            #ffffff 0%,
            #ffffff 45%,
            rgba(255,255,255,0.62) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .divider-fade {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent);
        }
      `}</style>

            {/* ── Navigation ───────────────────────────── */}
            <nav
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    transition: "background 0.3s ease, border-color 0.3s ease",
                    background: scrolled
                        ? "rgba(9,9,11,0.82)"
                        : "transparent",
                    backdropFilter: scrolled ? "blur(16px) saturate(1.5)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.5)" : "none",
                    borderBottom: scrolled
                        ? "1px solid rgba(255,255,255,0.07)"
                        : "1px solid transparent",
                }}
            >
                <div
                    style={{
                        maxWidth: "1120px",
                        margin: "0 auto",
                        padding: "0 24px",
                        height: "58px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Logo */}
                    <a
                        href="#"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            textDecoration: "none",
                        }}
                    >
                        <WordmarkIcon />
                        <span
                            style={{
                                color: "#fafafa",
                                fontWeight: 600,
                                fontSize: "15px",
                                letterSpacing: "-0.03em",
                            }}
                        >
                            Apex
                        </span>
                    </a>

                    {/* Links */}
                    <div
                        style={{ display: "flex", alignItems: "center", gap: "28px" }}
                        className="hidden-mobile"
                    >
                        {NAV_LINKS.map((l) => (
                            <a key={l} href="#" className="nav-link">
                                {l}
                            </a>
                        ))}
                    </div>

                    {/* Nav CTA */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <a href="#" className="nav-link" style={{ fontSize: "13.5px" }}>
                            Sign in
                        </a>
                        <a
                            href="#"
                            className="btn-primary"
                            style={{ padding: "7px 16px", fontSize: "13px" }}
                        >
                            Get started
                        </a>
                    </div>
                </div>
            </nav>

            {/* ── Hero ─────────────────────────────────── */}
            <main
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    position: "relative",
                    paddingTop: "58px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    textAlign: "center",
                    fontFamily: "'Inter', system-ui, sans-serif",
                }}
            >
                <GridBackground />

                {/* Content container */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 10,
                        maxWidth: "760px",
                        width: "100%",
                        margin: "0 auto",
                        paddingBottom: "80px",
                    }}
                >
                   

                    {/* Headline */}
                    <h1
                        className="headline-gradient"
                        style={{
                            fontSize: "clamp(44px, 7vw, 76px)",
                            fontWeight: 800,
                            lineHeight: 1.06,
                            letterSpacing: "-0.04em",
                            marginBottom: "24px",
                            animation: "fadeUp 0.55s ease both",
                            animationDelay: "80ms",
                        }}
                    >
                        Resume AI Reviewer.
                        <br />
                        Without the noise.
                    </h1>

                    {/* CTA Buttons */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            justifyContent: "center",
                            marginBottom: "52px",
                            animation: "fadeUp 0.55s ease both",
                            animationDelay: "240ms",
                        }}
                    >
                        <a href="#" className="btn-primary">
                            Start for free
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                style={{ marginTop: "0.5px" }}
                            >
                                <path
                                    d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                        <a href="#" className="btn-secondary">
                            See how it works
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}