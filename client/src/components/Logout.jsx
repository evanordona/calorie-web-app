import React, { useEffect } from 'react'

const Logout = ({ setUser, setIsLoggedIn, setFoodItems }) => {

    useEffect(() => {
        setUser(null)
        setIsLoggedIn(false)
        setFoodItems({})
        fetch('https://gainztracker-api.onrender.com/auth/logout').catch((err) => {
            console.log('err: ', err)
        })
    }, [])

    return (
        <div>Logout</div>
    )
}

export default Logout