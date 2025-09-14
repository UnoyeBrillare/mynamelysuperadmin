import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

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

interface UserTableProps {
  data: User[];
  isLoading: boolean;
  error: any;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return (
        <span className="font-medium text-gray-900">{`${firstName} ${lastName}`}</span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => (
      <span className="text-gray-600">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ getValue }) => (
      <span className="text-gray-600">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Subscribed",
    cell: ({ getValue }) => (
      <span className="text-gray-600">
        {format(new Date(getValue() as string), "MM/dd/yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "subscriptionExpiration",
    header: "Expiry Date",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <span className="text-gray-600">
          {value ? format(new Date(value), "MM/dd/yyyy") : "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case "joined":
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
];

export function UserTable({
  data,
  isLoading,
  error,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}: UserTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (data: User) => {
    navigate(`/users/${data._id}`);
  };

  return (
    <DataTable
      data={data}
      columns={userColumns}
      title="Users"
      description="Manage your application users"
      pageSize={pageSize}
      onRowClick={handleRowClick}
      showPagination={true}
      currentPage={currentPage}
      totalPages={totalPages}
      totalCount={totalCount}
      onPageChange={onPageChange}
      isLoading={isLoading}
      error={error}
    />
  );
}
