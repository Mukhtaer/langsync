import React, { useState } from "react";

interface JSONEditorProps {
  data: { [key: string]: string };
  onUpdate: (key: string, value: string) => void;
  searchTerm: string;
}

const JSONEditor: React.FC<JSONEditorProps> = ({
  data,
  onUpdate,
  searchTerm,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // You can adjust this based on your preference

  const handleInputChange = (key: string, value: string) => {
    try {
      JSON.parse(value); // Simulate JSON validation
      setError(null);
    } catch (err) {
      setError(`Invalid JSON format for ${key}`);
    }
    onUpdate(key, value);
  };

  const filteredData = Object.keys(data).filter(
    (key) =>
      key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data[key].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Key</th>
            <th className="px-4 py-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length ? (
            currentRows.map((key) => (
              <tr key={key}>
                <td className="border-b px-4 py-2">{key}</td>
                <td className="border-b px-4 py-2">
                  <input
                    type="text"
                    value={data[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center py-4">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default JSONEditor;
