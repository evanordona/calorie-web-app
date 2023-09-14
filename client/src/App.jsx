import { useEffect, useState } from 'react'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import LoginSuccess from './components/LoginSuccess.jsx'
import Navbar from './components/Navbar.jsx'

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
      <Navbar user={user}/>
      <Routes>
        <Route exact path='/' element={user ? <Home isLoggedIn={isLoggedIn} user={user}  /> : <Navigate to='/login' />} />
        <Route exact path='/login' element={user ? <Navigate to="/" /> : <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />} />
        <Route exact path='/login/success' element={<LoginSuccess />} />
        <Route exact path='/login/error'>Error loggin in.</Route>
      </Routes>
    </>
  )
}

export default App
