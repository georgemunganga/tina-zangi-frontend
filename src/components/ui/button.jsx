import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-[transform,colors,background-color,border-color,box-shadow] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "rounded-md bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "rounded-md border border-input shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "rounded-md bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "rounded-md hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        brand:
          "rounded-full bg-[#c2410c] text-white shadow-[0_12px_30px_rgba(194,65,12,0.24)] hover:-translate-y-0.5 hover:bg-[#9a3412] hover:shadow-[0_18px_36px_rgba(154,52,18,0.28)]",
        brandSecondary:
          "rounded-full border border-slate-300 bg-white text-slate-800 shadow-[0_10px_24px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-[0_16px_32px_rgba(15,23,42,0.08)]",
        brandGhost:
          "rounded-full border border-white/30 bg-white/10 text-white backdrop-blur hover:-translate-y-0.5 hover:bg-white/15",
        brandSoft:
          "rounded-full border border-amber-200 bg-white text-[#9a3412] shadow-[0_10px_24px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:bg-[#fff7ed]",
        brandDark:
          "rounded-full bg-black text-white shadow-[0_12px_30px_rgba(15,23,42,0.2)] hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-[0_18px_36px_rgba(15,23,42,0.24)]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9 rounded-md",
        pillSm: "h-10 rounded-full px-4 text-sm font-semibold",
        pill: "h-11 rounded-full px-5 text-sm font-semibold",
        pillLg: "h-12 rounded-full px-6 text-sm font-semibold",
        pillXl: "h-14 rounded-full px-10 text-lg font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
