import { UserSubscriptionTable } from "@/components/user-subscription-table";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export default function UserDetails() {
  const navigate = useNavigate();

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
      <p className={`font-medium ${className}`}>{value}</p>
    </div>
  );

  const profileFields = [
    { label: "First name", value: userData.firstName },
    { label: "Last name", value: userData.lastName },
    { label: "Preferred Name", value: userData.preferredName },
    {
      label: "Email address",
      value: userData.email,
      className: "text-blue-600",
    },
    {
      label: "Name background",
      value: userData.nameBackground,
      wrapperClass: "w-[650px]",
    },
  ];

  const subscriptionFields = [
    { label: "Latest Subscription", value: userData.latestSubscription },
    { label: "Subscription Period", value: userData.subscriptionPeriod },
    {
      label: "Subscription Status",
      value: userData.subscriptionStatus,
      className:
        "inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800",
    },
    { label: "Expiry Date", value: userData.expiryDate },
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

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          className="flex items-center gap-3 font-bold hover:text-gray-700"
          onClick={() => navigate("/users")}
        >
          <ArrowLeft />
          User details
        </button>
        <button className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white hover:bg-red-700 transition-colors">
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
              {getInitials(userData.firstName, userData.lastName)}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {profileFields.map((field, index) => (
              <Field key={index} {...field} />
            ))}
          </div>
        </div>
      </div>

      {/* Subscription Details Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <SectionHeader
          title="Subscription Details"
          rightContent={
            <span className="rounded-lg bg-white px-4 py-2 font-semibold text-blue-800">
              {userData.subscriptionPlan}
            </span>
          }
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {subscriptionFields.map((field, index) => (
            <Field key={index} {...field} />
          ))}
        </div>
      </div>

      {/* Subscription History Table */}
      <UserSubscriptionTable />
    </div>
  );
}
