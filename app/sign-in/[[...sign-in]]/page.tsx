import { SignIn } from "@clerk/nextjs";
import { HeroBackground } from "@/components/home/HeroBackground";

interface SignInPageProps {
    searchParams: Promise<{ redirect_url?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
    const { redirect_url } = await searchParams;

    const target = redirect_url && redirect_url.startsWith("/") ? redirect_url : "/upload";

    const signUpHref = redirect_url
        ? `/sign-up?redirect_url=${encodeURIComponent(redirect_url)}`
        : "/sign-up";

    return (
        <>
            <HeroBackground />
            <div aria-hidden="true" className="bg-vignette fixed inset-0 z-1 pointer-events-none" />

            <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24">
                <div className="anim-1 w-full max-w-md">
                    <div className="glass-card p-8">
                        <div className="mb-6 text-center">
                            <h1 className="text-gradient-brand text-2xl font-bold tracking-tight">
                                Welcome back
                            </h1>
                            <p className="mt-1.5 text-sm text-mist-600">
                                Sign in to continue to Resume Lens
                            </p>
                        </div>

                        <SignIn fallbackRedirectUrl={target} signUpUrl={signUpHref} />
                    </div>
                </div>
            </main>
        </>
    );
}