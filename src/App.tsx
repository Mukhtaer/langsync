import React, { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import JSONEditor from "./components/JSONEditor";
import DownloadButton from "./components/DownloadButton";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
  const [jsonData, setJsonData] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleFileUpload = (data: any) => {
    setJsonData(data);
  };

  const handleUpdate = (key: string, value: string) => {
    setJsonData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`container mx-auto p-6 ${
        isDarkMode ? "dark:bg-gray-800" : "bg-gray-50"
      }`}
    >
      <header className="flex justify-between mb-6">
        <h1
          className={`text-4xl font-bold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          LangSync
        </h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white dark:bg-yellow-500 dark:text-black transition duration-300"
        >
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </header>

      {!Object.keys(jsonData).length ? (
        <FileUpload onUpload={handleFileUpload} />
      ) : (
        <>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <JSONEditor
            data={jsonData}
            onUpdate={handleUpdate}
            searchTerm={searchTerm}
          />
          <div className="mt-6">
            <DownloadButton jsonData={jsonData} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
