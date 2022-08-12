import React, { useState, useEffect } from "react";
import TempIndex from "./TempIndex";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import context from "./Context";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux'
import * as actionTypes from './redux/actions'


const SecondPgNavFiltr = (props) => {
  // console.log("props",props);
  const [houses, setHouses] = useState([]);
  const [fullHouses, setFullHouses] = useState([]);
  const [search, setSearch] = useState("");
  const [budget, setBudget] = React.useState([1, 100000000]);
  const [area, setArea] = React.useState([1, 100000]);
  const [bhk, setBhk] = useState(-1);
  const [propertyType, setPropertyType] = useState("all");
  const [propertyAge, setPropertyAge] = useState(new Array(4).fill(1));
  const [propertyStatus, setPropertyStatus] = useState("all");
  const [areaType, setAreaType] = useState(new Array(3).fill(1));
  const [furnishedArr, setFurnishedArr] = useState(new Array(3).fill(1));



  useEffect(() => {
    Aos.init();
  }, []);


  const handleFilter = () => {
    if(document.getElementById("left-filter").style.display == "block"){
      document.getElementById("left-filter").style.display = "none";
    } else{
      document.getElementById("left-filter").style.display = "block";
    }
  }

  useEffect(() => {



    let tempHouses = [...fullHouses];
    console.log("full houses", tempHouses);


    if (search != "") {

      tempHouses = tempHouses.filter((house) => {

        if (search.length <= house.state.length && (search).toLowerCase() == (house.state.substr(0, search.length)).toLowerCase()) return 1;

        if (search.length <= house.state.length && search.toLowerCase() == house.city.substr(0, search.length).toLowerCase()) return 1;

        if (search == house.pincode) return 1;

        return 0;

      })

    }
    else {

      if (props.state) {
        tempHouses = tempHouses.filter((house) => {
          return house.state == props.state;
        })
      }

      if (props.city) {
        tempHouses = tempHouses.filter((house) => {
          return house.city == props.city;
        })
      }

    }

    console.log("after state city filter", tempHouses);


    tempHouses = tempHouses.filter((house) => {




      let aType = house.areaType;



      if (areaType[0] == 1 && aType == "residential") {
        return 1;
      }

      if (areaType[1] == 1 && aType == "commercial") {
        return 1;
      }

      if (areaType[2] == 1 && aType == "resi-com") {
        return 1;
      }
      return 0;
    });

    console.log("after areatype filter", tempHouses);
    //  console.log("Bfeore filteration")
    //  console.log(tempHouses);
    tempHouses = tempHouses.filter((house) => {
      // console.log(house.propertyType ,propertyType );
      if (house.propertyType === "apartment" && propertyType[0] == 1) return 1;
      if (house.propertyType === "villa" && propertyType[1] == 1) return 1;

      if (house.propertyType === "plot" && propertyType[2] == 1) return 1;

      return 0;
    })

    console.log("after propertytype filter", tempHouses);

    // console.log("after filteration");
    // console.log(tempHouses);

    tempHouses = tempHouses.filter((house) => {
      if (house.price >= budget[0] && house.price <= budget[1]) return 1;

      return 0;
    });


    console.log("after pricefilter", tempHouses);

    tempHouses = tempHouses.filter((house) => {
      if (house.area >= area[0] && house.area <= area[1]) return 1;
      return 0;
    });

    console.log("after area filter", tempHouses);

    if (bhk != -1) {
      tempHouses = tempHouses.filter((house) => {
        return house.bedrooms == bhk || house.bathrooms == bhk;
      });
    }
    console.log("afterbhk filter", tempHouses);
    tempHouses = tempHouses.filter((house) => {
      let pAge = house.age;
      if (propertyAge[0] == 1 && pAge >= 0 && pAge <= 2) {
        return 1;
      }
      if (propertyAge[1] == 1 && pAge >= 3 && pAge <= 5) {
        return 1;
      }
      if (propertyAge[2] == 1 && pAge >= 6 && pAge <= 10) {
        return 1;
      }
      if (propertyAge[3] == 1 && pAge >= 10) {
        return 1;
      }
      return 0;
    });

    console.log("after age filter", tempHouses);
    // console.log(propertyStatus)

    if (propertyStatus != "all") {
      console.log(propertyStatus);
      tempHouses = tempHouses.filter((house) => {
        // console.log(house.status)
        return house.status == propertyStatus;
      });
    }

    console.log("after status filter", tempHouses);
    tempHouses = tempHouses.filter((house) => {
      let fs = house.furnished;

      if (furnishedArr[0] == 1 && (!fs || fs == "furnished")) {
        return 1;
      }

      if (furnishedArr[1] == 1 && (!fs || fs == "semifurnished")) {
        return 1;
      }

      if (furnishedArr[2] == 1 && (!fs || fs == "unfurnished")) {
        return 1;
      }
      return 0;
    });

    console.log("after furnished filter", tempHouses);


    //  console.log("temphouse",tempHouses)

    setHouses(tempHouses);
  }, [
    fullHouses,
    propertyType,
    search,
    areaType,
    budget,
    area,
    bhk,
    propertyAge,
    propertyStatus,
    furnishedArr,
  ]);

  // let handleFilter = () => {
  //   if(document.getElementById(left-filter).style.display == "block"){
  //     document.getElementById(left-filter).style.display == "none";
  //   } else{
  //     document.getElementById(left-filter).style.display == "block";
  //   }

  // }
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/allProject")
      .then((res) => {
        console.log((res.data))
        setHouses(res.data);
        setFullHouses(res.data);
        //console.log(houses);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(props.propertyTypeArr);
    let temp = propertyType;
    temp = props.propertyTypeArr;
    setPropertyType(temp);

  }, []);

  const handlebhk = (b) => {
    setBhk(b);
    // console.log(bhk);
  };

  const handlePropertyStatus = (str) => {
    setPropertyStatus(str);
  }
  const handlePropertyType = (PType) => {

    if (PType === "villa") {
      let temp = [...propertyType];
      temp[1] = 1 - temp[1];
      setPropertyType(temp);
      props.handlePropertyTypeArr(1);
    }

    if (PType === "apartment") {

      let temp = [...propertyType];
      temp[0] = 1 - temp[0];
      setPropertyType(temp);
      props.handlePropertyTypeArr(0);


    }


    if (PType === "plot") {
      let temp = [...propertyType];
      temp[2] = 1 - temp[2];
      setPropertyType(temp);

      props.handlePropertyTypeArr(2);
    }

    // setPropertyType(PType);
    // console.log(propertyType)
  };

  const handlePropertyAge = (ind) => {
    let temp = [...propertyAge];
    temp[ind] = 1 - temp[ind];
    setPropertyAge(temp);
  };
  const handleFurnishedArr = (ind) => {
    let temp = [...furnishedArr];
    temp[ind] = 1 - temp[ind];
    setFurnishedArr(temp);
  };


  const handleAreaType = (ind) => {
    let temp = [...areaType];
    temp[ind] = 1 - temp[ind];
    setAreaType(temp);
    console.log(areaType);
  };

  const budgetRangeSelector = (event, newValue) => {
    setBudget(newValue);
  };

  const areaRangeSelector = (event, newValue) => {
    setArea(newValue);
  };


  return (
    <context.Provider value={houses}>
      <>
        <div className="Sec-Navbar">
          <div className="sec-nav-wrapper">
            {/* <!-- Navbar Logo --> */}
            {/* <div className="logo" data-aos="fade-down" data-aos-duration="2000">
              <img src="images/light DH logo.png" alt="logo" />
        
              <a href="/"><b>Differ<strong>Home</strong></b>
              </a>
            </div> */}

            {/* <!-- Navbar Links --> */}

            <div data-aos="fade-down" data-aos-duration="2000">
              <div className="logo" data-aos="fade-down" data-aos-duration="2000">
                <img src="images/light DH logo.png" alt="logo" />

                <a href="/"><b>Differ<strong>Home</strong></b>
                </a>
              </div>
              <ul id="menu">
                <div className="search-container">
                  <form action="/action_page.php">
                    <a href="#">
                      <FontAwesomeIcon icon={faSearch} />
                    </a>
                    <input
                      id="search"
                      type="text"
                      placeholder="Enter city, state, locality, pincode"
                      name="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </form>
                </div>
                <li>
                  <a href="/">Home</a>
                </li>
                {/* <!----> */}
                <li>
                  <a href="/#about-section">About</a>
                </li>
                {/* <!----> */}
                <li>
                  <a href="under_maintainance">Services</a>
                </li>
                {/* <!----> */}
                <li>
                  <a href="#contactus">Contact US</a>
                </li>
              </ul>
            </div>
          </div>

          {/* <!-- Menu Icon --> */}
          <div className="menuIcon">
            <span className="icon icon-bars"></span>
            <span className="icon icon-bars overlay"></span>
          </div>
        </div>

        <div className="filterHeading-parent">
          <div className="filter-header">
            <div className="filter_heading">
              <h5>Filters</h5>
            </div>
            <div className="quote">
              <h3>Find Your Dream Home</h3>
              <p>{houses.length} Properties Found</p>
            </div>
            <div className="sortby_btn">
              {/* <button onclick={sortlist()} className="sortbtn">Dropdown</button> */}
              {/* <div id="mySortlist" className="dropdown-content"> */}
              {/* <a href="#">Price</a> */}
              {/* </div> */}
            </div>
          </div>
        </div>
        
        {/*-----mobile filter header view-----*/}

        <div className="mob-filter-header">
          <div className="filter-btn">
            <a onClick={handleFilter}>
              <p>Filters</p>
            </a>
          </div>
          <div className="mob-search-container">
            <form action="/action_page.php">
              <a href="#">
                <FontAwesomeIcon icon={faSearch} />
              </a>
              <input
                id="search"
                type="text"
                placeholder="Enter city, state, locality, pincode"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>

        <div className="filter_temp">
          <div className="left-filter-parent">
            <div id="left-filter">
              <form>
                <div className="areaType">
                  <p className="title">Area Type</p>
                  <div className="aTypeChecks">
                    <div className="check1">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={areaType[0]}
                        onChange={() => handleAreaType(0)}
                      />
                      <label>Residential</label>
                    </div>
                    <div className="check1">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={areaType[1]}
                        onChange={() => handleAreaType(1)}
                      />
                      <label>Commercial</label>
                    </div>
                    <div className="check1">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={areaType[2]}
                        onChange={() => handleAreaType(2)}
                      />
                      <label>Resi-Com</label>
                    </div>
                  </div>
                </div>

                <div className="propertyType">
                  <p className="title">Property Type</p>
                  <div className="propIcons">
                    <div className="Icon">
                      <button
                        type="button"

                        onClick={() => handlePropertyType("apartment")}
                      >
                        <img src="images/apartmentIcon.png" alt=" " />
                        <p className="iconName">Apart.</p>
                      </button>
                    </div>
                    <div className="Icon">
                      <button
                        type="button"
                        onClick={() => handlePropertyType("villa")}
                      >
                        <img src="images/bunglowIcon.png" alt=" " />
                        <p className="iconName">Villa</p>
                      </button>
                    </div>
                    <div className="Icon">
                      <button
                        type="button"
                        onClick={() => handlePropertyType("plot")}
                      >
                        <img src="images/plotIcon.png" alt=" " />
                        <p className="iconName">Plot</p>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="Budget">
                  <Typography id="range-slider" gutterBottom>
                    <p>Select range of budget <span>(Lacs)</span>:</p>
                  </Typography>

                  <div className="slider-parent">
                  <Slider
                    min={1}
                    max={300}
                    value={budget}
                    onChange={budgetRangeSelector}
                    valueLabelDisplay="auto"
                  />
                  </div>                  
                </div>
                <hr />

                <div className="Area">
                  <Typography id="range-slider" gutterBottom>
                    Select range of area (Sqft):
                  </Typography>

                  <div className="slider-parent">
                    <Slider
                      min={1}
                      max={300}
                      value={area}
                      onChange={areaRangeSelector}
                      valueLabelDisplay="auto"
                    />
                  </div>
                </div>

                <hr />

                <div className="bhk">
                  <p className="title">BHKs</p>
                  <div className="bhkTypes">
                    <label className="btype">
                      <button type="button" onClick={() => handlebhk(1)} >
                        1
                      </button>
                    </label>
                    <label className="btype">
                      <button type="button" onClick={() => handlebhk(2)}>
                        2
                      </button>
                    </label>
                    <label className="btype">
                      <button type="button" onClick={() => handlebhk(3)} >
                        3
                      </button>
                    </label>
                    <label className="btype">
                      <button type="button" onClick={() => handlebhk(4)} >
                        4
                      </button>
                    </label>
                    <label className="btype">
                      <button type="button" onClick={() => handlebhk(5)} >
                        4+
                      </button>
                    </label>
                  </div>
                </div>
                <hr />

                <div className="propertyAge">
                  <p className="title">Property Age</p>
                  <div className="ageChecks">
                    <div className="check1">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={propertyAge[0]}
                        onChange={() => handlePropertyAge(0)}
                      />
                      <label>0-2 Years</label>
                    </div>
                    <div className="check1">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={propertyAge[1]}
                        onChange={() => handlePropertyAge(1)}
                      />
                      <label>3-5 Years</label>
                    </div>
                    <div className="check1">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={propertyAge[2]}
                        onChange={() => handlePropertyAge(2)}
                      />
                      <label>6-10 Years</label>
                    </div>
                    <div className="check1">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={propertyAge[3]}
                        onChange={() => handlePropertyAge(3)}
                      />
                      <label>10+ Years</label>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="propertyStatus">
                  <p className="title">Property Status</p>
                  <div className="statusBox">
                    <div className="status1">
                      <label className="btnType">
                        <button
                          type="button"
                          onClick={() => handlePropertyStatus("readytomove")}
                        >
                          Ready To Move
                        </button>
                      </label>
                    </div>
                    <div className="status1">
                      <label className="btnType">
                        <button
                          type="button"
                          onClick={() =>
                            handlePropertyStatus("underconstruction")
                          }
                        >
                          Under Construction
                        </button>
                      </label>
                    </div>
                  </div>
                </div>

                <hr />
                <div className="furnished">
                  <div className="check1">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={furnishedArr[0]}
                      onChange={() => handleFurnishedArr(0)}
                    />
                    <label>Furnished</label>
                  </div>
                  <div className="check1">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={furnishedArr[1]}
                      onChange={() => handleFurnishedArr(1)}
                    />
                    <label>Semi-Furnished</label>
                  </div>
                  <div className="check1">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={furnishedArr[2]}
                      onChange={() => handleFurnishedArr(2)}
                    />
                    <label>Unfurnished</label>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="tempParent">
            <TempIndex />
          </div>
        </div>
      </>
    </context.Provider>
  );
};

const mapStateToProps = (states) => {
  return {
    propertyTypeArr: states.propertyTypeArr,
    state: states.state,
    city: states.city
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handlePropertyType: (id) => dispatch({ type: actionTypes.HANDLE_PROPERTY_TYPE, payload: { id: id } }),
    handleState: (state) => dispatch({ type: actionTypes.HANDLE_STATE, payload: { state: state } }),
    handleCity: (city) => dispatch({ type: actionTypes.HANDLE_CITY, payload: { city: city } }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondPgNavFiltr);

