"use client";

import Link from "next/link";
import { HeroBackground } from "@/components/home/HeroBackground";
import AuthGateLink from "@/components/auth/AuthGateLink";

interface Plan {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    cta: string;
}

const PLANS: Plan[] = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Try it out, no strings attached.",
        features: [
            "3 resume analyses / month",
            "ATS compatibility score",
            "Strengths & weaknesses breakdown",
            "AI bullet rewrites",
        ],
        cta: "Get started",
    },
    {
        name: "Pro",
        price: "$9",
        period: "/ month",
        description: "For active job seekers.",
        features: [
            "Unlimited resume analyses",
            "Job description matching",
            "PDF export",
            "Full analysis history",
            "Priority processing",
        ],
        highlighted: true,
        cta: "Start free trial",
    },
    {
        name: "Teams",
        price: "Custom",
        period: "",
        description: "For career coaches & bootcamps.",
        features: [
            "Everything in Pro",
            "Multiple team members",
            "Shared history & reporting",
            "Dedicated support",
        ],
        cta: "Contact us",
    },
];

export default function PricingPage() {
    return (
        <>
            <HeroBackground />
            <div aria-hidden="true" className="bg-vignette fixed inset-0 z-1 pointer-events-none" />

            <main className="relative z-10 flex min-h-screen flex-col items-center px-4 pb-24 pt-24 sm:px-6 sm:pt-22.5">
                {/* Header */}
                <div className="mb-14 max-w-xl text-center">
                    <div className="badge-pill mx-auto mb-5 w-fit border-brand-600/22 bg-brand-600/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                        <span className="text-xs font-medium tracking-wide text-brand-400/90">Pricing</span>
                    </div>
                    <h1 className="anim-1 text-gradient-brand mb-3 text-[clamp(28px,5vw,44px)] font-extrabold tracking-[-0.04em]">
                        Simple, transparent pricing
                    </h1>
                    <p className="anim-2 text-[15px] leading-relaxed text-mist-600">
                        Start free. Upgrade when you need more.
                    </p>
                </div>

                {/* Plans */}
                <div className="grid w-full max-w-280 grid-cols-1 gap-5 md:grid-cols-3">
                    {PLANS.map((plan, i) => (
                        <div
                            key={plan.name}
                            className={`anim-${Math.min(i + 3, 6)} relative flex flex-col rounded-2xl border p-7 ${plan.highlighted
                                ? "border-brand-500/40 bg-brand-600/[0.07]"
                                : "border-white/8 bg-white/2"
                                }`}
                            style={
                                plan.highlighted
                                    ? { boxShadow: "0 0 0 1px rgba(99,73,228,0.15), 0 24px 60px rgba(99,73,228,0.12)" }
                                    : undefined
                            }
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-br from-brand-600 to-brand-400 px-3 py-1 text-[11px] font-semibold text-white">
                                    Most popular
                                </div>
                            )}

                            <h3 className="mb-1 text-[17px] font-semibold tracking-tight text-mist-200">
                                {plan.name}
                            </h3>
                            <p className="mb-5 text-[13px] text-mist-600">{plan.description}</p>

                            <div className="mb-6 flex items-baseline gap-1">
                                <span className="text-[36px] font-extrabold tracking-tight text-mist-200">
                                    {plan.price}
                                </span>
                                {plan.period && (
                                    <span className="text-sm text-mist-700">{plan.period}</span>
                                )}
                            </div>

                            <div className="mb-7 flex flex-1 flex-col gap-2.5">
                                {plan.features.map((f) => (
                                    <div key={f} className="flex items-start gap-2.5">
                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 15 15"
                                            fill="none"
                                            aria-hidden="true"
                                            className="mt-0.5 shrink-0 text-brand-400"
                                        >
                                            <path d="M3 7.5L6 10.5L12 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="text-[13.5px] leading-relaxed text-mist-500">{f}</span>
                                    </div>
                                ))}
                            </div>

                            {plan.name === "Teams" ? (
                                <Link
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    className="btn-ghost w-full justify-center"
                                    title="Coming soon"
                                >
                                    {plan.cta}
                                </Link>
                            ) : (
                                <AuthGateLink
                                    href="/upload"
                                    className={plan.highlighted ? "btn-main w-full justify-center" : "btn-ghost w-full justify-center"}
                                >
                                    {plan.cta}
                                </AuthGateLink>
                            )}
                        </div>
                    ))}
                </div>

                <p className="anim-6 mt-10 text-center text-xs text-mist-800">
                    Pricing shown is illustrative and subject to change before public launch.
                </p>
            </main>
        </>
    );
}