"use client";

import { useState } from "react";
import { OTPInput as BaseOTPInput, type SlotProps } from "input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FormField, Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { GoUnlock } from "react-icons/go";
import { Alert, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { localStorageUtils } from "@/lib/localstorage";
import { STORAGE_KEYS } from "@/lib/localstorage/localstorage.keys";
import { useUserContext } from "@/contexts/user.context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoaderOverlay from "@/components/ui/loader";

interface OTPInputProps {
  onComplete?: (value: string) => void;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg",
        "flex items-center justify-center",
        "transition-all duration-300",
        "border border-input bg-background",
        "rounded-md",
        "focus-within:border-ring",
        props.char && "border-primary bg-primary/5"
      )}
    >
      {props.char && <div className="text-foreground font-medium">{props.char}</div>}
      {props.hasFakeCaret && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-0.5 h-5 sm:h-6 bg-primary animate-pulse" />
        </div>
      )}
    </div>
  );
}

export function OTPVerification({ onComplete, onValueChange, disabled = false }: OTPInputProps) {
  const router = useRouter();

  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { resetPassword, loading } = useUserContext();

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { errors },
    getValues,
  } = form;

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChange?.(newValue);

    if (newValue.length === 5) {
      onComplete?.(newValue);
    }
  };

  const handleSubmit = async (data: any) => {
    const email = (localStorageUtils.get(STORAGE_KEYS.STORE_EMAIL) as string) ?? "";

    try {
      const res = await resetPassword(
        {
          email: email,
          code: value,
          newPassword: data.password,
        },
        "Password reset successfully!"
      );

      if (res?.data.success) {
        router.push("/");
      }
    } catch (error) {
      console.error("Reset password failed:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-1 mt-4">
      {loading && <LoaderOverlay />}

      <div className="w-full max-w-md">
        <div className=" rounded-xl p-2 sm:p-4 md:py-3 md:pb-6 md:px-6 shadow-xl flex flex-col items-center">
          <Image src="/images/Mobile wireframe.gif" alt="" width={200} height={200} />

          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-base sm:text-xl font-bold text-foreground mb-2">Reset your password</h1>
            <p className="text-xs sm:text-xs font-semibold text-gray-400">
              Enter the 5-digit code sent to your device and set up your password
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
              {/* OTP Input */}
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-400">Verification Code</Label>
                <div className="flex justify-center">
                  <BaseOTPInput
                    maxLength={5}
                    value={value}
                    onChange={handleValueChange}
                    disabled={disabled}
                    containerClassName="flex gap-2 sm:gap-3"
                    render={({ slots }) => (
                      <div className="flex gap-2 sm:gap-3 items-center justify-around">
                        {slots.map((slot, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <Slot {...slot} />
                            {slots.length - 1 !== idx && <span className="text-muted-foreground">-</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <Label htmlFor="password" className="text-gray-400 text-xs">
                  Password
                </Label>
                <FormField
                  name="password"
                  control={form.control}
                  rules={{
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                    maxLength: { value: 50, message: "Password must not exceed 50 characters" },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      leftIcon={<GoUnlock className="text-secondary h-5 w-4" />}
                      rightIcon={
                        showPassword ? (
                          <FaEye
                            className="text-secondary h-5 w-4 cursor-pointer"
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <FaEyeSlash
                            className="text-secondary h-5 w-4 cursor-pointer"
                            onClick={() => setShowPassword(true)}
                          />
                        )
                      }
                      autoComplete="new-password"
                      className="w-full"
                    />
                  )}
                />
                {errors.password && (
                  <Alert variant="destructive">
                    <AlertTitle>{errors.password.message}</AlertTitle>
                  </Alert>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <Label htmlFor="confirmPassword" className="text-gray-400 text-xs">
                  Confirm Password
                </Label>
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  rules={{
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                    maxLength: { value: 50, message: "Password must not exceed 50 characters" },
                    validate: (value) => value === getValues().password || "Passwords do not match",
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      leftIcon={<GoUnlock className="text-secondary h-5 w-4" />}
                      rightIcon={
                        showConfirmPassword ? (
                          <FaEye
                            className="text-secondary h-5 w-4 cursor-pointer"
                            onClick={() => setShowConfirmPassword(false)}
                          />
                        ) : (
                          <FaEyeSlash
                            className="text-secondary h-5 w-4 cursor-pointer"
                            onClick={() => setShowConfirmPassword(true)}
                          />
                        )
                      }
                      autoComplete="new-password"
                      className="w-full"
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <Alert variant="destructive">
                    <AlertTitle>{errors.confirmPassword.message}</AlertTitle>
                  </Alert>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 text-sm sm:text-base font-medium bg-primary hover:bg-primary/90 transition-colors"
              >
                Verify & Set Password
              </Button>
              <p className="text-right text-xs font-semibold text-gray-400 ml-auto  mt-3">
                Didn't get?{" "}
                <Link href="/forget-password?section=email">
                  <span className="font-bold underline cursor-pointer text-gray-500">Send me a new email</span>
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
