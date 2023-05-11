import Playlist from './recommender/playlist'
import React from 'react'

const Recommender = ({ playlist }) => {
   return (
      <div className="p-10 ">
         {playlist ? <Playlist playlistId={playlist.id} /> : <p></p>}
      </div>
   )
}

export default Recommender
