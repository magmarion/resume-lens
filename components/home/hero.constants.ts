import { Orb } from "./HeroBackground";

export const ORBS: Orb[] = [
    // Deep indigo — top-left
    {
        cx: 0.16,
        cy: 0.22,
        r: 0.58,
        color: "99,73,228",
        sinFreq: 0.0004,
        cosFreq: 0.0003,
        sinAmp: 0.04,
        cosAmp: 0.05,
        alpha: 0.26,
        alphaFade: 0.06
    },
    // Violet — top-right
    {
        cx: 0.84,
        cy: 0.28,
        r: 0.52,
        color: "168,85,247",
        sinFreq: 0.0005,
        cosFreq: 0.0004,
        sinAmp: 0.04,
        cosAmp: 0.06,
        alpha: 0.18,
        alphaFade: 0.06
    },
    // Sapphire — bottom-center
    {
        cx: 0.50,
        cy: 0.82,
        r: 0.50,
        color: "29,78,216",
        sinFreq: 0.0003,
        cosFreq: 0.0005,
        sinAmp: 0.06,
        cosAmp: 0.04,
        alpha: 0.18,
        alphaFade: 0.06
    },
    // Rose accent — mid-right
    {
        cx: 0.78,
        cy: 0.55,
        r: 0.30,
        color: "190,18,60",
        sinFreq: 0.0006,
        cosFreq: 0.0004,
        sinAmp: 0.03,
        cosAmp: 0.04,
        alpha: 0.12,
        alphaFade: 0.05
    },
    // Teal center glow
    {
        cx: 0.50,
        cy: 0.44,
        r: 0.32,
        color: "15,118,110",
        sinFreq: 0.0004,
        cosFreq: 0.0003,
        sinAmp: 0.03,
        cosAmp: 0.03,
        alpha: 0.10,
        alphaFade: 0.04
    },
];

export const NAV_LINKS = ["Features", "Pricing", "Examples", "Blog"] as const;

export const TRUST_COMPANIES = ["Google", "Meta", "Stripe", "Notion", "Figma", "Shopify"];

export const RESUME_CHECKS = [
    { label: "ATS Compatibility", ok: true, note: "Passes all major parsers" },
    { label: "Keyword Density", ok: true, note: "18 role-matched keywords" },
    { label: "Impact Statements", ok: false, note: "3 bullets lack metrics" },
    { label: "Formatting", ok: true, note: "Clean single-column layout" },
    { label: "Action Verbs", ok: false, note: 'Avoid "responsible for"' },
] as const;

export const SCORE = 87;

export const BADGE_TEXT = "AI-powered · Instant feedback · Free to start";