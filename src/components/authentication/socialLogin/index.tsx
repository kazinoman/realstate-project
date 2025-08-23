import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import React from "react";
import { cn } from "@/lib/utils";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const SocialLogin = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <Separator className="flex-1" />
        <Typography variant="small" className="px-2">
          or
        </Typography>
        <Separator className="flex-1" />
      </div>

      <Typography variant="small">For faster login or register use your social account.</Typography>

      <div className="space-y-4 w-full mt-2">
        <IconButton
          icon={<FaGoogle className="h-5 w-5 text-yellow-500" />}
          text="Connect with Google"
          className="w-full"
        />
        <IconButton icon={<FaFacebookF className="h-5 w-5 text-blue-500" />} text="Connect with Facebook" />
      </div>
    </div>
  );
};

export default SocialLogin;

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, text, className, ...props }) => {
  return (
    <button {...props} className={cn("flex  w-full items-stretch   bg-white hover:bg-gray-100 transition", className)}>
      <div className="flex flex-row gap-4 border border-default p-4 rounded-s-lg">
        {/* Icon */}
        <span className="flex items-center justify-center ">{icon}</span>
      </div>

      {/* Text */}
      <div className="flex flex-row items-center justify-center border-y border-r w-full border-default p-4 rounded-e-lg">
        <span className="font-bold text-xs">{text}</span>
      </div>
    </button>
  );
};
