import React from "react";
import logo from "../logo.svg";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header
      style={{
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ height: "50px", marginRight: "10px" }}
        />
        <h1>{title}</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button style={{ marginRight: "10px" }}>Button 1</button>
        <button style={{ marginRight: "10px" }}>Button 2</button>
        <button style={{ marginRight: "10px" }}>Button 3</button>
        <button>Button 4</button>
      </div>
    </header>
  );
};

export default Header;
