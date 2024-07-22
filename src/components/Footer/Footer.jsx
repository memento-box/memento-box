import React, { useEffect, useState } from "react";
import "./Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {
  const url =
    "https://us14.list-manage.com/contact-form?u=b443c9da3e589e0f1325e7f34&form_id=778634d15230b49196fc729fbc061075";

  const handleClick = () => {
    window.open(url, "_blank");
  };
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const editPaths = ['/imageUpload', '/videoUpload', '/letterUpload', '/voiceUpload', '/previewSend', '/adminOverview'];
    if (editPaths.includes(location.pathname)) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [location]);


  return (
    <footer className={isEdit ? "edit-footer-content" : "footer-content"}>
      <div className="subscription">
        <div className="subs">
          <p className="sub-title"> Subscribe</p>
          <p>Sign up for our newsletter to receive news and updates!</p>
          <input type="email" placeholder="Email Address" />
          <button>Sign up</button>
        </div>
      </div>
      <div className="site-map">
        <p className="site-title">Site maps</p>
        <ul>
          <li>
            <a href="#">about</a>
          </li>

          <li>
            <a href="#">Purchase</a>
          </li>
          <li>
            <a href="#">Contact us</a>
          </li>
          <li>
            <a href="#">FAQ</a>
          </li>
        </ul>
      </div>
      <div className="follow">
        <p className="follow-title">Follow</p>
        <img src="/icons/instigram.png" />
        <img src="/icons/fblogo.png" />
        <img src="/icons/linn.png" />
      </div>
      <p onClick={handleClick}>Contact Us</p>
    </footer>
  );
}

export default Footer;
