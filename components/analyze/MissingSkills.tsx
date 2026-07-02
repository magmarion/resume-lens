interface MissingSkillsProps {
    skills: string[];
}

export default function MissingSkills({ skills }: MissingSkillsProps) {
    return (
        <div style={{
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
            backdropFilter: "blur(16px)",
            overflow: "hidden",
        }}>
            <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(251,191,36,0.06)",
            }}>
                <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path d="M5.5 1V6.5M5.5 8.5H5.51" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#fbbf24", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    Missing Skills &amp; Keywords
                </span>
            </div>

            <div style={{ padding: "14px 16px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                {skills.map((skill, i) => (
                    <span
                        key={i}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            padding: "5px 12px", borderRadius: 999,
                            background: "rgba(251,191,36,0.08)",
                            border: "1px solid rgba(251,191,36,0.20)",
                            fontSize: 12, fontWeight: 500, color: "#fcd34d",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        <span style={{ fontSize: 9, color: "#fbbf24" }}>+</span>
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}