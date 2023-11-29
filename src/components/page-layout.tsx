import React from "react";
import { NavBar } from "./navbar/nav-bar";
// import { MobileNavBar } from "./navigation/mobile/mobile-nav-bar";
import { PageFooter } from "./page-footer";

interface Props {
  children: JSX.Element;
}

export const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="page-layout"
      style={{
        background:
          "radial-gradient(circle at 50% 100%, #FFF0EF,#FEF0F6,#E5F4FF )",
      }}
    >
      <NavBar />
      <div className="border-b border-gray-300"></div>
      {/* <MobileNavBar /> */}
      <div className="page-layout__content">{children}</div>
      <PageFooter />
    </div>
  );
};
