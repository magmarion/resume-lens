import Link from "next/link";

const FOOTER_LINKS = {
    Product: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Examples", href: "/#examples" },
    ],
    Company: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
    ],
    Legal: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
    ],
} as const;

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-white/5 px-6 py-12 sm:px-10">
            <div className="mx-auto flex max-w-280 flex-col gap-10 sm:flex-row sm:justify-between">
                {/* Brand */}
                <div className="max-w-65">
                    <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-brand-600 to-brand-400">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path d="M4 10.5L7 3.5L10 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 8.5H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="text-[15px] font-semibold tracking-tight text-mist-200">ResumeAI</span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-mist-800">
                        AI-powered resume analysis that helps you land more interviews.
                    </p>
                </div>

                {/* Link columns */}
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-14">
                    {Object.entries(FOOTER_LINKS).map(([section, links]) => (
                        <div key={section}>
                            <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-mist-950">
                                {section}
                            </div>
                            <div className="flex flex-col gap-2">
                                {links.map((l) => (
                                    <Link key={l.label} href={l.href} className="text-[13px] text-mist-800 transition-colors hover:text-mist-500">
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mx-auto mt-10 max-w-280 border-t border-white/5 pt-6 text-[12px] text-mist-950">
                © {new Date().getFullYear()} Resume Lens. All rights reserved.
            </div>
        </footer>
    );
}