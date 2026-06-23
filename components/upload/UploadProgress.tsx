"use client";

// components/upload/UploadProgress.tsx
// Animated stage-by-stage progress shown after a file is dropped.

interface Stage {
    id: string;
    label: string;
    sublabel: string;
}

const STAGES: Stage[] = [
    { id: "validating", label: "Validating file", sublabel: "Checking format and size" },
    { id: "uploading", label: "Uploading", sublabel: "Sending to server" },
    { id: "parsing", label: "Extracting text", sublabel: "Reading your resume content" },
    { id: "redirecting", label: "Preparing analysis", sublabel: "Almost there…" },
];

export type UploadStage = Stage["id"] | "idle" | "error";

interface UploadProgressProps {
    stage: UploadStage;
    fileName: string;
    errorMessage?: string;
}

function CheckIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function SpinnerIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            style={{ animation: "spin 0.8s linear infinite" }}
        >
            <circle cx="6" cy="6" r="4.5" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <path d="M6 1.5A4.5 4.5 0 0 1 10.5 6" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export default function UploadProgress({ stage, fileName, errorMessage }: UploadProgressProps) {
    const stageIndex = STAGES.findIndex((s) => s.id === stage);

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 32,
                padding: "8px 0",
            }}
        >
            {/* File name pill */}
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 16px",
                    borderRadius: 999,
                    background: "rgba(99,73,228,0.10)",
                    border: "1px solid rgba(99,73,228,0.22)",
                    maxWidth: "100%",
                }}
            >
                {/* PDF icon */}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <rect x="2" y="1" width="8" height="12" rx="1.5" stroke="#a78bfa" strokeWidth="1.2" />
                    <path d="M9 1L12 4" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" />
                    <rect x="9" y="1" width="3" height="3" rx="0.5" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="1.2" />
                    <path d="M4.5 6.5H9.5M4.5 9H7.5" stroke="#a78bfa" strokeWidth="1" strokeLinecap="round" />
                </svg>
                <span
                    style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#c4b5fd",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: 260,
                    }}
                >
                    {fileName}
                </span>
            </div>

            {/* Stage list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%", maxWidth: 340 }}>
                {STAGES.map((s, i) => {
                    const isDone = stageIndex > i;
                    const isActive = stageIndex === i;
                    const isPending = stageIndex < i;

                    return (
                        <div
                            key={s.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "10px 14px",
                                borderRadius: 10,
                                background: isActive
                                    ? "rgba(99,73,228,0.12)"
                                    : isDone
                                        ? "rgba(52,211,153,0.06)"
                                        : "rgba(255,255,255,0.02)",
                                border: `1px solid ${isActive
                                        ? "rgba(99,73,228,0.25)"
                                        : isDone
                                            ? "rgba(52,211,153,0.15)"
                                            : "rgba(255,255,255,0.05)"
                                    }`,
                                transition: "all 0.3s ease",
                                opacity: isPending ? 0.4 : 1,
                            }}
                        >
                            {/* Status icon */}
                            <div
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: isDone
                                        ? "rgba(52,211,153,0.15)"
                                        : isActive
                                            ? "rgba(99,73,228,0.20)"
                                            : "rgba(255,255,255,0.04)",
                                    border: `1px solid ${isDone
                                            ? "rgba(52,211,153,0.30)"
                                            : isActive
                                                ? "rgba(167,139,250,0.30)"
                                                : "rgba(255,255,255,0.08)"
                                        }`,
                                }}
                            >
                                {isDone && <CheckIcon />}
                                {isActive && <SpinnerIcon />}
                                {isPending && (
                                    <span style={{ fontSize: 10, color: "#52506a", fontWeight: 600 }}>
                                        {i + 1}
                                    </span>
                                )}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div
                                    style={{
                                        fontSize: 13,
                                        fontWeight: isActive ? 600 : 400,
                                        color: isDone ? "#6ee7b7" : isActive ? "#e8e5f5" : "#52506a",
                                        letterSpacing: "-0.01em",
                                    }}
                                >
                                    {s.label}
                                </div>
                                {isActive && (
                                    <div style={{ fontSize: 11, color: "#7c7a92", marginTop: 1 }}>
                                        {s.sublabel}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Error state */}
            {stage === "error" && errorMessage && (
                <div
                    style={{
                        width: "100%",
                        maxWidth: 340,
                        padding: "12px 16px",
                        borderRadius: 10,
                        background: "rgba(251,113,133,0.08)",
                        border: "1px solid rgba(251,113,133,0.20)",
                    }}
                >
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#fb7185", marginBottom: 4 }}>
                        Upload failed
                    </div>
                    <div style={{ fontSize: 12, color: "#9f9cb8", lineHeight: 1.5 }}>
                        {errorMessage}
                    </div>
                </div>
            )}
        </div>
    );
}