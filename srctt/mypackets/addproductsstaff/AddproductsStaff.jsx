import React, { useEffect, useState } from 'react'
import './addproductstaff.scss'
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { faAngleDown, faCheckCircle, faCopyright, faEye, faPalette, faPlus, faRecycle, faTablet, faXmark, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import env from 'react-dotenv';
import baseurl from '../../ourapi';

export const AddproductsStaff = () => {
    const api = baseurl

    const navigate = useNavigate()
    const [category, setCategory] = useState(false)
    const [subCat, setSubCat] = useState(false)
    const [deepCat, setDeepCat] = useState(false)
    const openModel = (name) => {
        if(name === "cat"){
            setCategory(true)
            setSubCat(false)
            setDeepCat(false)
        }
        else if(name === "subcat"){
            setCategory(false)
            setSubCat(true)
            setDeepCat(false)
        }else{
            setCategory(false)
            setSubCat(false)
            setDeepCat(true)
        }
    }
    const closeModel = () => {
            setCategory(false)
            setSubCat(false)
            setDeepCat(false)
            setdeepcategoryname({
                name: "",
                brand: "",
                color: "",
                material: "",
                type: "",
                appearence: ""
              });

            setCategoryId(undefined)
            setsubCategoryId(undefined)
            setCategoryinitial("Select category")
            setsubCategoryinitial("Select sub category")
    }

    //api calls
    //adding category
    const [addCategory, setAddCategory] = useState({
        name: ""
    })
    const handleChangeCategory = (e) => {
        setAddCategory((prev) => ({...prev, [e.target.id]: e.target.value}))
    }
    //add category function
    const [catloading, setCatLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(true)
    const [catDone, setCatDone] = useState(false)
    const [catFailed, setCatFailed] = useState(false)
    const addCategoryFun = async () => {
        setCatDone(false)
        setBtnLoading(false)
        setCatLoading(true)
        try{
            const res = await axios.post(api+"category/addcategory", addCategory)
            setAddCategory((prev) => ({ ...prev, name: "" }));
            setCatLoading(false)
            setCatDone(true)
            setBtnLoading(true)
        }catch(err){
            setCatLoading(false)
            setCatFailed(true)
            setBtnLoading(true)
            console.error('Error:', err.message);
        }

    }
    //close category model on subcategory entry
    const [categorymodal, setCategorymodal] = useState(false)
    const [categorymodal2, setCategorymodal2] = useState(false)
    const [categoryInitial, setCategoryinitial] = useState("Select Category")
    const [categoryid, setCategoryId] = useState(undefined)
    const [Subcategoryname, setSubcategoryname] = useState({
        name: ""
    })
    const handleChangeSubCategory = (e) => {
        setSubcategoryname((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    //getting categories on load
    const [allcategories, setAllCategories] = useState([])
    const getAllCategories = async () => {
        try{
            const res = await axios.get(baseurl+"category/")
            setAllCategories(res.data)
        }catch(err){

        }
    }
    useEffect(()=>{
        getAllCategories()
    },[catDone])

    //onselected category
    const handleSelectedCategory = (id,name) => {
        setCategoryinitial(name)
        setCategoryId(id)
        setCategorymodal(false)
        setsubCategoryinitial("Select sub category")
        setsubCategoryId(undefined)
    }

    //handle post subcategory
    const postSubCategory = async () => {
        const credetials = {
            name: Subcategoryname.name,
            categoryyid: categoryid
        }
        setCatDone(false)
        setBtnLoading(false)
        setCatLoading(true)
        try{
            const res = await axios.post(api+"subcategory/addsubcategory", credetials)
            setSubcategoryname((prev) => ({ ...prev, name: "" }));
            setCatLoading(false)
            setCatDone(true)
            setBtnLoading(true)
            setdeepcategoryname({
                name: "",
                brand: "",
                color: "",
                material: "",
                type: "",
                appearence: ""
              });

            setCategoryId(undefined)
            setsubCategoryId(undefined)
        }catch(err){
            setCatLoading(false)
            setCatFailed(true)
            setBtnLoading(true)
            console.error('Error:', err.message);
            setdeepcategoryname({
                name: "",
                brand: "",
                color: "",
                material: "",
                type: "",
                appearence: ""
              });

            setCategoryId(undefined)
            setsubCategoryId(undefined)
            setCategoryinitial("Select category")
            setsubCategoryinitial("Select sub category")
        }
    }



    //getting all sub-categories on load
    const [allsubcategories, setsubAllCategories] = useState([])
    const getsubAllCategories = async () => {
        try{
            const res = await axios.get(baseurl+"subcategory/specific/"+categoryid)
            setsubAllCategories(res.data)
        }catch(err){

        }
    }
    useEffect(()=>{
        getsubAllCategories()
    },[categoryid])

    //onselected subcategory
    const [subcategoryInitial, setsubCategoryinitial] = useState("Select sub Category")
    const [subcategoryid, setsubCategoryId] = useState(undefined)
    const handleSelectedSubCategory = (id,name) => {
        setsubCategoryinitial(name)
        setsubCategoryId(id)
        setCategorymodal2(false)
    }

    //name entry for deep category
    const [deepcategoryname, setdeepcategoryname] = useState({
        name: "",
        brand: "",
        color: "",
        material: "",
        type: "",
        appearence: "",
    })
    const handleChangedeepCategory = (e) => {
        setdeepcategoryname((prev) => ({...prev, [e.target.id]: e.target.value}))
    }
    
    //posting deepcategory now
    const postDeepCategory = async () => {
        const brandsArray = deepcategoryname?.brand?.split(',');
        const colorArray = deepcategoryname?.color?.split(',');
        const MaterialArray = deepcategoryname?.material?.split(',');
        const TypeArray = deepcategoryname?.type?.split(',');
        const appearanceArray = deepcategoryname?.appearence?.split(',');

        //the body
        const credetials = {
            name: deepcategoryname.name,
            categoryyid: categoryid,
            subcategoryid: subcategoryid,
            brand: brandsArray,
            appearance: appearanceArray,
            type: TypeArray,
            color: colorArray,
            material: MaterialArray
        }
        try{
            const res = await axios.post(api+"deepcategory/adddeepcategory", credetials)
            setSubcategoryname((prev) => ({ ...prev, name: "" }));
            setCatLoading(false)
            setCatDone(true)
            setBtnLoading(true)
            setdeepcategoryname({
                name: "",
                brand: "",
                color: "",
                material: "",
                type: "",
                appearence: ""
              });

            setCategoryId(undefined)
            setsubCategoryId(undefined)
            setCategoryinitial("Select category")
            setsubCategoryinitial("Select sub category")
        }catch(err){
            setCatLoading(false)
            setCatFailed(true)
            setBtnLoading(true)
            console.error('Error:', err.message);
            setdeepcategoryname({
                name: "",
                brand: "",
                color: "",
                material: "",
                type: "",
                appearence: ""
            });
            setCategoryId(undefined)
            setsubCategoryId(undefined)
            setCategoryinitial("Select category")
            setsubCategoryinitial("Select sub category")
        }
    }


    


    
  return (
    <div className='addproductsStaff'>
        <div className="upper">
                <div className="title">Add your products</div>
                <div className="subtitle">Stock the store with all the products we need</div>
                <div className="buttons">
                    <div onClick={()=>navigate("/addproduct/scan/")} className="leftbutton">
                        <span className="icon"><AddOutlinedIcon/></span>
                        <span className="word">Add product</span>
                    </div>
                    <div className="rightbutton">
                        <span className="icon"><CloudDownloadOutlinedIcon/></span>
                        <span className="word">Import product</span>
                    </div>
                </div>
        </div>
        <div className="lower">
                <div className="title">
                    Categories
                </div>
                <div className="subtitle">
                    Edit categories, sub-categories and deep-categories. A requirement for adding products.
                </div>
                <div className="addingbuttons">
                    <div onClick={()=>openModel("cat")} className="rightbutton">
                        <span className="icon"><FontAwesomeIcon icon={faPlus} /></span>
                        <span className="word">Add Category</span>
                    </div>
                    <div onClick={()=>openModel("subcat")} className="rightbutton">
                        <span className="icon"><FontAwesomeIcon icon={faPlus} /></span>
                        <span className="word">Add Sub-category</span>
                    </div>
                    <div onClick={()=>openModel("deepcat")} className="rightbutton">
                        <span className="icon"><FontAwesomeIcon icon={faPlus} /></span>
                        <span className="word">Add Deep-category</span>
                    </div>
                </div>
        </div>
        {category && <div className="addcategory">
            <div className="formcontainer">
                <div className="title">
                    <div className="left">
                        <span className="icon"><AddBoxSharpIcon/></span>
                        <span className="word">Add Category</span>
                    </div>
                    <div className="right">
                        <FontAwesomeIcon onClick={()=>closeModel()} icon={faXmark} />
                    </div>
                </div>
                <div className="formarea">
                    <input type="text" value={addCategory.name} id='name' onChange={handleChangeCategory} placeholder='Enter Category' className="categoryinput" />
                    {btnLoading && <button onClick={()=>addCategoryFun()}>Add</button>}

                    <div className="loader">
                        {catloading && <><BeatLoader color="hsla(168, 45%, 2%, 1)" />
                        Adding please wait...</>}
                        {catDone && <><span className='icon'><FontAwesomeIcon icon={faCheckCircle} /></span>
                        <span className='success'>Category added</span></>}
                        {catFailed && <span className='error'>Failed - Category already exist</span>}
                    </div>
                </div>
            </div>
        </div>}
        {subCat && <div className="addcategory">
            <div className="formcontainer">
                <div className="title">
                    <div className="left">
                        <span className="icon"><AddBoxSharpIcon/></span>
                        <span className="word">Add Sub-Category</span>
                    </div>
                    <div className="right">
                        <FontAwesomeIcon onClick={()=>closeModel()} icon={faXmark} />
                    </div>
                </div>
                <div className="formarea">
                    <input type="text" id='name' value={Subcategoryname.name} onChange={handleChangeSubCategory} placeholder='Enter sub-category' className="categoryinput" />
                    <div className="category">
                        <input readOnly placeholder={categoryInitial}  type="text" />
                        <span><FontAwesomeIcon onClick={()=>setCategorymodal(!categorymodal)} icon={faAngleDown} /></span>
                        {categorymodal && <div className="categorylist">
                            <div className="title">Select Category <FontAwesomeIcon className='closemodal'  onClick={()=>setCategorymodal(!categorymodal)} icon={faXmark} /></div>
                            <div className="catlistarea">
                                {
                                    allcategories.map((cat,name)=>(
                                        <span onClick={()=>handleSelectedCategory(cat._id,cat.name)} key={name}>{cat.name}</span>
                                    ))
                                }
                            </div>
                        </div>}
                    </div>
                    {btnLoading && <button onClick={()=>postSubCategory()}>Add</button>}

                    <div className="loader">
                        {catloading && <><BeatLoader color="hsla(168, 45%, 2%, 1)" />
                        Adding please wait...</>}
                        {catDone && <><span className='icon'><FontAwesomeIcon icon={faCheckCircle} /></span>
                        <span className='success'>Subcategory added</span></>}
                        {catFailed && <span className='error'>Failed - Category already exist</span>}
                    </div>
                    
                </div>
            </div>
        </div>}
        {deepCat && <div className="addcategory">
            <div className="formcontainer">
                <div className="title">
                    <div className="left">
                        <span className="icon"><AddBoxSharpIcon/></span>
                        <span className="word">Add Deep-Category</span>
                    </div>
                    <div className="right">
                        <FontAwesomeIcon onClick={()=>closeModel()} icon={faXmark} />
                    </div>
                </div>
                <div className="formarea">
                    <input type="text" id='name' value={deepcategoryname.name} onChange={handleChangedeepCategory} placeholder='Enter deep-category' className="categoryinput" />
                    <div className="category">
                        <input readOnly placeholder={categoryInitial}  type="text" />
                        <span><FontAwesomeIcon onClick={()=>setCategorymodal(!categorymodal)} icon={faAngleDown} /></span>
                        {categorymodal && <div className="categorylist">
                            <div className="title">Select Category <FontAwesomeIcon className='closemodal'  onClick={()=>setCategorymodal(!categorymodal)} icon={faXmark} /></div>
                            <div className="catlistarea">
                                {
                                    allcategories.map((cat,name)=>(
                                        <span onClick={()=>handleSelectedCategory(cat._id,cat.name)} key={name}>{cat.name}</span>
                                    ))
                                }
                            </div>
                        </div>}
                    </div>
                    <div className="category">
                        <input readOnly placeholder={subcategoryInitial} type="text" />
                        <span><FontAwesomeIcon onClick={()=>setCategorymodal2(!categorymodal2)} icon={faAngleDown} /></span>
                        {categorymodal2 && <div className="categorylist">
                            <div className="title">Select Sub Category <FontAwesomeIcon className='closemodal'  onClick={()=>setCategorymodal2(!categorymodal2)} icon={faXmark} /></div>
                            <div className="catlistarea">
                                {
                                    allsubcategories.map((cat,name)=>(
                                        <span onClick={()=>handleSelectedSubCategory(cat._id,cat.name)} key={name}>{cat.name}</span>
                                    ))
                                }
                            </div>
                        </div>}
                    </div>
                    <div className="category">
                        <span className='comma'><FontAwesomeIcon icon={faCopyright} /></span>
                        <input id='brand' value={deepcategoryname.brand} onChange={handleChangedeepCategory}  placeholder='Brands' type="text" />
                    </div>
                    <div className="category">
                        <span className='comma'><FontAwesomeIcon icon={faPalette} /></span>
                        <input id='color' value={deepcategoryname.color} onChange={handleChangedeepCategory}  placeholder='Colors' type="text" />
                    </div>
                    <div className="category">
                        <span className='comma'><FontAwesomeIcon icon={faRecycle} /></span>
                        <input id='material' value={deepcategoryname.material} onChange={handleChangedeepCategory}  placeholder='Materials' type="text" />
                    </div>
                    <div className="category">
                        <span className='comma'><FontAwesomeIcon icon={faTablet} /></span>
                        <input id='type' value={deepcategoryname.type} onChange={handleChangedeepCategory}  placeholder='Type' type="text" />
                    </div>
                    <div className="category">
                        <span className='comma'><FontAwesomeIcon icon={faEye} /></span>
                        <input id='appearence' value={deepcategoryname.appearence} onChange={handleChangedeepCategory}  placeholder='Appearance' type="text" />
                    </div>  
                    {btnLoading && <button onClick={()=>postDeepCategory()}>Add</button>}

                    <div className="loader">
                        {catloading && <><BeatLoader color="hsla(168, 45%, 2%, 1)" />
                        Adding please wait...</>}
                        {catDone && <><span className='icon'><FontAwesomeIcon icon={faCheckCircle} /></span>
                        <span className='success'>Subcategory added</span></>}
                        {catFailed && <span className='error'>Failed - Category already exist</span>}
                    </div>
                </div>
            </div>
        </div>}
    </div>
  )
}
