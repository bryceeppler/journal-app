// components/Layout.tsx
import Navbar from "~/components/Navbar";
import { type ReactNode } from "react";
import Head from "next/head";
type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Project Manager</title>
        <meta
          name="description"
          content="Project Manager created by Bryce Eppler"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
