import React, { useEffect, useState } from 'react'
import './tableview.scss'
import DataTable from '../../components/Tableforproduct'
import CategoryTable from '../../components/Tableforcategories'
import axios from 'axios'
import baseurl from '../../ourapi'
import SubCategoryTable from '../../components/TableforSubcategories'
import DeepCategoryTable from '../../components/TableforDeepCategories'

export const TableView = () => {
  const [categories, setCategories] = useState({ id: 1, name: 'Loading...' })
  const [subcategories, setSubCategories] = useState({ id: 1, name: 'Loading...' })
  const [deepcategories,  setDeepCategories] = useState({ id: 1, name: 'Loading...' })
  const [products,  setProducts] = useState({ id: 1, name: 'Loading...' })
  const fetchData = async () => {
    const product = await axios.get(baseurl+"product/")
    setProducts(product.data)
    const cat = await axios.get(baseurl+"category/")
    setCategories(cat.data)
    const subcat = await axios.get(baseurl+"subcategory/")
    setSubCategories(subcat.data)
    const deepcat = await axios.get(baseurl+"deepcategory/")
    setDeepCategories(deepcat.data)

  }
  useEffect(()=>{
    fetchData()
  },[])
  //True or False on what to display
  const [cat,setcat] = useState(false)
  const [subcat,setsubcat] = useState(false)
  const [deepcat,setdeepcat] = useState(false)
  const [product,setproduct] = useState(true)

  const choose = (id) => {
    if(id === "product"){
      setproduct(true)
      setcat(false)
      setdeepcat(false)
      setsubcat(false)
    }else if(id === "cat"){
      setproduct(false)
      setcat(true)
      setdeepcat(false)
      setsubcat(false)
    }else if(id === "sub"){
      setproduct(false)
      setcat(false)
      setdeepcat(false)
      setsubcat(true)
    }else if(id === "deep"){
    setproduct(false)
    setcat(false)
    setdeepcat(true)
    setsubcat(false)
  }
  }

  return (
    <div className='tableview'>
        <div className="upper">
            <div  onClick={()=>choose("product")} className={`products ${product ? "active" : ""}`}>Products</div>
            <div  onClick={()=>choose("cat")} className={`products ${cat ? "active" : ""}`}>Categories</div>
            <div  onClick={()=>choose("sub")} className={`products ${subcat ? "active" : ""}`}>SubCategories</div>
            <div  onClick={()=>choose("deep")} className={`products ${deepcat ? "active" : ""}`}>DeepCategories</div>
        </div>
        <div className="lower">
            {product && <DataTable rowss={products}/>}
            {cat && <CategoryTable rowss={categories}/>}
            {subcat && <SubCategoryTable rowss={subcategories}/>}
            {deepcat && <DeepCategoryTable rowss={deepcategories}/>}
        </div>
    </div>
  )
}
