import { Contact, LoginForm, RegisterForm } from "~/types";
import { loginSchema, NewContactSchema, signupSchema } from "./schame";
import { ZodError } from "zod";

export const formatErrors = (error: ZodError) => {
  const errors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    const key = issue.path.join(".");
    errors[key as string] = issue.message;
  });

  return errors;
};

export const validateSignupRequest = (data: RegisterForm) => {
  const result = signupSchema.safeParse(data);
  return result.success ? {} : { errors: formatErrors(result.error) };
};

export const validateLoginRequest = (data: LoginForm) => {
  const result = loginSchema.safeParse(data);
  return result.success ? {} : { errors: formatErrors(result.error) };
};

export const validateContactRequest = (data: Contact) => {
  const result = NewContactSchema.safeParse(data);
  return result.success
    ? {}
    : {
        errors: formatErrors(result.error),
        success: false,
        message: "Please Enter Valid Data",
      };
};
