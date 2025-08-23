"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TypographyVariant =
  | "display1"
  | "display2"
  | "display3"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline"
  | "lead"
  | "blockquote"
  | "code"
  | "small"
  | "muted"
  | "link";

const variantStyles: Record<TypographyVariant, string> = {
  display1: "scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-7xl",
  display2: "scroll-m-20 text-5xl font-bold tracking-tight lg:text-6xl",
  display3: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "scroll-m-20 text-lg font-semibold tracking-tight",
  h6: "scroll-m-20 text-base font-semibold tracking-tight",
  subtitle1: "text-lg font-medium leading-relaxed text-muted-foreground",
  subtitle2: "text-base font-medium leading-relaxed text-muted-foreground",
  body1: "text-base leading-relaxed",
  body2: "text-sm leading-relaxed",
  caption: "text-xs text-muted-foreground",
  overline: "text-xs uppercase tracking-wider text-muted-foreground",
  lead: "text-xl text-muted-foreground",
  blockquote: "mt-6 border-l-2 pl-6 italic text-muted-foreground",
  code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
  small: "text-xs leading-none",
  muted: "text-sm text-muted-foreground",
  link: "text-sm font-medium text-primary underline-offset-4 hover:underline cursor-pointer",
};

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = "body1", as, className, children, ...props }, ref) => {
    const Component = as || getDefaultTag(variant);
    return (
      <Component ref={ref as any} className={cn(variantStyles[variant], className)} {...props}>
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";

function getDefaultTag(variant: TypographyVariant) {
  switch (variant) {
    case "display1":
    case "display2":
    case "display3":
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";
    case "blockquote":
      return "blockquote";
    case "code":
      return "code";
    case "caption":
    case "overline":
    case "small":
    case "muted":
    case "link":
      return "span";
    default:
      return "p";
  }
}

export { Typography };

// ------------------- example ----------------------
// <div className="space-y-4">
//       <Typography variant="display1">Display 1</Typography>
//       <Typography variant="display2">Display 2</Typography>
//       <Typography variant="display3">Display 3</Typography>
//       <Typography variant="h1">Heading 1</Typography>
//       <Typography variant="h2">Heading 2</Typography>
//       <Typography variant="h3">Heading 3</Typography>
//       <Typography variant="subtitle1">Subtitle 1</Typography>
//       <Typography variant="body1">Body text 1 (default)</Typography>
//       <Typography variant="body2">Body text 2</Typography>
//       <Typography variant="caption">Caption text</Typography>
//       <Typography variant="overline">OVERLINE</Typography>
//       <Typography variant="lead">Lead paragraph</Typography>
//       <Typography variant="blockquote">This is a blockquote.</Typography>
//       <Typography variant="code">const x = 42;</Typography>
//       <Typography variant="small">Small text</Typography>
//       <Typography variant="muted">Muted description</Typography>
//       <Typography variant="link">This looks like a link</Typography>
//     </div>
