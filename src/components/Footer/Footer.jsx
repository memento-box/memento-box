import React from "react";
import "./Footer.css";

function Footer() {
  const url =
    "https://us14.list-manage.com/contact-form?u=b443c9da3e589e0f1325e7f34&form_id=778634d15230b49196fc729fbc061075";

  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <footer className="">
      <p onClick={handleClick}>Contact Us</p>
    </footer>
  );
}

export default Footer;
