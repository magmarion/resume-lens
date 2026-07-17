export const clerkAppearance = {
    variables: {
        colorPrimary: "#818cf8",           // brand-500 — primary buttons, links
        colorPrimaryForeground: "#ffffff",

        colorBackground: "#0e0d16",        // ink-900 — card/popover surface
        colorForeground: "#e8e5f5",        // mist-300 — primary text
        colorMutedForeground: "#7c7a92",   // mist-600 — secondary/subtitle text
        colorMuted: "rgba(255,255,255,0.03)",

        colorInput: "rgba(255,255,255,0.04)",
        colorInputForeground: "#f1f0f5",   // mist-200

        colorDanger: "#fb7185",            // danger-400
        colorSuccess: "#34d399",           // success-400
        colorWarning: "#fbbf24",           // warning-400
        colorNeutral: "#ffffff",

        colorShimmer: "#a78bfa",           // brand-400
        colorBorder: "rgba(255,255,255,0.08)",
        colorRing: "#818cf8",

        borderRadius: "10px",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    elements: {
        card: "bg-transparent shadow-none border-none p-0",
        rootBox: "w-full",

        userButtonPopoverCard: "bg-ink-900 border border-white/8 shadow-xl",
        userButtonPopoverActionButton: "hover:bg-white/5",

        formButtonPrimary:
            "bg-linear-to-br from-brand-600 to-brand-500 hover:opacity-90 transition-opacity normal-case text-[14px] font-semibold",
        footerActionLink: "text-brand-400 hover:text-brand-400/80",
        socialButtonsBlockButton: "border-white/10 hover:bg-white/5",
        dividerLine: "bg-white/8",
        dividerText: "text-mist-700",
        formFieldLabel: "text-mist-500",
        formFieldInput: "bg-white/4 border-white/10 text-mist-200",
        identityPreviewText: "text-mist-400",
        identityPreviewEditButton: "text-brand-400",
    },
};