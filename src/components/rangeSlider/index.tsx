import Slider from '@mui/material/Slider'
import { FunctionComponent, useState } from 'react'
import Translater from '../translater'

interface RangeSliderProps {
  boundries: { min: number | null; max: number | null }
  onValueChange: (event: Event, value: number | number[]) => void
}

function valuetext(value: any) {
  return `€${value}`
}

const RangeSlider: FunctionComponent<RangeSliderProps> = ({
  boundries,
  onValueChange,
}) => {
  const [value, setValue] = useState<number | number[]>([125, 210])

  const handleChange = (event: Event, value: number | number[]) => {
    setValue(value)
    onValueChange(event, value)
  }
  if (boundries.min && boundries.max) {
    return (
      <div className="flex flex-col items-center mb-28 px-6">
        <h2 className=" text-blue-500 font text-2xl">
          <Translater>Price Range</Translater>
        </h2>
        <Slider
          min={boundries.min}
          max={boundries.max}
          step={10}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </div>
    )
  } else {
    return <></>
  }
}

export default RangeSlider
