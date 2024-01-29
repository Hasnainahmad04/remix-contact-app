import { ActionFunctionArgs, json } from "@remix-run/node";
import { Link, useFetcher, useNavigation } from "@remix-run/react";
import toast from "react-hot-toast";
import InputField from "~/components/InputField";
import { validateSignupRequest } from "~/schema/validations";
import { RegisterForm } from "~/types";
import { registerUser } from "~/utils/auth";
import { useEffect } from "react";

const SignUp = () => {
  const fetcher = useFetcher();
  const response = fetcher.data;
  useEffect(() => {
    if (!response?.success && response?.message) {
      toast.error(response?.message);
    }
  }, [response]);

  return (
    <section className="h-screen w-full justify-center items-center flex ">
      <div className="shadow-lg px-10 py-6 rounded-md w-[400px]">
        <h1 className="text-3xl text-gray-800 text-center">Welcome</h1>
        <p className="text-md text-gray-500 text-center my-4">
          Create an account to continue. &#128578;
        </p>
        <fetcher.Form
          autoComplete="off"
          className="flex flex-col"
          method="post"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <InputField
                label="First Name"
                name="firstName"
                type="text"
                placeholder="First Name"
                error={response?.errors?.firstName}
              />
            </div>
            <div>
              <InputField
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Last Name"
                error={response?.errors?.lastName}
              />
            </div>
          </div>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            error={response?.errors?.email}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            error={response?.errors?.password}
          />

          <button
            type="submit"
            className="bg-green-700 my-2 px-5 py-2.5 text-white rounded-lg hover:bg-green-800 transition duration-300 ease-in-out"
          >
            {fetcher.state == "submitting" ? "submitting...." : "Submit"}
          </button>
        </fetcher.Form>

        <p className="text-center my-3">
          Already have an Acccount
          <Link to={"/login"} className="ml-3 text-green-700 underline">
            Login{" "}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  const result = validateSignupRequest(data as RegisterForm);

  if (result.errors) return json({ success: false, errors: result.errors });
  return registerUser(data as RegisterForm);
};
