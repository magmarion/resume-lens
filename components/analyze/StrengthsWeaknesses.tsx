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
        <div style={{
            borderRadius: 14,
            border: `1px solid rgba(255,255,255,0.08)`,
            background: "linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
            backdropFilter: "blur(16px)",
            overflow: "hidden",
        }}>
            {/* Header */}
            <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: bgColor,
            }}>
                <div style={{
                    width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                    background: bgColor, border: `1px solid ${border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    {isStrength ? (
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                            <path d="M2 5.5L4.5 8L9 3" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                            <path d="M5.5 2V6M5.5 8.5V9" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    )}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: accent, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {title}
                </span>
            </div>

            {/* Items */}
            <div style={{ padding: "8px 0" }}>
                {items.map((item, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex", alignItems: "flex-start", gap: 10,
                            padding: "9px 16px",
                            borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                        }}
                    >
                        <div style={{
                            width: 5, height: 5, borderRadius: "50%",
                            background: accent, flexShrink: 0, marginTop: 6,
                            boxShadow: `0 0 4px ${accent}`,
                        }} />
                        <p style={{ fontSize: 13, color: "#c4c2d4", lineHeight: 1.6, letterSpacing: "-0.01em", margin: 0 }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <ListCard title="Strengths" items={strengths} variant="strength" />
            <ListCard title="Weaknesses" items={weaknesses} variant="weakness" />
        </div>
    );
}