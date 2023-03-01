import React from 'react'

const Header = ({category, title, customClassName}) => {
  return (
    <div className={`mb-4 dark:bg-main-dark-bg ${customClassName}`}>
        <p className='dark:text-gray-200 text-gray-400'>
          {category}
        </p>
        <p className='text-3xl font-extrabold tracking-tight text-slate-900 dark:text-gray-400'>
          {title}
        </p>
    </div>
  )
}

export default Header