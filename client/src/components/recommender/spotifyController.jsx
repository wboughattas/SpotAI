const SpotifyController = ({ trackIDS, currentTrackNumber }) => {
   return (
      <iframe
         className="rounded-lg"
         src={`https://open.spotify.com/embed/track/${trackIDS[currentTrackNumber]}?utm_source=generator`}
         width="100%"
         height="200"
         frameBorder="0"
         allowFullScreen={true}
         allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
         loading="lazy"
      ></iframe>
   )
}

export default SpotifyController
