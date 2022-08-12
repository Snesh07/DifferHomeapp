import React, { useRef, useEffect, useState } from 'react';
import axios from "axios";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import { State, City } from 'country-state-city';
import { useNavigate } from 'react-router-dom'

mapboxgl.accessToken = 'pk.eyJ1IjoiYWtzaGF5LWFkaGFuYSIsImEiOiJja3lidjNoOW8wajZlMm9xb3QxaGo2MW5wIn0.d3-byCvalXyvUT6swhWkQA';

let marker2;

const AdminPortal = () => {

  const navigate = useNavigate();
  useEffect(() => {

    if (localStorage.getItem('user')) {
      // console.log(localStorage.getItem('user'));
    }
    else navigate('/login');


  }, []);


  const countryCode = "IN";
  // const [stateCode, setStateCode] = useState('');
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  useEffect(() => {
    setStates(State.getStatesOfCountry(countryCode));
  }, [])
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(86.47472132080998);
  const [lat, setLat] = useState(23.8121817595987);

  // const [marker2,setmarker]=useState(null);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 10
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.on('click', function (e) {

      if (marker2) {
        marker2.remove();
      }
      setLng(e.lngLat.lng);
      setLat(e.lngLat.lat);
      map.current.flyTo({
        center: [e.lngLat.lng, e.lngLat.lat]
      })

      marker2 = new mapboxgl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map.current)

      // setmarker(marker);
    })

  });


  const url = "http://localhost:5000/api/addProject/";


  const [data, setData] = useState({
    propertyName: "",
    propertyType: "villa",
    areaType: "residential",
    city: "",
    state: "",
    pincode: 0,
    address: "",
    area: 0,
    carpetArea: 0,
    price: 0,
    priceSqft: 0,
    bedroom: 1,
    bathroom: 1,
    reraRegistered: false,
    propertyAge: 0,
    status: "readytomove",
    furnished: "furnished",
    about: "",
    photos: null,
    layout: null,
    floorPlan: null,
    brochure: null,
  });

  const [emptyData, setEmptyData] = useState(data)

  const handleClear = () => {
    setData(emptyData);

  };

  const handleLogOut = () => {
    // console.log(localStorage)
    localStorage.clear();
    navigate('/login')

  };


  function handle(e) {
    setData({ ...data, [e.target.name]: e.target.value });

    if (e.target.name == "state") {

      states.forEach(element => {
        if (element.name == e.target.value) {
          // setStateCode(element.isoCode);
          setCity(City.getCitiesOfState(countryCode, element.isoCode));
          var obj = City.getCitiesOfState(countryCode, element.isoCode)[0];
          setData({ ...data, "city": obj.name });
          setLat(obj.latitude);
          setLng(obj.longitude);

          map.current.flyTo({
            center: [obj.longitude, obj.latitude]
          })
          // map.current.setZoom(8);
          if (marker2) {
            marker2.remove();
          }

          marker2 = new mapboxgl.Marker()
            .setLngLat([obj.longitude, obj.latitude])
            .addTo(map.current)


        }
      });
    }

    if (e.target.name == "city") {

      city.forEach(element => {
        if (element.name == e.target.value) {
          // setStateCode(element.isoCode);
          //  setCity(City.getCitiesOfState(countryCode,element.isoCode));
          setLat(element.latitude);
          setLng(element.longitude);

          map.current.flyTo({
            center: [element.longitude, element.latitude]
          })
          // map.current.setZoom(9);
          if (marker2) {
            marker2.remove();
          }

          marker2 = new mapboxgl.Marker()
            .setLngLat([element.longitude, element.latitude])
            .addTo(map.current)



        }
      })

    }

  }

  function handleImages(e) {
    //    console.log(e.target.files);
    setData({ ...data, [e.target.name]: e.target.files });
  }


  let handleSubmit = async (e) => {
    e.preventDefault();
    var fd = new FormData();
    if (data.propertyName) fd.append('propertyName', data.propertyName);
    if (data.propertyType) fd.append('propertyType', data.propertyType);
    if (data.areaType) fd.append('areaType', data.areaType);
    if (data.city) fd.append('city', data.city);
    if (data.state) fd.append('state', data.state);
    if (data.pincode) fd.append('pincode', data.pincode);
    if (data.address) fd.append('address', data.address);
    if (data.area) fd.append('area', data.area);
    if (data.carpetArea) fd.append('carpetArea', data.carpetArea);
    if (data.price) fd.append('price', data.price);
    if (data.priceSqft) fd.append('priceSqft', data.priceSqft);
    fd.append('bedrooms', data.bedroom);
    fd.append('bathrooms', data.bathroom);
    fd.append('reraRegistered', data.reraRegistered);
    fd.append('age', data.propertyAge);
    fd.append('status', data.status);
    fd.append('furnished', data.furnished);
    fd.append('longitude', lng);
    fd.append('latitude', lat);
    if (data.about) fd.append('about', data.about);
    var i;
    // console.log(data.layout);
    if (data.layout) {
      for (i = 0; i < data.layout.length; i++) {

        fd.append('layout', data.layout[i])

      }

    }

    if (data.floorPlan) {

      for (i = 0; i < data.floorPlan.length; i++)     fd.append('floorPlan', (data.floorPlan[i]));
    }
    if (data.brochure) for (i = 0; i < data.brochure.length; i++) fd.append('brochure', (data.brochure[i]));
    if (data.photos) for (i = 0; i < data.photos.length; i++) fd.append('photos', (data.photos[i]));



    const response = axios.post(url, fd, {
      // method:'POST',
      headers: {
        "Content-Type": "multipart/form-data",
        'authToken': localStorage.getItem('user')
      }
    }).then((res, err) => {

      const json = res.data;

      console.log(json);


    }).catch((error) => {

      console.log(error);
    })


  };

  return (


    <>
      <div className="AdminHeader">
        <div>
          <h1>Admin Portal</h1>
        </div>
        <div className="addBtn">
          <button
            type="button"
          >
            Remove Property
          </button>
          <button
            type="button" onClick={() => handleClear()}
          >
            Clear all inputs
          </button>
        </div>
        <div className='logout-submit-Btn'>
          <button
            type="button" onClick={() => handleLogOut()}
          >
            Logout
          </button>
        </div>

      </div>
      <div className="adminFormDetails">
        <div className="adminForm">
          <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
            <div className="propName">
              <label for="propname">
                <b>Property Name</b>
              </label>
              <input
                onChange={(e) => handle(e)}
                type="text"
                id="propertyName"
                value={data.propertyName}
                name="propertyName"
                required
              />
            </div>
            <div>
              <label for="proptype">
                <b>Property Type</b>
              </label>
              <select
                onChange={(e) => handle(e)}
                id="propertyType"
                value={data.propertyType}
                name="propertyType"
                required
              >
                <option value="villa">Villa</option>
                <option value="plot">Plot</option>
                <option value="apartment">Apartment</option>{" "}
              </select>

              <label for="areatype">
                <b>Area Type</b>
              </label>
              <select
                onChange={(e) => handle(e)}
                id="areaType"
                value={data.areaType}
                name="areaType"
                required
              >
                <option value="residential">Residental</option>
                <option value="commercial">Commertial</option>
                <option value="resi-com">Resi-Com</option>{" "}
              </select>
            </div>
            <div className="Location">

            <label for="state">
                <b>State: </b>
              </label>
              <select onChange={handle} id="state" name="state" required>
                {states.map((option) => (
                  <option key={option.isoCode} value={option.name}> {option.name}</option>
                ))
                }
              </select>

              <label for="location">
                <b>Location: City</b>
              </label>
              <select onChange={handle} id="city" name="city" required>
                {city.map((option) => (
                  <option key={option.name} value={option.name}> {option.name}</option>
                ))
                }

              </select>              
            </div>
            <div className="Pincode">
              <label for="pincode">
                <b>Pincode:</b>
              </label>
              <input
                onChange={(e) => handle(e)}
                type="number"
                id="pincode"
                value={data.pincode}
                name="pincode"
                required
              />
            </div>
            <div className="Address">
              <label for="address">
                <b>Address:</b>
              </label>
              <input
                onChange={(e) => handle(e)}
                type="text"
                id="address"
                value={data.address}
                name="address"
                required
              />
            </div>
            <div className="Area">
              <div className="area1">
                <label for="area">
                  <b>Area:</b>
                </label>
                <input
                  onChange={(e) => handle(e)}
                  type="number"
                  id="area"
                  value={data.area}
                  name="area"
                  required
                />
                <b>Sqft.</b>
              </div>
              <div className="area2">
                <label for="car-area">
                  <b>Carpet Area: </b>
                </label>
                <input
                  onChange={(e) => handle(e)}
                  type="number"
                  id="carpetArea"
                  value={data.carpetArea}
                  name="carpetArea"
                  required
                />
                <b>Sqft.</b>
              </div>
            </div>
            <div className="Price">
              <div className="price1">
                <label for="price1">
                  <b>Price:</b>
                </label>
                <input
                  onChange={(e) => handle(e)}
                  type="number"
                  id="price"
                  value={data.price}
                  name="price"
                  required
                />
                <b>Rs.</b>
              </div>
              <div className="price2">
                <label for="price2">
                  <b>Price/Sqft: </b>
                </label>
                <input
                  onChange={(e) => handle(e)}
                  type="number"
                  id="priceSqft"
                  value={data.priceSqft}
                  name="priceSqft"
                  required
                />
                <b>Rs.</b>
              </div>
            </div>
            <div className="BedBath">
              <div className="Bedroom" id="rooms">
                <label for="bedroom">
                  <b>Bedroom:</b>
                </label>
                <select onChange={(e) => handle(e)} id="bedroom" name="bedroom" required>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">4+</option>
                </select>
              </div>
              <div className="Bathroom" id="rooms">
                <label for="bathroom">
                  <b>Bathroom:</b>
                </label>
                <select
                  onChange={(e) => handle(e)}
                  id="bathroom"
                  name="bathroom"
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">4+</option>
                </select>
              </div>
            </div>
            <div className="RegisterPropAge">
              <div className="Register">
                <label for="register">
                  <b>RERA Registered:</b>
                </label>
                <select
                  onChange={(e) => handle(e)}
                  id="reraRegistered"
                  value={data.reraRegistered}
                  name="reraRegistered"
                  required
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="PropAge">
                <label for="age">
                  <b>Property Age (in years):</b>
                </label>
                <input
                  onChange={(e) => handle(e)}
                  type="number"
                  id="propertyAge"
                  value={data.propertyAge}
                  name="age"
                  required
                />
              </div>
            </div>
            <div className="Status">
              <div className="MovStatus">
                <label for="movStatus">
                  <b>Move-In Status:</b>
                </label>
                <select
                  onChange={(e) => handle(e)}
                  id="status"
                  value={data.status}
                  name="status"
                  required
                >
                  <option value="readytomove">Ready to move</option>
                  <option value="underconstruction">Under Construction</option>
                </select>
              </div>
              <div className="FurStatus">
                <label for="furStatus">
                  <b>Furnishing status </b>
                </label>
                <select
                  onChange={(e) => handle(e)}
                  id="furnished"
                  name="furnished"
                  value={data.furnished}
                  required
                >
                  <option value="furnished">Furnished</option>
                  <option value="semifurnished">Semi-Furnished</option>
                  <option value="notfurnished">Unfurnished</option>
                </select>
              </div>
            </div>
            <div className="About">
              <label for="about">
                <b>About:</b>
              </label>
              <textarea
                onChange={(e) => handle(e)}
                type="text"
                id="about"
                name="about"
                value={data.about}
                required
              />
            </div>
            <div className="Uploads">
              <div>
                <label for="photos">
                  <b>Photos:</b>
                </label>
                <input type="file" name="photos" id="photos" onChange={handleImages} required multiple />
              </div>
              <div>
                <label for="layout">
                  <b>3D Layout:</b>
                </label>
                <input type="file" name="layout" id="layout" onChange={handleImages} required multiple />
              </div>
              <div>
                <label for="floor">
                  <b>Floor Plan:</b>
                </label>
                <input type="file" name="floorPlan" id="floorPlan" onChange={handleImages} required multiple />
              </div>
              <div>
                <label for="brochure">
                  <b>Brochure:</b>
                </label>
                <input type="file" name="brochure" id="brochure" onChange={handleImages} required multiple />
              </div>
            </div>
            <div className="SubmitBtn logout-submit-Btn">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className="adminMap">
          <div>
            <h5>Location in Map</h5>
          </div>
          <div ref={mapContainer} className=" map-container mapBox"></div>
        </div>
      </div>
    </>
  );

};

export default AdminPortal;

