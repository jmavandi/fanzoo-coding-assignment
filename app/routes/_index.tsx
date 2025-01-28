import type { MetaFunction } from "@remix-run/node";
import { useActionData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { addUser, findUserByEmailPassword, User } from "users";
import FanExperiences from "~/components/FanExperiences";

export const meta: MetaFunction = () => {
  return [
    { title: "Fanzoo" },
    { name: "description", content: "Welcome to Fanzoo!" },
  ];
};

type ActionData = {
  error?: string;
  user?: User;
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return Response.json(
      { error: "Invalid email or password" },
      { status: 400 }
    );
  }

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
  };

  const existingUser = findUserByEmailPassword(email, password);

  const user = existingUser || newUser;

  if (!existingUser) {
    addUser(user);
  }

  return Response.json({ user: newUser }, { status: 200 });
};

export default function Index() {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userLoggedIn");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      location.pathname = `/fanprofile/${user.id}`;
    }
    if (actionData?.user) {
      if (actionData?.user) {
        localStorage.setItem("userLoggedIn", JSON.stringify(actionData.user));
        navigate(`/fanprofile/${actionData.user.id}`);
      }
    }
  }, [actionData, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FanExperiences />
    </div>
  );
}
