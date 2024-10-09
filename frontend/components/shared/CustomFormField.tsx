/* eslint-disable no-unused-vars */
import ReactDatePicker from "react-datepicker"
import { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import React from "react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "../ui/select"

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  RADIO = "radio",
}

interface CustomProps {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  iconSrc?: string
  iconAlt?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
  fieldType: FormFieldType
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <Input
          className="relative w-full h-12 border border-[#e5e7ec] rounded-lg text-sm text-[#808080] px-5 py-2 transition-all duration-500 ease"
          placeholder={props.placeholder}
          {...field}
        />
      )

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border">
          <FormControl>
            <input
              className="relative w-full h-12 rounded-lg text-sm text-[#808080] px-5 py-2 transition-all duration-500 ease  !important"
              name="startsAt"
              type="datetime-local"
              placeholder={props.placeholder}
              value={field.value}
              onChange={(date: any) => field.onChange(date)}
              required
            />
          </FormControl>
        </div>
      )
    case FormFieldType.SELECT:
      return (
        <Select name={field.name} onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger style={{ outlineColor: "#39cabb" }}>
            <SelectValue
              placeholder={props.placeholder}
              className="relative block text-sm text-[#808080]"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectContent>{props.children}</SelectContent>
          </SelectContent>
        </Select>
      )
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null
    default:
      return null
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full md:w-full lg:w-full mb-4">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="relative block text-sm text-[#808080] font-medium mb-1">
              {label}
            </FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
