import { PaymentTable } from "@/components/payment-table";
import { paymentApi } from "@/services/payment-service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function PaymentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    data: adminResponse,
    isLoading,
    error,
  } = useQuery<{
    data: { admins: any[]; totalPages: number | null; count: number };
  }>({
    queryKey: ["admins", currentPage],
    queryFn: () =>
      paymentApi.getPayments({ page: currentPage, limit: pageSize }),
  });

  return (
    <div>
      <PaymentTable
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
