import React, { useState } from 'react';

import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';


const Navbar = () => {
    const [active, setActive] = useState("toggle_menu");
    // const [icon, setIcon] = useState("nav__toggler");
    const navToggle = () => {
        if (active === "toggle_menu") {
            setActive("toggle_menu toggle_menu_block");
        } else setActive("toggle_menu");

    };
    return (
        <>
            <nav id="navbar">
                <div className="nav-wrapper">
                    {/* <!-- Navbar Logo --> */}
                    <div className="logo" data-aos="fade-down" data-aos-duration="2000">
                        <img src='images/DH logo.png' alt='logo' />
                        <a href="#home">
                            <b> Differ<strong>Home</strong></b>
                        </a>
                    </div>

                    {/* <!-- Navbar Links --> */}

                    <div data-aos="fade-down" data-aos-duration="2000">
                        <ul id="menu" className='nav__menu'>
                            <li className="nav__item">
                                <a href="/" className="nav__link">Home</a></li>
                            {/* <!----> */}
                            <li className="nav__item">
                                <a href="#about-section" className="nav__link">About</a></li>
                            {/* <!----> */}
                            <li className="nav__item">
                                <a href="under_maintainance" className="nav__link">Services</a></li>
                            {/* <!----> */}
                            <li className="nav__item">
                                <a href="#contactus" className="nav__link">Contact Us</a></li>
                        </ul>
                    </div>

                    <div id='close' onClick={navToggle}>
                        <span><FontAwesomeIcon icon={faBars} /></span>
                        {/* <span><FontAwesomeIcon icon={faClose} /></span> */}
                    </div>

                </div>


            </nav>



            <div id='menu2' className={active} >
                <ul  >
                    <li className="line1"><a href="#home">Home</a></li>
                    <li className="line2"><a href="under_maintainance">About</a></li>
                    <li className="line3"><a href="under_maintainance">Services</a></li>
                    <li className="line4"><a href="/#contactus">Contact US</a></li>
                </ul>
            </div>

        </>
    )
}

export default Navbar;