"use client";

import { useUser } from "@/contexts/user.context";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { profileUrl } from "@/constant/appUrl.constant";
import Link from "next/link";

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

  const NavButton = ({ name, path }: { name: string; path: string }) => (
    <Link href={path}>
      <Button
        key={path}
        variant="outline"
        className={cn(
          "w-full justify-start text-sm transition-colors",
          pathname === path ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" : "hover:bg-gray-100"
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        {name}
      </Button>
    </Link>
  );

  return (
    <div className="font-poppins p-4 h-full">
      <h3 className="text-lg font-semibold mb-4">Profile Menu</h3>
      {isAuthenticated ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm mb-2">Welcome, {user?.name}</p>

          {/* Mobile dropdown */}
          <div className="md:hidden relative" ref={menuRef}>
            <Button
              variant="outline"
              className="w-full justify-between bg-gray-100 hover:bg-gray-200"
              onClick={() => setOpen((prev) => !prev)}
            >
              {navItems.find((item) => item.path === pathname)?.name || "Menu"}
              <span className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
            </Button>

            <div
              className={cn(
                "rounded-lg shadow-lg bg-white overflow-hidden transition-all duration-700 ease-in-out",
                open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="flex flex-col gap-1 p-2">
                {navItems.map((item) => (
                  <NavButton key={item.path} {...item} />
                ))}
                <Button
                  variant="destructive"
                  className="w-full mt-4"
                  onClick={() => logout("Logged out successfully!")}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop sidebar */}
          <div className="hidden md:flex flex-col gap-2">
            {navItems.map((item) => (
              <NavButton key={item.path} {...item} />
            ))}
            <Button variant="destructive" className="w-full mt-4" onClick={() => logout("Logged out successfully!")}>
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm">Please log in</p>
      )}
    </div>
  );
}
