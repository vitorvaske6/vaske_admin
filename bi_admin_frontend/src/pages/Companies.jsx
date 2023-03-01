import React, { useEffect, useMemo, useRef, useState } from 'react'

//import { companiesData, companiesGrid } from '../data/dummy';
import { EmployeeInfo, Header, Datatable, Button, Search, Loading, CompaniesCRUD } from '../components'
import { getElementByID } from '@syncfusion/ej2/maps';
import { eventClick } from '@syncfusion/ej2-react-schedule';
import axios from 'axios';
import env from 'react-dotenv';
import { useStateContext } from '../contexts/ContextProvider';
import { format } from 'date-fns'
import Icon from '@material-ui/icons/Apps';
import LongMenu from '../components/material-ui/LongMenu'
import { FiSearch } from 'react-icons/fi';
import DataTable from 'react-data-table-component';
import hexToRgba from 'hex-to-rgba';
import DatatableTheme from '../components/datatable/DatatableTheme';
import CompanyInfo from '../components/CompanyInfo';

const DatatableEmpty = props => (
  <div className='grid grid-cols-1 grid-rows-2 place-items-center bg-white rounded-sm w-full p-4'>
    <Header category={props.headerMessage} />
    <Button customClassName={'h-[40px]'} size={'text-[12px]'} color="white" padding={'p-1'} bgColor={props.currentColor} text="Novo Relatório" borderRadius="5px" width="w-[120px]" />
  </div>
);


const Companies = () => {
  const [errorMessage, setErrorMessage] = useState()
  const { ServerEndpoint, currentMode, currentColor, handleUserDetailsObject, handleCompanyDetailsObject, handleProfileDetailsObject, companiesLoaded, setCompaniesLoaded, companiesData, setCompaniesData } = useStateContext()
  const [filterText, setFilterText] = useState('');
  const [loadedData, setLoadedData] = useState(companiesLoaded)
  const [showCrud, setShowCrud] = useState(false)
  const [crudData, setCrudData] = useState({})
  const [showInfo, setShowInfo] = useState(false)
  const [showInfoEditMode, setShowInfoEditMode] = useState(false)
  const [infoData, setInfoData] = useState({})

  const handleAction = (data, option ) => {
    //console.log(data, option)
    openCompanyInfo(data, option)
    // setShowCrud(true)
    // setCrudData(data)
  }



  useEffect(() => {
    loadCompaniesHandler();
  }, [])

  const loadCompaniesHandler = async () => {
    try {
      await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/companies/`, {
        withCredentials: true,
      }
      ).then(res => [companiesDataHandler(res.data), setCompaniesLoaded(true)])

    } catch (e) {
      ////console.log(e)
      setErrorMessage(e.message);
    }
  }

  const companiesDataHandler = (data) => {
    let allData = []

    data.map((item, index) => {
      
      let companyDepartments = []
      item.companyDepartments.map((department, index) => {
        companyDepartments.push(handleCompanyDetailsObject(department, { _id: 0, name: "Nenhum" }, 'companies', 'departments'))
      })

      let companyProfiles = []
      item.companyProfiles.map((profile, index) => {
        companyProfiles.push(handleProfileDetailsObject(profile, { _id: 0, name: "Master" }, 'profiles', 'profiles'))
      })

      let current = {
        _id: item._id,
        cnpjCpf: item.cnpjCpf,
        corporateName: item.corporateName,
        fantasyName: item.fantasyName,
        active: item.active,
        createdAt: format(new Date(item.createdAt), 'dd/mm/yyyy'),
        updatedAt: format(new Date(item.updatedAt), 'dd/mm/yyyy'),
        createdBy: handleUserDetailsObject(item.createdBy, { _id: 0, login: "Master" }, 'users'),
        companyType: handleCompanyDetailsObject(item.companyType, { _id: 0, name: "Nenhum" }, 'companies', 'types'),
        companyGroup: handleCompanyDetailsObject(item.companyGroup, { _id: 0, name: "Nenhum" }, 'companies', 'groups'),
        companyDepartments: companyDepartments,
        companyProfiles: companyProfiles,
      }

      allData.push(current)
    })
    //console.log("allData", allData)

    setCompaniesData(allData)

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
      name: 'CNPJ / CPF',
      selector: row => row.cnpjCpf,
      sortable: true,
    },
    {
      name: 'Razão Social',
      selector: row => row.corporateName,
      sortable: true,
    },
    {
      name: 'Nome Fantasia',
      selector: row => row.fantasyName,
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
      name: 'Tipo',
      selector: row => row.companyType.name,
      sortable: true,
    },
    {
      name: 'Grupo',
      selector: row => row.companyGroup.name,
      sortable: true,
    },
    {
      name: <LongMenu size="small" options={['Novo', 'Exportar para CSV', 'Exportar para Excel']} handleAction={handleAction} />,
      cell: row => <LongMenu size="small" row={row} options={['Editar', 'Excluir']} handleAction={handleAction} />,
      allowOverflow: true,
      button: true,
      width: '56px',
    },
  ];

  const detailedOptions = ['Editar', 'Excluir']

  const detailedColumns = [
    {
      field: "Departamentos",
      itemName: "_id",
      data: "companyDepartments",
      columns: [
        {
          name: 'Departamentos',
          selector: row => handleCompanyDetailsObject(row, { _id: 0, name: "Nenhum" }, 'companies', 'departments').name,
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
      field: "Perfis",
      itemName: "_id",
      data: "companyProfiles",
      columns: [
        {
          name: 'Perfis',
          selector: row => handleProfileDetailsObject(row, { _id: 0, name: "Master" }, 'profiles', 'profiles').name,
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


  const openCompanyInfo = (data, option = '') => {
    if(option === 'Editar' || option === 'Novo'){
      setShowInfoEditMode(true)
    }
    else{
      setShowInfoEditMode(false)
    }
    setShowInfo(true)
    setInfoData(data)
  }

  const handleDetailedAction = (option, data) => {
    //console.log(option, data)

    openCompanyInfo(data, option)
  }

  if (companiesData === undefined) {
    return <Loading />
  }

  const filteredData = companiesData.filter(item => `${item.cnpjCpf} ${item.fantasyName} ${item.corporateName}` && `${item.cnpjCpf} ${item.fantasyName} ${item.corporateName}`.toLowerCase().includes(filterText.toLowerCase()))

  return (
    <div className='m-2 md:m-2 p-2 md:p-2 h-[80vh]'>
      {/* {showCrud && (<CompaniesCRUD showModal={showCrud} closeModal={setShowCrud} data={crudData} />)} */}
      {showInfo && (<CompanyInfo showModal={showInfo} closeModal={setShowInfo} data={infoData}  detailedColumns={detailedColumns} isEditMode={showInfoEditMode}/>)}
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
          loading={companiesLoaded}
          filterField={['name', 'surname']}
          filterText={filterText}
          setFilterText={setFilterText}
          enableSubHeader={true}
          NoDataComponent={DatatableEmpty}
          handleDetailedAction={handleDetailedAction}
          detailedRow={openCompanyInfo}
          handleAction={handleAction}
        //filterModel={item => `${item.name} ${item.surname}` && `${item.name} ${item.surname}`.toLowerCase().includes(filterText.toLowerCase())}
        />

      </div>
      {/* {props.columnDirective === 'employee' && itemInfoOpen && itemInfo !== undefined && (<EmployeeInfo companiesInfo={itemInfo} showModalProp={true} setCompaniesInfoOpen={setItemInfoOpen} setCompaniesInfo={setItemInfo} />)} */}

    </div>
  )
}



export default Companies