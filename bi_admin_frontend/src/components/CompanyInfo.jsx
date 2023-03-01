import { Button, Datatable, DropdownList, Loading, Logo, TextInput } from './';
import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';
import { checkDrop } from '../data/dummy'
import { AiOutlineClose } from 'react-icons/ai';
import Header from './Header';
import dummyLogo from '../data/product2.jpg'
import DataTable from 'react-data-table-component';
import DatatableTheme from './datatable/DatatableTheme';

const CompanyInputDefault = {
    _id: "",
    cnpjCpf: "",
    corporateName: "",
    fantasyName: "",
    active: true,
    companyDepartments: [],
    companyType: "",
    companyProfiles: [],
    companyGroup: ""
}


const CompanyInfo = (props) => {
    const { normalizeObjectToId, currentMode, currentColor, ddProfileFunctionsParams, ddProfilesParams, ddProfileTypesParams, ddCompanyGroupsParams, ddCompanyTypesParams, ddCompanyDepartmentsParams } = useStateContext()
    const [showModal, setShowModal] = useState(props.showModalProp);
    const [companyInput, setCompanyInput] = useState()
    const [loginError, setLoginError] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState('company')
    const [companyDepartments, setCompanyDepartments] = useState([])
    const [companyProfiles, setCompanyProfiles] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)
    const [buttonEditMode, setButtonEditMode] = useState('Alterar')
    const [title, setTitle] = useState(`Cadastrar Empresa`)

    useEffect(() => {
        handleLoad();
        handleDetailedColumnsMenus();
    }, [])


    const handleSubmit = (isUpdate) => {
        let finalInput = { ...companyInput }
        //console.log("finalInput, companyInput ------------- ", finalInput, companyInput)

        finalInput.cnpjCpf = finalInput.cnpjCpf.replace(/[^\d]/g, "")
        finalInput.companyDepartments = normalizeObjectToId(finalInput.companyDepartments)
        finalInput.companyProfiles = normalizeObjectToId(finalInput.companyProfiles)
        finalInput.companyType = normalizeObjectToId(finalInput.companyType)
        finalInput.companyGroup = normalizeObjectToId(finalInput.companyGroup)

        delete finalInput.createdBy
        delete finalInput.updatedAt
        delete finalInput.createdAt
        //console.log("finalInput, companyInput ------------- ", finalInput, companyInput)
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

        let departments = props.detailedColumns.filter((item) => item.field === 'Departamentos')[0]
        let profiles = props.detailedColumns.filter((item) => item.field === 'Perfis')[0]

        if (props.data?._id) {
            setCompanyDepartments(departments);
            setCompanyProfiles(profiles);
        }

    }

    async function onSubmit(values) {
        console.log("on submit values ---- ", values)
        try {
            if (buttonEditMode === 'Cadastrar') {
                await axios.post(
                    `${process.env.REACT_APP_SERVER_ENDPOINT}/api/companies/`,
                    values,
                    { withCredentials: true }
                ).then(res => [console.log(res)])
            } 

            if (buttonEditMode === 'Salvar') {
                await axios.put(
                    `${process.env.REACT_APP_SERVER_ENDPOINT}/api/companies/${values._id}`,
                    values,
                    { withCredentials: true }
                ).then(res => [console.log(res)])
            }
        } catch (e) {
            setLoginError(e.message);
        }
    }

    const handleInput = (field, data) => {
        setCompanyInput(prevInput => ({ ...prevInput, [`${field}`]: `${data}` }))
    }

    const handleDdInput = (field, data, multi, valueField) => {
        if (multi) {
            //let inputData = data.map((item, index) => {return item })
            setCompanyInput(prevInput => ({ ...prevInput, [`${field}`]: data }))
        }
        else {
            setCompanyInput(prevInput => ({ ...prevInput, [`${field}`]: { ...data }[0][valueField] }))
        }
    }

    const handleLoad = () => {
        if (props.data?._id !== undefined) {
            setCompanyInput(props.data)
            setTitle(`${props.data.fantasyName}`)
            if (props.isEditMode !== undefined) {
                setIsEditMode(props.isEditMode)
            }
        }
        else {
            setCompanyInput(CompanyInputDefault)
            setIsEditMode(props.isEditMode)
            setButtonEditMode('Cadastrar')
        }
    }

    if (companyInput === undefined) {
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
                <div className='flex gap-2 mb-4 '>
                    <Header customClassName={'w-full'} category={''} title={title} />
                    <div className=''>
                        <AiOutlineClose className='pb-2 w-6 h-8 text-gray-600 cursor-pointer' onClick={() => props.closeModal(false)} />
                    </div>
                </div>

                <div className='mb-12 flex flex-wrap'>
                    <button className='w-auto min-w-[100px] p-4 border-gray-200 border-l-1 border-t-1 font-bold' style={selectedMenu === 'company' ? cssSelectedMenu : cssNotSelectedMenu} onClick={() => handleSelectedMenu('company')}>Empresa</button>
                    <button className='w-auto min-w-[100px] p-4 border-gray-200 border-l-1 border-t-1 font-bold' style={selectedMenu === 'departments' ? cssSelectedMenu : cssNotSelectedMenu} onClick={() => handleSelectedMenu('departments')}>Departamentos</button>
                    <button className='w-auto min-w-[100px] p-4 border-gray-200 border-l-1 border-t-1 border-r-1 font-bold' style={selectedMenu === 'profiles' ? cssSelectedMenu : cssNotSelectedMenu} onClick={() => handleSelectedMenu('profiles')}>Perfis</button>
                </div>
                <div className={'flex flex-wrap ' + (selectedMenu === 'company' ? '' : ' hidden')}>

                    <div className='w-[25%] flex-shrink'>
                        <img src={dummyLogo} className={"rounded-full dark:text-white border-1 border-gray-50"} alt='companyLogo' />
                        <div className='mt-8 grid grid-rows-1 gap-4 place-items-center '>
                            <button className='w-full h-[60px] p-4 border-gray-200 border-1 font-bold' style={{ color: currentColor }} onClick={handleEditSave} >{buttonEditMode}</button>
                        </div>
                    </div>

                    <div className='flex-1 w-full gap-4 px-8 '>
                        <TextInput name='ID' value={companyInput?._id} placeHolder='Gerado automaticamente' type='text' tooltip='inválido' disabled={true} showIcon={false} />
                        <TextInput name='Razão Social' value={companyInput?.corporateName} placeHolder='Insira a razão social' type='text' tooltip='inválido' customFunc={(e) => handleInput('corporateName', e.target.value)} disabled={!isEditMode} showIcon={false} />
                        <TextInput name='Nome Fantasia' value={companyInput?.fantasyName} placeHolder='Insira o nome fantasia' type='text' tooltip='inválido' customFunc={(e) => handleInput('fantasyName', e.target.value)} disabled={!isEditMode} showIcon={false} />
                        <TextInput name='CNPJ / CPF' value={companyInput?.cnpjCpf} placeHolder='Insira o CNPJ ou CPF' type='text' tooltip='inválido' customFunc={(e) => handleInput('cnpjCpf', e.target.value)} disabled={!isEditMode} showIcon={false} />
                        <DropdownList disabled={!isEditMode} input={'active'} preSelected={companyInput?.active} placeholder='Selecione...' name={'Está ativo'} multi={false} valueField={'value'} options={checkDrop} labelField={'title'} searchBy={'title'} customFunc={handleDdInput} />
                        <DropdownList disabled={!isEditMode} input={'companyType'} preSelected={companyInput?.companyType._id} placeholder='Selecione...' name={'Tipo'} multi={false} valueField={'_id'} options={ddCompanyTypesParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                        <DropdownList disabled={!isEditMode} input={'companyGroup'} preSelected={companyInput?.companyGroup._id} placeholder='Selecione...' name={'Grupo'} multi={false} valueField={'_id'} options={ddCompanyGroupsParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                        <DropdownList disabled={!isEditMode} input={'companyDepartments'} preSelected={companyInput?.companyDepartments} placeholder='Selecione...' name={'Departamentos'} multi={true} valueField={'_id'} options={ddCompanyDepartmentsParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                        <DropdownList disabled={!isEditMode} input={'companyProfiles'} preSelected={companyInput?.companyProfiles} placeholder='Selecione...' name={'Perfis'} multi={true} valueField={'_id'} options={ddProfilesParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                    </div>
                </div>

                <div className={'grid gap-2' + (selectedMenu === 'departments' ? '' : ' hidden')}>
                    <div className={`mb-2 w-full`}>
                        <p className={labelClassName} >{companyDepartments.field}</p>
                        <DataTable
                            columns={companyDepartments.columns}
                            data={companyInput[`${companyDepartments.data}`] !== undefined ? companyInput[`${companyDepartments.data}`].map(a => a[`${companyDepartments.itemName}`]) : []}
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
                <div className={'grid gap-2' + (selectedMenu === 'profiles' ? '' : ' hidden')}>
                    <div className={`mb-2 w-full`}>
                        <p className={labelClassName} >{companyProfiles.field}</p>
                        <DataTable
                            columns={companyProfiles.columns}
                            data={companyInput[`${companyProfiles.data}`] !== undefined ? companyInput[`${companyProfiles.data}`].map(a => a[`${companyProfiles.itemName}`]) : []}
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
export default CompanyInfo;
