import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserTable } from "@/components/user-table";
import { userApi } from "@/services/user-service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Define the User type based on actual API data
type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  plan: string;
  role: string;
  status: string;
  isActive: boolean;
  isVerified: boolean;
  isSubscriptionCancelled: boolean;
  createdAt: string;
  updatedAt: string;
  subscriptionExpiration?: string;
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
};

// Define tab configuration
const tabs = [
  { name: "Free Plan", value: "Free", key: "free" },
  { name: "Premium Plan", value: "Premium", key: "premium" },
  { name: "Corporate Plan", value: "Corporate", key: "corporate" },
  { name: "Enterprise Plan", value: "Enterprise", key: "enterprise" },
];

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("free");
  const pageSize = 10;

  // Fetch users with pagination and plan filter
  const { data, isLoading, error } = useQuery<{
    data: { users: User[]; totalPages: number | null; count: number };
  }>({
    queryKey: ["users", currentPage, activeTab],
    queryFn: () =>
      userApi.getUsers({
        page: currentPage,
        limit: pageSize,
        plan: tabs.find((tab) => tab.key === activeTab)?.value,
      }),
  });

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage users across different subscription plans
        </p>
      </div>

      <Tabs
        defaultValue="free"
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          setCurrentPage(1); // Reset to first page when changing tabs
        }}
        className="w-full"
      >
        <TabsList className="py-6 px-2">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
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

        {tabs.map((tab) => (
          <TabsContent key={tab.key} value={tab.key} className="mt-6">
            <UserTable
              data={data?.data.users || []}
              isLoading={isLoading}
              error={error}
              currentPage={currentPage}
              totalPages={data?.data.totalPages || 1}
              totalCount={data?.data.count || 0}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
