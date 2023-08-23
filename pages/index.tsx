import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import UploadForm from "../components/UploadForm";

const Home: NextPage = () => {
  return (
    <div className="overflow-x-hidden overscroll-none">
      <Head>
        <title>Nauti</title>
        <meta name="description" content="Create by Jaime Roschupkin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main
        data-theme="cupcake"
        className="flex flex-col bg-base-100 px-4 pb-32 md:px-16"
      >
        <UploadForm />
      </main>
    </div>
  );
};

export default Home;
