import React, { useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginSuccess = ({ setUser, setIsLoggedIn }) => {

    // Used to navigate to react route
    const navigate = useNavigate();

    // Runs when mounted to update the user using the app
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Axios.get("https://gainztracker-api.onrender.com/api/user", { withCredentials: true });
                console.log('response received');
                console.log(response);

                if (response && response.data) {
                    console.log("User: ", response.data);
                    setIsLoggedIn(true);
                    setUser(response.data);

                    navigate('/');
                } else {
                    console.log("User data not found in the response.");
                    setIsLoggedIn(false);
                    setUser({});
                }


            } catch (error) {
                console.error("Error during authentication:", error);
                setIsLoggedIn(false);
                setUser({});
            }
        }
        fetchData()

    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-semibold mt-28 mb-4">Login Success</h1>
            </div>
        </div>
    )
}

export default LoginSuccess