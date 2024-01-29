import { Form, useNavigation } from "@remix-run/react";
import InputField from "~/components/InputField";
import React from "react";

type formFields = {
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
};
interface Props {
  formRef?: any;
  errors?: formFields;
  defaultValues?: formFields;
  type: "Create" | "Update";
}
const ContactForm: React.FC<Props> = ({
  formRef,
  errors,
  type,
  defaultValues,
}) => {
  const buttonLabel = {
    Create: "Add",
    Update: "Update",
  };
  const navigation = useNavigation();

  const isSubmitting = navigation.state == "submitting";

  return (
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
          error={errors?.first}
          defaultValue={defaultValues?.first}
        />
        <InputField
          label={"Lastname"}
          type={"text"}
          name={"last"}
          placeholder={"Last Name"}
          error={errors?.last}
          defaultValue={defaultValues?.last}
        />
      </div>

      <div className={"flex gap-4"}>
        <InputField
          label={"Avatar......"}
          type={"text"}
          name={"avatar"}
          placeholder={"Url of Profile Picture"}
          error={errors?.avatar}
          defaultValue={defaultValues?.avatar}
        />
        <InputField
          label={"Username"}
          type={"text"}
          name={"twitter"}
          placeholder={"@twitter"}
          error={errors?.twitter}
          defaultValue={defaultValues?.twitter}
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : buttonLabel[type]}
        </button>
      </div>
    </Form>
  );
};

export default ContactForm;
