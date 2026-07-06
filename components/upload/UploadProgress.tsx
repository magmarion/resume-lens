"use client";

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
            <path
                d="M2.5 6L5 8.5L9.5 3.5"
                stroke="#34d399"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
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
            className="animate-spin duration-[0.8s] linear"
        >
            <circle
                cx="6"
                cy="6"
                r="4.5"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
            />
            <path
                d="M6 1.5A4.5 4.5 0 0 1 10.5 6"
                stroke="#a78bfa"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function UploadProgress({ stage, fileName, errorMessage }: UploadProgressProps) {
    const stageIndex = STAGES.findIndex((s) => s.id === stage);

    // Helper to get border color for stage items
    const getStageBorder = (isActive: boolean, isDone: boolean) => {
        if (isActive) return "border-violet-600/25";
        if (isDone) return "border-emerald-400/15";
        return "border-white/5";
    };

    // Helper to get background color for stage items
    const getStageBackground = (isActive: boolean, isDone: boolean) => {
        if (isActive) return "bg-violet-600/12";
        if (isDone) return "bg-emerald-400/6";
        return "bg-white/2";
    };

    // Helper to get icon container border color
    const getIconBorder = (isActive: boolean, isDone: boolean) => {
        if (isActive) return "border-violet-400/30";
        if (isDone) return "border-emerald-400/30";
        return "border-white/8";
    };

    // Helper to get icon container background
    const getIconBackground = (isActive: boolean, isDone: boolean) => {
        if (isActive) return "bg-violet-600/20";
        if (isDone) return "bg-emerald-400/15";
        return "bg-white/4";
    };

    // Helper to get text color for stage label
    const getLabelColor = (isActive: boolean, isDone: boolean) => {
        if (isDone) return "text-emerald-300";
        if (isActive) return "text-[#e8e5f5]";
        return "text-[#52506a]";
    };

    return (
        <div className="w-full flex flex-col items-center gap-8 py-2">
            {/* File name pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/10 border border-violet-600/22 max-w-full">
                {/* PDF icon */}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <rect
                        x="2"
                        y="1"
                        width="8"
                        height="12"
                        rx="1.5"
                        stroke="#a78bfa"
                        strokeWidth="1.2"
                    />
                    <path
                        d="M9 1L12 4"
                        stroke="#a78bfa"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                    <rect
                        x="9"
                        y="1"
                        width="3"
                        height="3"
                        rx="0.5"
                        fill="#a78bfa"
                        fillOpacity="0.2"
                        stroke="#a78bfa"
                        strokeWidth="1.2"
                    />
                    <path
                        d="M4.5 6.5H9.5M4.5 9H7.5"
                        stroke="#a78bfa"
                        strokeWidth="1"
                        strokeLinecap="round"
                    />
                </svg>
                <span className="text-[12px] font-medium text-[#c4b5fd] truncate max-w-65">
                    {fileName}
                </span>
            </div>

            {/* Stage list */}
            <div className="flex flex-col gap-1 w-full max-w-85">
                {STAGES.map((s, i) => {
                    const isDone = stageIndex > i;
                    const isActive = stageIndex === i;
                    const isPending = stageIndex < i;

                    return (
                        <div
                            key={s.id}
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] transition-all duration-300 ${getStageBackground(isActive, isDone)
                                } border ${getStageBorder(isActive, isDone)} ${isPending ? "opacity-40" : "opacity-100"
                                }`}
                        >
                            {/* Status icon */}
                            <div
                                className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center border ${getIconBorder(
                                    isActive,
                                    isDone
                                )} ${getIconBackground(isActive, isDone)}`}
                            >
                                {isDone && <CheckIcon />}
                                {isActive && <SpinnerIcon />}
                                {isPending && (
                                    <span className="text-[10px] text-[#52506a] font-semibold">
                                        {i + 1}
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div
                                    className={`text-[13px] ${isActive ? "font-semibold" : "font-normal"
                                        } ${getLabelColor(isActive, isDone)} tracking-[-0.01em]`}
                                >
                                    {s.label}
                                </div>
                                {isActive && (
                                    <div className="text-[11px] text-[#7c7a92] mt-px">
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
                <div className="w-full max-w-85 p-3 px-4 rounded-[10px] bg-rose-400/8 border border-rose-400/20">
                    <div className="text-[12px] font-semibold text-rose-400 mb-1">
                        Upload failed
                    </div>
                    <div className="text-[12px] text-[#9f9cb8] leading-normal">
                        {errorMessage}
                    </div>
                </div>
            )}
        </div>
    );
}