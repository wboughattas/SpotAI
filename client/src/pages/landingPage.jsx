import Layout from '../components/layout'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

const LandingPage = () => {

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

   return (
      <Layout>
         <div className="h-full w-full bg-audio bg-repeat-x flex flex-col justify-end items-center p-20 gap-3">
            <div className="text-2xl text-center">
               {
                  'With over 15 million of tracks’ metadata, SpotAI recommends songs based on your music taste and custom preferences'
               }
            </div>


               <a className="bg-spotai-black rounded-full py-2 px-4 transisiton ease-in-out duration-300 hover:bg-spotai-gray text-center inline pointer text-lg"
                  href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Get Started</a>

         </div>
      </Layout>
   )
}

export default LandingPage
