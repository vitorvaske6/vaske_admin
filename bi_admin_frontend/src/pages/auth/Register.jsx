import React, { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import axios from "axios";
import env from "react-dotenv";

import { DropdownList, Logo, TextInput } from '../../components';

import { GoogleAuth } from '..';

import { SiGoogle, SiMicrosoftoutlook } from 'react-icons/si'
import { useStateContext } from '../../contexts/ContextProvider';
import { empresas, funcao, checkDrop } from '../../data/dummy'
import { CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';

const UserInputDefault = {
  login: "",
  password: "",
  comparePassword: "",
  email: "",
  picture: "",
  stayLoggedIn: false
}

const ProfileInputDefault = {
  name: "",
  surname: "",
  active: true,
  profileFunction: "",
  profileGroups: [""],
  profileType: "",
  profileReports: [],
  profileUsers: [""]
}

const Register = () => {
  const { ServerEndpoint, currentColor, isLoggedIn, setIsLoggedIn, handleSetCookies, setCookie, cookies, handleUserLoginInfo } = useStateContext();
  const [response, setResponse] = useState({})
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [userInput, setUserInput] = useState(UserInputDefault)
  const [profileInput, setProfileInput] = useState(ProfileInputDefault)
  const [ddAtivo, setDdAtivo] = useState()


  useEffect(() => {
    if (cookies.accessToken && cookies.refreshToken) {
      handleUserInfo()
    }
  }, [cookies])

  const routeChange = () => {
    navigate(`/login`);
  }

  const handleGoogleLogin = () => {
    const googleLink = GoogleAuth();
    window.location.href = googleLink
  }

  async function submitUser(userInput, profileInput) {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/users`,
        userInput,
        { withCredentials: true }
      ).then(res => [console.log(res), routeChange()])//submitProfile(res.data, profileInput)])
    } catch (e) {
      setLoginError(e.message);
    }
  }

  // async function submitProfile(userInfo, profileInput) {
  //   profileInput.profileUsers = [`${userInfo._id}`]
  //   try {
  //     await axios.post(
  //       `${process.env.REACT_APP_SERVER_ENDPOINT}/api/profiles`,
  //       profileInput,
  //       { withCredentials: true }
  //     ).then(res => [console.log(res)])
  //   } catch (e) {
  //     setLoginError(e.message);
  //   }
  // }



  useEffect(() => {
    if (cookies.accessToken && cookies.refreshToken) {
      handleUserInfo()
    }
  }, [cookies])


  const handleUserInfo = () => {
    const headers = {
      "authorization": `Bearer ${cookies.accessToken}`,
      "x-refresh": cookies.refreshToken
    }
    try {
      axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/users/me`,
        { headers },
      ).then(res => [handleUserLoginInfo(res.data), setIsLoggedIn(true)])
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleSubmit = () => {
    let _profileInput = {...ProfileInputDefault}
    _profileInput.name = profileInput.name
    _profileInput.surname = profileInput.surname

    submitUser(userInput, profileInput);

  }

  const handleUserInput = (field, data) => {
    setUserInput(prevInput => ({ ...prevInput, [`${field}`]: `${data}` }))
  }
  
  const handleProfileInput = (field, data) => {
    setProfileInput(prevInput => ({ ...prevInput, [`${field}`]: `${data}` }))
  }

  const handleDdInput = (field, data, multi) => {
    if (multi) {
      setUserInput(prevInput => ({ ...prevInput, [`${field}`]: `${data}` }))
    }
    else {
      setUserInput(prevInput => ({ ...prevInput, [`${field}`]: `${data[0]}` }))
    }
  }

  return (
    <>
{isLoggedIn ? (<Navigate to="/" />) : (
        <div className="h-screen w-full relative p-4 grid grid-cols-1 gap-1 place-items-center bg-gradient-to-r from-cyan-500 to-blue-500 overflow-auto">
        <div className=" bg-gray-50 dark:text-gray-200 dark:bg-secondary-dark-bg  md:max-w-[450px] sm:w-[90%] h-auto rounded-xl p-4 pt-9 m-3 pb-4">
          <Logo logoSize={"full"} />
          <p> Informações do Usuário </p>
          <p className='border-1' />
          <TextInput name='Login' placeHolder='Insira o seu login' type='text' tooltip='inválido' userInput={userInput} customFunc={(e) => handleUserInput('login', e.target.value)} />
          <TextInput name='Senha' placeHolder='Insira o sua senha' type='password' tooltip='inválida' userInput={userInput} customFunc={(e) => handleUserInput('password', e.target.value)} />
          <TextInput name='Confirmar Senha' placeHolder='Confirme a sua senha' type='password' tooltip='inválida' userInput={userInput} customFunc={(e) => handleUserInput('comparePassword', e.target.value)} />
          <TextInput name='E-mail' placeHolder='Insira o seu login' type='text' tooltip='inválido' userInput={userInput} customFunc={(e) => handleUserInput('email', e.target.value)} />
           {/*<br />
          <p> Informações do Perfil </p>
              <p className='border-1'/>
                        <TextInput name='Nome' value={profileInput?.name} placeHolder='Insira o seu nome' type='text' tooltip='inválido' customFunc={(e) => handleProfileInput('name', e.target.value)} disabled={false} showIcon={false} />
                        <TextInput name='Sobrenome' value={profileInput?.surname} placeHolder='Insira o seu sobrenome' type='text' tooltip='inválido' customFunc={(e) => handleProfileInput('surname', e.target.value)} disabled={false} showIcon={false} />
                        <DropdownList disabled={false} input={'profileFunction'} preSelected={profileInput?.profileFunction._id} placeholder='Selecione...' name={'Função'} multi={false} valueField={'_id'} options={ddProfileFunctionsParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                        <DropdownList disabled={false} input={'profileType'} preSelected={profileInput?.profileType._id} placeholder='Selecione...' name={'Tipo'} multi={false} valueField={'_id'} options={ddProfileTypesParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                        <DropdownList disabled={false} input={'profileGroups'} preSelected={profileInput?.profileGroups} placeholder='Selecione...' name={'Grupos'} multi={true} valueField={'_id'} options={ddProfileGroupsParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                        <DropdownList disabled={false} input={'profileUsers'} preSelected={profileInput?.profileUsers} placeholder='Selecione...' name={'Usuários'} multi={true} valueField={'_id'} options={ddUsersParams} labelField={'login'} searchBy={'login'} customFunc={handleDdInput} />
                        <DropdownList disabled={false} input={'profileReports'} preSelected={profileInput?.profileReports} placeholder='Selecione...' name={'Relatórios'} multi={true} valueField={'_id'} options={appData.reports} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} />
                        <DropdownList disabled={false} input={'profileAppMenus'} preSelected={profileInput?.profileAppMenus} placeholder='Selecione...' name={'Menus'} multi={true} valueField={'_id'} options={appData.navigation.menusInfo} labelField={'title'} searchBy={'title'} customFunc={handleDdInput} />
                        <DropdownList disabled={false} input={'profileAppPages'} preSelected={profileInput?.profileAppPages} placeholder='Selecione...' name={'Páginas'} multi={true} valueField={'_id'} options={appData.navigation.pagesInfo} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} /> */}
          {/* <DropdownList props={{ name: 'Empresa', placeHolder: 'Selecione a sua empresa', type: 'text', tooltip: 'inválida', data: empresas }} /> */}
          <div className='mt-4 grid place-items-center'>
            <button type="submit" onClick={handleSubmit} className="block w-[60%] h-11 bg-sky-500 rounded-xl text-white font-extrabold">Cadastrar</button>
          </div>
          <div className='mt-4 flex relative w-full'>
            <div className='block border-1 mt-4 w-[50%] h-0' />
            <p className='border-1 w-min p-1 rounded-md'>ou</p>
            <div className='block border-1 mt-4 w-[50%] h-0' />
          </div>

          <div className='sm:mx-0 md:mx-16 mt-4 grid grid-cols-1 place-items-center'>
            <SiGoogle size={35} className="cursor-pointer" onClick={handleGoogleLogin} />
            {/* <SiMicrosoftoutlook size={35} className=" cursor-pointer" /> */}
          </div>

          <p className="pr-1 sm:text-[12px] md:text-[14px] mt-4 grid place-items-center grid-cols-1 grid-rows-1">
            Já está cadastrado ?
            <span className="pl-1 font-bold underline cursor-pointer" onClick={routeChange}>Entrar</span>
          </p>
        </div>
      </div>
)}
    </>
  )
}

export default Register