"use client";

import { useState, useTransition } from "react";
import { uploadFile } from "../server-actions/file-upload";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
      <form action={uploadFile} method="post" encType="multipart/form-data">
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
