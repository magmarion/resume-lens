import { TRUST_COMPANIES } from "./hero.constants";

export function TrustStrip() {
    return (
        <div className="relative z-10 border-t border-white/5 py-7 px-6">
            <div className="max-w-225 mx-auto flex flex-col items-center gap-4">
                <p className="text-[11px] font-medium text-mist-950 tracking-[0.09em] uppercase">
                    Helped candidates land roles at
                </p>
                <div className="flex flex-wrap justify-center gap-9 items-center">
                    {TRUST_COMPANIES.map((co) => (
                        <span key={co} className="logo-chip">
                            {co}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}