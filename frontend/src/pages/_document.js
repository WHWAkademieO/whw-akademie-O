import Cookie from "@/components/Cookie/Cookie";
import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script'
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="4c2f26c9-cd33-4e30-8da7-306b194e2b66" data-blockingmode="auto"></Script>
      <body>
        <Main />
        <NextScript />
      </body>
       
    </Html>
  );
}
