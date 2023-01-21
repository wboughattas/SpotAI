import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

const Sliders = ({ settings }) => {
   const defaultValues = settings.map((setting) => {
      return setting.defaultValue
   })
   const [sliderValues, setSliderValues] = useState(defaultValues)
   const handleResetClick = () => {
      setSliderValues(defaultValues)
   }
   const handleSliderOnChange = (event, index) => {
      const newSliderValues = sliderValues.map((value, i) => {
         if (i == index) {
            return event.target.value
         }
         return value
      })
      setSliderValues(newSliderValues)
   }

   return (
      <div className="flex flex-col gap-2 justify-center text-lg">
         {settings.map((setting, index) => {
            const { name, description, min, max, step } = setting
            return (
               <div
                  key={setting.name}
                  className="flex flex-row items-center justify-between relative"
               >
                  <span>{name}</span>
                  <div className="grow justify-start cursor-help">
                     <Tooltip
                        title={
                           <Typography variant="body1">
                              {description}
                           </Typography>
                        }
                        placement="top"
                        arrow
                     >
                        <InfoOutlinedIcon />
                     </Tooltip>
                  </div>
                  <Box sx={{ width: '70%' }}>
                     <Slider
                        value={sliderValues[index]}
                        min={min}
                        max={max}
                        step={step ? step : 0.1}
                        onChange={(event) => handleSliderOnChange(event, index)}
                        color="spotai-green"
                        valueLabelDisplay="auto"
                        valueLabelFormat={(label) =>
                           `${label}${step ? '' : '%'}`
                        }
                     />
                  </Box>
               </div>
            )
         })}
         <div className="flex justify-end gap-x-2">
            <button
               onClick={() => handleResetClick()}
               className="bg-spotai-black rounded-full px-4 transisiton ease-in-out duration-300 hover:bg-spotai-gray"
            >
               Reset
            </button>
            <button className="bg-spotai-green rounded-full px-4 transisiton ease-in-out duration-300 hover:bg-spotai-green-dark">
               Generate
            </button>
         </div>
      </div>
   )
}

export default Sliders
