import React, { useEffect, useMemo, useRef, useState } from 'react'

//import { menusData, menusGrid } from '../data/dummy';
import { MenuInfo, Header, Datatable, Button, Search, Loading } from '../components'
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


const Menus = () => {
  const [errorMessage, setErrorMessage] = useState()
  const { ServerEndpoint, currentMode, currentColor, handleUserDetailsObject } = useStateContext()
  const [filterText, setFilterText] = useState('');
  const [loadedData, setLoadedData] = useState(false)
  const [showCrud, setShowCrud] = useState(false)
  const [crudData, setCrudData] = useState({})
  const [showInfo, setShowInfo] = useState(false)
  const [showInfoEditMode, setShowInfoEditMode] = useState(false)
  const [infoData, setInfoData] = useState({})
  const [menusData, setMenusData] = useState(undefined)
  const [menuGroupsData, setMenuGroupsData] = useState(undefined)
  const [pagesData, setPagesData] = useState(undefined)

  const handleAction = (data, option) => {
    openMenuInfo(data, option)
  }

  const handleDetailedAction = (option, item) => {
    console.log(option, item)

  }

  useEffect(() => {
    loadMenusHandler();
  }, [])

  const loadMenusHandler = async () => {
    try {
      await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/appMenus/`, {
        withCredentials: true,
      }
      ).then(res => [menusDataHandler(res.data)])
    } catch (e) {
      //console.log(e)
      setErrorMessage(e.message);
    }
  }

  const menusDataHandler = (data) => {
    let menus = data.menusInfo
    let menuGroups = data.menuGroupsInfo
    let pages = data.pagesInfo

    menuGroups.forEach(menuGroup => {
      const newPages = menuGroup.links.map((_id) => pages.find((el) => el._id === _id));
      const createdBy = handleUserDetailsObject(menuGroup.createdBy, { _id: 0, login: "Master" }, 'users')
      menuGroup.links = newPages
      menuGroup.createdBy = createdBy
    });

    menus.forEach(menu => {
      const newGroups = menu.groups.map((_id) => menuGroups.find((el) => el._id === _id));
      const createdBy = handleUserDetailsObject(menu.createdBy, { _id: 0, login: "Master" }, 'users')
      menu.groups = newGroups
      menu.createdBy = createdBy
    });

    pages.forEach(page => {
      const createdBy = handleUserDetailsObject(page.createdBy, { _id: 0, login: "Master" }, 'users')
      page.createdBy = createdBy
    });

    setMenusData(menus)
    setMenuGroupsData(menuGroups)
    setPagesData(pages)
    setLoadedData(true)
    console.log({menus,menuGroups,pages})
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
      name: 'Título',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Grupos Habilitados',
      selector: row => boolParser(row.groupEnabled),
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
      itemName: "groupTitle",
      data: "groups",
      columns: [
        {
          name: 'Grupos',
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
    },
  ]
    

  const openMenuInfo = (data, option = '') => {
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

  if (menusData === undefined) {
    return <Loading />
  }

  const filteredData = menusData.filter(item => `${item.title}` && `${item.title}`.toLowerCase().includes(filterText.toLowerCase()))

  return (
    <div className='m-2 md:m-2 p-2 md:p-2 min-h-[90vh]'>
      {showInfo && (<MenuInfo showModal={showInfo} closeModal={setShowInfo} data={infoData}  detailedColumns={detailedColumns} isEditMode={showInfoEditMode}/>)}

      <Header category={'Cadastros'} title={'Menus'} />
      <div className='dark:bg-[#2c303a] rounded-xl pb-4'>

        <Datatable
          key={`datatable-1`}
          category='Cadastros'
          title='Menus'
          idKey='_id'
          data={filteredData}
          detailedColumns={detailedColumns}
          columns={columns}
          columnDirective={'menu'}
          loading={loadedData}
          filterField={['title']}
          filterText={filterText}
          setFilterText={setFilterText}
          enableSubHeader={true}
          NoDataComponent={DatatableEmpty}
          handleDetailedAction={handleDetailedAction}
          detailedRow={openMenuInfo}
        //filterModel={item => `${item.name} ${item.surname}` && `${item.name} ${item.surname}`.toLowerCase().includes(filterText.toLowerCase())}
        />

      </div>
      {/* {props.columnDirective === 'menu' && itemInfoOpen && itemInfo !== undefined && (<MenuInfo menusInfo={itemInfo} showModalProp={true} setMenusInfoOpen={setItemInfoOpen} setMenusInfo={setItemInfo} />)} */}

    </div>
  )
}



export default Menus