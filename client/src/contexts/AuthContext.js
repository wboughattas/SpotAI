import { createContext } from 'react'

const AuthContext = createContext({
   loggedIn: null,
   setLoggedIn: null,
   backendUri: null,
})

export default AuthContext
