import { useContext } from 'react'
import Navbar from './navbar'
import AuthContext from '../contexts/AuthContext'
import { createTheme, ThemeProvider } from '@mui/material/styles'

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
   const [token, setToken] = useState(null)
   return (
      <ThemeProvider theme={theme}>
         <AuthContext.Provider value={{ token: token }}>
            <div className="flex flex-col h-full">
               <Navbar />
               <div className="mt-[4.1rem] h-full p-5">{children}</div>
            </div>
         </AuthContext.Provider>
      </ThemeProvider>
   )
}

export default Layout
