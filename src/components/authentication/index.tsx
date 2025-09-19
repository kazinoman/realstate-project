import React from "react";
import LeftSideImage from "./leftSideImage";
import { CustomTabs } from "../common/customTabs";
import { IoLogInOutline } from "react-icons/io5";
import { IoIosPersonAdd } from "react-icons/io";

import SignUp from "./signUpForm";
import LoginForm from "./loginForm";

interface IAuthenticationComponentProps {
  handleCloseLoginModal: () => void;
}

const AuthenticationComponent = ({ handleCloseLoginModal }: IAuthenticationComponentProps) => {
  const [tabValue, setTabValue] = React.useState<"login" | "register">("login");

  const handleChangeTab = (value: "login" | "register") => {
    console.log(value);
    setTabValue(value);
  };

  const tabs = [
    {
      value: "login",
      label: "Login",
      icon: IoLogInOutline,
      content: (
        <div className="p-4">
          <LoginForm handleCloseLoginModal={handleCloseLoginModal} />
        </div>
      ),
    },
    {
      value: "register",
      label: "Register",
      icon: IoIosPersonAdd,
      content: (
        <div className="p-4">
          <SignUp handleChangeTab={handleChangeTab} />
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  lg:w-[90dvw] xl:w-[80dvw] 2xl:w-[50dvw] ">
      {/* Left Column (hidden on md & sm) */}
      <div className="relative hidden lg:flex items-center justify-center text-white h-full min-h-[600px]">
        <LeftSideImage />
      </div>

      {/* Right Column (Form) */}
      <div className="flex items-start justify-start lg:border-l lg:border-[#eee] px-0 pt-0 pl-0 w-full overflow-hidden">
        <CustomTabs
          tabs={tabs}
          defaultValue={tabValue}
          value={tabValue}
          onValueChange={(val) => setTabValue(val as "login" | "register")}
          className="w-full max-w-lg"
          tabListStyle="rounded-md md:rounded-none  "
          singleTabStyle="rounded-sm md:rounded-none h-[60px] md:border-b md:border-[#eee] "
        />
      </div>
    </div>
  );
};

export default AuthenticationComponent;
