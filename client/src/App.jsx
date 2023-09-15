import { useEffect, useState } from 'react'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import LoginSuccess from './components/LoginSuccess.jsx'
import Navbar from './components/Navbar.jsx'
import Food from './components/Food.jsx'
import Logout from './components/Logout.jsx'

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(0);
  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route exact path='/' element={user ? <Home isLoggedIn={isLoggedIn} user={user} setUser={setUser} total={total} setTotal={setTotal} /> : <Navigate to='/login' />} />
        <Route exact path='/login' element={user ? <Navigate to="/" /> : <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />} />
        <Route exact path='/login/success' element={<LoginSuccess />} />
        <Route exact path='/login/error'>Error loggin in.</Route>
        <Route exact path='/food' element={user ? <Food user={user} setUser={setUser} setTotal={setTotal} /> : <Navigate to='/login' />} />
        <Route exact path='/logout' element={user ? <Logout setUser={setUser} setIsLoggedIn={setIsLoggedIn} /> : <Navigate to='/login'/>} />

      </Routes>
    </>
  )
}

export default App
