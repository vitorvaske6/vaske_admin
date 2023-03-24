import React, { useEffect, useMemo, useRef, useState } from 'react'

//import { employeesData, employeesGrid } from '../data/dummy';
import { EmployeeInfo, Header, Datatable, Button, Search, Loading, EmployeesCRUD } from '../components'
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


const Employees = () => {
  const [errorMessage, setErrorMessage] = useState()
  const { ServerEndpoint, currentMode, currentColor, handleUserDetailsObject, handleProfileDetailsObject, employeesLoaded, setEmployeesLoaded, employeesData, setEmployeesData } = useStateContext()
  const [filterText, setFilterText] = useState('');
  const [loadedData, setLoadedData] = useState(employeesLoaded)
  const [showCrud, setShowCrud] = useState(false)
  const [crudData, setCrudData] = useState({})
  const [showInfo, setShowInfo] = useState(false)
  const [showInfoEditMode, setShowInfoEditMode] = useState(false)
  const [infoData, setInfoData] = useState({})

  const handleAction = (data, option) => {
    // console.log(data, option)
    // setShowCrud(true)
    // setCrudData(data)
    openEmployeeInfo(data, option)

  }

  const handleDetailedAction = (option, item) => {
    console.log(option, item)

  }

  useEffect(() => {
    loadEmployeesHandler();
  }, [])

  const loadEmployeesHandler = async () => {
    try {
      await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/profiles/`, {
        withCredentials: true,
      }
      ).then(res => [employeesDataHandler(res.data), setEmployeesLoaded(true)])

    } catch (e) {
      //console.log(e)
      setErrorMessage(e.message);
    }
  }

  const employeesDataHandler = (data) => {
    let allData = []
    console.log("employeesDataHandler", data)
    data.map((item, index) => {
      let profileGroups = []
      item.profileGroups.map((profileGroup, index) => {
        profileGroups.push(handleProfileDetailsObject(profileGroup, { _id: 0, name: "Nenhum-" }, 'profiles', 'groups'))
      })

      let profileReports = []
      item.profileReports.map((profileReport, index) => {
        profileReports.push(handleProfileDetailsObject(profileReport, { _id: 0, name: "Nenhum-" }, 'reports'))
      })

      let profileUsers = []
      item.profileUsers.map((profileUser, index) => {
        profileUsers.push(handleUserDetailsObject(profileUser, { _id: 0, login: "Master-" }, 'users'))
      })

      let profileAppMenus = []
      item.profileAppMenus.map((appMenu, index) => {
        profileAppMenus.push(handleProfileDetailsObject(appMenu, { _id: 0, title: "Nenhum-" }, 'navigation', 'menusInfo'))
      })

      let profileAppPages = []
      item.profileAppPages.map((appPage, index) => {
        profileAppPages.push(handleProfileDetailsObject(appPage, { _id: 0, name: "Nenhum-" }, 'navigation', 'pagesInfo'))
      })

      let current = {
        _id: item._id,
        name: item.name,
        surname: item.surname,
        active: item.active,
        createdAt: format(new Date(item.createdAt), 'dd/mm/yyyy'),
        updatedAt: format(new Date(item.updatedAt), 'dd/mm/yyyy'),
        createdBy: handleUserDetailsObject(item.createdBy, { _id: 0, login: "Master" }, 'users'),
        profileFunction: handleProfileDetailsObject(item.profileFunction, { _id: 0, name: "Nenhum-" }, 'profiles','functions'),
        profileType: handleProfileDetailsObject(item.profileType, { _id: 0, name: "Nenhum-" }, 'profiles','types'),
        profileGroups: profileGroups,
        profileReports: profileReports,
        profileUsers: profileUsers,
        profileAppMenus: profileAppMenus,
        profileAppPages: profileAppPages,

      }
      allData.push(current)
    })
    console.log("allData", allData)

    setEmployeesData(allData)

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
      selector: row => row.name + " " + row.surname,
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
      name: <LongMenu size="small" options={['Novo']} handleAction={handleAction} />,
      cell: row => <LongMenu size="small" row={row} options={['Editar', 'Excluir']} handleAction={handleAction} />,
      allowOverflow: true,
      button: true,
      width: '56px',
    },
  ];

  const detailedOptions = ['Editar', 'Excluir']

  const detailedColumns = [
    {
      field: "Grupos",
      itemName: "_id",
      data: "profileGroups",
      columns: [
        {
          name: 'Grupos',
          selector: row => handleProfileDetailsObject(row, { _id: 0, name: "Nenhum" }, 'profiles', 'groups').name,
          sortable: true,
        },
        {
          name: <LongMenu size="small" options={['Novo']} handleAction={handleAction} />,
          cell: row => <LongMenu size="small" row={row} options={detailedOptions} handleAction={handleAction} />,
          allowOverflow: true,
          button: true,
          width: '56px',
        },
      ],
    },
    {
      field: "Usuários",
      itemName: "_id",
      data: "profileUsers",
      columns: [

        {
          name: 'Usuários',
          selector: row => handleUserDetailsObject(row, { _id: 0, login: "Nenhum" }, 'users').login,
          sortable: true,
        },
        {
          name: <LongMenu size="small" options={['Novo']} handleAction={handleAction} />,
          cell: row => <LongMenu size="small" row={row} options={detailedOptions} handleAction={handleAction} />,
          allowOverflow: true,
          button: true,
          width: '56px',
        },
      ],
    },
    {
      field: "Relatórios",
      itemName: "name",
      data: "profileReports",
      columns: [

        {
          name: 'Relatórios',
          selector: row => row,
          sortable: true,
        },
        {
          name: <LongMenu size="small" options={['Novo']} handleAction={handleAction} />,
          cell: row => <LongMenu size="small" row={row} options={detailedOptions} handleAction={handleAction} />,
          allowOverflow: true,
          button: true,
          width: '56px',
        },
      ],
    }
  ]
    

  const openEmployeeInfo = (data, option = '') => {
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

  if (employeesData === undefined) {
    return <Loading />
  }

  const filteredData = employeesData.filter(item => `${item.name} ${item.surname}` && `${item.name} ${item.surname}`.toLowerCase().includes(filterText.toLowerCase()))

  return (
    <div className='m-2 md:m-2 p-2 md:p-2 min-h-[90vh]'>
      {showInfo && (<EmployeeInfo showModal={showInfo} closeModal={setShowInfo} data={infoData}  detailedColumns={detailedColumns} isEditMode={showInfoEditMode}/>)}

      <Header category={'Cadastros'} title={'Funcionários'} />
      <div className='dark:bg-[#2c303a] rounded-xl pb-4'>

        <Datatable
          key={`datatable-1`}
          category='Cadastros'
          title='Funcionários'
          idKey='_id'
          data={filteredData}
          detailedColumns={detailedColumns}
          columns={columns}
          columnDirective={'employee'}
          loading={employeesLoaded}
          filterField={['name', 'surname']}
          filterText={filterText}
          setFilterText={setFilterText}
          enableSubHeader={true}
          NoDataComponent={DatatableEmpty}
          handleDetailedAction={handleDetailedAction}
          detailedRow={openEmployeeInfo}
        //filterModel={item => `${item.name} ${item.surname}` && `${item.name} ${item.surname}`.toLowerCase().includes(filterText.toLowerCase())}
        />

      </div>
      {/* {props.columnDirective === 'employee' && itemInfoOpen && itemInfo !== undefined && (<EmployeeInfo employeesInfo={itemInfo} showModalProp={true} setEmployeesInfoOpen={setItemInfoOpen} setEmployeesInfo={setItemInfo} />)} */}

    </div>
  )
}



export default Employees