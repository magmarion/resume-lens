import type { Suggestion } from "@/types/analysis";

interface SuggestionCardProps {
    suggestion: Suggestion;
    index: number;
}

export default function SuggestionCard({ suggestion, index }: SuggestionCardProps) {
    return (
        <div style={{
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
            backdropFilter: "blur(16px)",
            overflow: "hidden",
        }}>
            {/* Number + reason header */}
            <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(99,73,228,0.06)",
            }}>
                <div style={{
                    width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                    background: "rgba(99,73,228,0.20)", border: "1px solid rgba(167,139,250,0.30)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: "#a78bfa",
                }}>
                    {index + 1}
                </div>
                <p style={{ fontSize: 12, color: "#9f9cb8", lineHeight: 1.5, letterSpacing: "-0.01em", margin: 0 }}>
                    {suggestion.reason}
                </p>
            </div>

            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                {/* Original */}
                <div style={{
                    padding: "10px 14px", borderRadius: 8,
                    background: "rgba(251,113,133,0.07)",
                    border: "1px solid rgba(251,113,133,0.15)",
                }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#fb7185", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 5 }}>
                        Original
                    </div>
                    <p style={{ fontSize: 13, color: "#9f9cb8", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                        &ldquo;{suggestion.original}&rdquo;
                    </p>
                </div>

                {/* Arrow */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M8 2V14M8 14L4 10M8 14L12 10" stroke="#52506a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* Improved */}
                <div style={{
                    padding: "10px 14px", borderRadius: 8,
                    background: "rgba(52,211,153,0.07)",
                    border: "1px solid rgba(52,211,153,0.18)",
                }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#34d399", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 5 }}>
                        Improved
                    </div>
                    <p style={{ fontSize: 13, color: "#c4c2d4", lineHeight: 1.6, margin: 0 }}>
                        {suggestion.improved}
                    </p>
                </div>
            </div>
        </div>
    );
}