import type { Suggestion } from "@/types/analysis";

interface SuggestionCardProps {
    suggestion: Suggestion;
    index: number;
}

export default function SuggestionCard({ suggestion, index }: SuggestionCardProps) {
    return (
        <div className="rounded-xl border border-white/8 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-lg overflow-hidden">
            {/* Number + reason header */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/6 bg-violet-600/6">
                <div className="size-5.5 rounded-full shrink-0 bg-violet-600/20 border border-violet-400/30 flex items-center justify-center text-[11px] font-bold text-[#a78bfa]">
                    {index + 1}
                </div>
                <p className="text-[12px] text-[#9f9cb8] leading-normal tracking-[-0.01em] m-0">
                    {suggestion.reason}
                </p>
            </div>

            <div className="p-[14px_16px] flex flex-col gap-2.5">
                {/* Original */}
                <div className="p-[10px_14px] rounded-lg bg-rose-400/7 border border-rose-400/15">
                    <div className="text-[10px] font-semibold text-rose-400 tracking-[0.06em] uppercase mb-1.25">
                        Original
                    </div>
                    <p className="text-[13px] text-[#9f9cb8] leading-[1.6] m-0 italic">
                        &ldquo;{suggestion.original}&rdquo;
                    </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                            d="M8 2V14M8 14L4 10M8 14L12 10"
                            stroke="#52506a"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* Improved */}
                <div className="p-[10px_14px] rounded-lg bg-emerald-400/7 border border-emerald-400/18">
                    <div className="text-[10px] font-semibold text-emerald-400 tracking-[0.06em] uppercase mb-1.25">
                        Improved
                    </div>
                    <p className="text-[13px] text-[#c4c2d4] leading-[1.6] m-0">
                        {suggestion.improved}
                    </p>
                </div>
            </div>
        </div>
    );
}