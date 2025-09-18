import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { userApi } from "@/services/user-service";

interface Audit {
  _id: string;
  action: string;
  module: string;
  description: string;
  createdAt: string;
}

export function UserActivitiesTable() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: userActivitiesResponse } = useQuery({
    queryKey: ["user-activities", id, currentPage],
    queryFn: () =>
      userApi.getUserActivities({ userId: id!, page: currentPage }),
  });

  const columns: ColumnDef<Audit>[] = [
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ getValue }) => (
        <span className="font-semibold text-gray-900">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "module",
      header: "Module",
      cell: ({ getValue }) => (
        <span className="font-semibold">{getValue() as string}</span>
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
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ getValue }) => (
        <span className="font-semibold">
          {format(new Date(getValue() as string), "dd/MM/yyyy HH:mm")}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      data={userActivitiesResponse?.admin?.audits || []}
      columns={columns}
      title="Activity History"
      description="View user activity history"
      pageSize={pageSize}
      onPageChange={setCurrentPage}
      currentPage={currentPage}
      totalPages={userActivitiesResponse?.admin.totalPages || 1}
      totalCount={userActivitiesResponse?.admin.count || 0}
    />
  );
}
