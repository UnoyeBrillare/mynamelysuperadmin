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

const productColumns: ColumnDef<Product>[] = [
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

const productData: Product[] = [
  {
    id: 1,
    name: "Theresa Ayomide",
    amount: 12.99,
    currency: "USD",
    period: "3 Months",
    date: "10/08/2025",
    plan: "Premium",
  },
  {
    id: 2,
    name: "Theresa Ayomide",
    amount: 119,
    currency: "USD",
    period: "3 Months",
    date: "10/08/2025",
    plan: "Corporate",
  },
  {
    id: 3,
    name: "Theresa Ayomide",
    amount: 32,
    currency: "USD",
    period: "1 Months",
    date: "10/08/2025",
    plan: "Premium",
  },
  {
    id: 4,
    name: "Theresa Ayomide",
    amount: 45,
    currency: "USD",
    period: "3 Months",
    date: "10/08/2025",
    plan: "Corporate",
  },
  {
    id: 5,
    name: "Theresa Ayomide",
    amount: 319,
    currency: "USD",
    period: "1 Year",
    date: "10/08/2025",
    plan: "Enterprise",
  },
];

export function PaymentTable() {
  return (
    <DataTable
      data={productData}
      columns={productColumns}
      title="Payments"
      description="User payments and payouts"
      pageSize={10}
      showPagination={true}
    />
  );
}
