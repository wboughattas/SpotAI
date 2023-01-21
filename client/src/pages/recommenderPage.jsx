import Layout from '../components/layout'
import Header from '../components/recommender/header'
import Sliders from '../components/recommender/slidersButtons'
import settings from '../components/settings'
import { useState } from 'react'
import fetchSpotAIData from '../utils/api'
import Playlist from '../components/recommender/playlist'

const RecommenderPage = () => {
   const defaultValues = settings.map((setting) => {
      return setting.defaultValue
   })
   const [sliderValues, setSliderValues] = useState(defaultValues)
   const [trackIDS, setTrackIDS] = useState(null)

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
      fetchSpotAIData(sliderValues, settings, setTrackIDS)
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
            {trackIDS && <Playlist trackIDS={trackIDS} />}
         </div>
      </Layout>
   )
}

export default RecommenderPage
