import React, { useState, useEffect } from 'react';

const Progress = ({ user }) => {
  const [currentTableIndex, setCurrentTableIndex] = useState(0);
  const [currentTable, setCurrentTable] = useState(null);

  useEffect(() => {
    // Set the initial current table when the component mounts
    if (user.prev_tables.length > 0) {
      setCurrentTable(user.prev_tables[currentTableIndex]);
    }
  }, [user, currentTableIndex]);

  const handleNextTable = () => {
    if (currentTableIndex < user.prev_tables.length - 1) {
      setCurrentTableIndex(currentTableIndex + 1);
    }
  };

  const handlePreviousTable = () => {
    if (currentTableIndex > 0) {
      setCurrentTableIndex(currentTableIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className=''><h2 className="text-2xl font-semibold mb-4">Streak: {user.streak}</h2></div>
      {currentTable && (
        <div>
          <h3 className="text-xl font-semibold mb-2">
            Date: {currentTable.date}
          </h3>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Food</th>
                <th className="border p-2">Calories</th>
              </tr>
            </thead>
            <tbody>
              {currentTable.table.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.food}</td>
                  <td className="border p-2">{item.calories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
               
      <div className="mt-4">
      <br></br>
        <button
          onClick={handlePreviousTable}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Previous Table
        </button>
        <button
          onClick={handleNextTable}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Next Table
        </button>
      </div>


    </div>
  );
};

export default Progress;
