import React from "react";
import Template from './Templates';
import './Templates.css';
import Tempdata from './Tempdata.jsx';
import context  from './Context'
import { useContext } from "react";
import { useEffect } from "react";


const TempIndex = () => {


    const houses=useContext(context);
//    console.log(houses);
    return(
        
        <>
        
            {houses.map((house) => {
                return (
                    <Template
                        key={house._id}
                        imgsrc={house.photos[0]}
                        title={house.propertyName}
                        about={house.about}
                        address={house.city}
                        bhk={house.bedrooms}
                        price={house.price}

                        area={house.area}
                        carpetArea={house.carpetArea}
                        priceSqft={house.priceSqft}
                        reraRegistered={house.reraRegistered}
                        age={house.age}
                        status={house.status}
                        layout={house.layout}
                        floorPlan={house.floorPlan}
                        brochure={house.brochure}
                        furnished={house.furnished}
                        longitude={house.longitude}
                        latitude={house.latitude}
                    />
                );
            })}
        </>
    );
}
export default React.memo(TempIndex);