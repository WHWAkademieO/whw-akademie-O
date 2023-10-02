import "../../faust.config";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import "@faustwp/core/dist/css/toolbar.css";
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
import fallbackRender from "@/components/FallbackRender";
const monserrat = Montserrat({ subsets: ["cyrillic", "latin"] });

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    moment.locale("de");
  }, []);

  return (
    <SearchProvider>
      <ErrorBoundary fallback={"some thing went wrong!"}>
        <FaustProvider pageProps={pageProps}>
          <WordPressBlocksProvider
            config={{
              blocks,
            }}
          >
            <main className={monserrat.className}>
              <Component {...pageProps} key={router.asPath} />
            </main>
          </WordPressBlocksProvider>
        </FaustProvider>
      </ErrorBoundary>
    </SearchProvider>
  );
}
