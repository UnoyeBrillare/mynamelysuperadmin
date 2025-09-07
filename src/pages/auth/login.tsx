import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/auth-service";
import useAuthStore from "@/store/auth-store";
import { toast } from "sonner";
import { loginSchema } from "@/schemas/auth-schema";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginFormValues) => {
      const loginResponse = await authApi.login(payload);
      useAuthStore.setState({ token: loginResponse.access_token });

      const userResponse = await authApi.getCurrentUser();

      return {
        token: loginResponse.access_token,
        user: userResponse.admin,
      };
    },
    onSuccess(data) {
      toast.success("Login Successful", { description: "Welcome back!" });
      useAuthStore.setState({
        token: data.token,
        user: data.user,
        isAuthenticated: true,
      });
    },
    onError: (error) => {
      toast.error("Login Failed", { description: error.message });
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    console.log(values);
    loginMutation.mutate(values);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        {...field}
                        className="pr-10 h-11"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-6 bg-primary text-white hover:bg-primary h-12"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending && <Loader2 className="animate-spin" />}
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
}
