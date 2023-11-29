import React from "react";
import { NavLink } from "react-router-dom";
export const NavBarBrand: React.FC = () => {
  return (
    <div className="">
      <NavLink to="/">
        <img
          src="/logowithtxt.png"
          className="h-12 w-auto  object-contain mr-auto"
        />
      </NavLink>
    </div>
  );
};
