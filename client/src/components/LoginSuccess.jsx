import React, { useEffect } from 'react'

const LoginSuccess = () => {

    useEffect(() => {
        setTimeout(() => {
            window.close();
        }, 500);
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">

                <h1 className="text-3xl font-semibold mt-28 mb-4">Login Success</h1>
            </div>
        </div>
    )
}

export default LoginSuccess