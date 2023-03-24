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

const menuGroupInputDefault = {
    _id: "",
    groupTitle: "",
    active: true,
    links: undefined
}

const pageInputDefault = {
    _id: "",
    name: "",
    page: "",
    active: true,
}

const MenuGroupInfo = (props) => {
    const { normalizeObjectToId, appData, currentMode, currentColor, ddPagesParams } = useStateContext()
    const [showModal, setShowModal] = useState(props.showModalProp);
    const [menuGroupInput, setMenuGroupInput] = useState()
    const [loginError, setLoginError] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState('menuGroup')
    const [links, setLinks] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)
    const [buttonEditMode, setButtonEditMode] = useState('Alterar')
    const [title, setTitle] = useState(`Cadastrar Grupo de Menu`)
    //console.log("menuInput-----------", menuInput)
    useEffect(() => {
        handleLoad();
        handleDetailedColumnsMenuGroups();

        if (props.isEditMode !== undefined) {
            setIsEditMode(props.isEditMode)
        }

    }, [])


    const handleSubmit = (isUpdate) => {
        let finalInput = { ...menuGroupInput }

        finalInput.links = normalizeObjectToId(finalInput.links)

        delete finalInput.createdBy
        delete finalInput.updatedAt
        delete finalInput.createdAt

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

    const handleDetailedColumnsMenuGroups = () => {
        let links = props.detailedColumns.filter((item) => item.field === 'Páginas')[0]
        setLinks(links);
    }

    async function onSubmit(values) {

        try {
            if (buttonEditMode === 'Cadastrar') {
                await axios.post(
                    `${process.env.REACT_APP_SERVER_ENDPOINT}/api/menuGroups/`,
                    values,
                    { withCredentials: true }
                ).then(res => [console.log(res)])
            } 

            if (buttonEditMode === 'Salvar') {
                await axios.put(
                    `${process.env.REACT_APP_SERVER_ENDPOINT}/api/menuGroups/${values._id}`,
                    values,
                    { withCredentials: true }
                ).then(res => [console.log(res)])
            }
        } catch (e) {
            setLoginError(e.message);
        }
    }

    const handleInput = (field, data) => {
        setMenuGroupInput(prevInput => ({ ...prevInput, [`${field}`]: `${data}` }))
    }

    const handleDdInput = (field, data, multi, valueField) => {
        //console.log('field, data, multi, valueField', field, data, multi, valueField)
        if (multi) {
            setMenuGroupInput(prevInput => ({ ...prevInput, [`${field}`]: data }))
        }
        else {
            setMenuGroupInput(prevInput => ({ ...prevInput, [`${field}`]: { ...data }[0][valueField] }))
        }
    }

    const handleLoad = () => {
        if (props.data?._id !== undefined) {
            setMenuGroupInput(props.data)
            setTitle(`${props.data.groupTitle}`)
            if (props.isEditMode !== undefined) {
                setIsEditMode(props.isEditMode)
            }
        }
        else {
            setMenuGroupInput(menuGroupInputDefault)
            setIsEditMode(props.isEditMode)
            setButtonEditMode('Cadastrar')
        }
    }

    if (menuGroupInput === undefined) {
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
                <div className='mb-12 flex flex-wrap'>
                    <button className='w-auto min-w-[100px] p-4 border-gray-200 border-l-1 border-t-1 font-bold' style={selectedMenu === 'menuGroup' ? cssSelectedMenu : cssNotSelectedMenu} onClick={() => handleSelectedMenu('menuGroup')}>Grupo de Menu</button>
                    <button className='w-auto min-w-[100px] p-4 border-gray-200 border-l-1 border-t-1 border-r-1 font-bold' style={selectedMenu === 'links' ? cssSelectedMenu : cssNotSelectedMenu} onClick={() => handleSelectedMenu('links')}>Páginas</button>
                </div>
                <div className={'grid grid-cols-[30%_70%] gap-2' + (selectedMenu === 'menuGroup' ? '' : ' hidden')}>

                    <div className='w-full h-full relative'>
                        {/* <img src={dummyPicture} className={"font-bold text-md rounded-full dark:text-white border-1 border-gray-50"} alt='menuGroupLogo' /> */}
                        <div className='mt-8 grid grid-rows-1 gap-4 place-items-center '>
                            <button className='w-full h-[60px] p-4 border-gray-200 border-1 font-bold' style={{ color: currentColor }} onClick={handleEditSave} >{buttonEditMode}</button>
                        </div>
                    </div>

                    <div className='relative w-[full] gap-4 px-8 '>
                        <TextInput name='ID' value={menuGroupInput?._id} placeHolder='Gerado automaticamente' type='text' tooltip='inválido' disabled={true} showIcon={false} />
                        <TextInput name='Título' value={menuGroupInput?.groupTitle} placeHolder='Insira o título' type='text' tooltip='inválido' customFunc={(e) => handleInput('groupTitle', e.target.value)} disabled={!isEditMode} showIcon={false} />
                        <DropdownList disabled={!isEditMode} input={'links'} preSelected={menuGroupInput?.links} placeholder='Selecione...' name={'Páginas'} multi={true} valueField={'value'} options={ddPagesParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                        <DropdownList disabled={!isEditMode} input={'active'} preSelected={menuGroupInput?.active} placeholder='Selecione...' name={'Está ativo'} multi={false} valueField={'value'} options={checkDrop} labelField={'title'} searchBy={'title'} customFunc={handleDdInput} />

                    </div>

                </div>
                <div className={'grid gap-2' + (selectedMenu === 'links' ? '' : ' hidden')}>
                    <div className={`mb-2 w-full`}>
                        <p className={labelClassName} >{links.field}</p>
                        <DataTable
                            columns={links.columns}
                            data={menuGroupInput[`${links.data}`] !== undefined ? menuGroupInput[`${links.data}`].map(a => a[`${links.itemName}`]) : [] }
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
export default MenuGroupInfo;
