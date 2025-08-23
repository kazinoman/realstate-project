import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CustomTabs() {
  return (
    <div className="">
      <Tabs defaultValue="account" className="bg-black p-0 m-0">
        <TabsList className="bg-black p-0 m-0">
          <TabsTrigger value="account" className="h-full rounded-none data-[state=active]:bg-slate-400">
            Account
          </TabsTrigger>
          <TabsTrigger value="password" className="h-full rounded-none">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account"></TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
    </div>
  );
}
