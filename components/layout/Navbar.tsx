"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import AuthGateLink from "@/components/auth/AuthGateLink";

const NAV_LINKS = [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Examples", href: "/#examples" },
    { label: "Blog", href: "/blog" },
] as const;

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isLoaded, isSignedIn } = useAuth();
    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const [prevPathname, setPrevPathname] = useState(pathname);
    if (pathname !== prevPathname) {
        setPrevPathname(pathname);
        setMobileOpen(false);
    }

    useEffect(() => {
        if (!mobileOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMobileOpen(false);
        };
        document.addEventListener("keydown", onKeyDown);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [mobileOpen]);

    useEffect(() => {
        if (!mobileOpen) return;

        const onClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMobileOpen(false);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [mobileOpen]);

    const isActive = (href: string) => pathname === href || (href !== "/" && pathname?.startsWith(href));

    return (
        <nav
            ref={menuRef}
            className={`fixed inset-x-0 top-0 z-100 flex h-14.5 items-center transition-all duration-300 ${scrolled ? "bg-ink-950/80 backdrop-blur-xl backdrop-saturate-150 border-b border-white/7" : "bg-transparent border-b border-transparent"
                }`}
        >
            <div className="mx-auto flex w-full max-w-280 items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-brand-600 to-brand-400 shadow-[0_0_14px_rgba(99,73,228,0.45)]">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                            <path d="M4.5 11L7.5 4L10.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.5 8.5H9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="text-[15px] font-semibold tracking-tight text-mist-200">Resume Lens</span>
                </Link>

                {/* Desktop links */}
                <div className="hidden items-center gap-7 md:flex">
                    {NAV_LINKS.map((l) => (
                        <Link
                            key={l.label}
                            href={l.href}
                            className={`rounded-md text-[13.5px] font-normal tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 ${isActive(l.href) ? "text-mist-300" : "text-mist-600 hover:text-mist-400"
                                }`}
                        >
                            {l.label}
                        </Link>
                    ))}
                    {isLoaded && isSignedIn && (
                        <Link
                            href="/history"
                            className={`flex items-center gap-1.5 rounded-md text-[13.5px] font-normal tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 ${isActive("/history") ? "text-brand-400" : "text-mist-600 hover:text-mist-400"
                                }`}
                        >
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                                <path d="M6.5 3V6.5L9 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3" />
                            </svg>
                            History
                        </Link>
                    )}
                </div>

                {/* Desktop right */}
                <div className="hidden items-center gap-2.5 md:flex">
                    {isLoaded && !isSignedIn && (
                        <Link
                            href="/sign-in"
                            className="rounded-md text-[13.5px] font-normal tracking-tight text-mist-600 transition-colors hover:text-mist-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60"
                        >
                            Sign in
                        </Link>
                    )}
                    {isLoaded && isSignedIn && <UserButton />}
                    {isLoaded && !isSignedIn && (
                        <AuthGateLink
                            href="/upload"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-linear-to-br from-brand-600 to-brand-500 px-4 py-2 text-[13px] font-semibold tracking-tight text-white shadow-[0_0_0_1px_rgba(99,73,228,0.4),0_4px_16px_rgba(99,73,228,0.3)] transition-all hover:-translate-y-px hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60"
                        >
                            Try free
                        </AuthGateLink>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className="flex items-center justify-center rounded-lg p-2 text-mist-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 md:hidden"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-nav-menu"
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
                <div
                    id="mobile-nav-menu"
                    className="absolute inset-x-0 top-14.5 flex flex-col gap-1 border-b border-white/7 bg-ink-950/95 p-4 backdrop-blur-xl md:hidden"
                >
                    {NAV_LINKS.map((l) => (
                        <Link
                            key={l.label}
                            href={l.href}
                            onClick={() => setMobileOpen(false)}
                            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 ${isActive(l.href) ? "bg-white/5 text-mist-300" : "text-mist-500 hover:bg-white/5 hover:text-mist-300"
                                }`}
                        >
                            {l.label}
                        </Link>
                    ))}

                    {isLoaded && isSignedIn && (
                        <Link
                            href="/history"
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 ${isActive("/history") ? "bg-brand-600/10 text-brand-400" : "text-mist-500 hover:bg-white/5 hover:text-mist-300"
                                }`}
                        >
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                                <path d="M6.5 3V6.5L9 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3" />
                            </svg>
                            History
                        </Link>
                    )}

                    <div className="my-2 h-px bg-white/6" />

                    {isLoaded && !isSignedIn && (
                        <Link
                            href="/sign-in"
                            onClick={() => setMobileOpen(false)}
                            className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-mist-500 transition-colors hover:bg-white/5 hover:text-mist-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60"
                        >
                            Sign in
                        </Link>
                    )}
                    {isLoaded && isSignedIn && (
                        <div className="flex items-center gap-2 px-3 py-2.5">
                            <UserButton />
                            <span className="text-sm text-mist-500">Account</span>
                        </div>
                    )}

                    {isLoaded && !isSignedIn && (
                        <AuthGateLink
                            href="/upload"
                            className="mt-1 rounded-lg bg-linear-to-br from-brand-600 to-brand-500 px-3 py-2.5 text-center text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60"
                        >
                            Try free
                        </AuthGateLink>
                    )}
                </div>
            )}
        </nav>
    );
}