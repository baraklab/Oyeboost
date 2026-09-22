import { NextResponse } from "next/server";

const FUNCTIONS_URL = `${process.env.SUPABASE_URL}/functions/v1`;

export async function GET() {
  try {
    const res = await fetch(`${FUNCTIONS_URL}/health`);
    const data = await res.json().catch(() => null);
    return NextResponse.json(data ?? { status: "error" }, { status: res.status });
  } catch {
    return NextResponse.json({ status: "error", time: new Date().toISOString() }, { status: 503 });
  }
}
