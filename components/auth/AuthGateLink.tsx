"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import type { ReactNode } from "react";

interface AuthGateLinkProps {
    href: string;
    className?: string;
    children: ReactNode;
}

export default function AuthGateLink({ href, className, children }: AuthGateLinkProps) {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) {
        return (
            <span className={`${className ?? ""} pointer-events-none opacity-60`} aria-hidden="true">
                {children}
            </span>
        );
    }

    if (isSignedIn) {
        return (
            <Link href={href} className={className}>
                {children}
            </Link>
        );
    }

    return (
        <Link href={`/sign-in?redirect_url=${encodeURIComponent(href)}`} className={className}>
            {children}
        </Link>
    );
}