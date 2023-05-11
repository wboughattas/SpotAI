import axios from 'axios'

export default async function loginSpotify() {
   let requestURL = 'http://127.0.0.1:5001/spotify_login'

   let res = await axios.get(requestURL)

   console.log(res.data)

   return res
}
