import { NextRequest, NextResponse } from "next/server";
import { createDriveService, getRedisClient } from "../../../lib/utils";

export async function DELETE(request: NextRequest, { params }) {
  const redis = getRedisClient();
  const sessionString = await redis.get("session");
  if (!sessionString) {
    return NextResponse.json({ message: "No session found" }, { status: 401 });
  }
  const driveService = createDriveService(
    JSON.parse(sessionString).access_token
  );
  let driveResponse = await driveService.files.delete({
    fileId: params.id,
  });

  if (driveResponse.status < 300) {
    return NextResponse.json({ message: "File deleted" });
  } else {
    return NextResponse.json(
      { message: "Failed to delete file" },
      { status: 500 }
    );
  }
}
