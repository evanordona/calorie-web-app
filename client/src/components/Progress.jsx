import React, { useState, useEffect } from 'react';

const Progress = ({ user }) => {
  const [currentTableIndex, setCurrentTableIndex] = useState(0);
  const [currentTable, setCurrentTable] = useState({});

  function getFormattedDate(date) {
    if (currentTable !== undefined) {
      const dateObject = new Date(date);

    // Extract the components of the date (month, day, and year)
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObject.getDate().toString().padStart(2, '0');
      const year = dateObject.getFullYear();

      // Create the formatted date string in the desired format
      const formattedDate = `${month}-${day}-${year}`;
      return formattedDate
    }
    
  }

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
    <div className="min-h-screen flex flex-col h-screen justify-center items-center bg-gradient-to-b from-yellow-400 to-green-500 text-white" style={{ fontFamily: 'sans-serif' }}>
      <div className=''><h2 className="text-5xl font-semibold mb-4">Streak: {user.streak}</h2></div>
      {currentTable && (
        <div>
          <h3 className="text-xl font-semibold mb-2">
            Date: {currentTable.date ? getFormattedDate(currentTable.date) : ''} 
          </h3>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Food</th>
                <th className="border p-2">Calories</th>
              </tr>
            </thead>
            <tbody>
              {currentTable.food ? Object.keys(currentTable.food).map((key) => key !== 'test' ? (
                <tr key={key}>
                  <td className="border p-2">{key}</td>
                  <td className="border p-2">{currentTable.food[key]}</td>
                </tr>
              ) : <></>) : <></>}
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
