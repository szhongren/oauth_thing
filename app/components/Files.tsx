import { useEffect, useState } from "react";
import DownloadSelector from "./DownloadSelector";

export default function Files() {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => setFiles(data));
  }, []);

  return (
    <div className="table w-full">
      <div className="table-header-group">
        <div className="table-row">
          <div className="table-cell">#</div>
          <div className="table-cell">File Name</div>
          <div className="table-cell">Type</div>
          <div className="table-cell">Last Modified</div>
          <div className="table-cell">Download</div>
          <div className="table-cell">Delete</div>
        </div>
      </div>
      <div id="table-body" className="table-row-group">
        {files.map((file, idx) => (
          <div key={idx} className="table-row">
            <div className="table-cell">{idx + 1}</div>
            <div className="table-cell">{file.name || "unknown"}</div>
            <div className="table-cell">
              {file.mimeType?.split("/")[1] || "unknown"}
            </div>
            <div className="table-cell">{file.modifiedTime || "unknown"}</div>
            <div className="table-cell">
              <DownloadSelector item={file}></DownloadSelector>
            </div>
            <div className="table-cell">
              <button
                className="text-red-500"
                onClick={async () => {
                  const res = await fetch(`/api/files/${file.id}`, {
                    method: "DELETE",
                  });
                  if (res.status < 300)
                    setFiles(files.filter((f) => f.id !== file.id));
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
