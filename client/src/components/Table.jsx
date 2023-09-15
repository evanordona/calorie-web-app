import React, { useEffect, useState } from 'react';

const Table = ({ user, setUser, setTotal }) => {
  const [foodItems, setFoodItems] = useState({}); // State to store food items

  const [food, setFood] = useState(''); // State for user input (food)
  const [calories, setCalories] = useState(''); // State for user input (calories)

  useEffect(() => {
    // Filter out the 'test' key from user.table.food
    const filteredFoodItems = Object.keys(user.table.food).reduce((acc, key) => {
      if (key !== 'test') {
        acc[key] = user.table.food[key];
      }
      return acc;
    }, {});

    // Update foodItems state
    setFoodItems((foodItems) => ({
      ...foodItems,
      ...filteredFoodItems
    }));
  }, []);


  useEffect(() => {
    setTotal(user.table.total)
  }, [user.table.total])

  const handleDelete = (item, cals) => {
    const foodItem = {
      food: item,
      calories: Number(cals)
    }
    const requestBody = {
      user: user,
      foodItem: foodItem
    }

    fetch(`http://localhost:5000/api/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then((response) => response.json())
      .then((data) => {
        const updatedFoodItems = { ...foodItems };
        delete updatedFoodItems[foodItem.food];
        setFoodItems(updatedFoodItems);
        setUser(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });



  };


  const handleAddFood = () => {
    // Check if food and calories are not empty
    if (food.trim() !== '' && calories.trim() !== '' && Number(calories) >= 0) {
      const stateFoodItem = {}
      stateFoodItem[food] = Number(calories)
      const newFoodItem = {
        food: food,
        calories: Number(calories),
      };

      // Create a new food item object
      const requestBody = {
        user: user,
        newFoodItem: newFoodItem
      };

      // Update the foodItems state with the new food item
      setFoodItems((foodItems) => ({
        ...foodItems,
        ...stateFoodItem
      }));

      setTotal((total) => total + Number(calories))

      // update backend here
      // Make a POST request to the Express.js server
      fetch('http://localhost:5000/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Log the server response
          setUser(data)
        })
        .catch((error) => {
          console.error('Error:', error);
        });


      // Clear the input fields
      setFood('');
      setCalories('');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Food Tracker</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Food</th>
            <th className="border p-2">Calories</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(foodItems).map((key) => (
            <tr key={key}>
              <td className="border p-2">{key}</td>
              <td className="border p-2">{foodItems[key]}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(key, foodItems[key])}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          )
          )}
        </tbody>
      </table>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Food"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddFood}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Table;