import React from "react";
import Layout from "../components/layout";
import Link from "next/link";
export default function NotFound() {
  return (
    <Layout title="404: Page not found">
      <main className="grid min-h-[80vh] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-3xl md:text-5xl font-bold  text-dark_blue">404</p>
          <h1 className="mt-4 uppercase text-xl md:text-[32px] font-bold tracking-tight text-dark_blue">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="  bg-black  px-3.5 py-2.5 text-sm font-semibold text-white transition duration-300 shadow-sm border border-black hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
