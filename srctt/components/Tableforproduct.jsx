import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './tableforproduct.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';



const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MWK',
  }).format(value);
};

const columns = [
  { field: 'id', headerName: 'ID', width: 70, headerClassName: 'bold-header' },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'deepcategoryName', headerName: 'Deep Category', width: 150 },
  { field: 'subcategoryName', headerName: 'Sub Category', width: 150 },
  { field: 'categoryName', headerName: 'Category', width: 150 },
  { field: 'price', headerName: 'Price', width: 200, valueFormatter: (params) => formatCurrency(params.value) },
  { field: 'quantity', headerName: 'Quantity', width: 100 },
  { field: 'brand', headerName: 'Brand', width: 100 },
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
      <span className="edit">
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



export default function DataTable({rowss}) {
  
  return (
    <div style={{ height: 700, width: '100%' }}>
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