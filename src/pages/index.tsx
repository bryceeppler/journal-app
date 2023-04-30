import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";
import Layout from "~/components/Layout";
import ThemeSelector from "~/components/ThemeSelector";
import Tiptap from "~/components/TipTap";
import dayjs from "dayjs";


const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <main className="flex min-h-screen flex-col items-center justify-center bg-base-100 max-w-4xl mx-auto">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <div>
              <h1 className="text-4xl font-bold w-full">
                {dayjs().format("dddd, MMMM D, YYYY")}
              </h1>
              <div className="p-2" />
            <Tiptap />
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
