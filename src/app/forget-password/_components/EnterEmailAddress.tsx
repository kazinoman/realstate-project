"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle } from "@/components/ui/alert";

const EnterEmailAddress = () => {
  // 1. Define form.
  const form = useForm({
    // resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  const handleSendEmail = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto flex flex-col gap-10">
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-primary">Enter Your Email</h2>
        <p className="text-gray-400 font-semibold text-xs mb-4">
          We’ve sent a one-time password (OTP) to your email. Please check your inbox and follow the instructions to
          continue. If you don’t see the email, kindly check your spam or junk folder.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSendEmail)} className="flex flex-col space-y-4">
          <FormField
            name="email"
            control={form.control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            }}
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
          <Button type="submit" className="w-full mt-4 h-12">
            CONTINUE
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EnterEmailAddress;
