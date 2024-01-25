import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { RegisterForm } from "~/types";

export const createUser = async (user: RegisterForm) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const { firstName, lastName } = user;
  const newUser = await prisma.user.create({
    data: {
      profile: { firstName, lastName },
      password: hashedPassword,
      email: user.email,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...profile } = newUser;

  return profile;
};
