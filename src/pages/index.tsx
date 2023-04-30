import { type NextPage } from "next";
import { api } from "~/utils/api";
import Layout from "~/components/Layout";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Tiptap from "~/components/TipTap";
import { useCallback, useState } from "react";
import { type JSONContent } from "@tiptap/react";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";

const Home: NextPage = () => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  const utils = api.useContext();
  const createJournalEntry = api.journalEntry.create.useMutation({
    onSuccess: () => {
      toast("Journal entry saved successfully");
      void utils.journalEntry.getByAuthor.invalidate();
    },
  });
  const { data: journalEntries, isLoading: journalEntriesLoading } =
    api.journalEntry.getByAuthor.useQuery(
      {
        authorId: user?.id as string,
      },
      {
        enabled: userLoaded && isSignedIn,
      }
    );

  const [editorContent, setEditorContent] = useState<JSONContent>({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Hello World!",
          },
        ],
      },
    ],
  });

  const getFirstLine = (content: JSONContent) => {
    console.log(content);
    let firstLine = "";

    if (!content.content) {
      return firstLine;
    }

    for (const node of content.content) {
      if (node.type === "paragraph" || node.type === "heading") {
        if (!node.content) {
          break;
        }
        for (const innerNode of node.content) {
          if (innerNode.type === "text" && innerNode.text) {
            firstLine = innerNode.text;
            break;
          }
        }
        break;
      }
    }

    return firstLine;
  };

  const handleEditorUpdate = useCallback((content: JSONContent) => {
    setEditorContent(content);
  }, []);
  const handleSave = () => {
    try {
      console.log(getFirstLine(editorContent));
      createJournalEntry.mutate({
        body: editorContent,
        title: getFirstLine(editorContent),
        authorId: user?.id as string,
      });
    } catch (error) {
      console.error("Failed to save journal entry", error);
      toast.error("Failed to save journal entry.");
    }
  };

  return (
    <>
      <Layout>
        {/* ... */}
        <main className="mx-auto min-h-screen max-w-4xl flex-col bg-base-100">
          <div className="container grid grid-cols-12 gap-4">
            {/* Sidebar */}
            <div className="col-span-12 flex flex-col gap-1 sm:col-span-4 lg:col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Templates</h2>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn-ghost btn-sm btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      // stroke="#000000"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
                  >
                    <li>
                      <a>New Template</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded bg-base-200 p-4">
                <h3>Gratitude</h3>
              </div>
              <div className="rounded bg-base-200 p-4">
                <h3>Reflection</h3>
              </div>
              <div className="rounded bg-base-200 p-4">
                <h3>Brain Dump</h3>
              </div>

              <div className="p-2" />

              <h2 className="text-xl font-bold">History</h2>
              {journalEntries &&
                journalEntries.slice(0, 3).map((entry) => {
                  return (
                    <div key={entry.id} className="rounded bg-base-200 p-4">
                      <h3>{entry.title}</h3>
                      <h5 className="text-xs">
                        {dayjs(entry.createdAt).format("MMMM DD, YYYY")}
                      </h5>
                    </div>
                  );
                })}
            </div>
            {/* Editor */}
            <div className="col-span-12 sm:col-span-8 lg:col-span-9">
              {/* ... */}
              <div className="flex h-full w-full flex-col overflow-auto">
                <Tiptap onUpdate={handleEditorUpdate} />
                <div className="p-2" />
                <button
                  className={`btn mx-auto ${
                    createJournalEntry.isLoading ? "loading" : ""
                  }`}
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
