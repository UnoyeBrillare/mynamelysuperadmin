import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Trash2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  roles: string;
  permissions: string;
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
    accessorKey: "roles",
    header: "Roles",
    cell: ({ getValue }) => <span className="">{getValue() as string}</span>,
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ getValue }) => <span className="">{getValue() as string}</span>,
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ getValue }) => (
      <button
        className="cursor-pointer"
        onClick={() => console.log(getValue())}
      >
        <Trash2 className="w-5 text-red-600 hover:text-red-800" />
      </button>
    ),
  },
];

const productData: Product[] = [
  {
    id: 1,
    name: "Theresa Ayomide",
    roles: "Dashboard, Subscrition, Users",
    permissions: "4",
  },
  {
    id: 1,
    name: "Theresa Ayomide",
    roles: "Dashboard, Subscrition, Users",
    permissions: "3",
  },
  {
    id: 1,
    name: "Theresa Ayomide",
    roles: "Dashboard, Subscrition, Users",
    permissions: "4",
  },
  {
    id: 1,
    name: "Theresa Ayomide",
    roles: "Dashboard, Subscrition, Users",
    permissions: "4",
  },
];

export function AdminTable() {
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
