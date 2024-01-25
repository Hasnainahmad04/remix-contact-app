import { LoaderFunction, redirect } from "@remix-run/node";
import { authenticate } from "~/utils/session";

export const loader: LoaderFunction = async ({ request }) => {
  await authenticate(request);
  return redirect("/home", { status: 302 });
};
