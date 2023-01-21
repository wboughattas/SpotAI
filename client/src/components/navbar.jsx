import { Link } from 'react-router-dom'
const Navbar = ({ handleLogin }) => {
   return (
      <nav className="fixed w-full bg-spotai-black/50 p-2 rounded-lg flex gap-2 items-center">
         <Link
            to="/recommender"
            className=" grow font-bold rounded-full px-5 py-3
            bg-spotai-military transisiton ease-in-out duration-300 hover:bg-spotai-military-dark"
         >
            {'SpotAI'}
         </Link>
         <Link
            to="/"
            className="text-right rounded-full px-5 py-3 bg-spotai-military
            bg-spotai-military transisiton ease-in-out duration-300 hover:bg-spotai-military-dark"
         >
            {'About'}
         </Link>
         <button
            className="rounded-full px-5 py-3 bg-spotai-military transisiton ease-in-out duration-300 
            hover:bg-spotai-military-dark"
         >
            {'Login'}
         </button>
      </nav>
   )
}

export default Navbar
