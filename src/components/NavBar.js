import React, { useState } from 'react';
require('../styles/NavBar.css');

const navLogo = require('../images/current-logo-indigo-2.svg');

const NavBar = () => {
  const [ isHamburgerOpen, setIsHamBurgerOpen ] = useState(false);
  return (
    <nav className="navBar">
      <a href="https://current.com/">
        <span role="button" tabIndex="0">
          <img className="navLogo" alt="Current Logo" src={navLogo} />
        </span>
      </a>
      <div className="navMenu">
        <a href="/faster-direct-deposit" className="navLink">Benefits</a>
        <a href="/blog" className="navLink">Community</a>
        <a href="/about-us" className="navLink">About Us</a>
      </div>
      <button className="navSignUp">Sign Up</button>
      <div className={`navHamburger ${isHamburgerOpen ? 'hamburgerOpen' : 'hamburgerClosed'}`} onClick={() => setIsHamBurgerOpen(!isHamburgerOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default NavBar