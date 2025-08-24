"use client";

import React, { ReactNode } from "react";
import { UserProvider } from "@/contexts/user.context";

interface ContextWrapperProps {
  children: ReactNode;
}

export const ContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};
