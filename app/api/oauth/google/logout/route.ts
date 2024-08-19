import { NextResponse } from "next/server";
import { getRedisClient } from "@/app/lib/utils";

export async function GET() {
  const redis = getRedisClient();
  const sessionString = await redis.get("session");
  if (!sessionString) {
    return NextResponse.json({ message: "No session found" }, { status: 401 });
  }
  const session = JSON.parse(sessionString);
  const response = await fetch(
    `https://oauth2.googleapis.com/revoke?token=${session.refresh_token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  await redis.del("session");
  return NextResponse.json({ message: "Logged out" });
}
