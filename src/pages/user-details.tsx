import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  const navigate = useNavigate();
  // This data could come from props, API, or state management
  const userData = {
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

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="">
      {/* Action Buttons */}
      <div className="flex justify-between space-x-4 mb-6">
        <button
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/users")}
        >
          <ArrowLeft />
          <p className="font-bold">User details</p>
        </button>
        <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors duration-150">
          Delete Account
        </button>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
        <div className="flex justify-between items-center mb-8 gap-4">
          <h1 className="text-lg font-bold text-gray-900">Profile</h1>
          <div className="border-b flex-1"></div>
          <div className="text-sm text-gray-500">
            <span className="font-medium">Date Joined:</span>{" "}
            {userData.dateJoined}
          </div>
        </div>

        <div className="flex items-start space-x-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {getInitials(userData.firstName, userData.lastName)}
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1 flex gap-3 flex-col">
            <div className="flex gap-2">
              <label className="font-medium text-gray-600 mb-1 block w-[200px]">
                First name:
              </label>
              <p className="text-gray-900 font-medium">{userData.firstName}</p>
            </div>

            <div className="flex gap-2">
              <label className="font-medium text-gray-600 mb-1 block w-[200px]">
                Last name:
              </label>
              <p className="text-gray-900 font-medium">{userData.lastName}</p>
            </div>

            <div className="flex gap-2">
              <label className="font-medium text-gray-600 mb-1 block w-[200px]">
                Preferred Name:
              </label>
              <p className="text-gray-900 font-medium">
                {userData.preferredName}
              </p>
            </div>

            <div className="flex gap-2">
              <label className="font-medium text-gray-600 mb-1 block w-[200px]">
                Email address:
              </label>
              <p className="text-blue-600 font-medium">{userData.email}</p>
            </div>

            <div className="flex gap-2">
              <label className="font-medium text-gray-600 mb-1 block w-[200px]">
                Name background:
              </label>
              <p className="text-gray-900 leading-relaxed w-[350px]">
                {userData.nameBackground}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Details Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex justify-between items-center mb-8 gap-4">
          <h2 className="text-lg font-bold text-gray-900">
            Subscription Details
          </h2>
          <div className="border-b flex-1"></div>
          <div className="bg-white text-blue-800 px-4 py-2 rounded-lg font-semibold">
            {userData.subscriptionPlan}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Latest Subscription:
            </label>
            <p className="text-gray-900 font-medium">
              {userData.latestSubscription}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Subscription Period:
            </label>
            <p className="text-gray-900 font-medium">
              {userData.subscriptionPeriod}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Subscription Status:
            </label>
            <div className="flex items-center">
              <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                {userData.subscriptionStatus}
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Expiry Date:
            </label>
            <p className="text-gray-900 font-medium">{userData.expiryDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
