import React from "react";
import { IoMdClose } from "react-icons/io";

const ModalCloseIcon = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      onClick={onClose}
      className="cursor-pointer absolute -top-2 -right-2 flex flex-row items-center justify-end t-10 backdrop-blur-2xl bg-white/45 hover:bg-white/70 rounded-full p-1.5"
    >
      <IoMdClose className="h-4 w-4 text-black" />
    </div>
  );
};

export default ModalCloseIcon;
