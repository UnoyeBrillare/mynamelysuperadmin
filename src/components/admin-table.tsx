import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AdminUser } from "@/types/auth-type";

const adminColumns: ColumnDef<AdminUser>[] = [
  {
    accessorKey: "firstName",
    header: "User",
    cell: (row) => (
      <div>
        <span className="font-medium text-gray-900">
          {row.getValue() as string} {row.row.original.lastName as string}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "role",
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
    cell: ({ getValue }) => {
      const id = getValue() as number;
      const [open, setOpen] = useState(false);

      const handleDelete = () => {
        console.log(`Deleting product with ID: ${id}`);
        setOpen(false);
      };

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Trash2 className="w-5 text-red-600 hover:text-red-800" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the product with ID {id}? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
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
  const navigate = useNavigate();
  const handleRowClick = (row: any) => {
    console.log("ROW", row);
    navigate(`/admin-settings/${row.id}`);
  };

  return (
    <DataTable
      data={data}
      columns={adminColumns}
      title="Admin"
      description="Manage admin roles and permissions"
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
