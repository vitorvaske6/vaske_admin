import React, { useState, useEffect } from 'react'
import { useNavigate, Navigate, Route } from 'react-router-dom';
import axios from "axios";
import env from "react-dotenv";

import { Logo, TextInput } from '../../components';

import { GoogleAuth } from '..';

import { SiGoogle, SiMicrosoftoutlook } from 'react-icons/si'
import { useStateContext } from '../../contexts/ContextProvider';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';

const inputDefault = {
  login: '',
  password: ''
}

const Login = () => {
  const { ServerEndpoint, isLoggedIn, setIsLoggedIn, setCookie, cookies, handleUserLoginInfo } = useStateContext();
  const [response, setResponse] = useState({})
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [input, setInput] = useState(inputDefault)

  const routeChange = () => {
    navigate(`/register`);
  }

  const handleGoogleLogin = () => {
    const googleLink = GoogleAuth();
    window.location.href = googleLink
  }

  async function onSubmit(values) {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/sessions`,
        values,
        { withCredentials: true }
      ).then(res => [setCookie({ 'accessToken': res.data.accessToken, 'refreshToken': res.data.refreshToken })])

    } catch (e) {
      setLoginError(e.message);
    }
  }

  useEffect(() => {
    handleUserInfo()
  }, [cookies])


  const handleUserInfo = async () => {
    try {
      axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/users/me`,
        { withCredentials: true },
      ).then(res => [handleUserLoginInfo(res.data), setIsLoggedIn(true)])
    } catch (e) {
      console.log(e.message);
    }

  }

  const handleSubmit = () => {
    onSubmit(input);
  }

  const handleInput = (field, data) => {
    setInput(prevInput => ({ ...prevInput, [`${field}`]: `${data}` }))
  }

  return (
    <>
      {isLoggedIn ? (<Navigate to="/" />) : (
        <div className="h-screen w-full relative p-4 grid grid-cols-1 gap-1 place-items-center bg-gradient-to-r from-cyan-500 to-blue-500 overflow-auto">
          <div className=" bg-gray-50 dark:text-gray-200  md:max-w-[450px] sm:w-[90%] h-auto rounded-xl p-4 pt-9 m-3 pb-4">
            <Logo logoSize={"full"}/>
            <TextInput name='Login' placeHolder='Insira o seu login' type='text' tooltip='inválido' input={input} customFunc={(e) => handleInput('login', e.target.value)} />
            <TextInput name='Senha' placeHolder='Insira o sua senha' type='password' tooltip='inválida' input={input} customFunc={(e) => handleInput('password', e.target.value)} />
            <div className='mt-4 grid place-items-center'>
              <button type="submit" onClick={handleSubmit} className="block w-[60%] h-11 bg-sky-500 rounded-xl text-white font-extrabold">Entrar</button>
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
              Ainda não é um usuário ?
              <span className="pl-1 font-bold underline cursor-pointer" onClick={routeChange}>Cadastre-se</span>
            </p>
          </div>
        </div>
      )}
    </>

  )
}

export default Login