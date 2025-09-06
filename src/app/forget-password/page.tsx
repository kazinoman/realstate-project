import React from "react";
import NewPasswordForm from "./_components/NewPasswordForm";
import VerificationCodeComponent from "./_components/VerificationCodeComponent";
import EnterEmailAddress from "./_components/EnterEmailAddress";

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
      ComponentToRender = VerificationCodeComponent;
      break;
    case "new-password":
      ComponentToRender = NewPasswordForm;
      break;
    default:
      ComponentToRender = () => (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Forgot Password</h2>
          <p className="text-text-secondary">
            Please select a section using the URL parameter `section` (e.g., ?section=email).
          </p>
        </div>
      );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Forgot Password</h1>
      <ComponentToRender />
    </div>
  );
};

export default ForgetPasswordComponent;
