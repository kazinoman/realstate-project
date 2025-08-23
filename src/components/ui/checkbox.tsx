"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    label?: string;
  }
>(({ className, label, ...props }, ref) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-5 w-5 shrink-0 rounded-sm border border-[#ddd] shadow disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-transparent data-[state=checked]:text-secondary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className="h-4 w-4 text-secondary" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>

    {label && (
      <span className="text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </span>
    )}
  </label>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
