import React, { useEffect, useState } from 'react'
import LocationsTable from '../../mypackets/table/LocationsTable'
import baseurl from '../../ourapi'
import axios from 'axios'

const Editlocation = () => {

    const [locations, setLocations] = useState()

    const getlocation = async () => {
        const res = await axios.get(baseurl +"shipping", locations)
        setLocations(res.data)


        if(res.data.location){
        // window.location.reload();
        console.log("Done")
        }
        
      }


      useEffect(()=>{
            getlocation()
      },[])
  return (
    <div>
        {
             locations && <LocationsTable data={locations}/>
        }
    </div>
  )
}

export default Editlocation
