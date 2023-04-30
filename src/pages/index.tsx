import { type NextPage } from "next";
import { api } from "~/utils/api";
import Layout from "~/components/Layout";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Tiptap from "~/components/TipTap";

const Home: NextPage = () => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  const createJournalEntry = api.journalEntry.create.useMutation();
  const { data: journalEntries, isLoading: journalEntriesLoading } =
    api.journalEntry.getByAuthor.useQuery(
      {
        authorId: user?.id as string,
      },
      {
        enabled: userLoaded && isSignedIn,
      }
    );

  return (
    <>
      <Layout>
        {/* ... */}
        <main className="mx-auto min-h-screen max-w-4xl flex-col bg-base-100">
          <div className="container grid grid-cols-12 gap-4">
            {/* Sidebar */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-3">
              <h2 className="text-xl font-bold">Sidebar</h2>
              <button className="btn">Save Content</button>
            </div>
            {/* Editor */}
            <div className="col-span-12 sm:col-span-8 lg:col-span-9">
              {/* ... */}
              <div className="h-full w-full overflow-auto">
                <Tiptap />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
