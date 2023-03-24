import { ActionArgs, redirect } from "@remix-run/node";
import { Form, useFetcher } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import { useEffect, useRef } from "react";

export async function action({ request }: ActionArgs) {
  let db = new PrismaClient();
  let formData = await request.formData();
  let { date, type, text } = Object.fromEntries(formData);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (
    typeof date !== "string" ||
    typeof type !== "string" ||
    typeof date !== "string"
  ) {
    throw new Error("bad request");
  }

  return db.entry.create({
    data: {
      date: new Date(date),
      type: type,
      text: text,
    },
  });
}
export default function Index() {
  let fetcher = useFetcher();

  let textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (fetcher.state === "idle" && textAreaRef.current) {
      // clear + focus text
      textAreaRef.current.value = "";
      textAreaRef.current.focus();
    }
  }, [fetcher.state]);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="text-4xl text-white">Work journal</h1>
      <p className="mt-3 text-xl text-gray-400">
        Doings and learnings. Updated weekly.
      </p>

      <div className="my-2 border p-2">
        <fetcher.Form method="post">
          <fieldset
            className="disabled:opacity-80"
            disabled={fetcher.state === "submitting"}
          >
            <p className="italic">Create an entry</p>
            <div>
              <input
                type="date"
                required
                name="date"
                className="text-gray-900"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
              />
            </div>
            <div className="space-x-4">
              <label>
                <input
                  defaultChecked
                  type="radio"
                  required
                  className="mr-1"
                  name="type"
                  value="work"
                />
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
                  ref={textAreaRef}
                  required
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
                  {fetcher.state === "submitting" ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </fieldset>
        </fetcher.Form>
      </div>
    </div>
  );
}
