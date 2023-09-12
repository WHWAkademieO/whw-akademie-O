import ContactForm from "./ContactForm/ContactForm";
import FixedCta from "./FixedCTA";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Cookie from "./Cookie/Cookie";

const Layout = ({ children }) => {
  return (
    <div className="relative">
      <Header />
      <FixedCta />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
