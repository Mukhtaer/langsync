import { useState, useEffect } from "react";
import {
  FiUpload,
  FiDownload,
  FiSearch,
  FiChevronRight,
  FiChevronLeft,
  FiPlus,
  FiTrash,
  FiRefreshCw,
} from "react-icons/fi";
import FileUpload from "./components/FileUpload";
import JSONEditor from "./components/JSONEditor";
import DownloadButton from "./components/DownloadButton";
import SearchBar from "./components/SearchBar";
import saveAs from "file-saver";

const App: React.FC = () => {
  const [jsonData, setJsonData] = useState<{ [key: string]: string }>({});
  const [originalData, setOriginalData] = useState<{ [key: string]: string }>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isPaginationEnabled, setIsPaginationEnabled] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; data: { [key: string]: string } }[]
  >([]);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newKey, setNewKey] = useState<string>("");
  const [newValue, setNewValue] = useState<string>("");
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });

    saveAs(blob, `${currentFile ? currentFile : "updated"}.json`);
  };

  // Load files from local storage on mount
  useEffect(() => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    if (savedFiles) {
      setUploadedFiles(JSON.parse(savedFiles));
    }
    // Set a timeout to remove files after a period (e.g., 1 hour)
    const timer = setTimeout(() => {
      localStorage.removeItem("uploadedFiles");
      setUploadedFiles([]);
    }, 3600000); // 1 hour in milliseconds

    return () => clearTimeout(timer);
  }, []);

  // Save uploaded files to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const handleFileUpload = (data: any, fileName: string) => {
    setIsUploading(true);
    setTimeout(() => {
      const newFile = { name: fileName, data };
      setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
      setCurrentFile(fileName);
      setJsonData(data);
      setOriginalData(data);
      setIsUploading(false);
    }, 1500); // Simulated transition delay for upload animation
  };

  const handleUpdate = (key: string, value: string) => {
    setJsonData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
    setUploadedFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.name === currentFile
          ? { ...file, data: { ...file.data, [key]: value } }
          : file
      )
    );
  };

  const handleAddItem = () => {
    if (!newKey.trim() || !newValue.trim()) {
      setError("Both key and value are required.");
      return;
    }
    try {
      if (jsonData[newKey] && !isConfirming) {
        setIsConfirming(true);
        return;
      }
      setJsonData((prevData) => ({
        ...prevData,
        [newKey]: newValue,
      }));
      setUploadedFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.name === currentFile
            ? { ...file, data: { ...file.data, [newKey]: newValue } }
            : file
        )
      );
      setError(null);
      setIsModalOpen(false);
      setNewKey("");
      setNewValue("");
      setIsConfirming(false);
    } catch (err) {
      setError("Failed to add new item");
    }
  };

  const handleRemoveItem = (key: string) => {
    const updatedData = { ...jsonData };
    delete updatedData[key];
    setJsonData(updatedData);
    setUploadedFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.name === currentFile ? { ...file, data: updatedData } : file
      )
    );
  };

  const handleResetChanges = () => {
    setJsonData(originalData);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const togglePagination = () => {
    setIsPaginationEnabled(!isPaginationEnabled);
  };

  const loadFile = (fileName: string) => {
    const file = uploadedFiles.find((file) => file.name === fileName);
    if (file) {
      setCurrentFile(fileName);
      setJsonData(file.data);
      setOriginalData(file.data);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      {uploadedFiles.length > 0 && (
        <aside
          className={`${
            isSidebarOpen ? "w-64" : "w-16"
          } bg-gray-800 p-4 transition-all duration-300 flex flex-col items-start`}
        >
          {/* Sidebar Header */}
          <div className="w-full flex items-center justify-between p-3">
            <h1
              className={`text-white font-semibold text-lg transition-all duration-300 ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
              LangSync
            </h1>
            <button
              onClick={toggleSidebar}
              className="text-white p-1 bg-gray-700 rounded-full"
            >
              {isSidebarOpen ? (
                <FiChevronLeft size={20} />
              ) : (
                <FiChevronRight size={20} />
              )}
            </button>
          </div>
          {/* Sidebar Menu */}
          {isSidebarOpen && (
            <ul className="mt-4 space-y-4">
              {uploadedFiles.map((file) => (
                <li
                  key={file.name}
                  className="text-gray-200 hover:bg-gray-700 p-3 rounded-md cursor-pointer transition-all flex items-center"
                  onClick={() => loadFile(file.name)}
                >
                  <span>{file.name}</span>
                </li>
              ))}
              {/* separator */}
              <div className="border-t border-gray-700 w-full my-4"></div>
              <li
                className="text-gray-200 hover:bg-gray-700 p-3 rounded-md cursor-pointer transition-all flex items-center"
                onClick={() => setIsModalOpen(true)}
              >
                <FiPlus size={18} className="mr-4" />
                <span>Add new Item</span>
              </li>
              <li className="text-gray-200 hover:bg-gray-700 p-3 rounded-md cursor-pointer transition-all flex items-center">
                <button
                  onClick={togglePagination}
                  className="flex items-center"
                >
                  {isPaginationEnabled ? (
                    <>
                      <FiChevronLeft size={18} className="mr-4" />
                      <span>Disable Pagination</span>
                    </>
                  ) : (
                    <>
                      <FiChevronRight size={18} className="mr-4" />
                      <span>Enable Pagination</span>
                    </>
                  )}
                </button>
              </li>
              <li className="text-gray-200 hover:bg-gray-700 p-3 rounded-md cursor-pointer transition-all flex items-center">
                <button
                  onClick={handleResetChanges}
                  className={`flex items-center ${
                    JSON.stringify(jsonData) === JSON.stringify(originalData)
                      ? "text-gray-500"
                      : "text-white"
                  }`}
                  disabled={
                    JSON.stringify(jsonData) === JSON.stringify(originalData)
                  }
                >
                  <FiRefreshCw size={18} className="mr-4" />
                  <span>Reset Changes</span>
                </button>
              </li>
              {/* <li className="text-gray-200 hover:bg-gray-700 p-3 rounded-md cursor-pointer transition-all flex items-center">
                <FiUpload size={18} className="mr-4" />
                <span>Upload new File</span>
              </li> */}
              <li
                className="text-gray-200 hover:bg-gray-700 p-3 rounded-md cursor-pointer transition-all flex items-center"
                onClick={handleDownload}
              >
                <FiDownload size={18} className="mr-4" />
                <span>Download File</span>
              </li>
            </ul>
          )}
          {/* Download Button */}
          {isSidebarOpen && (
            <div className="mt-auto">
              <DownloadButton jsonData={jsonData} />
            </div>
          )}
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto">
        {/* Main Editor or Upload */}
        <section className="mt-1 flex flex-col items-center justify-start min-h-screen">
          {isUploading ? (
            <div className="flex justify-center items-center min-h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
              <p className="ml-4 text-xl font-semibold text-gray-600 dark:text-gray-300">
                Processing your file...
              </p>
            </div>
          ) : Object.keys(jsonData).length ? (
            <>
              <div className="w-full mb-4">
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </div>
              <div className="w-full">
                <JSONEditor
                  data={jsonData}
                  onUpdate={handleUpdate}
                  onRemove={handleRemoveItem}
                  searchTerm={searchTerm}
                  isPaginationEnabled={isPaginationEnabled}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-6">
              <FileUpload onUpload={handleFileUpload} />
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-600 dark:text-gray-400 text-xs">
          <p>© 2024 Mukhtar</p>
        </footer>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Add New Item
            </h2>
            <input
              type="text"
              placeholder="Key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded w-full dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-full dark:bg-gray-700 dark:text-white"
            />
            {isConfirming && (
              <p className="text-yellow-500 mb-4">
                Key already exists. Do you want to override it?
              </p>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsConfirming(false);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {isConfirming ? "Confirm" : "Add"}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
