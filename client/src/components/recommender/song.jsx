const Song = ({ playlist }) => {
   const { name, length, tracks } = playlist
   console.log(name);
   return (
      <div className="flex flex-row items-center gap-10">
         <div>
            <div className="text-3xl font-bold ">{name} </div>
         </div>
      </div>
   )
}

export default Song
