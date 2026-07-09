export interface Suggestion {
    original: string;
    improved: string;
    reason: string;
}

export interface JdMatch {
    matchScore: number;         // 0-100 how well the resume matches the job description
    matchedKeywords: string[];  // skills/keywords from the JD found in the resume
    missingKeywords: string[];  // skills/keywords from the JD NOT found in the resume
    recommendation: string;     // 1-2 sentences on how to improve the match
}

export interface AnalysisResult {
    score: number;
    atsSafe: boolean;
    strengths: string[];
    weaknesses: string[];
    missingSkills: string[];
    suggestions: Suggestion[];
    summary: string;
    jdMatch?: JdMatch | null;   // present only when a job description was provided
}