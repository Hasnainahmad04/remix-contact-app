import { Contact } from "~/types";
import React from "react";
import { NavLink } from "@remix-run/react";
import animation from "~/assets/no_data_animation.json";
import { Player } from "@lottiefiles/react-lottie-player";

interface Props {
  contacts: Contact[];
}
const ContactList: React.FC<Props> = ({ contacts }) => {
  if (!contacts.length)
    return (
      <div className={"items-center justify-center flex h-screen flex-col"}>
        <Player src={animation} autoplay loop speed={0.8} />
        <p className={"text-center text-gray-500 text-lg"}>
          You Don't Have any Contacts
        </p>
      </div>
    );
  return (
    <ul className={"mt-6 "}>
      {contacts.map((item) => {
        return (
          <li key={`${item.first} ${item.last}`}>
            <NavLink
              to={`/home/contact/${item.id}`}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-blue-600 text-white transition"
                    : "hover:bg-gray-300"
                } my-1 flex text-gray-800  text-center px-5 py-2 rounded-md duration-100 ease-in w-full capitalize items-center`
              }
            >
              {`${item.first} ${item.last}`}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
