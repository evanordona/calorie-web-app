import React, { useEffect } from 'react'

const Logout = ({ setUser, setIsLoggedIn }) => {

    useEffect(() => {
        setUser(null)
        setIsLoggedIn(false)

        fetch('http://localhost:5000/auth/logout').catch((err) => {
            console.log('err: ', err)
        })
    }, [])

    return (
        <div>Logout</div>
    )
}

export default Logout