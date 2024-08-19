import Redis from "ioredis";
import { NextResponse } from "next/server";

export async function GET() {
  const redis = new Redis();
  const sessionString = await redis.get("session");
  if (!sessionString) {
    return NextResponse.json({ message: "No session found" }, { status: 404 });
  }
  const session = JSON.parse(sessionString);
  return NextResponse.json({
    email: session.email,
    name: session.name,
    picture: session.picture,
  });
}
