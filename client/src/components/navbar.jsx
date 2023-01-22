import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

const Navbar = ({ handleLogin }) => {
const CLIENT_ID = "02baa4faac11484bb2f10260c2c96f8c"
   const REDIRECT_URI = "http://localhost:5173/recommender"
   const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
   const RESPONSE_TYPE = "token"

   const [token, setToken] = useState("")

   useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      if (!token && hash) {
         token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

         window.location.hash = ""
         window.localStorage.setItem("token", token)
      }

      setToken(token)

   }, [])
   const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")
      window.location.reload(false)
   }
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

         {!token ?
               <a className="rounded-full px-5 py-3 bg-spotai-military transisiton ease-in-out duration-300
            hover:bg-spotai-military-dark"
                  href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login</a>
               : <button className="rounded-full px-5 py-3 bg-spotai-military transisiton ease-in-out duration-300
            hover:bg-spotai-military-dark"
                  onClick={logout}>Logout</button>
            }
      </nav>
   )
}

export default Navbar
