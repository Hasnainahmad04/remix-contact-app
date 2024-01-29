import {
  ActionFunctionArgs,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Link, useFetcher } from "@remix-run/react";
import toast from "react-hot-toast";
import InputField from "~/components/InputField";
import { validateLoginRequest } from "~/schema/validations";
import { LoginForm } from "~/types";
import { login } from "~/utils/auth";
import { getUser } from "~/utils/session";
import { useEffect } from "react";

const Login = () => {
  const fetcher = useFetcher();
  const { errors, message } = fetcher.data || {};

  useEffect(() => {
    if (message) toast.error(message);
  }, [fetcher.data]);

  return (
    <section className="h-screen w-full justify-center items-center flex ">
      <div className="shadow-lg px-10 py-6 rounded-md w-[400px]">
        <h1 className="text-3xl text-gray-800 text-center">Welcome Again</h1>
        <p className="text-md text-gray-500 text-center my-4">
          Login to continue. &#128578;
        </p>
        <fetcher.Form
          autoComplete="off"
          className="flex flex-col"
          method="post"
        >
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            error={errors?.email}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            error={errors?.password}
          />

          <button
            type="submit"
            className="bg-green-700 my-2 px-5 py-2.5 text-white rounded-lg hover:bg-green-800 transition duration-300 ease-in-out"
          >
            {fetcher.state == "submitting" ? "submitting...." : "Submit"}
          </button>
        </fetcher.Form>
        <p className="text-center my-3">
          Dont have an account
          <Link to={"/signup"} className="ml-3 text-green-700 underline">
            Create{" "}
          </Link>
        </p>
      </div>
    </section>
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const result = validateLoginRequest(data as LoginForm);
  if (result?.errors) {
    return json({ success: false, errors: result?.errors });
  }
  return login(data as LoginForm);
};

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/") : null;
};

export default Login;
