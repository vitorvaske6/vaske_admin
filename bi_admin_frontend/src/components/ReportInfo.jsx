import { Button, Datatable, DropdownList, Loading, Logo, TextInput } from '.';
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

const ReportInputDefault = {
    _id: "",
    name: "",
    menuTitle: "",
    active: true,
    description: "",
    reportId: "",
    workspace: "",
}


const ReportInfo = (props) => {
    const { normalizeObjectToId, appData, currentMode, currentColor, ddProfileFunctionsParams, ddUsersParams, ddProfileTypesParams, ddProfileGroupsParams, ddReportGroupsParams, ddReportTypesParams, ddReportReportsParams } = useStateContext()
    const [showModal, setShowModal] = useState(props.showModalProp);
    const [reportInput, setReportInput] = useState()
    const [loginError, setLoginError] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState('report')
    // const [reportReports, setReportReports] = useState([])
    // const [reportUsers, setReportUsers] = useState([])
    // const [reportGroups, setReportGroups] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)
    const [buttonEditMode, setButtonEditMode] = useState('Alterar')
    const [title, setTitle] = useState(`Cadastrar Relatório`)
    //console.log("reportInput-----------", reportInput)
    useEffect(() => {
        handleLoad();
        //handleDetailedColumnsMenus();

        if (props.isEditMode !== undefined) {
            setIsEditMode(props.isEditMode)
        }

    }, [])


    const handleSubmit = (isUpdate) => {
        let finalInput = { ...reportInput }

        delete finalInput.createdBy
        delete finalInput.updatedAt
        delete finalInput.createdAt

        //console.log("------------" , finalInput, reportInput)
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

    // const handleDetailedColumnsMenus = () => {
    //     let reports = props.detailedColumns.filter((item) => item.field === 'Relatórios')[0]
    //     let users = props.detailedColumns.filter((item) => item.field === 'Usuários')[0]
    //     let groups = props.detailedColumns.filter((item) => item.field === 'Grupos')[0]
    //     setReportReports(reports);
    //     setReportUsers(users);
    //     setReportGroups(groups);
    // }


    async function onSubmit(values) {

        try {
            if (buttonEditMode === 'Cadastrar') {
                await axios.post(
                    `${process.env.REACT_APP_SERVER_ENDPOINT}/api/reports/`,
                    values,
                    { withCredentials: true }
                ).then(res => [console.log(res)])
            } 

            if (buttonEditMode === 'Salvar') {
                await axios.put(
                    `${process.env.REACT_APP_SERVER_ENDPOINT}/api/reports/${values._id}`,
                    values,
                    { withCredentials: true }
                ).then(res => [console.log(res)])
            }
        } catch (e) {
            setLoginError(e.message);
        }
    }

    const handleInput = (field, data) => {
        setReportInput(prevInput => ({ ...prevInput, [`${field}`]: `${data}` }))
    }

    const handleDdInput = (field, data, multi, valueField) => {
        //console.log('field, data, multi, valueField', field, data, multi, valueField)
        if (multi) {
            setReportInput(prevInput => ({ ...prevInput, [`${field}`]: data }))
        }
        else {
            setReportInput(prevInput => ({ ...prevInput, [`${field}`]: { ...data }[0][valueField] }))
        }
    }

    const handleLoad = () => {
        if (props.data?._id !== undefined) {
            setReportInput(props.data)
            setTitle(`${props.data.name}`)
            if (props.isEditMode !== undefined) {
                setIsEditMode(props.isEditMode)
            }
        }
        else {
            setReportInput(ReportInputDefault)
            setIsEditMode(props.isEditMode)
            setButtonEditMode('Cadastrar')
        }
    }

    if (reportInput === undefined) {
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

    return (
        <>
            <div className="fixed inset-0 right-0 z-50 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg max-w-3xl w-[70%] overflow-auto h-screen p-10">
                <div className='flex gap-2 mb-4'>
                    <Header customClassName={'w-full'} category={''} title={`${ title  }`} />
                    <div className=''>
                        <AiOutlineClose className='pb-2 w-6 h-8 text-gray-600 cursor-pointer' onClick={() => props.closeModal(false)} />
                    </div>
                </div>
                {/* <div className='mb-12 flex flex-wrap'>
                    <button className='w-auto min-w-[100px] p-4 border-gray-200 border-l-1 border-t-1 font-bold' style={selectedMenu === 'reports' ? cssSelectedMenu : cssNotSelectedMenu} onClick={() => handleSelectedMenu('reports')}>Relatórios</button>
                    <button className='w-auto min-w-[100px] p-4 border-gray-200 border-l-1 border-t-1 font-bold' style={selectedMenu === 'users' ? cssSelectedMenu : cssNotSelectedMenu} onClick={() => handleSelectedMenu('users')}>Usuários</button>
                    <button className='w-auto min-w-[100px] p-4 border-gray-200 border-l-1 border-t-1 border-r-1 font-bold' style={selectedMenu === 'groups' ? cssSelectedMenu : cssNotSelectedMenu} onClick={() => handleSelectedMenu('groups')}>Grupos</button>
                </div> */}
                <div className={'grid grid-cols-[30%_70%] gap-2' + (selectedMenu === 'report' ? '' : ' hidden')}>

                    <div className='w-full h-full relative'>
                        {/* <img src={dummyPicture} className={"font-bold text-md rounded-full dark:text-white border-1 border-gray-50"} alt='reportLogo' /> */}
                        <div className='mt-8 grid grid-rows-1 gap-4 place-items-center '>
                            <button className='w-full h-[60px] p-4 border-gray-200 border-1 font-bold' style={{ color: currentColor }} onClick={handleEditSave} >{buttonEditMode}</button>
                        </div>
                    </div>

                    <div className='relative w-[full] gap-4 px-8 '>
                        <TextInput name='ID' value={reportInput?._id} placeHolder='Gerado automaticamente' type='text' tooltip='inválido' disabled={true} showIcon={false} />
                        <TextInput name='Nome' value={reportInput?.name} placeHolder='Insira o nome' type='text' tooltip='inválido' customFunc={(e) => handleInput('name', e.target.value)} disabled={!isEditMode} showIcon={false} />
                        <TextInput name='Título do Menu' value={reportInput?.menuTitle} placeHolder='Insira o título do menu' type='text' tooltip='inválido' customFunc={(e) => handleInput('menuTitle', e.target.value)} disabled={!isEditMode} showIcon={false} />
                        <DropdownList disabled={!isEditMode} input={'active'} preSelected={reportInput?.active} placeholder='Selecione...' name={'Está ativo'} multi={false} valueField={'value'} options={checkDrop} labelField={'title'} searchBy={'title'} customFunc={handleDdInput} />
                        <TextInput name='Descrição' value={reportInput?.description} placeHolder='Insira a descrição' type='text' tooltip='inválido' customFunc={(e) => handleInput('description', e.target.value)} disabled={!isEditMode} showIcon={false} />
                        <TextInput name='ID do PowerBI' value={reportInput?.reportId} placeHolder='Insira o ID do PowerBI' type='text' tooltip='inválido' customFunc={(e) => handleInput('reportId', e.target.value)} disabled={!isEditMode} showIcon={false} />
                        <TextInput name='Workspace' value={reportInput?.workspace} placeHolder='Insira o workspace' type='text' tooltip='inválido' customFunc={(e) => handleInput('workspace', e.target.value)} disabled={!isEditMode} showIcon={false} />
                    </div>

                </div>
                {/* <div className={'grid gap-2' + (selectedMenu === 'reports' ? '' : ' hidden')}>
                    <div className={`mb-2 w-full`}>
                        <p className={labelClassName} >{reportReports.field}</p>
                        <DataTable
                            columns={reportReports.columns}
                            data={reportInput.profileReports !== undefined ? reportInput.profileReports.map(a => a[`${reportReports.itemName}`]) : [] }
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
                        <p className={labelClassName} >{reportUsers.field}</p>
                        <DataTable
                            columns={reportUsers.columns}
                            data={reportInput[`${reportUsers.data}`] !== undefined ? reportInput[`${reportUsers.data}`].map(a => a[`${reportUsers.itemName}`]) : [] }
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
                        <p className={labelClassName} >{reportGroups.field}</p>
                        <DataTable
                            columns={reportGroups.columns}
                            data={reportInput[`${reportGroups.data}`] !== undefined ? reportInput[`${reportGroups.data}`].map(a => a[`${reportGroups.itemName}`]) : [] }
                            highlightOnHover
                            pointerOnHover
                            //subHeader
                            //subHeaderComponent={subHeaderComponentMemo}
                            customStyles={currentMode === 'dark' ? DatatableTheme.dark : DatatableTheme.light}
                            paginationComponentOptions={paginationComponentOptions}
                        />
                        <hr className={borderClassName + ' mx-0'} />
                    </div>
                </div> */}

            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={() => props.closeModal(false)}></div>

        </>

    );
}
export default ReportInfo;
