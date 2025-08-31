import React, { useEffect } from "react";

import { Input } from "@/components/ui/input";

import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { GoLock } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import SocialLogin from "../socialLogin";
import { Alert, AlertTitle } from "@/components/ui/alert";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signUpSchema, { SignUpSchema } from "@/lib/validation/registerForm.validation";
import LoaderOverlay from "@/components/ui/loader";
import { useUser } from "@/contexts/user.context";
import { FormField } from "@/components/ui/form";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = ({ handleChangeTab }: { handleChangeTab?: (value: "login" | "register") => void }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { loading, register, success } = useUser();

  // 1. Define form.
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  // 2. Define a submit handler.
  async function onSubmit(values: SignUpSchema) {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    await register(data, "Registration successful!");
  }

  useEffect(() => {
    if (success) {
      handleChangeTab && handleChangeTab("login");
    }
  }, [success]);

  return (
    <div className="pt-2 md:pt-[10px] px-0 md:px-6 pb-[30px] flex flex-col gap-4">
      {loading && <LoaderOverlay />}

      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-2 md:pt-[10px] mb-4 flex flex-col gap-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Full Name"
              leftIcon={<IoPersonOutline className="text-secondary h-5 w-4" />}
            />
          )}
        />

        {errors?.name && (
          <Alert variant={"destructive"}>
            <AlertTitle>{errors?.name?.message}</AlertTitle>
          </Alert>
        )}

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Email Address"
              leftIcon={<AiOutlineMail className="text-secondary h-5 w-4" />}
              autoComplete="off"
              className="bg-white-300 autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-black"
            />
          )}
        />
        {errors?.email && (
          <Alert variant={"destructive"}>
            <AlertTitle>{errors?.email?.message}</AlertTitle>
          </Alert>
        )}

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              leftIcon={<GoLock className="text-secondary h-5 w-4" />}
              rightIcon={
                showPassword ? (
                  <FaEye className="text-secondary h-5 w-4" onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEyeSlash className="text-secondary h-5 w-4" onClick={() => setShowPassword(!showPassword)} />
                )
              }
            />
          )}
        />
        {errors?.password && (
          <Alert variant={"destructive"}>
            <AlertTitle>{errors?.password?.message}</AlertTitle>
          </Alert>
        )}

        <Button type="submit" variant="default" animatedRounded className="h-[50px] uppercase text-[11px] font-bold">
          Register
        </Button>
      </form>

      <SocialLogin />
    </div>
  );
};

export default SignUp;
