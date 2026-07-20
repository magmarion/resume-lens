interface StatPillProps {
    value: string;
    label: string;
}

export function StatPill({ value, label }: StatPillProps) {
    return (
        <div className="flex flex-col items-center gap-0.5 py-2.5 px-5 rounded-xl bg-white/4 border border-white/8 backdrop-blur-md min-w-22.5">
            <span className="text-[20px] font-bold text-mist-300 tracking-[-0.03em] leading-none">
                {value}
            </span>
            <span className="text-[11px] text-mist-700 font-normal whitespace-nowrap">
                {label}
            </span>
        </div>
    );
}