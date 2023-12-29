import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './tableforproduct.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHandPointer, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { BeatLoader } from 'react-spinners';
import baseurl from '../ourapi';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';




export default function DeepCategoryTable({rowss}) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: 'bold-header' },
    { field: 'name', headerName: 'Deep Category name', width: 300 },
    { field: 'subcategoryName', headerName: 'Sub Category name', width: 300 },
    { field: 'categoryName', headerName: 'Category name', width: 300 },
    { field: 'view', 
      headerName: 'View', 
      width: 130,
      renderCell: (params) => (
        <span className="view">
          <FontAwesomeIcon icon={faHandPointer} />    
        </span>
        // <button
        //   style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        //   // onClick={() => handleEdit(params.row.id)}
        // >
        //   Edit
        // </button>
      ),
    },
    { field: 'edit', headerName: 'Edit', width: 130,
      renderCell: (params) => (
        <span onClick={()=>setAndOpen(params.row._id,params.row.name)} className="edit">
          <FontAwesomeIcon icon={faPenToSquare} />    
        </span>
      )
    },
    { field: 'delete', headerName: 'Delete', width: 130,
      renderCell: (params) => (
        <span className="delete">
          <FontAwesomeIcon icon={faTrashCan} />    
        </span>
      )
    },
  ];

  
  const [credentials, setCredentials] = useState({
    name: undefined
  })

  const handleChange = (e) => {
    setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
  }

  const [categoryid, setCategoryid] = useState()
  const [categoryname,setCategoryname] = useState()
  const [showForm, setShowForm] = useState(false)

  const setAndOpen = (cid,name) => {
    setShowForm(true)
    setCategoryid(cid)
    setCategoryname(name)
  }

  const process = async () => {
      setLoader(true)
      try{
        if(credentials.name){
          const res = await axios.put(baseurl+"deepcategory/updateDeepcategory/"+categoryid, credentials)
          if(res.data.error){
              setError(true)
              setLoader(false)       
          }else{
            setLoader(false)
            setDone(true)
          }

        }
      }catch(err){

      }
  }

  const closeModal = () => {
    setShowForm(false)
    setCategoryname(undefined)
    setCategoryid(undefined)
    setCredentials((prev) => ({...prev, name: undefined}))
    setLoader(false)
    setDone(false)
    setError(false)
    
  }

  const [loader,setLoader] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState(false)

  const {user} = useContext(AuthContext)
  return (
    <div className='categoriesHome' style={{ height: 700, width: '100%' }}>
      {(showForm && user.username === "Stock Manager") && <div className="editt">
        <div className="insideedit">
          <div className="insideheading">
            <div className="insideword">Edit Deep Category {categoryname}</div>
            <div onClick={()=>closeModal()} className="icon">X</div>
          </div>
          <input type="text" id='name' onChange={handleChange} placeholder={categoryname} className="inputinside" />
          {!(loader || done || error) && <button onClick={()=>process()}>Edit</button>}
          {loader && <div className="loaderbar">
              <BeatLoader color="hsla(42, 89%, 65%, 1)" />
          </div>}
          {done && <div className="loaderbar">
             <FontAwesomeIcon icon={faCheckCircle} />
             Done
          </div>}
          {error && <div className="loaderbar error">
             <FontAwesomeIcon icon={faCircleExclamation} />
             Error, Duplicate Category
          </div>}


        </div>
      </div>}
      <div className="select3edtitle">Products</div>
      <DataGrid
        rows={rowss}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
      />
    </div>
  );
}