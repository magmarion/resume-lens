import Link from "next/link";
import { StatPill } from "./StatPill";
import { BADGE_TEXT } from "./hero.constants";

export function HeroContent() {
    return (
        <div className="flex flex-col items-start">
            {/* Badge */}
            <div className="anim-1 inline-flex items-center gap-2 py-1.5 pl-2.5 pr-3.5 rounded-full mb-7 bg-violet-600/10 border border-violet-600/24 backdrop-blur-xl">
                <div className="glow-dot w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                <span className="text-[12px] font-medium text-[#c4b5fd] tracking-[0.01em]">
                    {BADGE_TEXT}
                </span>
            </div>

            {/* Headline */}
            <h1 className="anim-2 text-[clamp(38px,4.5vw,52px)] font-extrabold leading-[1.05] tracking-[-0.04em] mb-5.5 bg-linear-to-b from-white via-white to-[rgba(196,181,253,0.75)] bg-clip-text text-transparent text-left">
                Land your dream job
                <br />
                with a resume that
                <br />
                <span className="bg-linear-to-r from-[#a78bfa] via-[#818cf8] to-[#60a5fa] bg-clip-text text-transparent">
                    gets past ATS.
                </span>
            </h1>

            {/* Subtitle */}
            <p className="anim-3 text-[clamp(15px,1.8vw,17.5px)] leading-[1.7] text-[#7c7a92] max-w-115 mb-9 tracking-[-0.01em] text-left">
                Upload your resume, paste a job description, and get an instant AI review —
                keyword gaps, ATS score, bullet rewrites, and actionable fixes in seconds.
            </p>

            {/* CTA row — only "Analyse my resume free" navigates to /upload */}
            <div className="anim-4 flex flex-wrap gap-2.5 mb-11">
                <Link href="/upload" className="btn-main">
                    Analyse my resume free
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                        <path
                            d="M3 7.5H12M12 7.5L8.5 4M12 7.5L8.5 11"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
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
            <div className="anim-5 flex gap-2.5 flex-wrap">
                <StatPill value="50k+" label="Resumes reviewed" />
                <StatPill value="3×" label="More interviews" />
                <StatPill value="< 10s" label="Instant results" />
            </div>
        </div>
    );
}