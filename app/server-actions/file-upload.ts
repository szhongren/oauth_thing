"use server";

import { createDriveService, getRedisClient } from "../lib/utils";
import { Readable } from "stream";

export async function uploadFile(formData: FormData) {
  const redis = getRedisClient();
  const sessionString = await redis.get("session");
  if (!sessionString) {
    console.error("Session not found in Redis");
    return;
  }
  const driveService = createDriveService(
    JSON.parse(sessionString).access_token
  );
  try {
    const file = formData.get("file") as File;
    // Convert to a readable stream for Google Drive upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);

    const response = await driveService.files.create({
      requestBody: {
        name: file.name, // Get the name of the uploaded file
      },
      media: {
        mimeType: file.type,
        body: readable, // Use the file stream for upload
      },
    });

    console.log(
      "File uploaded successfully to Google Drive:",
      response.data.id
    );
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
  }
}
