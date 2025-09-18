"use client";

import { Button } from "@/components/ui/button";
import { FormField, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoUnlock, GoLock } from "react-icons/go";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordFormValues, passwordSchema } from "@/lib/validation/resetPassword.validation";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useUserContext } from "@/contexts/user.context";

const UpdateUserPassword = () => {
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const { changePassword } = useUserContext();

  const togglePassword = (field: keyof typeof showPassword) =>
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  const handleResetPassword = async (data: any) => {
    await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <div className="bg-white p-2 sm:p-4 md:p-8 rounded-xl">
      <div className="border-b border-default mb-4">
        <Typography variant="h6" className="mb-1 uppercase">
          Change Password
        </Typography>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleResetPassword)} className="flex flex-col gap-4">
          {/* Current Password */}
          <FormField
            name="currentPassword"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                type={showPassword.currentPassword ? "text" : "password"}
                placeholder="Current Password"
                leftIcon={<GoUnlock className="text-secondary h-5 w-4" />}
                rightIcon={
                  showPassword.currentPassword ? (
                    <FaEye
                      className="text-secondary h-5 w-4 cursor-pointer"
                      onClick={() => togglePassword("currentPassword")}
                    />
                  ) : (
                    <FaEyeSlash
                      className="text-secondary h-5 w-4 cursor-pointer"
                      onClick={() => togglePassword("currentPassword")}
                    />
                  )
                }
                autoComplete="new-password"
                className="bg-white-300 autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-black"
              />
            )}
          />

          {errors?.currentPassword && (
            <Alert variant={"destructive"}>
              <AlertTitle>{errors?.currentPassword?.message}</AlertTitle>
            </Alert>
          )}

          {/* New Password */}
          <FormField
            name="newPassword"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                type={showPassword.newPassword ? "text" : "password"}
                placeholder="New Password"
                leftIcon={<GoLock className="text-secondary h-5 w-4" />}
                rightIcon={
                  showPassword.newPassword ? (
                    <FaEye
                      className="text-secondary h-5 w-4 cursor-pointer"
                      onClick={() => togglePassword("newPassword")}
                    />
                  ) : (
                    <FaEyeSlash
                      className="text-secondary h-5 w-4 cursor-pointer"
                      onClick={() => togglePassword("newPassword")}
                    />
                  )
                }
                autoComplete="off"
                className="bg-white-300 autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-black"
              />
            )}
          />

          {errors?.newPassword && (
            <Alert variant={"destructive"}>
              <AlertTitle>{errors?.newPassword?.message}</AlertTitle>
            </Alert>
          )}

          {/* Confirm Password */}
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                leftIcon={<IoShieldCheckmarkOutline className="text-secondary h-5 w-4" />}
                rightIcon={
                  showPassword.confirmPassword ? (
                    <FaEye
                      className="text-secondary h-5 w-4 cursor-pointer"
                      onClick={() => togglePassword("confirmPassword")}
                    />
                  ) : (
                    <FaEyeSlash
                      className="text-secondary h-5 w-4 cursor-pointer"
                      onClick={() => togglePassword("confirmPassword")}
                    />
                  )
                }
                autoComplete="off"
                className="bg-white-300 autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-black"
              />
            )}
          />

          {errors?.confirmPassword && (
            <Alert variant={"destructive"}>
              <AlertTitle>{errors?.confirmPassword?.message}</AlertTitle>
            </Alert>
          )}

          <Button type="submit" className="w-full md:w-[20%] h-12">
            UPDATE
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateUserPassword;
