import { Button, DropdownList, Loading, TextInput } from '..';
import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider';
import axios from 'axios';
import { checkDrop } from '../../data/dummy'
import { AiOutlineClose } from 'react-icons/ai';


const CompanyInputDefault = {
    _id: "",
    cnpjCpf: "",
    corporateName: "",
    fantasyName: "",
    active: true,
    companyDepartments: [""],
    companyType: "",
    companyProfiles: [""],
    companyGroup: ""
}

const CompaniesCRUD = (props) => {
    const { currentColor, ddProfileFunctionsParams, ddProfilesParams, ddProfileTypesParams, ddCompanyGroupsParams, ddCompanyTypesParams, ddCompanyDepartmentsParams } = useStateContext()
    const [showModal, setShowModal] = useState(props.showModalProp);
    const [companyInput, setCompanyInput] = useState()
    const [loginError, setLoginError] = useState(null);

    useEffect(() => {
      handleLoad();
    }, [])
    

    const handleSubmit = () => {
        onSubmit(companyInput);
    }

    async function onSubmit(values) {
        try {
            await axios.put(
                `${process.env.REACT_APP_SERVER_ENDPOINT}/api/sessions`,
                values,
                { withCredentials: true }
            ).then(res => [console.log(res)])

        } catch (e) {
            setLoginError(e.message);
        }
    }

    const handleInput = (field, data) => {
        setCompanyInput(prevInput => ({ ...prevInput, [`${field}`]: `${data}` }))
    }

    const handleDdInput = (field, data, multi, valueField) => {
        //console.log('field, data, multi, valueField',field, data, multi, valueField)
        if (multi) {
            setCompanyInput(prevInput => ({ ...prevInput, [`${field}`]: { ...data }[valueField] }))
        }
        else {
            setCompanyInput(prevInput => ({ ...prevInput, [`${field}`]: { ...data }[0][valueField] }))
        }
    }

    const handleLoad = () => {
        if(props.data?._id !== undefined){
            setCompanyInput(props.data)
        } 
        else {
            setCompanyInput(CompanyInputDefault)
        }
    }

    if (companyInput === undefined) {
        return <Loading />
    }

    //console.log('companyInput', { companyInput, ddProfilesParams, ddCompanyTypesParams, ddCompanyGroupsParams, ddCompanyDepartmentsParams })


    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-7xl">
                    <div className=" bg-gray-50 dark:text-gray-200 dark:bg-secondary-dark-bg  lg:w-[768px] md:w-[580px] sm:w-400  h-auto rounded-xl p-4 pt-9 m-3 pb-4">
                        <div className='grid grid-cols-[95%_5%]'>
                            <p className='ml-4'> Informações do Funcionário </p> 
                            <AiOutlineClose className='pb-2 w-6 h-8 text-gray-600 cursor-pointer' onClick={() => props.closeModal(false)} />
                        </div>
                        <hr className='border-1' />
                        <TextInput name='ID' disabled={true} value={companyInput?._id} placeHolder='Identificador único' type='text' tooltip='inválido' customFunc={(e) => handleInput('_id', e.target.value)} />
                        <TextInput name='CNPJ / CPF' value={companyInput?.cnpjCpf} placeHolder='Insira o seu nome' type='text' tooltip='inválido' customFunc={(e) => handleInput('cnpjCpf', e.target.value)} />
                        <TextInput name='Razão Social' value={companyInput?.corporateName} placeHolder='Insira o seu sobrenome' type='text' tooltip='inválido' customFunc={(e) => handleInput('corporateName', e.target.value)} />
                        <TextInput name='Nome Fantasia' value={companyInput?.fantasyName} placeHolder='Insira o seu sobrenome' type='text' tooltip='inválido' customFunc={(e) => handleInput('fantasyName', e.target.value)} />
                        <DropdownList input={'active'} preSelected={companyInput?.active} placeholder='Selecione...' name={'Está ativo'} multi={false} valueField={'value'} options={checkDrop} labelField={'title'} searchBy={'title'} customFunc={handleDdInput} />
                        <DropdownList input={'companyType'} preSelected={companyInput?.companyType._id} placeholder='Selecione...' name={'Tipo'} multi={false} valueField={'_id'} options={ddCompanyTypesParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                        <DropdownList input={'companyGroup'} preSelected={0} placeholder='Selecione...' name={'Grupo'} multi={false} valueField={'_id'} options={ddCompanyGroupsParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                        <DropdownList input={'companyDepartments'} preSelected={companyInput?.companyDepartments} placeholder='Selecione...' name={'Departamentos'} multi={true} valueField={'_id'} options={ddCompanyDepartmentsParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />

                        <div className='mt-4 grid place-items-center'>
                            <button type="submit" onClick={handleSubmit} className="block w-[60%] h-11 bg-sky-500 rounded-xl text-white font-extrabold">Cadastrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" ></div>

        </>

    );
}
export default CompaniesCRUD;
