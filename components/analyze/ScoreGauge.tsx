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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", width: 144, height: 144 }}>
                <svg width="144" height="144" viewBox="0 0 144 144" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="72" cy="72" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                    <circle
                        cx="72" cy="72" r={radius}
                        fill="none"
                        stroke={stroke}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${dash} ${circ}`}
                        style={{
                            filter: `drop-shadow(0 0 8px ${glow})`,
                            transition: "stroke-dasharray 1.2s cubic-bezier(0.22,1,0.36,1)",
                        }}
                    />
                </svg>
                <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                }}>
                    <span style={{ fontSize: 36, fontWeight: 800, color: "#e8e5f5", letterSpacing: "-0.04em", lineHeight: 1 }}>
                        {score}
                    </span>
                    <span style={{ fontSize: 11, color: stroke, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 3 }}>
                        {label}
                    </span>
                </div>
            </div>

            <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 12px", borderRadius: 999,
                background: atsSafe ? "rgba(52,211,153,0.10)" : "rgba(251,113,133,0.10)",
                border: `1px solid ${atsSafe ? "rgba(52,211,153,0.25)" : "rgba(251,113,133,0.25)"}`,
            }}>
                {atsSafe ? (
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path d="M2 5.5L4.5 8L9 3" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path d="M2.5 2.5L8.5 8.5M8.5 2.5L2.5 8.5" stroke="#fb7185" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                )}
                <span style={{ fontSize: 11, fontWeight: 600, color: atsSafe ? "#34d399" : "#fb7185" }}>
                    {atsSafe ? "ATS Safe" : "ATS Issues"}
                </span>
            </div>
        </div>
    );
}