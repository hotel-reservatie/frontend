export interface FormItemOption {
  [key: string]: string
  id: string
  name: string
}

function getValueFromObject(object: any, property: any, defaultValue: any) {
  if (object[property]) {
    return object[property]
  } else {
    return defaultValue
  }
}

class FormItem {
  value?: any
  maxchars?: number
  minchars?: number
  placeholder?: string
  className?: string
  required?: boolean
  disabled?: boolean
  label?: string
  name?: string
  id?: string
  options?: FormItemOption[]
  faulty?: 'true' | 'false'
  errormessage?: string
  autoComplete?: string
  selected?: any
  type?:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | 'dropdown'
    | 'dropdown-multi-select'

  constructor(formItem: FormItem) {


    this.type = getValueFromObject(formItem, 'type', 'text')
    this.value = getValueFromObject(formItem, 'value', '')
    this.maxchars = getValueFromObject(formItem, 'maxchars', 30)
    this.minchars = getValueFromObject(formItem, 'minchars', 0)
    this.placeholder = getValueFromObject(formItem, 'placeholder', '')
    this.className = getValueFromObject(formItem, 'className', undefined)
    this.disabled = getValueFromObject(formItem, 'disabled', false)
    this.label = getValueFromObject(formItem, 'label', null)
    this.name = getValueFromObject(formItem, 'name', undefined)
    this.id = getValueFromObject(formItem, 'id', '')
    this.options = getValueFromObject(formItem, 'options', undefined)
    this.faulty = getValueFromObject(formItem, 'faulty', undefined)
    this.errormessage = getValueFromObject(formItem, 'errormessage', undefined)
    this.autoComplete = getValueFromObject(formItem, 'autoComplete', 'on')

    if (formItem.required == undefined) {
      this.required = true
    } else {
      this.required = formItem.required
    }

  }
}

export default FormItem
