import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Wild Code School</p>
      </div>
    </footer>
  );
};

export default Footer;
