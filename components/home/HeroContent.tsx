"use client";

import { StatPill } from "./StatPill";
import { BADGE_TEXT } from "./hero.constants";
import AuthGateLink from "@/components/auth/AuthGateLink";
import Link from "next/link";

export function HeroContent() {
    return (
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Badge */}
            <div className="anim-1 badge-pill mb-6 border-brand-600/24 bg-brand-600/10 sm:mb-7">
                <div className="glow-dot h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                <span className="text-xs font-medium tracking-wide text-brand-400/90">{BADGE_TEXT}</span>
            </div>

            <h1 className="anim-2 text-gradient-brand mb-5 text-[clamp(34px,7vw,52px)] font-extrabold leading-[1.06] tracking-[-0.04em] sm:mb-5.5">
                Land your dream job
                <br />
                with a resume that
                <br />
                <span className="text-gradient-violet">gets past ATS.</span>
            </h1>

            <p className="anim-3 mb-8 max-w-115 text-[clamp(14px,2vw,17.5px)] leading-[1.7] tracking-tight text-mist-600 sm:mb-9">
                Upload your resume, paste a job description, and get an instant AI review —
                keyword gaps, ATS score, bullet rewrites, and actionable fixes in seconds.
            </p>

            <div className="anim-4 mb-10 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:mb-11">
                <AuthGateLink href="/upload" className="btn-main justify-center sm:justify-start">
                    Analyse my resume free
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                        <path d="M3 7.5H12M12 7.5L8.5 4M12 7.5L8.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </AuthGateLink>
                <Link href="#" className="btn-ghost justify-center sm:justify-start">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                        <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M6 5.5L10 7.5L6 9.5V5.5Z" fill="currentColor" />
                    </svg>
                    See it in action
                </Link>
            </div>

            <div className="anim-5 flex flex-wrap justify-center gap-2.5 sm:justify-start">
                <StatPill value="50k+" label="Resumes reviewed" />
                <StatPill value="3×" label="More interviews" />
                <StatPill value="< 10s" label="Instant results" />
            </div>
        </div>
    );
}