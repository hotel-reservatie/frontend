import { createContext, FunctionComponent, useContext, useReducer } from 'react'
import { RoomFilters } from 'src/schema'

interface IFilterContext {
  updateFilterValue: (filterName: string | undefined, value: any) => void
  filters: RoomFilters
}

const FilterContext = createContext<IFilterContext>({} as IFilterContext)

export const useFilterValues = () => {
  return useContext(FilterContext)
}

const initialFilterValues: RoomFilters = {
  startDate: undefined,
  endDate: undefined,
  maxCapacity: undefined,
  maxPrice: undefined,
  minPrice: undefined,
  roomIds: undefined,
  roomName: undefined,
  tagIds: undefined,
  roomTypeIds: undefined,
}

function reducer(
  state: RoomFilters,
  action: { type: string; payload: { filterName: string; value: any } },
): RoomFilters {
  switch (action.type) {
    case 'update':
      console.log('action.payload.value:', action.payload.value)

      return { ...state, [action.payload.filterName]: action.payload.value }
    default:
      return state
  }
}

const FilterProvider: FunctionComponent = ({ children }) => {
  const [filters, dispatch] = useReducer(reducer, initialFilterValues)

  const hasValue = (val: string) => {
    return String(val).trim().length > 0
  }

  const updateFilterValue = (filterName: string | undefined, value: any) => {
    if (filterName && filterName in filters) {
      console.log(value)

      dispatch({ type: 'update', payload: { filterName, value } })
    }
  }

  const value = {
    updateFilterValue,
    filters,
  }

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}

export default FilterProvider
