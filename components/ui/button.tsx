import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-slate-100 hover:text-slate-500",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        primaryOutline: "bg-white text-primary hover:bg-primary/20",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        secondaryOutline: "bg-white text-secondary-foreground hover:bg-secondary/20",

        danger: "bg-rose-500 text-primary-foreground hover:bg-rose-500/90",
        dangerOutline: "bg-white text-rose-500 hover:bg-slate-100",
        super: "bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90",
        superOutline: "bg-white text-indigo-500 hover:bg-slate-100",
        ghost: "bg-transparent text-slate-500",
        
        sidebar: "bg-transparent text-secondary-foreground hover:bg-secondary/20 transition-none",
        sidebarOutline: "bg-secondary/70 text-secondary-foreground hover:bg-secondary/70 transition-none",
        
        locked: "bg-neutral-200 text-slate-500 hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0",
        lesson: "bg-green-500 text-primary-foreground hover:bg-green-500/90 border-green-600 border-b-4 active:border-b-0",
        guide: "bg-transparent border-2 border-slate-100/25 b-2 text-white hover:bg-slate-100/15",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
