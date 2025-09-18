import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/services/user-service";
import { useState } from "react";

type User = {
  id: string;
  plan: string;
  description: string;
  amountTotal: number;
  currency: string;
  paymentStatus: string;
  dateSubscribed: string;
  expiryDate: string;
};

const calculateExpiryDate = (createdAt: string) => {
  const date = new Date(createdAt);
  date.setFullYear(date.getFullYear() + 1);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ getValue }) => (
      <span className="font-semibold text-gray-900">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => (
      <span className="font-semibold">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "amountTotal",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amountTotal;
      const currency = row.original.currency.toUpperCase();
      return (
        <span className="font-semibold">{`${currency} ${amount.toFixed(
          2
        )}`}</span>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case "paid":
            return "bg-green-100 text-green-800";
          case "failed":
          case "cancelled":
            return "bg-red-100 text-red-800";
          case "pending":
            return "bg-yellow-100 text-yellow-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };
      return (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "dateSubscribed",
    header: "Date Subscribed",
    cell: ({ getValue }) => (
      <span className="font-semibold">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ getValue }) => (
      <span className="font-semibold">{getValue() as string}</span>
    ),
  },
];

export function UserSubscriptionTable() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: userSubscriptionResponse } = useQuery({
    queryKey: ["user-subscriptions", id],
    queryFn: () => userApi.getUserSubscriptions(id!),
  });

  // Map API response to table data
  const tableData =
    userSubscriptionResponse?.data?.map((sub: any) => ({
      id: sub._id,
      plan: sub.plan,
      description: sub.description,
      amountTotal: sub.amountTotal,
      currency: sub.currency,
      paymentStatus: sub.paymentStatus,
      dateSubscribed: new Date(sub.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      expiryDate: calculateExpiryDate(sub.createdAt),
    })) || [];

  return (
    <div>
      <DataTable
        data={tableData}
        columns={userColumns}
        title="Subscription History"
        description="View user subscription history"
        pageSize={pageSize}
        currentPage={currentPage}
        totalPages={userSubscriptionResponse?.data.totalPages || 1}
        totalCount={userSubscriptionResponse?.data.count || 0}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
