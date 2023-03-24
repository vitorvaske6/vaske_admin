import { Button, ConfigProvider } from 'antd'
import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import styled from 'styled-components';

const ButtonContainer = styled.div`
  .ant-btn-primary {
    background-color: ${props => props.currentcolor};
  }
`;

const Header = ({ category, title, customClassName, button, hasButton }) => {
  const { currentcolor } = useStateContext()
  return (
    <div className={`mb-4 dark:bg-main-dark-bg ${customClassName} flex justify-between`}>
      <div>
        <p className='dark:text-gray-200 text-gray-400'>
          {category}
        </p>
        <p className='text-3xl font-extrabold tracking-tight text-slate-900 dark:text-gray-400'>
          {title}
        </p>
      </div>
      { hasButton ? (
        
          button
        
      ) : (
        <></>
      )}

    </div>
  )
}

export default Header