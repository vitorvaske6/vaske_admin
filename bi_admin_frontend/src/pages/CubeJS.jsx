import React from 'react'
import { Toolbar, Search, GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, ordersGrid } from '../data/dummy';
import { Header } from '../components'


const CubeJS = () => {
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl h-[80vh]'>
      <Header category='CubeJS' title='Dashboard' />
      
    </div>
  )
}

export default CubeJS