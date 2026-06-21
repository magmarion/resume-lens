interface StatPillProps {
    value: string;
    label: string;
}

export function StatPill({ value, label }: StatPillProps) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                padding: "10px 20px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                minWidth: 90,
            }}
        >
            <span style={{ fontSize: 20, fontWeight: 700, color: "#e8e5f5", letterSpacing: "-0.03em", lineHeight: 1 }}>
                {value}
            </span>
            <span style={{ fontSize: 11, color: "#6d6b85", fontWeight: 400, whiteSpace: "nowrap" }}>
                {label}
            </span>
        </div>
    );
}