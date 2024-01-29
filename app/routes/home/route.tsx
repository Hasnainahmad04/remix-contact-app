import { Form, Outlet, useNavigate, useNavigation } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { getUserContacts } from "~/utils/contacts";
import { useLoaderData } from "react-router";
import ContactList from "~/components/ContactList";

const Main = () => {
  const { contacts } = useLoaderData<typeof loader>();

  const navigation = useNavigation();

  const navigate = useNavigate();
  return (
    <main className={"w-full flex"}>
      <aside
        className={
          "px-4 bg-gray-200 h-screen w-1/4 py-5 overflow-auto scroll-smooth"
        }
      >
        <div className={"flex flex-row gap-3"}>
          <input
            className={
              "sticky top-0 bg-slate-100 focus:outline-none p-2 rounded-md border border-gray-400 w-full placeholder:font-light "
            }
            placeholder={"Search.... "}
          />
          <button
            type={"submit"}
            className={"bg-blue-600 text-white px-4 py-2 rounded-md"}
            onClick={() => navigate("/home/contact/new")}
          >
            New
          </button>
        </div>

        <ContactList contacts={contacts} />
        <div className={"bottom-0 py-5 flex fixed"}>
          <Form action={"/logout"} method={"POST"}>
            <button
              type={"submit"}
              className={"bg-white shadow text-red-500 px-4 py-2 rounded-md "}
            >
              Logout
            </button>
          </Form>
        </div>
      </aside>
      <section
        className={`p-10 transition delay-200 duration-200 ${
          navigation.state == "loading" ? "opacity-50" : null
        }`}
      >
        <Outlet />
      </section>
    </main>
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  return getUserContacts(request);
};

export default Main;
