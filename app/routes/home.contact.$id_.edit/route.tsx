import ContactForm from "~/components/ContactForm";
import { json, LoaderFunction } from "@remix-run/node";
import { getContactDetail, updateContact } from "~/utils/contacts";
import { ActionFunction, useLoaderData } from "react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useActionData, useNavigate } from "@remix-run/react";
import { Contact } from "~/types";
import { validateContactRequest } from "~/schema/validations";

const UpdateContact = () => {
  const res = useLoaderData<typeof loader>();
  useEffect(() => {
    if (!res.success) {
      toast.error("Something went wrong");
    }
  }, [res]);
  const navigate = useNavigate();

  const actionRes = useActionData<typeof action>();

  useEffect(() => {
    if (actionRes && actionRes?.success) {
      toast.success("Contact updated");
      navigate(`/home/contact/${res?.contact?.id}`);
    }
    if (actionRes && !actionRes?.success) {
      toast.error(actionRes?.message);
    }
  }, [actionRes]);

  return (
    <div>
      <ContactForm
        type={"Update"}
        errors={actionRes?.errors}
        defaultValues={res.contact}
      />
    </div>
  );
};

export const loader: LoaderFunction = ({ params }) => {
  if (!params.id) return;
  return getContactDetail(params.id);
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!params.id) return;
  const formValues = await request.formData();
  const contact = Object.fromEntries(formValues);
  const result = validateContactRequest(contact as Contact);
  if (Object.keys(result).length) {
    return json(result);
  }
  return updateContact({ id: params.id, ...contact } as Contact);
};

export default UpdateContact;
