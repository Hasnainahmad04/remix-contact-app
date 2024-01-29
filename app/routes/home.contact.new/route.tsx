import { useActionData } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/node";
import { validateContactRequest } from "~/schema/validations";
import { Contact } from "~/types";
import { addContact } from "~/utils/contacts";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import ContactForm from "~/components/ContactForm";

const Page = () => {
  const res = useActionData<typeof action>();
  const formRef = useRef<HTMLFormElement>();

  useEffect(() => {
    if (!res?.success && res?.message) {
      toast.error(res?.message);
    } else if (res?.success) {
      formRef.current?.reset();
      toast.success("Contact Added");
    }
  }, [res]);

  return (
    <div>
      <h2 className={"text-3xl text-gray-800 font-bold"}>Add New Contact</h2>
      <ContactForm formRef={formRef} type={"Create"} errors={res?.errors} />
    </div>
  );
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const result = validateContactRequest(data as Contact);
  if (Object.keys(result).length) {
    return json(result);
  }
  return addContact(request, data as Contact);
};

export default Page;
