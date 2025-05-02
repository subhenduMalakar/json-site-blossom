import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from "react";
import { GetServerSideProps } from 'next';
import notFoundPageData from "@/data/pages/NotFound.json";

interface NotFoundProps {
  notFoundPageData: any; // Replace 'any' with the actual type of your data
}

const NotFound = ({ notFoundPageData }: NotFoundProps) => {
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      window.location.pathname // Use window.location for client-side path
    );
  }, []); // Empty dependency array as location is not a dependency in Next.js

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>{notFoundPageData.title}</title>
        <meta name="description" content={notFoundPageData.message} />
      </Head>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{notFoundPageData.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{notFoundPageData.message}</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          {notFoundPageData.returnLinkText}
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const fs = require('fs');
  const path = require('path');

  const filePath = path.join(process.cwd(), 'src/data/pages/NotFound.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const notFoundPageData = JSON.parse(fileContent);

  return {
    props: {
      notFoundPageData,
    },
  };
};

export default NotFound;