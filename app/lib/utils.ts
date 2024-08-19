import { drive } from "@googleapis/drive";
import { OAuth2Client } from "google-auth-library";
import Redis from "ioredis";

const redis = new Redis();

export function createDriveService(access_token: string) {
  const oauth2Client = new OAuth2Client();
  oauth2Client.setCredentials({
    access_token: access_token,
  });
  return drive({
    version: "v3",
    auth: oauth2Client,
  });
}

export function getRedisClient() {
  return redis;
}
