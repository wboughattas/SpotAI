export default async function fetchSpotAIData(
   sliderValues,
   settings,
   setTrackIDS,
   setIsLoading
) {
   let requestURL = 'http://127.0.0.1:5000/recommend_tracks/?'
   for (let index = 1; index < sliderValues.length; index++) {
      const { step, key } = settings[index]
      requestURL += `${key}=${
         step
            ? sliderValues[index]
            : ((1.0 * sliderValues[index]) / 100).toFixed(3)
      }&`
   }
   requestURL += `${settings[0].key[0]}=${sliderValues[0][0]}&${settings[0].key[1]}=${sliderValues[0][1]}`
   console.log(requestURL)
   let response = await fetch(requestURL)
      .then((res) => {
         setIsLoading(false)
         return res.json()
      })
      .catch((err) => console.error(err))

   console.log(response)
   setTrackIDS(response.res)
}
