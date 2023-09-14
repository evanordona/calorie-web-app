import React, { useEffect } from 'react'

const Home = ({ isLoggedIn, user }) => {

    const [goal, setGoal] = React.useState(5);

    useEffect(() => {
        setGoal(user.goal)
    }, [])

    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold mb-4">Welcome to Your Home Page</h1>
                    <div className="mb-4">
                        <p className="text-gray-600">Your Username:</p>
                        <h2 className="text-2xl font-bold">{user ? `Username : ${user.username}` : 'no user'}</h2>
                        <div>Goal: {goal}</div>


                    </div>
                </div>
            </div>




        </div>
    )
}

export default Home