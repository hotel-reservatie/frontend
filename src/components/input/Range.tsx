import {
  ChangeEventHandler,
  FunctionComponent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames/bind'

interface RangeProps {
  min: number
  max: number
  onChange: any
  step: number
}

interface RangeState {
  minValue: number
  maxValue: number
  minBound: number
  maxBound: number
  minThumb: number
  maxThumb: number
}

function reducer(state: RangeState, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'minTrigger':
      return {
        ...state,
        minValue: action.payload.newMinValue,
        minThumb: action.payload.newMinthumb,
      }
    case 'maxTrigger':
      return {
        ...state,
        maxValue: action.payload.newMaxValue,
        MaxThumb: action.payload.newMaxThumb,
      }
    default:
      return state
  }
}

const Range: FunctionComponent<RangeProps> = ({
  min,
  max,
  onChange,
  step = 10,
}) => {
  const leftInput = useRef<HTMLInputElement>(null)
  const rightInput = useRef<HTMLInputElement>(null)

  const initialState = {
    minValue: min,
    maxValue: max,
    minBound: min,
    maxBound: max,
    minThumb: 0,
    maxThumb: 0,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const minTrigger = () => {
    const newMinValue = Math.min(state.minValue, state.maxValue - 500)
    const newMinthumb =
      ((state.minValue - state.minBound) / (state.maxBound - state.minBound)) *
      100
    console.log({ newMinValue, newMinthumb })

    dispatch({ type: 'minTrigger', payload: { newMinValue, newMinthumb } })
  }
  const maxTrigger = () => {
    const newMaxValue = Math.max(state.maxValue, state.minValue + 500)
    const newMaxThumb =
      100 -
      ((state.maxValue - state.minBound) / (state.maxBound - state.minBound)) *
        100
    console.log({ newMaxThumb, newMaxValue })

    dispatch({ type: 'maxTrigger', payload: { newMaxValue, newMaxThumb } })
  }

  useEffect(() => {
    minTrigger()
    maxTrigger()
  }, [])

  useEffect(() => {
    leftInput?.current?.addEventListener('input', minTrigger)
    rightInput?.current?.addEventListener('input', maxTrigger)
    return () => {
      leftInput?.current?.removeEventListener('input', minTrigger)
      rightInput?.current?.removeEventListener('input', maxTrigger)
    }
  }, [])

  return (
    <div>
      <input
        ref={leftInput}
        type="range"
        step="100"
        value={state.minValue}
        onChange={minTrigger}
        name={'min'}
        className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
      />

      <input
        ref={rightInput}
        type="range"
        step="100"
        value={state.maxValue}
        onChange={maxTrigger}
        name={'max'}
        min={state.minBound}
        max={state.maxBound}
        className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
      />

      <div className="relative z-10 h-2">
        <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>

        <div
          className={classNames(
            'absolute z-20 top-0 bottom-0 rounded-md bg-green-300',
            { [`right-[${state.maxThumb}%]`]: true },
            { [`left-[${state.minThumb}%]`]: true },
          )}
        ></div>

        <div
          className={classNames(
            'absolute z-30 w-6 h-6 top-0 left-0 bg-green-300 rounded-full -mt-2 -ml-1',
            { [`left-[${state.minThumb}%]`]: true },
          )}
        ></div>

        <div
          className={classNames(
            'absolute z-30 w-6 h-6 top-0 right-0 bg-green-300 rounded-full -mt-2 -mr-3',
            { [`right-[${state.maxThumb}%]`]: true },
          )}
        ></div>
      </div>
    </div>
  )
}

export default Range
