import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";

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
    accessorKey: "name",
    header: "Product Name",
    cell: ({ getValue }) => (
      <span className="font-medium text-gray-900">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "plan",
    header: "Subscription Plan",
    cell: ({ getValue }) => <span className="">{getValue() as string}</span>,
  },
  {
    accessorKey: "currency",
    header: "Currency",
    cell: ({ getValue }) => <span className="">{getValue() as string}</span>,
  },

  {
    accessorKey: "amount",
    header: "Price",
    cell: ({ getValue }) => (
      <span className="text-green-600 font-semibold">
        ${(getValue() as number).toFixed(2)}
      </span>
    ),
  },

  {
    accessorKey: "period",
    header: "Sub Period",
    cell: ({ getValue }) => {
      return <span className={"text-gray-700"}>{getValue() as string}</span>;
    },
  },
  {
    accessorKey: "date",
    header: "Subscription Date",
    cell: ({ getValue }) => {
      return <span className={"text-gray-700"}>{getValue() as string}</span>;
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
