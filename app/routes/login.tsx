import { useSearchParams, Form, useActionData } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { LoginForm } from "~/components/LoginForm";
import { findUserByEmailPassword } from "~/../users";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = findUserByEmailPassword(email, password);

  if (user) {
    return redirect(formData.get("redirectTo")?.toString() || "/");
  }

  return json({ error: "Invalid credentials" }, { status: 400 });
}

export default function Login() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData<typeof action>();

  const redirectTo = searchParams.get("redirectTo") || "/";

  return (
    <div className="mt-16 flex justify-center">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Sign in
        </h2>
        <LoginForm error={actionData?.error} redirectTo={redirectTo} />
      </div>
    </div>
  );
}
