import React, { useCallback, useEffect, useState } from 'react'
import './addpage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faArrowLeft, faBarcode, faCircleInfo, faCloudArrowUp, faLayerGroup, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Editor } from "primereact/editor";
import { useDropzone } from 'react-dropzone';
import { faCheckCircle, faSquare, faSquareCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { BarLoader, BeatLoader, ClipLoader, FadeLoader } from 'react-spinners';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import baseurl from '../../ourapi';
import parse from 'html-react-parser';


export const Editpage = () => {

    //navigation
    const navigation = useNavigate()
    const {id} = useParams() 
    //desription input
    const [description, setDescription] = useState('');
    const [previewImages, setPreviewImages] = useState([]);
    const [Images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false)
    const [product,setProduct] = useState()

    //credetials for product
    const [credetials, setCreditials] = useState({
        name: '',
        details: '',
        searchtem: [],
        brand: undefined,
        material: undefined,
        color: undefined,
        producttype: undefined,
        appearance: undefined,
        price: undefined,
        photos: [],
        quantity: undefined,
        categoryid: undefined,
        subcategoryid: undefined,
        deepcategoryid: undefined,
        discount: undefined,
        weight: undefined,
        disc: true,
        vat: true,
        vatcode: undefined
    })

    const fetchProduct = async () => {
        const fetchedData = await axios.get(baseurl+"product/getsingleproduct/"+id)
        if(fetchedData.data.error === "Internal Server Error"){

        }else{
            const updatedCredentials = updateCredentialsWithFetchedData(credetials, fetchedData.data);

                // Update the state with the new credentials
                setCreditials(updatedCredentials);
                // console.log(updatedCredentials)
        }
        const res = await axios.get(baseurl+"deepcategory/getSingleDeepcategory/"+fetchedData.data.deepcategoryid)
        setDeepCategory(res.data.name)
        console.log(res.data.name)

    }
    useEffect(()=>{
        fetchProduct()
    },[])
    console.log(credetials)
    // Assume this function is used to update credentials with fetched data
    const updateCredentialsWithFetchedData = (currentCredentials, fetchedData) => {
        return {
        ...currentCredentials,
        // Update each field with the corresponding value from fetchedData
        name: fetchedData.name,
        details: fetchedData.details,
        brand: fetchedData.brand,
        searchtem: fetchedData.searchtem,
        material: fetchedData.material,
        color: fetchedData.color,
        producttype: fetchedData.producttype,
        appearance: fetchedData.appearance,
        price: fetchedData.price,
        photos: fetchedData.photos,
        quantity: fetchedData.quantity,
        categoryid: fetchedData.categoryid,
        subcategoryid: fetchedData.subcategoryid,
        deepcategoryid: fetchedData.deepcategoryid,
        discount: fetchedData.discount,
        weight: fetchedData.weight,
        disc: fetchedData.disc,
        vat: fetchedData.vat,
        vatcode: fetchedData.vatcode
        // ... other fields
        };
    };
    console.log(credetials)
    //media upload
    const onDrop = useCallback((acceptedFiles) => {
        // Check if the total number of selected files doesn't exceed 4
        if (previewImages.length + acceptedFiles.length <= 4) {
          const newPreviewImages = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file),
          }));
          setPreviewImages(prevImages => [...prevImages, ...newPreviewImages]);

          //gettingnamesandsize
          // Extract file size and name, and create a new array for images
                    const newImages = newPreviewImages.map(({ size, name, ...rest }) => ({
                        size,
                        name,
                        originalFile: rest,
                    }));
                
                    // Add newImages to images state
                    
                
                    // Create an array of strings with the format: "{size}{name}"
                    const newArray = newImages.map(image => `${image.size}${image.name}`); 
                    setCreditials(prevCredentials => ({
                        ...prevCredentials,
                        photos: [...prevCredentials.photos, ...newArray],
                      }));
        } else {
            alert('You can only select up to 4 files.');
            }
    }, [previewImages]);
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,accept: 'image/*'})

      //css
      const dropzoneStyles = {
        border: '2px dashed #ccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        fontSize: '13px'
      };
      
      const previewContainerStyles = {
        display: 'flex',
        marginTop: '20px',
      };
      
      const previewImageStyles = {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        margin: '0 10px',
        cursor: 'pointer',
      };

      //handle no characters on price
         //habdkle digits only
        const [value, setValue] = useState();
        const handleInputChange = (e) => {
            setValue(e.target.value.replace(/[^0-9]/g, ''));
        };

        //Handle Input
        const handleChange = (e) => {
            setCreditials((prev) => ({...prev, [e.target.id]: e.target.value}))
          }

          //handle description
          useEffect(()=>{
            setCreditials(prevCredentials => ({
                ...prevCredentials,
                details: description,
              }));              
          },[description])

          //handelprice
          useEffect(() => {
            let intValue = undefined;
        
            if (value !== "" && !isNaN(value)) {
                intValue = parseInt(value, 10);
            }
        
            setCreditials(prevCredentials => ({
                ...prevCredentials,
                price: intValue,
            }));
        }, [value]);
        

          //handlediscount
          const [one, setone] = useState(false)
          const [two, settwo] = useState(false)
          const [three, setthree] = useState(false)
          const handleDiscount = (id) => {
            if(id === 10){
                setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    discount: id,
                }));
                setone(true)
                settwo(false)
                setthree(false)
            }else if(id === 15){
                setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    discount: id,
                }));
                setone(false)
                settwo(true)
                setthree(false)
            }else if(id === 20){
                setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    discount: id,
                }));
                setone(false)
                settwo(false)
                setthree(true)
            }
          }
          const handleUnClick = (id) => {
            if(id === 10){
                setone(false)
                setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    discount: null,
                }));
            }else if(id === 15){
                settwo(false)
                setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    discount: null,
                }));
            }else if(id === 20){
                setthree(false)
                setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    discount: null,
                }));
            }
          }
          //HANDLE QUANTITY
            const [valueQ, setValueQ] = useState();
            const handleInputChangeQ = (e) => {
                setValueQ(e.target.value.replace(/[^0-9]/g, ''));
            };
            useEffect(()=>{
                let intValue = undefined;
            
                if (valueQ !== "" && !isNaN(valueQ)) {
                    intValue = parseInt(valueQ, 10);
                }
            
                setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    quantity: intValue,
                }));            
            },[valueQ])

            //HANDLE SEARCH TERMS
            const handleInputSearch = (e) => {
                const value = e.target.value;
                const searchArray = value.split(",");
              
                // If the value ends with a comma, remove the last empty string from the array
                if (value.endsWith(",")) {
                  searchArray.pop();
                }
              
                setCreditials((prevCredentials) => ({
                  ...prevCredentials,
                  searchtem: searchArray,
                }));
              };


              //HNANDEL DEEP CATERGORY SELECTION
              const [deepcategory, setDeepCategory] = useState('')
              const [brand,setBrand] = useState(undefined)
              const [color,setColor] = useState(undefined)
              const [material,setMaterial] = useState(undefined)
              const [type,setType] = useState(undefined)
              const [appearance,setAppearance] = useState(undefined)
              const [deepCategories, setDeepCategories] = useState([])
              const [openDeep,setOpenDeep] = useState(false)
              const [openBrand,setOpenBrand] = useState(false)
              const [selectedCat, setSelectedCat] = useState()
              const handleChangeDeep = async (e) => {
                const term = e.target.value
                setAppearance(false)
                setColor(false)
                setBrand(false)
                setType(false)
                setMaterial(false)
                setDeepCategory(term)
                try{
                    if(term.length >= 1){
                        if(term.length >= 3){
                            const ResdeepCategories = await axios.get(baseurl+"deepcategory/search2/"+term)
                            setDeepCategories(ResdeepCategories.data)
                            setOpenDeep(true)
                        }
                    }else{
                        setOpenDeep(false)
                        setDeepCategories([])
                        setCreditials(prevCredentials => ({
                            ...prevCredentials,
                            deepcategoryid: undefined,
                          }));
                          //subcatego
                          setCreditials(prevCredentials => ({
                            ...prevCredentials,
                            subcategoryid: undefined,
                          }));

                          //category
                          setCreditials(prevCredentials => ({
                            ...prevCredentials,
                            categoryid: undefined,
                          }));
                    }
                }catch(err){

                }
              }
              const setActiveDeep = (cat) => {
                setSelectedCat(cat)
                setOpenDeep(false)
                setDeepCategory(cat.name)
                setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    deepcategoryid: cat._id,
                  })); 
                //subcatego
                setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    subcategoryid: cat.subcategoryid,
                  }));

                  //category
                  setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    categoryid: cat.categoryyid,
                  }));
              }

              //handle brand
              const setSelectedBrand = (term) => {
                setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    brand: term,
                  })); 
                  setOpenBrand(false)
              }

              //handle color
              const [openColor, setOpenColor] = useState(false)
              const setSelectedColor = (term) => {
                setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    color: term,
                  })); 
                  setOpenColor(false)
              }

              //handle material
              const [openMaterial, setOpenMaterial] = useState(false)
              const setSelectedMaterial = (term) => {
                setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    material: term,
                  })); 
                  setOpenMaterial(false)
              }

              //handle appearance
              const [openAppearance, setOpenAppearance] = useState(false)
              const setSelectedAppearance = (term) => {
                setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    appearance: term,
                  })); 
                  setOpenAppearance(false)
              }

              //HANDLE CHANGE TYPE
              const [openType, setOpenType] = useState(false)
              const setSelectedType = (term) => {
                setCreditials(prevCredentials => ({
                    ...prevCredentials,
                    producttype: term,
                  })); 
                  setOpenType(false)
              }

              //HANDLE CHANGE WEIGHT
                const [valuew, setValuew] = useState();
                const handleInputChangew = (e) => {
                    setValuew(e.target.value.replace(/[^0-9]/g, ''));
                };
                useEffect(()=>{
                    let intValue = undefined;
                
                    if (valuew !== "" && !isNaN(valuew)) {
                        intValue = parseInt(valuew, 10);
                    }
                
                    setCreditials(prevCredentials => ({
                        ...prevCredentials,
                        weight: intValue,
                    }));                 
                },[valuew])


        //handling empty input
        //start with title
        const [isTitle, setIsTitle] = useState(false)
        useEffect(()=>{
            if(credetials.name?.length >= 0){
                setIsTitle(false)
            }
        },[credetials.name])
        //desctrpyoon
        const [isDesc, setIsDesc] = useState(false)
        useEffect(()=>{
            if(credetials.details?.length >= 0){
                setIsDesc(false)
            }
        },[credetials.details])

        //media
        const [isMedia, setIsMedia] = useState(false)
        useEffect(()=>{
            if(credetials.photos?.length >= 0){
                setIsMedia(false)
            }
        },[credetials.photos])

        //price
        const [isPrice, setIsPrice] = useState(false)
        useEffect(()=>{
            if(credetials?.price){
                setIsPrice(false)
            }
        },[credetials.price])

         //quantity
         const [isQuantity, setIsQuantity] = useState(false)
         useEffect(()=>{
             if(credetials?.quantity){
                 setIsQuantity(false)
             }
         },[credetials.quantity])

         //deep category
         const [isDeep, setIsDeep] = useState(false)
         useEffect(()=>{
             if(credetials?.deepcategoryid){
                 setIsDeep(false)
             }
         },[credetials.deepcategoryid])

         //weight
         //deep category
         const [isWeight, setIsWeight] = useState(false)
         useEffect(()=>{
             if(credetials?.weight){
                 setIsWeight(false)
             }
         },[credetials.weight])

         //continue funtion
        const onContinue = async () => {
            setLOader(true)
            if (credetials?.name?.length <= 0) {
                setIsTitle(true);
            }else{
                //description
                if (credetials?.details === null || credetials?.details === "") {
                    setIsDesc(true);
                }else{
                     //media
                     if (credetials?.photos?.length == 10) {
                        setIsMedia(true);
                        //media
                    }else{
                         //price
                        if (!credetials?.price) {
                            setIsPrice(true);
                        }else{
                            //quantity
                            if(!credetials?.quantity){
                                setIsQuantity(true)
                            }else{
                                //deepcategory
                                if(!credetials?.deepcategoryid){
                                    setIsDeep(true)
                                }else{
                                    //weight
                                    if(!credetials?.weight){
                                        setIsWeight(true)
                                    }else{
                                        try{
                                            const res = await axios.put(baseurl+"product/update/"+id, credetials)
                                            // console.log({data: credetials})
                                            // setLOader(false)
                                            window.location.href = 'https://jiabaili.shop/viewproduct/'+id;
                                        }catch(err){
                                            setLOader(true)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }         
        }
        // console.log(previewImages)
        const uttl = "https://api.jiabaili.shop/uploadd"
        //upload images
        const handleUpload = async () => {
            setUploading(true)
            try {
                for (const image of previewImages) {
                    const formData = new FormData();
                    formData.append('zola', image);
        
                    const response = await fetch(uttl, {
                        method: 'POST',
                        body: formData,
                    });
        
                    if (response.ok) {
                        setUploading(false)
                    } else {
                        // console.error('Failed to upload image.');
                    }
                }
        
                console.log('All images uploaded successfully!');
            } catch (error) {
                console.error('Error uploading images:', error);
            }
        };
        

        useEffect(()=>{
            if(previewImages.length >= 1){
                handleUpload()
            }
        },[previewImages]) 
        const [loader,setLOader] = useState(false)    
        
        const [selectedPickToEdit, setselectedpic] = useState("")

        const deletePic = (img) => {
            const updatedPhotos = credetials.photos.filter(photo => photo !== img);
            setCreditials({ ...credetials, photos: updatedPhotos });
        };


        //handle disc
        const handleDisc = (item) => {
            setCreditials((prev) => ({ ...prev, disc: item }));
            setCreditials((prev) => ({ ...prev, discount: undefined }));
                setone(false)
                settwo(false)
                setthree(false)
          };

        //handle vat
        const handleVat = (item) => {
            setCreditials((prev) => ({ ...prev, vatcode: item }));
          } 
          
  return (
    <div className='addpage'>
        {loader && <div className="loaderb">
            <BeatLoader color="hsla(42, 89%, 65%, 1)" />
        </div>}
        {false && <div className="loading">
            <div className="containerr">
                {true && <><BeatLoader color="hsla(168, 45%, 2%, 1)" />
                Uploading...</>}
                {false && <>
                    <span className='icon'><FontAwesomeIcon icon={faCheckCircle} /></span>
                    <span>Product added</span>
                    <span>Redirecting...</span>
                </>}
            </div>
        </div>}
        <div className="header">
            <div className="icon"><FontAwesomeIcon icon={faArrowLeft} /></div>
            <div className='title'>Edit product</div>
        </div>
        <div className="container">
            <div className="left">
                <div className="productnamedescription">
                    <div className="name">
                        <div className="title">Title</div>
                        {isTitle && <div className="alert">Please fill title</div>}
                        <input id='name' value={credetials?.name} onChange={handleChange} placeholder='Rice cooker' type="text" />
                    </div>
                    <div className="description">
                        <div className="title">Deescription</div>
                        <div className="previewdetails">
                            {credetials.details ? parse(credetials.details) : " "}
                        </div>
                        {isDesc && <div className="alert">Please fill description</div>}
                        <Editor value={description} onTextChange={(e) => setDescription(e.htmlValue)} style={{ height: '150px' }} />
                    </div>
                </div>
                <div className="productnamedescription">
                    <div className="name">
                        <div className="title">Product Images{uploading && <ClipLoader color="#36d7b7" size={10} />}</div> 
                        {isMedia && <div className="alert">Please select photos</div>}
                        <div style={previewContainerStyles}>
                            {credetials.photos.map((image, index) => (
                                <div key={index} className="imageproducts">
                                    {(selectedPickToEdit === image) && <div className="onhoverfada">
                                        <FontAwesomeIcon onClick={()=>deletePic(image)} className='mycan' icon={faTrashCan} />
                                    </div>}
                                        <img
                                            src={"https://api.jiabaili.shop/api/photos/"+image}
                                            alt={`Preview ${index + 1}`}
                                            style={previewImageStyles}
                                            onClick={()=>setselectedpic(image)}
                                        />
                                </div>
                            ))}
                        </div>
                    </div>                  
                </div>
                <div className="productnamedescription">
                    <div className="name">
                        <div className="title">Change Images{uploading && <ClipLoader color="#36d7b7" size={10} />}</div> 
                        {isMedia && <div className="alert">Please select photos</div>}
                        {!(previewImages.length > 0) && <div {...getRootProps()} style={dropzoneStyles}>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                            <p>Drop the files here</p>
                            ) : (
                            <p>Drag and drop some product images here, or click to select files</p>
                            )}
                        </div>}
                        <div style={previewContainerStyles}>
                            {previewImages.map((image, index) => (
                            <img
                                key={index}
                                src={image.preview}
                                alt={`Preview ${index + 1}`}
                                style={previewImageStyles}
                            />
                            ))}
                        </div>
                    </div>                  
                </div>
                <div className="productnamedescription">
                    <div className="name">
                        <div className="title">Price</div>
                        {isPrice && <div className="alert">Please enter price</div>}
                        <div className="pricediv">
                            <span>MWK</span>
                            <input  value={credetials.price} onChange={handleInputChange}  placeholder='100000' type="text" />
                        </div>
                    </div>
                    <div className="description">
                        
                    </div>
                </div>
                <div className="productnamedescription">
                    <div className="name">
                        <div className="title">Discount</div>
                        {isPrice && <div className="alert">Discount</div>}
                        <div className="discount">
                            <div className="item">
                                <div className="icon">{!credetials.disc && <FontAwesomeIcon onClick={()=>handleDisc(true)} icon={faSquare} />}{credetials.disc && <FontAwesomeIcon  icon={faSquareCheck} />}</div>
                                <div className="word">Yes</div>
                            </div>
                            <div className="item">
                                <div className="icon">{credetials.disc && <FontAwesomeIcon onClick={()=>handleDisc(false)} icon={faSquare} />}{!credetials.disc && <FontAwesomeIcon  icon={faSquareCheck} />}</div>
                                <div className="word">No</div>
                            </div>
                        </div>
                        {credetials.disc && <div className="div">Select %</div>}
                        {credetials.discount && <div className="div">Current discount {credetials.discount}%</div>}
                        {credetials.disc && <div className="discount">
                            <div className="item">
                                <div className="icon">{!one && <FontAwesomeIcon onClick={()=>handleDiscount(10)} icon={faSquare} />}{one && <FontAwesomeIcon onClick={()=>handleUnClick(10)} icon={faSquareCheck} />}</div>
                                <div className="word">10</div>
                            </div>
                            
                            <div className="item">
                                <div className="icon">{!two && <FontAwesomeIcon onClick={()=>handleDiscount(15)} icon={faSquare} />}{two && <FontAwesomeIcon onClick={()=>handleUnClick(15)} icon={faSquareCheck} />}</div>
                                <div className="word">15</div>
                            </div>
                            <div className="item">
                                <div className="icon">{!three && <FontAwesomeIcon onClick={()=>handleDiscount(20)} icon={faSquare} />}{three && <FontAwesomeIcon onClick={()=>handleUnClick(20)} icon={faSquareCheck} />}</div>
                                <div className="word">20</div>
                            </div>
                        </div>}

                    </div>
                    <div className="description">
                        
                    </div>
                </div>
                <div className="productnamedescription">
                    <div className="name">
                        <div className="title">VAT</div>
                        {isPrice && <div className="alert">Discount</div>}
                        <div className="discount">
                            <div className="item">
                                <div className="icon">{!(credetials.vatcode === "A") && <FontAwesomeIcon onClick={()=>handleVat("A")} icon={faSquare} />}{(credetials.vatcode === "A") && <FontAwesomeIcon  icon={faSquareCheck} />}</div>
                                <div className="word">A</div>
                            </div>
                            <div className="item">
                                <div className="icon">{!(credetials.vatcode === "B") && <FontAwesomeIcon onClick={()=>handleVat("B")} icon={faSquare} />}{(credetials.vatcode === "B") && <FontAwesomeIcon  icon={faSquareCheck} />}</div>
                                <div className="word">B</div>
                            </div>
                            <div className="item">
                                <div className="icon">{!(credetials.vatcode === "C") && <FontAwesomeIcon onClick={()=>handleVat("C")} icon={faSquare} />}{(credetials.vatcode === "C") && <FontAwesomeIcon  icon={faSquareCheck} />}</div>
                                <div className="word">C</div>
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        
                    </div>
                </div>
                <div className="productnamedescription">
                    <div className="name">
                        <div className="title">Inventory</div>
                        {isQuantity && <div className="alert">Please enter quantity</div>}
                        <div className="pricediv">
                            <span>Quantity</span>
                            <input value={credetials.quantity} onChange={handleInputChangeQ}  placeholder='250' type="text" />
                        </div>
                        <div className="div">Discount</div>
                        <div className="discount">
                            <div className="item">
                                <div className="icon nottick"><FontAwesomeIcon icon={faSquare} /></div>
                                <div className="word continue">
                                    Continue selling when out of stock
                                    This won't affect JiaBaiLi POS. Staff will see a warning, but can complete sales 
                                    when available inventory reaches zero and below
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        
                    </div>
                </div>
                <div className="productnamedescription">
                    <div className="name">
                        <div className="title">Search words</div>
                        <div className="pricediv">
                            <span>Separate by comma</span>
                            <input value={credetials.searchtem.join(',')} onChange={handleInputSearch} placeholder='Rice cooker,rice,mpunga' type="text" />
                        </div>
                        <div className="discount">
                            <div className="item">
                                <div className="icon nottick"><FontAwesomeIcon icon={faCircleInfo} /></div>
                                <div className="word continue">
                                    Terms to be used to match user possible searches on this product
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        
                    </div>
                </div>
            </div>
            <div className="right">
            <div className="productnamedescription">
                    <div className="name">
                        <div className="title">Product category</div>
                        <div className="wordtitle">Deep category</div>
                        {isDeep && <div className="alert1">Please select category</div>}
                        <div className="pricediv">
                            <span><FontAwesomeIcon icon={faLayerGroup} /></span>                         
                            <input value={deepcategory} onChange={handleChangeDeep} placeholder='search deep category' type="text" />
                            {openDeep && <div className="selectionList">
                                <div className="headingList">
                                    <div className="title">Select Deep Category</div>
                                    <div className="icon"><FontAwesomeIcon onClick={()=>setOpenDeep(false)} icon={faXmark} /></div>
                                </div>
                                <div className="containerList">
                                    {
                                        deepCategories.map((cat,index)=>(
                                            <span onClick={()=>setActiveDeep(cat)} key={index}>{cat.name}, {cat.subcategoryName}, {cat.categoryName}</span>
                                        ))
                                    }
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className="description">  
                    </div>
            </div>
            <div className="productnamedescription">
                    <div className="name">
                        <div className="title">Product organisation</div>
                        <div className="wordtitle">Brand</div>
                        <div className="pricediv">
                            <span><FontAwesomeIcon onClick={()=>setOpenBrand(true)} icon={faAngleDown} /></span>                         
                            <input value={credetials.brand} placeholder={credetials.brand || "Select Brand"} type="text" />
                            {openBrand && <div className="selectionList">
                                <div className="headingList">
                                    <div className="title">Select Brand</div>
                                    <div className="icon"><FontAwesomeIcon onClick={()=>setOpenBrand(false)} icon={faXmark} /></div>
                                </div>
                                <div className="containerList">
                                    {
                                        selectedCat?.brand.map((brand,index)=>(
                                            <span onClick={()=>setSelectedBrand(brand)} key={index}>{brand}</span>
                                        ))
                                    }
                                </div>
                            </div>}
                        </div>

                        <div className="wordtitle">Color</div>
                        <div className="pricediv">
                            <span><FontAwesomeIcon onClick={()=>setOpenColor(true)} icon={faAngleDown} /></span>                         
                            <input value={credetials.color} placeholder={credetials.color || "Select Color"} type="text" />
                            {openColor && <div className="selectionList">
                                <div className="headingList">
                                    <div className="title">Select Color</div>
                                    <div className="icon"><FontAwesomeIcon onClick={()=>setOpenColor(false)} icon={faXmark} /></div>
                                </div>
                                <div className="containerList">
                                    {
                                        selectedCat?.color.map((color,index)=>(
                                            <span onClick={()=>setSelectedColor(color)} key={index}>{color}</span>
                                        ))
                                    }
                                </div>
                            </div>}
                        </div>

                        <div className="wordtitle">Material</div>
                        <div className="pricediv">
                            <span><FontAwesomeIcon onClick={()=>setOpenMaterial(true)} icon={faAngleDown} /></span>                         
                            <input value={credetials.material} placeholder={credetials.material || "Select Material"} type="text" />
                            {openMaterial && <div className="selectionList">
                                <div className="headingList">
                                    <div className="title">Select Material</div>
                                    <div className="icon"><FontAwesomeIcon onClick={()=>setOpenMaterial(false)} icon={faXmark} /></div>
                                </div>
                                <div className="containerList">
                                    {
                                        selectedCat?.material.map((material,index)=>(
                                            <span onClick={()=>setSelectedMaterial(material)} key={index}>{material}</span>
                                        ))
                                    }
                                </div>
                            </div>}
                        </div>

                        <div className="wordtitle">Type</div>
                        <div className="pricediv">
                            <span><FontAwesomeIcon onClick={()=>setOpenType(true)} icon={faAngleDown} /></span>                         
                            <input value={credetials.producttype} placeholder={credetials.producttype || "Select Type"} type="text" />
                            {openType && <div className="selectionList">
                                <div className="headingList">
                                    <div className="title">Select Type</div>
                                    <div className="icon"><FontAwesomeIcon onClick={()=>setOpenType(false)} icon={faXmark} /></div>
                                </div>
                                <div className="containerList">
                                    {
                                        selectedCat?.type?.map((type,index)=>(
                                            <span onClick={()=>setSelectedType(type)} key={index}>{type}</span>
                                        ))
                                    }
                                </div>
                            </div>}
                        </div>

                        <div className="wordtitle">Appearance</div>
                        <div className="pricediv">
                            <span><FontAwesomeIcon onClick={()=>setOpenAppearance(true)} icon={faAngleDown} /></span>                         
                            <input value={credetials.appearance} placeholder={credetials.appearance || "Select Appearance"} type="text" />
                            {openAppearance && <div className="selectionList">
                                <div className="headingList">
                                    <div className="title">Select Type</div>
                                    <div className="icon"><FontAwesomeIcon onClick={()=>setOpenAppearance(false)} icon={faXmark} /></div>
                                </div>
                                <div className="containerList">
                                    {
                                        selectedCat?.appearance?.map((app,index)=>(
                                            <span onClick={()=>setSelectedAppearance(app)} key={index}>{app}</span>
                                        ))
                                    }
                                </div>
                            </div>}
                        </div>
                        
                    </div>
                    <div className="description">
                        
                    </div>
            </div>
            <div className="productnamedescription">
                    <div className="name">
                        <div className="title">Shipping</div>
                        <div className="wordtitle">Weight</div>
                        {isWeight && <div className="alert1">Please enter weight</div>}
                        <div className="pricediv">
                            <span>KGs</span>                         
                            <input  value={credetials.weight || ""} onChange={handleInputChangew} placeholder='25' type="text" />
                        </div>
                    </div>
                    <div className="description">  
                    </div>
            </div>
            <div className="productnamedescription">
                    <div className="name">
                        <div className="title">Product ID</div>
                        <div className="buttonn">
                            <span className="icon"><FontAwesomeIcon icon={faBarcode} /></span>
                            <span className="word">{id}</span>
                        </div>
                    </div>
                    <div className="name">
                        <div className="title">Update</div>
                        <div onClick={()=>onContinue()}  className="button">
                            <span className="icon"><FontAwesomeIcon icon={faCloudArrowUp} /></span>
                            <span className="word">Update</span>
                        </div>
                    </div>
                    <div className="description">  
                    </div>
            </div>
            </div>
        </div>
    </div>
  )
}
