import { useForm } from "react-hook-form";
import { SectionWrapper } from "./section-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Define types for better type safety
export type UserRole = "USER_ADMIN" | "SUPER_ADMIN" | "MODERATOR";

export type Permission =
  | "OVERALL_DASHBOARD"
  | "USER_MANAGEMENT"
  | "LISTING_MANAGEMENT"
  | "BOOKING_MANAGEMENT"
  | "PAYMENTS_AND_TRANSACTIONS"
  | "SUBSCRIPTION_MANAGEMENT"
  | "ADMIN_MANAGEMENT";

// Updated schema to match the payload structure
const adminSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  role: z.enum(["USER ADMIN", "SUPER ADMIN", "MODERATOR"] as const),
  permissions: z
    .array(z.string())
    .min(1, "Please select at least one permission"),
});

export type AdminFormData = z.infer<typeof adminSchema>;

interface AdminFormProps {
  initialData?: Partial<AdminFormData>;
  onSubmit?: (data: AdminFormData) => void;
  isLoading?: boolean;
  mode?: "create" | "edit";
}

// Permission groups for better organization
const PERMISSION_GROUPS = [
  {
    name: "Users",
    permissions: [
      { id: "OVERALL_DASHBOARD", label: "Dashboard" },
      { id: "USER_MANAGEMENT", label: "Users" },
    ],
  },
  {
    name: "Subscription",
    permissions: [
      { id: "SUBSCRIPTION_MANAGEMENT", label: "Subscriptions" },
      { id: "PAYMENTS_AND_TRANSACTIONS", label: "Payments" },
    ],
  },
  {
    name: "Admin",
    permissions: [
      { id: "LISTING_MANAGEMENT", label: "Manage Listings" },
      { id: "BOOKING_MANAGEMENT", label: "Manage Bookings" },
    ],
  },
] as const;

export default function AdminForm({
  initialData,
  onSubmit,
  isLoading = false,
  mode = "create",
}: AdminFormProps) {
  const form = useForm<AdminFormData>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      role: initialData?.role || "USER ADMIN",
      permissions: initialData?.permissions || [],
    },
  });

  const handleSubmit = (data: AdminFormData) => {
    onSubmit?.(data);
  };

  const watchedPermissions = form.watch("permissions");

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    const currentPermissions = form.getValues("permissions");
    if (checked) {
      form.setValue("permissions", [...currentPermissions, permissionId]);
    } else {
      form.setValue(
        "permissions",
        currentPermissions.filter((p) => p !== permissionId)
      );
    }
  };

  const getPermissionActions = (permissionId: string) => {
    const hasPermission = watchedPermissions.includes(permissionId);
    return {
      view: hasPermission,
      edit: hasPermission,
      delete: hasPermission,
      create: hasPermission,
    };
  };

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col space-y-6"
        >
          <SectionWrapper title="Staff Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-baseline max-w-4xl">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email address"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </SectionWrapper>

          {/* Roles and Permissions */}
          <SectionWrapper title="Roles and Permissions">
            <div className="max-w-4xl space-y-6">
              {/* Role Selection */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USER ADMIN">User Admin</SelectItem>
                        <SelectItem value="SUPER ADMIN">Super Admin</SelectItem>
                        <SelectItem value="MODERATOR">Moderator</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Permissions Table */}
              <FormField
                control={form.control}
                name="permissions"
                render={() => (
                  <FormItem>
                    <FormLabel>Permissions *</FormLabel>
                    <div className="border rounded-lg overflow-hidden">
                      {/* Table Header */}
                      <div className="bg-gray-50 grid grid-cols-5 gap-4 p-4 border-b">
                        <div className="font-medium"></div>
                        <div className="font-medium text-center">View</div>
                        <div className="font-medium  text-center">Edit</div>
                        <div className="font-medium text-center">Delete</div>
                        <div className="font-mediumtext-center">Create</div>
                      </div>

                      {/* Permission Rows */}
                      {PERMISSION_GROUPS.map((group) => (
                        <div key={group.name}>
                          {group.permissions.map((permission) => {
                            const actions = getPermissionActions(permission.id);

                            return (
                              <div
                                key={permission.id}
                                className="grid grid-cols-5 gap-4 p-4 border-b hover:bg-gray-50"
                              >
                                <div className="font-medium">
                                  {permission.label}
                                </div>
                                <div className="flex justify-center">
                                  <Checkbox
                                    checked={actions.view}
                                    onCheckedChange={(checked) =>
                                      handlePermissionChange(
                                        permission.id,
                                        Boolean(checked)
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex justify-center">
                                  <Checkbox
                                    checked={actions.edit}
                                    onCheckedChange={(checked) =>
                                      handlePermissionChange(
                                        permission.id,
                                        Boolean(checked)
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex justify-center">
                                  <Checkbox
                                    checked={actions.delete}
                                    onCheckedChange={(checked) =>
                                      handlePermissionChange(
                                        permission.id,
                                        Boolean(checked)
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex justify-center">
                                  <Checkbox
                                    checked={actions.create}
                                    onCheckedChange={(checked) =>
                                      handlePermissionChange(
                                        permission.id,
                                        Boolean(checked)
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </SectionWrapper>

          {/* Submit Button */}
          <div className="flex justify-end ">
            <Button
              type="submit"
              disabled={isLoading}
              className=" text-white px-6 py-2"
            >
              {isLoading
                ? "Processing..."
                : mode === "create"
                ? "Create Admin"
                : "Update Admin"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
