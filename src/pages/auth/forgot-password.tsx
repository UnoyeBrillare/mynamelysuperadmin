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
import { Eye, EyeOff, Loader2, ArrowLeft, Mail, Lock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/auth-service";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const emailSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

const resetPasswordSchema = z
  .object({
    token: z.string().min(5, "Token must be at least 6 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type EmailFormValues = z.infer<typeof emailSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

type Step = "email" | "reset";

export default function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token: "", password: "", confirmPassword: "" },
  });

  const sendEmailMutation = useMutation({
    mutationFn: async (payload: EmailFormValues) => {
      return await authApi.resendOTP(payload);
    },
    onSuccess: () => {
      toast.success("Email Sent", {
        description: "Please check your email for the reset token.",
      });
      setCurrentStep("reset");
    },
    onError: (error) => {
      toast.error("Failed to Send Email", { description: error.message });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (payload: ResetPasswordFormValues) => {
      const apiPayload = {
        email: email,
        password: payload.password,
        token: payload.token,
      };

      return await authApi.resetPassword(apiPayload);
    },
    onSuccess: () => {
      toast.success("Password Reset", {
        description:
          "Your password has been successfully reset. You can now login.",
      });
      window.location.href = "/login";
    },
    onError: (error) => {
      toast.error("Reset Failed", { description: error.message });
    },
  });

  const onEmailSubmit = (values: EmailFormValues) => {
    setEmail(values.email);
    sendEmailMutation.mutate(values);
  };

  const onResetSubmit = (values: ResetPasswordFormValues) => {
    resetPasswordMutation.mutate(values);
  };

  const goBack = () => {
    setCurrentStep("email");
  };

  const resendToken = () => {
    sendEmailMutation.mutate({ email });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center mb-4">
          {currentStep === "email" && <Mail className="h-8 w-8 text-primary" />}
          {currentStep === "reset" && <Lock className="h-8 w-8 text-primary" />}
        </div>

        <h1 className="text-2xl font-semibold">
          {currentStep === "email" && "Forgot Password"}
          {currentStep === "reset" && "Reset Password"}
        </h1>

        <p className="text-gray-600">
          {currentStep === "email" &&
            "Enter your email address to receive a reset token"}
          {currentStep === "reset" && `We've sent a reset token to ${email}`}
        </p>
      </div>

      {/* Back Button */}
      {currentStep === "reset" && (
        <Button
          variant="ghost"
          onClick={goBack}
          className="p-0 h-auto font-normal text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      )}

      {/* Email Step */}
      {currentStep === "email" && (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(onEmailSubmit)}
            className="space-y-4"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
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

            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary h-12"
              disabled={sendEmailMutation.isPending}
            >
              {sendEmailMutation.isPending && (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              )}
              Send Reset Token
            </Button>
          </form>
        </Form>
      )}

      {/* Reset Password Step */}
      {currentStep === "reset" && (
        <Form {...resetForm}>
          <form
            onSubmit={resetForm.handleSubmit(onResetSubmit)}
            className="space-y-4"
          >
            <FormField
              control={resetForm.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Token</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter reset token from email"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={resetForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        {...field}
                        className="pr-10 h-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
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

            <FormField
              control={resetForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        {...field}
                        className="pr-10 h-11"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? (
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

            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary h-12"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending && (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              )}
              Reset Password
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={resendToken}
                disabled={sendEmailMutation.isPending}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Didn't receive the token? Resend
              </Button>
            </div>
          </form>
        </Form>
      )}

      <div className="text-center">
        <Link
          to={"/login"}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
