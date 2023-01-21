import Layout from '../components/layout'
import { Link } from 'react-router-dom'
const LandingPage = () => {
   return (
      <Layout>
         <div className="h-full w-full bg-audio bg-repeat-x flex flex-col justify-end items-center p-20 gap-3">
            <div className="text-2xl text-center">
               {
                  'With over 15 million of tracks’ metadata, SpotAI recommends songs based on your music taste and custom preferences'
               }
            </div>

            <Link
               className="bg-spotai-black rounded-full py-2 px-4 transisiton ease-in-out duration-300 hover:bg-spotai-gray text-center inline pointer text-lg"
               to="/recommender"
            >
               Get Started
            </Link>
         </div>
      </Layout>
   )
}

export default LandingPage
