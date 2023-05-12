import axios from 'axios'

export default async function loginSpotify() {
   let requestURL = 'http://127.0.0.1:5001/spotify_login'

   try {
      let res = await axios.get(requestURL)

      console.log(res)

      return res
   } catch {}
}
