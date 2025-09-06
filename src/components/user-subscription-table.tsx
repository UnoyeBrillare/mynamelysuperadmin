import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { useNavigate } from "react-router-dom";

// 1. User Table Example
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  dateSubscribed: string;
  expiryDate: string;
  period: string;
};

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => {
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;
      return (
        <span className="font-medium text-gray-900">{`${firstName} ${lastName}`}</span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => <span className="">{getValue() as string}</span>,
  },
  {
    accessorKey: "dateSubscribed",
    header: "Date Subscribed",
    cell: ({ getValue }) => <span className="">{getValue() as string}</span>,
  },
  {
    accessorKey: "period",
    header: "Period of Sub",
    cell: ({ getValue }) => <span className="">{getValue() as string}</span>,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case "active":
            return "bg-green-100 text-green-800";
          case "inactive":
          case "cancelled":
            return "bg-red-100 text-red-800";
          case "pending":
          case "expired":
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
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ getValue }) => <span className="">{getValue() as string}</span>,
  },
];

const userData: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    status: "Active",
    dateSubscribed: "12/08/2025",
    period: "3 Months",
    expiryDate: "12/11/2025",
  },
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    status: "Active",
    dateSubscribed: "12/08/2025",
    period: "3 Months",
    expiryDate: "12/11/2025",
  },
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    status: "Expired",
    dateSubscribed: "12/08/2025",
    period: "3 Months",
    expiryDate: "12/11/2025",
  },
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    status: "Active",
    dateSubscribed: "12/08/2025",
    period: "3 Months",
    expiryDate: "12/11/2025",
  },
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    status: "Cancelled",
    dateSubscribed: "12/08/2025",
    period: "3 Months",
    expiryDate: "12/11/2025",
  },
];

export function UserSubscriptionTable() {
  const navigate = useNavigate();
  const handleRowClick = (data: any) => {
    navigate(`/users/${data.id}`);
  };

  return (
    <DataTable
      data={userData}
      columns={userColumns}
      title="Subscription History"
      description="View user subscription history"
      pageSize={5}
      onRowClick={handleRowClick}
    />
  );
}
