function Shimmer({ width = "100%", height = 16, radius = 6 }: { width?: string | number; height?: number; radius?: number }) {
    return (
        <div style={{
            width, height, borderRadius: radius,
            background: "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.6s ease-in-out infinite",
        }} />
    );
}

export default function AnalysisSkeleton() {
    return (
        <>
            <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%", maxWidth: 860 }}>
                {/* Score placeholder */}
                <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
                    <div style={{
                        width: 144, height: 144, borderRadius: "50%",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                            <Shimmer width={48} height={36} radius={6} />
                            <Shimmer width={60} height={10} radius={4} />
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div style={{ padding: "16px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", display: "flex", flexDirection: "column", gap: 8 }}>
                    <Shimmer width="90%" />
                    <Shimmer width="75%" />
                    <Shimmer width="60%" />
                </div>

                {/* Strengths + Weaknesses */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {[0, 1].map(i => (
                        <div key={i} style={{ padding: "16px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", display: "flex", flexDirection: "column", gap: 10 }}>
                            <Shimmer width={80} height={12} />
                            {[0, 1, 2, 3].map(j => <Shimmer key={j} width={`${85 - j * 8}%`} />)}
                        </div>
                    ))}
                </div>

                {/* Skills */}
                <div style={{ padding: "16px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                    <Shimmer width={120} height={12} />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                        {[80, 90, 70, 110, 85, 95].map((w, i) => <Shimmer key={i} width={w} height={28} radius={999} />)}
                    </div>
                </div>

                {/* Suggestions */}
                {[0, 1, 2].map(i => (
                    <div key={i} style={{ padding: "16px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", display: "flex", flexDirection: "column", gap: 10 }}>
                        <Shimmer width="70%" />
                        <Shimmer width="85%" height={40} radius={8} />
                        <Shimmer width="85%" height={40} radius={8} />
                    </div>
                ))}
            </div>
        </>
    );
}