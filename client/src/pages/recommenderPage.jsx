import Layout from '../components/layout'
import Recommender from '../components/recommender'
import Header from '../components/recommender/header'
import Sidebar from '../components/sidebar'
import Sliders from '../components/recommender/slidersButtons'
import settings from '../components/settings'
import fetchSpotAIData from '../utils/api'
import SpotifyController from '../components/recommender/spotifyController'
import { CircularProgress } from '@mui/material'
import { Backdrop } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from "axios"

const RecommenderPage = () => {
   useEffect(() => {
      getPlaylists();
   }, []);

   const [playlists, setPlaylists] = useState([])

   const getPlaylists = async (e) => {
      var token = window.localStorage.getItem("token");
      const { data } = await axios.get("https://api.spotify.com/v1/me/playlists", {
         headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
         params: { limit: 50, offset: 0 }
      })
      setPlaylists({ data }.data.items)
   }

   const [currentPL, setCurrentPL] = useState(0)
   const handlePlaylistClick = (_event, pl) => {
      setCurrentPL(pl)
   }

   const defaultValues = settings.map((setting) => {
      return setting.defaultValue
   })
   const defaultSliders = settings
      .filter((setting) => {
         return setting.name !== 'Date Range (year)'
      })
      .map((setting) => setting.key)

   const [sliderValues, setSliderValues] = useState(defaultValues)
   const [selectedSliders, setSelectedSliders] = useState(defaultSliders)
   const [isLoading, setIsLoading] = useState(false)
   const [trackIDS, setTrackIDS] = useState(null)
   const [currentTrackNumber, setCurrentTrackNumber] = useState(0)

   const handleReset = () => {
      setSliderValues(defaultValues)
   }
   const handleSliderOnChange = (event, index) => {
      const newSliderValues = sliderValues.map((value, i) => {
         if (i == index) {
            return event.target.value
         }
         return value
      })
      setSliderValues(newSliderValues)
   }
   const handleCheckbox = (event) => {
      const key = event.target.name
      const newSliders = event.target.checked
         ? selectedSliders.concat([key])
         : selectedSliders.filter((s) => s !== key)
      console.log(newSliders)
      setSelectedSliders(newSliders)
   }
   const handleGenerateSongs = () => {
      setIsLoading(true)
      fetchSpotAIData(sliderValues, settings, setTrackIDS, setIsLoading, selectedSliders)
   }

   return (
      <Layout>
         <div className="flex flex-row h-full">
            <Sidebar
               playlists={playlists}
               handlePlaylistClick={handlePlaylistClick}
            />
            <div className="flex flex-col h-full">
               <div className="flex flex-col gap-5 p-10">
                  <Header />
                  <Sliders
                     settings={settings}
                     handleSliderOnChange={handleSliderOnChange}
                     handleReset={handleReset}
                     sliderValues={sliderValues}
                     selectedSliders={selectedSliders}
                     handleGenerateSongs={handleGenerateSongs}
                     handleCheckbox={handleCheckbox}
                  />
                  {isLoading && (
                     <Backdrop
                        sx={{
                           color: '#fff',
                           zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={isLoading}
                     >
                        <CircularProgress color="success" />
                     </Backdrop>
                  )}
                  {trackIDS && !isLoading && (
                     <SpotifyController
                        trackIDS={trackIDS}
                        currentTrackNumber={currentTrackNumber}
                        setCurrentTrackNumber={setCurrentTrackNumber}
                     />
                  )}
               </div>
               <Recommender playlist={currentPL} />
            </div>
         </div>

      </Layout>
   )
}

export default RecommenderPage
