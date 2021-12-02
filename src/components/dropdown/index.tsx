import React, { Fragment, FunctionComponent, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { MdExpandMore, MdDone } from 'react-icons/md'
import { FormItemOption } from 'src/classes/FormItem'

interface DropdownProps {
  options: Array<FormItemOption>
  placeholder: string
  className?: string
  onChange: any
  name: string
}

const Dropdown: FunctionComponent<DropdownProps> = ({
  options,
  placeholder,
  className,
  onChange,
  name,
}) => {
  const [selected, setSelected] = useState<FormItemOption>()
  function handleChange(e: any) {
    setSelected(e)
    onChange(e, name)
  }
  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className={`relative w-full mb-4 ${className}`}>
        <Listbox.Button className="relative border-blue-500 border w-full py-4 pl-7 pr-10 text-left bg-white rounded-full cursor-default">
          <span className="block truncate">
            {selected ? selected.name : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <MdExpandMore className="w-5 h-5" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-blue ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `${active ? 'text-blue-900 bg-blue-100' : 'text-blue-900'}
                         cursor-default select-none relative py-2 pl-10 pr-4`
                }
                value={person}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? 'font-medium' : 'font-normal'
                      } block truncate`}
                    >
                      {person.name}
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? 'text-blue-600' : 'text-blue-600'
                        }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                      >
                        {/* <CheckIcon className="w-5 h-5" aria-hidden="true" /> */}
                        <MdDone />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default Dropdown
