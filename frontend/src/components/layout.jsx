import ContactForm from "./ContactForm/ContactForm";
import FixedCta from "./FixedCTA";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Cookie from "./Cookie/Cookie";
import Head from "next/head";
import Script from "next/script";

const Layout = ({ children }) => {
  return (
    <div className="relative">
      <Head>
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="4c2f26c9-cd33-4e30-8da7-306b194e2b66"
          data-blockingmode="auto"
        />
      </Head>
      <Header />
      <FixedCta />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
