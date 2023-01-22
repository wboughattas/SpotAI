import Song from './recommender/song'
import Playlist from './recommender/playlist'
import React, { useState, useEffect } from 'react'

// For testing


const Recommender = ({ playlist }) => {
    const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])
    return (
        <div className="p-10 ">
            <Song playlist={playlist} />
            {playlist ? <Playlist playlistId={playlist.id} /> : <p></p>}
        </div>
    )
}

export default Recommender
