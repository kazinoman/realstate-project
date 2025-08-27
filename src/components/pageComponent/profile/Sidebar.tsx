"use client";

import { useUser } from "@/contexts/user.context";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { profileUrl } from "@/constant/appUrl.constant";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";
import { BiSolidDownArrow } from "react-icons/bi";
import Image from "next/image";

export default function ProfileSidebar() {
  const { user, logout, isAuthenticated } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { name: "Dashboard", path: profileUrl.profile },
    { name: "Your Advertisements", path: profileUrl.advertisements },
    { name: "Your Requests", path: profileUrl.requests },
    { name: "Add New Property", path: profileUrl.addProperty },
    { name: "My Listings", path: profileUrl.listings },
    { name: "Edit Profile", path: profileUrl.edit },
  ];

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const NavButton = ({ name, path }: { name: string; path: string }) => (
  //   <Link
  //     href={path}
  //     // className={`w-full flex items-center justify-between border  border-default p-1 rounded-2xl`}
  //     className={cn(
  //       "w-full flex items-center justify-between border  border-default p-1 rounded-[10px] transition-colors",
  //       pathname === path ? "hover:bg-gray-100 text-white bg-gray-100" : "hover:bg-gray-100 group-hover:bg-gray-100"
  //     )}
  //   >
  //     <div
  //       key={path}
  //       className={cn("w-full flex text-[11px] font-semibold transition-colors pl-4")}
  //       onClick={() => setOpen((prev) => !prev)}
  //     >
  //       {name}
  //     </div>
  //     <div
  //       className={cn(
  //         "p-4 border border-default rounded-[10px] h-[52px] w-[52px] flex items-center justify-center",
  //         pathname === path ? "bg-white-50" : "bg-gray-100 group-hover:bg-white-5"
  //       )}
  //     >
  //       <BiSolidDownArrow className="h-2 w-2 text-[10px] text-secondary -rotate-90" />{" "}
  //     </div>
  //   </Link>
  // );

  const NavButton = ({ name, path }: { name: string; path: string }) => (
    <Link
      href={path}
      className={cn(
        "w-full flex items-center justify-between border border-default p-1 rounded-[10px] transition-colors group",
        pathname === path ? "bg-gray-100 text-white" : "hover:bg-gray-100"
      )}
      onClick={() => setOpen((prev) => !prev)} // Moved onClick to Link to ensure clicking anywhere toggles the menu
    >
      <div
        className={cn(
          "w-full flex text-[10px] font-semibold transition-colors pl-4",
          pathname === path ? "text-white" : "text-black group-hover:text-gray-800" // Optional: Adjust text color on hover
        )}
      >
        {name}
      </div>
      <div
        className={cn(
          "p-4 border border-default rounded-[10px] h-[52px] w-[52px] flex items-center justify-center",
          pathname === path ? "bg-white-50" : "bg-gray-100 group-hover:bg-white-50" // Added group-hover
        )}
      >
        <BiSolidDownArrow className="h-2 w-2 text-[10px] text-secondary -rotate-90" />
      </div>
    </Link>
  );

  return (
    <div className="font-poppins p-[10px] h-full bg-white-50 rounded-2xl border border-default">
      <div className="flex flex-col gap-2">
        <div className=" bg-white-50 p-[10px] md:p-0 rounded-2xl border border-default md:border-none">
          <div className="flex items-center justify-between gap-4 bg-[#f2e9e0] p-2 rounded-xl">
            {/* User Info */}
            <div className="flex items-center justify-between gap-4">
              {/* <div className="w-12 h-12 rounded-xl bg-gray-200 shadow-xl"></div> */}
              <Image
                src="/images/1.jpg"
                alt="avatar"
                width={50}
                height={50}
                className="w-[50px] h-[50px] rounded-xl shadow-xl"
              />
              <div className="flex flex-col">
                <span className="text-xs md:text-[14px] font-semibold">Welcome : user</span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>
            </div>
            <div>
              {open ? (
                <IoClose className="text-2xl text-secondary block md:hidden" onClick={() => setOpen((prev) => !prev)} />
              ) : (
                <IoMenu className="text-xl text-secondary block md:hidden" onClick={() => setOpen((prev) => !prev)} />
              )}
              <LiaUserEditSolid className="text-2xl mr-2 text-secondary hidden md:block" />
            </div>
          </div>

          {/* Mobile dropdown */}
          <div className="md:hidden relative">
            <div
              className={cn(
                "rounded-lg  bg-white overflow-hidden transition-all duration-700 ease-in-out",
                open ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="flex flex-col gap-2 pt-2">
                {navItems.map((item) => (
                  <NavButton key={item.path} {...item} />
                ))}
                <Button
                  variant="destructive"
                  className="w-full mt-2"
                  onClick={() => logout("Logged out successfully!")}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {/* <div className="md:hidden relative">
          <div
            className={cn(
              "rounded-lg  bg-white overflow-hidden transition-all duration-700 ease-in-out",
              open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="flex flex-col gap-1 p-2">
              {navItems.map((item) => (
                <NavButton key={item.path} {...item} />
              ))}
              <Button variant="destructive" className="w-full mt-4" onClick={() => logout("Logged out successfully!")}>
                Logout
              </Button>
            </div>
          </div>
        </div> */}

        {/* Desktop sidebar */}
        <div className="hidden md:flex flex-col gap-2">
          {navItems.map((item) => (
            <NavButton key={item.path} {...item} />
          ))}
          <Button
            variant="default"
            className="w-full rounded-[10px] py-6"
            onClick={() => logout("Logged out successfully!")}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
