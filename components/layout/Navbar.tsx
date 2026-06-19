'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = ['Product', 'Pricing', 'Docs', 'Changelog'] as const

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                transition: 'background 0.35s ease, border-color 0.35s ease',
                background: scrolled ? 'rgba(6,5,10,0.78)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
                borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
            }}
        >
            <div
                style={{
                    maxWidth: 1140,
                    margin: '0 auto',
                    padding: '0 28px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
                    <div
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 16px rgba(167,139,250,0.4)',
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path
                                d="M3.5 11L7 3L10.5 11"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path d="M4.5 8.5H9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span style={{ color: '#f1f0f5', fontWeight: 650, fontSize: 15, letterSpacing: '-0.03em' }}>
                        Apex
                    </span>
                </Link>

                {/* Center links */}
                <div style={{ display: 'flex', gap: 28 }}>
                    {NAV_LINKS.map((label) => (
                        <Link key={label} href="#" className="nav-link">
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Right CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Link href="#" className="nav-link">
                        Sign in
                    </Link>
                    <Link
                        href="#"
                        className="btn-primary"
                        style={{ padding: '8px 18px', fontSize: 13 }}
                    >
                        Get started
                    </Link>
                </div>
            </div>
        </nav>
    )
}