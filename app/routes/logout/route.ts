import { ActionFunction } from "@remix-run/node";
import { logout } from "~/utils/session";

export const action: ActionFunction = ({ request }) => {
  return logout(request);
};
