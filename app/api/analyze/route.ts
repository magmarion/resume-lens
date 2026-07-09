// app/api/analyze/route.ts
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import type { AnalysisResult } from "@/types/analysis";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MAX_TEXT_CHARS = 12000;
const MAX_JD_CHARS = 6000;

const BASE_SCHEMA = `{
  "score": <integer 0-100>,
  "atsSafe": <boolean>,
  "summary": <string: 2-3 sentences, plain English overview of the resume>,
  "strengths": <string[]: exactly 4 specific strengths, each 1 sentence>,
  "weaknesses": <string[]: exactly 4 specific weaknesses, each 1 sentence>,
  "missingSkills": <string[]: 4-8 keywords or skills that are missing but expected>,
  "suggestions": [
    {
      "original": <string: the weak phrase or bullet from the resume, quoted exactly as it appears>,
      "improved": <string: your rewritten version in clean plain English>,
      "reason": <string: one sentence explaining why this is better>
    }
  ]
}`;

const JD_SCHEMA_ADDITION = `

You are ALSO given a job description below. In addition to the fields above,
include a "jdMatch" object in the JSON:

"jdMatch": {
  "matchScore": <integer 0-100: how well this resume matches the job description>,
  "matchedKeywords": <string[]: 4-10 specific skills/keywords/requirements from the job description that ARE present in the resume>,
  "missingKeywords": <string[]: 4-10 specific skills/keywords/requirements from the job description that are NOT present in the resume>,
  "recommendation": <string: 1-2 sentences on the single most impactful change to improve the match>
}`;

function buildSystemPrompt(hasJd: boolean): string {
    return `You are an expert resume reviewer and ATS (Applicant Tracking System) specialist with 15 years of experience in technical recruiting.

Your job is to analyse a resume${hasJd ? " against a specific job description" : ""} and return a JSON object — nothing else. No preamble, no markdown, no code fences. Just the raw JSON object.

The JSON must strictly follow this schema:
${BASE_SCHEMA}${hasJd ? JD_SCHEMA_ADDITION : ""}

Scoring guide:
- 90-100: Exceptional. ATS-optimised, quantified achievements, strong action verbs.
- 75-89: Good. Minor improvements needed.
- 60-74: Average. Several issues affecting ATS or readability.
- 40-59: Below average. Major structural or content problems.
- 0-39: Poor. Needs significant work.

Rules:
- Return ONLY the JSON object. No other text.
- suggestions array must have exactly 3 items.
- If the resume text seems to be in a language other than English, still analyse it and respond in English.
- Be specific — reference actual content from the resume, not generic advice.
- missingSkills should reflect skills typical for the apparent role/industry.${hasJd ? "\n- matchedKeywords and missingKeywords must be drawn directly from the job description text provided, not invented." : ""}`;
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as { text?: string; fileName?: string; jobDescription?: string };

        if (!body.text || typeof body.text !== "string") {
            return NextResponse.json({ error: "No resume text provided." }, { status: 400 });
        }

        const resumeText = body.text.slice(0, MAX_TEXT_CHARS);
        const jobDescription = body.jobDescription?.trim().slice(0, MAX_JD_CHARS) || "";
        const hasJd = jobDescription.length > 0;

        const userContent = hasJd
            ? `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}\n\nPlease analyse this resume against the job description and return the JSON object.`
            : `Please analyse this resume and return the JSON object:\n\n${resumeText}`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: hasJd ? 1900 : 1500,
            messages: [
                { role: "system", content: buildSystemPrompt(hasJd) },
                { role: "user", content: userContent },
            ],
        });

        const raw = completion.choices[0]?.message?.content ?? "";

        const cleaned = raw
            .trim()
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "");

        let result: AnalysisResult;
        try {
            result = JSON.parse(cleaned) as AnalysisResult;
        } catch {
            console.error("[analyze] JSON parse failed. Raw:", raw);
            return NextResponse.json(
                { error: "AI returned an unexpected format. Please try again." },
                { status: 502 }
            );
        }

        if (
            typeof result.score !== "number" ||
            !Array.isArray(result.strengths) ||
            !Array.isArray(result.weaknesses) ||
            !Array.isArray(result.suggestions)
        ) {
            return NextResponse.json(
                { error: "AI response was incomplete. Please try again." },
                { status: 502 }
            );
        }

        result.score = Math.min(100, Math.max(0, Math.round(result.score)));

        // Validate jdMatch shape if present; drop it rather than fail the whole request
        if (result.jdMatch) {
            const jm = result.jdMatch;
            const validShape =
                typeof jm.matchScore === "number" &&
                Array.isArray(jm.matchedKeywords) &&
                Array.isArray(jm.missingKeywords) &&
                typeof jm.recommendation === "string";

            if (!validShape) {
                result.jdMatch = null;
            } else {
                result.jdMatch.matchScore = Math.min(100, Math.max(0, Math.round(jm.matchScore)));
            }
        } else if (!hasJd) {
            result.jdMatch = null;
        }

        return NextResponse.json(result);

    } catch (err) {
        console.error("[analyze]", err);
        return NextResponse.json(
            { error: "Analysis failed. Please try again." },
            { status: 500 }
        );
    }
}