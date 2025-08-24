import React from "react";

import { IoPersonOutline } from "react-icons/io5";
import { GoLock } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SocialLogin from "../socialLogin";
import { LoginSchema, loginSchema } from "@/lib/validation/loginForm.validation";
import { FormField } from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import LoaderOverlay from "@/components/ui/loader";
import { toast } from "sonner";

import { useUser } from "@/contexts/user.context";

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { loading, login, error, success } = useUser();

  // 1. Define form.
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  // 2. Define a submit handler.
  async function onSubmit(values: LoginSchema) {
    const data = {
      username: values.email,
      password: values.password,
    };
    await login(data, "Login successful!");
  }

  React.useEffect(() => {
    if (error) {
      toast.success("Something went wrong!", { icon: "⚠️" });
    }

    if (success) {
      toast.success(success, { icon: "🎉" });
    }
  }, [error, success]);

  return (
    <div className="pt-2 md:pt-[10px]  px-0 md:px-6 pb-[30px]">
      {loading && <LoaderOverlay />}

      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-2 md:pt-[10px] mb-4 flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="User Name or Email Address"
              leftIcon={<IoPersonOutline className="text-secondary h-5 w-4" />}
              autoComplete="off"
            />
          )}
        ></FormField>

        {errors?.email && (
          <Alert variant={"destructive"}>
            <AlertTitle>{errors?.email?.message}</AlertTitle>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              leftIcon={<GoLock className="text-secondary h-5 w-4" />}
              rightIcon={<FaEye className="text-secondary h-5 w-4" onClick={() => setShowPassword(!showPassword)} />}
              autoComplete="new-password"
            />
          )}
        ></FormField>

        {errors.password && (
          <Alert variant={"destructive"}>
            <AlertTitle>{errors?.password?.message}</AlertTitle>
          </Alert>
        )}

        <div className="flex items-center justify-between py-2">
          <Checkbox label="Remember me" />
          <Typography variant="muted" className="text-xs hover:underline cursor-pointer font-semibold">
            Lost Your Password?
          </Typography>
        </div>

        <Button type="submit" variant="default" animatedRounded className="h-[50px] uppercase text-[11px] font-bold">
          Log In
        </Button>
      </form>

      <SocialLogin />
    </div>
  );
};

export default LoginForm;
