// lib/clerkAppearance.ts
export const clerkAppearance = {
    variables: {
        colorPrimary: "#818cf8",
        colorPrimaryForeground: "#ffffff",

        colorBackground: "#0e0d16",
        colorForeground: "#e8e5f5",
        colorMutedForeground: "#7c7a92",
        colorMuted: "rgba(255,255,255,0.03)",

        colorInput: "rgba(255,255,255,0.04)",
        colorInputForeground: "#f1f0f5",

        colorDanger: "#fb7185",
        colorSuccess: "#34d399",
        colorWarning: "#fbbf24",
        colorNeutral: "#ffffff",

        colorShimmer: "#a78bfa",
        colorBorder: "rgba(255,255,255,0.08)",
        colorRing: "#818cf8",

        borderRadius: "10px",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    },
    elements: {
        rootBox: "!w-full !max-w-full",
        cardBox: "!bg-transparent !shadow-none !border-none !w-full !max-w-full !overflow-hidden",
        card: "!bg-transparent !shadow-none !border-none !p-0 !w-full !max-w-full",

        formFieldInput: "!bg-white/4 !border-white/10 !text-mist-200 !w-full !max-w-full !box-border",
        formButtonPrimary:
            "!bg-linear-to-br !from-brand-600 !to-brand-500 hover:!opacity-90 transition-opacity normal-case text-[14px] font-semibold !w-full !max-w-full !box-border",

        // Fix social buttons - remove the dark overlay on hover
        socialButtonsBlockButton: `
            !border-white/10 
            hover:!bg-white/5 
            !w-full 
            !max-w-full 
            !box-border 
            !relative 
            !overflow-hidden
            !transition-colors
        `,
        socialButtonsBlockButton__google: `
            !border-white/10 
            hover:!bg-white/5 
            !w-full 
            !max-w-full 
            !box-border 
            !relative 
            !overflow-hidden
            !transition-colors
        `,
        socialButtons: "!w-full",
        formFieldRow: "!w-full !max-w-full",
        form: "!w-full !max-w-full",
        header: "!hidden",
        headerTitle: "!hidden",
        headerSubtitle: "!hidden",
        userButtonPopoverCard: "!bg-ink-900 !border !border-white/8 !shadow-xl",
        userButtonPopoverActionButton: "hover:!bg-white/5",

        footerActionLink: "!text-brand-400 hover:!text-brand-400/80",
        dividerLine: "!bg-white/8",
        dividerText: "!text-mist-700",
        formFieldLabel: "!text-mist-500",
        identityPreviewText: "!text-mist-400",
        identityPreviewEditButton: "!text-brand-400",

        // Hide development mode badge
        developmentBadge: "!hidden",
        developmentBadge__development: "!hidden",
    },
};