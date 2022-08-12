//library imports
import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import * as actionTypes from './redux/actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBinoculars,
  faClock,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux'
import {  useNavigate } from "react-router-dom";
import { State, City } from 'country-state-city';


const Home = (props) => {

  const navigate=useNavigate();

  const [states, setState] = useState(

    [{ name: '' }, ...State.getStatesOfCountry('IN')]
  );
  // console.log('states are', states);
  const [cities, setCities] = useState([{name:''}]);

  useEffect(() => {
    Aos.init();
    if(props.state){
      states.forEach((ele)=>{
        if(ele.name== props.state){
          setCities([{name:''} ,...City.getCitiesOfState('IN',ele.isoCode)]);
        }
      })
      
    }
  }, []);

  const handle =(e)=>{

    props.handleState(e.target.value);
    props.handleCity('');
    if(e.target.value !=''){
     states.forEach((ele)=>{
       if(ele.name===e.target.value){
         setCities([{name:''} ,...City.getCitiesOfState('IN',ele.isoCode)]);
       }
     })
     
    }
}

const handleCity=(e)=>{
  props.handleCity(e.target.value);
}


const handleclick =(e)=>{
   e.preventDefault();
   navigate('/profile-page');
}
  

  return (

    <>
      <div className="bg_container" id="home_">
        <div className="tagline" data-aos="fade-right" data-aos-duration="2000">
          <p1>Explore Beautiful Houses,</p1>
          <br />
          <p2>Apartments, Villas & More.</p2>
          <br />
          <h5>We prefer your home to be </h5>
          <h2>
            DIFFER<t2> in</t2>
          </h2>
          <h1>
            <strong>DIFFERHOME</strong>
          </h1>
        </div>
        <div className="three_lines_icons">
          <div data-aos="fade-left" data-aos-duration="1000">
            <p>
              <FontAwesomeIcon icon={faClock} /> Real-Time Inventory
            </p>
          </div>
          <div data-aos="fade-left" data-aos-duration="2000">
            <p>
              <FontAwesomeIcon icon={faBinoculars} /> Comprehensive Overview
            </p>
          </div>
          <div data-aos="fade-left" data-aos-duration="3000">
            <p>
              <FontAwesomeIcon icon={faUserShield} /> Verified RERA Registration
            </p>
          </div>
        </div>
        <div className="image" />
        {/* <!-- <img src="./images/carousel.jpg" alt=""> --> */}
      </div>

      <div className="searchbox" data-aos="fade-left" data-aos-duration="2000">
        <h4>Looking For :</h4>
        <form action="/filter1" method="get">
        
          <input
            type="checkbox"
            id="apartment"
            name="opt-1"
            houseue="Apartment"
            checked={props.propertyTypeArr[0]}
            onChange={() => props.handlePropertyTypeArr(0)}
          />
          <label for="Apartment">Apartment</label>

          <input
            type="checkbox"
            id="villa"
            name="opt-2"
            houseue="Villa"
            checked={props.propertyTypeArr[1]}
            onChange={() => props.handlePropertyTypeArr(1)}
          />
          <label for="villa">Villa</label>
          <br />

          <input
            type="checkbox"
            id="plot"
            name="opt-3"
            houseue="Plot"
            checked={props.propertyTypeArr[2]}
            onChange={() => props.handlePropertyTypeArr(2)}
          />
          <label for="plot">Plot</label>
          <br />

          <div className="state_name">
            <label for="State">Select State :</label>
            <br />
            <select onChange={handle} id="State" name="state" required value={props.state} >


              {states.map((option) => (
                <option key={option.name} value={option.name}> {(option.name)?option.name :"Select"}</option>
              ))
              }

            </select>
            <br />
          </div>

          <div className="city_name">
            <label for="City">Select City :</label>
            <br />
            <select onChange={handleCity} id="city" name="city" required value={props.city}>


{cities.map((option) => (
  <option key={option.name} value={option.name}> {(option.name)?option.name :"Select" }</option>
))
}

</select>
            <br />
          </div>
          <div className="startbtn">
            <a onClick={handleclick}  className="start_btn">
              Start
            </a>
          </div>
        </form>
      </div>
      <div className="reponsive_btn">
        <a href="/profile-page" className="rsp_btn">
          Get Started
        </a>
      </div>

      {/* one step solution part with boy sitting on sofa */}


      <div className="one_step_solution">
        <div className="one_step_textpart">
          <h1>One stop solution to your search for dream home</h1>
          <p>
            DifferHome is a one-stop platform for all the activities, either it
            is locating the perfect dream home to building a new one, we provide
            all the services just in here.
          </p>
          <a href="/profile-page" className="button_1">
            Get Started
          </a>
          <a href="#contactus" className="button_2">
            Contact Us
          </a>
        </div>
        <div className="sofa-boy-img">
          <img src="images/Sofa-boy.png" alt="Boy on Sofa" />
        </div>
      </div>
    </>
  );
};


const mapStateToProps = (states) => {
  // console.log("states are " ,states);
  return {
    propertyTypeArr: states.propertyTypeArr,
    state: states.state,
    city: states.city
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // handlePropertyType:(id)=>dispatch
    handlePropertyTypeArr: (id) => dispatch({ type: actionTypes.HANDLE_PROPERTY_TYPE, payload: { id } }),
    handleState: (state) => dispatch({ type: actionTypes.HANDLE_STATE, payload: { state: state } }),
    handleCity: (city) => dispatch({ type: actionTypes.HANDLE_CITY, payload: { city: city } }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

