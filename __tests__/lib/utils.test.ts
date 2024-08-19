import "@testing-library/jest-dom";
import { createDriveService, getRedisClient } from "../../app/lib/utils";

describe("createDriveService", () => {
  it("should create a Drive service", () => {
    const driveService = createDriveService("access_token");
    expect(driveService).toBeDefined();
  });
});
