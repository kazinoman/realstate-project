import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoLogInOutline } from "react-icons/io5";
import { IoIosPersonAdd } from "react-icons/io";

export function CustomTabs() {
  return (
    <div className="">
      <Tabs defaultValue="account" className=" p-0 m-0 w-full">
        <TabsList className=" p-0 m-0 flex flex-row w-full">
          <TabsTrigger
            value="account"
            className="h-full rounded-none  p-5 flex-1 w-[120px] border border-red-500 font-bold text-xs"
          >
            <IoLogInOutline className="text-secondary mr-2 h-4 w-4" /> Login
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="h-full rounded-none  p-5 flex-1 w-[120px] border border-red-500 font-bold text-xs"
          >
            <IoIosPersonAdd className="text-secondary mr-2 h-4 w-4" /> Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account"></TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
    </div>
  );
}
