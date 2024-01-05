import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './tableforproduct.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHandPointer, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
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
        <span onClick={()=>setAndOpen(params.row._id,params.row.name,params.row.subcategoryid,params.row.subcategoryName,params.row.categoryyid)} className="edit">
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
    name: undefined,
    subcategoryid: undefined,
    categoryyid: undefined
  })

  const handleChange = (e) => {
    setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
  }

  const [categories, setCategories] = useState()
  const [item,setitem] = useState()
  const [value,setvalue] = useState("")
  const handleChange2 = async (e) => {
    setitem(e.target.value)
    setvalue(e.target.value)
    if(e.target.value.length >= 3){
      try{
        const ResdeepCategories = await axios.get(baseurl+"subcategory/search2/"+e.target.value)
        setCategories(ResdeepCategories.data)
        setopendeep(true)
      }catch(err){
  
      }
    }
  }
  console.log(categories)

  const [categoryid, setCategoryid] = useState()
  const [categoryname,setCategoryname] = useState()
  const [showForm, setShowForm] = useState(false)
  const [mainCat,setMaincat] = useState()


  const setAndOpen = (cid,name,catgorid,cname,cmid) => {
    setShowForm(true)
    setCategoryid(cid)
    setCategoryname(name)
    setMaincat(cname)
    setCredentials((prev) => ({...prev, subcategoryid: catgorid}))
    setCredentials((prev) => ({...prev, name: name}))
    setCredentials((prev) => ({...prev, categoryyid: cmid}))
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
    setCredentials((prev) => ({...prev, subcategoryid: undefined}))
    setCredentials((prev) => ({...prev, categoryyid: undefined}))
    setLoader(false)
    setDone(false)
    setError(false)
    setvalue("")

    
  }

  const [loader,setLoader] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState(false)

  const {user} = useContext(AuthContext)
  const [openDeep,setopendeep] = useState(false)
  const handleclosing = () => {
    setopendeep(false)
  }
  const setcatdeep = (id,iid,name) => {
    setCredentials((prev) => ({...prev, subcategoryid: id}))
    setCredentials((prev) => ({...prev, categoryyid: iid}))
    setvalue(name)
    setopendeep(false)
  }

  console.log(credentials)
  return (
    <div className='categoriesHome' style={{ height: 700, width: '100%' }}>
      {(showForm && user.username === "Stock Manager") && <div className="editt">
        <div className="insideedit">
          <div className="insideheading">
            <div className="insideword">Edit Deep Category {categoryname}</div>
            <div onClick={()=>closeModal()} className="icon">X</div>
          </div>
          <input type="text" id='name' onChange={handleChange} placeholder={categoryname} className="inputinside" />
          <input value={value} type="text" id='cate' onChange={handleChange2} placeholder={mainCat} className="inputinside" />
          {openDeep && <div className="selectionList">
                                <div className="headingList">
                                    <div className="title">Select Deep Category</div>
                                    <div className="icon"><FontAwesomeIcon onClick={()=>handleclosing()} icon={faXmark} /></div>
                                </div>
                                <div className="containerList">
                                    {
                                        categories.map((cat,index)=>(
                                            <span onClick={()=>setcatdeep(cat._id,cat.categoryyid, cat.name)} key={index}>{cat.name}, {cat.categoryName}</span>
                                        ))
                                    }
                                </div>
                            </div>}
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