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
    useState(() => {
        router.replace("/upload");
    });
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#06050a]">
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div className="flex items-center gap-2.5">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    className="animate-spin"
                    style={{ animationDuration: "0.8s" }}
                    aria-hidden="true"
                >
                    <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    <path d="M9 2A7 7 0 0 1 16 9" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-[14px] text-[#52506a] font-[Inter,system-ui,sans-serif]">Redirecting…</span>
            </div>
        </main>
    );
}

export default function ResultsPage() {
    const [{ resume, pdfUrl }] = useState(readSessionData);

    if (!resume) return <RedirectToUpload />;

    const uploadTime = new Date(resume.uploadedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <>
            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .r-anim-1 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0ms   both; }
        .r-anim-2 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 80ms  both; }
        .r-anim-3 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 160ms both; }
        .r-anim-4 { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 240ms both; }
        @media (prefers-reduced-motion: reduce) {
          .r-anim-1,.r-anim-2,.r-anim-3,.r-anim-4 { animation: none !important; opacity: 1 !important; }
        }
        .btn-analyse {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 12px 20px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6349e4 0%, #818cf8 60%, #a78bfa 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          border: none;
          cursor: pointer;
          box-shadow: 0 0 0 1px rgba(99,73,228,0.35), 0 6px 24px rgba(99,73,228,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
        }
        .btn-analyse:hover {
          opacity: 0.88;
          transform: translateY(-1px);
          box-shadow: 0 0 0 1px rgba(99,73,228,0.45), 0 10px 32px rgba(99,73,228,0.5), inset 0 1px 0 rgba(255,255,255,0.18);
        }
      `}</style>

            <HeroBackground />
            <div
                aria-hidden="true"
                className="fixed inset-0 z-1 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(15,10,30,0) 0%, #06090a 72%)",
                }}
            />

            <main className="relative z-10 min-h-screen flex flex-col items-center px-6 pt-22.5 pb-15">
                {/* Back */}
                <div className="r-anim-1 absolute top-18 left-8">
                    <Link
                        href="/upload"
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#52506a] no-underline transition-colors duration-150 hover:text-[#c4b5fd]"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path
                                d="M9 2L4 7L9 12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Back
                    </Link>
                </div>

                {/* Badge */}
                <div className="r-anim-1 inline-flex items-center gap-1.5 px-3 py-1.25 rounded-full mb-6 bg-violet-600/10 border border-violet-600/22">
                    <div className="size-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                    <span className="text-[11px] font-semibold text-[#a78bfa] tracking-wider uppercase">
                        Step 2 of 3
                    </span>
                    <span className="w-px h-2.5 bg-violet-400/30" />
                    <span className="text-[11px] font-medium text-[#7c7a92]">Review &amp; Confirm</span>
                </div>

                <h1 className="r-anim-2 text-[clamp(26px,4vw,42px)] font-extrabold tracking-[-0.04em] text-center mb-2 bg-linear-to-b from-white via-white to-[rgba(196,181,253,0.75)] bg-clip-text text-transparent">
                    Does this look right?
                </h1>
                <p className="r-anim-2 text-[15px] text-[#52506a] text-center mb-9 tracking-[-0.01em]">
                    Confirm your resume looks correct before we analyse it
                </p>

                <div className="r-anim-3 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 w-full max-w-245 items-start">
                    {/* PDF viewer */}
                    <div className="rounded-2xl overflow-hidden border border-white/8 bg-white/2 shadow-[0_0_0_1px_rgba(0,0,0,0.3),0_24px_60px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/6 bg-black/20">
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                                <rect x="1.5" y="1.5" width="10" height="10" rx="1.5" stroke="#52506a" strokeWidth="1.2" />
                                <path d="M4 4.5H9M4 6.5H9M4 8.5H7" stroke="#52506a" strokeWidth="1" strokeLinecap="round" />
                            </svg>
                            <span className="text-[12px] text-[#52506a] flex-1 truncate">{resume.fileName}</span>
                            <span className="text-[11px] text-[#3d3b52]">{resume.pageCount}p</span>
                        </div>
                        {pdfUrl ? (
                            <iframe
                                src={pdfUrl}
                                title="Resume PDF preview"
                                className="w-full h-170 border-none block bg-[#1a1825]"
                            />
                        ) : (
                            <div className="h-170 flex flex-col items-center justify-center gap-3 bg-[#0e0d16] text-[#3d3b52]">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                                    <rect x="4" y="2" width="18" height="26" rx="2.5" stroke="#3d3b52" strokeWidth="1.5" />
                                    <path d="M8 9H18M8 13H18M8 17H14" stroke="#3d3b52" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <span className="text-[13px]">PDF preview unavailable</span>
                                <span className="text-[11px] text-[#2d2b42]">Text was extracted successfully</span>
                            </div>
                        )}
                    </div>

                    {/* Right panel */}
                    <div className="flex flex-col gap-3">
                        {/* File info */}
                        <div className="rounded-xl border border-white/8 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-lg overflow-hidden">
                            <div className="p-[14px_16px] border-b border-white/6 bg-black/12">
                                <div className="text-[10px] font-semibold text-[#3d3b52] tracking-[0.08em] uppercase mb-2.5">
                                    File details
                                </div>
                                <div className="text-[13px] font-semibold text-[#e8e5f5] tracking-[-0.01em] mb-0.75 truncate">
                                    {resume.fileName}
                                </div>
                                <div className="text-[11px] text-[#52506a]">Uploaded at {uploadTime}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-px bg-white/4">
                                {[
                                    { label: "Page(s)", value: String(resume.pageCount) },
                                    { label: "Words", value: resume.wordCount.toLocaleString() },
                                ].map((s, i) => (
                                    <div
                                        key={s.label}
                                        className={`p-[14px_16px] bg-[#06050a] ${i === 0 ? "border-r border-white/5" : ""
                                            }`}
                                    >
                                        <div className="text-[20px] font-bold text-[#e8e5f5] tracking-[-0.03em] leading-none mb-0.75">
                                            {s.value}
                                        </div>
                                        <div className="text-[11px] text-[#52506a]">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 px-4 flex items-center gap-2">
                                <div className="size-6 rounded-full shrink-0 bg-emerald-400/12 border border-emerald-400/25 flex items-center justify-center">
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                                        <path
                                            d="M2 5.5L4.5 8L9 3"
                                            stroke="#34d399"
                                            strokeWidth="1.4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[12px] font-medium text-[#c4c2d4]">Text extracted</div>
                                    <div className="text-[11px] text-[#52506a]">
                                        {resume.text.length.toLocaleString()} characters
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Analyse CTA */}
                        <div className="rounded-xl border border-violet-600/25 bg-violet-600/8 p-4">
                            <div className="text-[13px] font-semibold text-[#e8e5f5] mb-1 tracking-[-0.01em]">
                                Ready to analyse
                            </div>
                            <div className="text-[12px] text-[#7c7a92] leading-[1.55] mb-3.5">
                                Our AI will review your resume for ATS compatibility, keyword gaps, and suggest improvements.
                            </div>
                            <Link href="/analyze" className="btn-analyse">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                    <path
                                        d="M7.5 1L9.18 5.27L13.5 6L10.5 9L11.18 13.5L7.5 11.27L3.82 13.5L4.5 9L1.5 6L5.82 5.27L7.5 1Z"
                                        stroke="white"
                                        strokeWidth="1.3"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Analyse with AI
                            </Link>
                        </div>

                        <Link
                            href="/upload"
                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[10px] bg-white/4 border border-white/8 text-[#7c7a92] text-[13px] font-medium no-underline transition-all duration-200 text-center hover:bg-white/8 hover:text-[#c4c2d4]"
                        >
                            Upload a different resume
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}