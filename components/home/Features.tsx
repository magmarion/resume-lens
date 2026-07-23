interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FEATURES: Feature[] = [
    {
        title: "AI-Powered Analysis",
        description:
            "Our AI reviews your resume for clarity, structure, and impact - with a consistent, structured score every time.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 2L11.8 7.2L17 9L11.8 10.8L10 16L8.2 10.8L3 9L8.2 7.2L10 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "ATS Compatibility",
        description:
            "Get a clear score and safety check on whether your resume will actually parse correctly through Applicant Tracking Systems.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M6.5 6.5H13.5M6.5 9.5H13.5M6.5 12.5H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "Job Description Matching",
        description:
            "Paste a job posting and see exactly how well your resume aligns — matched keywords, missing skills, and a targeted match score.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M16.5 16.5L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "AI Bullet Rewrites",
        description:
            "See exactly which lines are holding you back, with side-by-side original vs. improved rewrites you can use immediately.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M14.5 3.5L16.5 5.5L7 15H5V13L14.5 3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Export as PDF",
        description:
            "Download a clean, formatted report of your full analysis - score, feedback, and rewrites - to save or share.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 3V12M10 12L6.5 8.5M10 12L13.5 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 14V15.5C4 16.3 4.7 17 5.5 17H14.5C15.3 17 16 16.3 16 15.5V14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Track Your History",
        description:
            "Sign in to keep a record of every resume you've analyzed, so you can see your progress and revisit past scores anytime.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
                <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="relative z-10 px-6 py-24 sm:px-10">
            <div className="mx-auto max-w-280">
                {/* Header */}
                <div className="mx-auto mb-14 max-w-xl text-center">
                    <div className="badge-pill mx-auto mb-5 w-fit border-brand-600/22 bg-brand-600/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                        <span className="text-xs font-medium tracking-wide text-brand-400/90">Features</span>
                    </div>
                    <h2 className="text-gradient-brand mb-3 text-[clamp(28px,4.5vw,42px)] font-extrabold leading-tight tracking-[-0.03em]">
                        Everything you need to land the interview
                    </h2>
                    <p className="text-[15px] leading-relaxed text-mist-600">
                        From instant ATS checks to job-specific keyword matching - one upload, a complete picture.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {FEATURES.map((f) => (
                        <div
                            key={f.title}
                            className="glass-card p-6 transition-transform duration-200 hover:-translate-y-1"
                        >
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-brand-600/25 bg-brand-600/12 text-brand-400">
                                {f.icon}
                            </div>
                            <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-mist-200">
                                {f.title}
                            </h3>
                            <p className="text-[13.5px] leading-relaxed text-mist-600">
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}