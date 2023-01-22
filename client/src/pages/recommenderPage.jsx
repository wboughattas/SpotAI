import Layout from '../components/layout'
import Header from '../components/recommender/header'
import Sliders from '../components/recommender/slidersButtons'
import settings from '../components/settings'
import { useState } from 'react'
import fetchSpotAIData from '../utils/api'
import SpotifyController from '../components/recommender/spotifyController'
import { CircularProgress } from '@mui/material'
import { Backdrop } from '@mui/material'

const RecommenderPage = () => {
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
      </Layout>
   )
}

export default RecommenderPage
