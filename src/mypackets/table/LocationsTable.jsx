import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './tableview.scss'
import { useNavigate } from 'react-router-dom';



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

export default function LocationsTable({data}) {
    const Navigate = useNavigate()
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'location', headerName: 'Locaion Name', width: 400 },
        {
          field: 'view',
          headerName: 'Edit',
          width: 110,
          renderCell: (params)=> (
             <span className='clicktoeditlocationspan' onClick={()=>Navigate("/edtilacationpage/"+params.row._id)} >Click to edit</span>
          )
        }
      
        
      ];
  return (
    <div style={{ height: 900, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
        }}
        pageSizeOptions={[50, 100]}
        checkboxSelection
      />
    </div>
  );
}
