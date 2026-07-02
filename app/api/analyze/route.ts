import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import type { AnalysisResult } from "@/types/analysis";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MAX_TEXT_CHARS = 12000;

const SYSTEM_PROMPT = `You are an expert resume reviewer and ATS (Applicant Tracking System) specialist with 15 years of experience in technical recruiting.

Your job is to analyse a resume and return a JSON object — nothing else. No preamble, no markdown, no code fences. Just the raw JSON object.

The JSON must strictly follow this schema:
{
  "score": <integer 0-100>,
  "atsSafe": <boolean>,
  "summary": <string: 2-3 sentences, plain English overview of the resume>,
  "strengths": <string[]: exactly 4 specific strengths, each 1 sentence>,
  "weaknesses": <string[]: exactly 4 specific weaknesses, each 1 sentence>,
  "missingSkills": <string[]: 4-8 keywords or skills that are missing but expected>,
  "suggestions": [
    {
      "original": <string: the weak phrase or bullet from the resume, quoted exactly>,
      "improved": <string: your rewritten version>,
      "reason": <string: one sentence explaining why this is better>
    }
  ]
}

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
- Be specific and reference actual content from the resume, not generic advice.
- missingSkills should reflect skills typical for the apparent role/industry.`;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as { text?: string; fileName?: string };

        if (!body.text || typeof body.text !== "string") {
            return NextResponse.json({ error: "No resume text provided." }, { status: 400 });
        }

        const resumeText = body.text.slice(0, MAX_TEXT_CHARS);

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 1500,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `Please analyse this resume and return the JSON object:\n\n${resumeText}`,
                },
            ],
        });

        const raw = completion.choices[0]?.message?.content ?? "";

        // Strip any accidental markdown fences
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

        return NextResponse.json(result);

    } catch (err) {
        console.error("[analyze]", err);
        return NextResponse.json(
            { error: "Analysis failed. Please try again." },
            { status: 500 }
        );
    }
}