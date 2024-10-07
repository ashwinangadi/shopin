import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string({ required_error: "Confirm password is required" }),
  username: string({ required_error: "Username is required" })
    .min(1, "Username is required")
    .max(50, "Username must be less than 50 characters"),
  picture: string().optional(),
}).refine((data: any) => data.password === data.confirmPassword, {
  path: ["confirmPassword"], // Points to where the error will be displayed
  message: "Passwords must match",
});

export const resetPasswordSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
});

export const newPasswordSchema = object({
  newPassword: string({ required_error: "New password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmNewPassword: string({
    required_error: "Confirm new password is required",
  }),
}).refine((data: any) => data.newPassword === data.confirmNewPassword, {
  path: ["confirmNewPassword"], // Points to where the error will be displayed
  message: "Passwords must match",
});
