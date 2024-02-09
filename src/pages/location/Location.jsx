import React, { useState } from 'react'
import './location.scss'
import axios from 'axios';
import baseurl from '../../ourapi';

const Location = () => {
    const [locations, setLocations] = useState({
        location: undefined,
        charge: []
      });

      //handle change
      const handleChange = (e) => {
        setLocations((prev) => ({...prev, [e.target.id]: e.target.value}))
      }
       // Function to handle cost change


       const handleCostChange = (e, max, min) => {
        // Check if there's an existing charge with the same max and min values
        const existingChargeIndex = locations.charge.findIndex(
          (charge) => charge.maxweight === max && charge.minweight === min
        );
      
        // If an existing charge is found, update its cost; otherwise, add a new charge
        if (existingChargeIndex !== -1) {
          const updatedChargeArray = [...locations.charge];
          updatedChargeArray[existingChargeIndex].cost = parseFloat(e.target.value);
      
          setLocations((prevLocations) => ({
            ...prevLocations,
            charge: updatedChargeArray
          }));
        } else {
          // Add a new charge
          const newCharge = {
            maxweight: max,
            minweight: min,
            cost: parseFloat(e.target.value)
          };
      
          setLocations((prevLocations) => ({
            ...prevLocations,
            charge: [...prevLocations.charge, newCharge]
          }));
        }
      };

        const addLocation = async () => {
          const res = await axios.post(baseurl+"shipping", locations)
          console.log("Clicked")

          if(res.data.location){
          // window.location.reload();
          console.log("Done")
          }
          
        }
  return (
    <div className='locationsLocation'>
        <div className="heading">Add Location</div>
      <form className="myformlocation">
        <div className="inputTop">
            <input placeholder='Location Name' id='location' onChange={handleChange} type="text" />
        </div>
        <div className="inputBottom">
            <div className="headingupper">Location Fees</div>
            <div className="headingd"></div>
            <div className="lowerdata">
            {[...Array(9)].map((_, index) => (
                <div key={index} className="singleitemlocation">
                <div className="range">{`${index + 1} - ${index + 2}KGs`}</div>
                <div className="fees">
                    <input onChange={(e) => handleCostChange(e, index + 2, index + 1)} type="number" />
                </div>
                </div>
            ))}

            {[...Array(58)].map((_, index) => (
                    <div key={index} className="singleitemlocation">
                    <div className="range">{`${10 + index * 5} - ${15 + index * 5}KGs`}</div>
                    <div className="fees">
                        <input
                        onChange={(e) => handleCostChange(e, 15 + index * 5, 10 + index * 5)}
                        type="number"
                        />
                    </div>
                    </div>
                ))}
               
               {[...Array(10)].map((_, index) => (
                    <div key={index} className="singleitemlocation">
                    <div className="range">{`${300 + index * 10} - ${310 + index * 10}KGs`}</div>
                    <div className="fees">
                        <input
                        onChange={(e) => handleCostChange(e, 310 + index * 10, 300 + index * 10)}
                        type="number"
                        />
                    </div>
                    </div>
                ))}
            </div>
        </div>
        <span className='button' onClick={()=>addLocation()}>Add Location</span>

      </form>
    </div>
  )
}

export default Location
