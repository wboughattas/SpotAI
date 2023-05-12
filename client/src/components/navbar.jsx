import { Link } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../contexts/AuthContext'

const Navbar = ({}) => {
   const { params, token } = useContext(AuthContext)

   return (
      <nav className="fixed w-full bg-spotai-black/50 p-2 rounded-lg flex gap-2 items-center z-10">
         <Link
            to="/recommender"
            className=" grow font-bold rounded-full px-5 py-3
            bg-spotai-military transisiton ease-in-out duration-300 hover:bg-spotai-military-dark"
         >
            {'SpotAI'}
         </Link>
         <Link
            to="/"
            className="text-right rounded-full px-5 py-3 bg-spotai-military
            bg-spotai-military transisiton ease-in-out duration-300 hover:bg-spotai-military-dark"
         >
            {'About'}
         </Link>

         {!token ? (
            <a
               className="rounded-full px-5 py-3 bg-spotai-military transisiton ease-in-out duration-300
            hover:bg-spotai-military-dark"
               href={new URLSearchParams(params).toString()}
            >
               Login
            </a>
         ) : (
            <button
               className="rounded-full px-5 py-3 bg-spotai-military transisiton ease-in-out duration-300
            hover:bg-spotai-military-dark"
               onClick={logout}
            >
               Logout
            </button>
         )}
      </nav>
   )
}

export default Navbar
