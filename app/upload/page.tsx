"use client";

import Link from "next/link";
import UploadBox from "@/components/upload/UploadBox";
import { HeroBackground } from "@/components/home/HeroBackground";

export default function UploadPage() {
    return (
        <>
            {/* Custom animations - these need to stay in a style tag */}
            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        @media (prefers-reduced-motion: reduce) {
          .u-anim-1, .u-anim-2, .u-anim-3 {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        .u-anim-1 { animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0ms   both; }
        .u-anim-2 { animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) 90ms  both; }
        .u-anim-3 { animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) 170ms both; }
      `}</style>

            {/* Same canvas orbs as Hero */}
            <HeroBackground />

            {/* Same vignette as Hero — identical values */}
            <div
                aria-hidden="true"
                className="fixed inset-0 z-1 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(15,10,30,0) 0%, #06090a 72%)",
                }}
            />

            <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-15 pt-22.5 pb-15">
                {/* Back link — sits below the 58px fixed Navbar */}
                <div className="u-anim-1 absolute top-18 left-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#52506a] no-underline transition-colors duration-150 cursor-pointer hover:text-[#c4b5fd]"
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
                        Back to home
                    </Link>
                </div>

                {/* Step badge */}
                <div className="u-anim-1 inline-flex items-center gap-1.5 px-3 py-1.25 rounded-full mb-7 bg-violet-600/10 border border-violet-600/22">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                    <span className="text-[11px] font-semibold text-[#a78bfa] tracking-wider uppercase">
                        Step 1 of 3
                    </span>
                    <span className="w-px h-2.5 bg-violet-400/30" />
                    <span className="text-[11px] font-medium text-[#7c7a92]">Upload Resume</span>
                </div>

                {/* Heading */}
                <div className="text-center mb-10 max-w-140">
                    <h1 className="u-anim-2 text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.06] tracking-[-0.04em] mb-4 bg-linear-to-b from-white via-white to-[rgba(196,181,253,0.75)] bg-clip-text text-transparent">
                        Upload your resume
                    </h1>
                    <p className="u-anim-3 text-[clamp(14px,1.8vw,17px)] text-[#7c7a92] leading-[1.7] tracking-[-0.01em]">
                        We&apos;ll extract the text and run it through our AI reviewer.
                        <br />
                        Your file is never stored — only the text is analysed.
                    </p>
                </div>

                {/* Upload box */}
                <div className="u-anim-3 w-full max-w-130">
                    <UploadBox />
                </div>

                {/* Step progress strip */}
                <div className="u-anim-3 flex items-center gap-2 mt-10 flex-wrap justify-center">
                    {[
                        { step: "1", label: "Upload PDF", active: true },
                        { step: "2", label: "AI Analysis", active: false },
                    ].map((item, i) => (
                        <div key={item.step} className="flex items-center gap-2">
                            {i > 0 && <div className="w-6 h-px bg-white/8" />}
                            <div
                                className={`flex items-center gap-1.75 px-3 py-1.5 rounded-full border ${item.active
                                        ? "bg-violet-600/12 border-violet-600/25"
                                        : "bg-transparent border-white/6"
                                    }`}
                            >
                                <div
                                    className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-bold ${item.active
                                            ? "bg-violet-400/25 text-[#c4b5fd]"
                                            : "bg-white/5 text-[#3d3b52]"
                                        }`}
                                >
                                    {item.step}
                                </div>
                                <span
                                    className={`text-[12px] font-medium tracking-[-0.01em] ${item.active ? "text-[#c4b5fd]" : "text-[#3d3b52]"
                                        }`}
                                >
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