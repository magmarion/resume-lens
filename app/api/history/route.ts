import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb";

interface HistoryDoc {
    userId: string;
    fileName: string;
    score: number;
    atsSafe: boolean;
    createdAt: Date;
}

const DB_NAME = "resumeai";
const COLLECTION = "analyses";

export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);

        const docs = await db
            .collection<HistoryDoc>(COLLECTION)
            .find({ userId })
            .sort({ createdAt: -1 })
            .limit(50)
            .toArray();

        const entries = docs.map((d) => ({
            id: d._id.toString(),
            fileName: d.fileName,
            score: d.score,
            atsSafe: d.atsSafe,
            createdAt: d.createdAt,
        }));

        return NextResponse.json({ entries });
    } catch (err) {
        console.error("[history:GET]", err);
        return NextResponse.json({ error: "Failed to load history." }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = (await req.json()) as { fileName?: string; score?: number; atsSafe?: boolean };

        if (!body.fileName || typeof body.score !== "number") {
            return NextResponse.json({ error: "fileName and score are required." }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db(DB_NAME);

        await db.collection<HistoryDoc>(COLLECTION).insertOne({
            userId,
            fileName: body.fileName,
            score: Math.min(100, Math.max(0, Math.round(body.score))),
            atsSafe: Boolean(body.atsSafe),
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[history:POST]", err);
        return NextResponse.json({ error: "Failed to save history entry." }, { status: 500 });
    }
}