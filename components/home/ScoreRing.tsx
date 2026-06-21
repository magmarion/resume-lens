import { SCORE } from "./hero.constants";

export function ScoreRing() {
    const score = SCORE;
    const radius = 38;
    const circ = 2 * Math.PI * radius;
    const dash = (score / 100) * circ;

    return (
        <div
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 96,
                height: 96,
            }}
        >
            <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
                <circle
                    cx="48" cy="48" r={radius}
                    fill="none"
                    stroke="url(#scoreGrad)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${circ}`}
                    style={{ transition: "stroke-dasharray 1s ease" }}
                />
                <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                </defs>
            </svg>
            <div style={{ position: "absolute", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 750, color: "#e8e5f5", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {score}
                </div>
                <div style={{ fontSize: 9, color: "#6d6b85", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    Score
                </div>
            </div>
        </div>
    );
}