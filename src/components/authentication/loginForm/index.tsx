import React from "react";

import { IoPersonOutline } from "react-icons/io5";
import { GoLock } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import SocialLogin from "../socialLogin";

const LoginForm = () => {
  return (
    <div className="pt-2 md:pt-[10px] px-0 md:px-6 pb-[30px] flex flex-col gap-4">
      <Input
        placeholder="User Name or Email Address"
        leftIcon={<IoPersonOutline className="text-secondary h-5 w-4" />}
      />

      <Input
        placeholder="Password"
        leftIcon={<GoLock className="text-secondary h-5 w-4" />}
        rightIcon={<FaEye className="text-secondary h-5 w-4" />}
      />

      <div className="flex items-center justify-between">
        <Checkbox label="Remember me" />
        <Typography variant="muted" className="text-xs hover:underline cursor-pointer">
          Lost Your Password?
        </Typography>
      </div>

      <Button variant="default" animatedRounded className="h-[50px] uppercase text-[11px] font-bold">
        Log In
      </Button>

      <SocialLogin />
    </div>
  );
};

export default LoginForm;
