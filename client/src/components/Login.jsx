import React from 'react'
import GoogleButton from 'react-google-button'


const Login = () => {

    const redirectToGoogleSSO = () => {
        const googleLoginURL = "https://gainztracker-api.onrender.com/auth/google"
        window.open(googleLoginURL, "_self", "width=500, height=600")
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