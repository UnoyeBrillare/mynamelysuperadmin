import { UserSubscriptionTable } from "@/components/user-subscription-table";
import { UserActivitiesTable } from "@/components/user-activities-table";
import { userApi } from "@/services/user-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Trash2, AlertTriangle, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

interface UserData {
  firstName: string;
  lastName: string;
  preferredName: string;
  email: string;
  nameBackground: string;
  dateJoined: string;
  subscriptionPlan: string;
  latestSubscription: string;
  subscriptionPeriod: string;
  subscriptionStatus: string;
  expiryDate: string;
}

interface FieldProps {
  label: string;
  value: string;
  className?: string;
  wrapperClass?: string;
}

const userData: UserData = {
  firstName: "Ayomide",
  lastName: "Theresa",
  preferredName: "Tessie or Ayo",
  email: "fivweblessing@gmail.com",
  nameBackground:
    'My name is from a tribe in Nigeria (Yoruba), it mean "joy has come" as my furs name',
  dateJoined: "10/08/2025",
  subscriptionPlan: "Premium Plan",
  latestSubscription: "10/08/2025",
  subscriptionPeriod: "2 Years",
  subscriptionStatus: "Active",
  expiryDate: "09/08/2027",
};

// Confirmation Modal Component
interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  userName: string;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  userName,
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Delete Account
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            disabled={isLoading}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">{userName}</span>'s
            account?
          </p>
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            ⚠️ This action cannot be undone. All user data, subscriptions, and
            activities will be permanently removed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete Account
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function UserDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: userDetailsResponse } = useQuery({
    queryKey: ["user-details", id],
    queryFn: () => userApi.getOneUser(id!),
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: () => userApi.deleteUser(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast("User account deleted successfully");
      navigate("/users");
    },
    onError: () => {
      toast("Failed to delete user account. Please try again.");
    },
    onSettled: () => {
      setIsDeleteModalOpen(false);
    },
  });

  const handleDeleteUser = () => {
    deleteUserMutation.mutate();
  };

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const Field = ({
    label,
    value,
    className = "text-gray-900",
    wrapperClass,
  }: FieldProps) => (
    <div className={`flex gap-2 ${wrapperClass || ""}`}>
      <label className="min-w-[200px] font-medium text-gray-600">{label}</label>
      <p className={`font-medium ${className}`}>{value || "N/A"}</p>
    </div>
  );

  const profileFields = [
    { label: "First name", value: userDetailsResponse?.data.firstName },
    { label: "Last name", value: userDetailsResponse?.data.lastName },
    { label: "Preferred Name", value: "N/A" },
    {
      label: "Email address",
      value: userDetailsResponse?.data.email,
      className: "text-blue-600",
    },
    {
      label: "Name background",
      value: "N/A",
      wrapperClass: "w-[650px]",
    },
  ];

  const SectionHeader = ({
    title,
    rightContent,
  }: {
    title: string;
    rightContent: React.ReactNode;
  }) => (
    <div className="mb-8 flex items-center gap-4">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <div className="flex-1 border-b" />
      {rightContent}
    </div>
  );

  const userDisplayName = userDetailsResponse?.data
    ? `${userDetailsResponse.data.firstName} ${userDetailsResponse.data.lastName}`
    : "User";

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          className="flex items-center gap-3 font-bold hover:text-gray-700 transition-colors"
          onClick={() => navigate("/users")}
        >
          <ArrowLeft />
          User details
        </button>
        <button
          className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white hover:bg-red-700 transition-colors flex items-center gap-2"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Trash2 className="h-4 w-4" />
          Delete Account
        </button>
      </div>

      {/* Profile Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <SectionHeader
          title="Profile"
          rightContent={
            <span className="text-sm text-gray-500">
              Date Joined: {userData.dateJoined}
            </span>
          }
        />
        <div className="flex items-start gap-8">
          <div className="flex-shrink-0">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-500 text-4xl font-bold text-white shadow-lg">
              {userDetailsResponse?.data
                ? getInitials(
                    userDetailsResponse.data.firstName,
                    userDetailsResponse.data.lastName
                  )
                : getInitials(userData.firstName, userData.lastName)}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {profileFields.map((field, index) => (
              <Field key={index} {...field} />
            ))}
          </div>
        </div>
      </div>

      <UserSubscriptionTable />
      <UserActivitiesTable />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        isLoading={deleteUserMutation.isPending}
        userName={userDisplayName}
      />
    </div>
  );
}
