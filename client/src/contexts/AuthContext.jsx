import { createContext } from 'react'

const gernerateState = () => {
   const text = ''
   const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

   for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
   }
   return text
}

const AuthContext = createContext({
   loggedIn: false,
   params: {
      client_id: '0788b6e1b4fa45b1b6e62e2f05e53815',
      scope: 'playlist-modify-private playlist-modify-public',
      response_type: 'code',
      redirect_uri: 'http://localhost:5001/callback',
      state: gernerateState(),
   },
})

export default AuthContext
