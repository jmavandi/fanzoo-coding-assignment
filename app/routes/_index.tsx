import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Fanzoo App" },
    { name: "description", content: "Welcome to Fanzoo!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Welcome to Fanzoo!</h1>
    </div>
  );
}
