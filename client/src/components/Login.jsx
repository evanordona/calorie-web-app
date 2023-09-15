import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom'


const Login = ({ isLoggedIn, setIsLoggedIn, user, setUser }) => {
    const [hasEffectRun, setHasEffectRun] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        if (!hasEffectRun && user && user.table) {
            const currentDate = new Date();
            // const tomorrowDate = new Date(currentDate.getDate() + 1)
            const tableDate = new Date(user.table.date);
            console.log("Checking to see if new table is needed...")
            // Check if the current date is greater than the user.table.date
            if (currentDate.getDate() > tableDate.getDate()) {
                console.log("updating tables and creating default")
                // Push the current user.table to user.prev_tables
                const updatedPrevTables = [...user.prev_tables, user.table];

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
                    prev_tables: updatedPrevTables,
                    table: newTable,
                };

                const requestBody = {
                    user: updatedUser
                }

                fetch('http://localhost:5000/api/updateUser', {
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
                        setUser(updatedUser);
                        setFoodItems({});

                    });

                setHasEffectRun(true);
            }
        }
    }, [user, setUser]);

    const fetchAuthUser = async () => {
        const response = await Axios.get("http://localhost:5000/api/user", { withCredentials: true }).catch((err) => {
            console.log("Not properly authenticated")
            setIsLoggedIn(false)
            setUser({})
            navigate("/login/error")
        })

        console.log('response receieved')
        console.log(response)
        if (response && response.data) {
            console.log("User: ", response.data)
            setIsLoggedIn(true)
            setUser(response.data)
            setHasEffectRun(true)
            navigate('/')
        }
    }

    const redirectToGoogleSSO = () => {

        const googleLoginURL = "http://localhost:5000/auth/google"
        const newWindow = window.open(googleLoginURL, "_blank", "width=500, height=600")

        let timer = setInterval(() => {
            if (newWindow.closed) {
                console.log("CLOSED WINDOW")
                fetchAuthUser();
                if (timer) clearInterval(timer);
            }
        }, 500)
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Login</h1>
                <GoogleButton onClick={redirectToGoogleSSO} />
            </div>
        </div>
    )
}

export default Login