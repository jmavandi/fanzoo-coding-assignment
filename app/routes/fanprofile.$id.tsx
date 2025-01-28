import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { findUser, User } from "users";

export const loader = async ({ params }: { params: { id: string } }) => {
  const user = findUser(params.id);
  if (!user) {
    return redirect("/");
  }

  return new Response(JSON.stringify(user), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const action = async ({
  params,
  request,
}: {
  params: { id: string };
  request: Request;
}) => {
  const formData = await request.formData();
  const actionType = formData.get("action");
  const user = findUser(params.id);
  if (actionType === "logout") {
    return redirect("/");
  }

  if (actionType === "delete") {
    return redirect("/");
  }

  return new Response(JSON.stringify(user), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const FanProfile = () => {
  const user = useLoaderData<User>();

  const handleClientSideLogout = (action: string) => {
    if (action === "logout" || action === "delete") {
      localStorage.removeItem("userLoggedIn");
    }
  };

  return (
    <div className="flex flex-col items-center justify-cente bg-slate-900 mt-3">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">{user.name}</h1>
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold text-gray-200 mt-3 mb-2 ">
            Favorites
          </h3>
          <ul className="list-none">
            <li>Favorite Sport</li>
            <li>Favorite Team</li>
            <li>Favorite Player</li>
          </ul>
        </div>
        <Form
          method="post"
          onSubmit={() => {
            handleClientSideLogout("logout");
          }}
        >
          <button
            type="submit"
            className="bg-red-500 text-white rounded-md p-2 mt-1"
          >
            Logout
          </button>
        </Form>
        <Form
          method="post"
          onSubmit={() => {
            handleClientSideLogout("delete");
          }}
        >
          <button type="submit">Delete Account</button>
        </Form>
      </div>
    </div>
  );
};

export default FanProfile;
