import React, { useState, useEffect } from 'react'
import PieGraph from './PieGraph.jsx';

const Home = ({ user, setUser, total, setTotal, setHasEffectRun, hasEffectRun }) => {
    const [goal, setGoal] = useState(user.goal);

    const [newGoal, setNewGoal] = useState(''); // State to store the new goal value

    useEffect(() => {

        if (!hasEffectRun && user && user.table) {
            const currentDate = new Date();

            //for testing progress purposes 
            const tomorrowDate = new Date(currentDate.getDate() + 1)

            const tableDate = new Date(user.table.date);
            console.log("Checking to see if new table is needed...")
            // Check if the current date is greater than the user.table.date
            if (currentDate.getDate() > tableDate.getDate()) {
                console.log("updating tables and creating default")
                // Push the current user.table to user.prev_tables
                const updatedPrevTables = [...user.prev_tables, user.table];
                let streakUpdate;
                // streak logic
                if (user.table.total >= user.goal) {
                    streakUpdate = user.streak += 1
                } else {
                    streakUpdate = 0
                }

                // Create a new table with default values
                const newTable = {
                    date: currentDate.toISOString(), // Current date as ISO string
                    total: 0,
                    food: {
                        test: 0
                    }
                };

                // Update the user object with the new tables

                const updatedUser = {
                    ...user,
                    streak: streakUpdate,
                    prev_tables: updatedPrevTables,
                    table: newTable,
                };

                const requestBody = {
                    user: updatedUser
                }

                fetch('https://gainztracker-api.onrender.com/api/updateUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                    credentials: 'include',
                    mode: 'cors'
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data); // Log the server response
                        setUser(data)

                    })
                    .catch((error) => {
                        setUser(updatedUser);
                        setFoodItems({});
                        setTotal(0);
                    });

            }
            setHasEffectRun(true);
        }
    }, [user]);

    useEffect(() => {
        setGoal(user.goal)

    }, [user.goal])

    useEffect(() => {
        setTotal(user.table.total)
    }, [])


    const handleGoalUpdate = () => {
        if (!isNaN(newGoal) && newGoal !== '' && Number(newGoal) > -1) {
            setGoal(Number(newGoal));

            // update new goal to backend document
            const requestBody = {
                user: user,
                goal: Number(newGoal),
            };

            fetch('https://gainztracker-api.onrender.com/api/update-goal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
                credentials: 'include',
                mode: 'cors'
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data); // Log the server response
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <div>
            <div className="min-h-screen flex flex-col h-screen justify-center items-center bg-gradient-to-b from-yellow-400 to-green-500 text-white" style={{ fontFamily: 'sans-serif' }}>
                <h1 className="text-5xl font-extrabold" >
                    GainzTracker
                </h1>
                <div className="text-center">

                    <h1 className="text-4xl font-semibold mt-10 mb-4">Goal: {goal}</h1>
                    <h1 className="text-4xl font-semibold mb-4">Total: {total}</h1>

                    {
                        total >= goal ? (
                            <div>
                                <div className='w-full mx-auto'><iframe src="https://giphy.com/embed/3oriNZoNvn73MZaFYk"  allowFullScreen></iframe></div>
                            </div>) : (<div>
                                <div className='max-w-xs m-auto'><PieGraph user={user} /></div>
                            </div>)
                    }
                    <div>
                        {/* Input field to enter the new goal value */}
                        <input
                            type="number"
                            placeholder="Enter new goal"
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                            className="border rounded-md px-2 py-1 mr-2 text-black"
                        />

                        {/* Button to update the goal */}
                        <button
                            onClick={handleGoalUpdate}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-10"
                        >
                            Update Goal
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;