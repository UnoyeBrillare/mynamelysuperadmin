import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import type { AdminUser } from "@/types/auth-type";

const adminColumns: ColumnDef<AdminUser>[] = [
  {
    accessorKey: "firstName",
    header: "User",
    cell: (row) => (
      <div>
        <span className="font-semibold text-gray-900">
          {row.getValue() as string} {row.row.original.lastName as string}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Roles",
    cell: ({ getValue }) => (
      <span className="font-semibold text-gray-900">
        {getValue() as string}
      </span>
    ),
  },
];

interface AdminTableProps {
  data: any;
  isLoading: boolean;
  error: any;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function AdminTable({
  data,
  isLoading,
  error,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}: AdminTableProps) {
  return (
    <DataTable
      data={data}
      columns={adminColumns}
      title="Admin"
      description="Manage admin roles and permissions"
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
