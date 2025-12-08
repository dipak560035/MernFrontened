import * as React from "react"

import { cn } from "@/lib/utils"

const SelectContext = React.createContext(null)

function Select({ children, value: controlledValue, defaultValue, onValueChange, ...props }) {
  const ref = React.useRef(null)
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(controlledValue ?? defaultValue ?? "")

  React.useEffect(() => {
    if (controlledValue !== undefined) setValue(controlledValue)
  }, [controlledValue])

  React.useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return
      if (!ref.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [open])

  const handleChange = (val) => {
    if (controlledValue === undefined) setValue(val)
    onValueChange?.(val)
  }

  return (
    <div data-slot="select" ref={ref} {...props}>
      <SelectContext.Provider value={{ open, setOpen, value, setValue: handleChange }}>
        {children}
      </SelectContext.Provider>
    </div>
  )
}

function SelectTrigger({ className, children, ...props }) {
  const ctx = React.useContext(SelectContext)
  if (!ctx) return null
  const { open, setOpen } = ctx
  return (
    <button
      type="button"
      data-slot="select-trigger"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  )
}

function SelectValue({ placeholder, children, ...props }) {
  const ctx = React.useContext(SelectContext)
  const display = ctx?.value || placeholder
  return (
    <span data-slot="select-value" className="text-muted-foreground" {...props}>
      {children ?? display}
    </span>
  )
}

function SelectContent({ className, children, ...props }) {
  const ctx = React.useContext(SelectContext)
  if (!ctx) return null
  const { open } = ctx
  if (!open) return null
  return (
    <div
      data-slot="select-content"
      className={cn(
        "border-input bg-popover text-popover-foreground rounded-md border shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SelectGroup({ className, children, ...props }) {
  return (
    <div
      data-slot="select-group"
      className={cn("overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function SelectItem({ value, className, children, ...props }) {
  const ctx = React.useContext(SelectContext)
  const handleClick = (e) => {
    ctx?.setValue(value)
    ctx?.setOpen(false)
    props.onClick?.(e)
  }
  return (
    <div
      role="option"
      aria-selected={ctx?.value === value}
      data-slot="select-item"
      data-value={value}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  )
}

function SelectLabel({ className, children, ...props }) {
  return (
    <div
      data-slot="select-label"
      className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
}
