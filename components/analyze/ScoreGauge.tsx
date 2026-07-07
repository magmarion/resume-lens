interface ScoreGaugeProps {
    score: number;
    atsSafe: boolean;
}

function scoreColor(score: number): { stroke: string; glow: string; label: string } {
    if (score >= 80) return { stroke: "#34d399", glow: "rgba(52,211,153,0.4)", label: "Excellent" };
    if (score >= 60) return { stroke: "#a78bfa", glow: "rgba(167,139,250,0.4)", label: "Good" };
    if (score >= 40) return { stroke: "#fbbf24", glow: "rgba(251,191,36,0.4)", label: "Average" };
    return { stroke: "#fb7185", glow: "rgba(251,113,133,0.4)", label: "Needs work" };
}

export default function ScoreGauge({ score, atsSafe }: ScoreGaugeProps) {
    const radius = 54;
    const circ = 2 * Math.PI * radius;
    const dash = (score / 100) * circ;
    const { stroke, glow, label } = scoreColor(score);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-36 h-36">
                <svg
                    width="144"
                    height="144"
                    viewBox="0 0 144 144"
                    className="-rotate-90"
                >
                    <circle
                        cx="72"
                        cy="72"
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="10"
                    />
                    <circle
                        cx="72"
                        cy="72"
                        r={radius}
                        fill="none"
                        stroke={stroke}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${dash} ${circ}`}
                        className="transition-[stroke-dasharray] duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                            filter: `drop-shadow(0 0 8px ${glow})`,
                        }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[36px] font-extrabold text-[#e8e5f5] tracking-[-0.04em] leading-none">
                        {score}
                    </span>
                    <span
                        className="text-[11px] font-semibold tracking-[0.04em] uppercase mt-0.75"
                        style={{ color: stroke }}
                    >
                        {label}
                    </span>
                </div>
            </div>

            <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.25 rounded-full border ${atsSafe
                        ? "bg-emerald-400/10 border-emerald-400/25"
                        : "bg-rose-400/10 border-rose-400/25"
                    }`}
            >
                {atsSafe ? (
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path
                            d="M2 5.5L4.5 8L9 3"
                            stroke="#34d399"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ) : (
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path
                            d="M2.5 2.5L8.5 8.5M8.5 2.5L2.5 8.5"
                            stroke="#fb7185"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                        />
                    </svg>
                )}
                <span
                    className={`text-[11px] font-semibold ${atsSafe ? "text-emerald-400" : "text-rose-400"
                        }`}
                >
                    {atsSafe ? "ATS Safe" : "ATS Issues"}
                </span>
            </div>
        </div>
    );
}