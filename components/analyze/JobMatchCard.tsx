import type { JdMatch } from "@/types/analysis";

function matchVariant(score: number) {
    if (score >= 80) return { color: "#34d399", bg: "bg-success-400/10", border: "border-success-400/25", label: "Strong match" };
    if (score >= 60) return { color: "#a78bfa", bg: "bg-brand-600/10", border: "border-brand-600/25", label: "Good match" };
    if (score >= 40) return { color: "#fbbf24", bg: "bg-warning-400/10", border: "border-warning-400/25", label: "Partial match" };
    return { color: "#fb7185", bg: "bg-danger-400/10", border: "border-danger-400/25", label: "Weak match" };
}

export default function JobMatchCard({ jdMatch }: { jdMatch: JdMatch }) {
    const { matchScore, matchedKeywords, missingKeywords, recommendation } = jdMatch;
    const v = matchVariant(matchScore);

    return (
        <div className="glass-card overflow-hidden">
            {/* Header with score bar */}
            <div className={`border-b border-white/6 px-4 py-4 sm:px-5 ${v.bg}`}>
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                            <rect x="2" y="1.5" width="11" height="12" rx="1.5" stroke={v.color} strokeWidth="1.2" />
                            <path d="M4.5 5H10.5M4.5 7.5H10.5M4.5 10H8" stroke={v.color} strokeWidth="1" strokeLinecap="round" />
                        </svg>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: v.color }}>
                            Job Match
                        </span>
                    </div>
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${v.border}`}
                        style={{ color: v.color }}
                    >
                        {v.label}
                    </span>
                </div>

                <div className="flex items-end justify-between gap-4">
                    <span className="text-3xl font-extrabold leading-none tracking-tight text-mist-300 sm:text-4xl">
                        {matchScore}
                        <span className="text-base font-medium text-mist-800">%</span>
                    </span>
                    <div className="mb-1 h-2 flex-1 overflow-hidden rounded-full bg-white/8">
                        <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${matchScore}%`, background: v.color, boxShadow: `0 0 8px ${v.color}66` }}
                        />
                    </div>
                </div>
            </div>

            {/* Keywords */}
            <div className="grid grid-cols-1 gap-px bg-white/4 sm:grid-cols-2">
                <div className="bg-ink-950 px-4 py-3.5 sm:px-5">
                    <div className="mb-2.5 flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-success-400" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-success-400">
                            Matched ({matchedKeywords.length})
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {matchedKeywords.length > 0 ? (
                            matchedKeywords.map((kw, i) => (
                                <span key={i} className="rounded-full border border-success-400/20 bg-success-400/8 px-2.5 py-1 text-[11px] font-medium text-success-400">
                                    {kw}
                                </span>
                            ))
                        ) : (
                            <span className="text-xs text-mist-950">None found</span>
                        )}
                    </div>
                </div>

                <div className="bg-ink-950 px-4 py-3.5 sm:px-5">
                    <div className="mb-2.5 flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-danger-400" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-danger-400">
                            Missing ({missingKeywords.length})
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {missingKeywords.length > 0 ? (
                            missingKeywords.map((kw, i) => (
                                <span key={i} className="rounded-full border border-danger-400/20 bg-danger-400/8 px-2.5 py-1 text-[11px] font-medium text-danger-400">
                                    {kw}
                                </span>
                            ))
                        ) : (
                            <span className="text-xs text-mist-950">None — great coverage</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5 bg-brand-600/6 px-4 py-3.5 sm:px-5">
                <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-brand-400">Recommendation</div>
                <p className="m-0 text-[13px] leading-relaxed text-mist-400">{recommendation}</p>
            </div>
        </div>
    );
}