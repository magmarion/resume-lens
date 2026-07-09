"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HeroBackground } from "@/components/home/HeroBackground";

const MAX_JD_CHARS = 6000;

function hasResumeData(): boolean {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("resumeData") !== null;
}

function RedirectToUpload() {
    const router = useRouter();
    useState(() => { router.replace("/upload"); });
    return (
        <main className="flex min-h-screen items-center justify-center bg-ink-950">
            <div className="flex items-center gap-2.5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="animate-spin-slow">
                    <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    <path d="M9 2A7 7 0 0 1 16 9" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-sm text-mist-800">Redirecting…</span>
            </div>
        </main>
    );
}

export default function JobDescriptionPage() {
    const router = useRouter();
    const [hasResume] = useState(hasResumeData);
    const [jd, setJd] = useState("");

    if (!hasResume) return <RedirectToUpload />;

    const charCount = jd.length;
    const isOverLimit = charCount > MAX_JD_CHARS;

    function goToResults() {
        const trimmed = jd.trim();
        if (trimmed) {
            sessionStorage.setItem("jobDescription", trimmed.slice(0, MAX_JD_CHARS));
        } else {
            sessionStorage.removeItem("jobDescription");
        }
        router.push("/results");
    }

    function skip() {
        sessionStorage.removeItem("jobDescription");
        router.push("/results");
    }

    return (
        <>
            <HeroBackground />
            <div aria-hidden="true" className="bg-vignette fixed inset-0 z-1 pointer-events-none" />

            <main className="relative z-10 flex min-h-screen flex-col items-center px-4 pb-16 pt-24 sm:px-6 sm:pt-22.5">
                {/* Back */}
                <div className="anim-1 absolute left-5 top-16 sm:left-8 sm:top-18">
                    <Link href="/upload" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-mist-800 transition-colors hover:text-brand-400">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                    </Link>
                </div>

                {/* Step badge */}
                <div className="anim-1 badge-pill mb-6 border-brand-600/22 bg-brand-600/10">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-400">Step 2 of 4</span>
                    <span className="h-2.5 w-px bg-brand-400/30" />
                    <span className="text-[11px] font-medium text-mist-600">Job Description</span>
                </div>

                {/* Heading */}
                <div className="mb-8 max-w-140 text-center sm:mb-9">
                    <h1 className="anim-2 text-gradient-brand mb-3.5 text-[clamp(26px,5.5vw,44px)] font-extrabold leading-[1.1] tracking-[-0.04em]">
                        Got a job in mind?
                    </h1>
                    <p className="anim-3 text-[clamp(13.5px,2vw,16px)] leading-[1.7] tracking-tight text-mist-600">
                        Paste the job description and we&apos;ll show you exactly how well your resume
                        matches — plus what keywords you&apos;re missing.
                        <br className="hidden sm:block" />
                        This step is optional.
                    </p>
                </div>

                {/* Textarea card */}
                <div className="anim-3 w-full max-w-160">
                    <div className="glass-card overflow-hidden">
                        <div className="flex items-center justify-between border-b border-white/6 bg-black/12 px-4 py-2.5">
                            <div className="flex items-center gap-2">
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                                    <rect x="1.5" y="1.5" width="10" height="10" rx="1.5" stroke="#52506a" strokeWidth="1.2" />
                                    <path d="M4 4.5H9M4 6.5H9M4 8.5H7" stroke="#52506a" strokeWidth="1" strokeLinecap="round" />
                                </svg>
                                <span className="text-xs text-mist-800">Job description</span>
                            </div>
                            <span className={`text-[11px] ${isOverLimit ? "text-danger-400" : "text-mist-950"}`}>
                                {charCount.toLocaleString()} / {MAX_JD_CHARS.toLocaleString()}
                            </span>
                        </div>

                        <textarea
                            value={jd}
                            onChange={(e) => setJd(e.target.value)}
                            placeholder="Paste the full job posting here — title, responsibilities, requirements, everything. The more context, the better the match analysis."
                            className="h-155 w-full resize-none bg-transparent px-4 py-3.5 text-[13.5px] leading-relaxed text-mist-300 placeholder:text-mist-950 focus:outline-none sm:h-65"
                            maxLength={MAX_JD_CHARS + 500}
                        />
                    </div>

                    {isOverLimit && (
                        <p className="mt-2 text-xs text-danger-400">
                            That&apos;s a long posting — only the first {MAX_JD_CHARS.toLocaleString()} characters will be used.
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="anim-4 mt-6 flex w-full max-w-160 flex-col gap-2.5 sm:flex-row sm:justify-end">
                    <button
                        onClick={skip}
                        className="rounded-[10px] border border-white/8 bg-white/4 px-5 py-3 text-[13.5px] font-medium text-mist-600 transition-colors hover:bg-white/8 hover:text-mist-400 sm:order-1"
                    >
                        Skip this step
                    </button>
                    <button
                        onClick={goToResults}
                        className="btn-main justify-center sm:order-2"
                    >
                        {jd.trim() ? "Continue with this job" : "Continue"}
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                            <path d="M3 7.5H12M12 7.5L8.5 4M12 7.5L8.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Step progress strip */}
                <div className="anim-4 mt-10 flex flex-wrap items-center justify-center gap-2">
                    {[
                        { step: "1", label: "Upload", active: false, done: true },
                        { step: "2", label: "Job Desc", active: true, done: false },
                        { step: "3", label: "Review", active: false, done: false },
                        { step: "4", label: "Analyse", active: false, done: false },
                    ].map((item, i) => (
                        <div key={item.step} className="flex items-center gap-2">
                            {i > 0 && <div className="h-px w-5 bg-white/8 sm:w-6" />}
                            <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 sm:px-3 ${item.active ? "border-brand-600/25 bg-brand-600/12" : item.done ? "border-success-400/20 bg-success-400/8" : "border-white/6 bg-transparent"
                                }`}>
                                <div className={`flex h-4.5 w-4.5 items-center justify-center rounded-full text-[10px] font-bold ${item.active ? "bg-brand-400/25 text-brand-400" : item.done ? "bg-success-400/20 text-success-400" : "bg-white/5 text-mist-950"
                                    }`}>
                                    {item.done ? (
                                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                                            <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ) : item.step}
                                </div>
                                <span className={`text-xs font-medium tracking-tight ${item.active ? "text-brand-400" : item.done ? "text-success-400" : "text-mist-950"}`}>
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