import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="rounded relative flex items-center border border-input bg-transparent px-3 py-1 h-[56px]">
        {leftIcon && <span className="">{leftIcon}</span>}
        <input
          type={type}
          className={cn(
            "rounded flex h-9 w-full font-medium text-xs shadow-sm transition-colors placeholder:text-xs file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            leftIcon && "pl-3",
            rightIcon && "pr-3",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && <span className="absolute right-3 flex items-center">{rightIcon}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
