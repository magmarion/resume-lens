import { ScoreRing } from "./ScoreRing";
import { RESUME_CHECKS } from "./hero.constants";

export function FloatingCard() {
    return (
        <div className="w-full max-w-100 rounded-2xl border border-white/9 bg-linear-to-br from-white/6 to-white/2 backdrop-blur-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.4),0_32px_80px_rgba(0,0,0,0.65),0_0_60px_rgba(99,73,228,0.1)] overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between px-4.5 py-3.5 border-b border-white/6 bg-black/15">
                <div>
                    <div className="text-[13px] font-semibold text-[#e8e5f5] tracking-[-0.01em]">
                        Resume Analysis
                    </div>
                    <div className="text-[11px] text-[#52506a] mt-px">
                        Senior Frontend Engineer · Google
                    </div>
                </div>
                <ScoreRing />
            </div>

            {/* Checks */}
            <div className="px-4.5 py-3.5 pb-4.5">
                <div className="text-[10px] font-semibold text-[#3d3b52] tracking-[0.08em] uppercase mb-2.5">
                    Review Summary
                </div>

                {RESUME_CHECKS.map((c) => (
                    <div
                        key={c.label}
                        className="flex items-start gap-2.5 py-2 border-b border-white/4"
                    >
                        {/* Icon */}
                        <div
                            className={`w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 mt-px border ${c.ok
                                    ? "bg-emerald-400/15 border-emerald-400/30"
                                    : "bg-rose-400/15 border-rose-400/30"
                                }`}
                        >
                            {c.ok ? (
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path
                                        d="M2 5L4 7L8 3"
                                        stroke="#34d399"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path
                                        d="M3 3L7 7M7 3L3 7"
                                        stroke="#fb7185"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="text-[12px] font-medium text-[#c4c2d4] tracking-[-0.01em]">
                                {c.label}
                            </div>
                            <div className="text-[11px] text-[#52506a] mt-px">{c.note}</div>
                        </div>
                    </div>
                ))}

                {/* AI suggestion chip */}
                <div className="mt-3 p-[10px_12px] rounded-[10px] bg-violet-600/10 border border-violet-600/22">
                    <div className="text-[10px] font-semibold text-[#a78bfa] tracking-[0.06em] uppercase mb-1">
                        AI Suggestion
                    </div>
                    <div className="text-[11.5px] text-[#9f9cb8] leading-[1.55]">
                        Replace <span className="text-rose-400">&quot;responsible for leading&quot;</span> with{" "}
                        <span className="text-emerald-400">&quot;led a 6-person team that shipped…&quot;</span> to add measurable impact.
                    </div>
                </div>
            </div>
        </div>
    );
}