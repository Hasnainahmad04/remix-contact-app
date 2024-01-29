import { ActionFunction } from "react-router";
import { deleteContact } from "~/utils/contacts";
import { redirect } from "@remix-run/node";
import toast from "react-hot-toast";

export const action: ActionFunction = async ({ params }) => {
  if (!params.id) return;
  await deleteContact(params.id);
  toast.success("Contact Deleted ");
  return redirect("/home");
};
