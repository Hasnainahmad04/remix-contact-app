import * as z from "zod";

export const signupSchema = z.object({
  firstName: z.string().trim().min(3, "Minimum 3 characters"),
  lastName: z.string().trim().min(3, "Minimum 3 characters"),
  email: z.string().trim().email("Enter a valid email"),
  password: z
    .string()
    .trim()
    .min(5, "Password should contain at least 5 charcters"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z
    .string()
    .trim()
    .min(5, "Password should contain at least 5 charcters"),
});

export const NewContactSchema = z.object({
  first: z.string().trim().min(3, "Minimum 3 Characters"),
  last: z.string().trim().min(3, "Minimum 3 Characters"),
  avatar: z.string().trim().url("Invalid Url"),
  twitter: z.string().trim().min(1, "username is required"),
});
