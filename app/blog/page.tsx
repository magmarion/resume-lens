import { HeroBackground } from "@/components/home/HeroBackground";

interface Post {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tag: string;
}

const POSTS: Post[] = [
    {
        title: "5 resume mistakes that fail ATS scans before a human even sees them",
        excerpt:
            "Applicant Tracking Systems reject a surprising number of qualified candidates over formatting choices that have nothing to do with skill. Here's what to avoid.",
        date: "Coming soon",
        readTime: "6 min read",
        tag: "ATS Tips",
    },
    {
        title: "How to tailor one resume for ten different job descriptions",
        excerpt:
            "You don't need ten resumes — you need one strong base and a system for adjusting keywords intelligently. Here's the approach that actually works.",
        date: "Coming soon",
        readTime: "5 min read",
        tag: "Strategy",
    },
    {
        title: "What hiring managers actually read in the first six seconds",
        excerpt:
            "Eye-tracking studies on resume screening reveal exactly where recruiters look first — and it's rarely where candidates think.",
        date: "Coming soon",
        readTime: "4 min read",
        tag: "Hiring Insights",
    },
];

export default function BlogPage() {
    return (
        <>
            <HeroBackground />
            <div aria-hidden="true" className="bg-vignette fixed inset-0 z-1 pointer-events-none" />

            <main className="relative z-10 flex min-h-screen flex-col items-center px-4 pb-24 pt-24 sm:px-6 sm:pt-22.5">
                {/* Header */}
                <div className="mb-14 max-w-xl text-center">
                    <div className="badge-pill mx-auto mb-5 w-fit border-brand-600/22 bg-brand-600/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                        <span className="text-xs font-medium tracking-wide text-brand-400/90">Blog</span>
                    </div>
                    <h1 className="anim-1 text-gradient-brand mb-3 text-[clamp(28px,5vw,44px)] font-extrabold tracking-[-0.04em]">
                        Resume &amp; career insights
                    </h1>
                    <p className="anim-2 text-[15px] leading-relaxed text-mist-600">
                        Practical advice on resumes, ATS systems, and job search strategy.
                    </p>
                </div>

                {/* Posts */}
                <div className="flex w-full max-w-3xl flex-col gap-4">
                    {POSTS.map((post, i) => (
                        <article
                            key={post.title}
                            className={`anim-${Math.min(i + 3, 6)} glass-card cursor-default p-7 transition-transform duration-200 hover:-translate-y-0.5`}
                        >
                            <div className="mb-3 flex items-center gap-2.5">
                                <span className="rounded-full border border-brand-600/25 bg-brand-600/10 px-2.5 py-1 text-[11px] font-medium text-brand-400">
                                    {post.tag}
                                </span>
                                <span className="text-[12px] text-mist-800">{post.readTime}</span>
                            </div>

                            <h2 className="mb-2.5 text-[18px] font-semibold leading-snug tracking-tight text-mist-200">
                                {post.title}
                            </h2>

                            <p className="mb-4 text-[13.5px] leading-relaxed text-mist-600">
                                {post.excerpt}
                            </p>

                            <span className="text-[12px] font-medium text-mist-800">{post.date}</span>
                        </article>
                    ))}
                </div>

                <p className="anim-6 mt-10 text-center text-xs text-mist-800">
                    More posts coming soon.
                </p>
            </main>
        </>
    );
}