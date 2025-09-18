import { z } from "zod";

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, { message: "Current password must be at least 8 characters" }),
    newPassword: z.string().min(8, { message: "New password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // set error on confirmPassword
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;
