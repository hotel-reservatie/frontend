import Slider from '@mui/material/Slider'
import { FunctionComponent, useState } from 'react'

interface RangeSliderProps {
  boundries: { min: number; max: number } | undefined
}

function valuetext(value: any) {
  return `€${value}`
}

const RangeSlider: FunctionComponent<RangeSliderProps> = ({ boundries }) => {
  const [value, setValue] = useState<number | number[]>([125, 210])

  const handleChange = (event: Event, value: number | number[]) => {
    setValue(value)
  }
  if (boundries) {
    return (
      <Slider
        min={boundries.min}
        max={boundries.max}
        step={10}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    )
  } else {
    return <></>
  }
}

export default RangeSlider
