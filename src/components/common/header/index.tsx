"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Modal from "@/components/ui/modal";
import AuthenticationComponent from "@/components/authentication";
import ModalCloseIcon from "@/components/ui/modalCloseIcon";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useUser } from "@/contexts/user.context";
import Container from "../container";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { LuSearch } from "react-icons/lu";
import { IoPerson } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { homeUrl } from "@/constant/appUrl.constant";
import { profileUrl } from "../../../constant/appUrl.constant";

const Header = () => {
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("sale");
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated, user } = useUser();
  const { isMd, isSm } = useBreakpoint();

  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

  const toggleSearch = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isAuthenticated) {
      setOpenLoginModal(false);
    }
  }, [isAuthenticated]);

  return (
    <header className=" bg-white-300  h-24 flex flex-row items-center  border-b shadow-100">
      <Container className="">
        <div className=" flex flex-row items-center justify-between w-full">
          {/* left side */}
          <div className="flex flex-row items-center justify-center gap-10 ">
            {/* Logo */}
            <Link href={homeUrl} className="h-3.5 leading-3.5 mt-[-6px]">
              <img src="/images/logo.png" alt="Logo" className="h-full w-auto" />
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex flex-grow justify-center border-x border-[#eee] ">
              <ul className="flex space-x-1">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-xs font-bold">HOME</NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-black text-white border-none">
                        <ul className="grid w-[200px] gap-1  border-none">
                          <li className="p-1.5">
                            <NavigationMenuLink asChild>
                              <Link href="#">Components </Link>
                            </NavigationMenuLink>
                          </li>
                          <li className="p-1.5">
                            <NavigationMenuLink asChild>
                              <Link href="#">Documentation</Link>
                            </NavigationMenuLink>
                          </li>
                          <li className="p-1.5">
                            <NavigationMenuLink asChild>
                              <Link href="#">Blocks</Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-xs font-bold">LISTING</NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-black text-white">
                        <ul className="grid w-[200px] gap-1 ">
                          <li className="p-1">
                            <NavigationMenuLink asChild>
                              <Link href="#">Components</Link>
                            </NavigationMenuLink>
                          </li>
                          <li className="p-1">
                            <NavigationMenuLink asChild>
                              <Link href="#">Documentation</Link>
                            </NavigationMenuLink>
                          </li>

                          <li className="p-1">
                            <NavigationMenuLink asChild>
                              <Link href="#">Blocks</Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-xs font-bold">NEWS</NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-black text-white">
                        <ul className="grid w-[200px] gap-1 ">
                          <li className="p-1">
                            <NavigationMenuLink asChild>
                              <Link href="#">Components</Link>
                            </NavigationMenuLink>
                          </li>
                          <li className="p-1">
                            <NavigationMenuLink asChild>
                              <Link href="#">Documentation</Link>
                            </NavigationMenuLink>
                          </li>

                          <li className="p-1">
                            <NavigationMenuLink asChild>
                              <Link href="#">Blocks</Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-xs font-bold">PAGES</NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-black text-white">
                        <ul className="grid w-[200px] gap-1 ">
                          <li className="p-1">
                            <NavigationMenuLink asChild>
                              <Link href="#">Components</Link>
                            </NavigationMenuLink>
                          </li>
                          <li className="p-1">
                            <NavigationMenuLink asChild>
                              <Link href="#">Documentation</Link>
                            </NavigationMenuLink>
                          </li>

                          <li className="p-1">
                            <NavigationMenuLink asChild>
                              <Link href="#">Blocks</Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </ul>
            </nav>
          </div>

          {/* right side content */}
          <div className="flex flex-row items-center">
            <div className="flex items-center justify-between">
              {/* Add login button */}
              {/* <div className="w-12 h-12 rounded-xl bg-gray-200 shadow-xl"></div> */}
              {isAuthenticated ? (
                <Link href={profileUrl.profile}>
                  <div className="hidden lg:flex items-center justify-between gap-8 cursor-pointer group">
                    <div className="flex flex-col">
                      <span className="text-xs md:text-[14px] font-semibold">Welcome : user</span>
                      <span className="text-xs text-gray-500">{user?.email}</span>
                    </div>
                    <div className="w-[50px] h-[50px] rounded-full shadow-xl transition-shadow duration-600 ease-in-out overflow-hidden group-hover:drop-shadow-2xl">
                      <Image src="/images/1.jpg" alt="avatar" width={50} height={50} />
                    </div>
                  </div>
                </Link>
              ) : (
                <Button
                  variant={"secondary"}
                  className="bg-white-300 py-1 px-4 rounded-full hidden items-center justify-center md:flex border border-spacing-0.5  border-default shadow-[0_10px_24px_0_rgba(0,0,0,0.07)]"
                  onClick={() => setOpenLoginModal(true)}
                >
                  <IoPerson className="h-4 w-4" />
                  <p>Sign In</p>
                </Button>
              )}

              {/* Right Side Buttons */}
              <div className="flex items-center space-x-5 md:border-l border-[#eee] px-1 md:px-6  ml-0 md:ml-6">
                {/* Wishlist */}
                <div className="relative cursor-pointer" title="Wishlist">
                  {/* <FontAwesomeIcon icon={faHeart} className="text-gray-600" /> */}
                  <FiHeart className="text-primary h-6 w-6" />
                  <span className="absolute top-4 -right-2 bg-red-500 text-white text-xs rounded-sm px-1">44</span>
                </div>

                <Button
                  variant={"secondary"}
                  className="bg-white-300 py-7 px-8 hidden md:flex border border-default shadow-[0_10px_24px_0_rgba(0,0,0,0.07)]"
                >
                  Add your property
                </Button>

                {/* Search Button */}
                <button onClick={toggleSearch} className="text-gray-600 hover:text-blue-600 relative" title="Search">
                  <LuSearch className="text-primary h-6 w-6" />
                </button>

                <button
                  onClick={toggleSearch}
                  className="text-gray-600 hover:text-blue-600 relative block md:hidden"
                  title="Search"
                >
                  <HiMenuAlt3 className="text-primary h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Search Wrap */}
            {searchVisible && (
              <div className="mt-4 bg-gray-100 p-4 rounded-md">
                <div className="flex justify-center mb-4">
                  <div className="inline-flex bg-white rounded-md shadow">
                    <input
                      type="radio"
                      id="sale-button"
                      name="accept-offers"
                      checked={activeTab === "sale"}
                      onChange={() => setActiveTab("sale")}
                      className="hidden"
                    />
                    <label
                      htmlFor="sale-button"
                      className={`px-4 py-2 cursor-pointer ${
                        activeTab === "sale" ? "bg-blue-600 text-white" : "text-gray-800"
                      }`}
                    >
                      Sale
                    </label>
                    <input
                      type="radio"
                      id="rent-button"
                      name="accept-offers"
                      checked={activeTab === "rent"}
                      onChange={() => setActiveTab("rent")}
                      className="hidden"
                    />
                    <label
                      htmlFor="rent-button"
                      className={`px-4 py-2 cursor-pointer ${
                        activeTab === "rent" ? "bg-blue-600 text-white" : "text-gray-800"
                      }`}
                    >
                      Rent
                    </label>
                    <input
                      type="radio"
                      id="comm-button"
                      name="accept-offers"
                      checked={activeTab === "comm"}
                      onChange={() => setActiveTab("comm")}
                      className="hidden"
                    />
                    <label
                      htmlFor="comm-button"
                      className={`px-4 py-2 cursor-pointer ${
                        activeTab === "comm" ? "bg-blue-600 text-white" : "text-gray-800"
                      }`}
                    >
                      Commercial
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Keywords */}
                  <div className="relative">
                    {/* <FontAwesomeIcon icon={faHouse} className="absolute left-3 top-3 text-gray-500" /> */}
                    <input
                      type="text"
                      placeholder="Keywords..."
                      className="w-full pl-10 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {/* Location */}
                  <div className="relative">
                    {/* <FontAwesomeIcon icon={faLocationDot} className="absolute left-3 top-3 text-gray-500" /> */}
                    <input
                      type="text"
                      placeholder="Location..."
                      className="w-full pl-10 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price Range</label>
                    <input type="range" min="100" max="100000" step="1" defaultValue="1" className="w-full" />
                    {/* Note: For double slider, use a library like react-range for min-max */}
                    <div className="text-sm text-gray-500">$100 - $100,000</div> {/* Placeholder for dynamic value */}
                  </div>
                  {/* Search Button */}
                  <button
                    onClick={() => (window.location.href = "listing.html")}
                    className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="top-right"
          backdropBlur={true}
          containerClassName="p-8"
          closeOnBackdropClick={true}
        >
          <div className="bg-white rounded-lg shadow-xl p-6 min-w-[300px]">
            <h2 className="text-xl font-bold mb-4">Custom Modal</h2>
            <p>Your content here</p>

            <p className="max-w-[200px]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio officiis, tempore soluta, voluptatum
              iure nihil consequuntur porro
            </p>
            <button onClick={() => setIsOpen(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Close
            </button>
          </div>
        </Modal>

        {openLoginModal && (
          <Modal
            isOpen={openLoginModal}
            onClose={() => setOpenLoginModal(false)}
            position={isMd || isSm ? "top" : "center"}
            backdropBlur={true}
            containerClassName="p-8"
            closeOnBackdropClick={true}
          >
            <div className="items-center justify-center p-2  bg-white/30 rounded-2xl z-10">
              <ModalCloseIcon onClose={() => setOpenLoginModal(false)} />
              <div className="bg-white rounded-lg shadow-2xl min-w-[300px]">
                <AuthenticationComponent />
              </div>
            </div>
          </Modal>
        )}
      </Container>
    </header>
  );
};

export default Header;
