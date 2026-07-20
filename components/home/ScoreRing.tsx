import { SCORE } from "./hero.constants";

export function ScoreRing() {
    const score = SCORE;
    const radius = 38;
    const circ = 2 * Math.PI * radius;
    const dash = (score / 100) * circ;

    return (
        <div className="relative flex items-center justify-center w-24 h-24">
            <svg
                width="96"
                height="96"
                viewBox="0 0 96 96"
                className="-rotate-90"
            >
                <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="7"
                />
                <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    fill="none"
                    stroke="url(#scoreGrad)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${circ}`}
                    className="transition-[stroke-dasharray] duration-1000 ease-[ease]"
                />
                <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute text-center">
                <div className="text-[20px] font-[750] text-mist-300 tracking-[-0.03em] leading-none">
                    {score}
                </div>
                <div className="text-[9px] text-mist-700 font-medium tracking-[0.04em] uppercase">
                    Score
                </div>
            </div>
        </div>
    );
}