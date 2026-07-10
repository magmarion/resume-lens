import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { HeroBackground } from "@/components/home/HeroBackground";

interface HistoryDoc {
    userId: string;
    fileName: string;
    score: number;
    atsSafe: boolean;
    createdAt: Date;
}

function scoreColor(score: number): string {
    if (score >= 80) return "text-success-400";
    if (score >= 60) return "text-brand-400";
    if (score >= 40) return "text-warning-400";
    return "text-danger-400";
}

async function getHistory(userId: string) {
    const client = await clientPromise;
    const db = client.db("resumeai");
    const docs = await db
        .collection<HistoryDoc>("analyses")
        .find({ userId })
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();

    return docs.map((d) => ({
        id: d._id.toString(),
        fileName: d.fileName,
        score: d.score,
        atsSafe: d.atsSafe,
        createdAt: d.createdAt,
    }));
}

export default async function HistoryPage() {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const entries = await getHistory(userId);

    return (
        <>
            <HeroBackground />
            <div aria-hidden="true" className="bg-vignette fixed inset-0 z-1 pointer-events-none" />

            <main className="relative z-10 flex min-h-screen flex-col items-center px-4 pb-16 pt-24 sm:px-6 sm:pt-22.5">
                <div className="w-full max-w-180">
                    <h1 className="anim-1 text-gradient-brand mb-2 text-[clamp(24px,5vw,38px)] font-extrabold tracking-[-0.04em]">
                        Your analysis history
                    </h1>
                    <p className="anim-1 mb-8 text-sm text-mist-800">
                        {entries.length > 0
                            ? `${entries.length} resume${entries.length === 1 ? "" : "s"} analysed`
                            : "Nothing here yet"}
                    </p>

                    {entries.length === 0 ? (
                        <div className="anim-2 glass-card flex flex-col items-center gap-3 px-6 py-14 text-center">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                                <rect x="4" y="2" width="18" height="26" rx="2.5" stroke="#3d3b52" strokeWidth="1.5" />
                                <path d="M8 9H18M8 13H18M8 17H14" stroke="#3d3b52" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <p className="text-sm text-mist-800">No analyses yet — upload a resume to get started.</p>
                            <Link href="/upload" className="btn-main mt-2">
                                Upload a resume
                            </Link>
                        </div>
                    ) : (
                        <div className="anim-2 glass-card overflow-hidden">
                            {entries.map((entry, i) => (
                                <div
                                    key={entry.id}
                                    className={`flex items-center gap-4 px-5 py-4 ${i < entries.length - 1 ? "border-b border-white/5" : ""}`}
                                >
                                    <div className={`h-2 w-2 shrink-0 rounded-full ${entry.atsSafe ? "bg-success-400" : "bg-danger-400"}`} />

                                    <div className="min-w-0 flex-1">
                                        <div className="truncate text-[13px] font-medium tracking-tight text-mist-300">
                                            {entry.fileName}
                                        </div>
                                        <div className="text-[11px] text-mist-800">
                                            {new Date(entry.createdAt).toLocaleDateString(undefined, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </div>
                                    </div>

                                    <div className={`shrink-0 text-lg font-bold tracking-tight ${scoreColor(entry.score)}`}>
                                        {entry.score}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}