import { SignUp } from "@clerk/nextjs";
import { HeroBackground } from "@/components/home/HeroBackground";

interface SignUpPageProps {
    searchParams: Promise<{ redirect_url?: string }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
    const { redirect_url } = await searchParams;

    const target = redirect_url && redirect_url.startsWith("/") ? redirect_url : "/upload";

    const signInHref = redirect_url
        ? `/sign-in?redirect_url=${encodeURIComponent(redirect_url)}`
        : "/sign-in";

    return (
        <>
            <HeroBackground />
            <div aria-hidden="true" className="bg-vignette fixed inset-0 z-1 pointer-events-none" />

            <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24">
                <div className="anim-1 w-full max-w-md">
                    <div className="glass-card p-8">
                        <div className="mb-6 text-center">
                            <h1 className="text-gradient-brand text-2xl font-bold tracking-tight">
                                Create your account
                            </h1>
                            <p className="mt-1.5 text-sm text-mist-600">
                                Start analysing your resume with AI
                            </p>
                        </div>

                        <SignUp fallbackRedirectUrl={target} signInUrl={signInHref} />
                    </div>
                </div>
            </main>
        </>
    );
}