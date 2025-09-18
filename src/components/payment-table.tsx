import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { formatCurrency, formatDate } from "@/utils/string";

type Product = {
  id: number;
  name: string;
  amount: number;
  period: string;
  currency: string;
  date: string;
  plan: string;
};

const paymentColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => (
      <span className="font-semibold text-gray-900">
        {(getValue() as string) || "--"}
      </span>
    ),
  },
  {
    accessorKey: "plan",
    header: "Subscription Plan",
    cell: ({ getValue }) => (
      <span className="font-semibold">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "currency",
    header: "Currency",
    cell: ({ getValue }) => (
      <span className="uppercase font-semibold">{getValue() as string}</span>
    ),
  },

  {
    accessorKey: "amountTotal",
    header: "Price",
    cell: ({ getValue }) => (
      <span className="text-gray-899 font-semibold">
        {formatCurrency(getValue() as number)}
      </span>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case "paid":
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
          className={`inline-flex px-2 py-1 text-xs font-bold rounded-full capitalize ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Subscription Date",
    cell: ({ getValue }) => {
      return (
        <span className={"text-gray-900 font-semibold"}>
          {formatDate(getValue() as string)}
        </span>
      );
    },
  },
];

interface PaymentTableProps {
  data: any;
  isLoading: boolean;
  error: any;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function PaymentTable({
  data,
  isLoading,
  error,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}: PaymentTableProps) {
  return (
    <DataTable
      data={data}
      columns={paymentColumns}
      title="Payments"
      description="User payments and payouts"
      pageSize={pageSize}
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
