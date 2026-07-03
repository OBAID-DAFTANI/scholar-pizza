import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "scholar@2026";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
