import React from 'react'
import './addproduct.scss'
import { AddproductsStaff } from '../../mypackets/addproductsstaff/AddproductsStaff'
import { TableView } from '../../mypackets/table/TableView'

export const AddProduct = () => {
  return (
    <div className='addproduct'>
        <div className="heading">Products</div>
        <AddproductsStaff/>
        <div className="heading">View Items</div>
        <TableView/>

    </div>
  )
}
