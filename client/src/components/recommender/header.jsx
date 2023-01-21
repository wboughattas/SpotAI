const Header = ({ playlist }) => {
   //    const { title, length, songs } = playlist

   return (
      <div className="flex flex-row justify-center gap-10">
         <div>
            <div className="text-3xl text-center font-bold ">
               {'Customize your generated playlist'}
            </div>
            <div className="text-lg text-center">
               {'Adjust the sliders according to your prefrence'}
            </div>
         </div>
      </div>
   )
}

export default Header
