import React from "react";
import { NavBarBrand } from "./nav-bar-brand";
import { NavBarButtons } from "./nav-bar-buttons";

export const NavBar: React.FC = () => {
  return (
    <div className="h-20 flex justify-center items-center">
      <nav className="mx-5 sm:mx-16 md:mx-32 lg:mx-40 xl:mx-64 flex justify-between items-center w-full">
        <NavBarBrand />
        <div className="">
          <NavBarButtons />
        </div>
      </nav>
    </div>
  );
};
