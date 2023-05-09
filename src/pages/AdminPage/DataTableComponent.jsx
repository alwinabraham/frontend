import React from 'react'
import DataTable from 'react-data-table-component'

const DataTableComponent = ({data}) => {
    const columns =[
        {
            name:"Date",
            selector:row=>row.date
        },
        {
            name:"Posts",
            selector:row=>row.count
        }
    ];

  return (
    <div >
        <DataTable columns={columns} data={data}>
        </DataTable>
    </div>
  )
}

export default DataTableComponent