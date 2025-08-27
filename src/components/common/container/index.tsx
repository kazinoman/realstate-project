import { cn } from "@/lib/utils"; // Assumed from your ProfileSidebar context
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn(
        "w-[calc(100%-16px)] md:w-[calc(100%-32px)] lg:w-[calc(100%-64px)] max-w-[1700px] mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-12 font-poppins  rounded-[20px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
