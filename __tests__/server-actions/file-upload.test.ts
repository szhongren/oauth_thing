import { uploadFile } from "@/app/server-actions/file-upload";

describe("uploadFile", () => {
  it("should log error if session is not found in Redis", async () => {
    const formData = new FormData();

    // Mock the console.error function
    jest.spyOn(console, "error").mockImplementation();

    await uploadFile(formData);

    expect(console.error).toHaveBeenCalledWith("Session not found in Redis");
  });
});
