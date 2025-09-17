import { useState } from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import CustomDateRange from "@/components/shared/CustomDateRange";
import { userApi } from "@/services/user-service";
import { useQuery } from "@tanstack/react-query";
import UserSubscriptionChart from "@/components/user-subscription-chart";

interface StatItem {
  label: string;
  value: number;
  color: string;
}

interface UserStatsResponse {
  data: {
    free: number;
    corporate: number;
    premium: number;
    enterprise: number;
  };
}

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  const {
    data: userStatsResponse,
    isLoading,
    error,
  } = useQuery<UserStatsResponse>({
    queryKey: ["user-stats", dateRange],
    queryFn: () => userApi.getUserStats(dateRange.startDate, dateRange.endDate),
  });

  const { data: subscriptionStatsResponse } = useQuery<UserStatsResponse>({
    queryKey: ["user-stats"],
    queryFn: () =>
      userApi.getSubscriptionStats(dateRange.startDate, dateRange.endDate),
  });

  // Transform API data for userStats
  const userStats: StatItem[] = [
    {
      label: "All Users",
      value:
        (userStatsResponse?.data.free || 0) +
        (userStatsResponse?.data.premium || 0) +
        (userStatsResponse?.data.corporate || 0) +
        (userStatsResponse?.data.enterprise || 0),
      color: "#0A66C2",
    },
    {
      label: "Individual Users",
      value:
        (userStatsResponse?.data.free || 0) +
        (userStatsResponse?.data.premium || 0),
      color: "#4A8CFF",
    },
    {
      label: "Corporate Users",
      value: userStatsResponse?.data.corporate || 0,
      color: "#5055B0",
    },
    {
      label: "Enterprise Users",
      value: userStatsResponse?.data.enterprise || 0,
      color: "#00A4EF",
    },
  ];

  const subscriptionStats = [
    {
      label: "Free Plan",
      value: subscriptionStatsResponse?.data.free || 0,
      color: "#0A66C2",
    },
    {
      label: "Premium Plan",
      value: subscriptionStatsResponse?.data.premium || 0,
      color: "#4A8CFF",
    },
    {
      label: "Corporate Users",
      value: subscriptionStatsResponse?.data.corporate || 0,
      color: "#5055B0",
    },
    {
      label: "Enterprise Plan",
      value: subscriptionStatsResponse?.data.enterprise || 0,
      color: "#00A4EF",
    },
  ];

  return (
    <div className="space-y-4">
      {/* User stats */}
      <SectionWrapper
        title="User Analytics"
        rightElement={
          <CustomDateRange onDateChange={(range) => setDateRange(range)} />
        }
      >
        {isLoading ? (
          <p>Loading user stats...</p>
        ) : error ? (
          <p className="text-red-500">Error loading user stats</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {userStats.map((item, index) => (
              <ItemCard
                label={item.label}
                value={item.value}
                color={item.color}
                key={index}
              />
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* Subscription stats */}
      <SectionWrapper
        title="User Analytics by Subscriptions"
        rightElement={<CustomDateRange />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {subscriptionStats.map((item, index) => (
            <ItemCard
              label={item.label}
              value={item.value}
              color={item.color}
              key={index}
            />
          ))}
        </div>
        <div className="w-[350px] h-[350px]">
          <UserSubscriptionChart data={subscriptionStatsResponse?.data} />
        </div>
      </SectionWrapper>
    </div>
  );
}

function ItemCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div style={{ background: color }} className="p-6 rounded-lg text-white">
      <p className="font-bold mb-5">{label}</p>
      <p className="font-bold text-xl">{value}</p>
    </div>
  );
}
