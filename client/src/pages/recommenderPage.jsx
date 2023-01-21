import Layout from '../components/layout'
import Header from '../components/recommender/header'
import Sliders from '../components/recommender/slidersButtons'
import settings from '../components/settings'
import { useState } from 'react'
import fetchSpotAIData from '../utils/api'
import Playlist from '../components/recommender/playlist'
import { CircularProgress } from '@mui/material'
import { Backdrop } from '@mui/material'

const RecommenderPage = () => {
   const defaultValues = settings.map((setting) => {
      return setting.defaultValue
   })
   const [sliderValues, setSliderValues] = useState(defaultValues)
   const [trackIDS, setTrackIDS] = useState(null)
   const [isLoading, setIsLoading] = useState(false)

   const handleResetClick = () => {
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
   const handleGenerateSongs = () => {
      setIsLoading(true)
      fetchSpotAIData(sliderValues, settings, setTrackIDS, setIsLoading)
   }

   return (
      <Layout>
         <div className="flex flex-col gap-5 p-10">
            <Header />
            <Sliders
               settings={settings}
               handleSliderOnChange={handleSliderOnChange}
               handleResetClick={handleResetClick}
               sliderValues={sliderValues}
               handleGenerateSongs={handleGenerateSongs}
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
            {trackIDS && !isLoading && <Playlist trackIDS={trackIDS} />}
         </div>
      </Layout>
   )
}

export default RecommenderPage
