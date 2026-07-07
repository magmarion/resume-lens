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
            className={`fixed top-0 left-0 right-0 z-100 h-14.5 flex items-center transition-[background,border-color] duration-300 ease-[ease] ${scrolled
                    ? "bg-[rgba(6,5,10,0.80)] backdrop-blur-[20px] saturate-[1.4] border-b border-white/7"
                    : "bg-transparent backdrop-blur-none border-b border-transparent"
                }`}
        >
            <div className="max-w-280 mx-auto px-6 w-full flex items-center justify-between">
                {/* Logo → home */}
                <Link href="/" className="flex items-center gap-2 no-underline">
                    <div className="size-7 rounded-lg bg-linear-to-br from-[#6349e4] to-[#a78bfa] flex items-center justify-center shadow-[0_0_14px_rgba(99,73,228,0.45)]">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path
                                d="M4 10.5L7 3.5L10 10.5"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 8.5H9"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <span className="text-[#f1f0f5] font-[650] text-[15px] tracking-[-0.03em]">
                        ResumeAI
                    </span>
                </Link>

                {/* Center links */}
                <div className="flex gap-7 items-center">
                    {NAV_LINKS.map((l) => (
                        <Link
                            key={l.label}
                            href={l.href}
                            className="text-[13.5px] font-[450] text-[#7c7a92] no-underline tracking-[-0.01em] transition-colors duration-150 hover:text-[#d4d2e8]"
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>

                {/* Right: sign in + CTA */}
                <div className="flex items-center gap-2.5">
                    <Link
                        href="/sign-in"
                        className="text-[13.5px] font-[450] text-[#7c7a92] no-underline tracking-[-0.01em] transition-colors duration-150 hover:text-[#d4d2e8]"
                    >
                        Sign in
                    </Link>

                    <Link
                        href="/upload"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[9px] bg-linear-to-br from-[#6349e4] to-[#818cf8] text-white text-[13px] font-semibold tracking-[-0.01em] no-underline shadow-[0_0_0_1px_rgba(99,73,228,0.4),0_4px_16px_rgba(99,73,228,0.3)] transition-[opacity,transform] duration-200 ease-[ease] hover:opacity-[0.88] hover:translate-y-px"
                    >
                        Try free
                    </Link>
                </div>
            </div>
        </nav>
    );
}