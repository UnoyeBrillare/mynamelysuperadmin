import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { format } from "date-fns";

interface Audit {
  _id: string;
  action: string;
  module: string;
  description: string;
  createdAt: string;
}

interface UserActivitiesTableProps {
  audits: Audit[];
  pageSize?: number;
  onRowClick?: (data: Audit) => void;
}

export function UserActivitiesTable({
  audits,
  pageSize = 5,
  onRowClick,
}: UserActivitiesTableProps) {
  const columns: ColumnDef<Audit>[] = [
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "module",
      header: "Module",
      cell: ({ getValue }) => <span>{getValue() as string}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ getValue }) => <span>{getValue() as string}</span>,
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ getValue }) => (
        <span>
          {format(new Date(getValue() as string), "dd/MM/yyyy HH:mm")}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      data={audits}
      columns={columns}
      title="Activity History"
      description="View user activity history"
      pageSize={pageSize}
      onRowClick={onRowClick}
    />
  );
}
