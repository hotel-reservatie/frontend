import React, { Fragment, FunctionComponent, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { MdExpandMore, MdDone } from 'react-icons/md'
import { FormItemOption } from 'src/classes/FormItem'
import classNames from 'classnames'

interface DropdownProps {
  options: Array<FormItemOption>
  placeholder: string
  className?: string
  onChange: any
  name: string
  multiSelect?: boolean
}

interface DropdownWrapperProps {
  selected: FormItemOption | Array<FormItemOption> | undefined
  handleChange: (e: any) => void
  className: string | undefined
  placeholder: string
  isOpen?: boolean
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

interface DropdownItemProps {
  value: any
  title: string
  isMulti?: boolean
}

const DropdownWrapper: FunctionComponent<DropdownWrapperProps> = ({
  children,
  selected,
  handleChange,
  className,
  placeholder,
  isOpen,
  setIsOpen,
}) => {
  function handleClick() {
    console.log('click')
    if (setIsOpen) setIsOpen(!isOpen)
  }

  return (
    <Listbox
      as="div"
      value={selected}
      onChange={handleChange}
      onClick={handleClick}
    >
      {({ open }) => (
        <>
          <div
            className={classNames('relative w-full mb-4', {
              className: className,
            })}
          >
            <Listbox.Button
              aria-expanded={isOpen}
              className="relative border-blue-500 border w-full py-4 pl-7 pr-10 text-left bg-white rounded-full cursor-default"
            >
              <span className="block truncate">
                {selected && !Array.isArray(selected)
                  ? selected.name
                  : placeholder}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <MdExpandMore className="w-5 h-5" />
              </span>
            </Listbox.Button>

            <Transition
              as="div"
              unmount={false}
              show={isOpen}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {open && (
                <Listbox.Options
                  static
                  className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-blue ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {children}
                </Listbox.Options>
              )}
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

const DropdownItem: FunctionComponent<DropdownItemProps> = ({
  value,
  title,
  isMulti,
}) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        classNames('cursor-default select-none relative py-2 pl-10 pr-4', {
          'text-blue-900 bg-blue-100': active,
          'text-blue-900': !active,
        })
      }
      value={value}
    >
      {({ selected }) => (
        <>
          <span
            className={classNames('block truncate', {
              'font-medium': selected,
              'font-normal': !selected,
            })}
          >
            {title}
          </span>
          {selected && (
            <span
              className={'absolute inset-y-0 left-0 flex items-center pl-3'}
            >
              <MdDone />
            </span>
          )}
        </>
      )}
    </Listbox.Option>
  )
}

const Dropdown: FunctionComponent<DropdownProps> = ({
  options,
  placeholder,
  className,
  onChange,
  name,
  multiSelect,
}) => {
  const [selected, setSelected] = useState<FormItemOption>()
  const [multiSelected, setMultiSelected] = useState<Array<FormItemOption>>([])
  const [isOpen, setIsOpen] = useState(false)

  function isSelected(value: string) {
    return multiSelected.find(el => el.id === value) ? true : false
  }

  function handleDeselect(value: any) {
    const updatedSelection = multiSelected.filter(el => el !== value)
    setMultiSelected(updatedSelection)
    setIsOpen(true)
  }

  function handleChange(e: any) {
    if (multiSelect) {
      if (!isSelected(e)) {
        const item = options.find(el => el === e)
        console.log(item)

        if (item) {
          const updatedSelection = [...multiSelected, item]
          setMultiSelected(updatedSelection)
        }
      } else {
        handleDeselect(e)
      }
    } else {
      setSelected(e)
    }
    setIsOpen(true)
    onChange(e, name)
  }

  if (multiSelect) {
    return (
      <DropdownWrapper
        selected={selected}
        handleChange={handleChange}
        className={className}
        placeholder={placeholder}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        {options.map((item, index) => (
          <DropdownItem
            value={item}
            key={`dropdownItem-${index}`}
            title={item.name}
          />
        ))}
      </DropdownWrapper>
    )
  } else {
    return (
      <DropdownWrapper
        selected={selected}
        handleChange={handleChange}
        className={className}
        placeholder={placeholder}
      >
        {options.map((item, index) => (
          <DropdownItem
            value={item}
            key={`dropdownItem-${index}`}
            title={item.name}
          />
        ))}
      </DropdownWrapper>
    )
  }
}

export default Dropdown
