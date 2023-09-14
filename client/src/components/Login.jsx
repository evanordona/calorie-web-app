import React, { useDispatch } from 'react'
import Axios from 'axios'
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom'
import { isLoggedIn, setIsLoggedIn, user, setUser } from '../appSlice'

const Login = () => {

    const dispatch = useDispatch();
    const history = useNavigate();



    const fetchAuthUser = () => {
        const response = Axios.get("http://localhost:5000/api/user", { withCredentials: true }).catch((err) => {
            console.log("Not properly authenticated")
            dispatch(setIsLoggedIn(false))
            dispatch(setUser({}))

            history.push("/login/error")
        })

        if (response && response.data) {
            console.log("User: ", response.data)
            dispatch(setIsLoggedIn(true))
            dispatch(setUser(response.data))

            history.push('/home')
        }
    }


    const redirectToGoogleSSO = async () => {
        var timer = null;
        const googleLoginURL = "http://localhost:5000/auth/google"
        const newWindow = window.open(googleLoginURL, "_blank", "width=500,height=600")

        if (newWindow) {
            timer = setInterval(() => {
                if (newWindow.closed) {

                    fetchAuthUser();
                    if (timer) clearInterval(timer)
                }
            }, 500)
        }
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