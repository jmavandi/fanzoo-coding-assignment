import { Form } from "@remix-run/react";

interface LoginFormProps {
  error?: string;
  redirectTo?: string;
}

export function LoginForm({ error, redirectTo }: LoginFormProps) {
  return (
    <Form method="post" className="mt-8 space-y-6">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-gray-100 bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-gray-100 bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
      </div>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </div>
    </Form>
  );
}
