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
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/auth-service";
import useAuthStore from "@/store/auth-store";

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

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
    <div className="bg-neutral-200 w-full h-screen p-6 flex gap-10">
      <div className="bg-neutral-400 h-full w-[50%] rounded-2xl overflow-hidden">
        <img
          src="/pattern-1.svg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center items-center h-full flex-1 border">
        <div className="bg-white shadow-gray-700 rounded-xl w-[550px] max-w-full border border-neutral-300 p-10">
          <div className="mb-10">
            <h2 className="text-3xl font-bold">Sign In</h2>
          </div>
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
                >
                  Sign in
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
