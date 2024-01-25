import InputField from "~/components/InputField";
import {
  Form,
  FormProps,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import { json, ActionFunction } from "@remix-run/node";
import { validateNewContactRequest } from "~/schema/validations";
import { Contact } from "~/types";
import { addContact } from "~/utils/contacts";
import { MutableRefObject, useEffect, useRef } from "react";
import toast from "react-hot-toast";

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
      <Form
        autoComplete={"off"}
        className={"flex flex-col"}
        method={"POST"}
        ref={formRef}
      >
        <div className={"flex gap-4"}>
          <InputField
            label={"Firstname"}
            type={"text"}
            name={"first"}
            placeholder={"First Name"}
            error={res?.errors?.first}
          />
          <InputField
            label={"Lastname"}
            type={"text"}
            name={"last"}
            placeholder={"Last Name"}
            error={res?.errors?.last}
          />
        </div>

        <div className={"flex gap-4"}>
          <InputField
            label={"Avatar......"}
            type={"text"}
            name={"avatar"}
            placeholder={"Url of Profile Picture"}
            error={res?.errors?.avatar}
          />
          <InputField
            label={"Username"}
            type={"text"}
            name={"twitter"}
            placeholder={"@twitter"}
            error={res?.errors?.twitter}
          />
        </div>
        <div className={"self-end gap-4 flex"}>
          <button
            type={"button"}
            className={
              "bg-white px-4 py-2 text-gray-600 shadow rounded-md border hover:border-gray-600"
            }
          >
            Cancel
          </button>
          <button
            type={"submit"}
            className={
              "bg-white px-4 py-2 text-blue-600 shadow rounded-md border hover:border-blue-600"
            }
          >
            Add
          </button>
        </div>
      </Form>
    </div>
  );
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const result = validateNewContactRequest(data as Contact);
  if (Object.keys(result).length) {
    return json(result);
  }
  return addContact(request, data as Contact);
};

export default Page;
