import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./prisma";

const { commitSession, destroySession, getSession } =
  createCookieSessionStorage({
    cookie: {
      name: "__user__session",
      secrets: [process.env.SESSION_SECRET || "se3ret"],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    },
  });

const createUserSession = async (userId: string, redirectPath: string) => {
  const session = await getSession();
  session.set("userId", userId);

  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

const getUserSession = (request: Request) =>
  getSession(request.headers.get("Cookie"));

const logout = async (request: Request) => {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export const getUserId = async (request: Request) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
};

const getUser = async (request: Request) => {
  const userId = await getUserId(request);
  if (!userId) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, profile: true },
    });
    return user;
  } catch {
    throw logout(request);
  }
};

const authenticate = async (request: Request) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    throw redirect(`/login`);
  }
  return userId;
};

export { createUserSession, logout, getUser, authenticate };
