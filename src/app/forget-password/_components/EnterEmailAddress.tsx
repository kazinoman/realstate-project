"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AiOutlineMail } from "react-icons/ai";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useUserContext } from "@/contexts/user.context";
import { useRouter } from "next/navigation";
import LoaderOverlay from "@/components/ui/loader";
import { localStorageUtils } from "@/lib/localstorage";
import { STORAGE_KEYS } from "@/lib/localstorage/localstorage.keys";

const EnterEmailAddress = () => {
  const router = useRouter();
  const { sendOtpInEmail, loading } = useUserContext();

  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  const handleSendEmail = async (data: any) => {
    const res = await sendOtpInEmail({
      email: data.email,
    });

    if (res?.data.success) {
      router.push("/forget-password?section=code");

      localStorageUtils.set(STORAGE_KEYS.STORE_EMAIL, data.email);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto flex flex-col ">
      {loading && <LoaderOverlay />}

      <div className="flex flex-col items-center justify-between">
        <h2 className="text-base md:text-base lg:text-2xl font-semibold mb-2 text-primary self-start">
          Enter Your Email
        </h2>
        <Image src={"/images/email_verification_step.gif"} className="" alt="" width={400} height={300} />
        <p className="text-gray-400 font-semibold text-[10px] md:text-xs mb-4">
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
