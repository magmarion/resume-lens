import Link from "next/link";
import { StatPill } from "./StatPill";
import { BADGE_TEXT } from "./hero.constants";

export function HeroContent() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {/* Badge */}
            <div
                className="anim-1"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 14px 6px 10px",
                    borderRadius: 999,
                    marginBottom: 28,
                    background: "rgba(99,73,228,0.10)",
                    border: "1px solid rgba(99,73,228,0.24)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <div
                    className="glow-dot"
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#a78bfa",
                        boxShadow: "0 0 8px rgba(167,139,250,0.9)",
                    }}
                />
                <span style={{ fontSize: 12, fontWeight: 500, color: "#c4b5fd", letterSpacing: "0.01em" }}>
                    {BADGE_TEXT}
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
                <span
                    style={{
                        background: "linear-gradient(90deg, #a78bfa, #818cf8, #60a5fa)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
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
    );
}