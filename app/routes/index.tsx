import { ActionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";

export async function action({ request }: ActionArgs) {
  let db = new PrismaClient();
  let formData = await request.formData();
  let {date, type, text} = Object.fromEntries(formData);

if (typeof date !== "string" || typeof type !== "string" || typeof date !== "string") {
    throw new Error('bad request')
}

  await db.entry.create({
    data: {
      date: new Date(date),
      type: type,
      text: text,
    },
  });

  return redirect("/");
}
export default function Index() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="text-4xl text-white">Work journal</h1>
      <p className="mt-3 text-xl text-gray-400">
        Doings and learnings. Updated weekly.
      </p>

      <div className="my-2 border p-2">
        <Form method="post">
          <p className="italic">Create an entry</p>
          <div>
            <input type="date" name="date" className="text-gray-500" />
          </div>
          <div className="space-x-4">
            <label>
              <input type="radio" className="mr-1" name="type" value="work" />
              Work
            </label>
            <label>
              <input
                type="radio"
                className="mr-1"
                name="type"
                value="learning"
              />
              Learning
            </label>
            <label>
              <input
                type="radio"
                className="mr-1"
                name="type"
                value="interesting-thing"
              />
              Interesting thing
            </label>
          </div>
          <div>
            <div className="mt-4">
              <textarea
                placeholder="Type your entry..."
                name="text"
                id=""
                className="w-full text-gray-700"
              />
            </div>
            <div className="mt-2 text-right">
              <button
                type="submit"
                className="bg-blue-500 px-4 py-1 font-semibold text-white"
              >
                Save
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
