import React from 'react'
import Table from './Table'

const Food = ({ user, setUser, setTotal}) => {
  return (
    <div>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <Table user={user} setUser={setUser} setTotal={setTotal}/>
            </div>
        </div>
    </div>
  )
}

export default Food