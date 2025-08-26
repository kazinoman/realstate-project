"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { IoPerson } from "react-icons/io5";
import Modal from "@/components/ui/modal";
import AuthenticationComponent from "@/components/authentication";
import { IoMdClose } from "react-icons/io";
import ModalCloseIcon from "@/components/ui/modalCloseIcon";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const Header = () => {
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("sale");
  const [isOpen, setIsOpen] = useState(false);

  const { isMd, isSm } = useBreakpoint();
  console.log({ isMd, isSm });

  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

  const toggleSearch = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white  py-4 h-24 flex flex-row items-center justify-center border-b shadow-100">
      <div className="container  flex flex-row items-center justify-between">
        {/* left side */}
        <div className="flex flex-row items-center justify-center gap-10 ">
          {/* Logo */}
          <a href="#" className=" ml-7 h-3.5 leading-3.5 mt-[-6px]">
            <img src="/images/logo.png" alt="Logo" className="h-full w-auto" />
          </a>

          {/* Navigation */}
          <nav className="hidden lg:flex flex-grow justify-center border-x border-[#eee] px-10">
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
            <Button
              variant={"secondary"}
              className="py-1 px-4 rounded-full mr-4"
              onClick={() => setOpenLoginModal(true)}
            >
              <IoPerson className="h-4 w-4" />
              Sign In
            </Button>
            {/* Right Side Buttons */}
            <div className="flex items-center space-x-5 border-l border-[#eee] px-6">
              {/* Wishlist */}
              <div className="relative cursor-pointer" title="Wishlist">
                {/* <FontAwesomeIcon icon={faHeart} className="text-gray-600" /> */}
                <FaHeart className="text-primary h-6 w-6" />
                <span className="absolute top-4 -right-2 bg-red-500 text-white text-xs rounded-sm px-1">44</span>
              </div>

              {/* Add Property Button */}
              <Button variant={"secondary"} className="py-7 px-8">
                Add your property
              </Button>

              {/* Search Button */}
              <button onClick={toggleSearch} className="text-gray-600 hover:text-blue-600 relative" title="Search">
                <LuSearch className="text-primary h-6 w-6" />
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
    </header>
  );
};

export default Header;
