import UserSubscriptionChart from "@/components/user-subscription-chart";
import type { ReactNode } from "react";

const items1 = [
  { label: "All Users", value: 540, color: "#0A66C2" },
  { label: "Individual Users", value: 540, color: "#4A8CFF" },
  { label: "Corporate Users", value: 540, color: "#5055B0" },
  { label: "Enterprise Users", value: 540, color: "#00A4EF" },
];

const items2 = [
  { label: "Free Plan", value: 540, color: "#0A66C2" },
  { label: "Premium Plan", value: 540, color: "#4A8CFF" },
  { label: "Corporate Users", value: 540, color: "#5055B0" },
  { label: "Enterprise Plan", value: 540, color: "#00A4EF" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <SectionWrapper title="User Analytics">
        <div className="grid grid-cols-4 gap-3">
          {items1.map((item, index) => (
            <ItemCard
              label={item.label}
              value={item.value}
              color={item.color}
              key={index}
            />
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper title="User Analytics by Subscriptions">
        <div className="grid grid-cols-4 gap-3">
          {items2.map((item, index) => (
            <ItemCard
              label={item.label}
              value={item.value}
              color={item.color}
              key={index}
            />
          ))}
        </div>
        <div className="w-[350px] h-[350px]">
          <UserSubscriptionChart />
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

function SectionWrapper({
  children,
  title,
}: {
  children: ReactNode | ReactNode[];
  title?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex mb-4 items-center gap-3">
        <p className="font-bold text-md">{title}</p>
        <div className="border-b flex-1" />
      </div>
      {children}
    </div>
  );
}
