import React, { useEffect, useMemo, useRef, useState } from 'react'

//import { reportsData, reportsGrid } from '../data/dummy';
import { ReportInfo, Header, Datatable, Button, Search, Loading, ReportsCRUD } from '../components'
import { getElementByID } from '@syncfusion/ej2/maps';
import { eventClick } from '@syncfusion/ej2-react-schedule';
import axios from 'axios';
import env from 'react-dotenv';
import { useStateContext } from '../contexts/ContextProvider';
import { format } from 'date-fns'
import LongMenu from '../components/material-ui/LongMenu'
import { FiSearch } from 'react-icons/fi';
import DataTable from 'react-data-table-component';
import hexToRgba from 'hex-to-rgba';
import DatatableTheme from '../components/datatable/DatatableTheme';

const DatatableEmpty = props => (
  <div className='grid grid-cols-1 grid-rows-2 place-items-center bg-white rounded-sm w-full p-4'>
    <Header category={props.headerMessage} />
    <Button customClassName={'h-[40px]'} size={'text-[12px]'} color="white" padding={'p-1'} bgColor={props.currentColor} text="Novo Relatório" borderRadius="5px" width="w-[120px]" />
  </div>
);


const Reports = () => {
  const [errorMessage, setErrorMessage] = useState()
  const { ServerEndpoint, currentMode, currentColor, handleUserDetailsObject, handleProfileDetailsObject, reportsLoaded, setReportsLoaded, reportsData, setReportsData } = useStateContext()
  const [filterText, setFilterText] = useState('');
  const [loadedData, setLoadedData] = useState(reportsLoaded)
  const [showCrud, setShowCrud] = useState(false)
  const [crudData, setCrudData] = useState({})
  const [showInfo, setShowInfo] = useState(false)
  const [showInfoEditMode, setShowInfoEditMode] = useState(false)
  const [infoData, setInfoData] = useState({})

  const handleAction = (data, option) => {
    // console.log(data, option)
    // setShowCrud(true)
    // setCrudData(data)
    openReportInfo(data, option)

  }

  const handleDetailedAction = (option, item) => {
    console.log(option, item)

  }

  useEffect(() => {
    loadReportsHandler();
  }, [])

  const loadReportsHandler = async () => {
    try {
      await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/reports/`, {
        withCredentials: true,
      }
      ).then(res => [reportsDataHandler(res.data), setReportsLoaded(true)])

    } catch (e) {
      //console.log(e)
      setErrorMessage(e.message);
    }
  }

  const reportsDataHandler = (data) => {
    let allData = []
    console.log("reportsDataHandler", data)
    data.map((item, index) => {
      let current = {
        _id: item._id,
        name: item.name,
        menuTitle: item.menuTitle,
        active: item.active,
        createdBy: handleUserDetailsObject(item.createdBy, { _id: 0, login: "Master" }, 'users'),
        createdAt: format(new Date(item.createdAt), 'dd/mm/yyyy'),
        updatedAt: format(new Date(item.updatedAt), 'dd/mm/yyyy'),
        description: item.description,
        reportId: item.reportId,
        workspace: item.workspace,

      }
      allData.push(current)
    })
    console.log("allData", allData)

    setReportsData(allData)

  }

  const boolParser = (bool) => {
    if (bool) {
      return 'Sim'
    }
    return 'Não'
  }

  const columns = [
    {
      name: 'ID',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'Nome',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Título do Menu',
      selector: row => row.menuTitle,
      sortable: true,
    },
    {
      name: 'Está ativo',
      selector: row => boolParser(row.active),
      sortable: true,
    },
    {
      name: 'Criado por',
      selector: row => row.createdBy.login,
      sortable: true,
    },
    {
      name: 'Data de Cadastro',
      selector: row => row.createdAt,
      sortable: true,
    },
    {
      name: 'Data de Atualização',
      selector: row => row.updatedAt,
      sortable: true,
    },
    {
      name: 'Descrição',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'ID PowerBI',
      selector: row => row.reportId,
      sortable: true,
    },
    {
      name: 'Woekspace',
      selector: row => row.workspace,
      sortable: true,
    },
    {
      name: <LongMenu size="small" options={['Novo']} handleAction={handleAction} />,
      cell: row => <LongMenu size="small" row={row} options={['Editar', 'Excluir']} handleAction={handleAction} />,
      allowOverflow: true,
      button: true,
      width: '56px',
    },
  ];

  // const detailedOptions = ['Editar', 'Excluir']

  // const detailedColumns = [
  //   {
  //     field: "Grupos",
  //     itemName: "_id",
  //     data: "profileGroups",
  //     columns: [
  //       {
  //         name: 'Grupos',
  //         selector: row => handleProfileDetailsObject(row, { _id: 0, name: "Nenhum" }, 'profiles', 'groups').name,
  //         sortable: true,
  //       },
  //       {
  //         name: <LongMenu size="small" options={['Novo']} handleAction={handleAction} />,
  //         cell: row => <LongMenu size="small" row={row} options={detailedOptions} handleAction={handleAction} />,
  //         allowOverflow: true,
  //         button: true,
  //         width: '56px',
  //       },
  //     ],
  //   },
  //   {
  //     field: "Usuários",
  //     itemName: "_id",
  //     data: "profileUsers",
  //     columns: [

  //       {
  //         name: 'Usuários',
  //         selector: row => handleUserDetailsObject(row, { _id: 0, login: "Nenhum" }, 'users').login,
  //         sortable: true,
  //       },
  //       {
  //         name: <LongMenu size="small" options={['Novo']} handleAction={handleAction} />,
  //         cell: row => <LongMenu size="small" row={row} options={detailedOptions} handleAction={handleAction} />,
  //         allowOverflow: true,
  //         button: true,
  //         width: '56px',
  //       },
  //     ],
  //   },
  //   {
  //     field: "Relatórios",
  //     itemName: "name",
  //     data: "profileReports",
  //     columns: [

  //       {
  //         name: 'Relatórios',
  //         selector: row => row,
  //         sortable: true,
  //       },
  //       {
  //         name: <LongMenu size="small" options={['Novo']} handleAction={handleAction} />,
  //         cell: row => <LongMenu size="small" row={row} options={detailedOptions} handleAction={handleAction} />,
  //         allowOverflow: true,
  //         button: true,
  //         width: '56px',
  //       },
  //     ],
  //   }
  // ]
    

  const openReportInfo = (data, option = '') => {
    //console.log("rodei o teste", data , option)
    if(option === 'Editar' || option === 'Novo'){
      setShowInfoEditMode(true)
    }
    else{
      setShowInfoEditMode(false)
    }
    setShowInfo(true)
    setInfoData(data)
  }

  if (reportsData === undefined) {
    return <Loading />
  }

  const filteredData = reportsData.filter(item => `${item.name} ${item.menuTitle}` && `${item.name} ${item.menuTitle}`.toLowerCase().includes(filterText.toLowerCase()))

  return (
    <div className='m-2 md:m-2 p-2 md:p-2 min-h-[90vh]'>
      {showInfo && (<ReportInfo showModal={showInfo} closeModal={setShowInfo} data={infoData}  
      //detailedColumns={detailedColumns} 
      isEditMode={showInfoEditMode}/>)}

      <Header category={'Cadastros'} title={'Relatórios'} />
      <div className='dark:bg-[#2c303a] rounded-xl pb-4'>

        <Datatable
          key={`datatable-1`}
          category='Cadastros'
          title='Relatórios'
          idKey='_id'
          data={filteredData}
          //detailedColumns={detailedColumns}
          columns={columns}
          columnDirective={'report'}
          loading={reportsLoaded}
          filterField={['name', 'menuTitle']}
          filterText={filterText}
          setFilterText={setFilterText}
          enableSubHeader={true}
          NoDataComponent={DatatableEmpty}
          handleDetailedAction={handleDetailedAction}
          detailedRow={openReportInfo}
        //filterModel={item => `${item.name} ${item.surname}` && `${item.name} ${item.surname}`.toLowerCase().includes(filterText.toLowerCase())}
        />

      </div>
      {/* {props.columnDirective === 'report' && itemInfoOpen && itemInfo !== undefined && (<ReportInfo reportsInfo={itemInfo} showModalProp={true} setReportsInfoOpen={setItemInfoOpen} setReportsInfo={setItemInfo} />)} */}

    </div>
  )
}



export default Reports