import React, { useState } from 'react'
import { Header } from '../components'

const NoAccess = ({textProp}) => {

  return (
    <div className='m-2 p-2 bg-white rounded-sm dark:bg-main-dark-bg h-[80vh]'>
            <Header category='Permissões' title={'Acesso Negado'} />
            <div className='h-[60vh]'>
              <p className='text-[16px] text-gray-800'>Você não possui permissão para acessar esta página! </p>
              <p className='text-[16px] text-gray-800'>Caso acredite que seja um engano, tente entrar em contato com o administrador. </p>

            </div>
      
    </div>
  )
}

export default NoAccess