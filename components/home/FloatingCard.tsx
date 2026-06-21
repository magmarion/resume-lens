import { ScoreRing } from "./ScoreRing";
import { RESUME_CHECKS } from "./hero.constants";

export function FloatingCard() {
    return (
        <div
            style={{
                width: "100%",
                maxWidth: 400,
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.09)",
                background: "linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.4), 0 32px 80px rgba(0,0,0,0.65), 0 0 60px rgba(99,73,228,0.1)",
                overflow: "hidden",
            }}
        >
            {/* Card header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(0,0,0,0.15)",
                }}
            >
                <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e8e5f5", letterSpacing: "-0.01em" }}>
                        Resume Analysis
                    </div>
                    <div style={{ fontSize: 11, color: "#52506a", marginTop: 1 }}>Senior Frontend Engineer · Google</div>
                </div>
                <ScoreRing />
            </div>

            {/* Checks */}
            <div style={{ padding: "14px 18px 18px" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#3d3b52", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                    Review Summary
                </div>
                {RESUME_CHECKS.map((c) => (
                    <div
                        key={c.label}
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            padding: "8px 0",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                    >
                        {/* Icon */}
                        <div
                            style={{
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                marginTop: 1,
                                background: c.ok ? "rgba(52,211,153,0.15)" : "rgba(251,113,133,0.15)",
                                border: `1px solid ${c.ok ? "rgba(52,211,153,0.3)" : "rgba(251,113,133,0.3)"}`,
                            }}
                        >
                            {c.ok ? (
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M2 5L4 7L8 3" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M3 3L7 7M7 3L3 7" stroke="#fb7185" strokeWidth="1.4" strokeLinecap="round" />
                                </svg>
                            )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, fontWeight: 500, color: "#c4c2d4", letterSpacing: "-0.01em" }}>
                                {c.label}
                            </div>
                            <div style={{ fontSize: 11, color: "#52506a", marginTop: 1 }}>{c.note}</div>
                        </div>
                    </div>
                ))}

                {/* AI suggestion chip */}
                <div
                    style={{
                        marginTop: 12,
                        padding: "10px 12px",
                        borderRadius: 10,
                        background: "rgba(99,73,228,0.10)",
                        border: "1px solid rgba(99,73,228,0.22)",
                    }}
                >
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#a78bfa", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
                        AI Suggestion
                    </div>
                    <div style={{ fontSize: 11.5, color: "#9f9cb8", lineHeight: 1.55 }}>
                        Replace <span style={{ color: "#fb7185" }}>&quot;responsible for leading&quot;</span> with{" "}
                        <span style={{ color: "#34d399" }}>&quot;led a 6-person team that shipped…&quot;</span> to add measurable impact.
                    </div>
                </div>
            </div>
        </div>
    );
}