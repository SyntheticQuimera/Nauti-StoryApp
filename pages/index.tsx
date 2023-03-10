import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import UploadForm from "../components/UploadForm";

const Home: NextPage = () => {
  return (
    <div className='overflow-x-hidden overscroll-none'>
      <Head>
        <title>Nauti</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='flex flex-col bg-[#06283d] px-4 pb-32 md:px-16'>
        <UploadForm />
      </main>
      <footer className='flex flex-1 items-center justify-center border bg-white py-8'>
        <span>
          <img src='/nautiLogo.svg' alt='Nauti Logo' className='w-28' />
        </span>
      </footer>
    </div>
  );
};

export default Home;
