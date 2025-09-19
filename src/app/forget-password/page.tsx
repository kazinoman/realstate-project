import React from "react";
import NewPasswordForm from "./_components/NewPasswordForm";

import EnterEmailAddress from "./_components/EnterEmailAddress";
import { OTPVerification } from "./_components/VerificationCodeComponent";

const ForgetPasswordComponent = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // Await the searchParams to get the resolved query parameters
  const params = await searchParams;

  // Convert searchParams to URLSearchParams
  const urlSearchParams = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => acc.append(key, val));
      } else if (value) {
        acc.append(key, value);
      }
      return acc;
    }, new URLSearchParams())
  );

  // Get the 'section' parameter to determine which component to render
  const section = urlSearchParams.get("section");

  // Render the appropriate component based on the 'section' parameter
  let ComponentToRender;
  switch (section) {
    case "email":
      ComponentToRender = EnterEmailAddress;
      break;
    case "code":
      ComponentToRender = OTPVerification;
      break;
    case "new-password":
      ComponentToRender = NewPasswordForm;
      break;
    default:
      ComponentToRender = () => (
        <div className="bg-white rounded-lg shadow-2xl p-6">
          <p className="text-text-secondary">
            Please select a section using the URL parameter `section` (e.g., ?section=email).
          </p>
        </div>
      );
  }

  return (
    <div className="container mx-auto p-4 h-[calc(100dvh-164px)] flex items-center justify-center">
      <ComponentToRender />
    </div>
  );
};

export default ForgetPasswordComponent;
