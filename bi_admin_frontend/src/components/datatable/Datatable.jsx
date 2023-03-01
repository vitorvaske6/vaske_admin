import React, { useEffect, useMemo, useRef, useState } from 'react'
import DataTable from 'react-data-table-component';
import hexToRgba from 'hex-to-rgba';

//import { itemsData, employeesGrid } from '../data/dummy';

import axios from 'axios';
import env from 'react-dotenv';
import { useStateContext } from '../../contexts/ContextProvider';
import { Button, Header, LongMenu } from '..'
import { FiSearch } from 'react-icons/fi';
import DatatableTheme from './DatatableTheme';
import { Search } from '..'
import { IoMdAddCircleOutline } from 'react-icons/io';



const Datatable = (props) => {
  const [itemInfo, setItemInfo] = useState({})
  const [itemsData, setItemsData] = useState(props.data)
  const [itemInfoOpen, setItemInfoOpen] = useState(false)
  const { currentColor, currentMode, employeesLoaded } = useStateContext();
  const [pending, setPending] = useState(true);
  const ExpandedComponent = ({ data }) => <pre>{DetailedTables(data)}</pre>;

  const paginationComponentOptions = {
    rowsPerPageText: 'Linhas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  const DetailedTables = (data) => {
    const { currentMode } = useStateContext();
    //console.log("props DetailedTables", data, data[`${props.detailedColumns[1].data}`])//, data[`${props.detailedColumns[1].data}`].map(a => a.name))//, props)
    return (
      <div className='flex p-4 border-gray-400 gap-2 bg-slate-100 dark:bg-main-dark-bg'>
        {props.detailedColumns.map((item, index) => (
          <div className='relative w-full'>
            {data[`${item.data}`].length === 0 ? (
              <div key={`${item.data}`} className='bg-white rounded-sm px-6 place-items-center'>
                <span key={`${item.data}`} className='p-2 flex place-items-center'>Não há nada para mostrar <LongMenu size="small" options={['Novo']} handleAction={() => props.handleDetailedAction(item.data, "Novo")} /></span>
              </div>
            ) : (
              <DataTable
                columns={item.columns}
                data={data[`${item.data}`].map(a => a[`${item.itemName}`])}
                highlightOnHover
                pointerOnHover
                //subHeader
                //subHeaderComponent={subHeaderComponentMemo}
                customStyles={currentMode === 'dark' ? DatatableTheme.dark : DatatableTheme.light}
                paginationComponentOptions={paginationComponentOptions}
              />
            )}
          </div>
        ))}
      </div>
    )
  }

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div className='grid grid-cols-[200px] gap-2 content-center grid-rows-1 '>
        <Search customClassName={'mt-1'} width={'full'} filterText={props.filterText} setFilterText={props.setFilterText} />
        {/* grid-cols-[200px_1fr_100px]
         <Button customClassName={'h-[45px]'} size={'[12px]'} color="white" bgColor={currentColor} text="Exportar para CSV" borderRadius="10px" width="50px" /> 
        <Button customClassName={'h-[40px]'} size={'text-[12px]'} color="white" padding={'p-3'} bgColor={currentColor} text="Novo" borderRadius="5px" width="w-[60px]" />*/}
      </div>
    );
  }, [props.filterText, props.setFilterText, currentColor]);

  const noDataComponentMemo = useMemo(() =>{
    return (
      <div className='bg-white rounded-sm px-6 place-items-center'>
          <span className='p-2 flex place-items-center'>Não há nada para mostrar, <span className='underline font-bold ml-1 cursor-pointer' onClick={() => props.handleAction(undefined, "Novo")}>clique aqui para adicionar</span>.
           {/* <LongMenu size="small" options={['Novo']} handleAction={() => props.handleAction(undefined, "Novo")} /> */}
           </span>
        </div>
    )
  }, [props.filterText, props.setFilterText, currentColor])

  return (
    <>

        <DataTable
          key={`datatable-1`}
          columns={props.columns}
          data={props.data}
          //progressPending={pending}
          expandableRows={props.detailedColumns !== undefined ? true : false}
          paginationServer={props.paginationServer !== undefined ? true : false}
          //selectableRows
          //onSelectedRowsChange={handleChange}
          customStyles={currentMode === 'dark' ? DatatableTheme.dark : DatatableTheme.light}
          //theme={currentMode.toLowerCase()}
          highlightOnHover
          pointerOnHover
          pagination
          fixedHeader
          onRowClicked={props.detailedRow !== undefined ? props.detailedRow : false}
          subHeader={props?.enableSubHeader}
          subHeaderComponent={subHeaderComponentMemo}
          noDataComponent={noDataComponentMemo}
          //fixedHeaderScrollHeight="300px"
          //actions={actionsMemo}
          expandableRowsComponent={ExpandedComponent}
          paginationComponentOptions={paginationComponentOptions}
        />
      
    </>
    // <>
    //   <DataTable
    //     key={`datatable-1`}
    //     columns={props.columns}
    //     data={props.data}
    //     //progressPending={pending}
    //     expandableRows={props.detailedColumns !== undefined ? true : false}
    //     paginationServer={props.paginationServer !== undefined ? true : false}
    //     //selectableRows
    //     //onSelectedRowsChange={handleChange}
    //     customStyles={currentMode === 'dark' ?  DatatableTheme.dark : DatatableTheme.light}
    //     //theme={currentMode.toLowerCase()}
    //     highlightOnHover
    //     pointerOnHover
    //     pagination
    //     fixedHeader
    //     onRowClicked={props.detailedRow !== undefined ? props.detailedRow : false}
    //     subHeader={props?.enableSubHeader}
    //     subHeaderComponent={subHeaderComponentMemo}
    //     //fixedHeaderScrollHeight="300px"
    //     //actions={actionsMemo}
    //     expandableRowsComponent={ExpandedComponent}
    //     paginationComponentOptions={paginationComponentOptions}
    //   />


    // </>
  )
}


export default Datatable