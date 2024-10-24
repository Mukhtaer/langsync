import React from "react";
import { saveAs } from "file-saver";
import { FiDownload } from "react-icons/fi";

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
      className="text-gray-200 hover:bg-gray-700 p-3 rounded-md cursor-pointer transition-all flex items-center"
    >
      <FiDownload size={18} className="mr-4" />
      Save File
    </button>
  );
};

export default DownloadButton;
