import { json, LoaderFunction } from "@remix-run/node";
import { getContactDetail } from "~/utils/contacts";
import { useLoaderData } from "react-router";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Form, useNavigate } from "@remix-run/react";

const ContactDetail = () => {
  const res = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!res.success) {
      toast.error(res.message);
    }
  }, [res]);

  return (
    <div className={"flex gap-4"}>
      <img
        src={res.contact.avatar}
        alt={"Avatar"}
        className={
          "w-[200px] h-[200px] rounded-lg border bg-gray-400 object-cover"
        }
      />
      <div className={"gap-4 flex flex-col justify-between"}>
        <div>
          <h2 className={"text-5xl text-bold"}>
            {res.contact.first} {res.contact.last}
          </h2>
          {res.contact?.twitter && (
            <p className={"text-blue-600 mt-3"}>{res.contact?.twitter}</p>
          )}
        </div>
        <div className={"flex flex-row"}>
          <button
            className={"edit_btn"}
            onClick={() => navigate(`/home/contact/${res.contact.id}/edit`)}
          >
            Edit
          </button>
          <Form
            action={`/home/contact/${res.contact.id}/delete`}
            method={"POST"}
          >
            <button className={"delete_btn ml-3"}>Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) {
    return json(
      { message: "Please Provide Contact Id", success: false },
      { status: 400 }
    );
  }
  return getContactDetail(params.id);
};

export default ContactDetail;
