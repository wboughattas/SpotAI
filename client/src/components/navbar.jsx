import { Link } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../contexts/AuthContext'

const Navbar = ({ handleLogin }) => {
   const { backendUri, loggedIn, setLoggedIn } = useContext(AuthContext)

   const checkLoggedIn = async () => {
      const res = await axios.get(backendUri + '/is_logged_in')
      if (res.status === 200) {
         console.log(res.data)
         setLoggedIn(res.data.logged_in)
      }
   }

   useEffect(() => {
      checkLoggedIn()
   }, [])

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
         {loggedIn !== null && !loggedIn ? (
            <button
               className="rounded-full px-5 py-3 bg-spotai-military transisiton ease-in-out duration-300
            hover:bg-spotai-military-dark"
               onClick={handleLogin}
            >
               Login
            </button>
         ) : (
            <button
               className="rounded-full px-5 py-3 bg-spotai-military transisiton ease-in-out duration-300
            hover:bg-spotai-military-dark"
            >
               Logout
            </button>
         )}
      </nav>
   )
}

export default Navbar
