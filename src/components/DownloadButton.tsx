import React from "react";
import { saveAs } from "file-saver";

interface DownloadButtonProps {
  jsonData: { [key: string]: string };
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ jsonData }) => {
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "updated.json");
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
    >
      Download JSON
    </button>
  );
};

export default DownloadButton;
