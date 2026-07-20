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
        rootBox: "!w-full !max-w-full !overflow-visible",
        cardBox: "!bg-transparent !shadow-none !border-none !w-full !max-w-full !overflow-visible",
        card: "!bg-transparent !shadow-none !border-none !p-0 !w-full !max-w-full !overflow-visible",

        // Fix the form container
        form: "!w-full !max-w-full !overflow-visible !px-0",

        // Fix the input field
        formField: "!w-full !max-w-full !overflow-visible",
        formFieldRow: "!w-full !max-w-full !overflow-visible",
        formFieldInput: `
            !bg-white/4 
            !border-white/10 
            !text-mist-200 
            !w-full 
            !max-w-full 
            !box-border 
            !px-4 
            !py-2.5
            !overflow-visible
            !outline-none
            !focus:border-brand-500
            !focus:ring-2
            !focus:ring-brand-500/20
        `,

        // Fix the continue button
        formButtonPrimary: `
            !bg-linear-to-br 
            !from-brand-600 
            !to-brand-500 
            hover:!opacity-90 
            transition-opacity 
            normal-case 
            text-[14px] 
            font-semibold 
            !w-full 
            !max-w-full 
            !box-border 
            !px-4 
            !py-2.5
            !overflow-visible
            !rounded-lg
        `,

        // Social buttons
        socialButtonsRoot: "!w-full !overflow-visible",
        socialButtons: "!w-full !overflow-visible",
        socialButtonsBlockButton: `
    !border-white/10 
    !bg-white/5
    hover:!bg-white/10 
    !w-full 
    !max-w-full 
    !box-border 
    !relative 
    !flex 
    !justify-center 
    !items-center 
    !px-4 
    !py-2.5
    !overflow-visible
    !rounded-lg
    !transition-all
    !duration-200
`,
        socialButtonsBlockButtonText: "!text-mist-200",
        socialButtonsProviderIcon: "!shrink-0",

        // Hide development badges
        lastAuthenticationStrategyBadge: "!hidden",
        developmentBadge: "!hidden",
        developmentBadge__development: "!hidden",

        header: "!hidden",
        headerTitle: "!hidden",
        headerSubtitle: "!hidden",

        // User menu
        userButtonPopoverCard: "!bg-ink-900 !border !border-white/8 !shadow-xl",
        userButtonPopoverActionButton: "hover:!bg-white/5",

        // Footer links
        footerActionLink: "!text-brand-400 hover:!text-brand-400/80",
        dividerLine: "!bg-white/8",
        dividerText: "!text-mist-700",
        formFieldLabel: "!text-mist-500",
        identityPreviewText: "!text-mist-400",
        identityPreviewEditButton: "!text-brand-400",
    },
};