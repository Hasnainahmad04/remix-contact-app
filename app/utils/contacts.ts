import { getUserId } from "~/utils/session";
import { prisma } from "~/utils/prisma";
import { json, redirect } from "@remix-run/node";
import { Contact } from "~/types";

const handleUnExpectedError = () => {
  return json(
    { message: "Something went wrong", success: false },
    { status: 500 }
  );
};
const getUserContacts = async (request: Request) => {
  try {
    const userId = await getUserId(request);
    if (!userId) return redirect("/");
    //@ts-ignore
    const contacts = await prisma.contact.findMany({
      where: {
        userId: userId,
      },
      orderBy: { createdAt: "desc" },
    });

    return json({ contacts }, { status: 200 });
  } catch (e) {
    handleUnExpectedError();
  }
};

const getContactDetail = async (id: string) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id,
      },
    });
    if (!contact)
      return json({ message: "Bad request", success: false }, { status: 400 });
    return json({ contact, success: true }, { status: 200 });
  } catch (e) {
    handleUnExpectedError();
  }
};

const addContact = async (request: Request, data: Contact) => {
  try {
    const userId = await getUserId(request);
    if (!userId) return redirect("/");
    const newContact = await prisma.contact.create({
      data: {
        userId,
        ...data,
      },
    });
    if (!newContact)
      return json(
        { success: false, message: "Something went Wrong!" },
        { status: 400 }
      );

    return json({ success: true }, { status: 201 });
  } catch (e) {
    handleUnExpectedError();
  }
};

const deleteContact = async (id: string) => {
  try {
    await prisma.contact.delete({ where: { id } });

    return json({ success: true }, { status: 204 });
  } catch (e) {
    handleUnExpectedError();
  }
};

export { getUserContacts, getContactDetail, addContact, deleteContact };
