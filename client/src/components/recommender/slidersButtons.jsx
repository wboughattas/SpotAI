import Slider from '@mui/material/Slider'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { Checkbox } from '@mui/material'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const Sliders = ({
   settings,
   handleReset,
   handleSliderOnChange,
   handleGenerateSongs,
   sliderValues,
   selectedSliders,
   handleCheckbox,
}) => {
   const sliders = settings.map((setting, index) => {
      const { name, description, min, max, step, key } = setting
      return (
         <div key={setting.name} className="grid grid-cols-12 gap-4 ">
            <div className="py-2 px-4 col-span-4 lg:col-span-3 flex justify-between bg-spotai-military/70 rounded-full items-center">
               <span className="">{name}</span>
               <div>
                  {index !== 0 && (
                     <Checkbox
                        checked={selectedSliders.includes(key)}
                        onChange={handleCheckbox}
                        name={key}
                        icon={<CheckCircleOutlineOutlinedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                     />
                  )}

                  <Tooltip
                     title={
                        <Typography variant="body1">{description}</Typography>
                     }
                     placement="top"
                     arrow
                  >
                     <InfoOutlinedIcon sx={{ cursor: 'help' }} />
                  </Tooltip>
               </div>
            </div>
            <div className="col-span-8 lg:col-span-9">
               <Slider
                  value={sliderValues[index]}
                  min={min}
                  max={max}
                  step={step ? step : 0.1}
                  onChange={(event) => handleSliderOnChange(event, index)}
                  color="spotai-green"
                  valueLabelDisplay="auto"
                  valueLabelFormat={(label) => `${label}${step ? '' : '%'}`}
               />
            </div>
         </div>
      )
   })

   const buttons = (
      <div className="flex justify-end gap-x-2">
         <button
            onClick={() => handleReset()}
            className="bg-spotai-black rounded-full px-4 transisiton ease-in-out duration-300 hover:bg-spotai-gray"
         >
            Reset
         </button>
         <button
            onClick={handleGenerateSongs}
            className="bg-spotai-green rounded-full px-4 transisiton ease-in-out duration-300 hover:bg-spotai-green-dark"
         >
            Generate
         </button>
      </div>
   )
   return (
      <div className="flex flex-col gap-2 justify-center text-lg">
         {sliders}
         {buttons}
      </div>
   )
}

export default Sliders
