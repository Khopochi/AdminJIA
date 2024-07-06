import React, { useEffect, useState } from 'react';
import './editlocation.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import baseurl from '../../ourapi';

const EditLocationPage = () => {
  const { id } = useParams(); // Get the location ID from the URL
  const [location, setLocation] = useState({
    location: '',
    charge: []
  });

  // Fetch the location data by ID when the component mounts
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await axios.get(`${baseurl}shipping/getlocationbyid/${id}`);
        setLocation(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocation();
  }, [id]);

  // Handle input changes for location name
  const handleChange = (e) => {
    setLocation((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle cost changes for fee ranges
  const handleCostChange = (e, max, min) => {
    const existingChargeIndex = location.charge.findIndex(
      (charge) => charge.maxweight === max && charge.minweight === min
    );

    if (existingChargeIndex !== -1) {
      const updatedChargeArray = [...location.charge];
      updatedChargeArray[existingChargeIndex].cost = parseFloat(e.target.value);

      setLocation((prevLocation) => ({
        ...prevLocation,
        charge: updatedChargeArray
      }));
    } else {
      const newCharge = {
        maxweight: max,
        minweight: min,
        cost: parseFloat(e.target.value)
      };

      setLocation((prevLocation) => ({
        ...prevLocation,
        charge: [...prevLocation.charge, newCharge]
      }));
    }
  };

  // Update the location data
  const updateLocation = async () => {
    try {
      const res = await axios.put(`${baseurl}shipping/update/${id}`, location);
      console.log('Update successful:', res.data);
      setNotify(true)
      // Optionally reload the page or navigate to another page
      // window.location.reload();
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const [notify, setNotify] = useState(false)

  return (
    <div className='locationsLocation'>
       { notify && <div className="modaal">
            <div className="child">
                <p>Updated Succefully!</p>
            </div>
        </div>}
      <div className="heading">Edit Location</div>
      <form className="myformlocation">
        <div className="inputTop">
          <input
            placeholder='Location Name'
            id='location'
            onChange={handleChange}
            value={location.location}
            type="text"
          />
        </div>
        <div className="inputBottom">
          <div className="headingupper">Location Fees</div>
          <div className="headingd"></div>
          <div className="lowerdata">
            {[...Array(9)].map((_, index) => {
              const existingCharge = location.charge.find(
                (charge) => charge.minweight === index + 1 && charge.maxweight === index + 2
              );

              return (
                <div key={index} className="singleitemlocation">
                  <div className="range">{`${index + 1} - ${index + 2}KGs`}</div>
                  <div className="fees">
                    <input
                      onChange={(e) => handleCostChange(e, index + 2, index + 1)}
                      type="number"
                      value={existingCharge ? existingCharge.cost : ''}
                    />
                  </div>
                </div>
              );
            })}

            {[...Array(58)].map((_, index) => {
              const existingCharge = location.charge.find(
                (charge) => charge.minweight === 10 + index * 5 && charge.maxweight === 15 + index * 5
              );

              return (
                <div key={index} className="singleitemlocation">
                  <div className="range">{`${10 + index * 5} - ${15 + index * 5}KGs`}</div>
                  <div className="fees">
                    <input
                      onChange={(e) => handleCostChange(e, 15 + index * 5, 10 + index * 5)}
                      type="number"
                      value={existingCharge ? existingCharge.cost : ''}
                    />
                  </div>
                </div>
              );
            })}

            {[...Array(10)].map((_, index) => {
              const existingCharge = location.charge.find(
                (charge) => charge.minweight === 300 + index * 10 && charge.maxweight === 310 + index * 10
              );

              return (
                <div key={index} className="singleitemlocation">
                  <div className="range">{`${300 + index * 10} - ${310 + index * 10}KGs`}</div>
                  <div className="fees">
                    <input
                      onChange={(e) => handleCostChange(e, 310 + index * 10, 300 + index * 10)}
                      type="number"
                      value={existingCharge ? existingCharge.cost : ''}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <span className='button' onClick={updateLocation}>Update Location</span>
      </form>
    </div>
  );
};

export default EditLocationPage;
