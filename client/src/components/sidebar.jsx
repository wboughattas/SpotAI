const Sidebar = ({ playlists, handlePlaylistClick }) => {

   return (
      <div className="w-[19rem] flex flex-col gap-2 p-2">
         <div className="bg-spotai-black/20 rounded-2xl p-4 flex flex-col">
            <button

               className=" text-center p-3 rounded-full bg-spotai-military transisiton ease-in-out
                      duration-300 hover:bg-spotai-military-dark hover:rounded-full"
            >
               Browse
            </button>
         </div>

         <div className="bg-spotai-black/20 rounded-2xl grow flex flex-col overflow-auto gap-4 p-4 ">
            {playlists.map((pl, index) => {
               const { name } = pl
               return (
                  <button
                     key={name}
                     className="text-center p-3 rounded-full bg-spotai-military transisiton ease-in-out
                      duration-300 hover:bg-spotai-military-dark hover:rounded-full"
                     onClick={(event) => handlePlaylistClick(event, pl)}
                  >
                     {name}
                  </button>
               )
            })}
         </div>
      </div>
   )
}

export default Sidebar
