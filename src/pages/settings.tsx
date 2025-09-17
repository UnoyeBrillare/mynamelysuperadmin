import { AdminTable } from "@/components/admin-table";
import { adminApi } from "@/services/admin-service";
import type { AdminUser } from "@/types/auth-type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function SettingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    data: adminResponse,
    isLoading,
    error,
  } = useQuery<{
    data: { admins: AdminUser[]; totalPages: number | null; count: number };
  }>({
    queryKey: ["admins", currentPage],
    queryFn: () => adminApi.getAdmins({ page: currentPage, limit: pageSize }),
  });

  return (
    <div>
      <AdminTable
        isLoading={isLoading}
        data={adminResponse?.data?.admins || []}
        error={error}
        currentPage={currentPage}
        totalPages={adminResponse?.data?.totalPages || 1}
        totalCount={adminResponse?.data?.count || 0}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
