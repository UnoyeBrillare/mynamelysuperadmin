import { useMutation } from "@tanstack/react-query";
import AdminForm from "@/components/admin-form";
import { adminApi } from "@/services/admin-service";
import { toast } from "sonner";

export default function AddAdminPage() {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => adminApi.addAdmin(data),
    onSuccess: () => {
      toast.success("Admin added successfully!");
    },
    onError: (err: Error) => {
      toast.error(`Failed to add admin: ${err.message || "An error occurred"}`);
    },
  });

  const handleSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <div className="p-6">
      <AdminForm mode="create" onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  );
}
