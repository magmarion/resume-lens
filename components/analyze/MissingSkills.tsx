interface MissingSkillsProps {
    skills: string[];
}

export default function MissingSkills({ skills }: MissingSkillsProps) {
    return (
        <div className="rounded-xl border border-white/8 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6 bg-amber-400/6">
                <div className="w-5.5 h-5.5 rounded-full bg-amber-400/12 border border-amber-400/25 flex items-center justify-center shrink-0">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path
                            d="M5.5 1V6.5M5.5 8.5H5.51"
                            stroke="#fbbf24"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
                <span className="text-[12px] font-semibold text-amber-400 tracking-[0.04em] uppercase">
                    Missing Skills &amp; Keywords
                </span>
            </div>

            <div className="p-[14px_16px] flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center gap-1.25 px-3 py-1.25 rounded-full bg-amber-400/8 border border-amber-400/20 text-[12px] font-medium text-amber-300 tracking-[-0.01em]"
                    >
                        <span className="text-[9px] text-amber-400">+</span>
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}