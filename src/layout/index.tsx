import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type PropsType = {
  children: React.ReactNode;
};

const Layout = ({ children }: PropsType) => (
  <div>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
