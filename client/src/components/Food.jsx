import React from 'react'
import Table from './Table'

const Food = ({ user, setUser, setTotal, setFoodItems, foodItems}) => {
  return (
    <div>
        <div className="min-h-screen flex flex-col h-screen justify-center items-center bg-gradient-to-b from-yellow-400 to-green-500 text-white" style={{ fontFamily: 'sans-serif' }}>
            <div className="text-center">
                <Table user={user} setUser={setUser} setTotal={setTotal} setFoodItems={setFoodItems} foodItems={foodItems}/>
            </div>
        </div>
    </div>
  )
}

export default Food