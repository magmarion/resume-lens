// React-PDF template for the exported analysis report.
// Note: react-pdf uses its own layout engine (Yoga/flexbox) — this is NOT
// HTML/CSS. Only View, Text, and StyleSheet primitives are available.
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { AnalysisResult } from "@/types/analysis";

interface AnalysisDocumentProps {
    result: AnalysisResult;
    fileName: string;
    generatedAt: Date;
}

const COLORS = {
    ink: "#1a1a2e",
    mutedDark: "#3f3d56",
    muted: "#6b7280",
    mutedLight: "#9ca3af",
    border: "#e5e7eb",
    borderLight: "#f3f4f6",
    brand: "#6349e4",
    brandLight: "#f4f1ff",
    brandBorder: "#ddd4ff",
    success: "#059669",
    successLight: "#ecfdf5",
    successBorder: "#a7f3d0",
    danger: "#dc2626",
    dangerLight: "#fef2f2",
    dangerBorder: "#fecaca",
    warning: "#b45309",
    warningLight: "#fffbeb",
    warningBorder: "#fde68a",
};

function scoreLabel(score: number): string {
    if (score >= 90) return "Exceptional";
    if (score >= 75) return "Good";
    if (score >= 60) return "Average";
    if (score >= 40) return "Below Average";
    return "Needs Work";
}

function scoreColor(score: number): string {
    if (score >= 80) return COLORS.success;
    if (score >= 60) return COLORS.brand;
    if (score >= 40) return COLORS.warning;
    return COLORS.danger;
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 42,
        paddingBottom: 56,
        paddingHorizontal: 42,
        fontFamily: "Helvetica",
        fontSize: 10,
        color: COLORS.ink,
        backgroundColor: "#ffffff",
    },

    // Header
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 6,
    },
    brandName: {
        fontFamily: "Helvetica-Bold",
        fontSize: 14,
        color: COLORS.brand,
    },
    reportTitle: {
        fontSize: 9,
        color: COLORS.muted,
        marginTop: 2,
    },
    headerRight: {
        alignItems: "flex-end",
    },
    fileName: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: COLORS.mutedDark,
    },
    generatedDate: {
        fontSize: 8,
        color: COLORS.mutedLight,
        marginTop: 2,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        marginTop: 10,
        marginBottom: 18,
    },

    // Score section
    scoreRow: {
        flexDirection: "row",
        gap: 16,
        marginBottom: 20,
    },
    scoreBox: {
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    scoreNumber: {
        fontFamily: "Helvetica-Bold",
        fontSize: 30,
    },
    scoreLabelText: {
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
        marginTop: 3,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    summaryBox: {
        flex: 1,
        justifyContent: "center",
    },
    sectionLabel: {
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
        color: COLORS.mutedLight,
        textTransform: "uppercase",
        letterSpacing: 0.6,
        marginBottom: 5,
    },
    summaryText: {
        fontSize: 10,
        lineHeight: 1.6,
        color: COLORS.mutedDark,
    },
    atsPill: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        marginTop: 8,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        borderWidth: 1,
    },
    atsPillText: {
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
    },

    // Generic section card
    card: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        marginBottom: 14,
        overflow: "hidden",
    },
    cardHeader: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    cardHeaderText: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    cardBody: {
        padding: 12,
    },

    // Two-column strengths/weaknesses
    twoCol: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 14,
    },
    halfCard: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        overflow: "hidden",
    },
    listItem: {
        flexDirection: "row",
        marginBottom: 6,
    },
    listBullet: {
        width: 10,
        fontSize: 9,
    },
    listText: {
        flex: 1,
        fontSize: 9,
        lineHeight: 1.5,
        color: COLORS.mutedDark,
    },

    // Keyword chips
    chipRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    },
    chip: {
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
    },

    // Job match score bar
    matchBarTrack: {
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.borderLight,
        marginTop: 6,
        marginBottom: 12,
    },
    matchBarFill: {
        height: 6,
        borderRadius: 3,
    },

    // Suggestions
    suggestionCard: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        marginBottom: 10,
        overflow: "hidden",
    },
    suggestionHeader: {
        flexDirection: "row",
        gap: 8,
        padding: 10,
        backgroundColor: COLORS.brandLight,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    suggestionNumber: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: COLORS.brand,
        color: "#ffffff",
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
        textAlign: "center",
        paddingTop: 3,
    },
    suggestionReason: {
        flex: 1,
        fontSize: 8.5,
        lineHeight: 1.5,
        color: COLORS.mutedDark,
    },
    suggestionBody: {
        padding: 10,
        gap: 8,
    },
    origBox: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: COLORS.dangerLight,
        borderWidth: 1,
        borderColor: COLORS.dangerBorder,
    },
    improvedBox: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: COLORS.successLight,
        borderWidth: 1,
        borderColor: COLORS.successBorder,
    },
    boxLabel: {
        fontSize: 7,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 3,
    },
    boxText: {
        fontSize: 9,
        lineHeight: 1.5,
    },

    // Footer
    footer: {
        position: "absolute",
        bottom: 24,
        left: 42,
        right: 42,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
        paddingTop: 8,
    },
    footerText: {
        fontSize: 7.5,
        color: COLORS.mutedLight,
    },
});

export function AnalysisDocument({ result, fileName, generatedAt }: AnalysisDocumentProps) {
    const sColor = scoreColor(result.score);
    const dateStr = generatedAt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

    return (
        <Document title={`Resume Analysis — ${fileName}`} author="Resume Lens">
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.brandName}>Resume Lens</Text>
                        <Text style={styles.reportTitle}>Resume Analysis Report</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.fileName}>{fileName}</Text>
                        <Text style={styles.generatedDate}>Generated {dateStr}</Text>
                    </View>
                </View>
                <View style={styles.divider} />

                {/* Score + Summary */}
                <View style={styles.scoreRow}>
                    <View style={[styles.scoreBox, { borderColor: sColor + "55" }]}>
                        <Text style={[styles.scoreNumber, { color: sColor }]}>{result.score}</Text>
                        <Text style={[styles.scoreLabelText, { color: sColor }]}>{scoreLabel(result.score)}</Text>
                    </View>
                    <View style={styles.summaryBox}>
                        <Text style={styles.sectionLabel}>Summary</Text>
                        <Text style={styles.summaryText}>{result.summary}</Text>
                        <View
                            style={[
                                styles.atsPill,
                                {
                                    backgroundColor: result.atsSafe ? COLORS.successLight : COLORS.dangerLight,
                                    borderColor: result.atsSafe ? COLORS.successBorder : COLORS.dangerBorder,
                                },
                            ]}
                        >
                            <Text style={[styles.atsPillText, { color: result.atsSafe ? COLORS.success : COLORS.danger }]}>
                                {result.atsSafe ? "ATS Safe" : "ATS Issues Detected"}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Job Match — only if present */}
                {result.jdMatch && (
                    <View style={styles.card}>
                        <View style={[styles.cardHeader, { backgroundColor: COLORS.brandLight }]}>
                            <Text style={[styles.cardHeaderText, { color: COLORS.brand }]}>Job Description Match</Text>
                        </View>
                        <View style={styles.cardBody}>
                            <Text style={{ fontSize: 20, fontFamily: "Helvetica-Bold", color: sColor, marginBottom: 2 }}>
                                {result.jdMatch.matchScore}%
                            </Text>
                            <View style={styles.matchBarTrack}>
                                <View style={[styles.matchBarFill, { width: `${result.jdMatch.matchScore}%`, backgroundColor: sColor }]} />
                            </View>

                            <View style={{ flexDirection: "row", gap: 16 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.sectionLabel, { color: COLORS.success }]}>Matched Keywords</Text>
                                    <View style={styles.chipRow}>
                                        {result.jdMatch.matchedKeywords.map((kw, i) => (
                                            <Text key={i} style={[styles.chip, { color: COLORS.success, borderColor: COLORS.successBorder, backgroundColor: COLORS.successLight }]}>
                                                {kw}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.sectionLabel, { color: COLORS.danger }]}>Missing Keywords</Text>
                                    <View style={styles.chipRow}>
                                        {result.jdMatch.missingKeywords.map((kw, i) => (
                                            <Text key={i} style={[styles.chip, { color: COLORS.danger, borderColor: COLORS.dangerBorder, backgroundColor: COLORS.dangerLight }]}>
                                                {kw}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            </View>

                            <Text style={{ fontSize: 9, lineHeight: 1.5, color: COLORS.mutedDark, marginTop: 10 }}>
                                {result.jdMatch.recommendation}
                            </Text>
                        </View>
                    </View>
                )}

                {/* Strengths / Weaknesses */}
                <View style={styles.twoCol}>
                    <View style={styles.halfCard}>
                        <View style={[styles.cardHeader, { backgroundColor: COLORS.successLight }]}>
                            <Text style={[styles.cardHeaderText, { color: COLORS.success }]}>Strengths</Text>
                        </View>
                        <View style={styles.cardBody}>
                            {result.strengths.map((s, i) => (
                                <View key={i} style={styles.listItem}>
                                    <Text style={[styles.listBullet, { color: COLORS.success }]}>+</Text>
                                    <Text style={styles.listText}>{s}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.halfCard}>
                        <View style={[styles.cardHeader, { backgroundColor: COLORS.dangerLight }]}>
                            <Text style={[styles.cardHeaderText, { color: COLORS.danger }]}>Weaknesses</Text>
                        </View>
                        <View style={styles.cardBody}>
                            {result.weaknesses.map((w, i) => (
                                <View key={i} style={styles.listItem}>
                                    <Text style={[styles.listBullet, { color: COLORS.danger }]}>–</Text>
                                    <Text style={styles.listText}>{w}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Missing skills */}
                <View style={styles.card}>
                    <View style={[styles.cardHeader, { backgroundColor: COLORS.warningLight }]}>
                        <Text style={[styles.cardHeaderText, { color: COLORS.warning }]}>Missing Skills &amp; Keywords</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <View style={styles.chipRow}>
                            {result.missingSkills.map((skill, i) => (
                                <Text key={i} style={[styles.chip, { color: COLORS.warning, borderColor: COLORS.warningBorder, backgroundColor: COLORS.warningLight }]}>
                                    {skill}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Suggestions */}
                <Text style={[styles.sectionLabel, { marginBottom: 8 }]}>AI Bullet Rewrites</Text>
                {result.suggestions.map((s, i) => (
                    <View key={i} style={styles.suggestionCard} wrap={false}>
                        <View style={styles.suggestionHeader}>
                            <Text style={styles.suggestionNumber}>{i + 1}</Text>
                            <Text style={styles.suggestionReason}>{s.reason}</Text>
                        </View>
                        <View style={styles.suggestionBody}>
                            <View style={styles.origBox}>
                                <Text style={[styles.boxLabel, { color: COLORS.danger }]}>Original</Text>
                                <Text style={[styles.boxText, { color: COLORS.mutedDark }]}>&ldquo;{s.original}&rdquo;</Text>
                            </View>
                            <View style={styles.improvedBox}>
                                <Text style={[styles.boxLabel, { color: COLORS.success }]}>Improved</Text>
                                <Text style={[styles.boxText, { color: COLORS.mutedDark }]}>{s.improved}</Text>
                            </View>
                        </View>
                    </View>
                ))}

                {/* Footer */}
                <View style={styles.footer} fixed>
                    <Text style={styles.footerText}>Generated by ResumeAI</Text>
                    <Text
                        style={styles.footerText}
                        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
                    />
                </View>
            </Page>
        </Document>
    );
}