import "../../faust.config";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import "../styles/global.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Cookie, Montserrat } from "next/font/google";
import { WordPressBlocksProvider } from "@faustwp/blocks";
import blocks from "../components/blocks";
import SearchProvider from "@/context/searchContext";
import moment from "moment";

import { ErrorBoundary } from "react-error-boundary";
import LoadingOverlay from "@/components/Loading";

const montserrat = Montserrat({ subsets: ["cyrillic", "latin"] });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    moment.locale("de");
  }, []);

  // init loader screen
  useEffect(() => {
    const loader = setTimeout(() => {
      setLoading(true);
    }, 1200);
    return () => {
      clearTimeout(loader);
    };
  }, []);

  return (
    <ErrorBoundary fallback={"something went wrong."}>
      <SearchProvider>
        <FaustProvider pageProps={pageProps}>
          <WordPressBlocksProvider
            config={{
              blocks,
            }}
          >
            {!loading && <LoadingOverlay />}
            <main className={montserrat.className}>
              <Component {...pageProps} key={router.asPath} />
            </main>
          </WordPressBlocksProvider>
        </FaustProvider>
      </SearchProvider>
    </ErrorBoundary>
  );
}
