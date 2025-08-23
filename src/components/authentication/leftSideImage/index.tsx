import React from "react";

const LeftSideImage = () => {
  return (
    <div className="absolute h-full w-full p-4">
      {/* Background Gradient */}
      <div className="relative h-full w-full bg-[linear-gradient(rgba(249,219,146,1)_0%,rgba(238,120,56,1)_50%,rgba(249,219,146,1)_100%)] rounded-[20px] overflow-hidden">
        {/* White Circle (behind text) */}
        <div
          className="h-32 w-32 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
  bg-[rgba(255,255,255,0.05)] shadow-[0_0_0_56px_rgba(255,255,255,0.2)] z-0"
        ></div>

        {/* Overlay Content (above circle) */}
        <div className="flex flex-col justify-center h-full z-10 relative text-center">
          <h1 className="text-[26px] font-medium text-black">Welcome to Rentstate</h1>
          <p className="text-sm font-medium uppercase">Premium Real Estate Agency</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSideImage;
