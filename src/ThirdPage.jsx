import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faPieChart, faTag, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

import { saveAs } from 'file-saver'

const ThirdPage = () => {
    const location = useLocation();
    var lng = 86.5 ;
    if(location.state.longitude) lng=location.state.longitude;
    var lat = 23.8;
    if(location.state.latitude) lat=location.state.latitude;
    console.log(lng,lat);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [showMap, setShowMap] = useState(false);

    const handleMap = () => {
        if (showMap == false) {
            document.getElementById("third-propImg").style.display = "none";
            document.getElementById("third-propMap").style.display = "block";
            setShowMap(true);
        }
        else {
            document.getElementById("third-propImg").style.display = "block";
            document.getElementById("third-propMap").style.display = "none";
            setShowMap(false);
        }
    }
useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 10
    });

    new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current)
});


return (
    <>
        <div className="Third-Navbar">
            <div className="third-nav-wrapper">
                {/* <!-- Navbar Logo --> */}
                <div className="logo" id="whitelogo">
                    <img src='images/light DH logo.png' alt='logo' />
                    {/* <a href="" > <img src="./../images/DH logo.png" alt="logo"></a> */}
                    {/* <!-- Logo Placeholder for Inlustration --> */}
                    <a href="/"><b>Differ<strong>Home</strong></b></a>
                </div>

                {/* <!-- Navbar Links --> */}

                <div>
                    <ul id="menu">
                        <li><a href="/">Home</a></li>
                        {/* <!----> */}
                        <li><a href="/#about-section">About</a></li>
                        {/* <!----> */}
                        <li><a href="under_maintainance">Services</a></li>
                        {/* <!----> */}
                        <li><a href="/contactus">Contact US</a></li>
                    </ul>
                </div>
            </div>

            {/* <!-- Menu Icon --> */}
            <div className="menuIcon">
                <span className="icon icon-bars"></span>
                <span className="icon icon-bars overlay"></span>
            </div>
        </div>



        <div className="about-property">
            <div className="img-map">
                <div className="property-images" id="third-propImg">
                    <img src={"http://localhost:5000" + location.state.imgsrc} alt="Property Image" />
                </div>
                <div ref={mapContainer} className="property-map mapBox" id="third-propMap" >
                </div>
            </div>
            <div className="mapBtn">
                <a onClick={handleMap}>{(showMap)?"View Image":"View Map"}</a>
            </div>
            <div className="prop-details">
                <h2>{location.state.title}</h2>
                <p>{location.state.address}</p>
                <div className="third-icons">
                    <div className="third-area" id="icon">
                        <h5><FontAwesomeIcon icon={faPieChart} /> Area</h5>
                        <p>{location.state.area}</p>
                    </div>
                    <div className="third-price" id="icon">
                        <h5><FontAwesomeIcon icon={faTag} /> Price</h5>
                        <p>{location.state.price}</p>
                    </div>
                    <div className="third-bhk" id="icon">
                        <h5><FontAwesomeIcon icon={faBed} /> BHK</h5>
                        <p>{location.state.bhk}</p>
                    </div>
                </div>
                <div className="about-prop">
                    <h2>About</h2>
                    <p>{location.state.about}</p>
                </div>
                <div className="prop-status">
                    <div className="three-lines">
                        <div id="status"><p><b>Carpet Area :</b> {location.state.carpetArea}</p></div>
                        <div id="status"><p><b>Price/Sqft. :</b> {location.state.priceSqft}</p></div>
                        <div id="status"><p><b>RERA Registered :</b> {location.state.reraRegistered}</p></div>
                    </div>
                    <p><b>Age of the Property :</b> {location.state.age}</p>
                    <p><b>Status : </b> {location.state.status}</p>
                    <p><b>Furnishing Status :</b> {location.state.furnished}</p>
                </div>
                <div className="layout">
                    <h5>3D Layouts</h5>
                    <div className="layout-img">
                        {
                            location.state.layout.map((ele) => (
                                <div className="img1" id="img">
                                    <img src={"http://localhost:5000" + ele} alt="Property layout" />
                                </div>

                            ))
                        }
                    </div>
                </div>
                <div className="floor-plan">
                    <h5>Floor Plan</h5>
                    <div className="floor-img">
                        {
                            location.state.floorPlan.map((ele) => (
                                <div className="img1" id="img">
                                    <img src={"http://localhost:5000" + ele} alt="Property floorPlan" />
                                </div>

                            ))
                        }
                    </div>
                </div>

                <div className="brochure-btn">
                    <a onClick={() => {  window.open("http://localhost:5000" + location.state.brochure[0]); return true;}}>Brochure</a>
                </div>
            </div>
        </div>

        {/* Footer */}

        <footer className="third-footer" >
            <div className="footerContent" id='contactus'>
                <div className="about">
                    <h2><a href="home_" > <img src='images/light DH logo.png' alt="logo" /></a>
                        <strong>DifferHome</strong></h2>
                    <p>Differhome is one stop solution to discover and<br />the perfect dream home for you.<br />
                        Premium apartments, villas, bungalows and<br />much more are available in a single platform.</p>
                    <h5>About Us<br />FAQs</h5>
                </div>
                <div className="explore">
                    <h3>Explore</h3>
                    <p>Apartments</p>
                    <p>Villas / Bungalows</p>
                    <p>Land / Plots</p>
                    <p>Residential Properties</p>
                    <p>Commercial Properties</p>
                    <p>Ready to Move-In</p>
                </div>
                <div className="contact">
                    <h3>Contact Us</h3>
                    <div className="contact-info">
                        <span><FontAwesomeIcon icon={faEnvelope} /></span>
                        <a href="mailto:info@differhome.com"> info@differhome.com</a>
                    </div>
                    <div className="contact-info">
                        <span><FontAwesomeIcon icon={faPhone} /></span>
                        <a href="tel:+919351822152"> (+91) 93518 22152 </a>
                    </div>
                    <div className="Footericons">
                    <a href="https://www.facebook.com/DifferHome"><img src='images/Icon awesome-facebook.png' /></a>
            <a href="https://instagram.com/differhome?igshid=YmMyMTA2M2Y="><img src='images/Icon feather-instagram.png' /></a>
            <a href="https://twitter.com/DifferHome?t=11TIVul9d1sd6i3APqYFKg&s=08"><img src='images/Icon awesome-twitter.png' /></a>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p>Copyright@ 2022. All Rights Reserved.</p>
            </div>
        </footer>
    </>
);
};

export default ThirdPage;
