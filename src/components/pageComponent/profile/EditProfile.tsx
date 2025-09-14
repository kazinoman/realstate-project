"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoaderOverlay from "@/components/ui/loader";
import { Typography } from "@/components/ui/typography";
import { useUser } from "@/contexts/user.context";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";

const EditProfileForm = () => {
  const { user, loading, updateUserProfile } = useUser();

  // 1. Define form.
  const form = useForm({
    // resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: user?.email || "",
      password: "",
      phone: "",
      facebook: "",
      instagram: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        password: "",
        phone: user.phone || "",
        facebook: "",
        instagram: "",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: any) => {
    const _data = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      // facebook: data.facebook,
      // instagram: data.instagram,
      socialLinks: [],
    };

    await updateUserProfile(_data);

    console.log(_data);
  };
  return (
    <div className="bg-white p-2 sm:p-4 md:p-8 rounded-xl">
      {loading && <LoaderOverlay />}

      <div className="border-b border-default mb-4">
        <Typography variant="h6" className="mb-1 uppercase">
          Personal Info
        </Typography>
      </div>

      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="First Name"
              leftIcon={<CiUser className="text-secondary h-5 w-4" />}
              autoComplete="off"
              className="bg-white-300 autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-black"
            />
          )}
        />

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
              readOnly
            />
          )}
        />

        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Phone"
              leftIcon={<FiPhone className="text-secondary h-5 w-4" />}
              autoComplete="off"
              className="bg-white-300 autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-black "
            />
          )}
        />

        <FormField
          name="facebook"
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Facebook"
              leftIcon={<AiOutlineMail className="text-secondary h-5 w-4" />}
              autoComplete="off"
              className="bg-white-300 autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-black"
            />
          )}
        />

        <FormField
          name="instagram"
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Instagram"
              leftIcon={<AiOutlineMail className="text-secondary h-5 w-4" />}
              autoComplete="off"
              className="bg-white-300 autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-black"
            />
          )}
        />

        <Button className="w-full md:w-[20%] h-12">UPDATE</Button>
      </form>
    </div>
  );
};

export default EditProfileForm;
