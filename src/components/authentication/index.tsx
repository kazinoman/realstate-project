import React from "react";
import LeftSideImage from "./leftSideImage";
import { CustomTabs } from "../common/customTabs";

const AuthenticationComponent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-[60dvw]">
      {/* Left Column (hidden on md & sm) */}
      <div className="relative hidden lg:flex items-center justify-center text-white h-full min-h-[600px]">
        <LeftSideImage />
      </div>

      {/* Right Column (Form) */}
      <div className="flex items-start justify-start p-4 border-l border-[#eee]">
        <CustomTabs />
      </div>
    </div>
  );
};

export default AuthenticationComponent;
