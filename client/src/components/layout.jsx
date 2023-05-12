import Navbar from './navbar'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import loginSpotify from '../api/loginSpotify'
import { useState } from 'react'
import AuthContext from '../contexts/AuthContext'

const theme = createTheme({
   palette: {
      'spotai-black': {
         main: '#000000',
      },
      'spotai-gray': {
         main: '#1D1B1B',
      },
      'spotai-green': {
         main: '#04aa6d',
      },
      'spotai-green-dark': {
         main: '#026943',
      },
      'spotai-tooltip': {
         main: '#D9D9D9',
      },
   },
})

const Layout = ({ children }) => {
   const [loggedIn, setLoggedIn] = useState(false)
   const handleLogin = () => {
      loginSpotify()
   }

   return (
      <ThemeProvider theme={theme}>
         <AuthContext.Provider
            value={{
               loggedIn: loggedIn,
               setLoggedIn: setLoggedIn,
               backendUri: 'http://localhost:5001',
            }}
         >
            <div className="flex flex-col h-full">
               <Navbar handleLogin={handleLogin} />
               <div className="mt-[4.1rem] h-full p-5">{children}</div>
            </div>
         </AuthContext.Provider>
      </ThemeProvider>
   )
}

export default Layout
