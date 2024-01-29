import React, { useEffect, useState } from 'react'
import './shopproduct.scss'
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import baseurl from '../../ourapi';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';



const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function Shopproduct() {
  const navigate = useNavigate()

    //in session storage
    let allProducts = sessionStorage.getItem('allproducts');
    let gateway = sessionStorage.getItem('gateway');
    let citymall = sessionStorage.getItem('citymall');
    let website = sessionStorage.getItem('website');
    let hundred = sessionStorage.getItem('hundred');
    let noPhoto = sessionStorage.getItem('nophoto');
    let fiftyGate = sessionStorage.getItem('fiftygate');
    let fiftyCity = sessionStorage.getItem('fiftycity');



    const {id} = useParams() 
    



    const [Data,setData] = useState()
    useEffect(() => {
        // Check if the corresponding session storage value exists before calling getProducts
        switch (id) {
            case '1':
                if (allProducts) {
                    setData(JSON.parse(allProducts));
                } else {
                    getProducts();
                }
                break;
            case '2':
                if (gateway) {
                    setData(JSON.parse(gateway));
                } else {
                    getProducts();
                }
                break;
            case '3':
                if (citymall) {
                    setData(JSON.parse(citymall));
                } else {
                    getProducts();
                }
                break;
            case '4':
                if (website) {
                    setData(JSON.parse(website));
                } else {
                    getProducts();
                }
                break;
            case '5':
                if (hundred) {
                    setData(JSON.parse(hundred));
                } else {
                    getProducts();
                }
                break;
            case '6':
                if (noPhoto) {
                    setData(JSON.parse(noPhoto));
                } else {
                    getProducts();
                }
                break;
            case '7':
                if (fiftyGate) {
                    setData(JSON.parse(fiftyGate));
                } else {
                    getProducts();
                }
                break;
            case '8':
                if (fiftyCity) {
                    setData(JSON.parse(fiftyCity));
                } else {
                    getProducts();
                }
                break;
            default:
                setData(null);
                break;
        }
    }, [id, allProducts, gateway, citymall, website, hundred, noPhoto, fiftyGate, fiftyCity]);


    const getProducts = async () => {
        const res = await axios.get(baseurl+"product/productspower/"+id)
        setData(res.data)
        if(id == 1){
          sessionStorage.setItem('allproducts', JSON.stringify(res.data));
        }else if(id == 2){
          sessionStorage.setItem('gateway', JSON.stringify(res.data));
        }else if(id == 3){
            sessionStorage.setItem('citymall', JSON.stringify(res.data));
        }else if(id == 4){
            sessionStorage.setItem('website', JSON.stringify(res.data));
        }else if(id == 5){
            sessionStorage.setItem('hundred', JSON.stringify(res.data));
        }else if(id == 6){
            sessionStorage.setItem('nophoto', JSON.stringify(res.data));
        }else if(id == 7){
            sessionStorage.setItem('fiftygate', JSON.stringify(res.data));
        }else if(id == 8){
            sessionStorage.setItem('fiftycity', JSON.stringify(res.data));
        }
    }
    useEffect(()=>{
        getProducts()
    },[])




    console.log(id)
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Product Name', width: 230 },
        { field: 'price', headerName: 'Price (MWK)', type:'number', width: 130 },
        {
          field: 'gateway',
          headerName: 'Gateway QTY',
          type: 'number',
          width: 130,
        },
        {
          field: 'citymall',
          headerName: 'Citymall QTY',
          type: 'number',
          width: 130,
        },
        {
          field: 'warehouse',
          headerName: 'Warehouse QTY',
          type: 'number',
          width: 130,
          valueGetter: (params) => {
              // Calculate the difference: quantity - (gateway + citymall)
              const quantity = params.row.quantity || 0;
              const gateway = params.row.gateway || 0;
              const citymall = params.row.citymall || 0;
              return quantity - (gateway + citymall);
          },
        },
        {
          field: 'quantity',
          headerName: 'Total',
          type: 'number',
          width: 130,
        },
        { field: 'barcode', headerName: 'Barcode', width: 230 },
        {
          field: 'edit',
          headerName: 'Edit',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 230,
          renderCell: (params) => (
              <span className="edit" onClick={()=>navigate("/addproduct/editpage/"+params.row._id)}>
                <FontAwesomeIcon icon={faPenToSquare} />    
              </span>
            )
        },

      ];
  return (
    <div className="shopd">
        {!Data && <ClipLoader color="#36d7b7" />}
        {Data && <div className="shopupper">
            {Data.owner}
        </div>}
        {Data && <div className="shoplower">
        <div className='tableshop' style={{ height: 800, width: '100%' }}>
            <DataGrid
                rows={Data.products}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 20 },
                },
                }}
                pageSizeOptions={[20, 40]}
                checkboxSelection
            />
    </div>
        </div>}

    </div>
    
  );
}




