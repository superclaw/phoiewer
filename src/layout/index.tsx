import React from "react";
import Header from "./Header";

type PropsType = {
  children: React.ReactNode;
};

const Layout = ({ children }: PropsType) => (
  <div>
    <Header />
    <main className="main">
      {children}
    </main>
  </div>
);

export default Layout;
