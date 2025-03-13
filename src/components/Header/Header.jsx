import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <h1 className="header-title">Meetpe Admin</h1>
      <div className="user-profile">
        <img src="https://via.placeholder.com/40" alt="User" />
        <span>Admin</span>
      </div>
    </div>
  );
};

export default Header;
