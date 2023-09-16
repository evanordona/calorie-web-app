import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom'


const Login = ({ isLoggedIn, setIsLoggedIn, user, setUser }) => {
   

    const navigate = useNavigate();

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
            navigate('/')
        }
    }

    const redirectToGoogleSSO = () => {

        const googleLoginURL = "http://localhost:5000/auth/google"
        const newWindow = window.open(googleLoginURL, "_blank", "width=500, height=600")

        let timer = setInterval(() => {
            if (newWindow.closed) {
                
                fetchAuthUser();
                if (timer) clearInterval(timer);
            }
        }, 500)
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-b from-yellow-400 to-green-500 text-white">
          <h1 className="text-5xl font-extrabold mb-8" style={{ fontFamily: 'sans-serif' }}>
            GainzTracker
          </h1>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <GoogleButton onClick={redirectToGoogleSSO} />
          </div>
        </div>
      );
}

export default Login