import { LoginForm, RegisterForm } from "~/types";
import { prisma } from "./prisma";
import { json } from "@remix-run/node";
import { createUser } from "./user";
import bcrypt from "bcryptjs";
import { createUserSession } from "./session";

export const registerUser = async (user: RegisterForm) => {
  const exists = await prisma.user.findFirst({ where: { email: user.email } });
  if (exists) {
    return json(
      {
        success: false,
        message: "User already exists with this email ",
      },
      { status: 400 }
    );
  }
  const newUser = await createUser(user);
  if (!newUser)
    return json(
      {
        success: false,
        message: "Something went Wrong!",
      },
      { status: 400 }
    );
  // if Successfully user is created, create user session and redierct to main page
  return createUserSession(newUser.id, "/");
};

export const login = async (credentials: LoginForm) => {
  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });

  if (!user) {
    return json(
      {
        success: false,
        message: "User doesn't exist",
      },
      { status: 400 }
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    credentials.password,
    user?.password
  );

  if (!isPasswordMatched) {
    return json(
      {
        success: false,
        message: "Invalid Credentials",
      },
      { status: 400 }
    );
  }

  return createUserSession(user.id, "/");
};
