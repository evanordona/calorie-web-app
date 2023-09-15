import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import {FaBars, FaTimes} from "react-icons/fa"

const Navbar = ({ user }) => {

  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: '/',
      text: 'Home',
    },
    {
      id: 2,
      link: '/food',
      text: 'Food',
    },
    {
      id: 3,
      link: '/progress',
      text: 'Progress',
    },
    {
      id: 4,
      link: '/logout',
      text: 'Logout',
    },
  ];


  return (
    <div className='flex justify-between items-center w-full h-20 px-4 text-white bg-gradient-to-r from-purple-600 to-blue-400 fixed'>
    {user ? (
      <div>
        <h1 className='text-3xl font-signature ml-2'>{user.username}</h1>
      </div>
    ) : (
      <></>
    )}

    <ul className='hidden md:flex'>
    {user ? links.map(({ id, link, text }) => (
          <li
            key={id}
            className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-200'
          >
            {/* Use Link component to navigate */}
            <Link to={link}>{text}</Link>
          </li>
          
        ))  : <></>}
    </ul>

    <div
      onClick={() => setNav(!nav)}
      className='cursor-pointer pr-4 z-10 text-white md:hidden'
    >
      {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
    </div>

    {nav && (
      <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-purple-600 to-blue-400 text-white'>
        {links.map(({ id, link, text }) => (
          <li
            key={id}
            className='px-4 cursor-pointer capitalize py-6 text-4xl'
          >
            {/* Use Link component to navigate */}
            <Link to={link}>{text}</Link>
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}

export default Navbar