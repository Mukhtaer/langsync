// import React, { useState, useEffect } from "react";
// import Pagination from "./Pagination";

// interface JSONEditorProps {
//   data: { [key: string]: string };
//   onUpdate: (key: string, value: string) => void;
//   searchTerm: string;
//   isPaginationEnabled: boolean;
// }

// const JSONEditor: React.FC<JSONEditorProps> = ({
//   data,
//   onUpdate,
//   searchTerm,
//   isPaginationEnabled, // Destructure the prop
// }) => {
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const itemsPerPage = 10;

//   // Filter data based on search term
//   const filteredData = Object.keys(data).filter(
//     (key) =>
//       key.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       data[key].toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Determine the page where the search result is found
//   useEffect(() => {
//     if (searchTerm) {
//       const index = Object.keys(data).findIndex(
//         (key) =>
//           key.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           data[key].toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       if (index !== -1) {
//         setCurrentPage(Math.floor(index / itemsPerPage) + 1);
//       }
//     }
//   }, [searchTerm, data]);

//   // Paginate the filtered data
//   const paginatedData = isPaginationEnabled
//     ? filteredData.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//       )
//     : filteredData;

//   return (
//     <div className="overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
//       <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg">
//         <thead className="bg-gray-100 dark:bg-gray-700 rounded-lg">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//               Key
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//               Value
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//           {paginatedData.map((key) => (
//             <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//               <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
//                 {key}
//               </td>
//               <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
//                 <input
//                   type="text"
//                   value={data[key]}
//                   onChange={(e) => onUpdate(key, e.target.value)}
//                   className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {isPaginationEnabled && (
//         <Pagination
//           currentPage={currentPage}
//           itemsPerPage={itemsPerPage}
//           totalItems={filteredData.length}
//           setCurrentPage={setCurrentPage}
//         />
//       )}
//     </div>
//   );
// };

// export default JSONEditor;

import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { FiTrash } from "react-icons/fi";

interface JSONEditorProps {
  data: { [key: string]: string };
  onUpdate: (key: string, value: string) => void;
  onRemove: (key: string) => void;
  searchTerm: string;
  isPaginationEnabled: boolean;
}

const JSONEditor: React.FC<JSONEditorProps> = ({
  data,
  onUpdate,
  onRemove,
  searchTerm,
  isPaginationEnabled,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Filter data based on search term
  const filteredData = Object.keys(data).filter(
    (key) =>
      key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data[key].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine the page where the search result is found
  useEffect(() => {
    if (searchTerm) {
      const index = Object.keys(data).findIndex(
        (key) =>
          key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data[key].toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (index !== -1) {
        setCurrentPage(Math.floor(index / itemsPerPage) + 1);
      }
    }
  }, [searchTerm, data]);

  // Paginate the filtered data
  const paginatedData = isPaginationEnabled
    ? filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredData;

  return (
    <div className="overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg">
        <thead className="bg-gray-100 dark:bg-gray-700 rounded-lg">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Key
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {paginatedData.map((key) => (
            <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                {key}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                <input
                  type="text"
                  value={data[key]}
                  onChange={(e) => onUpdate(key, e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                <button
                  onClick={() => onRemove(key)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <FiTrash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPaginationEnabled && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default JSONEditor;
