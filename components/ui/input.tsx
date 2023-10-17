//Shadcn inputfield which have been modified to support a readOnly prop.

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,readOnly, style, ...props }, ref) => {
    return (
      <input
      readOnly={readOnly}
        type={type}
        style={style}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
/* onChange={(event) => {
  let editedValue=event.target.value
  let numberValue:number=Number(event.target.value)
  while(editedValue.startsWith('0')){
    editedValue = editedValue.substring(1);
  numberValue=Number(editedValue)

  }

  console.log(editedValue)
  console.log(event.target.value)
  console.log(numberValue)
  field.onChange(numberValue)}}  */