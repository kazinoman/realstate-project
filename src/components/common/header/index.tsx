"use client";

import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const Header = () => {
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("sale");

  const toggleSearch = () => setSearchVisible(!searchVisible);

  return (
    <header className="bg-white shadow-sm py-4 h-24 flex flex-row items-center justify-center">
      <div className="container px-4 flex flex-row items-center justify-between">
        {/* left side */}
        <div className="flex flex-row items-center justify-center gap-10 ">
          {/* Logo */}
          <a href="#" className=" ml-7 h-3.5 leading-3.5 mt-[-6px]">
            <img src="/images/logo.png" alt="Logo" className="h-full w-auto" />
          </a>

          {/* Navigation */}
          <nav className="hidden lg:flex flex-grow justify-center border-x-2 border-[#eee] px-10">
            <ul className="flex space-x-1">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-xs">HOME</NavigationMenuTrigger>

                    <NavigationMenuContent className="bg-black text-white">
                      <ul className="grid w-[200px] gap-1 ">
                        <li className="p-1.5">
                          <NavigationMenuLink asChild>
                            <Link href="#">Components</Link>
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
                    <NavigationMenuTrigger className="text-xs">LISTING</NavigationMenuTrigger>
                    <NavigationMenuContent>
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
                    <NavigationMenuTrigger className="text-xs">NEWS</NavigationMenuTrigger>
                    <NavigationMenuContent>
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
                    <NavigationMenuTrigger className="text-xs">PAGES</NavigationMenuTrigger>
                    <NavigationMenuContent>
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
            {/* Mobile Nav Button */}
            <div className="lg:hidden flex items-center">
              <div className="space-y-1 cursor-pointer">
                <span className="block w-6 h-0.5 bg-gray-800"></span>
                <span className="block w-6 h-0.5 bg-gray-800"></span>
                <span className="block w-6 h-0.5 bg-gray-800"></span>
              </div>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <div className="relative cursor-pointer" title="Wishlist">
                {/* <FontAwesomeIcon icon={faHeart} className="text-gray-600" /> */}
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span>
              </div>

              {/* Add Property Button */}
              <Button variant={"secondary"} className="py-7 px-8">
                Add your property
              </Button>
              {/* <a href="add-listing.html" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Add Your Property
            </a> */}

              {/* Search Button */}
              <button onClick={toggleSearch} className="text-gray-600 hover:text-blue-600 relative" title="Search">
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                Search
              </button>

              {/* Sign In */}
              <a href="#" className="flex items-center text-gray-800 hover:text-blue-600">
                {/* <FontAwesomeIcon icon={faUser} className="mr-1" /> */}
                Sign In
              </a>
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
    </header>
  );
};

export default Header;
