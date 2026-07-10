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
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <nav
            className={`fixed inset-x-0 top-0 z-100 flex h-14.5 items-center transition-all duration-300 ${scrolled ? "bg-ink-950/80 backdrop-blur-xl backdrop-saturate-150 border-b border-white/7" : "bg-transparent border-b border-transparent"
                }`}
        >
            <div className="mx-auto flex w-full max-w-280 items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold tracking-tight text-mist-200">Resume Lens</span>
                </Link>

                {/* Desktop links */}
                <div className="hidden items-center gap-7 md:flex">
                    {NAV_LINKS.map((l) => (
                        <Link key={l.label} href={l.href} className="text-[13.5px] font-normal tracking-tight text-mist-600 transition-colors hover:text-mist-400">
                            {l.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop right */}
                <div className="hidden items-center gap-2.5 md:flex">
                    <Link href="/sign-in" className="text-[13.5px] font-normal tracking-tight text-mist-600 transition-colors hover:text-mist-400">
                        Sign in
                    </Link>
                    <Link
                        href="/upload"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-linear-to-br from-brand-600 to-brand-500 px-4 py-2 text-[13px] font-semibold tracking-tight text-white shadow-[0_0_0_1px_rgba(99,73,228,0.4),0_4px_16px_rgba(99,73,228,0.3)] transition-all hover:-translate-y-px hover:opacity-90"
                    >
                        Try free
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className="flex items-center justify-center rounded-lg p-2 text-mist-400 md:hidden"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        {mobileOpen ? (
                            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        ) : (
                            <path d="M3 6H17M3 10H17M3 14H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className="absolute inset-x-0 top-14.5 flex flex-col gap-1 border-b border-white/7 bg-ink-950/95 p-4 backdrop-blur-xl md:hidden">
                    {NAV_LINKS.map((l) => (
                        <Link
                            key={l.label}
                            href={l.href}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-3 py-2.5 text-sm font-medium text-mist-500 transition-colors hover:bg-white/5 hover:text-mist-300"
                        >
                            {l.label}
                        </Link>
                    ))}
                    <div className="my-2 h-px bg-white/6" />
                    <Link
                        href="/sign-in"
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-mist-500 transition-colors hover:bg-white/5 hover:text-mist-300"
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/upload"
                        onClick={() => setMobileOpen(false)}
                        className="mt-1 rounded-lg bg-linear-to-br from-brand-600 to-brand-500 px-3 py-2.5 text-center text-sm font-semibold text-white"
                    >
                        Try free
                    </Link>
                </div>
            )}
        </nav>
    );
}