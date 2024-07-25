import React, { useEffect, useState } from "react";
import "./Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {
  const url =
    "https://us22.list-manage.com/contact-form?u=d3caac5fe2d1c1b6f88e4b998&form_id=4a475dbdbfdb675071d6a7b56b42e528";

  const handleContactClick = (e) => {
    e.preventDefault();
    window.open(url, "_blank", "noopener,noreferrer");
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
          <p className="sub-title">Subscribe</p>
          <p>Sign up for our newsletter to receive news and updates!</p>
          <input type="email" placeholder="Email Address" />
          <button>Sign up</button>
        </div>
      </div>
      <div className="site-map">
        <p className="site-title">Site Maps</p>
        <ul>
          <li>
            <a href="#" onClick={handleContactClick}>Contact Us</a>
          </li>
        </ul>
        <p className="copyright">© 2024 Memento Box</p>
      </div>
      <div className="follow">
        <p className="follow-title">Follow</p>
        <img src="/icons/instigram.png" alt="Instagram" />
        <img src="/icons/fblogo.png" alt="Facebook" />
        <img src="/icons/linn.png" alt="LinkedIn" />
      </div>
    </footer>
  );
}

export default Footer;
