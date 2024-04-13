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


  let proallProducts = sessionStorage.getItem('proallproducts');
  let ccat = sessionStorage.getItem('catallproducts');
  let ssubcat = sessionStorage.getItem('suballproducts');
  let deepdeep = sessionStorage.getItem('deepallproducts');

  


  const fetchData = async () => {
    try {
      // Use Promise.all to perform multiple asynchronous actions concurrently
      const [product, cat, subcat, deepcat] = await Promise.all([
        axios.get(baseurl + "product/"),
        axios.get(baseurl + "category/"),
        axios.get(baseurl + "subcategory/"),
        axios.get(baseurl + "deepcategory/"),
      ]);


  
      // Set state after all asynchronous actions are completed
      setProducts(product.data);
      let allProducts = product.data
      sessionStorage.setItem('proallproducts', JSON.stringify(product.data));

      setCategories(cat.data);
      sessionStorage.setItem('catallproducts', JSON.stringify(cat.data));

      setSubCategories(subcat.data);
      sessionStorage.setItem('suballproducts', JSON.stringify(subcat.data));

      setDeepCategories(deepcat.data);
      sessionStorage.setItem('deepallproducts', JSON.stringify(deepcat.data));


      // Fetch additional products in chunks of 3000 until there are no more products
      const additionalProducts = await axios.get(baseurl + "product/again");
      const addData = additionalProducts.data
      const fada = allProducts.concat(addData)

      console.log(fada)


      // Update state and session storage with the new products
      setProducts(fada);
      sessionStorage.setItem('proallproducts', JSON.stringify(fada));

    } catch (error) {
      // Handle errors if any of the requests fail
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    if(proallProducts, ccat, ssubcat, deepdeep){
      setProducts(JSON.parse(proallProducts));
      setDeepCategories(JSON.parse(deepdeep));
      setSubCategories(JSON.parse(ssubcat));
      setCategories(JSON.parse(ccat));
    }else{
      fetchData();
    }
  }, []);

  // console.log(products, deepcategories, subcategories, categories)
  
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
            {(product && products && categories && subcategories && deepcategories) && <DataTable rowss={products} cat={categories} subcat={subcategories} deepcat={deepcategories}/>}
            {(cat && products && categories && subcategories && deepcategories) && <CategoryTable rowss={categories}/>}
            {(subcat && products && categories && subcategories && deepcategories) && <SubCategoryTable rowss={subcategories} cat={categories}/>}
            {(deepcat && products && categories && subcategories && deepcategories) && <DeepCategoryTable rowss={deepcategories} cat={categories} subcat={subcategories}/>}
        </div>
    </div>
  )
}
