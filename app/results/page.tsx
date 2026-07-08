"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HeroBackground } from "@/components/home/HeroBackground";

interface ResumeData {
    text: string;
    pageCount: number;
    wordCount: number;
    fileName: string;
    uploadedAt: string;
}

function readSessionData(): { resume: ResumeData | null; pdfUrl: string | null } {
    if (typeof window === "undefined") return { resume: null, pdfUrl: null };
    try {
        const raw = sessionStorage.getItem("resumeData");
        const pdfUrl = sessionStorage.getItem("resumePdfDataUrl");
        if (!raw) return { resume: null, pdfUrl: null };
        return { resume: JSON.parse(raw) as ResumeData, pdfUrl };
    } catch {
        return { resume: null, pdfUrl: null };
    }
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

export default function ResultsPage() {
    const [{ resume, pdfUrl }] = useState(readSessionData);

    if (!resume) return <RedirectToUpload />;

    const uploadTime = new Date(resume.uploadedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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

                {/* Badge */}
                <div className="anim-1 badge-pill mb-6 border-brand-600/22 bg-brand-600/10">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-400">Step 2 of 3</span>
                    <span className="h-2.5 w-px bg-brand-400/30" />
                    <span className="text-[11px] font-medium text-mist-600">Review &amp; Confirm</span>
                </div>

                <h1 className="anim-2 text-gradient-brand mb-2 text-center text-[clamp(24px,5vw,42px)] font-extrabold tracking-[-0.04em]">
                    Does this look right?
                </h1>
                <p className="anim-2 mb-9 text-center text-sm text-mist-800 sm:mb-10 sm:text-[15px]">
                    Confirm your resume looks correct before we analyse it
                </p>

                {/* Two columns on desktop, stacked on mobile */}
                <div className="anim-3 grid w-full max-w-245 grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_320px]">
                    {/* PDF viewer */}
                    <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/2 shadow-[0_0_0_1px_rgba(0,0,0,0.3),0_24px_60px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-2 border-b border-white/6 bg-black/20 px-4 py-2.5">
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" className="shrink-0">
                                <rect x="1.5" y="1.5" width="10" height="10" rx="1.5" stroke="#52506a" strokeWidth="1.2" />
                                <path d="M4 4.5H9M4 6.5H9M4 8.5H7" stroke="#52506a" strokeWidth="1" strokeLinecap="round" />
                            </svg>
                            <span className="flex-1 truncate text-xs text-mist-800">{resume.fileName}</span>
                            <span className="shrink-0 text-[11px] text-mist-950">{resume.pageCount}p</span>
                        </div>
                        {pdfUrl ? (
                            <iframe src={pdfUrl} title="Resume PDF preview" className="block h-105 w-full border-none bg-ink-800 sm:h-140 lg:h-170" />
                        ) : (
                            <div className="flex h-105 flex-col items-center justify-center gap-3 bg-ink-900 text-mist-950 sm:h-140 lg:h-170">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                                    <rect x="4" y="2" width="18" height="26" rx="2.5" stroke="#3d3b52" strokeWidth="1.5" />
                                    <path d="M8 9H18M8 13H18M8 17H14" stroke="#3d3b52" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <span className="text-[13px]">PDF preview unavailable</span>
                                <span className="text-[11px] text-mist-950">Text was extracted successfully</span>
                            </div>
                        )}
                    </div>

                    {/* Right panel */}
                    <div className="flex flex-col gap-3">
                        {/* File info */}
                        <div className="glass-card overflow-hidden">
                            <div className="border-b border-white/6 bg-black/12 px-4 py-3.5">
                                <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-mist-950">File details</div>
                                <div className="mb-0.5 truncate text-[13px] font-semibold tracking-tight text-mist-300">{resume.fileName}</div>
                                <div className="text-[11px] text-mist-800">Uploaded at {uploadTime}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-px bg-white/4">
                                {[{ label: "Pages", value: String(resume.pageCount) }, { label: "Words", value: resume.wordCount.toLocaleString() }].map((s, i) => (
                                    <div key={s.label} className={`bg-ink-950 px-4 py-3.5 ${i === 0 ? "border-r border-white/5" : ""}`}>
                                        <div className="mb-0.5 text-xl font-bold leading-none tracking-tight text-mist-300">{s.value}</div>
                                        <div className="text-[11px] text-mist-800">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 px-4 py-3">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-success-400/25 bg-success-400/12">
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                                        <path d="M2 5.5L4.5 8L9 3" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs font-medium text-mist-400">Text extracted</div>
                                    <div className="text-[11px] text-mist-800">{resume.text.length.toLocaleString()} characters</div>
                                </div>
                            </div>
                        </div>

                        {/* Analyse CTA */}
                        <div className="rounded-2xl border border-brand-600/25 bg-brand-600/8 p-4">
                            <div className="mb-1 text-[13px] font-semibold tracking-tight text-mist-300">Ready to analyse</div>
                            <div className="mb-3.5 text-xs leading-relaxed text-mist-600">
                                Our AI will review your resume for ATS compatibility, keyword gaps, and suggest improvements.
                            </div>
                            <Link href="/analyze" className="btn-main w-full justify-center">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                    <path d="M7.5 1L9.18 5.27L13.5 6L10.5 9L11.18 13.5L7.5 11.27L3.82 13.5L4.5 9L1.5 6L5.82 5.27L7.5 1Z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
                                </svg>
                                Analyse with AI
                            </Link>
                        </div>

                        <Link href="/upload" className="flex items-center justify-center gap-1.5 rounded-[10px] border border-white/8 bg-white/4 px-4 py-2.5 text-[13px] font-medium text-mist-600 transition-colors hover:bg-white/8 hover:text-mist-400">
                            Upload a different resume
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}