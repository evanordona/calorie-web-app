import { useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import { Routes, Route, useNavigate } from'react-router-dom'
import './App.css'
import LoginSuccess from './components/LoginSuccess'
import { isLoggedIn, setIsLoggedIn } from './appSlice'

function App() {

  const handleLogout = () => {
    setIsLoggedIn(false);
  }


  return (
    <>
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/loginSuccess' element={<LoginSuccess />} />
      <Route exact path='/login/error'>Error loggin in.</Route>
      <Route exact path='/home' element={<Home />} />
    </Routes>
    
    </>
  )
}

export default App
