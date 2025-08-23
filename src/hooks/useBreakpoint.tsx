import { useState, useEffect } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useBreakpoint() {
  const getBreakpoint = (width: number): Breakpoint => {
    if (width >= breakpoints["2xl"]) return "2xl";
    if (width >= breakpoints["xl"]) return "xl";
    if (width >= breakpoints["lg"]) return "lg";
    if (width >= breakpoints["md"]) return "md";
    return "sm";
  };

  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    typeof window !== "undefined" ? getBreakpoint(window.innerWidth) : "sm"
  );

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    breakpoint,
    isSm: breakpoint === "sm",
    isMd: breakpoint === "md",
    isLg: breakpoint === "lg",
    isXl: breakpoint === "xl",
    is2xl: breakpoint === "2xl",
  };
}
