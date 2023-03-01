import { Button, Datatable, DropdownList, Loading, Logo, TextInput } from './';
import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';
import { checkDrop } from '../data/dummy'
import { AiOutlineClose } from 'react-icons/ai';
import Header from './Header';
import dummyPicture from '../data/avatar2.jpg'
import DataTable from 'react-data-table-component';
import DatatableTheme from './datatable/DatatableTheme';

const EmployeeInputDefault = {
    _id: "",
    name: "",
    surname: "",
    active: true,
    profileGroups: undefined,
    profileType: "",
    profileFunction: "",
    profileReports: undefined,
    profileUsers: undefined,
    profileAppMenus: undefined,
    profileAppPages: undefined
}


const EmployeeInfo = (props) => {
    const { normalizeObjectToId, appData, currentMode, currentColor, ddProfileFunctionsParams, ddUsersParams, ddProfileTypesParams, ddProfileGroupsParams, ddEmployeeGroupsParams, ddEmployeeTypesParams, ddEmployeeReportsParams } = useStateContext()
    const [showModal, setShowModal] = useState(props.showModalProp);
    const [employeeInput, setEmployeeInput] = useState()
    const [loginError, setLoginError] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState('employee')
    const [employeeReports, setEmployeeReports] = useState([])
    const [employeeUsers, setEmployeeUsers] = useState([])
    const [employeeGroups, setEmployeeGroups] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)
    const [buttonEditMode, setButtonEditMode] = useState('Alterar')
    const [title, setTitle] = useState(`Cadastrar Funcionário`)
    console.log("employeeInput-----------", employeeInput)
    useEffect(() => {
        handleLoad();
        handleDetailedColumnsMenus();

        if (props.isEditMode !== undefined) {
            setIsEditMode(props.isEditMode)
        }

    }, [])


    const handleSubmit = (isUpdate) => {
        let finalInput = { ...employeeInput }

        finalInput.profileFunction = normalizeObjectToId(finalInput.profileFunction)
        finalInput.profileType = normalizeObjectToId(finalInput.profileType)

        finalInput.profileGroups = normalizeObjectToId(finalInput.profileGroups)
        finalInput.profileReports = normalizeObjectToId(finalInput.profileReports)
        finalInput.profileUsers = normalizeObjectToId(finalInput.profileUsers)
        finalInput.profileAppMenus = normalizeObjectToId(finalInput.profileAppMenus)
        finalInput.profileAppPages = normalizeObjectToId(finalInput.profileAppPages)


        delete finalInput.createdBy
        delete finalInput.updatedAt
        delete finalInput.createdAt

        console.log("------------" , finalInput, employeeInput)
        // finalInput.companyDepartments = [{}]

        onSubmit(finalInput);
    }

    const handleEditSave = () => {
        if (buttonEditMode === 'Alterar') {
            setIsEditMode(true)
            setButtonEditMode("Salvar")

        }
        if (buttonEditMode === 'Salvar') {
            handleSubmit()
            setIsEditMode(false)
            setButtonEditMode("Alterar")
        }
    }

    const handleDetailedColumnsMenus = () => {
        let reports = props.detailedColumns.filter((item) => item.field === 'Relatórios')[0]
        let users = props.detailedColumns.filter((item) => item.field === 'Usuários')[0]
        let groups = props.detailedColumns.filter((item) => item.field === 'Grupos')[0]
        setEmployeeReports(reports);
        setEmployeeUsers(users);
        setEmployeeGroups(groups);
    }


    async function onSubmit(values) {

        try {
            if (buttonEditMode === 'Cadastrar') {
                await axios.post(
                    `${process.env.REACT_APP_SERVER_ENDPOINT}/api/profiles/`,
                    values,
                    { withCredentials: true }
                ).then(res => [console.log(res)])
            } 

            if (buttonEditMode === 'Salvar') {
                await axios.put(
                    `${process.env.REACT_APP_SERVER_ENDPOINT}/api/profiles/${values._id}`,
                    values,
                    { withCredentials: true }
                ).then(res => [console.log(res)])
            }
        } catch (e) {
            setLoginError(e.message);
        }
    }

    const handleInput = (field, data) => {
        setEmployeeInput(prevInput => ({ ...prevInput, [`${field}`]: `${data}` }))
    }

    const handleDdInput = (field, data, multi, valueField) => {
        //console.log('field, data, multi, valueField', field, data, multi, valueField)
        if (multi) {
            setEmployeeInput(prevInput => ({ ...prevInput, [`${field}`]: data }))
        }
        else {
            setEmployeeInput(prevInput => ({ ...prevInput, [`${field}`]: { ...data }[0][valueField] }))
        }
    }

    const handleLoad = () => {
        if (props.data?._id !== undefined) {
            setEmployeeInput(props.data)
            setTitle(`${props.data.name} ${props.data.surname} `)
            if (props.isEditMode !== undefined) {
                setIsEditMode(props.isEditMode)
            }
        }
        else {
            setEmployeeInput(EmployeeInputDefault)
            setIsEditMode(props.isEditMode)
            setButtonEditMode('Cadastrar')
        }
    }

    if (employeeInput === undefined) {
        return <Loading />
    }

    const paginationComponentOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };
    const labelClassName = 'text-gray-800 font-bold mb-2'
    const borderClassName = 'text-gray-400 my-2 mx-2'

    const cssSelectedMenu = {
        borderTopColor: currentColor,
        color: currentColor,
        background: "#ffffff"
    }

    const cssNotSelectedMenu = {
        background: "#f9fafb"
    }

    const handleSelectedMenu = (selected) => {
        setSelectedMenu(selected)
    }

    console.log("ddProfileGroupsParams---", ddProfileGroupsParams)

    return (
        <>
            <div className="fixed inset-0 right-0 z-50 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg max-w-3xl w-[70%] overflow-auto h-screen p-10">
                <div className='flex gap-2 mb-4'>
                    <Header customClassName={'w-full'} category={''} title={`${ title  }`} />
                    <div className=''>
                        <AiOutlineClose className='pb-2 w-6 h-8 text-gray-600 cursor-pointer' onClick={() => props.closeModal(false)} />
                    </div>
                </div>
                <div className='mb-12 flex flex-wrap'>
                    <button className='w-auto min-w-[100px] p-4 border-gray-200 border-l-1 border-t-1 font-bold' style={selectedMenu === 'employee' ? cssSelectedMenu : cssNotSelectedMenu} onClick={() => handleSelectedMenu('employee')}>Funcionário</button>
                    <button className='w-auto min-w-[100px] p-4 border-gray-200 border-l-1 border-t-1 font-bold' style={selectedMenu === 'reports' ? cssSelectedMenu : cssNotSelectedMenu} onClick={() => handleSelectedMenu('reports')}>Relatórios</button>
                    <button className='w-auto min-w-[100px] p-4 border-gray-200 border-l-1 border-t-1 font-bold' style={selectedMenu === 'users' ? cssSelectedMenu : cssNotSelectedMenu} onClick={() => handleSelectedMenu('users')}>Usuários</button>
                    <button className='w-auto min-w-[100px] p-4 border-gray-200 border-l-1 border-t-1 border-r-1 font-bold' style={selectedMenu === 'groups' ? cssSelectedMenu : cssNotSelectedMenu} onClick={() => handleSelectedMenu('groups')}>Grupos</button>
                </div>
                <div className={'grid grid-cols-[30%_70%] gap-2' + (selectedMenu === 'employee' ? '' : ' hidden')}>

                    <div className='w-full h-full relative'>
                        <img src={dummyPicture} className={"font-bold text-md rounded-full dark:text-white border-1 border-gray-50"} alt='employeeLogo' />
                        <div className='mt-8 grid grid-rows-1 gap-4 place-items-center '>
                            <button className='w-full h-[60px] p-4 border-gray-200 border-1 font-bold' style={{ color: currentColor }} onClick={handleEditSave} >{buttonEditMode}</button>
                        </div>
                    </div>

                    <div className='relative w-[full] gap-4 px-8 '>
                        <TextInput name='ID' value={employeeInput?._id} placeHolder='Gerado automaticamente' type='text' tooltip='inválido' disabled={true} showIcon={false} />
                        <TextInput name='Nome' value={employeeInput?.name} placeHolder='Insira o seu nome' type='text' tooltip='inválido' customFunc={(e) => handleInput('name', e.target.value)} disabled={!isEditMode} showIcon={false} />
                        <TextInput name='Sobrenome' value={employeeInput?.surname} placeHolder='Insira o seu sobrenome' type='text' tooltip='inválido' customFunc={(e) => handleInput('surname', e.target.value)} disabled={!isEditMode} showIcon={false} />
                        <DropdownList disabled={!isEditMode} input={'active'} preSelected={employeeInput?.active} placeholder='Selecione...' name={'Está ativo'} multi={false} valueField={'value'} options={checkDrop} labelField={'title'} searchBy={'title'} customFunc={handleDdInput} />
                        <DropdownList disabled={!isEditMode} input={'profileFunction'} preSelected={employeeInput?.profileFunction._id} placeholder='Selecione...' name={'Função'} multi={false} valueField={'_id'} options={ddProfileFunctionsParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                        <DropdownList disabled={!isEditMode} input={'profileType'} preSelected={employeeInput?.profileType._id} placeholder='Selecione...' name={'Tipo'} multi={false} valueField={'_id'} options={ddProfileTypesParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                        <DropdownList disabled={!isEditMode} input={'profileGroups'} preSelected={employeeInput?.profileGroups} placeholder='Selecione...' name={'Grupos'} multi={true} valueField={'_id'} options={ddProfileGroupsParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                        <DropdownList disabled={!isEditMode} input={'profileUsers'} preSelected={employeeInput?.profileUsers} placeholder='Selecione...' name={'Usuários'} multi={true} valueField={'_id'} options={ddUsersParams} labelField={'login'} searchBy={'login'} customFunc={handleDdInput} />
                        <DropdownList disabled={!isEditMode} input={'profileReports'} preSelected={employeeInput?.profileReports} placeholder='Selecione...' name={'Relatórios'} multi={true} valueField={'_id'} options={appData.reports} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                        <DropdownList disabled={!isEditMode} input={'profileAppMenus'} preSelected={employeeInput?.profileAppMenus} placeholder='Selecione...' name={'Menus'} multi={true} valueField={'_id'} options={appData.navigation.menusInfo} labelField={'title'} searchBy={'title'} customFunc={handleDdInput} />
                        <DropdownList disabled={!isEditMode} input={'profileAppPages'} preSelected={employeeInput?.profileAppPages} placeholder='Selecione...' name={'Páginas'} multi={true} valueField={'_id'} options={appData.navigation.pagesInfo} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                    </div>

                </div>
                <div className={'grid gap-2' + (selectedMenu === 'reports' ? '' : ' hidden')}>
                    <div className={`mb-2 w-full`}>
                        <p className={labelClassName} >{employeeReports.field}</p>
                        <DataTable
                            columns={employeeReports.columns}
                            data={employeeInput.profileReports !== undefined ? employeeInput.profileReports.map(a => a[`${employeeReports.itemName}`]) : [] }
                            highlightOnHover
                            pointerOnHover
                            //subHeader
                            //subHeaderComponent={subHeaderComponentMemo}
                            customStyles={currentMode === 'dark' ? DatatableTheme.dark : DatatableTheme.light}
                            paginationComponentOptions={paginationComponentOptions}
                        />
                        <hr className={borderClassName + ' mx-0'} />
                    </div>
                </div>
                <div className={'grid gap-2' + (selectedMenu === 'users' ? '' : ' hidden')}>
                    <div className={`mb-2 w-full`}>
                        <p className={labelClassName} >{employeeUsers.field}</p>
                        <DataTable
                            columns={employeeUsers.columns}
                            data={employeeInput[`${employeeUsers.data}`] !== undefined ? employeeInput[`${employeeUsers.data}`].map(a => a[`${employeeUsers.itemName}`]) : [] }
                            highlightOnHover
                            pointerOnHover
                            //subHeader
                            //subHeaderComponent={subHeaderComponentMemo}
                            customStyles={currentMode === 'dark' ? DatatableTheme.dark : DatatableTheme.light}
                            paginationComponentOptions={paginationComponentOptions}
                        />
                        <hr className={borderClassName + ' mx-0'} />
                    </div>
                </div>
                <div className={'grid gap-2' + (selectedMenu === 'groups' ? '' : ' hidden')}>
                    <div className={`mb-2 w-full`}>
                        <p className={labelClassName} >{employeeGroups.field}</p>
                        <DataTable
                            columns={employeeGroups.columns}
                            data={employeeInput[`${employeeGroups.data}`] !== undefined ? employeeInput[`${employeeGroups.data}`].map(a => a[`${employeeGroups.itemName}`]) : [] }
                            highlightOnHover
                            pointerOnHover
                            //subHeader
                            //subHeaderComponent={subHeaderComponentMemo}
                            customStyles={currentMode === 'dark' ? DatatableTheme.dark : DatatableTheme.light}
                            paginationComponentOptions={paginationComponentOptions}
                        />
                        <hr className={borderClassName + ' mx-0'} />
                    </div>
                </div>

            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={() => props.closeModal(false)}></div>

        </>

    );
}
export default EmployeeInfo;
