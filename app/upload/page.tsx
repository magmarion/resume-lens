"use client";

import Link from "next/link";
import UploadBox from "@/components/upload/UploadBox";
import { HeroBackground } from "@/components/home/HeroBackground";

export default function UploadPage() {
    return (
        <>
            <HeroBackground />
            <div aria-hidden="true" className="bg-vignette fixed inset-0 z-1 pointer-events-none" />

            <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-16 pt-24 sm:pt-22.5">
                {/* Back link */}
                <div className="anim-1 absolute left-5 top-16 sm:left-8 sm:top-18">
                    <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-mist-800 transition-colors hover:text-brand-400">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                    </Link>
                </div>

                {/* Step badge */}
                <div className="anim-1 badge-pill mb-6 border-brand-600/22 bg-brand-600/10 sm:mb-7">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-400">Step 1 of 4</span>
                    <span className="h-2.5 w-px bg-brand-400/30" />
                    <span className="text-[11px] font-medium text-mist-600">Upload Resume</span>
                </div>

                <div className="mb-9 max-w-140 text-center sm:mb-10">
                    <h1 className="anim-2 text-gradient-brand mb-3.5 text-[clamp(28px,6vw,52px)] font-extrabold leading-[1.08] tracking-[-0.04em]">
                        Upload your resume
                    </h1>
                    <p className="anim-3 text-[clamp(13.5px,2vw,17px)] leading-[1.7] tracking-tight text-mist-600">
                        We&apos;ll extract the text and run it through our AI reviewer.
                        <br className="hidden sm:block" />
                        Your file is never stored — only the text is analysed.
                    </p>
                </div>

                <div className="anim-3 w-full max-w-130">
                    <UploadBox />
                </div>

                {/* Step progress strip */}
                <div className="anim-3 mt-9 flex flex-wrap items-center justify-center gap-2 sm:mt-10">
                    {[
                        { step: "1", label: "Upload", active: true },
                        { step: "2", label: "Job Desc", active: false },
                        { step: "3", label: "Review", active: false },
                        { step: "4", label: "Analyse", active: false },
                    ].map((item, i) => (
                        <div key={item.step} className="flex items-center gap-2">
                            {i > 0 && <div className="h-px w-5 bg-white/8 sm:w-6" />}
                            <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 sm:px-3 ${item.active ? "border-brand-600/25 bg-brand-600/12" : "border-white/6 bg-transparent"
                                }`}>
                                <div className={`flex h-4.5 w-4.5 items-center justify-center rounded-full text-[10px] font-bold ${item.active ? "bg-brand-400/25 text-brand-400" : "bg-white/5 text-mist-950"
                                    }`}>
                                    {item.step}
                                </div>
                                <span className={`text-xs font-medium tracking-tight ${item.active ? "text-brand-400" : "text-mist-950"}`}>
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