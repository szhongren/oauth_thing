import { NextRequest, NextResponse } from "next/server";
import { createDriveService, getRedisClient } from "../../lib/utils";

export async function GET(request: NextRequest) {
  const redis = getRedisClient();
  const sessionString = await redis.get("session");
  if (!sessionString) {
    return NextResponse.json({ message: "No session found" }, { status: 401 });
  }
  const driveService = createDriveService(
    JSON.parse(sessionString).access_token
  );
  let driveResponse = await driveService.files.list({
    fields:
      "nextPageToken, files(id, name, mimeType, modifiedTime, exportLinks, webContentLink)",
  });
  let result = driveResponse.data.files || [];
  let nextPageToken = driveResponse.data.nextPageToken;
  while (nextPageToken) {
    driveResponse = await driveService.files.list({
      fields:
        "nextPageToken, files(id, name, mimeType, modifiedTime, exportLinks, webContentLink)",
      pageToken: nextPageToken,
    });
    result = result.concat(driveResponse.data.files || []);
    nextPageToken = driveResponse.data.nextPageToken;
  }
  return NextResponse.json(result);
}
