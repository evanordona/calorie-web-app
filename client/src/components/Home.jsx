import React, { useState, useEffect } from 'react'
import PieGraph from './PieGraph.jsx';

const Home = ({ user, setUser, total, setTotal }) => {
    const [goal, setGoal] = useState(user.goal);

    const [newGoal, setNewGoal] = useState(''); // State to store the new goal value

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

            fetch('http://localhost:5000/api/update-goal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
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
                <h1 className="text-6xl font-extrabold" >
                    GainzTracker
                </h1>
                <div className="text-center">

                    <h1 className="text-4xl font-semibold mt-10 mb-4">Goal: {goal}</h1>
                    <h1 className="text-4xl font-semibold mb-4">Total: {total}</h1>

                    {
                        total >= goal ? (
                            <div>
                                GAINZ
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
                            className="border rounded-md px-2 py-1 mr-2"
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