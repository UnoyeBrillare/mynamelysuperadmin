import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserTable } from "@/components/user-table";

const tabs = [
  { name: "Free Plan", value: "free-plan" },
  { name: "Premium Plan", value: "premium-plan" },
  { name: "Corporate Plan", value: "corporate-plan" },
  { name: "Enterprise Plan", value: "enterprise-plan" },
];

export default function UsersPage() {
  return (
    <div>
      <Tabs defaultValue="free-plan" className=" ">
        <TabsList className="py-6 px-2">
          {tabs.map((tab, index) => (
            <TabsTrigger
              value={tab.value}
              key={index}
              className="
                px-10 py-4 text-sm font-semibold rounded-md transition-all duration-200
                data-[state=active]:bg-primary 
                data-[state=active]:text-white
                data-[state=active]:shadow-sm
                data-[state=active]:border-b-2 
                hover:bg-gray-50
                text-gray-600
              "
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="free-plan" className="">
          <UserTable />
        </TabsContent>
        <TabsContent value="premium-plan" className="">
          <UserTable />
        </TabsContent>
        <TabsContent value="corporate-plan" className="">
          <UserTable />
        </TabsContent>
        <TabsContent value="enterprise-plan" className="">
          <UserTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
