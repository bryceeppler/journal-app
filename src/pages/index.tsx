import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import SlateMarkdownEditor from "~/SlateMarkdownEditor";
import { useState } from "react";
import { api } from "~/utils/api";
import MarkdownShortcutsExample from "~/components/MarkdownShortcutsExample";
import Layout from "~/components/Layout";
import ThemeSelector from "~/components/ThemeSelector";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <main className="flex min-h-screen flex-col items-center justify-center bg-base-100">
          <ThemeSelector />
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              <span className="text-primary">Journal</span> App
            </h1>
            <MarkdownShortcutsExample />
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
