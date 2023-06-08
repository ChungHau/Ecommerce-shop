import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="bg-dark min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
