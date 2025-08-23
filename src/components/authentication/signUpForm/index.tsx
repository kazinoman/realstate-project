import React from "react";

import { Input } from "@/components/ui/input";

import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { GoLock } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import SocialLogin from "../socialLogin";

const SignUp = () => {
  return (
    <div className="pt-2 md:pt-[10px] px-0 md:px-6 pb-[30px] flex flex-col gap-4">
      <Input placeholder="Full Name" leftIcon={<IoPersonOutline className="text-secondary h-5 w-4" />} />

      <Input placeholder="Email Address" leftIcon={<AiOutlineMail className="text-secondary h-5 w-4" />} />

      <Input
        placeholder="Password"
        leftIcon={<GoLock className="text-secondary h-5 w-4" />}
        rightIcon={<FaEye className="text-secondary h-5 w-4" />}
      />

      <Button variant="default" animatedRounded className="h-[50px] uppercase text-[11px] font-bold">
        Register
      </Button>

      <SocialLogin />
    </div>
  );
};

export default SignUp;
