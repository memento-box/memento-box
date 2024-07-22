import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Hamburger from 'hamburger-react';

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const editPaths = ['/imageUpload', '/videoUpload', '/letterUpload', '/voiceUpload', '/previewSend', '/adminOverview'];
    if (editPaths.includes(location.pathname)) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [location]);


  return (
    <div className={isEdit ? "edit-nav" : "nav"} >
      <div id='hamburger'>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <>
          <Hamburger toggled={open} toggle={setOpen} color='#000000' rounded />
        {open && (
            <div className='menu'>
                <Link className="navLink" to="/home" >
                  Home
                </Link> 
                <br />
                <Link className="navLink" to="/login">
                  Login / Register
                </Link>
                <br />
                {/* Always show Recipient Box link for testing/development purposes */}
                <Link className="navLink" to="/recipientbox/1">
                  Recipient Box
                </Link>
            </div>
                )}
          </>
        )}

        

        {/* If a user is logged in, show these additional links */}
        {user.id && (
          <>
          <Hamburger toggled={open} toggle={setOpen} color='#000000' rounded />
        {open && (
            <div className='menu'>
                <Link className="navLink" to="/home">
                  Home
                </Link>
                <br />
                {/* Always show Recipient Box link for testing/development purposes */}
                <Link className="navLink" to="/recipientbox/1">
                  Recipient Box
                </Link>
                <br />
                <Link className="navLink" to="/login" onClick={() => dispatch({ type: 'LOGOUT' })}>
                  Logout
                </Link>
                {/* <LogOutButton className="navLink" /> */}
                </div>
                )}
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
