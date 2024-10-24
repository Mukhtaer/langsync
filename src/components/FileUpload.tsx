import React, { useState, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

interface FileUploadProps {
  onUpload: (data: any, fileName: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        try {
          const json = JSON.parse(event.target.result as string);
          onUpload(json, file.name);
        } catch (err) {
          alert("Invalid JSON file");
        }
      }
    };
    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        LangSync
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
        Easily edit JSON files via a web interface.
      </p>
      <div
        className={`w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 text-center ${
          isDragging
            ? "border-4 border-dashed border-blue-500"
            : "border-2 border-gray-300 dark:border-gray-600"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FiUploadCloud
          size={64}
          className="text-blue-500 mb-4 animate-bounce"
        />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Upload your JSON file
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Drag & drop a file here or click the button below.
        </p>
        <button
          onClick={handleButtonClick}
          className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all focus:outline-none"
        >
          Choose a File
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileUpload;
