interface ListCardProps {
    title: string;
    items: string[];
    variant: "strength" | "weakness";
}

function ListCard({ title, items, variant }: ListCardProps) {
    const isStrength = variant === "strength";
    const accent = isStrength ? "#34d399" : "#fb7185";
    const bgColor = isStrength ? "rgba(52,211,153,0.08)" : "rgba(251,113,133,0.08)";
    const border = isStrength ? "rgba(52,211,153,0.18)" : "rgba(251,113,133,0.18)";

    return (
        <div className="rounded-xl border border-white/8 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-lg overflow-hidden">
            {/* Header */}
            <div
                className="flex items-center gap-2 px-4 py-3 border-b border-white/6"
                style={{ background: bgColor }}
            >
                <div
                    className="w-5.5 h-5.5 rounded-full shrink-0 flex items-center justify-center"
                    style={{
                        background: bgColor,
                        border: `1px solid ${border}`,
                    }}
                >
                    {isStrength ? (
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                            <path
                                d="M2 5.5L4.5 8L9 3"
                                stroke={accent}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : (
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                            <path
                                d="M5.5 2V6M5.5 8.5V9"
                                stroke={accent}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    )}
                </div>
                <span
                    className="text-[12px] font-semibold tracking-[0.04em] uppercase"
                    style={{ color: accent }}
                >
                    {title}
                </span>
            </div>

            {/* Items */}
            <div className="py-2">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className={`flex items-start gap-2.5 px-4 py-2.25 ${i < items.length - 1 ? "border-b border-white/4" : ""
                            }`}
                    >
                        <div
                            className="w-1.25 h-1.25 rounded-full shrink-0 mt-1.5"
                            style={{
                                background: accent,
                                boxShadow: `0 0 4px ${accent}`,
                            }}
                        />
                        <p className="text-[13px] text-[#c4c2d4] leading-[1.6] tracking-[-0.01em] m-0">
                            {item}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface StrengthsWeaknessesProps {
    strengths: string[];
    weaknesses: string[];
}

export default function StrengthsWeaknesses({ strengths, weaknesses }: StrengthsWeaknessesProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ListCard title="Strengths" items={strengths} variant="strength" />
            <ListCard title="Weaknesses" items={weaknesses} variant="weakness" />
        </div>
    );
}