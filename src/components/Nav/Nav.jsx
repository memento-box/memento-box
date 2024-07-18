// src/components/Nav/Nav.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function Nav() {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const [isEdit,setIsEdit] = useState(false);

  useEffect(() => {
    const editPaths = ['/imageUpload', '/videoUpload', '/letterUpload', '/voiceUpload'];
    if(editPaths.includes(location.pathname)) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [location])


  return (
    <div className={isEdit ? "edit-nav" : "nav"}>
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className="navLink" to="/recipientbox/1">
              Recipient Box
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
