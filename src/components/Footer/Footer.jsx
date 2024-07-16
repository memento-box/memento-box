import React from 'react';
import './Footer.css';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  
  const url = 'https://us14.list-manage.com/contact-form?u=b443c9da3e589e0f1325e7f34&form_id=778634d15230b49196fc729fbc061075';
  return (
  <footer>&copy; Prime Digital Academy
    <p onClick={() => window.open(url)}>Contact Us</p>
  </footer>
  
  )
}

export default Footer;
