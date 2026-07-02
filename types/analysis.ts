// Single source of truth for the Groq analysis response shape.
// Both the API route and the analyze page import from here.

export interface Suggestion {
    original: string;   // the weak bullet/phrase from the resume
    improved: string;   // the AI-rewritten version
    reason: string;     // brief explanation of why this is better
}

export interface AnalysisResult {
    score: number;           // 0–100 overall resume score
    atsSafe: boolean;        // passes ATS parsing
    strengths: string[];     // 3–5 things done well
    weaknesses: string[];    // 3–5 areas to improve
    missingSkills: string[]; // keywords/skills absent but expected for the role
    suggestions: Suggestion[]; // 2–4 concrete bullet rewrites
    summary: string;         // 2–3 sentence plain-English overview
}