import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconType } from "react-icons";
import { ComponentType } from "react";

interface TabConfig {
  value: string;
  label: string;
  icon: IconType;
  content: any;
}

interface CustomTabsProps {
  tabs: TabConfig[];
  defaultValue?: string;
  className?: string;
  tabsStyle?: string;
  tabListStyle?: string;
  singleTabStyle?: string;
  contentStyle?: string;
  value: string; // ✅ add value prop
  onValueChange: (value: string) => void; // ✅ add onValueChange prop
}

export function CustomTabs({
  tabs,
  defaultValue,
  className = "w-full max-w-md",
  tabsStyle,
  tabListStyle,
  singleTabStyle,
  contentStyle,
  value,
  onValueChange,
}: CustomTabsProps) {
  return (
    <div className={className}>
      <Tabs
        defaultValue={defaultValue || tabs[0]?.value}
        value={value}
        onValueChange={onValueChange}
        className={`w-full p-0 m-0 ${tabsStyle}`}
      >
        <TabsList
          className={`grid w-full border border-gray-200 h-full p-0 m-0 ${tabListStyle}`}
          style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`p-3 flex items-center justify-center gap-2 font-semibold text-sm data-[state=active]:text-yellow-500 ${singleTabStyle}`}
            >
              <tab.icon className={`h-4 w-4`} /> <span className="text-black text-[10px]">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
