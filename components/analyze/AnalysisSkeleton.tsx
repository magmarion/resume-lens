function Shimmer({ width = "100%", height = 16, radius = 6 }: { width?: string | number; height?: number; radius?: number }) {
    return (
        <div
            className="animate-shimmer"
            style={{
                width,
                height,
                borderRadius: radius,
                background: "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)",
                backgroundSize: "200% 100%",
            }}
        />
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
        .animate-shimmer {
          animation: shimmer 1.6s ease-in-out infinite;
        }
      `}</style>

            <div className="flex flex-col gap-5 w-full max-w-215">
                <div className="flex justify-center py-6">
                    <div className="w-36 h-36 rounded-full bg-white/4 border border-white/6 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-1.5">
                            <Shimmer width={48} height={36} radius={6} />
                            <Shimmer width={60} height={10} radius={4} />
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="p-4 rounded-xl border border-white/6 bg-white/2 flex flex-col gap-2">
                    <Shimmer width="90%" />
                    <Shimmer width="75%" />
                    <Shimmer width="60%" />
                </div>

                {/* Strengths + Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[0, 1].map(i => (
                        <div key={i} className="p-4 rounded-xl border border-white/6 bg-white/2 flex flex-col gap-2.5">
                            <Shimmer width={80} height={12} />
                            {[0, 1, 2, 3].map(j => <Shimmer key={j} width={`${85 - j * 8}%`} />)}
                        </div>
                    ))}
                </div>

                {/* Skills */}
                <div className="p-4 rounded-xl border border-white/6 bg-white/2">
                    <Shimmer width={120} height={12} />
                    <div className="flex flex-wrap gap-2 mt-3">
                        {[80, 90, 70, 110, 85, 95].map((w, i) => (
                            <Shimmer key={i} width={w} height={28} radius={999} />
                        ))}
                    </div>
                </div>

                {/* Suggestions */}
                {[0, 1, 2].map(i => (
                    <div key={i} className="p-4 rounded-xl border border-white/6 bg-white/2 flex flex-col gap-2.5">
                        <Shimmer width="70%" />
                        <Shimmer width="85%" height={40} radius={8} />
                        <Shimmer width="85%" height={40} radius={8} />
                    </div>
                ))}
            </div>
        </>
    );
}